"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Qu'est-ce que l'encodage ?", answer: "Converting data from one format to another for safe transport or storage. Common types: Base64 (binary data), URL Encoding (web links), and HTML Entities (safe text)." },
  { question: "Quelle est la différence entre le Base64 et l'encodage URL ?", answer: "Base64 convertit toutes les données (images, fichiers) en texte ASCII lisible — utilisé dans les API et les URL de données. L'encodage d'URL convertit les caractères non autorisés dans les URL (%20 pour l'espace, %3F pour le point d'interrogation)." },
  { question: "Qu'est-ce que l'encodage des entités HTML ?", answer: "Conversion des caractères spéciaux en entités HTML — par exemple, < → &lt;, > → &gt;, & → &amp;. Empêche les attaques XSS et assure un rendu correct dans les navigateurs." },
  { question: "L'encodage est-il un chiffrement sécurisé ?", answer: "No! Encoding is not encryption. It can be easily reversed. Don't use it to protect sensitive data. Use AES or RSA for real encryption." },
  { question: "Quand dois-je utiliser l'encodage d'URL ?", answer: "When building URLs with spaces or special characters — e.g., 'search tools' → 'search+tools'. Browsers require URL Encoding for proper link handling." },
  { question: "Quand dois-je utiliser l'encodage Base64 ?", answer: "Embedding images in HTML (Data URL: <img src='data:...'>), transmitting data in JSON APIs, sending attachments in email (MIME)." },
  { question: "Quelle est la différence entre encodeURI et encodeURIComponent ?", answer: "encodeURI : encode une URL complète (préserve / : ?). encodeURIComponent : encode un segment d'URL (encode TOUS les caractères spéciaux). Utilisez encodeURIComponent pour les paramètres de requête." },
  { question: "L'encodage affecte-t-il la taille des données ?", answer: "Oui — Base64 augmente la taille d'environ 33 %. L'encodage d'URL varie en fonction du nombre de caractères spéciaux encodés. Les entités HTML ajoutent une surcharge minimale." },
  { question: "Comment décoder du texte en JavaScript ?", answer: "Base64 : atob(str) pour décoder, btoa(str) pour encoder. URL : decodeURIComponent(str) pour décoder, encodeURIComponent(str) pour encoder. HTML : utilisez DOMParser ou une bibliothèque." },
  { question: "Quelles sont les erreurs d'encodage courantes ?", answer: "Oublier d'encoder le texte arabe/autre avant de l'envoyer dans les URL (provoque du texte illisible). Utiliser Base64 pour le chiffrement (non sécurisé). Oublier de décoder avant d'afficher le texte aux utilisateurs." },
];

const relatedTools = [
  { title: "Encodeur Base64", icon: "🔄", href: "/fr/tools/base64-encoder" },
  { title: "Formateur JSON", icon: "📋", href: "/fr/tools/json-formatter" },
  { title: "Générateur de Hachage", icon: "#️⃣", href: "/fr/tools/hash-generator" },
  { title: "Comparateur de Texte", icon: "⚖️", href: "/fr/tools/text-compare" },
  { title: "Nettoyeur de Texte", icon: "🧹", href: "/fr/tools/text-cleaner" },
  { title: "Convertisseur de Casse", icon: "🔤", href: "/fr/tools/text-case" },
];

const seoContent = [
  "En ligne gratuit encoder and decoder tool supporting three methods: Base64 encoding/decoding for binary data transmission, URL encoding/decoding for safe web links, and HTML entity encoding for XSS-safe text. Everything runs in your browser — no data is sent to any server.",
  "Every web developer needs to understand encoding: Base64 for image data and API payloads, URL Encoding for query parameters and links, and HTML Entities for preventing XSS attacks in web applications.",
  "L'encodage n'est PAS du chiffrement — toute donnée encodée peut être inversée trivialement. Utilisez l'encodage pour la représentation et le transport, pas pour la sécurité. Pour la protection, utilisez bcrypt (mots de passe) ou TLS (transport).",
  "Cet outil fonctionne entièrement côté client — votre texte ne quitte jamais votre navigateur. Confidentialité totale garantie."
];

export default function Client() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("base64-encode");

  const process = () => {
    try {
      switch (mode) {
        case "base64-encode": setResult(btoa(unescape(encodeURIComponent(input)))); break;
        case "base64-decode": setResult(decodeURIComponent(escape(atob(input)))); break;
        case "url-encode": setResult(encodeURIComponent(input)); break;
        case "url-decode": setResult(decodeURIComponent(input)); break;
      }
    } catch { setResult("Erreur d'encodage/décodage — vérifiez votre entrée"); }
  };

  const schemaName = "Encodeur/Décodeur URL";
const schemaDesc = `Free online encoder and decoder tool for Base64, URL encoding, and more.`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/fr/tools/encoder";
const breadcrumbItems = [
  { name: "Accueil", url: "https://adwatak.cloud" },
  { name: "Développement", url: "https://adwatak.cloud/fr/category/dev" },
  { name: "Encodeur/Décodeur URL", url: "https://adwatak.cloud/fr/tools/encoder" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'fr', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
        <StructuredData data={howToSchema("How to use this encoder", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [
          {name:"Choose encoding type", text:"Sélectionnez l'encodage Base64, URL ou HTML dans le menu déroulant"},
          {name:"Enter your text", text:"Collez ou tapez le texte que vous souhaitez encoder ou décoder"},
          {name:"Click the button", text:"Appuyez sur exécuter pour traiter votre texte"},
          {name:"Copy the result", text:"Utilisez le bouton copier ou sélectionnez la sortie encodée/décodée"}
        ], "moins d'une minute", "fr")} />
        <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="fr" category="Développement" categorySlug="dev" toolName="Encodeur/Décodeur d'URL" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔧 Encodeur/Décodeur URL</h1>
        <p className="text-sm text-gray-500 mb-6">Encodez et décodez du texte en plusieurs formats</p>
        <select value={mode} onChange={(e) => setMode(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white mb-4">
          <option value="base64-encode">Base64 Encode</option>
          <option value="base64-decode">Base64 Decode</option>
          <option value="url-encode">URL Encode</option>
          <option value="url-decode">URL Decode</option>
        </select>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-[120px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-inherit resize-y mb-4"
          placeholder="Entrez le texte..." />
        <button onClick={process}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          Execute
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200 break-all text-sm">
          {result}
        </div>
      )}
      <SEOContent content={seoContent} lang="fr" />
      <FAQSection faqs={faqs} lang="fr" />
      <RelatedTools tools={relatedTools} lang="fr" />
    <ShareButtons lang="fr" />
    </div>
  );
}
