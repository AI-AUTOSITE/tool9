'use client';

import { useState } from 'react';
import { AnalyzeResult } from '@/lib/types';
import ComparisonTable from './ComparisonTable';
import AISummary from './AISummary';
import ProductIdeas from './ProductIdeas';
import ExportButtons from './ExportButtons';
import { Table, FileText, Lightbulb, Download } from 'lucide-react';

interface ResultsTabsProps {
  results: AnalyzeResult;
}

export default function ResultsTabs({ results }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState<'table' | 'summary' | 'ideas' | 'export'>('table');

  const tabs = [
    { id: 'table', label: 'Comparison Table', icon: Table },
    { id: 'summary', label: 'AI Summary', icon: FileText },
    { id: 'ideas', label: 'Product Ideas', icon: Lightbulb },
    { id: 'export', label: 'Export', icon: Download },
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      {/* タブナビゲーション */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  px-4 py-3 md:px-6 md:py-4 font-medium text-sm md:text-base
                  border-b-2 transition-all flex items-center gap-2
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="p-4 md:p-6">
        {activeTab === 'table' && (
          <ComparisonTable tools={results.tools} />
        )}
        
        {activeTab === 'summary' && (
          <AISummary summary={results.summary} markdown={results.markdown} />
        )}
        
        {activeTab === 'ideas' && (
          <ProductIdeas ideas={results.ideas} />
        )}
        
        {activeTab === 'export' && (
          <ExportButtons results={results} />
        )}
      </div>
    </div>
  );
}