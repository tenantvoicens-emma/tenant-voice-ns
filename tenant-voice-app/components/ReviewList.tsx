'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Props = {
  reviews: any[]
}

export default function ReviewList({
  reviews,
}: Props) {
  const [sortBy, setSortBy] = useState('newest')

  const [reportReasons, setReportReasons] = useState<
    Record<number, string>
  >({})

  const [reportMessages, setReportMessages] = useState<
     Record<number, string>
   >({})

  async function reportReview(reviewId: number) {
    
    const { data: existingReport } = await supabase
  .from('reports')
  .select('id')
  .eq('review_id', reviewId)
  .eq('status', 'pending')
  .maybeSingle()

  if (existingReport) {
  setReportMessages({
  ...reportMessages,
  [reviewId]: 'This review has already been reported.',
})
  return
}
    
    const { error } = await supabase
      .from('reports')
      .insert([
        {
          review_id: reviewId,
          reason: reportReasons[reviewId] || 'Spam',
        },
      ])

if (error) {
  console.error(error)
  setReportMessages({
  ...reportMessages,
  [reviewId]:'Failed to report review.',
})
} else {
  setReportReasons({
    ...reportReasons,
   [reviewId]: 'Spam',
  })

  setReportMessages({
  ...reportMessages,
  [reviewId]: '✅ Review reported successfully.',
})

}
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'highest') {
      return b.overall_rating - a.overall_rating
    }

    if (sortBy === 'lowest') {
      return a.overall_rating - b.overall_rating
    }

    return (
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
    )
  })

  if (reviews.length === 0) {
    return (
      <p className="text-slate-600">
        No approved reviews yet.
      </p>
    )
  }

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label className="mr-2 font-medium">
          Sort Reviews:
        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="newest">
            Newest First
          </option>

          <option value="highest">
            Highest Rating
          </option>

          <option value="lowest">
            Lowest Rating
          </option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="bg-slate-50 rounded-xl p-4"
          >
            <div className="flex justify-between items-center">
              <div className="text-yellow-500 text-lg">
                {'★'.repeat(review.overall_rating)}
              </div>

              <div className="text-sm text-slate-500">
                {new Date(
                  review.created_at
                ).toLocaleDateString('en-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            <p className="mt-2 text-slate-700">
              {review.review_text}
            </p>

            <select
              value={
                reportReasons[review.id] || 'Spam'
              }
              onChange={(e) =>
                setReportReasons({
                  ...reportReasons,
                  [review.id]: e.target.value,
                })
              }
              className="mt-3 mr-3 border rounded-lg px-2 py-1 text-sm"
            >
              <option>Spam</option>
              <option>Fake Review</option>
              <option>Harassment</option>
              <option>Duplicate</option>
              <option>Other</option>
            </select>

            <button
              onClick={() =>
                reportReview(review.id)
              }
              className="mt-3 text-sm text-red-600 hover:underline"
            >
              Report Review
            </button>

            {reportMessages[review.id] && (
              <p className="mt-2 text-sm text-green-600">
                {reportMessages[review.id]}
              </p>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}