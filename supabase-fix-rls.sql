-- Fix RLS policies to allow anonymous presentation creation
-- Run this in your Supabase SQL Editor
-- This script is idempotent - safe to run multiple times

-- Drop ALL existing policies on presentations table
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'presentations') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON presentations';
    END LOOP;
END $$;

-- Create new permissive policies for anonymous access

-- Allow anyone to view presentations
CREATE POLICY "Anyone can view presentations"
  ON presentations FOR SELECT
  USING (true);

-- Allow anyone to create presentations
CREATE POLICY "Anyone can create presentations"
  ON presentations FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update presentations
CREATE POLICY "Anyone can update presentations"
  ON presentations FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete presentations
CREATE POLICY "Anyone can delete presentations"
  ON presentations FOR DELETE
  USING (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✓ RLS policies updated successfully!';
  RAISE NOTICE '✓ Anonymous users can now create, read, update, and delete presentations';
END $$;
