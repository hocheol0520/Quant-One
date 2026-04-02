import { motion } from 'motion/react';
import { ArrowRight, Play, MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass border border-white/10 mb-12">
            <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-base md:text-lg font-black text-white tracking-[0.2em] uppercase">Next-Gen Quant Trading Platform</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-display font-extrabold tracking-tight mb-10 leading-[1.2] md:leading-[1.05]">
            <span className="text-white block">정밀한 데이터 분석.</span>
            <span className="gradient-text block mt-2 md:mt-4">압도적인 수익률.</span>
          </h1>

          <p className="text-lg md:text-3xl text-white/50 max-w-4xl mx-auto mb-16 leading-relaxed break-keep font-normal md:font-medium">
            퀀트원(Quant-One)은 고도화된 알고리즘 전략과 실시간 시장 분석을 결합하여, <br className="hidden md:block" />
            변동성 높은 시장에서도 <span className="text-white font-bold underline decoration-purple-500 decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8">꾸준하고 안정적인 수익을 창출합니다.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://t.me/QuantOne_cs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-full neon-purple-bg text-white font-bold text-lg flex items-center gap-3 hover:scale-105 transition-all group shadow-[0_0_40px_rgba(138,43,226,0.4)]"
            >
              상담 바로가기
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </a>
            <a 
              href="#advantages" 
              className="px-10 py-5 rounded-full glass border border-white/10 text-white font-bold flex items-center gap-2 hover:bg-white/5 transition-all text-lg"
            >
              <Play className="w-6 h-6 text-purple-400" />
              퀀트원 수익률 소개
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
