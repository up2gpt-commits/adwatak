import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — Adawatak",
  description:
    "Get in touch with Adawatak — send us a message, report an issue, or suggest a new tool. We'd love to hear from you.",
  alternates: {
    canonical: "https://adwatak.cloud/en/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-400 text-sm mb-6">We&apos;d love to hear from you</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Have a question, suggestion, or found a bug? We&apos;re here to help.
                Send us a message and we&apos;ll get back to you as soon as possible.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a
                      href="mailto:contact@adwatak.cloud"
                      className="text-blue-600 hover:text-blue-700 no-underline"
                    >
                      contact@adwatak.cloud
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">🐦</span>
                  <div>
                    <p className="font-semibold text-gray-900">X (Twitter)</p>
                    <a
                      href="https://twitter.com/adawatak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 no-underline"
                    >
                      @adawatak
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">💡</span>
                  <div>
                    <p className="font-semibold text-gray-900">Suggest a Tool</p>
                    <p className="text-sm text-gray-500">
                      Have an idea for a new tool? We&apos;d love to hear it!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mt-6">
                <p className="text-sm text-blue-800">
                  <strong>Response time:</strong> We typically reply within 24-48 hours
                  during business days.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Send a Message</h2>
            <form
              action="mailto:contact@adwatak.cloud"
              method="post"
              encType="text/plain"
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">Select a subject...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Tool Suggestion">Tool Suggestion</option>
                  <option value="AdSense Question">AdSense / Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-none text-base cursor-pointer hover:bg-blue-700 transition-colors w-full"
              >
                Send Message ✉️
              </button>
            </form>
          </div>
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
