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

  supabase.auth.getUser().then(({ data }) => {
    setUserEmail(data.user?.email ?? null)
  })

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    }
  )

  return () => subscription.unsubscribe()
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
    error,
  } = await supabase.auth.getUser()

  console.log('USER', user)
  console.log('ERROR', error)

  setUserEmail(user?.email || null)
}

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  console.log('SIGNUP DATA', data)

  if (error) {
    setAuthMessage(error.message)
  } else {
    setAuthMessage(
      'Account created. Check your email if confirmation is required.'
    )
  }
}

async function signIn() {
  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (error) {
    setAuthMessage(error.message)
  } else {
    setAuthMessage('Successfully signed in.')
    checkUser()
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    setAuthMessage(error.message)
  } else {
    setAuthMessage('Successfully signed out.')
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

// ===================================
// PAGE LAYOUT
// ===================================

  return (
    <main className="min-h-screen bg-slate-50 p-6">
  <div className="max-w-5xl mx-auto">

{/* ===================================
    NAVIGATION
=================================== */}

<div className="flex justify-between items-center py-6 mb-8">
  <h2 className="text-2xl font-bold">
    Tenant Voice NS
  </h2>

  <div className="flex gap-6">
    <span>About</span>
    <span>Resources</span>
    <span>Sign In</span>
  </div>
</div>

{/* ===================================
    USER STATUS
=================================== */}

{userEmail && (
  <div className="text-right mb-6 text-sm text-slate-500">
    Signed in as {userEmail}
  </div>
)}

{/* ===================================
    HERO SECTION
=================================== */}

    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-slate-900 mb-6">
        Know Before You Rent
      </h1>

  <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
    Search Nova Scotia landlords, read tenant experiences,
    and make informed housing decisions before signing a lease.
  </p>

  <div className="flex justify-center gap-4">
    <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition">
      Search Landlords
    </button>

    <button className="bg-white border border-slate-300 px-6 py-3 rounded-2xl hover:bg-slate-100 transition">
      Share Your Experience
    </button>
  </div>
</div>

{/* ===================================
    STATISTICS CARDS
=================================== */}

<div className="grid md:grid-cols-3 gap-6 mb-12">
  <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
    <div className="text-3xl font-bold text-blue-600">
      {landlords.length}
    </div>

    <div className="text-slate-500">
      Landlords
    </div>
  </div>

  <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
    <div className="text-3xl font-bold text-green-600">
      {
        landlords.reduce(
          (sum, landlord) =>
            sum + (landlord.properties?.length || 0),
          0
        )
      }
    </div>

    <div className="text-slate-500">
      Properties
    </div>
  </div>

  <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
    <div className="text-3xl font-bold text-purple-600">
      {
        landlords.reduce(
          (sum, landlord) =>
            sum + landlord.reviewCount,
          0
        )
      }
    </div>

    <div className="text-slate-500">
      Reviews
    </div>
  </div>
</div>

<div className="my-16 border-t border-slate-200"></div>

{/* ==================================
    SEARCH BAR
================================== */}

{/* SEARCH */}

<div className="mb-12">
  <h2 className="text-3xl font-bold text-slate-900 mb-2">
    Search Landlords
  </h2>

  <p className="text-slate-500 mb-6">
    Search by landlord name or property address.
  </p>

  <input
    type="text"
    placeholder="Search landlord name or property address..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      p-5
      rounded-3xl
      border
      border-slate-200
      shadow-lg
      text-lg
      focus:outline-none
      focus:ring-4
      focus:ring-blue-200
      bg-white
    "
  />
</div>

{/* ==================================
    SEARCH SUGGESTIONS
================================== */}

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

{/* ==================================
    ERROR MESSAGES
================================== */}

        {error && (
          <div className="bg-red-100 p-4 rounded mb-4">
            Error: {error}
          </div>
        )}

{/* ==================================
    LANDLORD CARDS
================================== */}

{filteredLandlords.map((landlord) => (
  <div
    key={landlord.id}
          className="
                bg-white
                rounded-3xl
                p-8
                mb-6
                border
                border-slate-200
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
          >

{/* LANDLORD HEADER */}

            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
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
              Be the first to review
            </div>
          )}
        </div>
            </div>

{/* LOCATION TAGS */}

            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {landlord.city}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Nova Scotia
              </span>
            </div>

{/* LANDLORD DETAILS */}

            <div className="mt-4 border-t pt-4 text-sm text-slate-600">
<p>Reviews: Coming Soon</p>

<p className="text-slate-600">
  {landlord.properties?.length || 0} properties recorded
</p>

</div>

{/* VIEW REVIEWS BUTTON */}
 
            <Link
            href={`/landlord/${landlord.id}`}
            className="
              mt-6
              inline-block
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-2xl
              font-medium
              hover:bg-blue-700
              transition
            "
            >
              Read Reviews
            </Link>
                      </div>
        ))}

{/* ===================================
    FOOTER
=================================== */}

<footer className="mt-32 border-t border-slate-200 py-10 text-center">
  <h3 className="font-semibold text-slate-700">
    Tenant Voice NS
  </h3>

  <p className="text-slate-500 mt-2">
    Helping Nova Scotia renters make informed housing decisions.
  </p>

  <p className="text-sm text-slate-400 mt-4">
    © 2026 Tenant Voice NS
  </p>
</footer>

      </div>
    </main>
  )
}