"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BackgroundObjects from "@/components/BackgroundObjects";
import Wheel from "@/components/Wheel";
import ClaimModal from "@/components/ClaimModal";
import confetti from "canvas-confetti";

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
        colors: ["#fbbf24", "#ffffff", "#ef4444"],
      });
      setTimeout(() => setShowModal(true), 1500);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden select-none bg-black">
      <BackgroundObjects />

      {/* --- CASINO HEADER (Reduced top padding on mobile to fit larger wheel) --- */}
      <div className="relative z-30 w-full flex flex-col items-center pt-4 md:pt-14 px-4">
        <div className="text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-amber-700 leading-none uppercase"
            style={{ fontFamily: "Impact, sans-serif" }}
          >
            WHEEL OF
          </motion.h1>
          <div className="mt-1">
            <span className="text-3xl md:text-6xl font-bold text-white tracking-[0.4em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              FORTUNE
            </span>
          </div>
        </div>
      </div>

      {/* --- WHEEL SECTION (Maximized Mobile Scale) --- */}
      <div className="relative z-20 scale-[1.05] sm:scale-100 md:scale-95 flex-grow flex items-center transform-gpu py-0">
        <Wheel
          onFinished={handleFinished}
          disabled={attempts >= maxAttempts}
          attempts={attempts}
          maxAttempts={maxAttempts}
        />
      </div>

      {/* --- MINIMALIST FOOTER BAR --- */}
      <footer className="relative z-40 w-full bg-black/95 backdrop-blur-md border-t border-white/5 py-3 md:py-4 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[9px] md:text-[11px] text-gray-400 tracking-tight font-medium leading-relaxed">
            <span className="text-gray-200 font-bold uppercase mr-1">
              Terms and Conditions:
            </span>
            Eligibility: Open to all users who have completed FTD.
            Participation: Each user gets two free spins. Rewards: Promocodes
            are to be availed during a redeposit. The Brand reserves the right
            to modify or cancel without prior notice.
          </p>
        </div>
      </footer>

      <ClaimModal isOpen={showModal} prize={wonPrize} />
    </main>
  );
}
