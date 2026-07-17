"use client";

import { useEffect, useRef, useState } from "react";

interface FleetVehicle {
  id: string;
  name: string;
  subName: string;
  power: string;
  torque: string;
  acceleration: string;
  weight: string;
}

const fleetList: FleetVehicle[] = [
  {
    id: "zonda",
    name: "PAGANI ZONDA R",
    subName: "THE TRACK WEAPON",
    power: "750 HP",
    torque: "710 NM",
    acceleration: "2.7 SEC",
    weight: "1,070 KG",
  },
  {
    id: "gtr",
    name: "NISSAN GT-R R35",
    subName: "STREET DRAG DEMON",
    power: "1,100 HP",
    torque: "1,250 NM",
    acceleration: "2.1 SEC",
    weight: "1,720 KG",
  },
  {
    id: "supra",
    name: "TOYOTA SUPRA MK4",
    subName: "TUNER LEGEND",
    power: "850 HP",
    torque: "900 NM",
    acceleration: "3.2 SEC",
    weight: "1,510 KG",
  },
  {
    id: "m3",
    name: "BMW M3 E46",
    subName: "COMPACT PRECISION",
    power: "550 HP",
    torque: "620 NM",
    acceleration: "3.8 SEC",
    weight: "1,460 KG",
  },
];

export default function FleetViewer() {
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicle>(fleetList[0]);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const totalFrames = 300;

  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);
  const isDragging = useRef(false);

  // Auto-play rotation logic
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev >= totalFrames ? 1 : prev + 1));
    }, 45); // ~22 fps

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Touch/Mouse Drag handlers for manual rotation
  const handleStart = (clientX: number) => {
    setIsPlaying(false);
    isDragging.current = true;
    dragStartX.current = clientX;
    dragStartFrame.current = currentFrame;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;

    const deltaX = clientX - dragStartX.current;
    const stepSize = 5; // Pixels per frame step
    const frameOffset = Math.floor(deltaX / stepSize);

    let nextFrame = dragStartFrame.current - frameOffset;

    while (nextFrame < 1) nextFrame += totalFrames;
    while (nextFrame > totalFrames) nextFrame -= totalFrames;

    setCurrentFrame(nextFrame);
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  const rotationDegrees = Math.round(((currentFrame - 1) / totalFrames) * 360);

  return (
    <section
      id="fleet"
      className="py-32 px-6 md:px-12 bg-void border-t border-plasma/10 relative overflow-hidden perspective-container"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-[10px] tracking-[0.35em] text-plasma mb-2 uppercase drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">
            // SPECIFICATION SCHEMA
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl tracking-wide text-text uppercase">
            360° <span className="text-holo-gradient glow-cyan">HOLOGRAPHIC</span> VIEWER
          </h2>
          <div className="h-[2px] w-24 bg-holo-gradient mt-4 rounded-full glow-cyan" />
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 flex-wrap mb-10 border-b border-plasma/20 pb-6">
          {fleetList.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className={`font-mono text-[11px] tracking-widest uppercase px-6 py-3 border rounded-md transition-all duration-300 cursor-pointer ${
                selectedVehicle.id === vehicle.id
                  ? "border-plasma text-void bg-plasma glow-cyan font-bold"
                  : "border-muted/30 text-muted hover:border-plasma/50 hover:text-plasma hover:bg-plasma/5"
              }`}
            >
              {vehicle.name.split(" ")[2] || vehicle.name.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Specs sheet (looks like dealer spec sheet) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            <div className="holo-panel p-6 border-t-2 border-t-plasma rounded-xl flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-plasma block mb-1">
                  MODEL OVERVIEW // {selectedVehicle.subName}
                </span>
                <h3 className="font-bebas text-4xl tracking-wide text-text uppercase mb-6 drop-shadow-lg">
                  {selectedVehicle.name}
                </h3>
                
                {/* Stats spec table */}
                <div className="flex flex-col gap-4 font-mono text-[12px] text-muted">
                  {[
                    { label: "ENGINE POWER OUTPUT", value: selectedVehicle.power },
                    { label: "PEAK TORQUE RATIO", value: selectedVehicle.torque },
                    { label: "0 - 100 KM/H INTERVAL", value: selectedVehicle.acceleration },
                    { label: "DRY UNLADEN WEIGHT", value: selectedVehicle.weight },
                  ].map((stat, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex justify-between items-center border-b border-plasma/20 pb-2"
                    >
                      <span className="tracking-wider text-muted uppercase">{stat.label}</span>
                      <span className="text-plasma font-bold drop-shadow-[0_0_5px_rgba(0,245,255,0.5)]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-[10px] font-mono text-muted/70 leading-relaxed tracking-wider border-t border-plasma/20 pt-4 uppercase">
                * ROTATE VIEWPORT PORT TO EXAMINE CHASSIS AERO SHEEN.
              </div>
            </div>

            {/* Rotation Controls */}
            <div className="flex items-center gap-4 justify-between holo-panel px-6 py-4 rounded-xl">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="px-6 py-3 border border-plasma/30 text-plasma text-[11px] font-mono tracking-widest uppercase hover:bg-plasma/10 transition-colors duration-200 rounded-md cursor-pointer glow-cyan"
              >
                {isPlaying ? "PAUSE ROTATION" : "PLAY AUTO ROTATION"}
              </button>
              <div className="text-right text-[11px] font-mono tracking-widest text-muted">
                FRAME: <span className="text-plasma font-bold">{currentFrame} / {totalFrames}</span>
              </div>
            </div>
          </div>

          {/* Right panel: 360° interactive slider (looks like blackroom print sheet) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative transform-gpu hover:-rotate-y-2 transition-transform duration-500">
            <div
              onMouseDown={(e) => handleStart(e.clientX)}
              onMouseMove={(e) => handleMove(e.clientX)}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={(e) => e.touches[0] && handleStart(e.touches[0].clientX)}
              onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
              onTouchEnd={handleEnd}
              className="w-full aspect-[16/10] holo-panel rounded-xl border border-plasma/30 flex items-center justify-center cursor-grab active:cursor-grabbing relative overflow-hidden group shadow-[0_0_30px_rgba(122,0,255,0.15)_inset]"
            >
              {/* Subtle film vignette over rotation frame */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-void/30 to-void/80 pointer-events-none z-10" />

              {/* Render current image */}
              <img
                src={`/images/zonda-sequence/${currentFrame}.jpg`}
                alt="Rotating Vehicle"
                className="max-h-[90%] max-w-[90%] object-contain select-none pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-300 z-0 drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]"
              />

              {/* Technical degree data indicator */}
              <div className="absolute bottom-6 right-6 text-right z-20 font-mono">
                <span className="text-[10px] tracking-widest text-plasma block mb-1">CHASSIS DEGREE WHEEL</span>
                <span className="text-2xl font-bold text-text drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{rotationDegrees}°</span>
              </div>

              {/* Grid scanning brackets */}
              <div className="absolute top-6 left-6 text-[10px] font-mono text-plasma tracking-wider z-20">
                FRAME_INDEX // {currentFrame}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
