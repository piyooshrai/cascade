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

      router.push(`/dashboard/${data.presentation.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate presentation');
    } finally {
      setLoading(false);
    }
  };

  const isValid = formData.source_url && formData.title && formData.theme;

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgb(239, 68, 68)',
          borderRadius: '8px',
          padding: '16px 20px',
          marginBottom: '20px',
          color: 'rgb(239, 68, 68)',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {/* SOURCE URL */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{
          display: 'block',
          marginBottom: '12px',
          fontWeight: 500,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#a0a0a0'
        }}>
          SOURCE URL
        </label>
        <input
          type="url"
          id="sourceUrl"
          required
          value={formData.source_url}
          onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
          placeholder="https://example.com/article"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px 20px',
            background: '#0a0a0a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '16px',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#2a2a2a';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* PRESENTATION TITLE */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{
          display: 'block',
          marginBottom: '12px',
          fontWeight: 500,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#a0a0a0'
        }}>
          PRESENTATION TITLE
        </label>
        <input
          type="text"
          id="presentationTitle"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter presentation title"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px 20px',
            background: '#0a0a0a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '16px',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#2a2a2a';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* CLIENT NAME (OPTIONAL) */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{
          display: 'block',
          marginBottom: '12px',
          fontWeight: 500,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#a0a0a0'
        }}>
          CLIENT NAME (OPTIONAL)
        </label>
        <input
          type="text"
          id="clientName"
          value={formData.client_name}
          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
          placeholder="e.g., Acme Corporation"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px 20px',
            background: '#0a0a0a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '16px',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#2a2a2a';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* SELECT THEME */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{
          display: 'block',
          marginBottom: '12px',
          fontWeight: 500,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#a0a0a0'
        }}>
          SELECT THEME
        </label>
        <ThemeSelector
          selected={formData.theme}
          onSelect={(theme) => setFormData({ ...formData, theme })}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <div style={{ marginTop: '40px' }}>
        <button
          type="submit"
          disabled={!isValid || loading}
          style={{
            padding: '16px 32px',
            background: isValid && !loading ? '#3b82f6' : '#4a5568',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: isValid && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            fontFamily: "'DM Sans', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            opacity: isValid && !loading ? 1 : 0.5
          }}
          onMouseEnter={(e) => {
            if (isValid && !loading) {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (isValid && !loading) {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {loading ? 'GENERATING...' : 'GENERATE PRESENTATION'}
        </button>
      </div>
    </form>
  );
}
