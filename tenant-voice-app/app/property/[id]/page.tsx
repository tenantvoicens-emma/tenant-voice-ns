import { supabase } from '../../../lib/supabase'

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', Number(id))
    .single()

  if (!property) {
    return (
      <div>
        Property not found.
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold">
            {property.address}
          </h1>

          <p className="mt-4 text-slate-600">
            {property.city}, {property.province}
          </p>

          <p className="mt-2 text-slate-500">
            {property.postal_code}
          </p>

          <p className="mt-4">
            Property Type: {property.property_type}
          </p>
        </div>
      </div>
    </main>
  )
}