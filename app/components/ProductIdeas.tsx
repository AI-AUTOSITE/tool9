'use client';

import { ProductIdea } from '@/lib/types';
import { Sparkles } from 'lucide-react';

interface ProductIdeasProps {
  ideas: ProductIdea[];
}

export default function ProductIdeas({ ideas }: ProductIdeasProps) {
  if (!ideas || ideas.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No product ideas generated. Try analyzing again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          AI-Generated Product Ideas
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-purple-50 border border-purple-200 rounded-lg p-6 card-hover animate-fadeIn"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <h4 className="text-lg font-bold text-purple-900 mb-4">
              {idea.title}
            </h4>
            <ul className="space-y-2">
              {idea.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* アイデアの説明 */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-800">
          <strong>💡 Pro Tip:</strong> These product ideas are generated based on the gaps and opportunities 
          identified in the competitive analysis. Each idea focuses on underserved needs in the current market.
        </p>
      </div>
    </div>
  );
}