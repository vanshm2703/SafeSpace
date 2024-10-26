// app/api/groq/route.js
import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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"
});

export async function POST(request) {
  try {
    const { userInput } = await request.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1024,
    });

    return NextResponse.json({
      success: true,
      response: completion.choices[0]?.message?.content || "No response generated"
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}