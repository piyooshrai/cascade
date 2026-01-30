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
- VARY THE VISUAL PACING - use different layouts to avoid monotony
- Break patterns every 3-4 slides with a visual change

AVAILABLE SLIDE LAYOUTS:
1. "default" - Standard title + bullet points (use for most content slides)
2. "stat_callout" - Large number/statistic with context (use for key metrics, ROI, impressive numbers)
3. "quote" - Customer testimonial or powerful quote (use for social proof, authority)
4. "image_full" - Full-bleed image with minimal overlay text (use for emotional impact, scene-setting)
5. "comparison" - Two-column before/after or us vs them (use for differentiation, transformation)
6. "timeline" - Horizontal steps/progression (use for implementation process, roadmap)
7. "statement" - Single powerful sentence, minimal text (use for key insights, turning points)
   - For STATEMENT slides: The "emphasis" field should highlight the MOST IMPACTFUL words
   - Emphasize the punch line, the key contrast, or the surprising insight
   - DO NOT just emphasize the first few words
   - Example: "Your brightest students lose opportunities to inferior candidates" → emphasize "brightest students" or "inferior candidates"

LAYOUT SELECTION STRATEGY:
- Start with title slide
- Use DEFAULT for most problem/solution/benefit slides
- Insert a STAT_CALLOUT when you have a compelling metric (e.g., "47% cost reduction", "3x faster")
- Use QUOTE for social proof sections (customer testimonials, industry recognition)
- Use COMPARISON for differentiation (before/after, us vs competitors)
- Use TIMELINE for the "How It Works" section
- Use STATEMENT for pivotal moments ("The old way is broken" or "Time to act")
- Use IMAGE_FULL sparingly for emotional impact or scene-setting
- Vary pacing: 3-4 dense slides → 1 minimal slide → repeat

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
    "layout": "default",
    "title": "[section title]",
    "points": ["benefit 1", "benefit 2", "benefit 3"],
    "image_prompt": "visual representing [concept]"
  },
  {
    "type": "content",
    "layout": "stat_callout",
    "title": "Proven Results",
    "stat": {
      "value": "47%",
      "label": "Average Cost Reduction",
      "context": "Clients see ROI within 90 days"
    },
    "image_prompt": "growth chart, success metrics"
  },
  {
    "type": "content",
    "layout": "quote",
    "title": "What Our Clients Say",
    "quote": {
      "text": "This solution transformed our operations and saved us millions.",
      "author": "Jane Smith",
      "role": "CFO, Fortune 500 Company"
    },
    "image_prompt": "professional testimonial"
  },
  {
    "type": "content",
    "layout": "comparison",
    "title": "The Transformation",
    "comparison": {
      "left": {
        "label": "Before",
        "items": ["Manual processes", "High error rates", "Slow response times"]
      },
      "right": {
        "label": "After",
        "items": ["Automated workflows", "99.9% accuracy", "Real-time insights"]
      }
    },
    "image_prompt": "transformation, before and after"
  },
  {
    "type": "content",
    "layout": "timeline",
    "title": "Implementation Roadmap",
    "timeline": {
      "steps": [
        {
          "label": "Discovery",
          "description": "Analyze your current state",
          "duration": "Week 1"
        },
        {
          "label": "Setup",
          "description": "Configure and customize",
          "duration": "Week 2-3"
        },
        {
          "label": "Launch",
          "description": "Go live with support",
          "duration": "Week 4"
        }
      ]
    },
    "image_prompt": "roadmap, timeline, process"
  },
  {
    "type": "content",
    "layout": "statement",
    "title": "The Time to Act Is Now",
    "statement": {
      "text": "Every day without this solution costs you money.",
      "emphasis": "costs you money"
    },
    "image_prompt": "urgency, opportunity, decisive moment"
  },
  ...
  {
    "type": "closing",
    "title": "Let's Move Forward",
    "subtitle": "${clientName ? `Partnership opportunity for ${clientName}` : 'Ready to discuss next steps'}",
    "image_prompt": "professional closing slide"
  }
]

RESPOND WITH ONLY VALID JSON. Make this presentation so good it could close a deal. Use varied layouts to maintain engagement and avoid monotony.`;

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
