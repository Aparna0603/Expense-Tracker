import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  // Format amount in Indian Rupee format
  const formatINR = (amount) =>
    (amount || 0).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-blue-500">Income Source</h5>

        <button
          onClick={onDownload}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <LuDownload className="text-base" />
          <span>Download</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format('Do MMM YYYY')}
              amount={formatINR(income.amount)}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <p className="text-gray-400 italic text-sm">No income data found.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
