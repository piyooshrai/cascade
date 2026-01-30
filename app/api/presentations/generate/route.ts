import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getServerSupabase } from '@/lib/supabase';
import { scrapeURL } from '@/lib/scraper';
import { generateSlides } from '@/lib/anthropic';
import type { CreatePresentationRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreatePresentationRequest = await request.json();
    const { source_url, title, client_name, theme } = body;

    // Validate input
    if (!source_url || !title || !theme) {
      return NextResponse.json(
        { error: 'Missing required fields: source_url, title, theme' },
        { status: 400 }
      );
    }

    if (!['executive', 'minimal', 'tech'].includes(theme)) {
      return NextResponse.json(
        { error: 'Invalid theme. Must be: executive, minimal, or tech' },
        { status: 400 }
      );
    }

    // Step 1: Scrape URL content
    console.log(`Scraping URL: ${source_url}`);
    const scrapedContent = await scrapeURL(source_url);

    // Step 2: Generate slides with AI
    console.log(`Generating slides with AI for theme: ${theme}...`);
    const slides = await generateSlides(
      scrapedContent.content,
      title,
      client_name || null,
      theme
    );
    console.log(`Successfully generated ${slides.length} slides`);

    // Step 3: Generate unique share token
    const shareToken = uuidv4();

    // Step 4: Get user ID from auth (or use a default for now)
    // TODO: Implement proper authentication
    const userId = '00000000-0000-0000-0000-000000000000'; // Placeholder

    // Step 5: Save to database
    console.log(`Saving presentation to database with theme: ${theme}`);
    const supabase = getServerSupabase();
    const { data: presentation, error } = await supabase
      .from('presentations')
      .insert({
        title,
        client_name: client_name || null,
        source_url,
        theme,
        slides,
        share_token: shareToken,
        created_by: userId
      })
      .select()
      .single();

    if (presentation) {
      console.log(`Successfully saved presentation with ID: ${presentation.id}`);
    }

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        {
          error: 'Failed to save presentation to database',
          details: error.message,
          code: error.code,
          hint: error.hint
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      presentation
    });
  } catch (error) {
    console.error('Error generating presentation:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate presentation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
