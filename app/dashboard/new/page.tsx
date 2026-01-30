import Link from 'next/link';
import Image from 'next/image';
import CreateForm from '@/components/Dashboard/CreateForm';

export default function NewPresentationPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #2a2a2a', padding: '30px 0', marginBottom: '60px' }}>
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
          background: '#141414',
          border: '1px solid #2a2a2a',
          borderRadius: '12px',
          padding: '40px',
          transition: 'all 0.3s ease'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '20px',
            letterSpacing: '-0.5px',
            color: '#ffffff'
          }}>
            Create Presentation
          </h2>
          <CreateForm />
        </div>
      </div>
    </div>
  );
}
