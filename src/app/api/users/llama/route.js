import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: "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",
});
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to attempt the API call with retries
async function attemptCompletion(messages, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        messages,
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 1024,
      });
      return completion;
    } catch (error) {
      if (error.message.includes("503") && attempt < maxRetries) {
        // Wait for 2^attempt seconds before retrying (exponential backoff)
        await delay(Math.pow(2, attempt) * 1000);
        continue;
      }
      throw error;
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const userInput = body.userInput;

    if (!userInput) {
      return NextResponse.json({
        success: false,
        error: 'No input provided'
      }, { status: 400 });
    }

    const messages = [
      {
        role: "user",
        content: userInput,
      },
    ];

    try {
      const completion = await attemptCompletion(messages);
      
      return NextResponse.json({
        success: true,
        response: completion.choices[0]?.message?.content || 'No response generated'
      });
    } catch (error) {
      // If all retries failed, return a more user-friendly error
      return NextResponse.json({
        success: false,
        error: 'The service is temporarily unavailable. Please try again in a few moments.',
        details: error.message
      }, { status: 503 });
    }

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: 'An unexpected error occurred',
      details: error.message
    }, { status: 500 });
  }
}