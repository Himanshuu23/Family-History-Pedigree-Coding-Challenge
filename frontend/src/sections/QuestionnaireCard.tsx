import React from 'react';
import "../index.css";

interface QuestionCardProps {
  question: { id: number; text: string };
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="yes-no-buttons">
      <button 
        className="answer-button yes" 
        onClick={() => onAnswer('Yes')}
      >
        ✅ Yes
      </button>
      <button 
        className="answer-button no" 
        onClick={() => onAnswer('No')}
      >
        ❌ No
      </button>
    </div>
  );
};

export default QuestionCard;