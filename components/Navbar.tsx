
import React from 'react';

interface NavbarProps {
  activeSection: string;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onLoginClick }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-20 flex items-center shadow-sm px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-pink-accent rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="font-heading text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-pink-accent transition-colors">
            njoki drips
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollTo('fashion')}
            className={`font-heading font-semibold transition-all hover:text-pink-accent ${activeSection === 'fashion' ? 'text-pink-accent' : 'text-gray-600'}`}
          >
            Fashion
          </button>
          <button 
            onClick={() => scrollTo('boss')}
            className={`font-heading font-semibold transition-all hover:text-blue-accent ${activeSection === 'boss' ? 'text-blue-accent' : 'text-gray-600'}`}
          >
            Boss Lady
          </button>
          <button 
            onClick={() => scrollTo('financial')}
            className={`font-heading font-semibold transition-all hover:text-cyan-accent ${activeSection === 'financial' ? 'text-cyan-accent' : 'text-gray-600'}`}
          >
            Financial
          </button>
          <button 
            onClick={() => scrollTo('tech')}
            className={`font-heading font-semibold transition-all hover:text-pink-accent ${activeSection === 'tech' ? 'text-pink-accent' : 'text-gray-600'}`}
          >
            Tech & AI
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-bold text-gray-700 hover:text-gray-900">
            Rewards
          </button>
          <button 
            onClick={onLoginClick}
            className="bg-pink-accent text-white px-6 py-2.5 rounded-full font-heading font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-pink-200"
          >
            Login/Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
