import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">

              <Link
               href="/"
               className="text-blue-600 hover:underline"
               >
               ← Back to Home
               </Link>   

        <div className="bg-white rounded-3xl shadow-sm p-8 mt-6">
          <h1 className="text-4xl font-bold mb-6">
            Why Tenant Voice NS Exists
          </h1>

          <p className="text-slate-700 mb-4">
            Tenant Voice NS is independently operated 
            and community-focused.

            The project relies on user contributions, moderation, 
            and community participation to help improve transparency 
            in Nova Scotia's rental market.
          </p>

          <p className="text-slate-700 mb-4">
            Renting a home is one of the largest monthly expenses many Nova 
            Scotians face, yet reliable information about rental experiences can
            be difficult to find. Tenant Voice NS was created to provide renters
            with a place to share experiences, learn from one another, 
            and to make more informed housing decisions.                         
          </p>

          <p className="text-slate-700 mb-4">
            Reviews are moderated before publication to help maintain a
            respectful, fair, and useful resource for renters across
            Nova Scotia.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Our Goals
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-slate-700">
            <li>Help renters make informed decisions.</li>
            <li>Promote transparency in the rental market.</li>
            <li>Encourage respectful and constructive reviews.</li>
            <li>Provide housing-related resources for tenants.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Contact
          </h2>

          <p className="text-slate-700">
            Questions, feedback, or concerns can be sent to{' '}
            <a
              href="mailto:tenantvoicens@gmail.com"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              tenantvoicens@gmail.com
            </a>.
          </p>
        </div>

      </div>
    </main>
  )
}