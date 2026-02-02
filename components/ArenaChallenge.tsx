// components/ArenaChallenge.tsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Play, RefreshCcw, Trophy } from 'lucide-react';

const ArenaChallenge: React.FC<{ onComplete: () => void, isPaid?: boolean }> = ({ onComplete }) => {
  const [allocation, setAllocation] = useState({ Tech: 0, Fashion: 0, Healthcare: 0 });
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<{ win: boolean, growth: number, message: string } | null>(null);

  const totalAllocated = allocation.Tech + allocation.Fashion + allocation.Healthcare;
  const budget = 100000;

  const handleSimulate = () => {
    setIsSimulating(true);
    
    // Artificial delay for tension (Game Design Skill)
    setTimeout(() => {
      // Hard-to-win logic: Market volatility affects weights
      const techGrowth = (Math.random() * 60 - 30); // -30% to +30%
      const fashionGrowth = (Math.random() * 30 - 10); // -10% to +20%
      const healthGrowth = (Math.random() * 10); // 0% to +10%

      const finalValue = 
        (allocation.Tech * (1 + techGrowth/100)) + 
        (allocation.Fashion * (1 + fashionGrowth/100)) + 
        (allocation.Healthcare * (1 + healthGrowth/100));

      const roi = ((finalValue - budget) / budget) * 100;
      const won = roi >= 15; // Requires 15% growth to win

      setResult({
        win: won,
        growth: Math.round(roi * 10) / 10,
        message: won 
          ? "Masterful strategy! Your empire is expanding." 
          : roi > 10 
            ? "So close! You were just 5% away from the target." // Near-miss logic
            : "Market crash! Your strategy was too risky."
      });
      setIsSimulating(false);
    }, 2000);
  };

  if (result) {
    return (
      <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-2xl animate-in zoom-in-95">
        <div className={`text-4xl font-black mb-4 ${result.win ? 'text-green-500' : 'text-pink-accent'}`}>
          {result.growth}% ROI
        </div>
        <h2 className="text-2xl font-heading font-black mb-4">{result.win ? 'Success!' : 'Mission Failed'}</h2>
        <p className="text-gray-500 mb-8">{result.message}</p>
        
        {result.win ? (
          <button onClick={onComplete} className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold">Claim Prize</button>
        ) : (
          <button onClick={() => setResult(null)} className="flex items-center gap-2 mx-auto text-pink-accent font-bold">
            <RefreshCcw className="w-4 h-4" /> Re-strategize
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-heading text-2xl font-black">Capital Allocation Sim</h3>
        <div className="bg-pink-50 text-pink-accent px-4 py-1 rounded-full text-xs font-black">Target: +15% ROI</div>
      </div>

      <div className="mb-8 p-6 bg-gray-950 rounded-3xl text-white">
        <div className="text-xs text-gray-400 uppercase font-bold mb-1">Available Capital</div>
        <div className="text-3xl font-black">Ksh { (budget - totalAllocated).toLocaleString() }</div>
      </div>

      <div className="space-y-6">
        {Object.keys(allocation).map((sector) => (
          <div key={sector}>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-gray-700">{sector}</span>
              <span className="text-sm text-gray-400">Ksh {allocation[sector as keyof typeof allocation].toLocaleString()}</span>
            </div>
            <input 
              type="range" max={budget} step={5000}
              value={allocation[sector as keyof typeof allocation]}
              onChange={(e) => setAllocation({...allocation, [sector]: parseInt(e.target.value)})}
              disabled={isSimulating}
              className="w-full accent-pink-accent"
            />
          </div>
        ))}
      </div>

      <button 
        onClick={handleSimulate}
        disabled={totalAllocated !== budget || isSimulating}
        className="w-full mt-10 bg-pink-accent text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 disabled:opacity-50 hover:brightness-110 transition-all"
      >
        {isSimulating ? <RefreshCcw className="animate-spin" /> : <Play />}
        {isSimulating ? 'Processing Market...' : 'Run Simulation'}
      </button>
    </div>
  );
};

export default ArenaChallenge;