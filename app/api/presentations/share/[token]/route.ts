import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';

// GET - Get presentation by share token (public access)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const supabase = getServerSupabase();
    const { data: presentation, error } = await supabase
      .from('presentations')
      .select('*')
      .eq('share_token', token)
      .single();

    if (error || !presentation) {
      return NextResponse.json(
        { error: 'Presentation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(presentation);
  } catch (error) {
    console.error('Error fetching shared presentation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch presentation' },
      { status: 500 }
    );
  }
}
