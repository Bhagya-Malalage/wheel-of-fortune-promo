"use client";
import { motion } from "framer-motion";

export default function ClaimModal({
  isOpen,
  prize,
}: {
  isOpen: boolean;
  prize: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1e1b4b] border border-indigo-500/50 rounded-[40px] p-10 max-w-md w-full text-center shadow-[0_0_100px_rgba(79,70,229,0.4)]"
      >
        <h2 className="text-indigo-400 uppercase font-bold tracking-[0.2em] text-sm mb-2">
          Congratulations!
        </h2>
        <h1 className="text-white text-4xl font-black mb-8 italic">YOU WON</h1>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent" />
          <div className="text-yellow-400 font-bold text-2xl relative z-10">
            {prize} Bonus
          </div>
          <div className="text-white/40 text-xs mt-1">Limited Time Reward</div>
        </div>

        <div className="mb-10">
          <p className="text-white/40 text-xs mb-3 uppercase tracking-widest">
            Promo Code
          </p>
          <div className="bg-indigo-600 text-white font-mono text-3xl font-bold py-4 rounded-2xl shadow-inner">
            SPIN10
          </div>
        </div>

        <button
          onClick={() =>
            (window.location.href = "https://www.yolo247.site/login")
          }
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-indigo-950 font-black py-5 rounded-2xl shadow-[0_10px_0_rgb(202,138,4)] active:translate-y-1 active:shadow-none transition-all uppercase text-lg"
        >
          Claim Now
        </button>

        <p className="text-white/20 text-[10px] mt-8 uppercase tracking-widest">
          Valid until Feb 28, 2026
        </p>
      </motion.div>
    </div>
  );
}
