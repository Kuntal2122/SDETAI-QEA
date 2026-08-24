import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1'
});

export async function askNvidia(prompt: string) {

    const response = await client.chat.completions.create({
        model: 'meta/llama-3.1-8b-instruct',

        messages: [
            {
                role: 'user',
                content: prompt
            }
        ],

        temperature: 0.2,
        max_tokens: 500
    });

    return response.choices[0]?.message?.content;
}