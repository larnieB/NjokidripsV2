
import React, { useState } from 'react';
import { X, Mail, Lock, Chrome } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // components/AuthModal.tsx update
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await fetch('http://localhost:8080/NjokidripsV2/backend/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    if (result.status === 'success') {
      localStorage.setItem('token', result.token); // Store token
      onSuccess();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Login error", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-black text-gray-900 mb-2">
              {isLogin ? 'Welcome back' : 'Join the drip'}
            </h2>
            <p className="text-gray-500 font-light">
              {isLogin ? 'Login to access your personalized house.' : 'Start your journey to mastery and style.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email address"
                required
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-accent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="Password"
                required
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-accent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-accent text-white py-4 rounded-2xl font-heading font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-pink-100 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={onSuccess}
              className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group font-semibold text-gray-700"
            >
              <Chrome className="w-5 h-5 text-gray-600 group-hover:text-pink-accent" />
              <span>Google</span>
            </button>
          </div>

          <p className="mt-10 text-center text-gray-500 font-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-pink-accent hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
