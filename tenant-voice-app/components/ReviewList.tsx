'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Props = {
  reviews: any[]
}

export default function ReviewList({
  reviews,
}: Props) {

// ===================================
// COMPONENT STATE
// ===================================

  const [sortBy, setSortBy] = useState('newest')

  const [reportReasons, setReportReasons] = useState<
    Record<number, string>
  >({})

  const [reportMessages, setReportMessages] = useState<
     Record<number, string>
   >({})

// ===================================
// REPORT REVIEW FUNCTION
// ===================================

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

// ===================================
// REVIEW SORTING
// ===================================

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

// ===================================
// EMPTY STATE
// ===================================

if (reviews.length === 0) {
  return (
    <div className="bg-slate-50 border rounded-2xl p-6 text-center">
      <p className="text-2xl mb-2">
        ⭐
      </p>

      <h3 className="font-semibold text-lg">
        No Reviews Yet
      </h3>

      <p className="text-slate-500 mt-2">
        Be the first tenant to share their experience.
      </p>
    </div>
  )
}

  return (
   
/* ===================================
SORT CONTROLS
=================================== */

   <div className="mt-4">

  <div className="mb-4">
    <h2 className="text-xl font-bold text-slate-800">
      Reviews
    </h2>

    <p className="text-sm text-slate-500">
      {reviews.length} review
      {reviews.length !== 1 ? 's' : ''}
    </p>
  </div>
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

{/* ===================================
REVIEW CARDS
=================================== */}

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="
                bg-white
                rounded-2xl
                p-5
                border
                border-slate-200
                shadow-sm
                hover:shadow-md
                transition
              "
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">

              <span className="text-yellow-500 text-lg">
                {'★'.repeat(review.overall_rating)}
              </span>

              <span className="text-sm text-slate-500">
                {review.overall_rating}/5
              </span>

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

            <div className="mt-2">
            <span
              className="
                inline-block
                text-xs
                bg-slate-100
                text-slate-600
                px-2
                py-1
                rounded-full
              "
            >
              Anonymous Reviewer
            </span>
          </div>

<div className="mt-3 flex items-center gap-2">

  <div
    className="
      w-8
      h-8
      rounded-full
      bg-slate-200
      flex
      items-center
      justify-center
      text-sm
    "
  >
    👤
  </div>

  <div>
    <p className="text-sm font-medium">
      Anonymous Reviewer
    </p>
  </div>

</div>

          <p className="mt-3 text-slate-700">
            {review.review_text}
          </p>

{/* ===================================
REPORT CONTROLS
=================================== */}

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
              className="
              mt-3
              text-sm
              text-slate-500
              hover:text-red-600
              transition
            "
            >
              Report Review
            </button>

{/* ===================================
REPORT STATUS MESSAGES
=================================== */}

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