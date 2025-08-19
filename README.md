# 🚀 Competitive Tool Analyzer

An AI-powered SaaS competitive analysis tool built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses GPT-4 for intelligent competitive analysis
- 📊 **Comprehensive Comparison** - Analyzes pros, cons, and market gaps
- 💡 **Product Ideas Generator** - Get innovative product suggestions
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Modern UI/UX** - Beautiful glassmorphism design with smooth animations
- 📥 **Export Options** - Download results as CSV, JSON, or PDF
- 🔒 **Privacy Focused** - No data storage, all processing is ephemeral
- ⚡ **Lightning Fast** - Optimized performance with Next.js 14
- 🌐 **SEO Optimized** - Full meta tags, structured data, and sitemap

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI GPT-4 API
- **Deployment:** Vercel
- **Analytics:** Google Analytics

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/competitive-tool-analyzer.git
cd competitive-tool-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
OPENAI_API_KEY=your-openai-api-key
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. Import to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `OPENAI_API_KEY`
   - Click "Deploy"

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | Yes |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Design Features

- **Glassmorphism** - Modern frosted glass effect
- **Gradient Animations** - Smooth color transitions
- **Micro-interactions** - Hover and focus states
- **Dark Mode Ready** - Prepared for dark theme
- **Accessibility** - WCAG 2.1 AA compliant

## 🔧 Configuration

### Customization

1. **Domain**: Update in `app/layout.tsx`
2. **Analytics**: Add GA ID in `.env.local`
3. **Rate Limits**: Modify in `lib/utils.ts`
4. **Colors**: Edit in `tailwind.config.ts`

### API Rate Limiting

- Local: 3 analyses per day (localStorage)
- Server: 10 requests per hour per IP

## 📊 SEO Optimization

- ✅ Meta tags and Open Graph
- ✅ Twitter Card support
- ✅ Structured data (Schema.org)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Performance optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Vercel for hosting
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework

## 📞 Support

For support, email support@your-domain.com or open an issue on GitHub.

## 🔗 Links

- [Live Demo](https://your-domain.com)
- [Documentation](https://github.com/yourusername/competitive-tool-analyzer/wiki)
- [Report Bug](https://github.com/yourusername/competitive-tool-analyzer/issues)
- [Request Feature](https://github.com/yourusername/competitive-tool-analyzer/issues)

---

Made with ❤️ by SaaS RealityCheck