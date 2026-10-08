import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import ReviewList from '../../../components/ReviewList'


export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: property } = await supabase
  .from('properties')
  .select(`
    *,
    landlords (*)
  `)
  .eq('id', Number(id))
  .single()

const { data: reviews } = await supabase
  .from('reviews')
  .select('*')
  .eq('property_id', Number(id))
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

  if (!property) {
    return (
      <div>
        Property not found.
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-5xl font-extrabold text-slate-900">
            {property.address}
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
                      ({reviewCount} reviews)
                    </span>
                  </div>
)}

          <div className="mt-6 flex flex-wrap gap-3">

  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
    📍 {property.city}, {property.province}
  </span>

  <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-medium">
    🏢 {property.property_type}
  </span>

  <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-medium">
    📮 {property.postal_code}
  </span>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

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
      {reviewCount}
    </p>
  </div>

  <div className="bg-slate-50 rounded-2xl p-4 border">
    <p className="text-sm text-slate-500">
      🏢 Property Type
    </p>

    <p className="text-xl font-bold">
      {property.property_type}
    </p>
  </div>

</div>

    <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">
        Managed By
  </h2>

      <Link
  href={`/landlord/${property.landlords?.id}`}
  className="
    inline-block
    bg-blue-50
    text-blue-700
    px-4
    py-2
    rounded-xl
    font-medium
    hover:bg-blue-100
    transition
  "
>
        {property.landlords?.name}
      </Link>
      </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Reviews ({reviewCount})
          </h2>

          <ReviewList reviews={reviews || []} />
        </div>

        </div>
      </div>
    </main>
  )
}