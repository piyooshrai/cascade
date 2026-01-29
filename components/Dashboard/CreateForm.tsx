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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

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

      setSuccess(true);

      // Redirect to the presentation view after a brief moment
      setTimeout(() => {
        router.push(`/dashboard/${data.presentation.id}`);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate presentation');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.source_url && formData.title && formData.theme;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-5 py-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-[#10b981]/10 border border-[#10b981] text-[#10b981] px-5 py-4 rounded-lg text-sm animate-in fade-in duration-300">
          Presentation generated successfully! Redirecting...
        </div>
      )}

      <div className="space-y-3">
        <label htmlFor="source_url" className="block text-sm font-medium text-[#a0a0a0] uppercase tracking-wider">
          Source URL
        </label>
        <input
          type="url"
          id="source_url"
          required
          value={formData.source_url}
          onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
          placeholder="https://example.com/article"
          className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 text-white transition-all"
          disabled={loading}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="title" className="block text-sm font-medium text-[#a0a0a0] uppercase tracking-wider">
          Presentation Title
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter presentation title"
          className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 text-white transition-all"
          disabled={loading}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="client_name" className="block text-sm font-medium text-[#a0a0a0] uppercase tracking-wider">
          Client Name (Optional)
        </label>
        <input
          type="text"
          id="client_name"
          value={formData.client_name}
          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
          placeholder="e.g., Acme Corporation"
          className="w-full px-5 py-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 text-white transition-all"
          disabled={loading}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#a0a0a0] uppercase tracking-wider">
          Select Theme
        </label>
        <ThemeSelector
          selected={formData.theme}
          onSelect={(theme) => setFormData({ ...formData, theme })}
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/30 uppercase tracking-wider text-sm flex items-center justify-center"
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
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating...
            </>
          ) : (
            'Generate Presentation'
          )}
        </button>
      </div>
    </form>
  );
}
