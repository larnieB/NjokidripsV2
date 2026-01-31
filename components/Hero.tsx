
import React from 'react';
import { Target, ArrowRight } from 'lucide-react';

interface HeroProps {
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pink-accent rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-accent rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="mb-8 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm inline-flex items-center gap-3 animate-float">
          <div className="w-12 h-12 rounded-xl bg-cyan-accent/20 flex items-center justify-center">
            <Target className="text-cyan-accent w-6 h-6" />
          </div>
          <span className="text-cyan-accent font-bold tracking-widest text-xs uppercase">Level Up Your Mindset</span>
        </div>

        <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 max-w-5xl">
          you only get better by <span className="text-pink-accent">learning.</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl font-light mb-12 max-w-2xl leading-relaxed">
          life can be hard but it doesn’t have to be boring. <br className="hidden md:block" /> 
          Discover a playground of strategy and growth.
        </p>

        <button 
          onClick={onCtaClick}
          className="group relative bg-white text-black px-10 py-5 rounded-full font-heading font-black text-lg flex items-center gap-3 hover:bg-pink-accent hover:text-white transition-all duration-300 shadow-2xl shadow-pink-500/20 active:scale-95"
        >
          Learn and win
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="absolute hidden lg:block top-1/3 left-10 text-pink-accent opacity-30 animate-float" style={{ animationDelay: '0s' }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <rect x="10" y="10" width="20" height="20" fill="currentColor" transform="rotate(45 20 20)" />
          </svg>
        </div>
        <div className="absolute hidden lg:block bottom-1/4 right-20 text-blue-accent opacity-30 animate-float" style={{ animationDelay: '2s' }}>
          <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="4" fill="none" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
