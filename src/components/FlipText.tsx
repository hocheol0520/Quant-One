import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface FlipCardProps {
  char: string;
}

function FlipCard({ char }: FlipCardProps) {
  return (
    <div className="relative w-10 h-16 md:w-16 md:h-24 bg-[#111] rounded-lg overflow-hidden border border-white/10 flex items-center justify-center [perspective:1000px]">
      <div className="absolute inset-0 flex flex-col">
        <div className="h-1/2 bg-gradient-to-b from-white/10 to-transparent border-b border-black/50" />
        <div className="h-1/2 bg-gradient-to-t from-white/5 to-transparent" />
      </div>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={char}
          initial={{ y: 40, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -40, opacity: 0, rotateX: 90 }}
          transition={{ 
            duration: 0.12, 
            ease: [0.34, 1.56, 0.64, 1], // Snappy with a tiny bit of overshoot
          }}
          className="text-4xl md:text-7xl font-display font-black text-purple-500 relative z-10"
        >
          {char}
        </motion.span>
      </AnimatePresence>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-black/80 z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

export default function FlipText({ text }: { text: string }) {
  return (
    <div className="flex gap-1 md:gap-2">
      {text.split('').map((char, i) => (
        <FlipCard key={i} char={char} />
      ))}
    </div>
  );
}
