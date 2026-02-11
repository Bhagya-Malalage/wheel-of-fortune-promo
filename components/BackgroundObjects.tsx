"use client";

import { motion } from "framer-motion";
import React from "react";

// --- SMOKE PARTICLE COMPONENT ---
const SmokeParticle = ({ delay, index, reverse = false }: { delay: number; index: number; reverse?: boolean }) => (
  <motion.div
    initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
    animate={{
      opacity: 0,
      scale: 4,
      x: reverse ? 120 : -120,
      y: (index % 2 === 0 ? 1 : -1) * 30,
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
    className={`absolute ${reverse ? "left-[80%]" : "right-[80%]"} top-1/2 w-12 h-12 bg-white/40 rounded-full blur-xl z-0`}
  />
);

// --- ENHANCED 3D COIN COMPONENT (Blur Removed) ---
const FloatingCoin = ({ 
  size, top, left, delay, rotateZ = 0, duration = 4 
}: { 
  size: number, top: string, left: string, delay: number, rotateZ?: number, duration?: number 
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ 
        top, left, width: size, height: size, zIndex: size > 60 ? 30 : 5,
    }}
    initial={{ opacity: 0, scale: 0, rotateZ }}
    animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -20, 0], 
        rotateY: [0, 360],
    }}
    transition={{
      opacity: { duration: 1 },
      scale: { duration: 1 },
      y: { repeat: Infinity, duration, ease: "easeInOut", delay },
      rotateY: { repeat: Infinity, duration: duration * 2, ease: "linear", delay }
    }}
  >
    <div className="relative w-full h-full rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)]"
         style={{
           background: "radial-gradient(circle at 30% 30%, #fef3c7 0%, #fbbf24 40%, #92400e 100%)",
           border: `${size * 0.05}px solid #78350f`
         }}>
      <div className="absolute inset-[15%] rounded-full border border-[#92400e]/40 flex items-center justify-center">
        <span className="text-[#78350f] font-black" style={{ fontSize: size * 0.4 }}>$</span>
      </div>
      <div className="absolute top-1 left-2 w-1/3 h-1/3 bg-white/40 rounded-full blur-[4px]" />
    </div>
  </motion.div>
);

export default function BackgroundObjects() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050505] z-0">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505] via-[#000000] to-[#0a0a0a]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[radial-gradient(circle_at_50%_-20%,#ef4444_0%,transparent_70%)]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* --- DENSE REALISTIC COIN POPULATION --- */}
      
      {/* BACKGROUND COINS (Small) */}
      <FloatingCoin size={20} top="10%" left="15%" delay={0.2} rotateZ={15} />
      <FloatingCoin size={25} top="40%" left="5%" delay={1.5} rotateZ={-10} />
      <FloatingCoin size={18} top="60%" left="92%" delay={0.8} rotateZ={45} />
      <FloatingCoin size={22} top="85%" left="45%" delay={2.2} rotateZ={120} />
      
      {/* MID-GROUND COINS (Medium size) */}
      <FloatingCoin size={45} top="20%" left="80%" delay={0} rotateZ={-20} duration={5} />
      <FloatingCoin size={50} top="75%" left="12%" delay={1.1} rotateZ={10} duration={6} />
      <FloatingCoin size={40} top="15%" left="88%" delay={3} rotateZ={200} duration={4.5} />
      <FloatingCoin size={35} top="70%" left="82%" delay={0.5} rotateZ={-45} duration={5.5} />

      {/* FOREGROUND COINS (Large, now sharp without blur) */}
      <FloatingCoin size={110} top="-5%" left="5%" delay={0.4} rotateZ={-30} duration={8} />
      <FloatingCoin size={90} top="80%" left="85%" delay={2} rotateZ={40} duration={7} />
      <FloatingCoin size={70} top="25%" left="90%" delay={1.2} rotateZ={15} duration={9} />
      <FloatingCoin size={80} top="85%" left="-2%" delay={0.7} rotateZ={-15} duration={7.5} />

      {/* --- AVIATOR PLANES SECTION --- */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        {/* PLANE 1 */}
        <motion.div
          initial={{ x: "-100vw", y: "10vh", rotate: 10, opacity: 0 }}
          animate={{ x: "25vw", y: "8vh", rotate: 0, opacity: 1 }}
          transition={{ duration: 5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute left-1/2 top-1/2 z-20"
        >
          <div className="relative">
            {[...Array(10)].map((_, i) => (
              <SmokeParticle key={i} index={i} delay={i * 0.1} />
            ))}
            <img src="/aviator-plane.png" alt="Plane 1" className="w-36 md:w-64 h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
          </div>
        </motion.div>

        {/* PLANE 2 */}
        <motion.div
          initial={{ x: "100vw", y: "-40vh", rotate: -10, opacity: 0 }}
          animate={{ x: "-35vw", y: "-28vh", rotate: -5, opacity: 1 }}
          transition={{ duration: 5.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="absolute left-1/2 top-1/2 z-20"
        >
          <div className="relative">
            {[...Array(10)].map((_, i) => (
              <SmokeParticle key={i} index={i} delay={i * 0.1} reverse={true} />
            ))}
            <img src="/aviator-plane-2.png" alt="Plane 2" className="w-36 md:w-64 h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
          </div>
        </motion.div>
      </div>

      {/* Vignette effect for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
}