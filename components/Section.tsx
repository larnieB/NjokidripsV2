
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  reverse?: boolean;
  accentColor: 'pink' | 'cyan' | 'blue';
  darkMode?: boolean;
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  reverse = false, 
  accentColor,
  darkMode = false,
  icon
}) => {
  const accentClasses = {
    pink: 'bg-pink-accent text-pink-accent',
    cyan: 'bg-cyan-accent text-cyan-accent',
    blue: 'bg-blue-accent text-blue-accent',
  };

  const borderClasses = {
    pink: 'border-pink-accent',
    cyan: 'border-cyan-accent',
    blue: 'border-blue-accent',
  };

  const bgLight = darkMode ? 'bg-white/5' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`py-24 md:py-32 flex items-center overflow-hidden`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`flex flex-col md:flex-row items-center gap-16 ${reverse ? 'md:flex-row-reverse' : ''}`}>
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative group">
            <div className={`absolute -inset-4 rounded-3xl border-2 ${borderClasses[accentColor]} opacity-20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500`}></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-[400px] md:h-[600px] object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 text-left space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-3 p-2 pr-6 rounded-full ${bgLight}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${accentClasses[accentColor].split(' ')[0]}`}>
                  {icon}
                </div>
                <span className={`text-sm font-bold tracking-widest uppercase ${accentClasses[accentColor].split(' ')[1]}`}>
                  {title}
                </span>
              </div>
              <h2 className={`font-heading text-4xl md:text-5xl font-black ${textColor} leading-tight`}>
                {subtitle}
              </h2>
            </div>
            
            <p className={`text-lg md:text-xl leading-relaxed font-light ${descColor}`}>
              {description}
            </p>

            <div className="pt-4">
              <button className={`
                px-8 py-4 rounded-full font-heading font-extrabold transition-all duration-300 transform hover:translate-y-[-2px] active:scale-95
                ${accentClasses[accentColor].split(' ')[0]} text-white shadow-xl
              `}>
                Discover More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
