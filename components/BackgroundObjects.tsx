"use client";

import { motion } from "framer-motion";

/**
 * STANDARD CLOUD PUFF
 */
const CloudPuff = ({
  top,
  left,
  size,
  opacity = 1,
  blur = "blur-xl",
}: {
  top: string;
  left: string;
  size: number;
  opacity?: number;
  blur?: string;
}) => (
  <div
    className={`absolute bg-white/95 rounded-full ${blur} pointer-events-none select-none`}
    style={{
      top,
      left,
      width: size,
      height: size * 0.7,
      opacity,
      boxShadow: `inset -15px -15px 30px rgba(160, 210, 255, 0.4), 0 10px 30px rgba(0,0,0,0.05)`,
    }}
  />
);

/**
 * STATIC CLOUD
 */
const StaticCloud = ({
  top,
  left,
  scale = 1,
  opacity = 0.8,
}: {
  top: string;
  left: string;
  scale?: number;
  opacity?: number;
}) => (
  <div
    className="absolute z-0"
    style={{ top, left, transform: `scale(${scale})`, opacity }}
  >
    <CloudPuff top="0" left="0" size={180} />
    <CloudPuff top="20px" left="60px" size={140} />
    <CloudPuff top="-10px" left="90px" size={160} />
  </div>
);

/**
 * REALISTIC CLUSTER
 */
const RealisticCluster = ({
  scale = 1,
  opacity = 1,
}: {
  scale?: number;
  opacity?: number;
}) => (
  <div className="relative" style={{ transform: `scale(${scale})`, opacity }}>
    <CloudPuff top="0px" left="0px" size={200} />
    <CloudPuff top="-25px" left="70px" size={160} />
    <CloudPuff top="15px" left="130px" size={180} />
    <CloudPuff top="-45px" left="50px" size={110} opacity={1} />
    <CloudPuff
      top="30px"
      left="-50px"
      size={130}
      opacity={0.7}
      blur="blur-2xl"
    />
    <div className="absolute -inset-10 bg-white/10 blur-[80px] rounded-full" />
  </div>
);

/**
 * DRIFTING CLUSTER
 */
const DriftingCluster = ({
  startPhase,
  y,
  scale,
  speed,
  children,
}: {
  startPhase: number;
  y: string;
  scale: number;
  speed: number;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ x: "-100vw" }}
    animate={{ x: "150vw" }}
    transition={{
      delay: -startPhase,
      duration: speed,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute pointer-events-none select-none z-10"
    style={{ top: y, scale }}
  >
    {children}
  </motion.div>
);

/**
 * LANDING PLANE
 */
const LandingPlane = ({
  src,
  startX,
  startY,
  endX,
  endY,
  delay,
  scale,
  rotate,
}: {
  src: string;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  delay: number;
  scale: number;
  rotate: number;
}) => (
  <motion.div
    initial={{ x: startX, y: startY, opacity: 0, rotate }}
    animate={{ x: endX, y: endY, opacity: 1 }}
    transition={{ delay, duration: 6, ease: [0.16, 1, 0.3, 1] }}
    className="absolute z-20 select-none pointer-events-none"
    style={{ scale, transformOrigin: "center" }}
  >
    <img
      src={src}
      alt="plane"
      className="w-56 h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.4)] md:w-[380px]"
    />
  </motion.div>
);

export default function BackgroundObjects() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#bae6fd]">
      <div className="absolute top-[10%] left-[15%] opacity-30 scale-150 blur-3xl bg-white w-96 h-40 rounded-full" />
      <div className="absolute top-[60%] left-[70%] opacity-20 scale-125 blur-3xl bg-white w-80 h-32 rounded-full" />

      {/* STATIC CLOUDS */}
      <StaticCloud top="-5%" left="-5%" scale={1.2} opacity={0.6} />
      <StaticCloud top="10%" left="85%" scale={0.9} opacity={0.5} />
      <StaticCloud top="80%" left="80%" scale={1.1} opacity={0.6} />

      {/* DRIFTING CLOUDS */}
      <DriftingCluster startPhase={10} y="5%" scale={0.7} speed={90}>
        <RealisticCluster opacity={0.9} />
      </DriftingCluster>
      <DriftingCluster startPhase={60} y="15%" scale={0.5} speed={110}>
        <RealisticCluster opacity={0.8} />
      </DriftingCluster>
      <DriftingCluster startPhase={35} y="40%" scale={0.9} speed={130}>
        <div className="flex">
          <RealisticCluster opacity={0.85} />
          <div className="mt-10 ml-[-80px]">
            <RealisticCluster scale={0.6} />
          </div>
        </div>
      </DriftingCluster>
      <DriftingCluster startPhase={85} y="55%" scale={0.6} speed={100}>
        <RealisticCluster opacity={0.9} />
      </DriftingCluster>
      <DriftingCluster startPhase={20} y="75%" scale={1.1} speed={150}>
        <RealisticCluster opacity={0.8} />
      </DriftingCluster>
      <DriftingCluster startPhase={50} y="88%" scale={0.8} speed={120}>
        <RealisticCluster scale={0.7} />
      </DriftingCluster>

      {/* PLANES 1-6 - Increased Scale to 1.2 for better visibility */}
      <LandingPlane
        src="/plane1.jpg"
        startX="120vw"
        startY="-5vh"
        endX="12vw"
        endY="14vh"
        delay={0.2}
        scale={1.2}
        rotate={15}
      />
      <LandingPlane
        src="/plane2.jpg"
        startX="-30vw"
        startY="-5vh"
        endX="72vw"
        endY="14vh"
        delay={0.8}
        scale={1.2}
        rotate={-15}
      />
      <LandingPlane
        src="/plane3.jpg"
        startX="-30vw"
        startY="40vh"
        endX="84vw"
        endY="48vh"
        delay={1.4}
        scale={1.2}
        rotate={-5}
      />
      <LandingPlane
        src="/plane4.jpg"
        startX="-30vw"
        startY="90vh"
        endX="72vw"
        endY="76vh"
        delay={2.0}
        scale={1.2}
        rotate={-25}
      />
      <LandingPlane
        src="/plane5.jpg"
        startX="120vw"
        startY="90vh"
        endX="12vw"
        endY="76vh"
        delay={2.6}
        scale={1.2}
        rotate={25}
      />

      {/* PLANE 6 */}
      <LandingPlane
        src="/plane6.jpg"
        startX="120vw"
        startY="45vh"
        endX="4vw"
        endY="48vh"
        delay={3.2}
        scale={0.9}
        rotate={5}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_80%)] z-5" />
    </div>
  );
}
