// components/QuestionCard.tsx
import React from 'react';
import "../index.css";

interface QuestionCardProps {
  question: { id: number; text: string };
  onAnswer: (answer: string) => void;
  children?: React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, children }) => {
  return (
    <div className="questionnaire-screen">
      <div className="corner-gradients">
        <div className="corner-gradient top-left" />
        <div className="corner-gradient top-right" />
        <div className="corner-gradient bottom-left" />
        <div className="corner-gradient bottom-right" />
      </div>

      <div className="question-card-container">
        <div className="question-card">
          <div className="question-header">
            <h2>{question.text}</h2>
          </div>
          <div className="question-content">
            {children || (
              <div className="yes-no-buttons">
                <button className="answer-button yes" onClick={() => onAnswer('Yes')}>✅ Yes</button>
                <button className="answer-button no" onClick={() => onAnswer('No')}>❌ No</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
