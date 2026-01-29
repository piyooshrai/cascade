'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PresentationViewer from '@/components/PresentationViewer';
import type { Presentation } from '@/lib/types';

export default function PublicPresentationPage() {
  const params = useParams();
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPresentation();
  }, [params.token]);

  const fetchPresentation = async () => {
    try {
      const response = await fetch(`/api/presentations/share/${params.token}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch presentation');
      }

      setPresentation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch presentation');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Loading presentation...</div>
      </div>
    );
  }

  if (error || !presentation) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Presentation not found'}</p>
          <p className="text-gray-500 text-sm">
            This presentation may have been removed or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <PresentationViewer presentation={presentation} />

      {/* Footer */}
      <div className="fixed bottom-4 left-4 z-50 text-xs text-gray-500">
        Powered by Cascade at The Algorithm
      </div>
    </div>
  );
}
