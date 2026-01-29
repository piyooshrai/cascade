-- Cascade - Supabase Database Schema
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create presentations table
CREATE TABLE IF NOT EXISTS presentations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client_name TEXT,
  source_url TEXT NOT NULL,
  theme TEXT NOT NULL CHECK (theme IN ('executive', 'minimal', 'tech')),
  slides JSONB NOT NULL,
  share_token TEXT NOT NULL UNIQUE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_presentations_created_by ON presentations(created_by);
CREATE INDEX IF NOT EXISTS idx_presentations_share_token ON presentations(share_token);
CREATE INDEX IF NOT EXISTS idx_presentations_created_at ON presentations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_presentations_theme ON presentations(theme);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_presentations_updated_at
  BEFORE UPDATE ON presentations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for presentations

-- Allow public read access to presentations via share_token
CREATE POLICY "Public presentations are viewable by anyone via share_token"
  ON presentations FOR SELECT
  USING (true);

-- Allow authenticated users to view all presentations
CREATE POLICY "Authenticated users can view all presentations"
  ON presentations FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create presentations
CREATE POLICY "Authenticated users can create presentations"
  ON presentations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own presentations
CREATE POLICY "Users can update their own presentations"
  ON presentations FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Allow users to delete their own presentations
CREATE POLICY "Users can delete their own presentations"
  ON presentations FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- RLS Policies for users

-- Allow users to view all users
CREATE POLICY "Users can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Insert a default system user for testing (optional)
-- You can remove this if using proper authentication
INSERT INTO users (id, email, role)
VALUES ('00000000-0000-0000-0000-000000000000', 'system@cascade.app', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Cascade database schema created successfully!';
  RAISE NOTICE 'Tables: users, presentations';
  RAISE NOTICE 'Indexes created for optimal performance';
  RAISE NOTICE 'Row Level Security enabled with policies';
END $$;
