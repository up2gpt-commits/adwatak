import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Adwatak",
  description:
    "Terms and conditions for using Adwatak platform — please read these terms before using our website.",
  alternates: {
    canonical: "https://adwatak.cloud/en/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-6">Last updated: June 2026</p>

        <div className="text-gray-600 leading-relaxed space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Acceptance of Terms</h2>
          <p>
            By using <strong>Adwatak</strong> (adwatak.cloud), you agree to these terms.
            If you do not agree with any part, please do not use our website.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Tool Usage</h2>
          <p>
            All tools on our platform are free and run entirely in your browser.
            We are not responsible for the accuracy of results — verify critical information through independent sources.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Intellectual Property</h2>
          <p>
            All intellectual property rights for the platform and its content are reserved by Adwatak.
            Copying or redistributing content without written permission is prohibited.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Disclaimer</h2>
          <p>
            Financial and Islamic tools are provided for informational purposes only.
            Results do not constitute financial or religious advice. Consult qualified professionals for important decisions.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Third-Party Links</h2>
          <p>
            Our website may contain links to external sites. We are not responsible for their content or policies.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Users will be notified through the "Last updated" date.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact</h2>
          <p>
            For questions about these terms, contact us at:{' '}
            <a href="mailto:contact@adwatak.cloud" className="text-blue-600 no-underline hover:underline">
              contact@adwatak.cloud
            </a>
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/en" className="text-blue-600 hover:text-blue-700 font-semibold no-underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
