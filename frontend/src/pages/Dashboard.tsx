import React, { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/get-submissions')
      .then((res) => res.json())
      .then((data) => setSubmissions(data))
      .catch((err) => console.error(err));
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
              <li key={index}>{entry.name}: {JSON.stringify(entry.answers)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;