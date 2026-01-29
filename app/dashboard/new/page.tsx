import Link from 'next/link';
import CreateForm from '@/components/Dashboard/CreateForm';

export default function NewPresentationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">Create New Presentation</h1>
          <p className="text-gray-400">
            Generate a beautiful presentation from any URL
          </p>
        </div>

        <div className="bg-gray-950 rounded-xl border border-gray-800 p-8">
          <CreateForm />
        </div>
      </div>
    </div>
  );
}
