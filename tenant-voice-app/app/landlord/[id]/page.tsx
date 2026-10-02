import { supabase } from '../../../lib/supabase'
import ReviewForm from '../../../components/ReviewForm'
import ReviewList from '../../../components/ReviewList'

export default async function LandlordPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: landlord } = await supabase
    .from('landlords')
    .select(`
      *,
      properties (*)
    `)
    .eq('id', Number(id))
    .single()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('landlord_id', Number(id))
    .eq('status', 'approved')

  const averageRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.overall_rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : null

  if (!landlord) {
    return (
      <div>
        Landlord not found.
        <br />
        ID: {id}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold">
            {landlord.name}
          </h1>

          {averageRating && (
            <div className="mt-2 text-yellow-500 text-xl">
              ★ {averageRating} ({reviews?.length || 0} reviews)
            </div>
          )}

          <p className="text-slate-500 mt-2">
            {landlord.landlord_type}
          </p>

          <div className="mt-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {landlord.city}
            </span>
          </div>

          <ReviewForm
             landlordId={landlord.id}
             properties={landlord.properties || []}
          />

          <div className="mt-8 border-t pt-6">
            <div className="bg-white rounded-xl p-6 shadow mb-6">
              <h2 className="text-xl font-bold mb-4">
                Properties Managed ({landlord.properties?.length || 0})
              </h2>

              {landlord.properties?.length > 0 ? (
                landlord.properties.map((property: any) => (
                  <div
                    key={property.id}
                    className="border-b py-2 last:border-b-0"
                  >
                    <p className="font-medium">
                      {property.address}
                    </p>

                    <p className="text-sm text-slate-500">
                      {property.city}, {property.province}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No properties listed yet.
                </p>
              )}
            </div>

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