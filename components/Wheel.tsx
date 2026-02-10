"use client";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const PRIZES = [
  {
    label: "AVIATOR",
    value: "30%",
    sub: "Bonus",
    bgColor: "#ef4444",
    textColor: "#ffffff",
  },
  {
    label: "2%",
    value: "Extra\nRefill",
    sub: "Bonus",
    bgColor: "#ffffff",
    textColor: "#dc2626",
  },
  {
    label: "4%",
    value: "Extra\nRefill",
    sub: "Bonus",
    bgColor: "#ef4444",
    textColor: "#ffffff",
  },
  {
    label: "7%",
    value: "Extra\nRefill",
    sub: "Bonus",
    bgColor: "#ffffff",
    textColor: "#dc2626",
  },
  {
    label: "10%",
    value: "Extra\nRefill",
    sub: "Bonus",
    bgColor: "#ef4444",
    textColor: "#ffffff",
  },
  {
    label: "JACKPOT",
    value: "₹100,000",
    sub: "",
    bgColor: "#facc15",
    textColor: "#451a03",
  },
  {
    label: "AVIATOR",
    value: "₹50",
    sub: "Cash back",
    bgColor: "#ef4444",
    textColor: "#ffffff",
  },
  {
    label: "VORTEX",
    value: "20%",
    sub: "Bonus",
    bgColor: "#ffffff",
    textColor: "#dc2626",
  },
];

interface WheelProps {
  onFinished: (prize: string) => void;
  disabled: boolean;
  attempts: number;
  maxAttempts: number;
}

export default function Wheel({
  onFinished,
  disabled,
  attempts,
  maxAttempts,
}: WheelProps) {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  // NEW: Track the current rotation degree
  const [currentRotation, setCurrentRotation] = useState(0);

  const totalSegments = PRIZES.length;
  const sliceAngle = 360 / totalSegments;

  const spinWheel = async () => {
    if (isSpinning || disabled) return;
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * totalSegments);
    const spinCount = 5; // Number of full rotations
    
    /**
     * LOGIC FIX:
     * 1. Calculate how many degrees we need to reach the target prize (360 - (index * sliceAngle))
     * 2. Add full spin cycles (360 * spinCount)
     * 3. Add this to the currentRotation so the animation always starts from where it left off
     */
    const degreesToTarget = 360 - (randomIndex * sliceAngle);
    const newRotation = currentRotation + (360 * spinCount) + (360 - (currentRotation % 360)) + degreesToTarget;

    await controls.start({
      rotate: newRotation,
      transition: { duration: 5, ease: [0.15, 0.8, 0.25, 1] },
    });

    // Save the rotation so the next spin starts here
    setCurrentRotation(newRotation);
    setIsSpinning(false);
    
    onFinished(
      `${PRIZES[randomIndex].label} ${PRIZES[randomIndex].value.replace("\n", " ")}`,
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); filter: brightness(1.3); box-shadow: 0 0 12px rgba(250, 204, 21, 0.9); }
          50% { opacity: 0.4; transform: scale(0.85); filter: brightness(0.6); box-shadow: 0 0 2px rgba(250, 204, 21, 0.2); }
        }
        .bulb-light {
           background: radial-gradient(circle at 30% 30%, #ffffff 0%, #facc15 40%, #ea580c 100%);
           border: 1px solid rgba(0,0,0,0.2);
        }
      `,
        }}
      />

      <div className="relative w-[310px] h-[310px] md:w-[540px] md:h-[540px] flex items-center justify-center">
        {/* 1. OUTER FRAME */}
        <div className="absolute inset-0 rounded-full bg-[#991b1b] border-[12px] border-[#7f1d1d] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center justify-center">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
              style={{ transform: `rotate(${i * 15}deg)` }}
            >
              <div className="absolute -translate-y-[146px] md:-translate-y-[258px]">
                <div
                  className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] rounded-full bulb-light"
                  style={{
                    transform: `rotate(-${i * 15}deg)`,
                    animation: `blink 1.2s infinite ease-in-out`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 2. SPINNING WHEEL */}
        <motion.div
          animate={controls}
          initial={{ rotate: 0 }}
          className="relative w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden border-[4px] border-white z-10 shadow-2xl"
          style={{
            background: `conic-gradient(${PRIZES.map((p, i) => `${p.bgColor} ${i * sliceAngle}deg ${(i + 1) * sliceAngle}deg`).join(",")})`,
          }}
        >
          {PRIZES.map((prize, i) => {
            const rotation = i * sliceAngle + sliceAngle / 2;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 flex flex-col justify-start items-center text-center pt-5 md:pt-10"
                style={{
                  transformOrigin: "bottom center",
                  transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
                  height: "50%",
                  width: "120px",
                }}
              >
                <div
                  className="flex flex-col items-center leading-none"
                  style={{ color: prize.textColor }}
                >
                  <span
                    className={`font-black uppercase drop-shadow-sm mb-1 ${prize.label === "JACKPOT" ? "text-sm md:text-2xl tracking-widest mt-1 md:mt-2" : prize.label.length > 3 ? "text-[10px] md:text-base tracking-widest" : "text-2xl md:text-5xl"}`}
                  >
                    {prize.label}
                  </span>
                  <span
                    className={`font-bold uppercase ${prize.label === "JACKPOT" ? "text-[10px] md:text-xl tracking-tighter whitespace-nowrap" : prize.value.includes("\n") ? "text-[9px] md:text-[14px] leading-tight whitespace-pre-wrap" : "text-2xl md:text-5xl whitespace-nowrap"}`}
                  >
                    {prize.value}
                  </span>
                  {prize.sub && (
                    <span className="text-[8px] md:text-[11px] font-bold uppercase opacity-90 mt-1 tracking-wide">
                      {prize.sub}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* 3. CENTER BUTTON */}
        <div className="absolute z-30 flex items-center justify-center pointer-events-none">
          <div
            onClick={spinWheel}
            className={`w-16 h-16 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#fbbf24] via-[#b45309] to-[#78350f] border-[3px] border-[#fde68a] shadow-[0_5px_15px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-auto cursor-pointer transition-transform active:scale-95 ${isSpinning || disabled ? "grayscale opacity-90 cursor-not-allowed" : ""}`}
          >
            <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-b from-[#d97706] to-[#92400e] rounded-full flex items-center justify-center shadow-inner">
              <span className="text-[#3c1303] font-black text-sm md:text-2xl uppercase tracking-widest">
                SPIN
              </span>
            </div>
          </div>
        </div>

        {/* 4. POINTER */}
        <div className="absolute top-[-10px] md:top-[-20px] z-40">
          <div className="w-0 h-0 border-l-[12px] md:border-l-[18px] border-l-transparent border-r-[12px] md:border-r-[18px] border-r-transparent border-t-[28px] md:border-t-[45px] border-t-[#dc2626]" />
        </div>
      </div>

      {/* 5. ATTEMPTS INDICATOR */}
      <div className="absolute -bottom-28 md:-bottom-36 z-20 flex flex-col items-center">
        <span className="text-white font-black uppercase text-[14px] md:text-xl tracking-[0.15em] mb-4 drop-shadow-lg">
          ATTEMPTS LEFT
        </span>

        <div className="flex items-center justify-center gap-6 px-10 py-4 rounded-[40px] bg-white/30 backdrop-blur-sm border border-white/20 shadow-xl min-w-[180px] md:min-w-[240px]">
          {[...Array(maxAttempts)].map((_, index) => {
            const isAvailable = index >= attempts;
            return (
              <div key={index} className="relative flex flex-col items-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className={`transition-all duration-500 ${isAvailable ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "opacity-20 grayscale scale-90"}`}
                >
                  <path
                    d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                    fill={isAvailable ? "#fbbf24" : "#ffffff"}
                  />
                </svg>
                {isAvailable && (
                  <div className="absolute -bottom-1 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_#fbbf24] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}