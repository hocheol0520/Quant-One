import { motion } from 'motion/react';
import { Shield, Zap, BarChart3, Cpu, Globe, Clock, TrendingUp, ArrowDownRight, Info, MessageCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';

const advantages = [
  {
    title: '머신러닝 기반 예측 모델',
    description: '수백만 개의 시장 데이터를 실시간으로 분석하여 최적의 매매 타이밍을 포착합니다.',
    icon: BarChart3,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    title: '리스크 관리 시스템',
    description: '시장 변동성에 대응하는 동적 자산 배분으로 포트폴리오의 안정성을 극대화합니다.',
    icon: Shield,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    title: '순환매 시스템',
    description: '시장의 자금 흐름을 추적하여 순환매가 발생하는 섹터와 종목을 선제적으로 포착합니다.',
    icon: Zap,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    title: '추세+역추세 혼합 작동',
    description: '강한 추세 구간과 박스권 역추세 구간을 구분하여 최적의 로직을 자동으로 전환합니다.',
    icon: TrendingUp,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    title: '적응형 회복 논리',
    description: '손실 발생 시 시장 상황에 맞춰 회복 속도를 조절하는 지능형 복구 알고리즘을 가동합니다.',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    title: '초고속 매매 인프라',
    description: '지연 시간을 최소화한 시스템 트레이딩으로 시장의 미세한 기회를 선점합니다.',
    icon: Zap,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  }
];

const backtestData = [
  { month: '22.03', value: 10000 },
  { month: '22.06', value: 11800 },
  { month: '22.09', value: 13500 },
  { month: '22.12', value: 16200 },
  { month: '23.03', value: 19400 },
  { month: '23.06', value: 23500 },
  { month: '23.09', value: 27800 },
  { month: '23.12', value: 33200 },
  { month: '24.03', value: 38500 },
  { month: '24.06', value: 44200 },
  { month: '24.09', value: 49500 },
  { month: '24.12', value: 56800 },
  { month: '25.03', value: 61400 },
  { month: '25.06', value: 65200 },
  { month: '25.09', value: 68400 },
  { month: '25.11', value: 71280 },
];

const backtestMetrics = [
  { label: '통화', value: 'USD' },
  { label: '입금액', value: '$10,000.00' },
  { label: '수익', value: '$61,280.45', color: 'text-purple-400' },
  { label: '최종 잔액', value: '$71,280.45' },
  { label: '총 수익률', value: '612.80%', color: 'text-purple-400' },
  { label: '연 환산 수익률', value: '84.25%' },
  { label: '월 환산 수익률', value: '5.42%' },
  { label: '일 환산 수익률', value: '0.21%' },
  { label: '총 거래횟수', value: '9,842' },
  { label: '승률', value: '71.24%' },
  { label: '최대하락률', value: '16.84%' },
];

export default function Advantages() {
  return (
    <section id="advantages" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">왜 <span className="text-purple-400">퀀트원</span> 인가?</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto break-keep mb-12">
            단순한 매매 프로그램을 넘어, 기술과 데이터가 결합된 최상의 투자 솔루션을 제공합니다.
          </p>

          {/* 3-Year Backtest Results (RealQuant Style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[40px] text-left mb-20 border-purple-500/20 shadow-[0_0_50px_rgba(138,43,226,0.1)]"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-2">Quant-One Backtest Report</h3>
              <p className="text-purple-400 font-bold mb-2">3년간의 백테스트 결과이며 현재도 계속 진행중입니다</p>
              <p className="text-white/40 text-sm font-bold">(2022.03 ~ 2025.11)</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 mb-16">
              {backtestMetrics.map((m, i) => (
                <div key={i} className="p-4 sm:p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all flex flex-col justify-center">
                  <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest mb-1 sm:mb-2 font-bold">{m.label}</div>
                  <div className={cn("text-sm sm:text-xl md:text-2xl font-display font-bold break-all", m.color || "text-white")}>
                    {m.value}
                  </div>
                </div>
              ))}
              <div className="p-4 sm:p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex flex-col justify-center items-center text-center">
                <div className="text-[10px] sm:text-xs text-purple-400 uppercase tracking-widest mb-1 font-bold">누적 수익률</div>
                <div className="text-xl sm:text-3xl md:text-4xl font-display font-black text-purple-400">
                  +612.8%
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold mb-2">잔액 그래프(Balance Graph)</h4>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Quant-One (XAUUSD)</span>
              </div>
            </div>

            <div className="h-[300px] md:h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={backtestData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#ffffff40" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#ffffff40' }}
                  />
                  <YAxis 
                    stroke="#ffffff40" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(v) => `$${v/1000}k`}
                    tick={{ fill: '#ffffff40' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff20', borderRadius: '12px' }}
                    itemStyle={{ color: '#8A2BE2' }}
                    formatter={(v: any) => [`$${v.toLocaleString()}`, 'Balance']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8A2BE2" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-xs text-white/50 leading-relaxed break-keep">
                본 백테스트 결과는 과거 데이터를 기반으로 산출되었으며, 미래의 수익을 보장하지 않습니다. 
                슬리피지와 수수료를 반영한 보수적인 시뮬레이션 결과입니다.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 sm:p-8 rounded-2xl sm:rounded-[32px] hover:bg-white/10 transition-all group relative overflow-hidden flex flex-col items-start"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${adv.bg} flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform`}>
                <adv.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${adv.color}`} />
              </div>
              <h3 className="text-sm sm:text-xl font-bold mb-2 sm:mb-4 leading-tight">{adv.title}</h3>
              <p className="text-white/50 text-[10px] sm:text-sm leading-relaxed break-keep">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>

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
