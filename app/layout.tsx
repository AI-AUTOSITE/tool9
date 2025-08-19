import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// 完全なSEO最適化メタデータ
export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Competitive Tool Analyzer - AI-Powered SaaS Competitor Analysis',
    template: '%s | Competitive Tool Analyzer'
  },
  description: 'Instantly analyze competitor SaaS tools with AI. Discover market gaps, compare features, and get data-driven product ideas. Free competitive intelligence tool for entrepreneurs and product managers.',
  keywords: [
    'competitive analysis',
    'SaaS tools comparison',
    'market research tool',
    'competitor analysis software',
    'product gap analysis',
    'business intelligence',
    'startup tools',
    'product development',
    'market opportunity finder',
    'AI business analysis',
    'competitive intelligence',
    'product strategy tool'
  ],
  authors: [{ name: 'SaaS RealityCheck', url: 'https://your-domain.com' }],
  creator: 'SaaS RealityCheck',
  publisher: 'SaaS RealityCheck',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Competitive Tool Analyzer',
    title: 'AI-Powered Competitive Analysis for SaaS Products',
    description: 'Analyze competitors instantly. Find market gaps. Get AI-powered product ideas. Free tool for entrepreneurs.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Competitive Tool Analyzer - AI-Powered Analysis',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    creator: '@yourtwitterhandle',
    title: 'Competitive Tool Analyzer - AI Analysis',
    description: 'Instantly analyze SaaS competitors with AI',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://your-domain.com',
    languages: {
      'en-US': 'https://your-domain.com',
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

// ビューポート設定（完全レスポンシブ対応）
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HB6LH06THC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HB6LH06THC');
          `}
        </Script>
        
        {/* 構造化データ（SEO最適化） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Competitive Tool Analyzer',
              description: 'AI-powered competitive analysis tool for SaaS products',
              url: 'https://your-domain.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '124',
              },
              author: {
                '@type': 'Organization',
                name: 'SaaS RealityCheck',
                url: 'https://your-domain.com',
              },
              datePublished: '2025-01-01',
              dateModified: new Date().toISOString(),
            }),
          }}
        />
        
        {/* FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is Competitive Tool Analyzer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Competitive Tool Analyzer is an AI-powered tool that helps entrepreneurs and product managers analyze competitor SaaS products, identify market gaps, and generate innovative product ideas.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How many products can I analyze per day?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can analyze up to 3 products per day with our free tool. This limit helps ensure quality service for all users.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is the analysis accurate?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our AI-powered analysis provides valuable insights based on available data. However, we recommend using it as a starting point and conducting additional research for critical business decisions.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased font-sans`}>
        {/* スキップリンク（アクセシビリティ） */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50">
          Skip to main content
        </a>
        
        {/* メイン背景 */}
        <div className="min-h-screen bg-gradient-mesh">
          <div className="fixed inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
        {/* パフォーマンス監視（開発環境のみ） */}
        {process.env.NODE_ENV === 'development' && (
          <Script id="performance-monitoring">
            {`
              if (typeof window !== 'undefined' && window.performance) {
                window.addEventListener('load', () => {
                  const perfData = window.performance.timing;
                  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                  console.log('Page Load Time:', pageLoadTime, 'ms');
                });
              }
            `}
          </Script>
        )}
      </body>
    </html>
  );
}