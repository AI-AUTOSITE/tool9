import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AnalyzeOptions } from '@/lib/types';

// OpenAI APIクライアントの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// レート制限用の簡易実装（本番環境では Redis 等を使用推奨）
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = requestCounts.get(ip);
  
  if (!limit || now > limit.resetTime) {
    // 1時間でリセット
    requestCounts.set(ip, { count: 1, resetTime: now + 3600000 });
    return true;
  }
  
  if (limit.count >= 10) { // 1時間に10リクエストまで
    return false;
  }
  
  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // IPアドレスの取得（Vercelではx-forwarded-forヘッダーを使用）
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // レート制限チェック
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // リクエストボディの解析
    const body = await request.json();
    const { product, options } = body as {
      product: string;
      options: AnalyzeOptions;
    };
    
    // バリデーション
    if (!product || product.trim().length === 0) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }
    
    if (product.length > 50) {
      return NextResponse.json(
        { error: 'Product name must be 50 characters or less' },
        { status: 400 }
      );
    }
    
    // プロンプトのトーンとフォーカスのマッピング
    const toneMap = {
      critical: 'Be brutally honest and critical.',
      neutral: 'Be objective and neutral.',
      friendly: 'Be supportive and friendly.',
    };
    
    const focusMap = {
      innovation: 'Focus especially on technical and innovative differentiation.',
      UX: 'Focus especially on UX/UI and usability issues.',
      AI: 'Focus on AI/automation features and limitations.',
    };
    
    const toneText = toneMap[options.tone] || toneMap.critical;
    const focusText = focusMap[options.focus] || focusMap.innovation;
    const limit = Math.max(1, Math.min(15, options.limit || 5));
    
    // OpenAI APIへのプロンプト
    const prompt = `Analyze the SaaS product "${product}".
${toneText}
${focusText}
Find and list up to ${limit} similar tools (loose match is OK, pick top with most users if possible).
Return your answer as a Markdown table with columns: Tool Name, Pros, Cons, Gaps/Needs.

Then summarize: what product concept would be most likely to succeed in the current English SaaS market (brutally).

Finally, based on this analysis, suggest 3 brand new SaaS product ideas (not existing yet), each with:
- a short, catchy English title (bold, one line, max 5 words),
- and 5 bullet-pointed specialized features (as a Markdown list).

Format your response exactly like this:

| Tool Name | Pros | Cons | Gaps/Needs |
|-----------|------|------|------------|
| Tool1 | ... | ... | ... |
| Tool2 | ... | ... | ... |

---

## Summary

(summary text here)

---

## Product Ideas

**Title 1**
- feature 1
- feature 2
- feature 3
- feature 4
- feature 5

**Title 2**
- feature 1
- feature 2
- feature 3
- feature 4
- feature 5

**Title 3**
- feature 1
- feature 2
- feature 3
- feature 4
- feature 5`;

    // OpenAI API呼び出し
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    const result = completion.choices[0]?.message?.content;
    
    if (!result) {
      throw new Error('No response from OpenAI');
    }
    
    // レスポンスを返す
    return NextResponse.json({ result });
    
  } catch (error: any) {
    console.error('API Error:', error);
    
    // OpenAI APIエラーの場合
    if (error?.response?.status === 429) {
      return NextResponse.json(
        { error: 'OpenAI API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    if (error?.response?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key configuration.' },
        { status: 500 }
      );
    }
    
    // その他のエラー
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}