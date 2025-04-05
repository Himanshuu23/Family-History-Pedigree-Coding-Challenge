// hooks/useQuestionnaire.ts
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FamilyMember } from '../types/member';
import { Step } from '../types/form';
import { getSteps } from '../utils/questionnaireSteps';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [familyMember, setFamilyMember] = useState<FamilyMember>({
    relation: '',
    name: '',
    age: 0,
    gender: '',
    isAlive: false,
    hasDiabetes: false,
    diabetesDetails: '',
    hasHeartDisease: false,
    heartDiseaseDetails: '',
    hasCancer: false,
    cancerDetails: '',
    otherConditions: '',
    emailId: '',
  });

  const steps: Step[] = getSteps(familyMember);
  const currentQuestion = steps[currentStep];
  const shouldShowCurrentStep = !currentQuestion.showIf || currentQuestion.showIf();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user?.email) {
        setFamilyMember(prev => ({ ...prev, emailId: user.email || '' }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAnswer = (answer: string) => {
    const value = answer === 'Yes' ? true : answer === 'No' ? false : answer;
    setFamilyMember(prev => ({
      ...prev,
      [currentQuestion.field]: value,
    }));
    handleNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = currentQuestion.inputType === 'number' ? Number(e.target.value) : e.target.value;
    setFamilyMember(prev => ({
      ...prev,
      [currentQuestion.field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitData();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/family`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(familyMember),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return {
    currentStep,
    isSubmitted,
    familyMember,
    currentQuestion,
    steps,
    shouldShowCurrentStep,
    handleAnswer,
    handleInputChange,
    handleNext,
    handleBack,
  };
};
