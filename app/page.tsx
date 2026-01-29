'use client';

import Link from 'next/link';

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
        <h1 style={{
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 700,
          marginBottom: '24px',
          letterSpacing: '-2px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Cascade
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(24px, 3vw, 36px)',
          color: '#a0a0a0',
          marginBottom: '48px',
          fontWeight: 500
        }}>
          AI-Powered Presentation Platform
        </p>

        {/* Description */}
        <p style={{
          fontSize: '18px',
          color: '#707070',
          marginBottom: '48px',
          maxWidth: '600px',
          margin: '0 auto 48px',
          lineHeight: 1.6
        }}>
          Generate beautiful, personalized presentations from any URL.
          Powered by Claude AI.
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
            Go to Dashboard
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
            Create Presentation
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
              Three Themes
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#a0a0a0',
              lineHeight: 1.6
            }}>
              Executive, Minimal, and Tech themes with stunning animations
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
              AI-Powered
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#a0a0a0',
              lineHeight: 1.6
            }}>
              Claude AI generates coherent, business-focused content
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
              Easy Sharing
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#a0a0a0',
              lineHeight: 1.6
            }}>
              Share presentations with unique public links
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '80px',
          fontSize: '13px',
          color: '#707070'
        }}>
          Built with Next.js, Supabase, and Anthropic Claude
        </div>
      </div>
    </div>
  );
}
