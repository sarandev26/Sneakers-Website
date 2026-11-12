'use client';

const TOTAL_FRAMES = 119;
export const heroFramesCache: HTMLImageElement[] = [];
let isPreloaded = false;

export function preloadAllFrames(onProgress: (pct: number) => void): Promise<void> {
  if (typeof window === 'undefined') {
    onProgress(100);
    return Promise.resolve();
  }

  if (isPreloaded && heroFramesCache.length === TOTAL_FRAMES) {
    onProgress(100);
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let loadedCount = 0;
    const totalToLoad = TOTAL_FRAMES + 6; // 119 frames + 6 shoes
    let isSettled = false;

    const check = () => {
      loadedCount++;
      const currentPct = Math.min(100, Math.floor((loadedCount / totalToLoad) * 100));
      onProgress(currentPct);
      if (loadedCount >= totalToLoad && !isSettled) {
        isSettled = true;
        isPreloaded = true;
        resolve();
      }
    };

    // Safety timeout: resolve after 2.2s regardless so user is never blocked
    const timeout = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        isPreloaded = true;
        onProgress(100);
        resolve();
      }
    }, 2200);

    // Preload 119 hero frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = String(i).padStart(4, '0');

      img.onload = check;
      img.onerror = check;
      img.src = `/frames/hero/f_${numStr}.webp`;

      if (img.complete && img.naturalWidth > 0) {
        check();
      }

      heroFramesCache[i - 1] = img;
    }

    // Preload 6 shoes
    const shoes = ['neon', 'infrared', 'triple-black', 'chrome', 'desert', 'acid-wash'];
    shoes.forEach((shoe) => {
      const img = new window.Image();
      img.onload = check;
      img.onerror = check;
      img.src = `/assets/shoes/${shoe}.webp`;

      if (img.complete && img.naturalWidth > 0) {
        check();
      }
    });
  });
}
