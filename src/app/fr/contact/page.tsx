import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Adwatak",
  description:
    "Contactez Adwatak — envoyez-nous un message, signalez un problème ou suggérez un nouvel outil. Nous sommes là pour vous aider.",
  alternates: {
    canonical: "https://adwatak.cloud/fr/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contactez-nous</h1>
        <p className="text-gray-400 text-sm mb-6">Nous serions ravis de vous entendre</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nous Contacter</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Une question, un bug trouvé, ou une suggestion d&apos;outil ? Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:contact@adwatak.cloud" className="text-blue-600 hover:text-blue-700 no-underline">contact@adwatak.cloud</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">🐦</span>
                  <div>
                    <p className="font-semibold text-gray-900">X (Twitter)</p>
                    <a href="https://twitter.com/adawatak" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 no-underline">@adwatak</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">💡</span>
                  <div>
                    <p className="font-semibold text-gray-900">Suggérer un outil</p>
                    <p className="text-sm text-gray-500">Vous avez une idée d&apos;outil ? Nous sommes tout ouïe !</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mt-6">
                <p className="text-sm text-blue-800"><strong>Délai de réponse :</strong> Nous répondons généralement sous 24 à 48 heures ouvrées.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Envoyer un Message</h2>
            <form action="mailto:contact@adwatak.cloud" method="post" encType="text/plain" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                <input type="text" id="name" name="nom" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors" placeholder="Jean Dupont" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors" placeholder="exemple@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">Sujet</label>
                <select id="subject" name="sujet" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors bg-white">
                  <option value="">Choisissez un sujet...</option>
                  <option value="Question Générale">Question Générale</option>
                  <option value="Signaler un Bug">Signaler un Bug</option>
                  <option value="Suggérer un Outil">Suggérer un Outil</option>
                  <option value="Publicité / AdSense">Publicité / AdSense</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" required rows={5} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors resize-vertical" placeholder="Comment pouvons-nous vous aider ?" />
              </div>
              <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-none text-base cursor-pointer hover:bg-blue-700 transition-colors w-full">Envoyer ✉️</button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/fr" className="text-blue-600 hover:text-blue-700 font-semibold no-underline">← Accueil</Link>
      </div>
    </div>
  );
}
