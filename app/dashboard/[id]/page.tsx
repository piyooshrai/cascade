'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PresentationViewer from '@/components/PresentationViewer';
import type { Presentation } from '@/lib/types';

export default function PresentationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchPresentation();
  }, [params.id]);

  const fetchPresentation = async () => {
    try {
      const response = await fetch(`/api/presentations/${params.id}`);
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this presentation?')) {
      return;
    }

    try {
      const response = await fetch(`/api/presentations/${params.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete presentation');
      }

      router.push('/dashboard');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete presentation');
    }
  };

  const copyShareLink = () => {
    if (!presentation) return;

    const shareUrl = `${window.location.origin}/p/${presentation.share_token}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Dashboard
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={copyShareLink}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {copiedLink ? 'Link Copied!' : 'Copy Share Link'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Presentation Viewer */}
      <div className="pt-16">
        <PresentationViewer presentation={presentation} />
      </div>
    </div>
  );
}
