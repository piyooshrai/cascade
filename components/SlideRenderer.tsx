'use client';

import type { Slide, Theme } from '@/lib/types';

interface SlideRendererProps {
  slide: Slide;
  theme: Theme;
}

export default function SlideRenderer({ slide, theme }: SlideRendererProps) {
  if (slide.type === 'title' || slide.type === 'closing') {
    return (
      <div className="flex flex-col items-center justify-center h-full relative">
        <div className="slide-background" />
        <div className="relative z-10 text-center max-w-4xl px-8">
          <h1 className="slide-title text-6xl md:text-8xl font-bold mb-6">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="slide-subtitle text-2xl md:text-3xl opacity-80">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (slide.type === 'content') {
    return (
      <div className="flex flex-col h-full relative px-16 py-12">
        <div className="slide-background" />
        <div className="relative z-10">
          <h2 className="slide-title text-4xl md:text-5xl font-bold mb-12">
            {slide.title}
          </h2>
          <div className="slide-content space-y-4">
            {slide.points?.map((point, index) => (
              <div key={index} className="bullet-point text-xl md:text-2xl">
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
