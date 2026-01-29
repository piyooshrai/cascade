'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Presentation } from '@/lib/types';

interface PresentationListProps {
  initialPresentations?: Presentation[];
}

export default function PresentationList({ initialPresentations = [] }: PresentationListProps) {
  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations);
  const [loading, setLoading] = useState(!initialPresentations.length);
  const [error, setError] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  useEffect(() => {
    if (!initialPresentations.length) {
      fetchPresentations();
    }
  }, [initialPresentations.length]);

  const fetchPresentations = async () => {
    try {
      const response = await fetch('/api/presentations');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch presentations');
      }

      setPresentations(data.presentations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch presentations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this presentation?')) {
      return;
    }

    try {
      const response = await fetch(`/api/presentations/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete presentation');
      }

      setPresentations(presentations.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete presentation');
    }
  };

  const copyShareLink = (token: string) => {
    const shareUrl = `${window.location.origin}/p/${token}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getThemeBadgeColor = (theme: string) => {
    switch (theme) {
      case 'executive':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'minimal':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'tech':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading presentations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!presentations.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">No presentations yet</p>
        <Link
          href="/dashboard/new"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Create Your First Presentation
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Client</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Theme</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
            <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {presentations.map((presentation) => (
            <tr key={presentation.id} className="border-b border-gray-800 hover:bg-gray-900/50">
              <td className="py-4 px-4">
                <Link
                  href={`/dashboard/${presentation.id}`}
                  className="text-white hover:text-blue-400 font-medium"
                >
                  {presentation.title}
                </Link>
              </td>
              <td className="py-4 px-4 text-gray-400">
                {presentation.client_name || '-'}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getThemeBadgeColor(
                    presentation.theme
                  )}`}
                >
                  {presentation.theme}
                </span>
              </td>
              <td className="py-4 px-4 text-gray-400 text-sm">
                {formatDate(presentation.created_at)}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/dashboard/${presentation.id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => copyShareLink(presentation.share_token)}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    {copiedToken === presentation.share_token ? 'Copied!' : 'Share'}
                  </button>
                  <button
                    onClick={() => handleDelete(presentation.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
