'use client';

import type { Theme } from '@/lib/types';

interface ThemeSelectorProps {
  selected: Theme;
  onSelect: (theme: Theme) => void;
}

const themes = [
  {
    id: 'executive' as Theme,
    name: 'Executive',
    description: 'Classic serif typography with sophisticated gradients. Perfect for board presentations and investor decks.',
    preview: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    previewText: '#ffffff',
    previewFont: "'Crimson Pro', serif",
    accentColor: '#3b82f6'
  },
  {
    id: 'minimal' as Theme,
    name: 'Minimal',
    description: 'Clean monospace on pure white. Precision and clarity for technical documentation and product demos.',
    preview: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
    previewText: '#000000',
    previewFont: "'IBM Plex Mono', monospace",
    accentColor: '#000000'
  },
  {
    id: 'tech' as Theme,
    name: 'Tech',
    description: 'Dark gradients with electric blue accents. Built for platform showcases and developer audiences.',
    preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    previewText: '#3b82f6',
    previewFont: "'IBM Plex Mono', monospace",
    accentColor: '#3b82f6'
  }
];

export default function ThemeSelector({ selected, onSelect }: ThemeSelectorProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      marginTop: '30px'
    }}>
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          style={{
            background: '#0a0a0a',
            border: `2px solid ${selected === theme.id ? '#3b82f6' : '#2a2a2a'}`,
            borderRadius: '12px',
            padding: 0,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: selected === theme.id ? '0 0 0 3px rgba(59, 130, 246, 0.2)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (selected !== theme.id) {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (selected !== theme.id) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {/* Preview Area */}
          <div style={{
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: theme.preview
          }}>
            {/* Mini Slide Preview */}
            <div style={{
              width: '80%',
              height: '70%',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              fontSize: '10px',
              border: theme.id === 'minimal' ? '1px solid #e5e5e5' : theme.id === 'executive' ? '1px solid #3a3a3a' : '1px solid #334155',
              background: theme.id === 'minimal' ? '#ffffff' : theme.preview
            }}>
              <div style={{
                fontWeight: 600,
                marginBottom: '8px',
                fontFamily: theme.previewFont,
                fontSize: theme.id === 'minimal' ? '12px' : '14px',
                color: theme.previewText
              }}>
                {theme.name}
              </div>
              <div style={{
                width: '60%',
                height: '2px',
                margin: '4px 0',
                opacity: 0.4,
                background: theme.accentColor
              }} />
              <div style={{
                width: '40%',
                height: '2px',
                opacity: 0.4,
                background: theme.accentColor
              }} />
            </div>
          </div>

          {/* Info Area */}
          <div style={{
            padding: '24px',
            background: '#0a0a0a'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#ffffff'
            }}>
              {theme.name}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#a0a0a0',
              lineHeight: 1.5
            }}>
              {theme.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
