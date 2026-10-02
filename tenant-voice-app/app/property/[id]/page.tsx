import Link from 'next/link'
import { supabase } from '../../../lib/supabase'


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
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold">
            {property.address}
          </h1>

                {averageRating && (
                  <div className="mt-2 text-yellow-500 text-xl">
                    ★ {averageRating} ({reviewCount} reviews)
                  </div>
                )}

          <p className="mt-4 text-slate-600">
            {property.city}, {property.province}
          </p>

          <p className="mt-2 text-slate-500">
            {property.postal_code}
          </p>

          <p className="mt-4">
            Property Type: {property.property_type}
          </p>

    <div className="mt-6 border-t pt-6">
        <h2 className="text-xl font-bold mb-2">
        Managed By
  </h2>

<Link
  href={`/landlord/${property.landlords?.id}`}
  className="text-blue-600 hover:text-blue-800 hover:underline"
>
  {property.landlords?.name}
</Link>


</div>

        </div>
      </div>
    </main>
  )
}