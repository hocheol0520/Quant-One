/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedStats from './components/AnimatedStats';
import PerformanceSection from './components/PerformanceSection';
import Advantages from './components/Advantages';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // Simple A/B testing logic
    const savedVariant = localStorage.getItem('quant_one_variant');
    if (savedVariant === 'A' || savedVariant === 'B') {
      setVariant(savedVariant);
    } else {
      const newVariant = Math.random() > 0.5 ? 'A' : 'B';
      localStorage.setItem('quant_one_variant', newVariant);
      setVariant(newVariant);
    }
  }, []);

  return (
    <div className="min-h-screen selection:bg-purple-500/30 bg-black text-white">
      <BackgroundAnimation />
      <Navbar />
      
      <main>
        {/* 1. 수익률 현황 (Performance) - Now the first section for direct impact */}
        <PerformanceSection />
        
        {/* 2. 퀀트 장점 (Advantages) */}
        <Advantages />

        {/* 4. 트레이더 후기 (Testimonials) */}
        <Testimonials />

        {/* 5. 파트너 (Partners) */}
        <Partners />
      </main>

      <Footer />

      {/* Floating Telegram Button */}
      <a 
        href="https://t.me/QuantOne_cs" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full neon-purple-bg text-white hover:scale-110 transition-all shadow-2xl group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg glass text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          텔레그램 상담하기
        </span>
      </a>
    </div>
  );
}
