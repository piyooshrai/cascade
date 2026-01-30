'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        {/* Main Heading */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/logo.png"
            alt="Cascade"
            width={360}
            height={90}
            priority
          />
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(24px, 3vw, 36px)',
          color: '#a0a0a0',
          marginBottom: '24px',
          fontWeight: 500
        }}>
          Presentation Platform
        </p>

        {/* Description */}
        <p style={{
          fontSize: '18px',
          color: '#ffffff',
          marginBottom: '16px',
          maxWidth: '700px',
          margin: '0 auto 16px',
          lineHeight: 1.7
        }}>
          Generate professional presentations from any URL in seconds.
        </p>
        <p style={{
          fontSize: '18px',
          color: '#707070',
          marginBottom: '48px',
          maxWidth: '700px',
          margin: '0 auto 48px',
          lineHeight: 1.7,
          fontWeight: 500
        }}>
          No PowerPoint. No templates. Just results.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          justifyContent: 'center',
          marginBottom: '80px',
          flexWrap: 'wrap'
        }}>
          <Link
            href="/dashboard"
            style={{
              padding: '16px 32px',
              background: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/new"
            style={{
              padding: '16px 32px',
              background: '#141414',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              border: '1px solid #2a2a2a',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a1a1a';
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#141414';
              e.currentTarget.style.borderColor = '#2a2a2a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Create
          </Link>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '80px'
        }}>
          <div style={{
            background: '#141414',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '32px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = '#3b82f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#2a2a2a';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '12px',
              color: '#ffffff'
            }}>
              Three Professional Themes
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#a0a0a0',
              lineHeight: 1.6
            }}>
              Executive, Minimal, and Tech aesthetics. Built for boardrooms, not pitch decks.
            </p>
          </div>

          <div style={{
            background: '#141414',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '32px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = '#3b82f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#2a2a2a';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '12px',
              color: '#ffffff'
            }}>
              URL to Slides
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#a0a0a0',
              lineHeight: 1.6
            }}>
              Source content from anywhere. Structured automatically. Ready to present.
            </p>
          </div>

          <div style={{
            background: '#141414',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '32px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = '#3b82f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#2a2a2a';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '12px',
              color: '#ffffff'
            }}>
              Instant Sharing
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#a0a0a0',
              lineHeight: 1.6
            }}>
              Unique public links. No login required. Send and present.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '80px',
          fontSize: '13px',
          color: '#707070'
        }}>
          Built by The Algorithm
        </div>
      </div>
    </div>
  );
}
