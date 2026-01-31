
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import { ShoppingBag, Zap, PieChart, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleScroll = useCallback(() => {
    if (isAuthenticated) return;
    const sections = ['hero', 'fashion', 'boss', 'financial', 'tech'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLogin = () => {
    setIsAuthModalOpen(false);
    setIsAuthenticated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="relative overflow-x-hidden">
      <Navbar 
        activeSection={activeSection} 
        onLoginClick={() => setIsAuthModalOpen(true)} 
      />
      
      <main>
        <section id="hero" className="scroll-mt-nav">
          <Hero onCtaClick={() => setIsAuthModalOpen(true)} />
        </section>

        <section id="fashion" className="scroll-mt-nav bg-white">
          <Section
            id="fashion"
            title="Fashion House"
            subtitle="Curated styles for the modern trendsetter."
            description="Explore our exclusive collection of high-fashion dresses and accessories. Every piece is selected to empower your presence and reflect your inner strength."
            image="https://images.unsplash.com/photo-1539109132313-3fb3a403d05b?auto=format&fit=crop&q=80&w=800"
            reverse={false}
            accentColor="pink"
            icon={<ShoppingBag className="w-6 h-6" />}
          />
        </section>

        <section id="boss" className="scroll-mt-nav bg-gray-50">
          <Section
            id="boss"
            title="Boss Lady"
            subtitle="Lead, Innovate, Conquer."
            description="Your career is a journey of constant evolution. We provide the mentorship, professional development tools, and community support you need to ascend."
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
            reverse={true}
            accentColor="blue"
            icon={<Zap className="w-6 h-6" />}
          />
        </section>

        <section id="financial" className="scroll-mt-nav bg-white">
          <Section
            id="financial"
            title="Financial Independence"
            subtitle="Secure your future, one investment at a time."
            description="True empowerment starts with financial literacy. Discover accessible strategies for saving, wealth management, and long-term investing."
            image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800"
            reverse={false}
            accentColor="cyan"
            icon={<PieChart className="w-6 h-6" />}
          />
        </section>

        <section id="tech" className="scroll-mt-nav bg-gray-900 text-white">
          <Section
            id="tech"
            title="Technology & AI"
            subtitle="The future is feminine and digital."
            description="Harness the power of artificial intelligence and cutting-edge technology. Learn how to leverage new tools to amplify your impact."
            image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
            reverse={true}
            accentColor="pink"
            darkMode={true}
            icon={<Cpu className="w-6 h-6" />}
          />
        </section>
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleLogin} 
      />
    </div>
  );
};

export default App;
