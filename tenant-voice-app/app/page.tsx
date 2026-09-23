export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="bg-white rounded-3xl shadow p-8">
          <h1 className="text-4xl font-bold">
            Tenant Voice NS
          </h1>

          <p className="text-slate-600 mt-2">
            Helping Nova Scotia renters make informed housing decisions.
          </p>

          <div className="mt-6">
            <input
              className="w-full border rounded-xl p-3"
              placeholder="Search landlord, company, property, or address..."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-semibold">
              The Fan Group
            </h2>

            <p className="mt-2 text-amber-500">
              ★★★★☆ 4.1
            </p>

            <p className="mt-3">
              Property Management Company
            </p>

            <p>
              Apartments & Townhouses
            </p>

            <p>
              124 Reviews
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-semibold">
              Yao Deng
            </h2>

            <p className="mt-2 text-amber-500">
              ★★★★☆ 3.8
            </p>

            <p className="mt-3">
              Private Landlord
            </p>

            <p>
              Townhouses
            </p>

            <p>
              8 Reviews
            </p>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Submit a Review
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="border rounded-xl p-3"
              placeholder="Landlord Name"
            />

            <select className="border rounded-xl p-3">
              <option>Private Landlord</option>
              <option>Property Management Company</option>
              <option>Housing Cooperative</option>
            </select>

            <input
              className="border rounded-xl p-3"
              placeholder="Property Address"
            />

            <select className="border rounded-xl p-3">
              <option>Apartment Building</option>
              <option>Townhouse</option>
              <option>Single Family House</option>
              <option>Duplex</option>
            </select>

          </div>

          <textarea
            className="w-full border rounded-xl p-3 mt-4"
            rows={5}
            placeholder="Describe your experience..."
          />

          <button
            className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Submit Review
          </button>

        </div>

      </div>
    </main>
  );
}