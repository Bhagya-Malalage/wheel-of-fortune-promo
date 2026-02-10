"use client";

import { useState } from "react";
import BackgroundObjects from "@/components/BackgroundObjects";
import Wheel from "@/components/Wheel";
import ClaimModal from "@/components/ClaimModal";
import confetti from "canvas-confetti";

const scriptFont = "'Dancing Script', 'Alex Brush', 'Great Vibes', cursive";

export default function LandingPage() {
  const maxAttempts = 2;
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [wonPrize, setWonPrize] = useState("");

  const handleFinished = (prize: string) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setWonPrize(prize);

    if (newAttempts >= maxAttempts) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#fbbf24", "#ffffff", "#6366f1"],
      });
      setTimeout(() => setShowModal(true), 1500);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden select-none bg-[#60a5fa]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
      `}</style>

      <BackgroundObjects />

      {/* --- ARCED 3D HEADER SECTION --- */}
      <div className="relative z-30 w-full flex flex-col items-center pt-8 md:pt-14 mb-10 md:mb-16">
        <div className="relative w-[340px] h-[100px] md:w-[650px] md:h-[160px]">
          <svg
            viewBox="0 0 500 180"
            className="w-full h-full overflow-visible drop-shadow-[0_10px_0_#92400e]"
          >
            <defs>
              <path
                id="curve"
                d="M 50,140 Q 250,20 450,140"
                fill="transparent"
              />
            </defs>
            <text
              width="500"
              className="fill-yellow-400 font-[1000] italic uppercase"
              style={{
                fontSize: "105px",
                fontFamily:
                  'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                letterSpacing: "-2px",
              }}
            >
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                WHEEL OF
              </textPath>
            </text>
          </svg>

          <div className="absolute inset-0 flex items-end justify-center">
            <h2
              className="text-4xl md:text-7xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              style={{
                fontFamily: scriptFont,
                fontWeight: "700",
                transform: "translateY(25px)",
                letterSpacing: "1px",
              }}
            >
              Fortune
            </h2>
          </div>
        </div>
      </div>

      {/* --- SPINNING WHEEL --- */}
      <div className="relative z-10 scale-[0.7] md:scale-90 lg:scale-105 mt-10 md:mt-16 transform-gpu">
        <Wheel
          onFinished={handleFinished}
          disabled={attempts >= maxAttempts}
          attempts={attempts}
          maxAttempts={maxAttempts}
        />
      </div>

      <ClaimModal isOpen={showModal} prize={wonPrize} />
    </main>
  );
}
