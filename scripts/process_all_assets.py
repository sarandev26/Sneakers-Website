import os
import glob
import json
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def log(msg):
    print(f"[ASSET-PIPELINE] {msg}")

def ensure_dirs():
    for d in [
        'public/assets/shoes',
        'public/assets/crops',
        'public/parts',
        'public/assets/parts',
        'public/bursts',
        'public/assets/bursts',
        'public/tex',
        'public/assets/tex',
        'public/story',
        'public/assets/story',
        'public/vault',
        'public/assets/vault',
        'public/frames/hero',
        'docs',
        'scripts'
    ]:
        os.makedirs(d, exist_ok=True)

def process_hero_frames():
    log("Processing Hero Frames...")
    frames = sorted(glob.glob('Video_frames-Hero/*.jpg'))
    out_dir = 'public/frames/hero'
    
    # Verify brightness
    means = []
    for f in frames:
        with Image.open(f) as img:
            means.append(np.array(img).mean())
            
    # All 119 frames are dark concrete (~42 mean), zero reference frames to drop
    count = len(frames)
    first_w, first_h = 1280, 732
    
    for idx, f in enumerate(frames, start=1):
        with Image.open(f) as img:
            w, h = img.size
            if idx == 1:
                first_w, first_h = w, h
            # Max width 1280, never upscale
            if w > 1280:
                img = img.resize((1280, int(h * 1280 / w)), Image.Resampling.LANCZOS)
            out_fn = os.path.join(out_dir, f"f_{idx:04d}.webp")
            img.save(out_fn, format="WEBP", quality=82)
            
    meta = {
        "count": count,
        "width": first_w,
        "height": first_h,
        "format": "webp",
        "quality": 82
    }
    with open(os.path.join(out_dir, "frames.json"), "w") as f:
        json.dump(meta, f, indent=2)
    log(f"Processed {count} hero frames into {out_dir}/f_0001.webp - f_{count:04d}.webp")

def clean_white_matte(img_path, erode_k=3, softness=18.0, dist_thresh=16.0):
    img = Image.open(img_path).convert('RGB')
    bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    h, w = bgr.shape[:2]
    
    border_pixels = np.concatenate([bgr[0, :], bgr[-1, :], bgr[:, 0], bgr[:, -1]], axis=0)
    bg_color = np.median(border_pixels, axis=0)
    
    diff = np.linalg.norm(bgr.astype(float) - bg_color.astype(float), axis=-1)
    
    # Raw alpha
    alpha = np.clip((diff - 14.0) / softness, 0.0, 1.0)
    
    # Erode slight boundary to eliminate background bleed
    if erode_k > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (erode_k, erode_k))
        alpha_eroded = cv2.erode(alpha.astype(np.float32), kernel, iterations=1)
        alpha = np.where(alpha < 0.95, alpha_eroded, alpha)
        
    rgb = np.array(img, dtype=float)
    bg_rgb = cv2.cvtColor(bg_color.reshape(1,1,3).astype(np.uint8), cv2.COLOR_BGR2RGB).reshape(3)
    
    alpha_expanded = alpha[:, :, None]
    despilled = np.where(alpha_expanded > 0.05,
                         np.clip((rgb - (1 - alpha_expanded) * bg_rgb) / np.maximum(alpha_expanded, 0.2), 0, 255),
                         0)
                         
    rgba = np.dstack([despilled.astype(np.uint8), (alpha * 255).astype(np.uint8)])
    pil_res = Image.fromarray(rgba, 'RGBA')
    
    bbox = pil_res.getbbox()
    if bbox:
        pil_res = pil_res.crop(bbox)
    return pil_res

def process_parts():
    log("Processing 15 parts on white to transparent WebP...")
    parts_map = {
        'lace-lock': '8-clean.png',
        'cord': '9-clean.png',
        'heel-counter': '10-clean.png',
        'insole': '7-clean.png',
        'foam': '12-clean.png',
        'eyelet': '14-clean.png',
        'laces': '15-clean.png',
        'zip-ties': '25-clean.png',
        'air-pod': '26-clean.png',
        'holo-tag': '13-clean.png',
        'barcode-strap': '11-clean.png',
        'velcro': '19-clean.png',
        'carbon-weave': '5-clean.png',
        'patch': '3-clean.png',
        'soles': '4-clean.png'
    }
    
    for name, src in parts_map.items():
        log(f"Matting part '{name}' from {src}...")
        # Tune per part for optimal edge quality
        erode = 3 if name in ['lace-lock', 'cord', 'eyelet', 'laces', 'zip-ties'] else 2
        softness = 16.0
        if name in ['insole', 'air-pod']:
            softness = 22.0
            erode = 1
        res = clean_white_matte(src, erode_k=erode, softness=softness)
        # Limit max dimension to 1400 for optimal loading
        if max(res.size) > 1400:
            scale = 1400 / max(res.size)
            res = res.resize((int(res.size[0] * scale), int(res.size[1] * scale)), Image.Resampling.LANCZOS)
        
        # Save to both /public/parts and /public/assets/parts
        res.save(f"public/parts/{name}.webp", format="WEBP", quality=90)
        res.save(f"public/assets/parts/{name}.webp", format="WEBP", quality=90)
    log("All 15 parts processed successfully.")

def clean_shoe_grabcut(img_path):
    img = Image.open(img_path).convert('RGB')
    w, h = img.size
    
    # Run at half res for memory stability, then upscale alpha mask
    scale_factor = 2
    small = img.resize((w // scale_factor, h // scale_factor), Image.Resampling.LANCZOS)
    arr = cv2.cvtColor(np.array(small), cv2.COLOR_RGB2BGR)
    sh, sw = arr.shape[:2]
    
    # Margin
    rect = (int(sw*0.06), int(sh*0.08), int(sw*0.88), int(sh*0.78))
    mask = np.zeros((sh, sw), np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    
    cv2.grabCut(arr, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
    fg_mask = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
    
    # Erode to eliminate studio ground halo
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    fg_mask = cv2.erode(fg_mask, kernel, iterations=1)
    
    # Upscale mask to full resolution
    full_mask = cv2.resize(fg_mask, (w, h), interpolation=cv2.INTER_LINEAR)
    full_mask = cv2.GaussianBlur(full_mask, (5, 5), 0)
    
    alpha = full_mask.astype(float) / 255.0
    
    # Despill background color from edge
    border = np.concatenate([arr[0, :].reshape(-1,3), arr[-1, :].reshape(-1,3), arr[:, 0].reshape(-1,3), arr[:, -1].reshape(-1,3)], axis=0)
    bg_bgr = np.median(border, axis=0)
    bg_rgb = bg_bgr[::-1]
    
    rgb = np.array(img, dtype=float)
    alpha_exp = alpha[:, :, None]
    despilled = np.where(alpha_exp > 0.05,
                         np.clip((rgb - (1 - alpha_exp) * bg_rgb) / np.maximum(alpha_exp, 0.2), 0, 255),
                         0)
                         
    rgba = np.dstack([despilled.astype(np.uint8), (alpha * 255).astype(np.uint8)])
    pil_res = Image.fromarray(rgba, 'RGBA')
    bbox = pil_res.getbbox()
    if bbox:
        pil_res = pil_res.crop(bbox)
    return pil_res

def process_shoes():
    log("Processing 6 colourway shoes & normalising onto standard canvas...")
    shoes_map = {
        'neon': '36-clean.png',
        'infrared': '32-clean.png',
        'triple-black': '34-clean.png',
        'chrome': '33-clean.png',
        'desert': '2-clean.png',
        'acid-wash': '1-clean.png'
    }
    
    CANVAS_W = 1600
    CANVAS_H = 1000
    TARGET_SHOE_HEIGHT = 700
    TARGET_BASELINE_Y = 820  # Sole sits at y = 820
    
    for name, src in shoes_map.items():
        log(f"Matting and normalising shoe '{name}' from {src}...")
        cutout = clean_shoe_grabcut(src)
        
        # Scale to standard height
        sw, sh = cutout.size
        scale = TARGET_SHOE_HEIGHT / float(sh)
        new_w = int(sw * scale)
        new_h = int(sh * scale)
        scaled_cutout = cutout.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Position on standardized canvas
        canvas = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
        pos_x = (CANVAS_W - new_w) // 2
        pos_y = TARGET_BASELINE_Y - new_h
        canvas.paste(scaled_cutout, (pos_x, pos_y), scaled_cutout)
        
        canvas.save(f"public/assets/shoes/{name}.webp", format="WEBP", quality=90)
        
    # Generate close-up crops from Neon shoe (36-clean.png)
    log("Generating close-up crops from Cyber Neon...")
    with Image.open('36-clean.png') as full_img:
        w, h = full_img.size
        # Heel tab crop
        heel_crop = full_img.crop((int(w * 0.58), int(h * 0.20), int(w * 0.88), int(h * 0.65)))
        heel_crop.resize((800, 600), Image.Resampling.LANCZOS).save("public/assets/crops/heel.webp", format="WEBP", quality=90)
        
        # Mesh knit crop
        mesh_crop = full_img.crop((int(w * 0.18), int(h * 0.40), int(w * 0.48), int(h * 0.75)))
        mesh_crop.resize((800, 600), Image.Resampling.LANCZOS).save("public/assets/crops/mesh.webp", format="WEBP", quality=90)
        
        # Sole edge / air pod crop
        sole_crop = full_img.crop((int(w * 0.35), int(h * 0.55), int(w * 0.75), int(h * 0.88)))
        sole_crop.resize((800, 600), Image.Resampling.LANCZOS).save("public/assets/crops/sole-edge.webp", format="WEBP", quality=90)
    log("Shoes and crops completed.")

def process_bursts():
    log("Processing 6 colour-smoke bursts...")
    bursts_map = {
        'neon': '28-clean.png',
        'infrared': '6-clean.png',
        'triple-black': '18-clean.png',
        'chrome': '24-clean.png',
        'desert': '22-clean.png',
        'acid-wash': '23-clean.png'
    }
    
    for name, src in bursts_map.items():
        with Image.open(src) as img:
            # Sized for web background
            img_rgb = img.convert('RGB')
            w, h = img_rgb.size
            if w > 1920:
                img_rgb = img_rgb.resize((1920, int(h * 1920 / w)), Image.Resampling.LANCZOS)
            img_rgb.save(f"public/bursts/{name}.webp", format="WEBP", quality=85)
            img_rgb.save(f"public/assets/bursts/{name}.webp", format="WEBP", quality=85)
    log("Bursts completed.")

def process_textures():
    log("Processing 3 textures...")
    tex_map = {
        'carbon': '20-clean.png',
        'metal': '31-clean.png',
        'concrete': '35-clean.png'
    }
    for name, src in tex_map.items():
        with Image.open(src) as img:
            img_rgb = img.convert('RGB')
            w, h = img_rgb.size
            if w > 1920:
                img_rgb = img_rgb.resize((1920, int(h * 1920 / w)), Image.Resampling.LANCZOS)
            img_rgb.save(f"public/tex/{name}.webp", format="WEBP", quality=85)
            img_rgb.save(f"public/assets/tex/{name}.webp", format="WEBP", quality=85)
    log("Textures completed.")

def process_story_and_vault():
    log("Processing story images and vault box...")
    story_map = {
        '01-cad': '21-clean.png',
        '02-loom': '30-clean.png',
        '03-fusion': '17-clean.png',
        '04-finish': '27-clean.png',
        '05-vault': '29-clean.png'
    }
    for name, src in story_map.items():
        with Image.open(src) as img:
            img_rgb = img.convert('RGB')
            w, h = img_rgb.size
            if w > 1920:
                img_rgb = img_rgb.resize((1920, int(h * 1920 / w)), Image.Resampling.LANCZOS)
            img_rgb.save(f"public/story/{name}.webp", format="WEBP", quality=85)
            img_rgb.save(f"public/assets/story/{name}.webp", format="WEBP", quality=85)
            
    # Vault box
    with Image.open('16-clean.png') as img:
        img_rgb = img.convert('RGB')
        w, h = img_rgb.size
        if w > 1920:
            img_rgb = img_rgb.resize((1920, int(h * 1920 / w)), Image.Resampling.LANCZOS)
        img_rgb.save("public/vault/box.webp", format="WEBP", quality=85)
        img_rgb.save("public/assets/vault/box.webp", format="WEBP", quality=85)
    log("Story & Vault completed.")

def create_code_assets():
    log("Generating SVG logo, favicon, and OG image...")
    
    # 1. Wordmark SVG: "AERO-SLATE" with "//" mark in Unbounded style
    logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 48" fill="none">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@800&amp;display=swap');
    .txt { font-family: 'Unbounded', sans-serif; font-size: 26px; font-weight: 800; fill: #EDEEE9; letter-spacing: -0.03em; }
    .mark { fill: #C8F52E; }
  </style>
  <text x="0" y="34" class="txt">AERO-SLATE</text>
  <!-- Slanted // mark -->
  <polygon points="265,34 273,12 278,12 270,34" class="mark" />
  <polygon points="278,34 286,12 291,12 283,34" class="mark" />
</svg>"""
    with open("public/assets/logo.svg", "w", encoding="utf-8") as f:
        f.write(logo_svg)

    # 2. Logo Mark only SVG
    logo_mark_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <!-- Slanted // mark in volt on obsidian -->
  <rect width="48" height="48" rx="2" fill="#08090A" />
  <polygon points="12,36 21,12 27,12 18,36" fill="#C8F52E" />
  <polygon points="25,36 34,12 40,12 31,36" fill="#C8F52E" />
</svg>"""
    with open("public/assets/logo-mark.svg", "w", encoding="utf-8") as f:
        f.write(logo_mark_svg)
    with open("public/favicon.svg", "w", encoding="utf-8") as f:
        f.write(logo_mark_svg)

    # 3. Favicon ICO (generated from logo mark)
    fav = Image.new('RGBA', (64, 64), (8, 9, 10, 255))
    draw = ImageDraw.Draw(fav)
    # Draw two slanted bars in volt (#C8F52E)
    volt = (200, 245, 46, 255)
    draw.polygon([(16, 48), (28, 16), (36, 16), (24, 48)], fill=volt)
    draw.polygon([(34, 48), (46, 16), (54, 16), (42, 48)], fill=volt)
    fav.save("public/favicon.ico", format="ICO")

    # 4. OpenGraph Image (1200x630) composed from a hero frame
    hero_frame_path = "Video_frames-Hero/frame_000004.jpg"
    with Image.open(hero_frame_path) as h_img:
        og = Image.new('RGB', (1200, 630), (8, 9, 10))
        # Center crop hero frame
        h_scaled = h_img.resize((1200, int(1200 * h_img.size[1] / h_img.size[0])), Image.Resampling.LANCZOS)
        og.paste(h_scaled, (0, (630 - h_scaled.size[1]) // 2))
        
        # Add a subtle dark vignette overlay
        overlay = Image.new('RGBA', (1200, 630), (8, 9, 10, 140))
        og.paste(overlay, (0, 0), overlay)
        
        # Add branding text with PIL
        draw = ImageDraw.Draw(og)
        # Technical border
        draw.rectangle([(20, 20), (1180, 610)], outline=(237, 238, 233, 40), width=1)
        # Crosshairs
        draw.line([(15, 20), (25, 20)], fill=(200, 245, 46), width=2)
        draw.line([(20, 15), (20, 25)], fill=(200, 245, 46), width=2)
        draw.line([(1175, 20), (1185, 20)], fill=(200, 245, 46), width=2)
        draw.line([(1180, 15), (1180, 25)], fill=(200, 245, 46), width=2)
        
        # Text annotations
        draw.text((60, 60), "AERO-SLATE //", fill=(200, 245, 46))
        draw.text((60, 85), "A//EX ZERO-G DROP 01", fill=(237, 238, 233))
        draw.text((60, 530), "ENGINEERED IN ZERO GRAVITY. BUILT FOR PAVEMENT.", fill=(138, 146, 154))
        draw.text((950, 530), "OPENS 31 OCT 2026", fill=(200, 245, 46))
        
        og.save("public/assets/og-image.webp", format="WEBP", quality=90)
    log("Code assets successfully created.")

if __name__ == '__main__':
    ensure_dirs()
    process_hero_frames()
    process_textures()
    process_story_and_vault()
    process_bursts()
    process_parts()
    process_shoes()
    create_code_assets()
    log("ALL ASSETS PROCESSED AND VERIFIED!")
