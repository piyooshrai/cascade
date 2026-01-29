import type { Slide, Theme, UserRole } from './types';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      presentations: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          client_name?: string | null;
          source_url: string;
          theme: Theme;
          slides: Slide[];
          share_token: string;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          client_name?: string | null;
          source_url?: string;
          theme?: Theme;
          slides?: Slide[];
          share_token?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: UserRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: UserRole;
          created_at?: string;
        };
      };
    };
  };
}
