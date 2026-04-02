import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { PerformanceReport } from '../types';
import { cn } from '../lib/utils';
import { TrendingUp, MessageCircle, ArrowUpRight, DollarSign, Percent, Activity, ChevronRight, Shield, Zap, BarChart3 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import FlipText from './FlipText';

const sampleChartData = [
  { time: '09:00', value: 1000 },
  { time: '10:00', value: 1015 },
  { time: '11:00', value: 1010 },
  { time: '12:00', value: 1035 },
  { time: '13:00', value: 1045 },
  { time: '14:00', value: 1040 },
  { time: '15:00', value: 1060 },
];

const sampleTrades = [
  { pair: 'NZDCADmicro', type: 'buy', size: '0.68', entry: '0.82208', exit: '0.82620', profit: '+2.04' },
  { pair: 'AUDCADmicro', type: 'buy', size: '0.68', entry: '0.88907', exit: '0.89215', profit: '+1.53' },
  { pair: 'EURUSDmicro', type: 'buy', size: '0.40', entry: '1.15439', exit: '1.15966', profit: '+2.10' },
  { pair: 'EURUSDmicro', type: 'buy', size: '0.40', entry: '1.15990', exit: '1.16191', profit: '+0.80' },
  { pair: 'EURGBPmicro', type: 'buy', size: '0.68', entry: '0.85246', exit: '0.85270', profit: '+0.22' },
];

export default function PerformanceSection() {
  const [reports, setReports] = useState<PerformanceReport[]>([]);
  const [latestWeekly, setLatestWeekly] = useState<PerformanceReport | null>(null);
  const [displayValue, setDisplayValue] = useState("0.0");

  useEffect(() => {
    const q = query(collection(db, 'performance'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PerformanceReport));
      setReports(data);
      const weekly = data.find(r => r.type === 'weekly');
      setLatestWeekly(weekly || null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const target = latestWeekly ? latestWeekly.returnValue : 12.8;
    const duration = 0.8; // Faster duration
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuart) - more snappy
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      const current = (target * easeProgress).toFixed(1);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [latestWeekly]);

  const stats = [
    { label: '평균 월 수익률', value: '+12.4%', icon: Zap },
    { label: '매매 승률', value: '78%', icon: BarChart3 },
    { label: '운용 자산', value: '$45M+', icon: Shield },
  ];

  return (
    <section id="performance" className="pt-32 md:pt-48 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-[0.3em]">Live Verification</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold mb-8 tracking-tighter leading-[1.1]">
            Quant-One <br className="sm:hidden" /> <span className="gradient-text">전략 수익인증</span>
          </h2>
          <p className="text-white/50 text-lg md:text-2xl max-w-2xl mx-auto break-keep leading-relaxed">
            퀀트원(Quant-One)의 모든 수익은 실시간으로 투명하게 공개됩니다. <br className="hidden md:block" />
            직접 확인하고 압도적인 성과를 경험하세요.
          </p>
        </motion.div>

        {/* Integrated Dashboard Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[48px] overflow-hidden border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] mb-12"
        >
          {/* Top Header: 4월 1째주 수익률 현황 (Flip Style) */}
          <div className="p-10 md:p-12 border-b border-white/10 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-purple-400 uppercase tracking-widest">Weekly Performance Status</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-display font-black tracking-tighter">
                4월 1째주 <span className="text-white/40">수익률 현황</span>
              </h4>
            </div>
            <div className="flex items-center gap-4">
              <FlipText text={displayValue} />
              <span className="text-4xl md:text-6xl font-display font-black text-purple-500">%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Stats */}
            <div className="lg:col-span-5 p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
                <div className="group">
                  <div className="flex items-center gap-2 mb-4 text-white/40">
                    <Activity className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">23일차 수익금</span>
                  </div>
                  <div className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-green-400 group-hover:scale-105 transition-transform origin-left">
                    +$6.58
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-2 mb-4 text-white/40">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">누적 수익금</span>
                  </div>
                  <div className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white group-hover:scale-105 transition-transform origin-left">
                    $60.66
                  </div>
                </div>

                <div className="group sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-4 text-white/40">
                    <Percent className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">누적 수익률</span>
                  </div>
                  <div className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-green-400 group-hover:scale-105 transition-transform origin-left">
                    +12.13%
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Trade History */}
            <div className="lg:col-span-7 p-10 md:p-12 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Recent Transactions</h4>
              </div>

              <div className="space-y-3">
                {sampleTrades.map((trade, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-[10px]">
                        {trade.pair.substring(0, 3)}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{trade.pair}</div>
                        <div className="text-[10px] text-white/30">{trade.entry} → {trade.exit}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-blue-500/10 text-blue-400">
                        {trade.type} {trade.size}
                      </div>
                      <div className="text-sm font-bold text-green-400 w-16 text-right">
                        {trade.profit}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats Row: Large Boxes */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass p-8 rounded-[32px] group hover:bg-white/10 transition-all border-white/5 hover:border-purple-500/30 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-purple-500/10 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <stat.icon className="w-8 h-8 text-purple-400 group-hover:text-white" />
                </div>
              </div>
              <div className="text-4xl font-display font-black mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Consultation Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-20"
        >
          <a 
            href="https://t.me/QuantOne_cs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-12 py-5 rounded-full neon-purple-bg text-white font-bold text-xl flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_40px_rgba(138,43,226,0.4)]"
          >
            상담 바로가기
            <MessageCircle className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
