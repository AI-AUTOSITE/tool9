'use client';

import { Tool } from '@/lib/types';

interface ComparisonTableProps {
  tools: Tool[];
}

export default function ComparisonTable({ tools }: ComparisonTableProps) {
  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No competitive tools found. Try analyzing a different product.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="w-full border-collapse table-responsive">
        <thead>
          <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
            <th className="border border-gray-300 p-3 md:p-4 text-left font-semibold text-gray-700">
              Tool Name
            </th>
            <th className="border border-gray-300 p-3 md:p-4 text-left font-semibold text-gray-700">
              Pros
            </th>
            <th className="border border-gray-300 p-3 md:p-4 text-left font-semibold text-gray-700">
              Cons
            </th>
            <th className="border border-gray-300 p-3 md:p-4 text-left font-semibold text-gray-700">
              Gaps / Needs
            </th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool, index) => (
            <tr 
              key={index}
              className="hover:bg-yellow-50 transition-colors animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <td className="border border-gray-300 p-3 md:p-4 font-medium text-gray-900">
                {tool.name}
              </td>
              <td className="border border-gray-300 p-3 md:p-4 text-gray-600">
                {tool.pros}
              </td>
              <td className="border border-gray-300 p-3 md:p-4 text-gray-600">
                {tool.cons}
              </td>
              <td className="border border-gray-300 p-3 md:p-4 text-gray-600">
                {tool.gaps}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}