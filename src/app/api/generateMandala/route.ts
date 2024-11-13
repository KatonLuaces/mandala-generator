// src/app/api/generateMandala/route.ts
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function GET(request: Request) {
  console.log("Generating mandala for ", request.url);
  const { searchParams } = new URL(request.url);
  const promptNoun = searchParams.get("prompt") || "love";


  const adjectives = ["purple", "blue", "intricate", "realistic", "graceful", "pragmatic", "vibrant", "subtle", "playful", "serene", "dynamic", "balanced", "well-educated", "thoughtful", "creative", "open-minded", "confident", "compassionate", "generous", "empathetic", "supportive", "encouraging", "positive", "optimistic", "accomplished", "healthy", "multi-lingual"];



  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const firstAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const secondAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const patternsAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    const backgroundOrBackdrop = ["background", "backdrop"][Math.floor(Math.random() * 2)];

    let backgroundDescription = `${secondAdjective} ${backgroundOrBackdrop}`;
    // half the time, replace with "white background"
    if (Math.random() < 0.5) {
      backgroundDescription = "white background";
    }

    let patternsDescription = `in ${patternsAdjective} patterns`;
    // half the time, drop the patterns description
    if (Math.random() < 0.5) {
      patternsDescription = "";
    }

    let withOrOn = ["with", "on"][Math.floor(Math.random() * 2)];

    const prompt = `A mandala made of ${firstAdjective} ${promptNoun} ${patternsDescription} ${withOrOn} a ${backgroundDescription}`;

    console.log("Querying OpenAI with prompt: ", prompt);
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        size: '1024x1024',
        n: 1,
      }),
    });
    console.log("OpenAI response: ", openaiResponse);

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error details:', errorText);
      throw new Error(`OpenAI API error! Status: ${openaiResponse.status}`);
    }

    const result = await openaiResponse.json();
    const imageUrl = result.data[0].url;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating image:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error generating image:', error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}