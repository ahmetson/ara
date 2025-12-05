import React from 'react';
import { type Transaction } from '@/types/transaction';

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-4 text-sm text-gray-900">{transaction.date}</td>

      <td className="py-4 px-4">
        <div className="text-sm text-gray-600 italic">
          {transaction.comment === 'No comment' ? (
            <span className="text-gray-400">No comment</span>
          ) : (
            <div className="flex items-center space-x-2">
              <span>"{transaction.comment}"</span>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">"{transaction.reply}"</span>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <img
            src={transaction.user.avatar}
            alt={transaction.user.name}
            className="w-6 h-6 rounded-full"
            referrerPolicy="no-referrer"
          />
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            {transaction.user.name}
          </span>
        </div>
      </td>

      <td className="py-4 px-4 text-sm font-medium text-gray-900">
        ${transaction.given.toLocaleString()}
      </td>

      <td className="py-4 px-4">
        <span className="text-sm font-medium text-green-600">
          +{transaction.vp} (+2 bonus)
        </span>
      </td>

      <td className="py-4 px-4">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {transaction.issues}
        </span>
      </td>

      <td className="py-4 px-4">
        <span className="text-sm text-blue-600 hover:underline cursor-pointer">
          {transaction.transactionId}
        </span>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-gray-900">
            +{transaction.rating}.1
          </span>
          <span className="text-xs text-gray-500">
            / {transaction.ratingLeft} left
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;
