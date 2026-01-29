'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeSelector from '../ThemeSelector';
import type { Theme } from '@/lib/types';

export default function CreateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    source_url: '',
    title: '',
    client_name: '',
    theme: 'executive' as Theme
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/presentations/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          client_name: formData.client_name || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate presentation');
      }

      // Redirect to the presentation view
      router.push(`/dashboard/${data.presentation.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate presentation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="source_url" className="block text-sm font-medium mb-2 text-gray-300">
          Source URL *
        </label>
        <input
          type="url"
          id="source_url"
          required
          value={formData.source_url}
          onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
          placeholder="https://example.com/article"
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter the URL to scrape content from
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-300">
          Presentation Title *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Q4 Market Analysis"
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="client_name" className="block text-sm font-medium mb-2 text-gray-300">
          Client Name (Optional)
        </label>
        <input
          type="text"
          id="client_name"
          value={formData.client_name}
          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
          placeholder="Acme Corporation"
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">
          Personalize the presentation for a specific client
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4 text-gray-300">
          Theme *
        </label>
        <ThemeSelector
          selected={formData.theme}
          onSelect={(theme) => setFormData({ ...formData, theme })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating Presentation...
          </>
        ) : (
          'Generate Presentation'
        )}
      </button>
    </form>
  );
}
