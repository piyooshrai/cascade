import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-mono text-lg">
            the<span className="text-[#3b82f6]">Algorithm</span>
          </div>
          <Link
            href="/dashboard"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Dashboard →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="py-32 text-center">
          <h1 className="text-8xl font-bold mb-8 tracking-tight">
            Cascade
          </h1>
          <p className="text-2xl text-gray-400 mb-4 font-light">
            AI-Powered Presentation Platform
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mb-12">
            Generate professional presentations from any URL using Claude AI.
            Structured content, personalized messaging, three distinctive themes.
          </p>

          <div className="flex gap-4 justify-center mb-32">
            <Link
              href="/dashboard/new"
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3 rounded font-medium transition-colors"
            >
              Create Presentation
            </Link>
            <Link
              href="/dashboard"
              className="bg-[#141414] hover:bg-[#1f1f1f] text-white px-8 py-3 rounded border border-[#2a2a2a] font-medium transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-px bg-[#2a2a2a] border border-[#2a2a2a] mb-32">
          <div className="bg-[#0a0a0a] p-12">
            <div className="text-sm text-gray-500 uppercase tracking-wider mb-4 font-mono">
              01
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Three Professional Themes
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Executive, Minimal, and Tech themes with sophisticated animations
              and precise typography. Each theme tailored for different presentation contexts.
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-12">
            <div className="text-sm text-gray-500 uppercase tracking-wider mb-4 font-mono">
              02
            </div>
            <h3 className="text-xl font-semibold mb-4">
              AI Content Structuring
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Claude AI analyzes source content and generates coherent,
              business-focused slides. Automatic personalization for client-specific messaging.
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-12">
            <div className="text-sm text-gray-500 uppercase tracking-wider mb-4 font-mono">
              03
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Instant Sharing
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Share presentations via unique public links. No authentication required
              for viewers. Full keyboard navigation and presentation controls.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="border-t border-[#2a2a2a] py-12 mb-12">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 font-mono">
            <span>Next.js 14+</span>
            <span className="text-gray-700">•</span>
            <span>Supabase</span>
            <span className="text-gray-700">•</span>
            <span>Claude API</span>
            <span className="text-gray-700">•</span>
            <span>TypeScript</span>
            <span className="text-gray-700">•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
          Built by The Algorithm
        </div>
      </footer>
    </div>
  );
}
