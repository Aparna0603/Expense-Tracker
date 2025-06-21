import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = [
  "#1D4ED8", 
  "#2563EB", 
  "#3B82F6", 
  "#60A5FA", 
  "#93C5FD", 
  "#BFDBFE", 
  "#DBEAFE", 
  "#EFF6FF", 
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  // Formatter to fix common source typos or normalize labels
  const formatLabel = (key) => {
    const corrections = {
      "buisness income": "Business Income",
      "salary": "Salary",
      "freelance": "Freelance",
      "interest": "Interest",
      // Add more corrections if needed
    };
    return corrections[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const prepareChartData = () => {
    const grouped = {};

    data?.forEach((item) => {
      if (!item?.source || !item?.amount) return;

      const key = item.source.trim().toLowerCase();
      grouped[key] = (grouped[key] || 0) + Number(item.amount);
    });

    const dataArr = Object.entries(grouped).map(([key, amount]) => ({
      name: formatLabel(key),
      amount,
    }));

    console.log("✅ Grouped Chart Data:", dataArr);
    setChartData(dataArr);
  };

  useEffect(() => {
    console.log("📊 Income chart data received:", data);
    prepareChartData();
  }, [data]);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg font-semibold text-gray-700">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={(totalIncome || 0).toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
        showTextAnchor
        colors={COLORS}
      />

      {/* Temporary debug output */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default RecentIncomeWithChart;
