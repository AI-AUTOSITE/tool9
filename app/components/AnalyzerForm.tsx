'use client';

import { useState } from 'react';
import { canUseToday } from '@/lib/utils';
import { Search, RefreshCw, Sliders, Target, Cpu } from 'lucide-react';

interface AnalyzerFormProps {
  onAnalyze: (product: string, options: any) => void;
  loading: boolean;
  onReset: () => void;
  hasResults: boolean;
}

export default function AnalyzerForm({ 
  onAnalyze, 
  loading, 
  onReset,
  hasResults 
}: AnalyzerFormProps) {
  const [product, setProduct] = useState('');
  const [tone, setTone] = useState('critical');
  const [focus, setFocus] = useState('innovation');
  const [limit, setLimit] = useState(5);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!product.trim()) {
      setError('Please enter a product name');
      return;
    }

    if (product.length > 50) {
      setError('Product name must be 50 characters or less');
      return;
    }

    if (!canUseToday()) {
      setError('Usage limit reached. You can analyze up to 3 products per day. Please try again tomorrow.');
      return;
    }

    onAnalyze(product, { tone, focus, limit });
  };

  const handleReset = () => {
    setProduct('');
    setError('');
    onReset();
  };

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 lg:p-10 shadow-glow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* オプション選択 - レスポンシブグリッド */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            Analysis Options
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tone選択 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Analysis Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 focus-visible-ring"
                disabled={loading}
              >
                <option value="critical">🔥 Critical</option>
                <option value="neutral">⚖️ Neutral</option>
                <option value="friendly">🤝 Friendly</option>
              </select>
            </div>

            {/* Focus選択 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Focus Area
              </label>
              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 focus-visible-ring"
                disabled={loading}
              >
                <option value="innovation">💡 Innovation</option>
                <option value="UX">🎨 UX/UI</option>
                <option value="AI">🤖 AI Features</option>
              </select>
            </div>

            {/* Limit選択 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Number of Tools
              </label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 focus-visible-ring"
                disabled={loading}
              >
                <option value={3}>Top 3</option>
                <option value={5}>Top 5</option>
                <option value={7}>Top 7</option>
                <option value={10}>Top 10</option>
              </select>
            </div>
          </div>
        </div>

        {/* 製品名入力 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Enter Product Name
          </label>
          <div className="relative group">
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g., Slack, Notion, Figma, Zoom..."
              className="w-full px-4 py-4 pr-12 text-base sm:text-lg border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 group-hover:shadow-lg focus-visible-ring"
              disabled={loading}
              maxLength={50}
              autoComplete="off"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors">
              <Search className="w-5 h-5" />
            </div>
          </div>
          
          {/* 文字数カウンター */}
          {product.length > 0 && (
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {50 - product.length} characters remaining
              </p>
              {product.length > 40 && (
                <p className="text-sm text-yellow-600">
                  Approaching limit
                </p>
              )}
            </div>
          )}
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl text-red-600 text-sm animate-slideUp">
            {error}
          </div>
        )}

        {/* ボタン - レスポンシブレイアウト */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all hover-scale shadow-lg flex items-center justify-center gap-2 focus-visible-ring"
          >
            {loading ? (
              <>
                <div className="spinner-modern w-5 h-5"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Analyze Competition</span>
              </>
            )}
          </button>
          
          {hasResults && (
            <button
              type="button"
              onClick={handleReset}
              className="sm:w-auto px-6 py-4 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all hover-scale shadow-lg flex items-center justify-center gap-2 focus-visible-ring"
            >
              <RefreshCw className="w-5 h-5" />
              <span>New Analysis</span>
            </button>
          )}
        </div>

        {/* 使用状況インジケーター */}
        <div className="pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Free tier: 3 analyses per day</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Ready to analyze
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}