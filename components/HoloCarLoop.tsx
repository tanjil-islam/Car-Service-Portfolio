"use client";

import { useEffect, useRef, useState } from "react";

export default function HoloCarLoop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameIndex = useRef(0);
  const totalFrames = 300;

  // Preload a subset of frames for the hero to make it load instantly (e.g., every 3rd frame = 100 frames)
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    const step = 3; // Load every 3rd frame for faster loading in the hero
    const framesToLoad = Math.floor(totalFrames / step);

    for (let i = 1; i <= totalFrames; i += step) {
      const img = new Image();
      img.src = `/images/zonda-sequence/${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === framesToLoad) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Frame looping animation loop
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const devicePixelRatio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * devicePixelRatio || canvas.height !== height * devicePixelRatio) {
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const image = images[frameIndex.current];
      if (image) {
        // Object-fit contain logic
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

        // Apply a solid cyan tint directly onto the canvas context
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = "rgba(0, 245, 255, 0.4)"; // Cyan
        ctx.fillRect(0, 0, width, height);

        // Add a scanline pattern overlay on top of the car image
        ctx.fillStyle = "rgba(3, 0, 13, 0.15)";
        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 1);
        }
      }

      ctx.restore();

      // Next frame
      frameIndex.current = (frameIndex.current + 1) % images.length;
      
      // Control loop speed (approx. 24fps)
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(render);
      }, 40);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Circular Radar/Telemetry Rings in background */}
      <div className="absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] border border-plasma/10 rounded-full flex items-center justify-center z-0 animate-pulse">
        <div className="w-[85%] h-[85%] border border-dashed border-holo/10 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
        <div className="w-[65%] h-[65%] border border-dashed border-plasma/5 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
        
        {/* Holographic Radar sweeps */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_50%,rgba(0,245,255,0.05))] rounded-full animate-spin" style={{ animationDuration: "6s" }} />
      </div>

      {/* CANVAS FOR LOOPING CAR */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full max-h-[40vh] md:max-h-[60vh] z-10 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Scanning status banner */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-[9px] font-orbitron text-plasma/40 tracking-wider">
        <span>SYS.HECT_SCAN: ACTIVE</span>
        <span className="animate-ping w-1.5 h-1.5 rounded-full bg-plasma" />
      </div>
    </div>
  );
}
