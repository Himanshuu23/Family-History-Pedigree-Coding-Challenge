import { useState } from 'react';
import '../index.css';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [familyMember, setFamilyMember] = useState({
    relation: '',
    name: '',
    age: '',
    gender: '',
    isAlive: null,
    hasDiabetes: null,
    diabetesDetails: '',
    hasHeartDisease: null,
    heartDiseaseDetails: '',
    hasCancer: null,
    cancerDetails: '',
    otherConditions: '',
    emailId: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { question: "What is this family member's relation to you?", field: 'relation' },
    { question: "What is their name?", field: 'name' },
    { question: "How old are they?", field: 'age', inputType: 'number' },
    { question: "What is their gender?", field: 'gender' },
    { question: "Are they currently alive?", field: 'isAlive', isYesNo: true },
    { question: "Do they have diabetes?", field: 'hasDiabetes', isYesNo: true },
    { 
      question: "Please provide details about their diabetes:",
      field: 'diabetesDetails',
      showIf: () => familyMember.hasDiabetes === 'Yes'
    },
    { question: "Have they had heart disease?", field: 'hasHeartDisease', isYesNo: true },
    { 
      question: "Please provide details about heart disease:",
      field: 'heartDiseaseDetails',
      showIf: () => familyMember.hasHeartDisease === 'Yes'
    },
    { question: "Have they had cancer?", field: 'hasCancer', isYesNo: true },
    { 
      question: "Please provide details about cancer:",
      field: 'cancerDetails',
      showIf: () => familyMember.hasCancer === 'Yes'
    },
    { question: "Any other health conditions to note?", field: 'otherConditions' }
  ];

  const handleChange = (value: string) => {
    setFamilyMember({...familyMember, [steps[currentStep].field]: value});
  };

  const getNextStep = (currentStep: number) => {
    const nextStep = currentStep + 1;
    if (nextStep >= steps.length) return steps.length;
    if (steps[nextStep].showIf && !steps[nextStep].showIf()) {
      return getNextStep(nextStep);
    }
    return nextStep;
  };

  const handleNext = () => {
    const nextStep = getNextStep(currentStep);
    if (nextStep < steps.length) {
      setCurrentStep(nextStep);
    } else {
      submitData();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const submitData = async () => {
    try {
      const firestoreData = {
        fields: {
          emailId: { stringValue: familyMember.emailId || "user@example.com" },
          relation: { stringValue: familyMember.relation || "" },
          name: { stringValue: familyMember.name || "" },
          age: { integerValue: parseInt(familyMember.age) || 0 },
          gender: { stringValue: familyMember.gender || "" },
          isAlive: { booleanValue: familyMember.isAlive === "Yes" },
          hasDiabetes: { booleanValue: familyMember.hasDiabetes === "Yes" },
          diabetesDetails: { stringValue: familyMember.diabetesDetails || "" },
          hasHeartDisease: { booleanValue: familyMember.hasHeartDisease === "Yes" },
          heartDiseaseDetails: { stringValue: familyMember.heartDiseaseDetails || "" },
          hasCancer: { booleanValue: familyMember.hasCancer === "Yes" },
          cancerDetails: { stringValue: familyMember.cancerDetails || "" },
          otherConditions: { stringValue: familyMember.otherConditions || "" },
          createdAt: { timestampValue: new Date().toISOString() }
        }
      };
  
      const response = await fetch('http://localhost:8080/v1/projects/backendx2025/databases/(default)/documents/family', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(firestoreData)
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const addAnotherMember = () => {
    setFamilyMember({
      relation: '',
      name: '',
      age: '',
      gender: '',
      isAlive: null,
      hasDiabetes: null,
      diabetesDetails: '',
      hasHeartDisease: null,
      heartDiseaseDetails: '',
      hasCancer: null,
      cancerDetails: '',
      otherConditions: '',
      emailId: ''
    });
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="questionnaire-screen">
        <div className="corner-gradients">
          <div className="corner-gradient top-left"></div>
          <div className="corner-gradient top-right"></div>
          <div className="corner-gradient bottom-left"></div>
          <div className="corner-gradient bottom-right"></div>
        </div>
        
        <div className="thank-you-message">
          <h2>Thank you for your response!</h2>
          <div className="action-buttons">
            <button 
              className="answer-button yes"
              onClick={addAnotherMember}
            >
              Add Another Family Member
            </button>
            <button 
              className="answer-button no"
              onClick={() => window.location.href = '/'}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = steps[currentStep];
  const shouldShowCurrentStep = !currentQuestion.showIf || currentQuestion.showIf();

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
            <span className="question-count">Question {currentStep + 1}/{steps.length}</span>
            <h2>Family Health History</h2>
          </div>
          
          <div className="question-content">
            <h3>{currentQuestion.question}</h3>
            
            {currentQuestion.isYesNo ? (
              <div className="yes-no-buttons">
                <button 
                  className="answer-button yes"
                  onClick={() => { handleChange('Yes'); handleNext(); }}
                >
                  Yes
                </button>
                <button 
                  className="answer-button no"
                  onClick={() => { handleChange('No'); handleNext(); }}
                >
                  No
                </button>
              </div>
            ) : (
              <div className="input-answer">
                <input
                  type={currentQuestion.inputType || 'text'}
                  value={familyMember[currentQuestion.field as keyof typeof familyMember] || ''}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Type your answer here..."
                />
                <div className="navigation-buttons">
                  {currentStep > 0 && (
                    <button 
                      className="submit-button"
                      onClick={handleBack}
                    >
                      ← Back
                    </button>
                  )}
                  <button 
                    className="submit-button"
                    onClick={handleNext}
                    disabled={!familyMember[currentQuestion.field as keyof typeof familyMember]}
                  >
                    {currentStep === steps.length - 1 ? 'Submit' : 'Next →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;