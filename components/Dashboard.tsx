
import React from 'react';
import { LayoutDashboard, LogOut, Bell, User, Settings } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-pink-accent rounded-lg flex items-center justify-center">
             <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="font-heading font-black text-lg text-gray-900">njoki drips</span>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="p-3 bg-pink-accent/5 text-pink-accent rounded-xl flex items-center gap-3 font-bold">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </div>
          <div className="p-3 text-gray-400 hover:text-gray-900 rounded-xl flex items-center gap-3 transition-colors cursor-pointer">
            <User className="w-5 h-5" />
            Profile
          </div>
          <div className="p-3 text-gray-400 hover:text-gray-900 rounded-xl flex items-center gap-3 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            Notifications
          </div>
          <div className="p-3 text-gray-400 hover:text-gray-900 rounded-xl flex items-center gap-3 transition-colors cursor-pointer">
            <Settings className="w-5 h-5" />
            Settings
          </div>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto p-3 text-gray-400 hover:text-pink-accent rounded-xl flex items-center gap-3 transition-colors font-semibold"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-heading text-3xl font-black text-gray-900">Dashboard</h1>
            <p className="text-gray-500 font-light mt-1">Welcome back to your command center.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full border-4 border-white shadow-sm overflow-hidden">
               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Profile" />
            </div>
            <button 
              onClick={onLogout}
              className="md:hidden p-2 text-gray-400"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
            <LayoutDashboard className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="font-heading text-4xl font-black text-gray-900 mb-4">Dashboard coming soon</h2>
          <p className="text-gray-500 max-w-sm font-light text-lg">
            We're building your personalized experience to help you manage your fashion, finance, and career goals.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
