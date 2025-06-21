import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const blueColors = ["#1D4ED8", "#3B82F6", "#60A5FA", "#93C5FD"];
const multiColors = ["#875CF5", "#FA2C37", "#FF6900", "#16a34a", "#0284c7"];

const CustomBarChart = ({ data = [] }) => {
  const [theme, setTheme] = useState("blue"); // "blue" or "multi"

  const toggleTheme = () => {
    setTheme((prev) => (prev === "blue" ? "multi" : "blue"));
  };

  const getColors = theme === "blue" ? blueColors : multiColors;
  const getBarColor = (index) => getColors[index % getColors.length];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, amount, source } = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">{source}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="text-sm font-medium text-gray-900">₹{amount}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">Date: {month}</p>
        </div>
      );
    }
    return null;
  };

  if (!data.length) {
    return (
      <div className="text-sm text-center text-gray-500 mt-10">
        No income data to display.
      </div>
    );
  }

  return (
    <div className="bg-white mt-6 p-4 rounded-lg shadow border border-gray-200">
      <div className="flex justify-between mb-4">
        <h4 className="font-semibold text-gray-800">Expense Overview</h4>
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Switch to {theme === "blue" ? "Multicolor" : "Blue"} Theme
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
