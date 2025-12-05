import React from 'react';
import { type Transaction } from '@/types/transaction';
import TransactionRow from './TransactionRow';
import Pagination from './Pagination';

interface TransactionTableProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Transactions</h2>
        <p className="text-gray-600 text-sm mb-6">Showing 5 of 42 transactions</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Comment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reply</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Given</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>VP</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Issues</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Transaction ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
