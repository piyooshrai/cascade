'use client';

import type { Slide, Theme } from '@/lib/types';

interface SlideRendererProps {
  slide: Slide;
  theme: Theme;
}

export default function SlideRenderer({ slide, theme }: SlideRendererProps) {
  if (slide.type === 'title' || slide.type === 'closing') {
    return (
      <div className="slide-container-title">
        <div className="slide-background" />
        <div className="slide-content-wrapper">
          <h1 className="slide-title">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="slide-subtitle">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (slide.type === 'content') {
    return (
      <div className="slide-container-content">
        <div className="slide-background" />
        <div className="slide-content-wrapper">
          <h2 className="slide-title">
            {slide.title}
          </h2>
          <div className="slide-content">
            {slide.points?.map((point, index) => (
              <div key={index} className="bullet-point">
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
