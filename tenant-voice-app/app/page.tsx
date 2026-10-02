'use client'
 
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
 

export default function Home() {
  const [landlords, setLandlords] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMessage, setAuthMessage] = useState('')

useEffect(() => {
  if (!search.trim()) {
    setSuggestions([])
    return
  }

  const landlordNames = landlords.map(
    (landlord) => landlord.name
  )

  const propertyAddresses = landlords.flatMap(
    (landlord) =>
      landlord.properties?.map(
        (property: any) => property.address
      ) || []
  )

  const allSuggestions = [
    ...landlordNames,
    ...propertyAddresses,
  ]

  const filtered = allSuggestions
    .filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5)

  setSuggestions(filtered)
}, [search, landlords])

useEffect(() => {
  loadLandlords()
  checkUser()
}, [])

async function loadLandlords() {
  const { data: landlordData, error } = await supabase
  .from('landlords')
  .select(`
    *,
    properties (*)
  `)

if (error) {
  setError(error.message)
  return
}

const landlordsWithRatings = await Promise.all(
  (landlordData || []).map(async (landlord) => {
    const { data: reviews } = await supabase
      .from('reviews')
      .select('*')
      .eq('landlord_id', landlord.id)
      .eq('status', 'approved')

    const reviewCount = reviews?.length || 0

    const averageRating =
      reviewCount > 0
        ? (
            (reviews || []).reduce(
              (sum, review) => sum + review.overall_rating,
              0
            ) / reviewCount
          ).toFixed(1)
        : null

    return {
      ...landlord,
      reviewCount,
      averageRating,
    }
  })
)

setLandlords(landlordsWithRatings)

}

async function checkUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  setUserEmail(user?.email || null)
}

async function signUp() {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    setAuthMessage(error.message)
  } else {
    setAuthMessage(
      'Account created. Check your email if confirmation is required.'
    )

    checkUser()
  }
}
  const filteredLandlords = landlords.filter((landlord) => {
  const nameMatch =
    landlord.name.toLowerCase().includes(search.toLowerCase())

  const addressMatch =
    landlord.properties?.some((property: any) =>
      property.address
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return nameMatch || addressMatch
})

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-800 mb-2">
          Tenant Voice NS
        </h1>

        <p className="text-slate-500 mb-8">
          Helping Nova Scotia renters make informed housing decisions.
        </p>

        <p className="text-sm text-slate-500 mb-4">
          Current User: {userEmail || 'Not signed in'}
        </p>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
  <h2 className="font-bold mb-3">
    Create Account
  </h2>

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-3 border rounded-xl mb-3"
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-3 border rounded-xl mb-3"
  />

  <button
    onClick={signUp}
    className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
  >
    Create Account
  </button>

  {authMessage && (
    <p className="mt-3 text-sm text-slate-600">
      {authMessage}
    </p>
  )}
</div>

        <input
type="text"
placeholder="Search landlords or addresses..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="w-full p-3 border rounded-xl mb-8"
/>

{suggestions.length > 0 && (
  <div className="bg-white border rounded-xl shadow mb-6">
    {suggestions.map((suggestion) => (
      <button
        key={suggestion}
        onClick={() => {
          setSearch(suggestion)
          setSuggestions([])
        }}
        className="block w-full text-left px-4 py-3 hover:bg-slate-100"
      >
        {suggestion}
      </button>
    ))}
  </div>
)}

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

              <div className="text-right">
  {landlord.averageRating ? (
    <>
      <div className="text-yellow-500 text-xl">
        ★ {landlord.averageRating}
      </div>

      <div className="text-sm text-slate-500">
        {landlord.reviewCount} Reviews
      </div>
    </>
  ) : (
    <div className="text-sm text-slate-400">
      No Reviews Yet
    </div>
  )}
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


<p className="font-medium mb-2">
  Properties:
</p>

{landlord.properties?.slice(0, 3).map((property: any) => (
  <p
    key={property.id}
    className="text-sm text-slate-500"
  >
    {property.address}
  </p>
))}

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