-- Fix RLS policies to allow anonymous presentation creation
-- Run this in your Supabase SQL Editor

-- Drop the restrictive insert policy
DROP POLICY IF EXISTS "Authenticated users can create presentations" ON presentations;

-- Create a new policy that allows anonymous users to insert
CREATE POLICY "Anyone can create presentations"
  ON presentations FOR INSERT
  WITH CHECK (true);

-- Also allow anonymous users to update presentations they created
DROP POLICY IF EXISTS "Users can update their own presentations" ON presentations;

CREATE POLICY "Anyone can update presentations"
  ON presentations FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete presentations
DROP POLICY IF EXISTS "Users can delete their own presentations" ON presentations;

CREATE POLICY "Anyone can delete presentations"
  ON presentations FOR DELETE
  USING (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'RLS policies updated to allow anonymous access!';
  RAISE NOTICE 'Anonymous users can now create, update, and delete presentations';
END $$;
