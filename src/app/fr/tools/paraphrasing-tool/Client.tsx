"use client";import { useState } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs=[
{question:"Qu'est-ce que la paraphrase ?",answer:"Réécrire un texte dans un style différent tout en préservant le sens original. Une alternative à la citation directe qui aide à éviter le plagiat et à présenter le contenu avec votre propre voix."},
{question:"Est-ce que cela change le sens ?",answer:"Non. L'outil préserve le sens original tout en restructurant les phrases et en utilisant un vocabulaire alternatif. L'objectif est le renouvellement linguistique, pas l'altération du sens."},
{question:"Quelle est la différence entre la paraphrase et la traduction ?",answer:"La paraphrase réécrit le même texte dans la même langue dans un nouveau style. La traduction convertit un texte d'une langue à une autre. Cet outil est spécialisé dans la paraphrase, pas la traduction."},
{question:"Est-ce utile pour le SEO ?",answer:"Oui. Un contenu correctement paraphrasé est considéré comme original par les moteurs de recherche. Cela aide à éviter les pénalités de contenu dupliqué et améliore votre classement Google."},
{question:"Quelle longueur de texte est autorisée ?",answer:"Minimum 20 caractères, maximum 5000 caractères. Meilleurs résultats avec 100-1000 mots."},
{question:"Peut-il paraphraser des textes académiques ?",answer:"Oui, adapté aux textes académiques et scientifiques. L'outil préserve la terminologie spécialisée et les concepts précis tout en réécrivant le style général."},
{question:"Mes données sont-elles en sécurité ?",answer:"100 % privé. Le texte est envoyé uniquement pour la paraphrase et n'est jamais stocké. Aucune trace conservée."},
{question:"Est-ce totalement gratuit ?",answer:"Oui, 100 % gratuit. Pas d'inscription, pas de limites, pas de plans payants."},
{question:"Combien de versions produit-il ?",answer:"Une version réécrite professionnellement. Relancez l'outil sur le même texte pour une version différente."},
{question:"Comment vérifier la qualité ?",answer:"Examinez le texte paraphrasé. Assurez-vous que le sens est préservé. L'outil affiche le nombre de modifications — plus de modifications sans altérer le sens = meilleure paraphrase."},
{question:"Prend-il en charge l'arabe et l'anglais ?",answer:"Oui, couramment. Gère les textes en arabe, en anglais et mixtes avec la même compétence."},
{question:"Comment obtenir les meilleurs résultats ?",answer:"Utilisez l'outil pour un premier brouillon, puis ajoutez manuellement votre touche personnelle. Le meilleur résultat vient de la combinaison de l'efficacité de l'IA et de la créativité humaine."},
];
const relatedTools=[
{title:"Vérificateur de plagiat",icon:"🚫",href:"/fr/tools/plagiarism-checker"},
{title:"Correcteur Grammatical",icon:"📝",href:"/fr/tools/grammar-checker"},
{title:"Détecteur de contenu IA",icon:"🤖",href:"/fr/tools/ai-content-detector"},
{title:"Compteur de Mots",icon:"📊",href:"/fr/tools/word-counter"},
{title:"Convertisseur de Casse",icon:"🔤",href:"/fr/tools/text-case"},
{title:"Générateur de noms",icon:"🏷️",href:"/fr/tools/name-generator"},
];
const seoContent=[
"Outil de paraphrase gratuit — réécrivez du texte dans un nouveau style tout en préservant le sens. Collez le texte et cliquez sur paraphraser pour une version alternative instantanée avec des statistiques.",
"Idéal pour les rédacteurs de contenu, blogueurs, étudiants et marketeurs. Produisez du contenu original en plusieurs versions. Améliorez le SEO en évitant le contenu dupliqué.",
"Chaque paraphrase affiche : le nombre de mots original et nouveau, le nombre de modifications et une brève explication. Le résultat est prêt à être copié et utilisé immédiatement.",
"L'outil prend en charge les textes en arabe, en anglais et mixtes. Gère le contenu académique, marketing, littéraire et technique avec une grande précision.",
"Astuce : Utilisez l'outil pour un premier brouillon, puis ajoutez votre touche personnelle. Les meilleurs résultats viennent du mélange de l'IA et de la créativité humaine.",
];
export default function Client(){
const[text,setText]=useState("");const[result,setResult]=useState<any>(null);const[loading,setLoading]=useState(false);const[error,setError]=useState("");const[copied,setCopied]=useState(false);
const paraphrase=async()=>{if(text.trim().length<20){setError("Veuillez entrer au moins 20 caractères");return;}setError("");setLoading(true);setResult(null);try{const res=await fetch("/api/paraphrasing-tool",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:text.trim(),lang:"fr"})});if(!res.ok)throw new Error((await res.json()).error||"Paraphrasing failed");setResult(await res.json());}catch(e:any){setError(e.message||"Error.");}finally{setLoading(false);}};
const copyResult=()=>{if(result?.paraphrasedText){navigator.clipboard.writeText(result.paraphrasedText);setCopied(true);setTimeout(()=>setCopied(false),2000);}};
return(<div className="max-w-[760px] mx-auto">
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{name:"Ouvrir l'outil",text:"Accédez à la page de cet outil sur Adawatak"},{name:"Entrez vos données",text:"Remplissez les champs requis"},{name:"Obtenez les résultats",text:"Cliquez sur le bouton Calculer ou Générer"},{name:"Utilisez ou partagez",text:"Copiez, téléchargez ou partagez les résultats"}],"moins d'une minute","fr")} />
      {/* GEO: Speakable — AI/voice engines */}
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{name:"Ouvrir l'outil",text:"Accédez à la page de cet outil sur Adawatak"},{name:"Entrez vos données",text:"Remplissez les champs requis"},{name:"Obtenez les résultats",text:"Cliquez sur le bouton Calculer ou Générer"},{name:"Utilisez ou partagez",text:"Copiez, téléchargez ou partagez les résultats"}],"moins d'une minute","fr")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb lang="fr" category="Outils de texte" categorySlug="text" toolName="Outil de Paraphrase"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">✏️ Outil de paraphrase</h1><p className="text-sm text-gray-500 mb-6">Reformulez du texte pour améliorer votre écriture</p>
<textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-[180px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y" placeholder="Collez le texte à paraphraser..." />
<button onClick={paraphrase} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">{loading?"Paraphrase en cours...":"✏️ Paraphraser"}</button>
{error&&<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
{result&&(<><div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-green-800">Texte paraphrasé</h3><button onClick={copyResult} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-all">{copied?"✅ Copié !":"📋 Copier"}</button></div><p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{result.paraphrasedText}</p></div>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Mots originaux</p><p className="text-2xl font-extrabold text-gray-700">{result.originalWordCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Nouveaux mots</p><p className="text-2xl font-extrabold text-blue-600">{result.newWordCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Modifications</p><p className="text-2xl font-extrabold text-green-600">{result.changes??"—"}</p></div></div>
<p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p></>)}</div>
<SEOContent content={seoContent} lang="fr"/><FAQSection faqs={faqs} lang="fr"/><RelatedTools tools={relatedTools} lang="fr"/><ShareButtons lang="fr"/></div>);}