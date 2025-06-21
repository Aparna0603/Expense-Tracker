import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import moment from "moment";

const ExpenseOverview = ({ transactions = [], onExpenseIncome }) => {
  const chartData = transactions.map((item) => ({
    date: moment(item.date).format("DD MMM"),
    amount: item.amount,
    category: item.category,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-blue-800">Expense Overview</h2>
          <p className="text-sm text-black-500 mt-1">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>
        <button
          onClick={onExpenseIncome}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
        >
          + Add Expense
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `₹${value}`} />
            <Tooltip
              formatter={(value) => `₹${value}`}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#3B82F6", strokeWidth: 2, fill: "#fff" }}
              fill="url(#colorExpense)"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseOverview;
