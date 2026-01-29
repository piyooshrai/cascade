import Anthropic from '@anthropic-ai/sdk';
import type { Slide, Theme } from './types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
});

/**
 * Generate presentation slides from scraped content using Claude
 */
export async function generateSlides(
  content: string,
  title: string,
  clientName: string | null,
  theme: Theme
): Promise<Slide[]> {
  const clientText = clientName
    ? `Client: ${clientName}\nPersonalize ALL content to reference ${clientName} specifically.`
    : 'Client: None - use generic professional language';

  const themeAesthetic = {
    executive: 'sophisticated, professional, corporate',
    minimal: 'clean, simple, modern minimalist',
    tech: 'cutting-edge technology, innovative, digital'
  }[theme];

  const prompt = `You are a presentation content strategist. Given this web content, create a 5-slide presentation.

Content: ${content}

Title: ${title}
${clientText}
Theme: ${theme} (${themeAesthetic})

Generate slides in this exact JSON format (respond with ONLY valid JSON, no markdown code blocks):
[
  {
    "type": "title",
    "title": "[presentation title]",
    "subtitle": "${clientName ? `Prepared exclusively for ${clientName}` : 'Powered by The Algorithm'}",
    "image_prompt": "abstract professional background image for ${title}, ${themeAesthetic} aesthetic"
  },
  {
    "type": "content",
    "title": "[section title]",
    "points": ["point 1", "point 2", "point 3", "point 4"],
    "image_prompt": "visual representing [topic], clean professional style"
  },
  {
    "type": "content",
    "title": "[section title]",
    "points": ["point 1", "point 2", "point 3", "point 4"],
    "image_prompt": "visual representing [topic], clean professional style"
  },
  {
    "type": "content",
    "title": "[section title]",
    "points": ["point 1", "point 2", "point 3", "point 4"],
    "image_prompt": "visual representing [topic], clean professional style"
  },
  {
    "type": "closing",
    "title": "Thank You",
    "subtitle": "${clientName ? `Looking forward to working with ${clientName}` : 'Questions & Discussion'}",
    "image_prompt": "professional closing slide background, ${themeAesthetic} style"
  }
]

Rules:
- Exactly 5 slides (1 title, 3 content, 1 closing)
${clientName ? `- Personalize ALL content to reference ${clientName}` : '- Use professional, engaging language'}
- Content slides must have exactly 4 bullet points each
- Image prompts should match the ${theme} theme aesthetic
- Be specific and business-focused
- Make content relevant to the source material
- Keep bullet points concise (max 10 words each)`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse JSON response
    const slides = JSON.parse(responseText) as Slide[];

    // Validate structure
    if (!Array.isArray(slides) || slides.length !== 5) {
      throw new Error('Invalid slide structure returned from AI');
    }

    return slides;
  } catch (error) {
    console.error('Error generating slides:', error);
    throw new Error(`Failed to generate slides: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get theme-specific image generation style
 */
function getThemeImageStyle(theme: Theme): string {
  const styles = {
    executive: 'sophisticated gradients with deep purples and blues, professional serif aesthetic, elegant and refined',
    minimal: 'clean geometric shapes, monochrome black and white, minimalist and modern',
    tech: 'tech gradients with electric blue accents, digital and futuristic, innovative and cutting-edge'
  };
  return styles[theme];
}

/**
 * Generate an image for a slide using Claude (placeholder - returns null)
 * In production, this would integrate with an actual image generation service
 */
export async function generateSlideImage(
  imagePrompt: string,
  theme: Theme
): Promise<string | null> {
  // Note: Anthropic Claude API doesn't directly generate images
  // This is a placeholder that would integrate with services like:
  // - DALL-E, Midjourney, Stable Diffusion, etc.
  // For now, we'll return null and use CSS gradient backgrounds

  // const themeStyle = getThemeImageStyle(theme);
  // const fullPrompt = `${imagePrompt}. Style: ${themeStyle}`;

  // TODO: Integrate with actual image generation API
  // For MVP, slides will use theme-specific CSS gradient backgrounds

  return null;
}
