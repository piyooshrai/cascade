import Link from 'next/link';
import PresentationList from '@/components/Dashboard/PresentationList';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">Manage your presentations</p>
          </div>
          <Link
            href="/dashboard/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            + Create New
          </Link>
        </div>

        <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
          <PresentationList />
        </div>
      </div>
    </div>
  );
}
