'use client';

import { AnalyzeResult } from '@/lib/types';
import { generateCSV, downloadFile } from '@/lib/utils';
import { FileDown, FileSpreadsheet, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';

interface ExportButtonsProps {
  results: AnalyzeResult;
}

export default function ExportButtons({ results }: ExportButtonsProps) {
  // CSVエクスポート
  const handleExportCSV = () => {
    const csv = generateCSV(results.tools);
    downloadFile(csv, 'competitive-analysis.csv', 'text/csv;charset=utf-8;');
  };

  // JSONエクスポート
  const handleExportJSON = () => {
    const json = JSON.stringify(results, null, 2);
    downloadFile(json, 'competitive-analysis.json', 'application/json');
  };

  // PDFエクスポート（動的インポート）
  const handleExportPDF = async () => {
    try {
      // jsPDFを動的にインポート
      const jsPDF = (await import('jspdf')).default;
      await import('jspdf-autotable');
      
      const doc = new jsPDF();
      
      // タイトル
      doc.setFontSize(20);
      doc.text('Competitive Tool Analysis', 14, 20);
      
      // 日付
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // テーブルデータの準備
      const tableData = results.tools.map(tool => [
        tool.name,
        tool.pros,
        tool.cons,
        tool.gaps
      ]);
      
      // テーブルを追加
      (doc as any).autoTable({
        head: [['Tool Name', 'Pros', 'Cons', 'Gaps/Needs']],
        body: tableData,
        startY: 40,
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 50 },
          2: { cellWidth: 50 },
          3: { cellWidth: 50 }
        }
      });
      
      // 新しいページにサマリーを追加
      doc.addPage();
      doc.setFontSize(16);
      doc.text('AI Summary', 14, 20);
      
      doc.setFontSize(10);
      const summaryLines = doc.splitTextToSize(results.summary, 180);
      doc.text(summaryLines, 14, 35);
      
      // Product Ideasがある場合は追加
      if (results.ideas && results.ideas.length > 0) {
        doc.addPage();
        doc.setFontSize(16);
        doc.text('Product Ideas', 14, 20);
        
        let yPosition = 35;
        results.ideas.forEach((idea, index) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text(`${index + 1}. ${idea.title}`, 14, yPosition);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          yPosition += 8;
          
          idea.features.forEach(feature => {
            if (yPosition > 270) {
              doc.addPage();
              yPosition = 20;
            }
            const featureLines = doc.splitTextToSize(`• ${feature}`, 170);
            doc.text(featureLines, 20, yPosition);
            yPosition += featureLines.length * 5;
          });
          
          yPosition += 10;
        });
      }
      
      // PDFを保存
      doc.save('competitive-analysis.pdf');
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Export Your Analysis
        </h3>
        <p className="text-gray-600 mb-6">
          Download your competitive analysis in various formats for sharing and documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CSV Export */}
        <button
          onClick={handleExportCSV}
          className="p-6 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition-all group card-hover"
        >
          <FileSpreadsheet className="w-12 h-12 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold text-gray-800 mb-1">Export as CSV</h4>
          <p className="text-sm text-gray-600">
            Spreadsheet format for Excel or Google Sheets
          </p>
        </button>

        {/* JSON Export */}
        <button
          onClick={handleExportJSON}
          className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-all group card-hover"
        >
          <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold text-gray-800 mb-1">Export as JSON</h4>
          <p className="text-sm text-gray-600">
            Structured data for developers and APIs
          </p>
        </button>

        {/* PDF Export */}
        <button
          onClick={handleExportPDF}
          className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 transition-all group card-hover"
        >
          <FileDown className="w-12 h-12 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold text-gray-800 mb-1">Export as PDF</h4>
          <p className="text-sm text-gray-600">
            Professional report format for sharing
          </p>
        </button>
      </div>
    </div>
  );
}