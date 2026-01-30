'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeSelector from '../ThemeSelector';
import type { Theme } from '@/lib/types';

type PresentationType =
  | 'sales_pitch'
  | 'roi_case'
  | 'demo'
  | 'problem_solution'
  | 'competitive'
  | 'executive_briefing';

export default function CreateForm() {
  const router = useRouter();
  const [presentationType, setPresentationType] = useState<PresentationType | null>(null);
  const [formData, setFormData] = useState({
    source_url: '',
    additional_urls: [] as string[],
    title: '',
    client_name: '',
    theme: 'executive' as Theme,
    discovery_notes: '',
    budget_range: '',
    timeline: '',
    audience_type: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      setFormData({
        ...formData,
        additional_urls: [...formData.additional_urls, urlInput.trim()]
      });
      setUrlInput('');
    }
  };

  const handleRemoveUrl = (index: number) => {
    setFormData({
      ...formData,
      additional_urls: formData.additional_urls.filter((_, i) => i !== index)
    });
  };

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
          source_url: formData.source_url,
          title: formData.title,
          theme: formData.theme,
          client_name: formData.client_name || undefined,
          presentation_type: presentationType,
          additional_context: {
            additional_urls: formData.additional_urls,
            discovery_notes: formData.discovery_notes || undefined,
            budget_range: formData.budget_range || undefined,
            timeline: formData.timeline || undefined,
            audience_type: formData.audience_type || undefined
          }
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

  const isValid = presentationType && formData.source_url && formData.title && formData.theme;

  const presentationTypes = [
    {
      id: 'sales_pitch' as PresentationType,
      label: 'Sales Pitch',
      description: 'Convince prospects to buy',
      icon: '💰'
    },
    {
      id: 'roi_case' as PresentationType,
      label: 'ROI Case',
      description: 'Business case with numbers',
      icon: '📊'
    },
    {
      id: 'demo' as PresentationType,
      label: 'Product Demo',
      description: 'Show how it works',
      icon: '🎯'
    },
    {
      id: 'problem_solution' as PresentationType,
      label: 'Problem → Solution',
      description: 'Address pain points',
      icon: '🔧'
    },
    {
      id: 'competitive' as PresentationType,
      label: 'Competitive Analysis',
      description: 'Why choose us over them',
      icon: '⚔️'
    },
    {
      id: 'executive_briefing' as PresentationType,
      label: 'Executive Briefing',
      description: 'High-level strategic overview',
      icon: '👔'
    }
  ];

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

      {/* PRESENTATION TYPE SELECTION */}
      <div style={{ marginBottom: '40px' }}>
        <label style={{
          display: 'block',
          marginBottom: '20px',
          fontWeight: 500,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#a0a0a0'
        }}>
          PRESENTATION TYPE
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {presentationTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setPresentationType(type.id)}
              disabled={loading}
              style={{
                padding: '20px',
                background: presentationType === type.id ? '#3b82f6' : '#0a0a0a',
                border: presentationType === type.id ? '2px solid #3b82f6' : '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#ffffff',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (!loading && presentationType !== type.id) {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && presentationType !== type.id) {
                  e.currentTarget.style.borderColor = '#2a2a2a';
                  e.currentTarget.style.background = '#0a0a0a';
                }
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{type.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '16px' }}>
                {type.label}
              </div>
              <div style={{ fontSize: '13px', opacity: 0.7, lineHeight: '1.4' }}>
                {type.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* PROGRESSIVE DISCLOSURE - Only show form fields after type is selected */}
      {presentationType && (
        <>
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

      {/* ADDITIONAL URLs - Show for competitive and ROI presentations */}
          {(presentationType === 'competitive' || presentationType === 'roi_case') && (
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
                ADDITIONAL URLS (OPTIONAL)
                <span style={{ fontSize: '12px', textTransform: 'none', marginLeft: '8px', opacity: 0.7 }}>
                  {presentationType === 'competitive' ? 'Competitor sites, industry reports' : 'Case studies, ROI calculators'}
                </span>
              </label>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://competitor.com or https://case-study.com"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: '#0a0a0a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  disabled={!urlInput.trim() || loading}
                  style={{
                    padding: '12px 24px',
                    background: urlInput.trim() ? '#10b981' : '#4a5568',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: urlInput.trim() ? 'pointer' : 'not-allowed',
                    whiteSpace: 'nowrap'
                  }}
                >
                  + Add URL
                </button>
              </div>
              {formData.additional_urls.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {formData.additional_urls.map((url, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        fontSize: '13px'
                      }}
                    >
                      <span style={{ color: '#3b82f6', wordBreak: 'break-all' }}>{url}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveUrl(index)}
                        disabled={loading}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '16px',
                          padding: '0 8px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DISCOVERY NOTES - Show for sales pitch, problem-solution */}
          {(presentationType === 'sales_pitch' || presentationType === 'problem_solution') && (
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
                DISCOVERY NOTES (OPTIONAL)
                <span style={{ fontSize: '12px', textTransform: 'none', marginLeft: '8px', opacity: 0.7 }}>
                  Pain points, goals, constraints
                </span>
              </label>
              <textarea
                value={formData.discovery_notes}
                onChange={(e) => setFormData({ ...formData, discovery_notes: e.target.value })}
                placeholder="What problems are they facing? What are their goals? Any constraints or requirements?"
                disabled={loading}
                rows={4}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: '#0a0a0a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                  resize: 'vertical'
                }}
              />
            </div>
          )}

          {/* BUDGET & TIMELINE - Show for ROI case */}
          {presentationType === 'roi_case' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: 500,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#a0a0a0'
                }}>
                  BUDGET RANGE (OPTIONAL)
                </label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: '#0a0a0a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  <option value="">Select budget range</option>
                  <option value="under_50k">Under $50K</option>
                  <option value="50k_100k">$50K - $100K</option>
                  <option value="100k_250k">$100K - $250K</option>
                  <option value="250k_500k">$250K - $500K</option>
                  <option value="500k_1m">$500K - $1M</option>
                  <option value="over_1m">Over $1M</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: 500,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#a0a0a0'
                }}>
                  TIMELINE (OPTIONAL)
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: '#0a0a0a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (This month)</option>
                  <option value="q1">Q1</option>
                  <option value="q2">Q2</option>
                  <option value="q3">Q3</option>
                  <option value="q4">Q4</option>
                  <option value="next_year">Next year</option>
                </select>
              </div>
            </div>
          )}

          {/* AUDIENCE TYPE - Show for executive briefing */}
          {presentationType === 'executive_briefing' && (
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
                AUDIENCE TYPE (OPTIONAL)
              </label>
              <select
                value={formData.audience_type}
                onChange={(e) => setFormData({ ...formData, audience_type: e.target.value })}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: '#0a0a0a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                <option value="">Select audience type</option>
                <option value="c_suite">C-Suite (CEO, CFO, CTO)</option>
                <option value="vp_directors">VP / Directors</option>
                <option value="managers">Managers</option>
                <option value="technical">Technical Team</option>
                <option value="board">Board of Directors</option>
                <option value="investors">Investors</option>
              </select>
            </div>
          )}

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
        </>
      )}

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
