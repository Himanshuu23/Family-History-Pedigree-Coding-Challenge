import React, { useState } from 'react';
import '../index.css';

const questions = [
  { id: 1, text: "Does anyone in your family have diabetes?", inputType: null },
  { id: 2, text: "Has any close relative had heart disease?", inputType: null },
  { id: 3, text: "Are there any cases of cancer in the family?", inputType: null },
  { id: 4, text: "List any other hereditary conditions:", inputType: "text" }
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [inputValue, setInputValue] = useState('');

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);
    setInputValue('');
    goToNextQuestion(newAnswers);
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      handleAnswer(inputValue);
    }
  };

  const goToNextQuestion = (currentAnswers: Record<number, string>) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Submission:", currentAnswers);
    }
  };

  return (
    <div className="questionnaire-screen">
      <div className="corner-gradients">
        <div className="corner-gradient top-left"></div>
        <div className="corner-gradient top-right"></div>
        <div className="corner-gradient bottom-left"></div>
        <div className="corner-gradient bottom-right"></div>
      </div>
      
      <div className="question-card-container">
        <div className="question-card">
          <div className="question-header">
            <span className="question-count">Question {currentQuestion + 1}/{questions.length}</span>
            <h2>Family Health History</h2>
          </div>
          
          <div className="question-content">
            <h3>{questions[currentQuestion].text}</h3>
            
            {questions[currentQuestion].inputType ? (
              <div className="input-answer">
                <input
                  type={questions[currentQuestion].inputType || "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your answer here..."
                />
                <button 
                  className="submit-button"
                  onClick={handleInputSubmit}
                  disabled={!inputValue.trim()}
                >
                  Submit →
                </button>
              </div>
            ) : (
              <div className="yes-no-buttons">
                <button 
                  className="answer-button yes"
                  onClick={() => handleAnswer('Yes')}
                >
                  Yes
                </button>
                <button 
                  className="answer-button no"
                  onClick={() => handleAnswer('No')}
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;