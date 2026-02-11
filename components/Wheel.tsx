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
  const [currentRotation, setCurrentRotation] = useState(0);

  const totalSegments = PRIZES.length;
  const sliceAngle = 360 / totalSegments;

  const spinWheel = async () => {
    if (isSpinning || disabled) return;
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * totalSegments);
    const spinCount = 5;

    const degreesToTarget = 360 - randomIndex * sliceAngle;
    const newRotation =
      currentRotation +
      360 * spinCount +
      (360 - (currentRotation % 360)) +
      degreesToTarget;

    await controls.start({
      rotate: newRotation,
      transition: { duration: 5, ease: [0.15, 0.8, 0.25, 1] },
    });

    setCurrentRotation(newRotation);
    setIsSpinning(false);

    onFinished(
      `${PRIZES[randomIndex].label} ${PRIZES[randomIndex].value.replace("\n", " ")}`,
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center scale-90 md:scale-100">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes blink {
          0%, 100% { opacity: 1; filter: brightness(1.2); }
          50% { opacity: 0.3; filter: brightness(0.5); }
        }
        .bulb-light {
           background: radial-gradient(circle at 30% 30%, #ffffff 0%, #facc15 40%, #ea580c 100%);
           box-shadow: 0 0 8px rgba(250, 204, 21, 0.8);
        }
      `,
        }}
      />

      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#1a0505] border-[10px] border-[#2d0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.8),_inset_0_0_20px_rgba(239,68,68,0.2)] flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div className="absolute -translate-y-[142px] md:-translate-y-[240px]">
                <div
                  className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full bulb-light"
                  style={{
                    animation: `blink 1.5s infinite ease-in-out`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <motion.div
          animate={controls}
          initial={{ rotate: 0 }}
          className="relative w-[270px] h-[270px] md:w-[460px] md:h-[460px] rounded-full overflow-hidden border-[4px] border-[#2d0a0a] z-10"
          style={{
            background: `conic-gradient(${PRIZES.map((p, i) => `${p.bgColor} ${i * sliceAngle}deg ${(i + 1) * sliceAngle}deg`).join(",")})`,
          }}
        >
          {PRIZES.map((prize, i) => {
            const rotation = i * sliceAngle + sliceAngle / 2;
            const isJackpot = prize.label === "JACKPOT";
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 flex flex-col justify-start items-center text-center pt-4 md:pt-8"
                style={{
                  transformOrigin: "bottom center",
                  transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
                  height: "50%",
                  width: isJackpot ? "120px" : "100px", // wider for Jackpot
                  overflow: "hidden", // ensures text stays inside segment
                  wordBreak: "break-word",
                }}
              >
                <div
                  className="flex flex-col items-center leading-none select-none"
                  style={{ color: prize.textColor }}
                >
                  <span
                    className={`font-black uppercase tracking-tight ${isJackpot ? "text-[10px] md:text-xl" : "text-[9px] md:text-lg"}`}
                  >
                    {prize.label}
                  </span>
                  <span
                    className={`font-bold uppercase mt-1 ${prize.value.includes("\n") ? "text-[12px] md:text-xl leading-tight" : "text-lg md:text-4xl"}`}
                  >
                    {prize.value}
                  </span>
                  {prize.sub && (
                    <span className="text-[7px] md:text-[10px] font-bold uppercase opacity-80 mt-1">
                      {prize.sub}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="absolute z-30 flex items-center justify-center pointer-events-none">
          <div
            onClick={spinWheel}
            className={`w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-[#fbbf24] via-[#b45309] to-[#451a03] p-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.6)] pointer-events-auto cursor-pointer transition-transform active:scale-90 ${isSpinning || disabled ? "grayscale opacity-80 cursor-not-allowed" : ""}`}
          >
            <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center border border-white/10">
              <span className="text-[#fbbf24] font-black text-sm md:text-2xl uppercase tracking-tighter">
                SPIN
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-[-10px] md:top-[-20px] z-40">
          <div className="w-0 h-0 border-l-[15px] md:border-l-[22px] border-l-transparent border-r-[15px] md:border-r-[22px] border-r-transparent border-t-[30px] md:border-t-[45px] border-t-[#fbbf24] drop-shadow-lg" />
        </div>
      </div>

      <div className="mt-12 md:mt-16 z-20 flex flex-col items-center">
        <span className="text-white/60 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] mb-4">
          Attempts Remaining
        </span>

        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
          {[...Array(maxAttempts)].map((_, index) => {
            const isAvailable = index >= attempts;
            return (
              <div key={index} className="relative">
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 ${isAvailable ? "bg-[#fbbf24] shadow-[0_0_10px_#fbbf24]" : "bg-white/10"}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
