// アプリケーション全体で使用する型定義

export interface AnalyzeOptions {
  tone: 'critical' | 'neutral' | 'friendly';
  focus: 'innovation' | 'UX' | 'AI';
  limit: number;
}

export interface Tool {
  name: string;
  pros: string;
  cons: string;
  gaps: string;
}

export interface ProductIdea {
  title: string;
  features: string[];
}

export interface AnalyzeResult {
  tools: Tool[];
  summary: string;
  ideas: ProductIdea[];
  markdown: string;
}

export interface UsageData {
  date: string;
  count: number;
}