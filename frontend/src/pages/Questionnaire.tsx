import { useQuestionnaire } from '../hooks/useQuestionnaire';
import QuestionCard from '../sections/QuestionnaireCard';

const Questionnaire = () => {
  const {
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
  } = useQuestionnaire();

  if (isSubmitted) {
    return (
      <QuestionCard question={{ id: 0, text: 'Thank you for your response!' }} onAnswer={() => {}} />
    );
  }

  if (!shouldShowCurrentStep) {
    handleNext();
    return null;
  }

  return (
    <QuestionCard question={currentQuestion} onAnswer={handleAnswer}>
      {!currentQuestion.isYesNo && (
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
              <button className="answer-button no" onClick={handleBack}>Back</button>
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
    </QuestionCard>
  );
};

export default Questionnaire;
