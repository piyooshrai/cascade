export type SlideType = 'title' | 'content' | 'closing';

export type Theme = 'executive' | 'minimal' | 'tech';

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface Slide {
  type: SlideType;
  title: string;
  subtitle?: string;
  points?: string[];
  image_url?: string;
  image_prompt?: string;
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
