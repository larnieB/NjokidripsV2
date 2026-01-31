import React, { useState, useEffect } from 'react';
import ArenaChallenge from './ArenaChallenge';
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
  Clock, 
  Menu, 
  X,
  Target,
  BookOpen,
  Zap,
  ChevronRight
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [dailyQuest, setDailyQuest] = useState({
    title: "Loading...",
    description: "Fetching today's challenge...",
    points: 0
  });

  // Expanded mock data for challenges to emphasize the "Interactive" focus
  const challenges = [
    { 
      id: 1, 
      title: "Boss Lady Strategy Hack", 
      entry: "Ksh 500", 
      prize: "Ksh 10,000", 
      timeLeft: "2h 15m", 
      participants: 124,
      category: "Strategy",
      difficulty: "Hard"
    },
    { 
      id: 2, 
      title: "AI Prompt Engineering Sprint", 
      entry: "Ksh 200", 
      prize: "Ksh 5,000", 
      timeLeft: "5h 40m", 
      participants: 89,
      category: "Tech",
      difficulty: "Medium"
    },
    { 
      id: 3, 
      title: "Fashion ROI Forecasting", 
      entry: "Free", 
      prize: "500 Drip Pts", 
      timeLeft: "12h 10m", 
      participants: 450,
      category: "Fashion",
      difficulty: "Easy"
    }
  ];

  // 2. Add the function here
  const handlePaymentInitiation = async (challengeId: number) => {
  try {
    const response = await fetch('backend/initiate_payment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        challengeId: challengeId,
        amount: 20 
      })
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      setIsPaid(true);
      setActiveChallenge(true);
      alert("Payment confirmed! Good luck in the Arena.");
    } else {
      alert("Payment failed: " + result.message);
    }
  } catch (error) {
    console.error("Error connecting to PHP backend:", error);
  }
};

useEffect(() => {
    const fetchDailyQuest = async () => {
      try {
        const response = await fetch('backend/get_quest.php');
        const data = await response.json();
        
        // Update the state with what the PHP script found
        setDailyQuest({
          title: data.title,
          description: data.description,
          points: data.points
        });
      } catch (error) {
        console.error("Could not load daily quest", error);
      }
    };

    fetchDailyQuest();
  }, []); // The empty brackets [] mean "run only once on load"

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-100 p-4 flex justify-between items-center sticky top-0 z-50">
        <span className="font-heading font-black text-lg text-gray-900">njoki drips</span>
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-64 bg-white border-r border-gray-100 p-6 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex md:flex-col md:h-screen md:sticky md:top-0
      `}>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-pink-accent rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
             </div>
             <span className="font-heading font-black text-lg text-gray-900">njoki drips</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full p-3 bg-pink-accent text-white rounded-xl flex items-center gap-3 font-bold shadow-lg shadow-pink-100">
            <LayoutDashboard className="w-5 h-5" />
            Arena Overview
          </button>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors">
            <Gamepad2 className="w-5 h-5" />
            Live Challenges
          </button>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors">
            <BookOpen className="w-5 h-5" />
            Knowledge Base
          </button>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors">
            <TrendingUp className="w-5 h-5" />
            Portfolio
          </button>
          <div className="pt-4 pb-2 px-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account</p>
          </div>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors">
            <User className="w-5 h-5" />
            Profile
          </button>
          <button className="w-full p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <button onClick={onLogout} className="mt-auto p-3 text-gray-400 hover:text-pink-accent rounded-xl flex items-center gap-3 transition-colors font-semibold">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-black text-gray-900">The Arena</h1>
            <p className="text-gray-500 font-light mt-1 text-sm md:text-base">Apply your knowledge, compete, and earn rewards.</p>
          </div>
          <div className="flex items-center gap-3 md:gap-6 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none bg-white px-5 py-3 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-3">
              <Wallet className="w-5 h-5 text-cyan-accent" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Earnings</p>
                <p className="text-sm font-black text-gray-900 font-heading">Ksh 12,450</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full border-4 border-white shadow-md overflow-hidden flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Profile" />
            </div>
          </div>
        </header>

        {activeChallenge ? (
          <div className="max-w-3xl mx-auto">
            <ArenaChallenge onComplete={() => setActiveChallenge(false)} />
          </div>
        ) : (
          <>
            {/* Action Grid: Quick Stats & Daily Task */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Daily Quest */}
              <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-pink-accent text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Daily Quest</span>
                    <span className="text-pink-accent flex items-center gap-1 text-xs font-bold"><Zap className="w-3 h-3 fill-current" /> +150 pts</span>
                  </div>
                  <h2 className="font-heading text-2xl font-black mb-2">{dailyQuest.title}</h2>
                  <p className="text-gray-400 font-light mb-8 max-w-md">{dailyQuest.description}</p>
                <button 
  onClick={() => {
    // Manually define the entry requirements for the Daily Quest
    const dailyQuestEntry = "Ksh 20"; 
    const dailyQuestId = 999; // Unique ID for today's quest

    if (dailyQuestEntry === "Ksh 20" && !isPaid) {
      handlePaymentInitiation(dailyQuestId);
    } else {
      setActiveChallenge(true);
    }
  }}
  className="mt-auto w-fit bg-white text-black px-8 py-3 rounded-full font-heading font-black text-sm hover:bg-pink-accent hover:text-white transition-all flex items-center gap-2"
>
  {!isPaid ? 'Pay Ksh 20 to Begin' : 'Begin Task'} <ChevronRight className="w-4 h-4" />
</button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-accent/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-pink-accent/20 transition-colors"></div>
              </div>

              {/* Mini Stats Stack */}
              <div className="space-y-4">
                 <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Arena Rank</h3>
                      <p className="text-xl font-black text-gray-900 font-heading">#42 Global</p>
                    </div>
                    <div className="p-3 bg-blue-accent/10 rounded-2xl text-blue-accent">
                      <Trophy className="w-6 h-6" />
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Drip Points</h3>
                      <p className="text-xl font-black text-gray-900 font-heading">2,840 pts</p>
                    </div>
                    <div className="p-3 bg-cyan-accent/10 rounded-2xl text-cyan-accent">
                      <Target className="w-6 h-6" />
                    </div>
                 </div>
              </div>
            </div>

            {/* Main Challenges Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-heading text-2xl font-black text-gray-900">Active Arena Challenges</h2>
                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors">
                  Filter by Category
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black text-pink-accent uppercase tracking-tighter bg-pink-50 px-2 py-1 rounded-md">
                          {challenge.category}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                          <Clock className="w-3 h-3" /> {challenge.timeLeft}
                        </span>
                      </div>
                      <h4 className="font-heading font-extrabold text-gray-900 text-lg leading-tight mb-2">{challenge.title}</h4>
                      <p className="text-gray-400 text-xs font-light">Test your skills against {challenge.participants} other Boss Ladies.</p>
                      
                      <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-end">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Grand Prize</p>
                          <p className="text-xl font-black text-gray-900 font-heading">{challenge.prize}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-gray-400">Entry</p>
                           <p className="text-sm font-bold text-pink-accent">{challenge.entry}</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveChallenge(true)}
                      className="w-full bg-gray-900 text-white py-4 font-heading font-bold text-sm hover:bg-pink-accent transition-colors flex items-center justify-center gap-2"
                    >
                      Enter Arena <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Section: Educational Knowledge Feed */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-xl font-black text-gray-900">Knowledge Base</h2>
                <button className="text-pink-accent text-sm font-bold hover:underline">View All Lessons</button>
              </div>
              <div className="bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 h-48 rounded-[2rem] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" 
                      alt="AI Course" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 py-2 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-cyan-accent/10 text-cyan-accent text-[10px] font-black px-3 py-1 rounded-full uppercase">Featured Module</span>
                    </div>
                    <h3 className="font-heading text-2xl font-black text-gray-900 mb-3">Strategic Fashion Buying with AI</h3>
                    <p className="text-gray-500 font-light mb-6 text-sm md:text-base">
                      Master the theory behind data models to predict next season's trends. Completing this module unlocks the "ROI Specialist" Arena Badge.
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-heading font-black text-xs hover:bg-cyan-accent hover:text-black transition-colors">
                        Start Learning
                      </button>
                      <span className="text-gray-400 text-xs font-bold">Estimated: 12 mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;