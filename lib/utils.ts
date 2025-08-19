import { clsx, type ClassValue } from 'clsx';
import { UsageData, ProductIdea } from './types';

// クラス名を結合するユーティリティ
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 1日の使用制限をチェック（ローカルストレージベース）
export function canUseToday(): boolean {
  if (typeof window === 'undefined') return true;
  
  const key = 'toolAnalyzerUsage';
  const today = new Date().toISOString().slice(0, 10);
  
  try {
    let usage: UsageData = JSON.parse(localStorage.getItem(key) || '{}');
    
    if (usage.date !== today) {
      usage = { date: today, count: 0 };
    }
    
    if (usage.count >= 3) return false;
    
    usage.count++;
    localStorage.setItem(key, JSON.stringify(usage));
    return true;
  } catch {
    return true;
  }
}

// GPTレスポンスからProduct Ideasをパース
export function parseIdeasFromGPT(text: string): { summary: string; ideas: ProductIdea[] } {
  // Summaryセクションの抽出
  const summaryMatch = text.match(/## Summary\s*([\s\S]*?)(?:\n---|\n##|$)/i);
  const summary = summaryMatch ? summaryMatch[1].trim() : '';
  
  // Product Ideasセクションの抽出
  const ideasSection = text.split(/## Product Ideas/i)[1] || '';
  const ideaPattern = /\*\*(.+?)\*\*\s*\n((?:-\s.*\n?){2,})/g;
  const ideas: ProductIdea[] = [];
  
  let match;
  while ((match = ideaPattern.exec(ideasSection)) !== null) {
    const title = match[1].trim();
    const features = match[2]
      .split('\n')
      .map(line => line.replace(/^\-\s*/, '').trim())
      .filter(feature => feature.length > 0);
    
    if (title && features.length > 0) {
      ideas.push({ title, features });
    }
  }
  
  return { summary, ideas };
}

// テーブルデータをMarkdown形式に変換
export function tableToMarkdown(tools: any[]): string {
  let markdown = '| Tool Name | Pros | Cons | Gaps |\n';
  markdown += '|-----------|------|------|------|\n';
  
  tools.forEach(tool => {
    markdown += `| ${tool.name} | ${tool.pros} | ${tool.cons} | ${tool.gaps} |\n`;
  });
  
  return markdown;
}

// クリップボードにコピー
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// CSVエクスポート用のデータ生成
export function generateCSV(tools: any[]): string {
  let csv = 'Tool Name,Pros,Cons,Gaps\n';
  
  tools.forEach(tool => {
    const row = [tool.name, tool.pros, tool.cons, tool.gaps]
      .map(cell => `"${cell.replace(/"/g, '""')}"`)
      .join(',');
    csv += row + '\n';
  });
  
  return csv;
}

// ファイルダウンロード
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}