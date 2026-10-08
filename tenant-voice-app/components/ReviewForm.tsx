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
    <div className="mt-8 bg-slate-50 rounded-2xl p-6 border">
<h2 className="text-2xl font-bold mb-2">
  Submit Review
</h2>

    <p className="text-slate-500 mb-6">
      Share your rental experience anonymously.
      Reviews are moderated before publication.
    </p>

      <label className="block text-sm font-medium mb-2">
        Property
      </label>

      <select
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        className="
              w-full
              border
              border-slate-300
              rounded-xl
              p-3
              mb-4
              bg-white
            "
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

<label className="block text-sm font-medium mb-2">
  Overall Rating
</label>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="
                w-full
                border
                border-slate-300
                rounded-xl
                p-3
                mb-4
                bg-white
              "
      >
        <option value={5}>5 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={2}>2 Stars</option>
        <option value={1}>1 Star</option>
      </select>

<label className="block text-sm font-medium mb-2">
  Review
</label>

      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            bg-white
          "
        rows={5}
        placeholder="Describe your experience..."
      />

            <button
              type="button"
              onClick={submitReview}
              disabled={submitting}
              className="
              mt-4
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
              transition
              disabled:bg-slate-400
            "
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>

                {message && (
                  <p
            className={`mt-3 ${
              message.includes('submitted')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>

      )}
    </div>
  )
}