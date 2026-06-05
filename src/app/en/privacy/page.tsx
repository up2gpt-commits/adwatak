import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Adawatak",
  description:
    "Adawatak privacy policy — how we handle your data, what information we collect, and your rights as a user.",
  alternates: {
    canonical: "https://adwatak.cloud/en/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-6">Last updated: May 2026</p>

        <div className="text-gray-600 leading-relaxed space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Our Commitment to Privacy</h2>
          <p>
            At <strong>Adawatak</strong>, your privacy is our priority. All tools run locally in
            your browser — your data is never sent to any server. We do not collect personal
            information when you use our tools.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Information We Collect</h2>
          <p>
            When you visit our website, we may collect limited technical information such as:
            browser type, operating system, and IP address. This information is used to improve
            site performance and analyze usage through services like Google Analytics.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Cookies</h2>
          <p>
            We use cookies to enhance your experience. We may also use third-party services such
            as Google AdSense, which use their own cookies to serve personalized advertisements.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Third-Party Services</h2>
          <p>
            We may use services such as Google Analytics and Google AdSense. These services have
            their own independent privacy policies. We recommend reviewing their privacy policies
            for more information.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Data Protection</h2>
          <p>
            Since all tools run in your browser, your financial and personal data is never stored
            on any server. We do not sell or share your personal information with third parties.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Contact</h2>
          <p>
            For any questions about this privacy policy, please contact us at:
            <a
              href="mailto:contact@adwatak.cloud"
              className="text-blue-600 hover:text-blue-700 no-underline ml-1"
            >
              contact@adwatak.cloud
            </a>
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/en"
          className="text-blue-600 hover:text-blue-700 font-semibold no-underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
