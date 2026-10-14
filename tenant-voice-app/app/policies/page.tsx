import Link from 'next/link'

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">

      <Link
      href="/"
      className="text-blue-600 hover:underline"
      >
      ← Back to Home
      </Link>

        <h1 className="text-4xl font-bold mt-6 mb-8">
          Tenant Voice NS Policies
        </h1>

        <div className="bg-white rounded-3xl shadow-sm p-8 space-y-10">

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-slate-700">
              Tenant Voice NS exists to help Nova Scotia renters make
              informed housing decisions by sharing rental experiences,
              identifying housing concerns, and improving transparency
              in the rental market.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Review Guidelines
            </h2>

            <p className="text-slate-700 mb-4">
               Reviews should be based on the reviewer's own direct experience
               with a landlord, property manager, or rental property. Reviews
               based solely on rumors, second-hand information, or speculation
               may be rejected or removed.
            </p>

            <h3 className="font-semibold mb-2">
              Reviews may include:
            </h3>

            <ul className="list-disc ml-6 space-y-1 text-slate-700">
              <li>Maintenance and repair experiences</li>
              <li>Communication with landlords or managers</li>
              <li>Building conditions</li>
              <li>Safety concerns</li>
              <li>Noise concerns</li>
              <li>Pest issues</li>
              <li>Positive rental experiences</li>
              <li>General tenancy experiences</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-2">
              Reviews may not include:
            </h3>

            <ul className="list-disc ml-6 space-y-1 text-slate-700">
              <li>Threats or intimidation</li>
              <li>Harassment or abusive language</li>
              <li>Discriminatory or hateful content</li>
              <li>Personal attacks</li>
              <li>Private personal information</li>
              <li>Email addresses or phone numbers</li>
              <li>Information about other tenants</li>
              <li>Knowingly false or misleading statements</li>
              <li>Content unrelated to a rental experience</li>
            </ul>
          </section>
          

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Moderation Policy
            </h2>

            <p className="text-slate-700 mb-4">
              All reviews are subject to moderation before publication.
              Submission of a review does not guarantee that it will be
              published.
            </p>

            <p className="text-slate-700 mb-4">
              Moderators may approve, reject, edit, or remove content
              that violates these policies or creates legal, privacy,
              safety, or platform integrity concerns.
            </p>

            <h3 className="font-semibold mb-2">
              A review may be rejected or removed if it:
            </h3>

            <ul className="list-disc ml-6 space-y-1 text-slate-700">
              <li>Contains identifying personal information</li>
              <li>Appears to be fraudulent or fabricated</li>
              <li>Contains threats, harassment, or intimidation</li>
              <li>Violates the review guidelines</li>
              <li>Creates significant legal or safety concerns</li>
              <li>Is submitted multiple times</li>
            </ul>

            <p className="text-slate-700 mt-4">
              Users may report published reviews for moderator review.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Privacy
            </h2>

            <p className="text-slate-700 mb-4">
              Reviews are displayed publicly as anonymous submissions.
            </p>

            <p className="text-slate-700">
              Users should never include personal information about
              themselves, landlords, property managers, neighbours,
              contractors, or other tenants in review text.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Accuracy and Fairness
            </h2>

            <p className="text-slate-700 mb-4">
              Tenant Voice NS encourages honest and balanced reviews
              based on real experiences.
            </p>

            <p className="text-slate-700">
              Reviews reflect the opinions and experiences of individual
              contributors and may not represent the views of Tenant
              Voice NS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Disclaimer
            </h2>

            <p className="text-slate-700 mb-4">
              Tenant Voice NS does not independently verify every
              statement contained within user-submitted reviews.
            </p>

            <p className="text-slate-700">
              Information on this website is provided for informational
              purposes only and should not be considered legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Terms of Use
            </h2>

            <ul className="list-disc ml-6 space-y-1 text-slate-700">
              <li>
                You are responsible for content you submit.
              </li>
              <li>
                Reviews should be truthful and based on personal
                experience.
              </li>
              <li>
                Tenant Voice NS may remove content at its discretion.
              </li>
              <li>
                Abuse of the platform may result in content removal or
                account restrictions.
              </li>
              <li>
                Use of this website indicates acceptance of these
                policies.
              </li>
            </ul>
          </section>

          <section>

          <h2 className="text-2xl font-bold mb-4">
            Right to Reply and Content Concerns
          </h2>

          <p className="text-slate-700 mb-4">
            Tenant Voice NS aims to provide a fair and balanced platform for
            sharing rental experiences. Landlords, property managers, or other
            affected parties who believe a review contains inaccurate
            information may contact Tenant Voice NS to request a review of the
            content.
          </p>

            <p className="text-slate-700 mb-4">
              Requests are evaluated on a case-by-case basis. Submission of a
              complaint does not automatically result in the removal of content.
              Moderators may review the available information and determine
              whether the review complies with Tenant Voice NS policies.
            </p>

            <p className="text-slate-700">
              Tenant Voice NS may edit, remove, or retain content following a
              moderation review. Our goal is to balance transparency for renters
              with fairness for landlords and property managers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Contact
            </h2>

             <p className="text-slate-700">
              Questions about moderation decisions, review removals, or
              these policies may be directed to the Tenant Voice NS
              team at{' '}
              <a
                href="mailto:tenantvoicens@gmail.com"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                tenantvoicens@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}