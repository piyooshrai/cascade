import Link from 'next/link';
import PresentationList from '@/components/Dashboard/PresentationList';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-lg">
            the<span className="text-[#3b82f6]">Algorithm</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Presentations</h1>
            <p className="text-gray-500">Manage and share your AI-generated presentations</p>
          </div>
          <Link
            href="/dashboard/new"
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded font-medium transition-colors"
          >
            Create New
          </Link>
        </div>

        <div className="border border-[#2a2a2a] bg-[#0a0a0a]">
          <PresentationList />
        </div>
      </div>
    </div>
  );
}
