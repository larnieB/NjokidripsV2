
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pink-accent rounded-full flex items-center justify-center">
               <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span className="font-heading text-2xl font-black tracking-tight">
              njoki drips
            </span>
          </div>
          <p className="text-gray-400 max-w-sm mb-8 font-light leading-relaxed">
            The multi-purpose digital platform specifically tailored for women and female-identifying individuals. Strategy, style, and empowerment in one place.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'Instagram', 'TikTok', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-accent transition-colors">
                <span className="sr-only">{social}</span>
                <div className="w-2 h-2 bg-current rounded-full"></div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-6">Explore</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-cyan-accent transition-colors">Game Room</a></li>
            <li><a href="#" className="hover:text-cyan-accent transition-colors">Fashion House</a></li>
            <li><a href="#" className="hover:text-cyan-accent transition-colors">Boss Lady</a></li>
            <li><a href="#" className="hover:text-cyan-accent transition-colors">Financial</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-6">Company</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-pink-accent transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-pink-accent transition-colors">Challenges</a></li>
            <li><a href="#" className="hover:text-pink-accent transition-colors">Rewards</a></li>
            <li><a href="#" className="hover:text-pink-accent transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} njoki drips. All rights reserved. Empowering women globally.</p>
      </div>
    </footer>
  );
};

export default Footer;
