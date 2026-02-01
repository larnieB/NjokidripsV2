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
  const [isLoading, setIsLoading] = useState(true);

  // 1. Check for persistent token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // 2. Corrected Unified Login Handler
  const handleLogin = () => {
    // AuthModal handles the localStorage.setItem('token') internally before calling onSuccess
    // Based on your AuthModal.tsx line 35-36
    setIsAuthModalOpen(false);
    setIsAuthenticated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Corrected Unified Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Ensure storage is cleared
    setIsAuthenticated(false);
  };

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

  // Prevent "flash" of landing page while checking token
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
        {/* Sections remain the same */}
        <section id="hero" className="scroll-mt-nav">
          <Hero onCtaClick={() => setIsAuthModalOpen(true)} />
        </section>
        {/* ... other sections ... */}
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