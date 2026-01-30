import Anthropic from '@anthropic-ai/sdk';
import type { Slide, Theme } from './types';
import { fetchMultipleUnsplashImages } from './unsplash';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
});

/**
 * Generate persuasive sales presentation slides from scraped content using Claude
 */
export async function generateSlides(
  content: string,
  title: string,
  clientName: string | null,
  theme: Theme
): Promise<Slide[]> {
  const clientText = clientName
    ? `Client: ${clientName}\nPersonalize this presentation for ${clientName}. Reference them by name where appropriate.`
    : 'Client: General audience - make it broadly applicable but still compelling';

  const themeAesthetic = {
    executive: 'sophisticated, executive-level, corporate boardroom',
    minimal: 'clean, modern, design-forward',
    tech: 'cutting-edge, innovative, developer-focused'
  }[theme];

  const prompt = `You are an expert sales presentation strategist. Your job is to create a PERSUASIVE, COMPELLING sales presentation that convinces people to buy.

SCRAPED CONTENT FROM THEIR WEBSITE:
${content}

PRESENTATION DETAILS:
Title: ${title}
${clientText}
Theme: ${theme} (${themeAesthetic})

YOUR MISSION:
Analyze the content and create a 12-15 slide sales presentation that SELLS. This needs to be persuasive enough to close deals.

REQUIRED STRUCTURE (12-15 slides total):

1. TITLE SLIDE
   - Compelling title that hints at value
   - Subtitle: ${clientName ? `Prepared for ${clientName}` : 'Premium solution presentation'}

2. THE PROBLEM (2-3 slides)
   - What pain points does this solve?
   - What's broken in the current way of doing things?
   - Why should they care RIGHT NOW?
   - Use specific, relatable scenarios

3. THE SOLUTION (1 slide)
   - High-level overview of what this product/service is
   - The "aha!" moment
   - Position it as the obvious answer to the problems

4. KEY BENEFITS (3-4 slides)
   - What transformational outcomes will they get?
   - Use metrics, percentages, time saved, money saved
   - Focus on THEIR success, not just features
   - Make it tangible and specific

5. HOW IT WORKS (2-3 slides)
   - Credibility through specifics
   - Show it's real and achievable
   - Address "how is this different?"
   - Technical credibility without overwhelming

6. PROOF & RESULTS (1-2 slides)
   - Social proof, case studies, metrics
   - "Others are already winning with this"
   - Numbers that matter (ROI, growth, savings)

7. THE BUSINESS CASE (1 slide)
   - ROI, cost savings, revenue impact
   - Why this is a smart business decision
   - Risk of NOT doing it

8. NEXT STEPS (1 slide)
   - Clear call to action
   - What happens next
   - Remove friction from saying yes

9. CLOSING SLIDE
   - Thank you
   - Contact info or next meeting

CRITICAL RULES:
- Generate 12-15 slides total
- Each content slide should have 3-4 bullet points (not just 4 - vary it)
- Bullet points should be BENEFITS-focused, not just features
- Use specific numbers, metrics, percentages wherever possible
- Make it persuasive - this is a SALES tool, not an information dump
- Build a narrative arc from problem → solution → proof → action
- Use power words: proven, guaranteed, exclusive, breakthrough, revolutionary (when appropriate)
- Address objections preemptively
- Create urgency where natural

OUTPUT FORMAT (JSON only, no markdown):
[
  {
    "type": "title",
    "title": "[compelling title]",
    "subtitle": "[subtitle]",
    "image_prompt": "professional sales presentation opener, ${themeAesthetic}"
  },
  {
    "type": "content",
    "title": "[section title]",
    "points": ["benefit 1", "benefit 2", "benefit 3"],
    "image_prompt": "visual representing [concept]"
  },
  ...
  {
    "type": "closing",
    "title": "Let's Move Forward",
    "subtitle": "${clientName ? `Partnership opportunity for ${clientName}` : 'Ready to discuss next steps'}",
    "image_prompt": "professional closing slide"
  }
]

RESPOND WITH ONLY VALID JSON. Make this presentation so good it could close a deal.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse JSON response
    let slides = JSON.parse(responseText) as Slide[];

    // Validate structure
    if (!Array.isArray(slides) || slides.length < 10) {
      throw new Error('AI returned too few slides. Need 12-15 for effective sales presentation.');
    }

    if (slides.length > 20) {
      console.warn('AI returned too many slides. Trimming to 15.');
      slides = slides.slice(0, 15);
    }

    // Fetch Unsplash images for all slides in parallel
    console.log('Fetching images from Unsplash...');
    const imageQueries = slides.map(slide => slide.image_prompt || slide.title);
    const imageUrls = await fetchMultipleUnsplashImages(imageQueries);

    // Attach image URLs to slides
    slides.forEach((slide, index) => {
      if (imageUrls[index]) {
        slide.image_url = imageUrls[index];
      }
    });

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
