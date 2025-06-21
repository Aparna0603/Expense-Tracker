import React from "react";

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const amount = payload[0].value;
    const formatted = amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

    return (
      <div className="bg-white border border-gray-200 p-2 rounded shadow text-xs">
        <p className="text-gray-700">{label}</p>
        <p className="font-semibold text-purple-600">{formatted}</p>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
