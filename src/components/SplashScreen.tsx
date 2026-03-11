"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [phase, setPhase] = useState(0); // 0: orbs, 1: logo build, 2: text, 3: exit
  const [orbs, setOrbs] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    setOrbs(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 0.8,
        duration: Math.random() * 3 + 2,
      })),
    );
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => onFinish(), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  // Checkmark path for the logo
  const checkPath = "M 20 50 L 40 70 L 75 25";

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            initial={{
              background:
                "radial-gradient(ellipse at 50% 50%, #1a0533 0%, #0a0a1a 100%)",
            }}
            animate={{
              background: [
                "radial-gradient(ellipse at 50% 50%, #1a0533 0%, #0a0a1a 100%)",
                "radial-gradient(ellipse at 30% 70%, #0f1b3d 0%, #0a0a1a 100%)",
                "radial-gradient(ellipse at 70% 30%, #1a0533 0%, #0a0a1a 100%)",
                "radial-gradient(ellipse at 50% 50%, #1a0533 0%, #0a0a1a 100%)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating orbs */}
          {orbs.map((orb) => (
            <motion.div
              key={orb.id}
              className="absolute rounded-full"
              style={{
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                width: orb.size,
                height: orb.size,
                background: `radial-gradient(circle, ${
                  orb.id % 3 === 0 ? "rgba(168,85,247,0.6)"
                  : orb.id % 3 === 1 ? "rgba(59,130,246,0.6)"
                  : "rgba(236,72,153,0.5)"
                }, transparent)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 1, 0],
                scale: [0, 1.5, 1, 1.5, 0],
                y: [0, -30, -60, -90, -120],
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Large ambient blurs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-[120px]"
            style={{ background: "rgba(139, 92, 246, 0.15)" }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-[100px]"
            style={{ background: "rgba(59, 130, 246, 0.12)" }}
            animate={{
              x: [0, -80, 50, 0],
              y: [0, 60, -80, 0],
              scale: [1, 0.9, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo container */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #a855f7, #3b82f6, #ec4899, #a855f7)",
                }}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                  opacity: phase >= 1 ? [0.3, 0.6, 0.3] : 0,
                  rotate: 360,
                }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                }}
              />
              <motion.div className="absolute -inset-5 rounded-full bg-[#0a0a1a]" />

              {/* Inner glow ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background:
                    "conic-gradient(from 180deg, transparent, rgba(168,85,247,0.3), transparent)",
                }}
              />

              {/* Main circle */}
              <motion.div
                className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))",
                  border: "2px solid rgba(139,92,246,0.3)",
                }}
              >
                {/* Checkmark SVG */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-14 h-14"
                  style={{
                    filter: "drop-shadow(0 0 12px rgba(168,85,247,0.5))",
                  }}
                >
                  <motion.path
                    d={checkPath}
                    fill="none"
                    stroke="url(#checkGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: phase >= 1 ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  />
                  <defs>
                    <linearGradient
                      id="checkGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                  }}
                  initial={{ x: "-200%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Particle burst on logo appear */}
              {phase >= 1 &&
                Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "#a855f7" : "#3b82f6",
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos((i * 30 * Math.PI) / 180) * 80,
                      y: Math.sin((i * 30 * Math.PI) / 180) * 80,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                ))}
            </motion.div>

            {/* Brand text */}
            <motion.div className="relative text-center">
              <motion.div
                className="flex items-center justify-center gap-0 text-5xl md:text-6xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? 1 : 0 }}
              >
                {"TaskFlow".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className={
                      i < 4 ? "text-white" : (
                        "bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                      )
                    }
                    initial={{ opacity: 0, y: 30, rotateX: -90 }}
                    animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="mt-4 text-sm md:text-base tracking-[0.3em] uppercase text-gray-400/80 font-light"
                initial={{ opacity: 0, y: 10, letterSpacing: "0.5em" }}
                animate={
                  phase >= 2 ? { opacity: 1, y: 0, letterSpacing: "0.3em" } : {}
                }
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Flow into productivity
              </motion.p>

              {/* Animated underline */}
              <motion.div
                className="mt-4 mx-auto h-0.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent)",
                }}
                initial={{ width: 0, opacity: 0 }}
                animate={phase >= 2 ? { width: 200, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              />
            </motion.div>

            {/* Loading dots */}
            <motion.div
              className="mt-10 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ delay: 0.9 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner accent lines */}
          <motion.div
            className="absolute top-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-16 h-0.5 bg-linear-to-r from-purple-500 to-transparent mb-2" />
            <div className="w-0.5 h-16 bg-linear-to-b from-purple-500 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-end">
              <div className="w-0.5 h-16 bg-linear-to-t from-blue-500 to-transparent mb-2" />
              <div className="w-16 h-0.5 bg-linear-to-l from-blue-500 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
