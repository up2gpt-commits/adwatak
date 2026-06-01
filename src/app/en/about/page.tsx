import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Adawatak",
  description:
    "Adawatak is a free online tools platform offering 50+ interactive tools in Arabic and English — calculators, Islamic tools, generators, and converters. No signup, no ads.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About Adawatak</h1>
        <div className="w-16 h-1 bg-blue-600 rounded-full mb-6" />

        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            <strong>Adawatak</strong> (أدواتك — "Your Tools") is a free online tools platform
            offering high-quality interactive tools in both Arabic and English. We believe digital
            tools should be accessible to everyone — free, easy to use, and requiring no account
            creation.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Financial Calculators:</strong> Mortgage, personal loan, installment, EMI,
              profit margin, VAT, salary, currency converter, compound interest, and gold
              calculator.
            </li>
            <li>
              <strong>Islamic Tools:</strong> Islamic inheritance calculator, Zakat calculator,
              Hijri/Gregorian converter, age calculator, prayer times, and Qibla direction.
            </li>
            <li>
              <strong>Text Tools:</strong> Word counter, text case converter, number to words,
              Arabic lorem ipsum generator, text cleaner, and text comparison.
            </li>
            <li>
              <strong>Converters:</strong> PDF merger, image to PDF, unit converter, and color
              converter.
            </li>
            <li>
              <strong>Developer Tools:</strong> JSON formatter, Base64 encoder, and hash
              generator.
            </li>
            <li>
              <strong>Generators:</strong> QR code, WhatsApp link, password generator, invoice
              generator, random number generator, and name generator.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why Adawatak?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>100% free — no hidden fees, no premium plans</li>
            <li>No registration — use any tool instantly</li>
            <li>Fully client-side — your data never leaves your device</li>
            <li>Updated for Saudi, UAE, and Egyptian regulations</li>
            <li>Responsive design — works on mobile and desktop</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Technology</h2>
          <p>
            Built with <strong>Next.js</strong> — a modern framework ensuring high speed and
            excellent performance. All tools run locally in your browser (client-side),
            guaranteeing your data privacy.
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
