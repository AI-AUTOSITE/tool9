'use client';

import { useState, useEffect } from 'react';
import AnalyzerForm from './components/AnalyzerForm';
import ResultsTabs from './components/ResultsTabs';
import TermsModal from './components/TermsModal';
import { AnalyzeResult } from '@/lib/types';
import { parseIdeasFromGPT } from '@/lib/utils';
import { AlertCircle, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const [results, setResults] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyze = async (
    product: string,
    options: { tone: string; focus: string; limit: number }
  ) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product, options }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      // レスポンスをパース
      const lines = data.result.split('\n');
      const tools = [];
      let isTableSection = false;
      let markdownTable = '| Tool Name | Pros | Cons | Gaps |\n|-----------|------|------|------|\n';

      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('| Tool Name') || trimmedLine.match(/^\|\s*[-]+/)) {
          isTableSection = true;
          continue;
        }
        
        if (isTableSection && trimmedLine.startsWith('|')) {
          const cells = trimmedLine.split('|').slice(1, -1).map((c: string) => c.trim());
          if (cells.length >= 4 && !cells[0].includes('---')) {
            tools.push({
              name: cells[0],
              pros: cells[1],
              cons: cells[2],
              gaps: cells[3],
            });
            markdownTable += `| ${cells[0]} | ${cells[1]} | ${cells[2]} | ${cells[3]} |\n`;
          }
        }
        
        if (isTableSection && !trimmedLine.startsWith('|') && trimmedLine !== '') {
          isTableSection = false;
        }
      }

      const { summary, ideas } = parseIdeasFromGPT(data.result);

      const analyzeResult: AnalyzeResult = {
        tools,
        summary,
        ideas,
        markdown: markdownTable + '\n\n## Summary\n\n' + summary,
      };

      setResults(analyzeResult);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  if (!mounted) return null;

  return (
    <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-7xl">
      {/* ヒーローセクション */}
      <header className="mb-12 lg:mb-16 text-center relative">
        {/* 装飾的な要素 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative z-10 space-y-6 animate-slideUp">
          {/* バッジ */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Analysis
          </div>
          
          {/* メインタイトル */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="gradient-text">Competitive Tool</span>
            <br />
            <span className="text-gray-900">Analyzer</span>
          </h1>
          
          {/* サブタイトル */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Analyze competitor SaaS tools instantly. Discover market gaps and get 
            <span className="font-semibold text-gray-900"> AI-powered product ideas</span>.
          </p>
          
          {/* 特徴バッジ */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Market Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>100% Free</span>
            </div>
          </div>
          
          {/* Terms リンク */}
          <button
            onClick={() => setShowTerms(true)}
            className="mt-4 text-blue-600 hover:text-blue-700 underline text-sm inline-flex items-center gap-1 transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
            Terms of Use & Important Notice
          </button>
        </div>
      </header>

      {/* 分析フォーム */}
      <section className="mb-12 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <AnalyzerForm 
          onAnalyze={handleAnalyze} 
          loading={loading}
          onReset={handleReset}
          hasResults={!!results}
        />
      </section>

      {/* エラー表示 */}
      {error && (
        <div className="mb-8 p-4 sm:p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-slideUp glass">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* 結果表示 */}
      {results && (
        <section className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <ResultsTabs results={results} />
        </section>
      )}

      {/* 特徴セクション（結果がない時のみ表示） */}
      {!results && !loading && (
        <section className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="text-center p-6 lg:p-8 rounded-2xl glass hover-lift">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Deep Analysis</h3>
            <p className="text-sm text-gray-600">
              Get comprehensive insights into competitor strengths, weaknesses, and market gaps
            </p>
          </div>
          
          <div className="text-center p-6 lg:p-8 rounded-2xl glass hover-lift">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Ideas</h3>
            <p className="text-sm text-gray-600">
              Receive innovative product suggestions based on identified market opportunities
            </p>
          </div>
          
          <div className="text-center p-6 lg:p-8 rounded-2xl glass hover-lift">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Export Ready</h3>
            <p className="text-sm text-gray-600">
              Download your analysis in CSV, JSON, or PDF format for easy sharing
            </p>
          </div>
        </section>
      )}

      {/* フッター */}
      <footer className="mt-16 lg:mt-24 py-8 border-t border-gray-200/50 text-center">
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-gray-500">
            ※ This tool is not intended to disrespect, defame, or unfairly criticize any product or service.
            <br className="hidden sm:block" />
            All analysis is automatically generated for constructive comparison and improvement only.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Copyright © 2025 SaaS RealityCheck. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Terms Modal */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </main>
  );
}