import React, { useState } from 'react';
import QuestionCard from '../sections/QuestionnaireCard';

const questions = [
  { id: 1, text: "Does anyone in your family have diabetes?" },
  { id: 2, text: "Has any close relative had heart disease?" },
  { id: 3, text: "Are there any cases of cancer in the family?" }
];

const Questionnaire: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Submission:", answers);
    }
  };

  return (
    <div className="center-container">
      {currentQuestion < questions.length ? (
        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      ) : (
        <div className="completed-text">✅ Questionnaire Completed!</div>
      )}
    </div>
  );
};

export default Questionnaire;