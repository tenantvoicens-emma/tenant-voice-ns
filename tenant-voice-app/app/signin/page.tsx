'use client'

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-md mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Sign In
          </h1>

          <p className="text-slate-500 mb-8">
            Access your Tenant Voice NS account.
          </p>

          <input
            type="email"
            placeholder="Email"
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              p-3
              mb-4
            "
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              p-3
              mb-6
            "
          />

          <button
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            Sign In
          </button>

        </div>

      </div>

    </main>
  )
}