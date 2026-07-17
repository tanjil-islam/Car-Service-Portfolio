"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface PartsScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function PartsScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: PartsScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastRenderedIndex = useRef<number>(-1);

  // 1. Preload all images on mount
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `${imageFolderPath}${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [totalFrames, imageFolderPath]);

  // Function to render a specific frame on the canvas
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = images[frameIndex];
    if (!image) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Adjust canvas resolution for high-DPI screens
    if (canvas.width !== width * devicePixelRatio || canvas.height !== height * devicePixelRatio) {
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Object-fit: contain logic for the canvas
    const imgWidth = image.naturalWidth;
    const imgHeight = image.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // 2. React to resize events to redraw canvas with correct aspect ratio
  useEffect(() => {
    const handleResize = () => {
      if (lastRenderedIndex.current !== -1) {
        renderFrame(lastRenderedIndex.current);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // 3. Sync scrollYProgress to frame rendering
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;

    // Ensure the index falls strictly between 0 and totalFrames - 1
    const frameIndex = Math.min(
      Math.max(Math.floor(latest * totalFrames), 0),
      totalFrames - 1
    );

    if (frameIndex !== lastRenderedIndex.current) {
      lastRenderedIndex.current = frameIndex;
      requestAnimationFrame(() => renderFrame(frameIndex));
    }
  });

  // Render first frame once loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      lastRenderedIndex.current = 0;
      renderFrame(0);
    }
  }, [isLoaded, images]);

  return (
    <div className="relative w-full h-full bg-void flex items-center justify-center">
      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full max-h-[85vh] transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* LOADER */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-void z-20">
          <div className="w-64 border border-plasma/20 p-1 rounded-sm overflow-hidden mb-4">
            <div
              className="h-1.5 bg-plasma transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] text-plasma">
            LOADING PARTS // {loadingProgress}%
          </span>
        </div>
      )}

      {/* SUBTLE GLOW OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-void/50 to-void" />
    </div>
  );
}
