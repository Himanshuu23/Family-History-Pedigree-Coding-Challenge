import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FamilyMember } from "../types/member";
import Home from "../pages/HomePage";
import QuestionnairePage from "../pages/Questionnaire";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import FamilyPedigreeView from "../sections/Pedigree";

interface RouterProps {
  familyData: FamilyMember[];
}

const Router: React.FC<RouterProps> = ({ familyData }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/dashboard" element={<Dashboard familyData={familyData} />} />
          <Route path="/tree" element={<FamilyPedigreeView familyData={familyData} />} />
        </>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
};

export default Router;
