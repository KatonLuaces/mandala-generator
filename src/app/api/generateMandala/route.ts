// src/app/api/generateMandala/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Generating mandala...');
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'A mandala made of colorful paperclips in intricate patterns',
        size: '1024x1024',
        model: 'dall-e-3',
        quality: 'standard',
        n: 1,
      }),
    });

    console.log('openaiResponse', openaiResponse);

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error! Status: ${openaiResponse.status}`);
    }

    const result = await openaiResponse.json();
    const imageUrl = result.data[0].url;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}