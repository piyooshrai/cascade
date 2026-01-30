export type SlideType = 'title' | 'content' | 'closing';

export type SlideLayout =
  | 'default'           // Standard title + bullets
  | 'stat_callout'      // Large number/stat with context
  | 'quote'             // Customer testimonial or key quote
  | 'image_full'        // Full-bleed image with overlay text
  | 'comparison'        // Two-column comparison (before/after, us vs them)
  | 'timeline'          // Horizontal progression/steps
  | 'statement';        // Single powerful sentence, minimal text

export type Theme = 'executive' | 'minimal' | 'tech';

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface Slide {
  type: SlideType;
  layout?: SlideLayout;  // Optional layout override
  title: string;
  subtitle?: string;
  points?: string[];
  image_url?: string;
  image_prompt?: string;

  // Layout-specific fields
  stat?: {
    value: string;       // "47%" or "$2.4M" or "3x"
    label: string;       // What the stat represents
    context?: string;    // Additional context or comparison
  };

  quote?: {
    text: string;        // The quote itself
    author: string;      // Who said it
    role?: string;       // Their title/company
  };

  statement?: {
    text: string;        // The powerful statement
    emphasis?: string;   // Optional emphasized portion
  };

  comparison?: {
    left: {
      label: string;     // "Before" or "Competitor" or "Traditional"
      items: string[];   // List of points
    };
    right: {
      label: string;     // "After" or "Us" or "Our Approach"
      items: string[];   // List of points
    };
  };

  timeline?: {
    steps: Array<{
      label: string;     // Step name
      description: string; // What happens
      duration?: string; // "Day 1" or "Week 1-2" etc
    }>;
  };
}

export interface Presentation {
  id: string;
  title: string;
  client_name: string | null;
  source_url: string;
  theme: Theme;
  slides: Slide[];
  share_token: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface CreatePresentationRequest {
  source_url: string;
  title: string;
  client_name?: string;
  theme: Theme;
}

export interface UpdatePresentationRequest {
  title?: string;
  client_name?: string;
  theme?: Theme;
  slides?: Slide[];
}
