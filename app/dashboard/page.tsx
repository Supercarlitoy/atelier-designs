import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import UserMenu from '@/components/auth/UserMenu'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Atelier Digital',
  description: 'Your Atelier Digital dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Atelier Digital Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to your dashboard!
              </h2>
              <p className="text-gray-600 mb-6">
                You&apos;re successfully authenticated with Supabase.
              </p>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  User Information
                </h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                    <dd className="text-sm text-gray-900 font-mono">{user.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Sign In</dt>
                    <dd className="text-sm text-gray-900">
                      {user.last_sign_in_at 
                        ? new Date(user.last_sign_in_at).toLocaleDateString()
                        : 'Never'
                      }
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}