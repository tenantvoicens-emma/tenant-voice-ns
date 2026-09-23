import { supabase } from '../../../lib/supabase'

export default async function LandlordPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: landlord } = await supabase
    .from('landlords')
    .select('*')
    .eq('id', Number(id))
    .single()

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

          <p className="text-slate-500 mt-2">
            {landlord.landlord_type}
          </p>

          <div className="mt-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {landlord.city}
            </span>
          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">
              Reviews
            </h2>

            <p className="text-slate-600">
              Reviews coming soon.
            </p>
          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">
              Properties
            </h2>

            <p className="text-slate-600">
              Property listings coming soon.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
