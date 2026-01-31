import React from 'react';
import { 
  LayoutDashboard, 
  LogOut, 
  Bell, 
  User, 
  Settings, 
  Trophy, 
  TrendingUp, 
  Gamepad2, 
  Wallet,
  ArrowUpRight,
  Clock
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  // Mock data for the dashboard state
  const challenges = [
    { id: 1, title: "Boss Lady Strategy Hack", entry: "Ksh 500", prize: "Ksh 10,000", timeLeft: "2h 15m", participants: 124 },
    { id: 2, title: "AI Prompt Engineering Sprint", entry: "Ksh 200", prize: "Ksh 5,000", timeLeft: "5h 40m", participants: 89 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Consistent with project branding */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-pink-accent rounded-lg flex items-center justify-center">
             <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="font-heading font-black text-lg text-gray-900">njoki drips</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full p-3 bg-pink-accent/5 text-pink-accent rounded-xl flex items-center gap-3 font-bold">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </button>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 rounded-xl flex items-center gap-3 transition-colors">
            <Gamepad2 className="w-5 h-5" />
            Challenges
          </button>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 rounded-xl flex items-center gap-3 transition-colors">
            <TrendingUp className="w-5 h-5" />
            Finance
          </button>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 rounded-xl flex items-center gap-3 transition-colors">
            <User className="w-5 h-5" />
            Profile
          </button>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 rounded-xl flex items-center gap-3 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto p-3 text-gray-400 hover:text-pink-accent rounded-xl flex items-center gap-3 transition-colors font-semibold"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-heading text-3xl font-black text-gray-900">Empowerment Hub</h1>
            <p className="text-gray-500 font-light mt-1">Level up your style, strategy, and savings.</p>
          </div>
          <div className="flex items-center gap-6">
            {/* Wallet Quick View */}
            <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
              <Wallet className="w-5 h-5 text-cyan-accent" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Balance</p>
                <p className="text-sm font-black text-gray-900 font-heading">Ksh 12,450</p>
              </div>
            </div>
            <div className="relative cursor-pointer text-gray-400 hover:text-gray-900 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-pink-accent rounded-full border-2 border-white"></span>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full border-4 border-white shadow-sm overflow-hidden">
               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Profile" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-pink-accent/10 rounded-2xl text-pink-accent">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12% vs last week</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Challenge Wins</h3>
            <p className="text-2xl font-black text-gray-900 font-heading mt-1">4 Won</p>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-cyan-accent/10 rounded-2xl text-cyan-accent">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-accent bg-cyan-50 px-2 py-1 rounded-lg">On Track</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Investment Goal</h3>
            <p className="text-2xl font-black text-gray-900 font-heading mt-1">72% Completed</p>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-accent/10 rounded-2xl text-blue-accent">
                <LayoutDashboard className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Drip Points</h3>
            <p className="text-2xl font-black text-gray-900 font-heading mt-1">2,840 pts</p>
          </div>
        </div>

        {/* Challenges & Featured Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-black text-gray-900">Active Challenges</h2>
              <button className="text-pink-accent text-sm font-bold hover:underline">View all</button>
            </div>
            <div className="space-y-4">
              {challenges.map(challenge => (
                <div key={challenge.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-heading font-extrabold text-gray-900">{challenge.title}</h4>
                      <div className="flex gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                          <Clock className="w-3.5 h-3.5" /> {challenge.timeLeft} left
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                          <User className="w-3.5 h-3.5" /> {challenge.participants} joined
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-gray-400">Prize Pool</p>
                      <p className="text-lg font-black text-pink-accent font-heading">{challenge.prize}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">Entry: {challenge.entry}</span>
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-heading font-bold text-xs hover:bg-pink-accent transition-colors flex items-center gap-2">
                      Enter Arena <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-black text-gray-900">Your Mentorship Feed</h2>
            </div>
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <span className="bg-cyan-accent text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Featured Tool</span>
                <h3 className="font-heading text-2xl font-black mb-4">Leveraging AI for <br/>Strategic Fashion Buying</h3>
                <p className="text-gray-400 font-light mb-8 max-w-xs">Learn how to use data models to predict next season's trends and maximize your ROI.</p>
                <button className="bg-white text-black px-8 py-3 rounded-full font-heading font-black text-sm hover:bg-cyan-accent transition-colors">
                  Start Learning
                </button>
              </div>
              {/* Decorative elements consistent with Hero.tsx */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-accent/20 rounded-full blur-3xl"></div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;