import React, { useEffect, useState } from "react";
import Router from "./routes";
import { FamilyMember } from "./types/member";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const App: React.FC = () => {
  const [familyData, setFamilyData] = useState<FamilyMember[]>([]);

  const getAllFamilyMembers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/family`);
      const data = await response.json();
      setFamilyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllFamilyMembers();
  }, []);

  return <Router familyData={familyData} />;
};

export default App;
