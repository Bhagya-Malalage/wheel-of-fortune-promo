"use client";

import { motion } from "framer-motion";
import React from "react";

const SmokeParticle = ({ delay, index }: { delay: number; index: number }) => (
  <motion.div
    initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
    animate={{
      opacity: 0,
      scale: 4,
      x: -120,
      y: (index % 2 === 0 ? 1 : -1) * 30,
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
    className="absolute right-[80%] top-1/2 w-12 h-12 bg-white/40 rounded-full blur-xl z-0"
  />
);

export default function BackgroundObjects() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050505] z-0">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505] via-[#000000] to-[#0a0a0a]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[radial-gradient(circle_at_50%_-20%,#ef4444_0%,transparent_70%)]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* --- AVIATOR PLANE SECTION --- */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <motion.div
          initial={{ x: "-100vw", y: "10vh", rotate: 10, opacity: 0 }}
          animate={{ x: "15vw", y: "0vh", rotate: 0, opacity: 1 }}
          transition={{
            duration: 5,
            ease: [0.16, 1, 0.3, 1], // Smooth "landing" deceleration
            delay: 0.5,
          }}
          className="absolute left-1/2 top-1/2 z-20"
        >
          <div className="relative">
            {/* White Smoke Trail */}
            {[...Array(10)].map((_, i) => (
              <SmokeParticle key={i} index={i} delay={i * 0.1} />
            ))}

            {/* Plane Image */}
            <img
              src="/aviator-plane.png"
              alt="Aviator Plane"
              className="w-40 md:w-72 h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Vignette effect for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
}
