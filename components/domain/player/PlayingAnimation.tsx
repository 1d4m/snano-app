"use client";

import { motion } from "motion/react"

const barVariants = {
  animate: {
    scaleY: [0.3, 1, 0.5],
  },
};

const PlayingAnimation = () => {
  return (
    <div className="flex items-end gap-0.5 h-2.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-emerald-500 origin-bottom h-full"
          variants={barVariants}
          animate="animate"
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export { PlayingAnimation };
