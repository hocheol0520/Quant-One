import { motion } from 'motion/react';
import { TrendingUp, Activity, BarChart3, Globe } from 'lucide-react';

const stats = [
  { label: 'Active Strategies', value: '12', suffix: '', icon: Activity },
  { label: 'Market Coverage', value: '24', suffix: 'h', icon: Globe },
  { label: 'Avg. Monthly Return', value: '12.4', suffix: '%', icon: TrendingUp },
  { label: 'Win Rate', value: '78', suffix: '%', icon: BarChart3 },
];

export default function AnimatedStats() {
  return (
    <section className="py-12 bg-black overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-2xl bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors">
                  <stat.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl md:text-4xl font-display font-bold"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-purple-400 font-bold">{stat.suffix}</span>
                </div>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mt-2">
                  {stat.label}
                </span>
              </div>
              
              {/* Animated Background Line */}
              <div className="absolute -bottom-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent overflow-hidden">
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
