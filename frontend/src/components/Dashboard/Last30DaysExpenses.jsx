import React from 'react';
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
import moment from 'moment';

const blueColors = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#1D4ED8'];

const Last30DaysExpenses = ({ data = [] }) => {
  const formattedData = data.map((txn) => ({
    ...txn,
    label: moment(txn.date).format('DD MMM'), // for X-axis label
  }));

  const getBarColor = (index) => blueColors[index % blueColors.length];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, amount, category } = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">{category}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="text-sm font-medium text-gray-900">₹{amount}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Date: {moment(date).format('Do MMM YYYY')}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!formattedData.length) {
    return (
      <div className="text-sm text-center text-gray-500 mt-10">
        No expense data to display.
      </div>
    );
  }

  return (
    <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-bold text-blue-900">Last 30 Days Expenses</h5>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#555' }} />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {formattedData.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Last30DaysExpenses;
