"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function Typewriter({
  text,
  className,
  delay = 0.5,
  duration,
}: TypewriterProps) {
  const count = useMotionValue(0);
  const displayText = useTransform(count, (latest) =>
    text.slice(0, Math.round(latest))
  );

  useEffect(() => {
    const calculatedDuration = duration ?? text.length * 0.05;
    const controls = animate(count, text.length, {
      type: "tween",
      duration: calculatedDuration,
      ease: "linear",
      delay,
    });

    return controls.stop;
  }, [count, text, delay, duration]);

  return (
    <span className={className}>
      <motion.span>{displayText}</motion.span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </span>
  );
}
