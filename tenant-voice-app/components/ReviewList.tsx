'use client'

import { useState } from 'react'

type Props = {
  reviews: any[]
}

export default function ReviewList({
  reviews,
}: Props) {
  const [sortBy, setSortBy] = useState('newest')

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
            <div className="text-yellow-500 text-lg">
              {'★'.repeat(review.overall_rating)}
            </div>

            <p className="mt-2 text-slate-700">
              {review.review_text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}