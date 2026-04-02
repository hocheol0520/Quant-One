import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '수익률', href: '#performance' },
    { name: '기능', href: '#advantages' },
    { name: '후기', href: '#testimonials' },
    { name: '파트너', href: '#partners' },
  ];

  return (
    <nav className="absolute lg:fixed top-8 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex items-center justify-between px-12 py-5 rounded-full transition-all duration-700 border border-white/10 w-full max-w-7xl pointer-events-auto shadow-2xl",
          scrolled ? "bg-black/80 backdrop-blur-2xl border-white/20" : "bg-black/40 backdrop-blur-md"
        )}
      >
        {/* Logo */}
        <div 
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <TrendingUp className="w-7 h-7 text-purple-500" />
          <span className="text-2xl font-display font-black tracking-tighter text-white">QUANT-<span className="text-purple-500">ONE</span></span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-16">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-lg md:text-xl font-black tracking-widest text-white/80 hover:text-purple-400 transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[4px] bg-purple-500 transition-all duration-500 group-hover:w-full shadow-[0_0_15px_rgba(138,43,226,1)] rounded-full" />
            </a>
          ))}
        </div>

        {/* Right Side Buttons - Removed Consultation Button as requested */}
        <div className="hidden lg:flex items-center gap-4">
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white/70 p-2 hover:bg-white/5 rounded-full transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="lg:hidden absolute top-full mt-4 left-6 right-6 bg-black/95 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] flex flex-col gap-8 pointer-events-auto shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black tracking-tighter text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="h-[1px] bg-white/5 w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
