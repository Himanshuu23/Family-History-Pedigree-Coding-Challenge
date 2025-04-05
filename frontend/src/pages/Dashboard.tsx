import React from "react";
import { jsPDF } from "jspdf";
import "../index.css";
import { FamilyMember } from "../types/member";

interface DashboardProps {
  familyData: FamilyMember[];
}

const DashboardComponent: React.FC<DashboardProps> = ({ familyData }) => {
  const getAvatar = (gender?: string) => {
    if (!gender) return '🧑';
    switch(gender.toLowerCase()) {
      case 'male': return '👨';
      case 'female': return '👩';
      default: return '🧑';
    }
  };

  const handleExport = (member: FamilyMember) => {
    const doc = new jsPDF();
    doc.text(`Family Member Details`, 10, 10);
    doc.text(`Name: ${member.name}`, 10, 20);
    doc.text(`Relation: ${member.relation}`, 10, 30);
    doc.text(`Age: ${member.age}`, 10, 40);
    doc.text(`Status: ${member.isAlive ? "Alive" : "Deceased"}`, 10, 50);
    doc.save(`${member.name}_details.pdf`);
  };

  return (
    <div className="admin-dashboard">
      <h2>📋 Family Health Submissions</h2>
      <div className="family-grid">
        {familyData.map((member, index) => (
          <div key={index} className="family-card">
            <div className="avatar">{getAvatar(member.gender)}</div>
            <h3>{member.name || 'Unnamed Member'}</h3>
            <p><strong>Relation:</strong> {member.relation || 'Unknown'}</p>
            <p><strong>Age:</strong> {member.age || 'Unknown'}</p>
            <p><strong>Status:</strong> {member.isAlive ? "Alive" : "Deceased"}</p>
            
            <div className="health-info">
              <h4>Health Conditions:</h4>
              {member.hasDiabetes && (
                <p>Diabetes: {member.diabetesDetails || "No details"}</p>
              )}
              {member.hasHeartDisease && (
                <p>Heart Disease: {member.heartDiseaseDetails || "No details"}</p>
              )}
              {member.hasCancer && (
                <p>Cancer: {member.cancerDetails || "No details"}</p>
              )}
              {member.otherConditions && (
                <p>Other: {member.otherConditions}</p>
              )}
            </div>

            <div className="card-actions">
              <button 
                className="export-btn"
                onClick={() => handleExport(member)}
              >
                Export PDF
              </button>
              <button className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardComponent;