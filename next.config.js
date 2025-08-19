/** @type {import('next').NextConfig} */
const nextConfig = {
  // エラーを一時的に無視する設定（開発時のみ使用）
  typescript: {
    ignoreBuildErrors: false, // 本番では false にする
  },
  eslint: {
    ignoreDuringBuilds: false, // 本番では false にする
  },
  // 画像の最適化設定
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // ヘッダー設定（セキュリティ向上）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig