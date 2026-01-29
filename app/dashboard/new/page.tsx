import Link from 'next/link';
import CreateForm from '@/components/Dashboard/CreateForm';

export default function NewPresentationPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-lg">
            the<span className="text-[#3b82f6]">Algorithm</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-10 transition-all hover:border-[#3b82f6]">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">Create Presentation</h2>
          <CreateForm />
        </div>
      </div>
    </div>
  );
}
