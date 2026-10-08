// ===================================
// IMPORTS
// ===================================


import { supabase } from '../../../lib/supabase'
import ReviewForm from '../../../components/ReviewForm'
import ReviewList from '../../../components/ReviewList'


// ===================================
// LANDLORD DETAIL PAGE
// ===================================

      export default async function LandlordPage({
        params,
      }: {
        params: Promise<{ id: string }>
      }) {
        const { id } = await params

// ===================================
// LOAD LANDLORD DATA
// ===================================

  const { data: landlord } = await supabase
    .from('landlords')
    .select(`
      *,
      properties (*)
    `)
    .eq('id', Number(id))
    .single()

// ===================================
// LOAD REVIEWS
// ===================================

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('landlord_id', Number(id))
    .eq('status', 'approved')

// ===================================
// CALCULATE RATING
// ===================================

  const averageRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.overall_rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : null

// ===================================
  // NOT FOUND HANDLER
// ===================================

  if (!landlord) {
    return (
      <div>
        Landlord not found.
        <br />
        ID: {id}
      </div>
    )
  }

// ===================================
 // PAGE LAYOUT
// ===================================

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">

{/* LANDLORD HEADER */}

          <h1 className="text-5xl font-extrabold text-slate-900">
            {landlord.name}
          </h1>

                  {averageRating && (
          <div
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              bg-amber-50
              text-amber-700
              px-4
              py-2
              rounded-full
              font-semibold
            "
          >
            <span>★</span>

            <span>{averageRating}/5</span>

            <span className="text-amber-600">
              ({reviews?.length || 0} reviews)
            </span>
          </div>
        )}

          <p className="text-slate-600 mt-3 text-lg">
            {landlord.landlord_type}
          </p>

          <div className="mt-6">
            <span
              className="
                bg-blue-100
                text-blue-700
                px-4
                py-2
                rounded-full
                font-medium
              "
            >
              {landlord.city}
            </span>
          </div>

{/* SUBMIT REVIEW */}
       
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">

          <div className="bg-slate-50 rounded-2xl p-4 border">
            <p className="text-sm text-slate-500">
              ⭐ Average Rating
            </p>

            <p className="text-3xl font-bold text-yellow-600">
              {averageRating || 'N/A'}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border">
            <p className="text-sm text-slate-500">
              💬 Reviews
            </p>

            <p className="text-3xl font-bold">
              {reviews?.length || 0}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border">
            <p className="text-sm text-slate-500">
              🏢 Properties
            </p>

            <p className="text-3xl font-bold">
              {landlord.properties?.length || 0}
            </p>
          </div>

        </div>
       
          <div className="mt-8">
  <ReviewForm
    landlordId={landlord.id}
    properties={landlord.properties || []}
  />
</div>

{/* PROPERTY LIST */}

          <div className="mt-10">
            <div className="bg-white rounded-xl p-6 shadow mb-6">
              <h2 className="text-xl font-bold mb-4">
                Properties Managed ({landlord.properties?.length || 0})
              </h2>

              {landlord.properties?.length > 0 ? (
                landlord.properties.map((property: any) => (
                  <div
              key={property.id}
              className="
                border
                rounded-xl
                p-4
                mb-3
                bg-slate-50
                hover:bg-slate-100
                transition
              "
            >

                    <p className="font-semibold text-slate-800">
                      {property.address}
                    </p>

                    <p className="text-sm text-slate-500">
                      {property.city}, {property.province}
                    </p>
                  </div>
                ))
             ) : (
  <div className="bg-slate-50 border rounded-2xl p-6 text-center">

    <p className="text-2xl mb-2">
      🏢
    </p>

    <h3 className="font-semibold text-lg">
      No Properties Listed
    </h3>

    <p className="text-slate-500 mt-2">
      No properties have been added for this landlord yet.
    </p>

  </div>
)}
            </div>

{/* RECENT REVIEWS */}

            <h2 className="text-2xl font-bold mb-4">
              Reviews ({reviews?.length || 0})
            </h2>

            <ReviewList reviews={reviews || []} />
          </div>
        </div>
      </div>
    </main>
  )
}