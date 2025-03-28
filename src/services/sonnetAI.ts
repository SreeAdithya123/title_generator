// API key should be stored in environment variables
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

interface SonnetAIResponse {
  title: string;
  error?: string;
}

export async function generateProjectTitle(description: string): Promise<SonnetAIResponse> {
  try {
    if (!MISTRAL_API_KEY) {
      throw new Error('Mistral API key is not configured');
    }

    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [{
          role: 'user',
          content: `Please generate a creative and professional title for the following project description: ${description}. The title should be concise, memorable, and reflect the project's purpose. Return only the title text without any additional explanation or formatting.`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content;

    if (!text) {
      throw new Error('Invalid response format from API');
    }

    return { title: text.trim() };
  } catch (error) {
    return { 
      title: '',
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  
  }}
