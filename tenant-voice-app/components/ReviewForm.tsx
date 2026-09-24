'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Props = {
  landlordId: number
}

export default function ReviewForm({
  landlordId,
}: Props) {
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [message, setMessage] = useState('')

  async function submitReview() {
    const { error } = await supabase
      .from('reviews')
      .insert([
        {
          landlord_id: landlordId,
          overall_rating: rating,
          review_text: reviewText,
          status: 'pending',
        },
      ])

    if (error) {
      setMessage('Failed to submit review.')
      console.error(error)
    } else {
      setMessage('Review submitted for approval.')
      setReviewText('')
      setRating(5)
    }
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">
        Submit Review
      </h2>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded-xl p-3 mb-4 w-full"
      >
        <option value={5}>5 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={2}>2 Stars</option>
        <option value={1}>1 Star</option>
      </select>

      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="w-full border rounded-xl p-3"
        rows={4}
        placeholder="Describe your experience..."
      />

      <button
        onClick={submitReview}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
      >
        Submit Review
      </button>

      {message && (
        <p className="mt-3 text-green-600">
          {message}
        </p>
      )}
    </div>
  )
}