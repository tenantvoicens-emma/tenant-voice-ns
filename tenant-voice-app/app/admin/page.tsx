'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])

  const [stats, setStats] = useState({
  pendingReviews: 0,
  approvedReviews: 0,
  pendingReports: 0,
  landlords: 0,
  properties: 0,
})

  useEffect(() => {
    loadReviews()
    loadReports()
    loadStats()
  }, [])

  async function loadStats() {
    const { count: pendingReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    const { count: approvedReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')

    const { count: pendingReports } = await supabase
  .from('reports')
  .select('*', { count: 'exact', head: true })
  .eq('status', 'pending')

    const { count: landlords } = await supabase
      .from('landlords')
      .select('*', { count: 'exact', head: true })

    const { count: properties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })

  setStats({
  pendingReviews: pendingReviews || 0,
  approvedReviews: approvedReviews || 0,
  pendingReports: pendingReports || 0,
  landlords: landlords || 0,
  properties: properties || 0,
})
  }

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

  async function loadReports() {
    const { data, error } = await supabase
  .from('reports')
  .select(`
    *,
    reviews (
      review_text,
      overall_rating,
      landlords (
        name
      )
    )
  `)
  .eq('status', 'pending')

    if (error) {
      console.error(error)
    } else {
      setReports(data || [])
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

  if (error) {
    console.error(error)
  } else {
    loadReviews()
    loadStats()
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
    loadStats()
  }
}

async function resolveReport(reportId: number) {
  const { error } = await supabase
    .from('reports')
    .update({
      status: 'resolved',
    })
    .eq('id', reportId)

if (error) {
  console.error(error)
} else {
  loadReports()
  loadStats()
}
}

return (
 
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Tenant Voice Admin
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-slate-500">
              Pending Reviews
            </p>
            <p className="text-3xl font-bold">
              {stats.pendingReviews}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-slate-500">
              Approved Reviews
            </p>
            <p className="text-3xl font-bold">
              {stats.approvedReviews}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-slate-500">
              Pending Reports
            </p>

            <p className="text-3xl font-bold">
              {stats.pendingReports}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-slate-500">
              Landlords
            </p>
            <p className="text-3xl font-bold">
              {stats.landlords}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-slate-500">
              Properties
            </p>
            <p className="text-3xl font-bold">
              {stats.properties}
            </p>
          </div>
        </div>

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

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Reported Reviews
          </h2>

          {reports.length === 0 ? (
            <p className="text-slate-500">
              No pending reports.
            </p>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow p-4 mb-4"
              >
                <h3 className="font-bold text-lg">
                  {report.reviews?.landlords?.name}
                </h3>

                <p className="text-yellow-500 mt-1">
                  ★ {report.reviews?.overall_rating}
                </p>

                <p className="mt-3">
                  {report.reviews?.review_text}
                </p>

                <p>
                  <strong>Reason:</strong>{' '}
                  {report.reason}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {report.status}
                </p>

            <div className="mt-3">
  <button
    onClick={() => resolveReport(report.id)}
    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
  >
    Resolve
  </button>
</div>

              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}