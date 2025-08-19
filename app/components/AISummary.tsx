'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

interface AISummaryProps {
  summary: string;
  markdown: string;
}

export default function AISummary({ summary, markdown }: AISummaryProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = async () => {
    const success = await copyToClipboard(markdown);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!summary) {
    return (
      <div className="text-center py-8 text-gray-500">
        No summary available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* サマリー表示 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Market Analysis Summary
        </h3>
        <div className="prose prose-sm md:prose-base max-w-none text-gray-700">
          {summary.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="mb-2">
                {paragraph}
              </p>
            )
          ))}
        </div>
      </div>

      {/* Markdownコピーボタン */}
      <div className="flex justify-end">
        <button
          onClick={handleCopyMarkdown}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all flex items-center gap-2 btn-hover"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy as Markdown
            </>
          )}
        </button>
      </div>
    </div>
  );
}