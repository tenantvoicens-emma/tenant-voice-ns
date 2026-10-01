'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    loadReviews()
  }, [])

  async function loadReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        landlords(name)
      `)
      .eq('status', 'pending')

    if (error) {
      console.error(error)
    } else {
      setReviews(data || [])
    }
  }

async function approveReview(reviewId: number) {
  console.log('Approving review:', reviewId)


const { data, error } = await supabase
  .from('reviews')
  .update({
    status: 'approved',
  })
  .eq('id', reviewId)
  .select()

console.log('Updated data:', data)
console.log('Update error:', error)

  console.log('Updated row:', data)
  console.log('Update error:', error)

  if (!error) {
    loadReviews()
  }
}

async function rejectReview(reviewId: number) {
  console.log('Rejecting review:', reviewId)

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  console.log('Delete error:', error)

  if (error) {
    console.error(error)
  } else {
    loadReviews()
  }
}

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Pending Reviews
        </h1>

        {reviews.length === 0 ? (
          <p className="text-slate-500">
            No pending reviews.
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow p-6 mb-4"
            >
              <h2 className="text-xl font-bold">
                {review.landlords?.name}
              </h2>

              <p className="text-yellow-500 mt-2">
                ★ {review.overall_rating}
              </p>

              <p className="mt-4">
                {review.review_text}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() =>
                    approveReview(review.id)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectReview(review.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}