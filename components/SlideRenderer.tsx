'use client';

import type { Slide, Theme } from '@/lib/types';

interface SlideRendererProps {
  slide: Slide;
  theme: Theme;
}

export default function SlideRenderer({ slide, theme }: SlideRendererProps) {
  // Title and closing slides
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
        {slide.image_url && (
          <img
            src={slide.image_url}
            alt={slide.title}
            className="slide-image"
          />
        )}
      </div>
    );
  }

  // Content slides with layout variations
  if (slide.type === 'content') {
    const layout = slide.layout || 'default';

    // Stat Callout Layout - Large number with context
    if (layout === 'stat_callout' && slide.stat) {
      return (
        <div className="slide-container-stat">
          <div className="slide-background" />
          <div className="slide-content-wrapper">
            <h2 className="slide-title-stat">{slide.title}</h2>
            <div className="stat-display">
              <div className="stat-value">{slide.stat.value}</div>
              <div className="stat-label">{slide.stat.label}</div>
              {slide.stat.context && (
                <div className="stat-context">{slide.stat.context}</div>
              )}
            </div>
          </div>
          {slide.image_url && (
            <div className="slide-background-image" style={{ backgroundImage: `url(${slide.image_url})` }} />
          )}
        </div>
      );
    }

    // Quote Layout - Testimonial or key quote
    if (layout === 'quote' && slide.quote) {
      return (
        <div className="slide-container-quote">
          <div className="slide-background" />
          <div className="slide-content-wrapper">
            <h2 className="slide-title-quote">{slide.title}</h2>
            <div className="quote-display">
              <div className="quote-mark">"</div>
              <div className="quote-text">{slide.quote.text}</div>
              <div className="quote-attribution">
                <div className="quote-author">{slide.quote.author}</div>
                {slide.quote.role && (
                  <div className="quote-role">{slide.quote.role}</div>
                )}
              </div>
            </div>
          </div>
          {slide.image_url && (
            <div className="slide-background-image" style={{ backgroundImage: `url(${slide.image_url})` }} />
          )}
        </div>
      );
    }

    // Statement Layout - Single powerful sentence
    if (layout === 'statement' && slide.statement) {
      return (
        <div className="slide-container-statement">
          <div className="slide-background" />
          {slide.image_url && (
            <div className="slide-background-image" style={{ backgroundImage: `url(${slide.image_url})` }} />
          )}
          <div className="slide-content-wrapper">
            <div className="statement-text">
              {slide.statement.emphasis ? (
                <>
                  <span className="statement-emphasis">{slide.statement.emphasis}</span>
                  {' '}
                  {slide.statement.text.replace(slide.statement.emphasis, '').trim()}
                </>
              ) : (
                slide.statement.text
              )}
            </div>
          </div>
        </div>
      );
    }

    // Comparison Layout - Two-column before/after or us vs them
    if (layout === 'comparison' && slide.comparison) {
      return (
        <div className="slide-container-comparison">
          <div className="slide-background" />
          <div className="slide-content-wrapper">
            <h2 className="slide-title-comparison">{slide.title}</h2>
            <div className="comparison-grid">
              <div className="comparison-column comparison-left">
                <div className="comparison-label">{slide.comparison.left.label}</div>
                <div className="comparison-items">
                  {slide.comparison.left.items.map((item, index) => (
                    <div key={index} className="comparison-item">{item}</div>
                  ))}
                </div>
              </div>
              <div className="comparison-divider" />
              <div className="comparison-column comparison-right">
                <div className="comparison-label">{slide.comparison.right.label}</div>
                <div className="comparison-items">
                  {slide.comparison.right.items.map((item, index) => (
                    <div key={index} className="comparison-item">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Timeline Layout - Horizontal progression
    if (layout === 'timeline' && slide.timeline) {
      const timelineSteps = slide.timeline.steps;
      return (
        <div className="slide-container-timeline">
          <div className="slide-background" />
          <div className="slide-content-wrapper">
            <h2 className="slide-title-timeline">{slide.title}</h2>
            <div className="timeline-display">
              {timelineSteps.map((step, index) => (
                <div key={index} className="timeline-step">
                  <div className="timeline-number">{index + 1}</div>
                  <div className="timeline-content">
                    <div className="timeline-label">{step.label}</div>
                    <div className="timeline-description">{step.description}</div>
                    {step.duration && (
                      <div className="timeline-duration">{step.duration}</div>
                    )}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="timeline-connector" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Image Full Layout - Full-bleed image with overlay text
    if (layout === 'image_full' && slide.image_url) {
      return (
        <div className="slide-container-image-full">
          <div className="slide-background-image-full" style={{ backgroundImage: `url(${slide.image_url})` }} />
          <div className="slide-overlay" />
          <div className="slide-content-wrapper">
            <h2 className="slide-title-image-full">{slide.title}</h2>
            {slide.subtitle && (
              <p className="slide-subtitle-image-full">{slide.subtitle}</p>
            )}
          </div>
        </div>
      );
    }

    // Default Layout - Standard title + bullet points
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
