'use client';

import Link from 'next/link';
import Image from 'next/image';
import PresentationList from '@/components/Dashboard/PresentationList';

export default function DashboardPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #2a2a2a', padding: '30px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Image
              src="/logo.png"
              alt="Cascade"
              width={180}
              height={45}
              style={{ display: 'block' }}
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#ffffff',
              letterSpacing: '-0.5px'
            }}>
              Dashboard
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#a0a0a0'
            }}>
              Manage your presentations
            </p>
          </div>
          <Link
            href="/dashboard/new"
            style={{
              padding: '14px 28px',
              background: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '15px',
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
            + Create New
          </Link>
        </div>

        <div style={{
          background: '#141414',
          borderRadius: '12px',
          border: '1px solid #2a2a2a',
          overflow: 'hidden'
        }}>
          <PresentationList />
        </div>
      </div>
    </div>
  );
}
