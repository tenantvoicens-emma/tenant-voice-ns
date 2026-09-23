'use client'
 
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
 

export default function Home() {
  const [landlords, setLandlords] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  loadLandlords()
}, [])

async function loadLandlords() {
  const { data, error } = await supabase
    .from('landlords')
    .select('*')

  if (error) {
    setError(error.message)
  } else {
    setLandlords(data || [])
  }
}
    const filteredLandlords = landlords.filter((landlord) =>
       landlord.name.toLowerCase().includes(search.toLowerCase())
)
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-800 mb-2">
          Tenant Voice NS
        </h1>

        <p className="text-slate-500 mb-8">
          Helping Nova Scotia renters make informed housing decisions.
        </p>

        <input
type="text"
placeholder="Search landlords..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="w-full p-3 border rounded-xl mb-8"
/>

        {error && (
          <div className="bg-red-100 p-4 rounded mb-4">
            Error: {error}
          </div>
        )}

        {filteredLandlords.map((landlord) => (
          <div
            key={landlord.id}
            className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-slate-100 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {landlord.name}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {landlord.landlord_type}
                </p>
              </div>

              <div className="text-yellow-500 text-xl">
                ★★★★☆
              </div>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {landlord.city}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Nova Scotia
              </span>
            </div>

            <div className="mt-4 border-t pt-4 text-sm text-slate-600">
<p>Reviews: Coming Soon</p>
<p>Properties: Coming Soon</p>
</div>
 
<Link
href={`/landlord/${landlord.id}`}
className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
>
  Read Reviews
</Link>
          </div>
        ))}
      </div>
    </main>
  )
}