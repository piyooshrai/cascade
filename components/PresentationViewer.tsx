'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  // Keyboard navigation
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

  // Touch/swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next slide
        goToNextSlide();
      } else {
        // Swiped right - previous slide
        goToPreviousSlide();
      }
    }
  };

  const themeClass = `theme-${presentation.theme}`;

  return (
    <div
      className={`presentation-viewer ${themeClass}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Content */}
      <div className="presentation-slide" key={currentSlide}>
        <SlideRenderer
          slide={presentation.slides[currentSlide]}
          theme={presentation.theme}
        />

        {/* Client Badge - inside slide content area */}
        {presentation.client_name && showControls && (
          <div className="client-badge">
            FOR {presentation.client_name.toUpperCase()}
          </div>
        )}

        {/* Slide Counter - inside slide content area */}
        {showControls && (
          <div className="slide-counter">
            {currentSlide + 1} / {totalSlides}
          </div>
        )}
      </div>

      {/* Navigation Hint */}
      {showControls && currentSlide === 0 && (
        <div className="nav-hint">
          Swipe or tap edges to navigate
        </div>
      )}

      {/* Click/Tap Areas for Navigation */}
      <div className="presentation-nav-areas">
        <button
          onClick={goToPreviousSlide}
          className="presentation-nav-prev"
          aria-label="Previous slide"
          disabled={currentSlide === 0}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            width: '20%',
            background: 'transparent',
            border: 'none',
            cursor: currentSlide === 0 ? 'default' : 'pointer',
            zIndex: 50,
            opacity: 0
          }}
        />
        <button
          onClick={goToNextSlide}
          className="presentation-nav-next"
          aria-label="Next slide"
          disabled={currentSlide === totalSlides - 1}
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            width: '20%',
            background: 'transparent',
            border: 'none',
            cursor: currentSlide === totalSlides - 1 ? 'default' : 'pointer',
            zIndex: 50,
            opacity: 0
          }}
        />
      </div>
    </div>
  );
}
