import React, { useEffect, useState } from "react";
import { getFamilyTree } from "../services/familyApi";

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const token = "your_auth_token"; // Replace with actual token

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await getFamilyTree(token);
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="center-container">
      <div className="card">
        <h2>📋 All Submissions</h2>
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <ul>
            {submissions.map((entry, index) => (
              <li key={index}>
                {entry.name}: {JSON.stringify(entry.answers)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;