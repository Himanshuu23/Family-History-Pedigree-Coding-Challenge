// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuestionnairePage from '../pages/Questionnaire';
import Dashboard from '../pages/Dashboard';

import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

const Router = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<QuestionnairePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
};

export default Router;
