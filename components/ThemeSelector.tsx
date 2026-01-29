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
    description: 'Sophisticated gradients, serif aesthetic',
    preview: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    textColor: '#ffffff'
  },
  {
    id: 'minimal' as Theme,
    name: 'Minimal',
    description: 'Clean geometric shapes, monochrome',
    preview: '#ffffff',
    textColor: '#000000'
  },
  {
    id: 'tech' as Theme,
    name: 'Tech',
    description: 'Tech gradients, electric blue accents',
    preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    textColor: '#3b82f6'
  }
];

export default function ThemeSelector({ selected, onSelect }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
            selected === theme.id
              ? 'ring-4 ring-blue-500 shadow-xl shadow-blue-500/20'
              : 'ring-2 ring-gray-700 hover:ring-gray-600'
          }`}
        >
          <div
            className="h-48 flex items-center justify-center font-bold text-2xl"
            style={{
              background: theme.preview,
              color: theme.textColor
            }}
          >
            {theme.name}
          </div>
          <div className="bg-gray-900 p-4 text-left">
            <h3 className="font-semibold text-white mb-1">{theme.name}</h3>
            <p className="text-sm text-gray-400">{theme.description}</p>
          </div>
          {selected === theme.id && (
            <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
