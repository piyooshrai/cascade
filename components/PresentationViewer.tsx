'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Presentation } from '@/lib/types';
import SlideRenderer from './SlideRenderer';

interface PresentationViewerProps {
  presentation: Presentation;
  showControls?: boolean;
}

export default function PresentationViewer({
  presentation,
  showControls = true
}: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = presentation.slides.length;

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPreviousSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if (e.key >= '1' && e.key <= '9') {
        const slideNum = parseInt(e.key) - 1;
        if (slideNum < totalSlides) {
          goToSlide(slideNum);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPreviousSlide, goToSlide, totalSlides]);

  const themeClass = `theme-${presentation.theme}`;

  return (
    <div className={`w-full h-screen ${themeClass} relative overflow-hidden`}>
      {/* Slide Content */}
      <div className="w-full h-full" key={currentSlide}>
        <SlideRenderer
          slide={presentation.slides[currentSlide]}
          theme={presentation.theme}
        />
      </div>

      {/* Client Badge */}
      {presentation.client_name && showControls && (
        <div className="client-badge">
          Prepared for: {presentation.client_name}
        </div>
      )}

      {/* Slide Counter */}
      {showControls && (
        <div className="slide-counter">
          {currentSlide + 1} / {totalSlides}
        </div>
      )}

      {/* Navigation Hint */}
      {showControls && currentSlide === 0 && (
        <div className="nav-hint">
          Use arrow keys or click to navigate • ESC to exit
        </div>
      )}

      {/* Click Areas for Navigation */}
      <div className="absolute inset-0 flex pointer-events-none">
        <button
          onClick={goToPreviousSlide}
          className="flex-1 pointer-events-auto cursor-pointer opacity-0 hover:opacity-10 transition-opacity"
          aria-label="Previous slide"
          disabled={currentSlide === 0}
        />
        <button
          onClick={goToNextSlide}
          className="flex-1 pointer-events-auto cursor-pointer opacity-0 hover:opacity-10 transition-opacity"
          aria-label="Next slide"
          disabled={currentSlide === totalSlides - 1}
        />
      </div>
    </div>
  );
}
