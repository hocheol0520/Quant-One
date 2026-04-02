import { motion } from 'motion/react';
import { Globe, Activity, Shield, Zap, TrendingUp, BarChart3 } from 'lucide-react';

const partners = [
  { name: 'AXI', color: '#ffffff', bg: '#2d2d2d', icon: 'X' },
  { name: 'AVATRADE', color: '#ffffff', bg: '#004a99', icon: 'AVA' },
  { name: 'FXCM', color: '#ffffff', bg: '#00a4e4', icon: 'Z' },
  { name: 'TMGM', color: '#ffffff', bg: '#e31e24', icon: 'TMGM' },
  { name: 'EC MARKETS', color: '#ffffff', bg: '#0056b3', icon: 'EC' },
  { name: 'IC MARKETS', color: '#ffffff', bg: '#000000', icon: 'IC' },
  { name: 'XM', color: '#ffffff', bg: '#000000', icon: 'XM' },
  { name: 'VANTAGE', color: '#ffffff', bg: '#003366', icon: 'V' },
  { name: 'VT MARKETS', color: '#ffffff', bg: '#007bff', icon: 'vt.' },
  { name: 'FPMARKETS', color: '#ffffff', bg: '#004085', icon: 'FP' },
  { name: 'HANTEC MARKETS', color: '#ffffff', bg: '#dc3545', icon: 'H' },
  { name: 'PUPRIME', color: '#ffffff', bg: '#343a40', icon: 'P' }
];

export default function Partners() {
  return (
    <section id="partners" className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="w-16 h-1 bg-purple-500 mx-auto mb-8 rounded-full" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-[1.2]">
            글로벌 외환 규제기관에 등록된 <br className="sm:hidden" /> <span className="text-purple-400">거래소들의 지원</span>을 받습니다
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium break-keep">
            전세계 글로벌 CFD·FX 거래소들과 기술 파트너들의 신뢰를 바탕으로 <br className="hidden md:block" />
            최상의 트레이딩 환경을 제공합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <div className="glass p-8 rounded-3xl flex flex-col items-center justify-center border-white/5 hover:border-white/20 transition-all duration-500 h-48">
                <div 
                  className="w-24 h-14 rounded-xl mb-6 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 overflow-hidden"
                  style={{ backgroundColor: partner.bg }}
                >
                  <span className="text-white font-black text-xl tracking-tighter italic">{partner.icon}</span>
                </div>
                <span className="text-[11px] font-black text-white/30 tracking-[0.2em] uppercase group-hover:text-white/60 transition-colors">
                  {partner.name}
                </span>
              </div>
              
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 blur-3xl rounded-full transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
