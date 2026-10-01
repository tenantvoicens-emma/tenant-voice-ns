import { supabase } from '../../lib/supabase'

export default async function AdminPage() {

  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      landlords(name)
    `)
    .eq('status', 'pending')

  return (
    <main className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Pending Reviews
        </h1>

        {reviews?.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl shadow p-6 mb-4"
          >
            <h2 className="font-bold text-lg">
              {review.landlords?.name}
            </h2>

            <p className="text-yellow-600 mt-2">
              ★ {review.overall_rating}
            </p>

            <p className="mt-4">
              {review.review_text}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}