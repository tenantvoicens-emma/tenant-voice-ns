'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Props = {
  landlordId: number
  properties: any[]
}

export default function ReviewForm({
  landlordId,
  properties,
}: Props) {

  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [propertyId, setPropertyId] = useState('')

async function submitReview() {
  if (!reviewText.trim()) {
    setMessage('Please enter a review.')
    return
  }

  if (!propertyId) {
    setMessage('Please select a property.')
    return
  }

  setMessage('')
  setSubmitting(true)

  try {
    const { error } = await supabase
      .from('reviews')
      .insert([
       {
          landlord_id: landlordId,
          property_id: Number(propertyId),
          overall_rating: rating,
          review_text: reviewText,
          status: 'pending',
        }
      ])

    if (error) {
      setMessage('Failed to submit review.')
      console.error(error)
    } else {
      setMessage('Review submitted for approval.')
      setReviewText('')
      setRating(5)
    }
  } finally {
    setSubmitting(false)
  }
}

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">
        Submit Review
      </h2>

      <select
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        className="border rounded-xl p-3 mb-4 w-full"
      >
        <option value="">
          Select a property
        </option>

        {properties.map((property) => (
          <option
            key={property.id}
            value={property.id}
          >
            {property.address}
          </option>
        ))}
      </select>

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
  type="button"
  onClick={submitReview}
  disabled={submitting}
  className="bg-blue-600 text-white px-4 py-2 rounded-xl disabled:bg-slate-400"
>
  {submitting ? 'Submitting...' : 'Submit Review'}
</button>



      {message && (
        <p className="mt-3 text-green-600">
          {message}
        </p>
      )}
    </div>
  )
}