import React, { useState } from 'react';
import { CheckCircle2, Trophy, ArrowRight, RefreshCcw } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "In AI strategy, what does 'Prompt Engineering' primarily refer to?",
    options: [
      "Building physical computer hardware",
      "Crafting precise inputs to get high-quality outputs from AI models",
      "Designing the electrical circuits of a server",
      "Repairing broken software code manually"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "When evaluating 'Fashion ROI', which metric is most critical for long-term growth?",
    options: [
      "Total number of likes on social media",
      "The color of the packaging",
      "Customer Lifetime Value (CLV) vs. Acquisition Cost",
      "The speed of the delivery truck"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "What is a key benefit of 'Financial Independence' for a Boss Lady?",
    options: [
      "Buying everything on credit",
      "Avoiding all types of investments",
      "The freedom to make career decisions based on values rather than necessity",
      "Keeping all savings in a standard checking account"
    ],
    correct: 3
  }
];

const ArenaChallenge: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index: number) => {
    const isCorrect = index === QUESTIONS[currentStep].correct;
    if (isCorrect) setScore(score + 1);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const passed = score === QUESTIONS.length;
    return (
      <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300">
        {passed ? (
          <>
            <div className="w-20 h-20 bg-pink-50 text-pink-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-3xl font-black text-gray-900 mb-4">Challenge Mastered!</h2>
            <p className="text-gray-500 mb-8 font-light">Congratulations! You answered all questions correctly and earned your Arena stripes.</p>
            <button 
              onClick={onComplete}
              className="bg-pink-accent text-white px-10 py-4 rounded-2xl font-heading font-bold hover:brightness-110 transition-all"
            >
              Back to Arena
            </button>
          </>
        ) : (
          <>
            <h2 className="font-heading text-3xl font-black text-gray-900 mb-4">Not Quite There</h2>
            <p className="text-gray-500 mb-8 font-light">You got {score}/{QUESTIONS.length} correct. Retake the challenge to claim your reward!</p>
            <button 
              onClick={() => { setCurrentStep(0); setScore(0); setIsFinished(false); }}
              className="flex items-center gap-2 mx-auto text-pink-accent font-bold hover:underline"
            >
              <RefreshCcw className="w-4 h-4" /> Try Again
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-black text-pink-accent uppercase tracking-widest">Question {currentStep + 1} of 3</span>
        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentStep ? 'bg-pink-accent' : 'bg-gray-100'}`} />
          ))}
        </div>
      </div>

      <h3 className="font-heading text-2xl font-extrabold text-gray-900 mb-8 leading-tight">
        {QUESTIONS[currentStep].question}
      </h3>

      <div className="space-y-4">
        {QUESTIONS[currentStep].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left p-6 rounded-2xl border-2 border-gray-50 hover:border-pink-accent/30 hover:bg-pink-50/30 transition-all group flex justify-between items-center"
          >
            <span className="font-semibold text-gray-700 group-hover:text-gray-900">{option}</span>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-pink-accent group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArenaChallenge;