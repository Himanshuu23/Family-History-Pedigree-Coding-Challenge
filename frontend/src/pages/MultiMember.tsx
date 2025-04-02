import React, { useState } from 'react';
import QuestionCard from '../sections/QuestionnaireCard';

const questions = [
  { id: 1, text: "Does this person have diabetes?" },
  { id: 2, text: "Has this person had heart disease?" },
  { id: 3, text: "Any cases of cancer for this person?" }
];

const MultiMember: React.FC = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [currentMemberIndex, setCurrentMemberIndex] = useState<number>(-1);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [responses, setResponses] = useState<Record<string, Record<number, string>>>({});

  const addMember = (name: string) => {
    setMembers([...members, name]);
    setResponses((prev) => ({ ...prev, [name]: {} }));
    setCurrentMemberIndex(members.length);
  };

  const handleAnswer = (answer: string) => {
    const memberName = members[currentMemberIndex];
    setResponses((prev) => ({
      ...prev,
      [memberName]: { ...prev[memberName], [questions[currentQuestion].id]: answer }
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentMemberIndex < members.length - 1) {
      setCurrentMemberIndex(currentMemberIndex + 1);
      setCurrentQuestion(0);
    }
  };

  return (
    <div className="center-container">
      {currentMemberIndex === -1 ? (
        <div className="card">
          <h2>Add Family Members</h2>
          <input type="text" id="memberName" placeholder="Enter Name" />
          <button className="button button-yes" onClick={() => addMember((document.getElementById('memberName') as HTMLInputElement).value)}>➕ Add</button>
        </div>
      ) : currentMemberIndex < members.length ? (
        <QuestionCard question={questions[currentQuestion]} onAnswer={handleAnswer} />
      ) : (
        <div className="completed-text">✅ All Family Members Completed!</div>
      )}
    </div>
  );
};

export default MultiMember;