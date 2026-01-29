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
    description: 'Sophisticated gradients, serif typography',
    preview: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    accent: '#8b5cf6',
    fontFamily: 'Crimson Pro, serif'
  },
  {
    id: 'minimal' as Theme,
    name: 'Minimal',
    description: 'Clean geometry, monochrome palette',
    preview: '#ffffff',
    accent: '#000000',
    fontFamily: 'IBM Plex Mono, monospace'
  },
  {
    id: 'tech' as Theme,
    name: 'Tech',
    description: 'Digital gradients, electric accents',
    preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    accent: '#3b82f6',
    fontFamily: 'IBM Plex Mono, monospace'
  }
];

export default function ThemeSelector({ selected, onSelect }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={`group relative border-2 transition-all duration-200 ${
            selected === theme.id
              ? 'border-[#3b82f6] shadow-lg shadow-[#3b82f6]/20'
              : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
          }`}
        >
          {/* Preview Area */}
          <div
            className="h-40 flex items-center justify-center relative overflow-hidden"
            style={{ background: theme.preview }}
          >
            <div
              className="text-xl font-semibold tracking-tight"
              style={{
                color: theme.id === 'minimal' ? '#000000' : '#ffffff',
                fontFamily: theme.fontFamily
              }}
            >
              {theme.name}
            </div>

            {/* Accent Line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: theme.accent }}
            />
          </div>

          {/* Info Area */}
          <div className="bg-[#141414] p-4 text-left">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-white text-sm">{theme.name}</h3>
              {selected === theme.id && (
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
              )}
            </div>
            <p className="text-xs text-gray-500">{theme.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
