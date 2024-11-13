// src/app/api/generateMandala/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log("Generating mandala for ", request.url);
  const { searchParams } = new URL(request.url);
  const promptNoun = searchParams.get("prompt") || "love";

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    console.log("Sanity checking with Google...");
    // Sanity check by querying google
    const googleResponse = await fetch(`https://www.google.com/search?q=${promptNoun}`);
    console.log("Google response: ", googleResponse);


    console.log("Querying OpenAI with prompt: ", `A mandala made of colorful ${promptNoun} in intricate patterns with a white background`);
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `A mandala made of colorful ${promptNoun} in intricate patterns with a white background`,
        size: '512x512',
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