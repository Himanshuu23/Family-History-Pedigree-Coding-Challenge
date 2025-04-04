import { useState, useEffect } from 'react';
import '../index.css';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import QuestionCard from '../sections/QuestionnaireCard';

interface FamilyMember {
  relation: string;
  name: string;
  age: string;
  gender: string;
  isAlive: string | null;
  hasDiabetes: string | null;
  diabetesDetails: string;
  hasHeartDisease: string | null;
  heartDiseaseDetails: string;
  hasCancer: string | null;
  cancerDetails: string;
  otherConditions: string;
  emailId: string | null;
}

interface Step {
  id: number;
  text: string;
  field: keyof FamilyMember;
  inputType?: string;
  isYesNo?: boolean;
  showIf?: () => boolean;
}

const BASE_URL = "http://localhost:8080/v1/projects/backendx2025/databases/(default)/documents";

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [familyMember, setFamilyMember] = useState<FamilyMember>({
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
    emailId: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user?.email) {
        setFamilyMember(prevState => ({ ...prevState, emailId: user.email }));
      }
    });
    return () => unsubscribe();
  }, []);

  const steps: Step[] = [
    { id: 1, text: "What is this family member's relation to you?", field: 'relation' },
    { id: 2, text: "What is their name?", field: 'name' },
    { id: 3, text: "How old are they?", field: 'age', inputType: 'number' },
    { id: 4, text: "What is their gender?", field: 'gender' },
    { id: 5, text: "Are they currently alive?", field: 'isAlive', isYesNo: true },
    { id: 6, text: "Do they have diabetes?", field: 'hasDiabetes', isYesNo: true },
    { id: 7, text: "Please provide details about their diabetes:", field: 'diabetesDetails', showIf: () => familyMember.hasDiabetes === 'Yes' },
    { id: 8, text: "Have they had heart disease?", field: 'hasHeartDisease', isYesNo: true },
    { id: 9, text: "Please provide details about heart disease:", field: 'heartDiseaseDetails', showIf: () => familyMember.hasHeartDisease === 'Yes' },
    { id: 10, text: "Have they had cancer?", field: 'hasCancer', isYesNo: true },
    { id: 11, text: "Please provide details about cancer:", field: 'cancerDetails', showIf: () => familyMember.hasCancer === 'Yes' },
    { id: 12, text: "Any other health conditions to note?", field: 'otherConditions' }
  ];

  const handleAnswer = (answer: string) => {
    setFamilyMember(prevState => ({
      ...prevState,
      [steps[currentStep].field]: answer
    }));
    handleNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyMember(prevState => ({
      ...prevState,
      [steps[currentStep].field]: e.target.value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      submitData();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const submitData = async () => {
    try {
      // const response = await fetch(`${BASE_URL}/family`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     fields: {
      //       relation: { stringValue: familyMember.relation },
      //       name: { stringValue: familyMember.name },
      //       age: { stringValue: familyMember.age },
      //       gender: { stringValue: familyMember.gender },
      //       isAlive: { booleanValue: familyMember.isAlive === 'Yes' },
      //       hasDiabetes: { booleanValue: familyMember.hasDiabetes === 'Yes' },
      //       diabetesDetails: { stringValue: familyMember.diabetesDetails },
      //       hasHeartDisease: { booleanValue: familyMember.hasHeartDisease === 'Yes' },
      //       heartDiseaseDetails: { stringValue: familyMember.heartDiseaseDetails },
      //       hasCancer: { booleanValue: familyMember.hasCancer === 'Yes' },
      //       cancerDetails: { stringValue: familyMember.cancerDetails },
      //       otherConditions: { stringValue: familyMember.otherConditions },
      //       emailId: { stringValue: familyMember.emailId || '' }
      //     }
      //   })
      // });
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="questionnaire-screen">
        <div className="completed-text">
          <h2>Thank you for your response!</h2>
        </div>
      </div>
    );
  }

  const currentQuestion = steps[currentStep];
  const shouldShowCurrentStep = !currentQuestion.showIf || currentQuestion.showIf();

  if (!shouldShowCurrentStep) {
    handleNext();
    return null;
  }

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
            <span className="question-count">Question {currentStep + 1} of {steps.length}</span>
            <h2>{currentQuestion.text}</h2>
          </div>
          
          <div className="question-content">
            {currentQuestion.isYesNo ? (
              <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
            ) : (
              <>
                <div className="input-answer">
                  <input
                    type={currentQuestion.inputType || 'text'}
                    value={familyMember[currentQuestion.field]?.toString() || ''}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={`Enter ${currentQuestion.field}`}
                  />
                </div>
                <div className="yes-no-buttons">
                  {currentStep > 0 && (
                    <button className="answer-button no" onClick={handleBack}>
                      Back
                    </button>
                  )}
                  <button 
                    className={`answer-button yes ${!familyMember[currentQuestion.field] ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={!familyMember[currentQuestion.field]}
                  >
                    {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;