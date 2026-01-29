import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Cascade
        </h1>
        <p className="text-2xl md:text-3xl text-gray-400 mb-12">
          AI-Powered Presentation Platform
        </p>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Generate beautiful, personalized presentations from any URL.
          Powered by Claude AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/dashboard/new"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg border border-gray-700"
          >
            Create Presentation
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Three Themes</h3>
            <p className="text-gray-500">Executive, Minimal, and Tech themes with stunning animations</p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-500">Claude AI generates coherent, business-focused content</p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-500">Share presentations with unique public links</p>
          </div>
        </div>

        <div className="mt-16 text-sm text-gray-600">
          Built with Next.js, Supabase, and Anthropic Claude
        </div>
      </div>
    </div>
  );
}
