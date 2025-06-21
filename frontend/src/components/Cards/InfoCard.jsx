// 📁 components/Cards/InfoCard.js
import React from "react";

const InfoCard = ({ icon, label, value, color = "bg-blue-500" }) => {
  return (
    <div className={`p-4 rounded-2xl shadow-md border border-gray-100 ${color} text-white`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm font-medium opacity-90">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
};

export default InfoCard;
