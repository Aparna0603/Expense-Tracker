import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-semibold text-blue-800">All Expenses</h5>

        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <LuDownload className="text-base" />
          Download
        </button>
      </div>

      {/* Expense Cards */}
      {transactions?.length === 0 ? (
        <p className="text-gray-500 text-sm mt-4">No expenses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
