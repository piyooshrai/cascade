import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import type { UpdatePresentationRequest } from '@/lib/types';

// GET - Get presentation by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = getServerSupabase();
    const { data: presentation, error } = await supabase
      .from('presentations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !presentation) {
      return NextResponse.json(
        { error: 'Presentation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(presentation);
  } catch (error) {
    console.error('Error fetching presentation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch presentation' },
      { status: 500 }
    );
  }
}

// PUT - Update presentation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdatePresentationRequest = await request.json();

    const supabase = getServerSupabase();

    // Build update object
    const updateData = {
      updated_at: new Date().toISOString(),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.client_name !== undefined && { client_name: body.client_name }),
      ...(body.theme !== undefined && { theme: body.theme }),
      ...(body.slides !== undefined && { slides: body.slides }),
    };

    const { data: presentation, error } = await supabase
      .from('presentations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update presentation' },
        { status: 500 }
      );
    }

    return NextResponse.json(presentation);
  } catch (error) {
    console.error('Error updating presentation:', error);
    return NextResponse.json(
      { error: 'Failed to update presentation' },
      { status: 500 }
    );
  }
}

// DELETE - Delete presentation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = getServerSupabase();
    const { error } = await supabase
      .from('presentations')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete presentation' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting presentation:', error);
    return NextResponse.json(
      { error: 'Failed to delete presentation' },
      { status: 500 }
    );
  }
}
