// 📁 components/Cards/TransactionInfoCard.js
import React from "react";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  date,
  amount,
  type,
  icon,
  onDelete,
  hideDeleteBtn = false,
}) => {
  const amountColor = type === "income" ? "text-green-600" : "text-red-500";
  const typeIcon =
    type === "income" ? (
      <LuArrowDown className="text-green-500 text-xl" />
    ) : (
      <LuArrowUp className="text-red-500 text-xl" />
    );

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <div className="text-lg">{icon || typeIcon}</div>
        <div>
          <div className="font-medium text-gray-900 text-sm">{title}</div>
          <div className="text-gray-500 text-xs">{date}</div>
        </div>
      </div>

      <div className="text-right">
        <div className={`font-semibold text-sm ${amountColor}`}>{amount}</div>
        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className="text-xs text-red-400 hover:text-red-600 mt-1"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
