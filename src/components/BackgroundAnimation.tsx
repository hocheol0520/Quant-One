import { useEffect, useRef, useState } from 'react';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollPercent(Math.min(currentScroll / totalHeight, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(scroll: number) {
        // Parallax effect based on scroll
        const parallaxY = scroll * 100;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw(scroll: number) {
        if (!ctx) return;
        ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity * (0.5 + scroll)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (1 + scroll * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2 * (0.5 + scrollPercent);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update(scrollPercent);
        p.draw(scrollPercent);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollPercent]);

  // Dynamic Background Color based on scroll
  const getBackgroundColor = () => {
    // 0% -> #051020 (Deep Blue)
    // 50% -> #3F1E78 (Purple)
    // 100% -> #1a0b2e (Darker Purple/Cyan tint)
    
    const r1 = 5, g1 = 16, b1 = 32; // #051020
    const r2 = 63, g2 = 30, b2 = 120; // #3F1E78
    const r3 = 26, g3 = 11, b3 = 46; // #1a0b2e

    let r, g, b;
    if (scrollPercent < 0.5) {
      const factor = scrollPercent * 2;
      r = Math.round(r1 + (r2 - r1) * factor);
      g = Math.round(g1 + (g2 - g1) * factor);
      b = Math.round(b1 + (b2 - b1) * factor);
    } else {
      const factor = (scrollPercent - 0.5) * 2;
      r = Math.round(r2 + (r3 - r2) * factor);
      g = Math.round(g2 + (g3 - g2) * factor);
      b = Math.round(b2 + (b3 - b2) * factor);
    }

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div 
      className="fixed inset-0 -z-10 transition-colors duration-700 ease-out"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      {/* Dynamic Glows */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + scrollPercent * 20}% ${50 - scrollPercent * 20}%, rgba(139, 92, 246, 0.15), transparent 70%)`
        }}
      />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
}
