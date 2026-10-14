import Link from 'next/link'

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">

        <Link
            href="/"
            className="
                text-blue-600
                hover:text-blue-700
                hover:underline
            "
            >
            ← Back to Home
            </Link>


          <h1 className="text-4xl font-bold mb-6">
            Tenant Resources
          </h1>

          <p className="text-slate-700 mb-8">
            Helpful resources for renters in Nova Scotia.
          </p>

          <div className="space-y-8">

            <section>
              <h2 className="text-2xl font-bold mb-3">
                Residential Tenancies Program
              </h2>

              <p className="text-slate-700 mb-2">
                Information about leases, disputes, security deposits,
                notices to quit, and tenant rights under Nova Scotia's
                Residential Tenancies Act.
              </p>

              <a
                href="https://beta.novascotia.ca/residential-tenancies-program"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
                > 
                Visit Residential Tenancies Program →
                </a>
        
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">
                Legal Information Society of Nova Scotia
              </h2>

              <p className="text-slate-700 mb-2">
                Plain-language legal information about housing issues,
                tenancy rights, and dispute resolution.
              </p>

              <a
                href="https://www.legalinfo.org"
                 target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
                > 
                Visit Legal Information Society →
                </a>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">
                Dalhousie Legal Aid Service
              </h2>

              <p className="text-slate-700 mb-2">
                Community legal services and legal assistance for
                eligible individuals.
              </p>

              <a
                href="https://www.dal.ca/faculty/law/dlas.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                Visit Dalhousie Legal Aid →
                </a>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">
                ACORN Nova Scotia
              </h2>

              <p className="text-slate-700 mb-2">
                Tenant organizing, advocacy, and information about
                housing issues across Nova Scotia.
              </p>

              <a
                href="https://acorncanada.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                Visit ACORN →
                </a>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">
                Emergency Housing Support
              </h2>

              <p className="text-slate-700">
                If you are facing an immediate housing emergency,
                contact local housing support organizations, shelters,
                or 211 Nova Scotia for assistance and referrals.
              </p>
            </section>

          </div>
        </div>
    </main>
  )
}