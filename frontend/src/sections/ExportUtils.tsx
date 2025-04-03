import jsPDF from 'jspdf';

export const exportToPDF = (data: Record<string, any>, filename = "export.pdf") => {
  const doc = new jsPDF();
  doc.text(JSON.stringify(data, null, 2), 10, 10);
  doc.save(filename);
};

export const exportToJSON = (data: Record<string, any>, filename = "export.json") => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};