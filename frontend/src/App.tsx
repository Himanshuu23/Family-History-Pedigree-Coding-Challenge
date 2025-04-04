import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnaire";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import FamilyPedigreeView from "./sections/Pedigree";

const BASE_URL = "http://localhost:8080/v1/projects/backendx2025/databases/(default)/documents";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: string;
  isAlive: boolean;
  hasDiabetes: boolean;
  diabetesDetails: string;
  hasHeartDisease: boolean;
  heartDiseaseDetails: string;
  hasCancer: boolean;
  cancerDetails: string;
  otherConditions: string;
}

const demoFamilyData: FamilyMember[] = [
  {
    id: "1",
    name: "Rajesh Sharma",
    relation: "Father",
    age: 58,
    gender: "Male",
    isAlive: true,
    hasDiabetes: true,
    diabetesDetails: "Type 2 diabetes diagnosed at age 50",
    hasHeartDisease: false,
    heartDiseaseDetails: "",
    hasCancer: false,
    cancerDetails: "",
    otherConditions: "Hypertension"
  },
  {
    id: "2",
    name: "Sunita Sharma",
    relation: "Mother",
    age: 55,
    gender: "Female",
    isAlive: true,
    hasDiabetes: false,
    diabetesDetails: "",
    hasHeartDisease: true,
    heartDiseaseDetails: "Mild coronary artery disease",
    hasCancer: false,
    cancerDetails: "",
    otherConditions: "Arthritis"
  },
  {
    id: "3",
    name: "Vikram Sharma",
    relation: "Brother",
    age: 28,
    gender: "Male",
    isAlive: true,
    hasDiabetes: false,
    diabetesDetails: "",
    hasHeartDisease: false,
    heartDiseaseDetails: "",
    hasCancer: false,
    cancerDetails: "",
    otherConditions: "None"
  },
  {
    id: "4",
    name: "Priya Sharma",
    relation: "Sister",
    age: 25,
    gender: "Female",
    isAlive: true,
    hasDiabetes: false,
    diabetesDetails: "",
    hasHeartDisease: false,
    heartDiseaseDetails: "",
    hasCancer: false,
    cancerDetails: "",
    otherConditions: "Asthma"
  },
  {
    id: "5",
    name: "Ramesh Sharma",
    relation: "Grandfather",
    age: 82,
    gender: "Male",
    isAlive: false,
    hasDiabetes: true,
    diabetesDetails: "Type 2 diabetes with complications",
    hasHeartDisease: true,
    heartDiseaseDetails: "Heart attack at age 75",
    hasCancer: true,
    cancerDetails: "Prostate cancer",
    otherConditions: "Dementia in later years"
  }
];

const App: React.FC = () => {
  const [familyData, setFamilyData] = useState<FamilyMember[]>([demoFamilyData]);

  const getAllFamilyMembers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/all`);
      const data = await response.json();
      setFamilyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllFamilyMembers();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/dashboard" element={<Dashboard familyData={demoFamilyData} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/graph" element={<FamilyPedigreeView familyData={demoFamilyData} />} />
      </Routes>
    </>
  );
};

export default App;
