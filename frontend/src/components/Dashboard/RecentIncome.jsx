// 📁 components/Dashboard/RecentIncome.js
import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const RecentIncome = ({ transactions, onSeeMore }) => {
  const formatINR = (amount) =>
    (amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  return (
    <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow">
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-lg font-semibold text-blue-900">Recent Income</h5>
        <button
          className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {transactions?.slice(0, 4)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={formatINR(item.amount)}
            type="income"
            hideDeleteBtn
          />
        ))}
        {transactions?.length === 0 && (
          <p className="text-gray-400 italic text-sm">No income transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
