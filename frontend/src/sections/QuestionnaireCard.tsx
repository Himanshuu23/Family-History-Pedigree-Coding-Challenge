import React from 'react';

interface QuestionCardProps {
  question: { id: number; text: string };
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="card">
      <h2>{question.text}</h2>
      <div className="button-group">
        <button className="button button-yes" onClick={() => onAnswer('Yes')}>✅ Yes</button>
        <button className="button button-no" onClick={() => onAnswer('No')}>❌ No</button>
      </div>
    </div>
  );
};

export default QuestionCard;