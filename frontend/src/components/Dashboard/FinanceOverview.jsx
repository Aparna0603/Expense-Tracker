import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#3B82F6", "#EF4444", "#F59E0B"]; 

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  
  const formatINR = (amount) =>
    (amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-bold text-blue-900">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={formatINR(totalBalance)}  // ✅ Corrected
        colors={COLORS}
        showTextAnchor
      />

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-blue-700">Total Balance</span>
          <span className="font-semibold text-blue-900">{formatINR(totalBalance)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-red-600">Total Expense</span>
          <span className="font-semibold text-red-700">{formatINR(totalExpense)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-yellow-600">Total Income</span>
          <span className="font-semibold text-yellow-700">{formatINR(totalIncome)}</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
