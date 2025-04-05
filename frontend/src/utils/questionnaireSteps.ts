// data/questionnaireSteps.ts
import { Step } from '../types/form';
import { FamilyMember } from '../types/member';

export const getSteps = (familyMember: FamilyMember): Step[] => [
  { id: 1, text: "What is this family member's relation to you?", field: 'relation' },
  { id: 2, text: "What is their name?", field: 'name' },
  { id: 3, text: "How old are they?", field: 'age', inputType: 'number' },
  { id: 4, text: "What is their gender?", field: 'gender' },
  { id: 5, text: "Are they currently alive?", field: 'isAlive', isYesNo: true },
  { id: 6, text: "Do they have diabetes?", field: 'hasDiabetes', isYesNo: true },
  { id: 7, text: "Please provide details about their diabetes:", field: 'diabetesDetails', showIf: () => familyMember.hasDiabetes },
  { id: 8, text: "Have they had heart disease?", field: 'hasHeartDisease', isYesNo: true },
  { id: 9, text: "Please provide details about heart disease:", field: 'heartDiseaseDetails', showIf: () => familyMember.hasHeartDisease },
  { id: 10, text: "Have they had cancer?", field: 'hasCancer', isYesNo: true },
  { id: 11, text: "Please provide details about cancer:", field: 'cancerDetails', showIf: () => familyMember.hasCancer },
  { id: 12, text: "Any other health conditions to note?", field: 'otherConditions' },
];
