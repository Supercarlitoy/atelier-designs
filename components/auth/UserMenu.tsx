'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <a
          href="/login"
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Sign In
        </a>
        <a
          href="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
        >
          Sign Up
        </a>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block font-medium">
          {user.email?.split('@')[0]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
            <div className="px-4 py-2 text-sm text-gray-500 border-b">
              {user.email}
            </div>
            
            <a
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </a>
            
            <a
              href="/profiles/edit"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Edit Profile
            </a>
            
            <a
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </a>
            
            <div className="border-t">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}