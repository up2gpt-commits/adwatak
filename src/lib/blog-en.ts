export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  keywords: string[];
}

export function getAllEnPosts(): BlogPost[] {
  return enBlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEnPostBySlug(slug: string): BlogPost | undefined {
  return enBlogPosts.find((p) => p.slug === slug);
}

/**
 * Generate today date in YYYY-MM-DD format
 */
function todayEnStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const enBlogPosts: BlogPost[] = [
  {
    slug: "zakat-on-real-estate-rental-income-2026",
    title: "Zakat on Real Estate & Rental Income: Complete 2026 Guide",
    excerpt:
      "Do you pay Zakat on rental property? Learn exactly how Zakat applies to real estate, rental income, and property investments in 2026 — with calculation examples, scholarly opinions, and step-by-step guidance.",
    date: "2026-06-05",
    category: "Islamic Finance",
    readTime: "16 min read",
    keywords: [
      "do you pay zakat on rental property",
      "how to calculate zakat on rental income 2026",
      "zakat on real estate investment",
      "is zakat due on house you live in",
      "zakat on rental property islamic ruling",
      "how much zakat on rental income",
      "zakat on commercial property vs residential",
      "do i pay zakat on investment property",
      "zakat on apartment building rental income",
      "nisab for rental income zakat calculation",
      "zakat on property you plan to sell",
      "is zakat obligatory on saved rental money",
    ],
    content: `
      <h2>Do You Have to Pay Zakat on Rental Property? The Direct Answer</h2>
      <p><strong>Zakat is NOT due on the property itself</strong> if it is for personal use or held for long-term rental income. However, <strong>Zakat IS due on the rental income you receive</strong> — once that income has been in your possession for one full Hijri year (Hawl) and meets the Nisab threshold. In other words, you do not pay 2.5% on the market value of your apartment building. You pay Zakat on the <strong>net rental savings</strong> — the money left after expenses — when it has sat in your hands for a full lunar year and exceeds the Nisab. If you are holding property for resale (as a trader), the rules are different: Zakat applies to the <strong>current market value</strong> of the property annually. This guide covers every scenario in detail.</p>

      <h2>Why Is Zakat on Real Estate So Confusing?</h2>
      <p>Real estate is one of the most misunderstood areas of Zakat because property can serve different purposes — and each purpose has a different Zakat ruling. The same apartment building could be:</p>
      <ul>
        <li><strong>A personal residence</strong> — No Zakat at all. Your home is exempt.</li>
        <li><strong>A rental property generating monthly income</strong> — No Zakat on the building itself. Zakat applies to the rental income only when it meets Nisab and completes a Hawl.</li>
        <li><strong>Property held for resale (investment/trading)</strong> — Zakat is due on the full current market value every year, because it is treated like merchandise.</li>
        <li><strong>Land purchased for future development</strong> — If you intend to sell it eventually, it is treated as trade goods and Zakat applies to its market value annually.</li>
      </ul>
      <p>The key question scholars ask is: <strong>"What is your intention for this property?"</strong> That single factor determines which Zakat rules apply.</p>

      <h2>How Do You Calculate Zakat on Rental Income? Step by Step</h2>
      <p>Here is the exact method for calculating Zakat on rental income, agreed upon by the majority of contemporary scholars including the International Islamic Fiqh Academy:</p>

      <h3>Step 1: Determine Your Net Annual Rental Income</h3>
      <p>Add up all rental income received over the year, then subtract all expenses directly related to generating that income:</p>
      <ul>
        <li><strong>Add:</strong> Total rent collected from all tenants over 12 months</li>
        <li><strong>Subtract:</strong> Property maintenance and repairs</li>
        <li><strong>Subtract:</strong> Property management fees</li>
        <li><strong>Subtract:</strong> Insurance costs</li>
        <li><strong>Subtract:</strong> Mortgage interest (if applicable — scholars differ on deducting interest; many say do not deduct it)</li>
        <li><strong>Subtract:</strong> Property taxes or government fees</li>
        <li><strong>Subtract:</strong> Vacancy losses (months when the property was unoccupied)</li>
      </ul>
      <p><strong>Example:</strong> You collect $24,000 in annual rent. Expenses total $6,000 (maintenance $2,000, management $1,500, insurance $1,000, taxes $1,500). Your net rental income = <strong>$18,000</strong>.</p>

      <h3>Step 2: Check if It Meets the Nisab Threshold</h3>
      <p>The Nisab is the minimum wealth threshold for Zakat. As of 2026, the Nisab in gold terms is <strong>85 grams of pure gold</strong>, and in silver terms it is <strong>595 grams of silver</strong>. Using gold prices in 2026 (approximately $75–$80 per gram), the Nisab is roughly <strong>$6,375–$6,800</strong>. If your net rental income (combined with other Zakatable assets like cash, gold, and stocks) meets or exceeds this amount, Zakat is obligatory.</p>
      <p><strong>Important:</strong> You do not check Nisab against rental income alone. You combine it with all your other Zakatable wealth — cash in bank accounts, gold, silver, stocks, and other savings — and check the total against Nisab.</p>

      <h3>Step 3: Apply the 2.5% Zakat Rate</h3>
      <p>Once your total Zakatable wealth meets Nisab and has been held for one Hijri year, pay <strong>2.5%</strong> on the total amount.</p>
      <p><strong>Continuing the example:</strong> Net rental income = $18,000. Cash savings = $5,000. Gold holdings = $3,000. Total Zakatable wealth = $26,000. Zakat due = $26,000 × 0.025 = <strong>$650</strong>.</p>

      <h3>Step 4: Choose Your Calculation Method</h3>
      <p>There are two accepted methods for calculating Zakat on rental income:</p>
      <ul>
        <li><strong>Method A — Hawl-based (most common):</strong> Track your rental income throughout the year. On your annual Zakat date, calculate the total net rental income that has been in your possession for a full Hijri year. Add it to your other Zakatable assets and pay 2.5% on the total.</li>
        <li><strong>Method B — Monthly extraction (simpler):</strong> Each month, immediately set aside 2.5% of your net rental income for Zakat. This is easier to track and ensures you do not fall behind. Many scholars permit this method as a form of advance payment.</li>
      </ul>
      <p>Method B is recommended for most people because it spreads the Zakat obligation across the year and avoids a large lump-sum payment.</p>

      <h2>Is Zakat Due on the Property Itself or Just the Income?</h2>
      <p>This is the most common question, and the answer depends entirely on your intention:</p>

      <h3>Property Held for Rental (Long-Term Investment)</h3>
      <p><strong>Zakat on the property value: NO.</strong> The building, land, and apartment are not Zakatable assets because they are not "growing" wealth in the Zakat sense — they are fixed assets used to generate income. <strong>Zakat on the rental income: YES.</strong> The cash you receive from tenants is wealth that grows and is subject to Zakat under the rules of cash/wealth Zakat.</p>

      <h3>Property Held for Resale (Trading/Speculation)</h3>
      <p><strong>Zakat on the property value: YES.</strong> If you bought a property intending to sell it when the price rises, it is treated as <strong>trade merchandise (Urud al-Tijarah)</strong>. You must pay Zakat on its <strong>current market value</strong> every year on your Zakat date — not the price you paid for it. If you bought an apartment for $200,000 and it is now worth $250,000, your Zakat base is $250,000 × 0.025 = <strong>$6,250</strong>.</p>

      <h3>Your Personal Residence</h3>
      <p><strong>Zakat: NONE.</strong> Whether it is a mansion worth $2 million or a small apartment, your primary residence is completely exempt from Zakat. This is by scholarly consensus (Ijma). The same applies to furniture, cars, clothing, and personal belongings inside the home.</p>

      <h2>How Does Zakat Work for Different Real Estate Scenarios?</h2>

      <h3>Zakat on a Rental Apartment Building</h3>
      <p>You own a building with 5 apartments. Each rents for $1,000/month. Annual gross income = $60,000. Expenses (maintenance, management, taxes) = $15,000. Net income = $45,000. You combine this $45,000 with your other Zakatable assets. If the total exceeds Nisab, you pay 2.5% on the combined amount. The building itself is not included in the Zakat calculation.</p>

      <h3>Zakat on Vacant Land You Plan to Sell</h3>
      <p>If you purchased land as an investment to sell later, it is treated as trade goods. Every year on your Zakat date, assess the <strong>current market value</strong> of the land and pay 2.5%. If the land was purchased for $100,000 and is now worth $130,000, Zakat = $130,000 × 0.025 = $3,250. If the land value decreased to $90,000, Zakat = $90,000 × 0.025 = $2,250.</p>

      <h3>Zakat on a Mortgage-Financed Rental Property</h3>
      <p>If you own a rental property with an outstanding mortgage, the Zakat calculation focuses on your <strong>net rental income</strong> (after mortgage payments, if you choose to deduct them — scholars differ). The property value itself is not Zakatable if held for rent. However, if you have equity in the property and are paying down the mortgage, some scholars recommend including your equity portion in your Zakat base if the property is intended for eventual resale. When in doubt, consult a local scholar.</p>

      <h3>Zakat on Commercial Property (Shops, Offices, Warehouses)</h3>
      <p>The same rules as residential rental property apply. If held for rental income, Zakat is on the net income only. If held for resale, Zakat is on the market value. Commercial properties often generate higher rental income, which means the Zakat obligation can be significant. Track your income and expenses carefully.</p>

      <h2>Common Mistakes People Make with Real Estate Zakat</h2>

      <h3>Mistake 1: Paying Zakat on the Full Property Value When It Is for Rent</h3>
      <p>This is the most common error. People see their $500,000 apartment building and think they owe $12,500 in Zakat. If the building is held for rental income, you owe Zakat only on the <strong>net rental savings</strong>, not the property value. Paying on the full value means you are paying far more than required — which is generous but not obligatory.</p>

      <h3>Mistake 2: Not Paying Zakat on Rental Income at All</h3>
      <p>Some people assume that because the property is "real estate," Zakat does not apply. This is incorrect. Rental income is cash wealth, and cash wealth is subject to Zakat. If you have been collecting rent for years without paying Zakat on the accumulated savings, you may owe Zakat for past years. Calculate what you should have paid and make up the difference.</p>

      <h3>Mistake 3: Forgetting to Combine All Zakatable Assets</h3>
      <p>Zakat is not calculated on each asset type separately. You must combine all Zakatable wealth — cash, gold, stocks, rental income savings, business inventory — into one total, check it against Nisab, and pay 2.5% on the combined amount. Do not calculate rental income Zakat in isolation.</p>

      <h3>Mistake 4: Using the Wrong Hawl Start Date</h3>
      <p>Your Hawl (one-year period) starts when your wealth <strong>first reaches Nisab</strong>, not from the beginning of the calendar year. If your total wealth crossed the Nisab threshold in Ramadan, your Zakat year ends next Ramadan. Many people simplify this by choosing a fixed date (like 1st Ramadan or 1st Muharram) and paying on that date every year — this is permitted by most scholars.</p>

      <h2>What Do the Four Schools of Thought Say?</h2>
      <p>There is a well-known difference of opinion among the four Sunni schools (Madhahib) regarding Zakat on rental income:</p>
      <ul>
        <li><strong>Hanafi school:</strong> The most lenient on this issue. Hanafi scholars generally say Zakat is due on rental income only when it has been held for a full year AND meets Nisab. The property itself is never Zakatable if not for trade. Many contemporary Hanafi scholars also allow deducting expenses from rental income before calculating Zakat.</li>
        <li><strong>Shafi'i school:</strong> Similar to Hanafi — Zakat on the income, not the property. However, some Shafi'i scholars are stricter about the Hawl requirement and say each rental payment must individually complete a year.</li>
        <li><strong>Maliki school:</strong> Malikis generally agree that Zakat is on the net income. They also have detailed rules about when income is considered "mixed" with existing wealth for Hawl purposes.</li>
        <li><strong>Hanbali school:</strong> Hanbalis agree that rental income is subject to Zakat. Some Hanbali scholars recommend the monthly extraction method (setting aside 2.5% of each rent payment) to avoid complications with the Hawl.</li>
      </ul>
      <p>The <strong>majority contemporary position</strong> — endorsed by the International Islamic Fiqh Academy (OIC) and most modern Zakat councils — is: <strong>Zakat is due on net rental income when combined with other wealth and meeting Nisab for one Hawl. The property itself is exempt if held for rent.</strong></p>

      <h2>How to Track Your Rental Income for Zakat: Practical Tips</h2>
      <p>Accurate Zakat calculation requires good records. Here is a practical system:</p>
      <ul>
        <li><strong>Open a separate bank account</strong> for rental income. This makes tracking much easier than mixing it with personal funds.</li>
        <li><strong>Record every expense</strong> related to the property: repairs, management fees, insurance, taxes. Keep receipts.</li>
        <li><strong>Set a fixed Zakat date</strong> — many people choose 1st Ramadan or the date they first reached Nisab. Mark it on your calendar.</li>
        <li><strong>Use a spreadsheet</strong> to track monthly net income. At the end of your Zakat year, sum the totals.</li>
        <li><strong>Combine with other assets</strong> on your Zakat date: add cash, gold, stocks, and any other Zakatable wealth to your rental savings total.</li>
        <li><strong>Use our <a href="/en/tools/zakat-calculator">Zakat Calculator</a></strong> to quickly compute your total Zakat obligation once you have your numbers.</li>
      </ul>

      <h2>Zakat on Real Estate vs. Other Investments: A Comparison</h2>
      <p>Understanding how real estate Zakat compares to other investments helps you plan your overall Zakat strategy:</p>
      <ul>
        <li><strong>Cash savings:</strong> 2.5% on the full amount after one Hawl. Simplest form of Zakat.</li>
        <li><strong>Gold and silver:</strong> 2.5% on the market value if you hold 85g+ of gold or 595g+ of silver. <a href="/en/tools/gold-calculator">Use our Gold Calculator</a> to check current values.</li>
        <li><strong>Stocks and shares:</strong> 2.5% on the market value of shares held for trading, or on the income/dividends if held for long-term investment. <a href="/en/blog/zakat-on-stocks-investment-portfolios-2026">Read our guide on Zakat on stocks</a>.</li>
        <li><strong>Cryptocurrency:</strong> 2.5% on the market value, treated like cash/trade goods. <a href="/en/blog/zakat-on-cryptocurrency-digital-assets-2026">Read our crypto Zakat guide</a>.</li>
        <li><strong>Rental property:</strong> 2.5% on net rental income (not property value) when combined with other wealth and meeting Nisab.</li>
        <li><strong>Property for resale:</strong> 2.5% on the current market value annually — same as trade goods.</li>
      </ul>

      <h2>Can You Deduct Expenses from Rental Income Before Calculating Zakat?</h2>
      <p><strong>Yes, the majority of scholars permit deducting direct expenses</strong> from rental income before calculating Zakat. This includes maintenance, management fees, insurance, property taxes, and vacancy losses. What you cannot deduct is personal living expenses, debt payments (other than property-related costs), or money you spent on yourself and your family.</p>
      <p>The logic is simple: Zakat is on <strong>net wealth</strong>, not gross income. If you collected $30,000 in rent but spent $10,000 keeping the property functional, your Zakatable amount from this source is $20,000 — not $30,000.</p>

      <h2>What If You Cannot Afford to Pay Zakat on Rental Income?</h2>
      <p>Zakat is only obligatory if your wealth meets Nisab. If your rental income is fully spent on living expenses and you have no accumulated savings, you may not owe Zakat at all. Zakat is a right of the poor in your wealth — if there is no surplus wealth beyond your needs, there is no Zakat obligation. However, if you have savings from rental income that have been sitting for a year, Zakat is due regardless of your current financial situation.</p>

      <h2>Related Tools and Resources</h2>
      <p>Make your Zakat calculation easier with these free tools:</p>
      <ul>
        <li><strong><a href="/en/tools/zakat-calculator">Zakat Calculator</a></strong> — Calculate your total Zakat on all wealth types including rental income.</li>
        <li><strong><a href="/en/tools/gold-calculator">Gold Calculator</a></strong> — Check current gold prices to determine your Nisab threshold.</li>
        <li><strong><a href="/en/tools/hijri-converter">Hijri Date Converter</a></strong> — Track your Hijri year for accurate Hawl calculation.</li>
        <li><strong><a href="/en/tools/inheritance-calculator">Islamic Inheritance Calculator</a></strong> — Plan your estate according to Islamic law.</li>
        <li><strong><a href="/en/blog/calculate-zakat-on-gold-2026-complete-guide">Complete Guide to Zakat on Gold</a></strong> — Understand how gold holdings affect your Zakat.</li>
      </ul>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <h3>Do I Pay Zakat on My House If I Rent a Room?</h3>
      <p>Your primary residence is always exempt from Zakat, regardless of whether you rent out a room. However, the <strong>rental income you receive</strong> is subject to Zakat like any other cash income — if it meets Nisab and completes a Hawl when combined with your other wealth. The house itself remains exempt.</p>

      <h3>Is Zakat Due on Rental Income I Immediately Spend?</h3>
      <p>If you receive rent and immediately spend it on bills, food, or other expenses — and nothing remains by the end of the month — then there is no accumulated wealth to pay Zakat on. Zakat is on <strong>savings</strong>, not income that is fully consumed. However, if you consistently save a portion of your rental income, that savings is subject to Zakat after one Hawl.</p>

      <h3>How Do I Calculate Zakat on Multiple Rental Properties?</h3>
      <p>Combine the net income from all rental properties into one total. Add this to your other Zakatable assets (cash, gold, stocks). Check the combined total against Nisab. If it meets the threshold, pay 2.5% on the entire amount. You do not calculate Zakat separately for each property.</p>

      <h3>Do I Pay Zakat on the Equity in a Mortgage-Financed Property?</h3>
      <p>If the property is held for rental income, most scholars say no — you pay Zakat on the net rental income only, not on your equity in the property. If the property is held for resale, then yes, Zakat applies to the full market value (or your equity portion, depending on the scholar you follow). This is an area where scholarly opinions vary, so consult a trusted local scholar for your specific situation.</p>

      <h3>What If I Bought Property as a Long-Term Investment but Might Sell It Later?</h3>
      <p>Your Zakat treatment depends on your <strong>current intention</strong>. If you are currently holding it for rental income, it is treated as a rental property (Zakat on income only). If you change your intention to sell, it becomes a trade good (Zakat on market value). If you are genuinely undecided, most scholars recommend treating it as a rental property (the more lenient position) until you make a firm decision to sell.</p>

      <h3>Can I Deduct Mortgage Payments from My Rental Income for Zakat?</h3>
      <p>Scholars differ on this. Some permit deducting the full mortgage payment (principal + interest) as a property-related expense. Others say only deduct the interest portion, or only deduct expenses directly related to maintaining the property (not debt repayment). The safest approach is to consult a scholar who understands both Islamic finance and your local mortgage structure. When in doubt, do not deduct mortgage payments — this results in paying slightly more Zakat, which is the more cautious approach.</p>

      <h3>Is Zakat Due on Commercial Real Estate Differently Than Residential?</h3>
      <p>The Zakat rules are the same regardless of property type. If held for rent, Zakat is on net income. If held for resale, Zakat is on market value. The only difference is practical: commercial properties often have higher rental income, different expense structures (CAM charges, longer vacancy periods), and different market dynamics. Apply the same principles but adjust the numbers accordingly.</p>

      <h3>What Happens If I Did Not Pay Zakat on Rental Income in Previous Years?</h3>
      <p>If you were obligated to pay Zakat on rental income in previous years but did not, you must make up the missed payments. Calculate what you should have paid each year (net rental income × 2.5%, or combined with other assets) and pay the total as soon as possible. This is a debt to the poor and must be fulfilled. If you genuinely did not know the ruling, Allah does not burden a soul beyond its capacity — but now that you know, make up the payments.</p>

      <h3>Should I Pay Zakat on Rental Income Monthly or Annually?</h3>
      <p>Both methods are permissible. <strong>Monthly payment</strong> (setting aside 2.5% of each rent payment) is simpler and spreads the burden. <strong>Annual payment</strong> (calculating total net income at the end of your Hawl) is more precise. Many scholars recommend monthly payment for people with steady rental income because it is easier to manage and ensures you do not forget. The total amount paid should be the same either way.</p>

      <h3>Does Zakat Apply to Airbnb or Short-Term Rental Income?</h3>
      <p>Yes. Short-term rental income (Airbnb, furnished apartments, vacation rentals) is treated the same as long-term rental income for Zakat purposes. The net income — after deducting platform fees, cleaning costs, furnishing expenses, and other direct costs — is subject to Zakat when it meets Nisab and completes a Hawl. The property itself remains exempt if held for rental purposes.</p>

      <h3>How Is Zakat on Real Estate Different from Islamic Inheritance Rules?</h3>
      <p>Zakat and inheritance are completely different Islamic obligations. <strong>Zakat</strong> is an annual wealth tax of 2.5% on surplus wealth, paid during your lifetime. <strong>Inheritance (Faraid)</strong> is the distribution of your estate after death, with fixed shares for heirs specified in the Quran. Real estate you own is subject to Zakat during your life (on income or value, depending on intention) and is distributed according to inheritance rules after your death. <a href="/en/blog/islamic-inheritance-distribution-guide">Read our complete inheritance guide</a> to understand how property is divided among heirs.</p>
    `,
  },
  {
    slug: "how-prayer-times-are-calculated-math-explained",
    title: "How Prayer Times Are Calculated — The Math Behind Every Adhan",
    excerpt:
      "Prayer times are calculated using the sun's position relative to your location. Learn exactly how Fajr, Dhuhr, Asr, Maghrib, and Isha times are determined — the astronomical formulas, angles, and methods used by every prayer app in the world.",
    date: "2026-06-04",
    category: "Islamic",
    readTime: "14 min read",
    keywords: [
      "how are prayer times calculated",
      "what time is fajr prayer calculated",
      "how do prayer apps calculate prayer times",
      "fajr angle 18 degrees vs 15 degrees",
      "how is asr prayer time calculated",
      "prayer time calculation methods",
      "why prayer times differ between apps",
      "how to calculate qibla and prayer times",
      "prayer time calculation formula explained",
      "makkah prayer time vs local calculation",
      "what causes prayer time differences between mosques",
      "hanafi asr time vs standard asr time",
    ],
    content: `
      <h2>How Are Prayer Times Calculated? The Complete Mathematical Explanation</h2>
      <p>Prayer times are calculated using <strong>astronomical formulas based on the sun's position</strong> relative to a specific geographic location. Each of the five daily prayers — Fajr, Dhuhr, Asr, Maghrib, and Isha — corresponds to a specific solar angle or event. <strong>Fajr</strong> begins at true dawn when the sun is 15–18 degrees below the horizon. <strong>Dhuhr</strong> starts when the sun passes its zenith (highest point). <strong>Asr</strong> begins when an object's shadow equals its length (Hanafi: twice its length) plus the noon shadow. <strong>Maghrib</strong> starts at sunset when the sun's disk disappears below the horizon. <strong>Isha</strong> begins when twilight disappears, typically when the sun is 15–18 degrees below the horizon. Every prayer app, mosque timetable, and website uses these same core formulas — the differences come down to which <strong>calculation angles and conventions</strong> they adopt.</p>

      <h2>Why Do Prayer Times Differ Between Apps and Mosques?</h2>
      <p>If you have ever compared prayer times on your phone with your local mosque's timetable and found a 5–15 minute difference, you are not imagining things. The variation comes from several legitimate factors:</p>
      <ul>
        <li><strong>Calculation method:</strong> Different organizations use different sun angles for Fajr and Isha. The Muslim World League uses 18° for Fajr and 17° for Isha. ISNA (North America) uses 15° for both. Umm al-Qura (Makkah) uses a fixed 90-minute offset from Maghrib for Isha. Egypt uses 19.5° for Fajr and 17.5° for Isha.</li>
        <li><strong>Asr school of thought:</strong> The Hanafi school calculates Asr when an object's shadow is <strong>twice</strong> its own length plus the noon shadow. The Shafi'i, Maliki, and Hanbali schools use <strong>once</strong> the length. This can create a difference of 30–60 minutes.</li>
        <li><strong>Geographic coordinates:</strong> Even a small error in latitude/longitude can shift prayer times by several minutes, especially at higher latitudes.</li>
        <li><strong>Altitude and terrain:</strong> Mosques in valleys or high-altitude cities may adjust times based on actual visible sunset vs. calculated sunset.</li>
        <li><strong>Seasonal adjustments:</strong> Some mosques round times slightly for community convenience, especially in summer when days are extremely long.</li>
      </ul>
      <p>None of these approaches is "wrong" — they represent different scholarly interpretations and practical considerations. The key is consistency and following a reliable method.</p>

      <h2>The Five Prayers: Exact Calculation for Each</h2>

      <h3>How Is Fajr Time Calculated?</h3>
      <p>Fajr begins at <strong>Subul-Sadiq</strong> (true dawn) — the horizontal spread of light across the eastern horizon, as opposed to the vertical glow of false dawn (Fajr al-Kadhib) that appears earlier. Astronomically, this corresponds to when the <strong>center of the sun is at a specific angle below the horizon</strong>.</p>
      <p>The most commonly used angles are:</p>
      <ul>
        <li><strong>18 degrees:</strong> Used by the Muslim World League, most of the Middle East, and many South Asian countries. This produces an earlier Fajr time.</li>
        <li><strong>15 degrees:</strong> Used by ISNA (Islamic Society of North America). This produces a later Fajr time, which some scholars prefer for safety.</li>
        <li><strong>19.5 degrees:</strong> Used by the Egyptian General Survey Authority. This produces the earliest Fajr time among major methods.</li>
      </ul>
      <p>The formula calculates the time when the sun's geometric center reaches the chosen angle below the horizon, then adjusts for atmospheric refraction (which bends sunlight and makes the sun appear slightly higher than it actually is). At higher latitudes (above 55°N), these angles can produce Fajr times that are extremely early or do not exist at all during certain weeks in summer — which is why special "high-latitude" rules were developed.</p>

      <h3>How Is Dhuhr Time Calculated?</h3>
      <p>Dhuhr is the simplest prayer to calculate. It begins when the <strong>sun crosses the local meridian</strong> — its highest point in the sky for that day. This is essentially <strong>solar noon</strong>, though it rarely matches exactly 12:00 on your clock.</p>
      <p>The formula accounts for three factors:</p>
      <ul>
        <li><strong>Longitude correction:</strong> Every degree of longitude away from your time zone's reference meridian shifts solar noon by 4 minutes. If you live 5 degrees east of the reference, solar noon occurs 20 minutes before noon. If 5 degrees west, 20 minutes after.</li>
        <li><strong>Equation of time:</strong> Earth's elliptical orbit and axial tilt cause solar noon to vary by up to ±16 minutes throughout the year compared to clock noon.</li>
        <li><strong>Daylight saving time:</strong> If your region observes DST, the clock shifts forward by 1 hour, pushing Dhuhr later on the clock.</li>
      </ul>
      <p>In practice, Dhuhr on your clock might fall anywhere from 11:30 AM to 1:30 PM depending on your location and time of year. Most apps add a small buffer (1–3 minutes) after the exact meridian crossing to ensure the sun has definitively passed its zenith.</p>

      <h3>How Is Asr Time Calculated?</h3>
      <p>Asr begins when the shadow of any vertical object equals a specific multiple of the object's height <strong>plus the shadow length at solar noon</strong>. This is where the major scholarly difference exists:</p>
      <ul>
        <li><strong>Shafi'i, Maliki, and Hanbali (Standard):</strong> Shadow = object height + noon shadow. This is the most common method worldwide and produces an earlier Asr time.</li>
        <li><strong>Hanafi:</strong> Shadow = 2 × object height + noon shadow. This produces a later Asr time, typically 30–60 minutes after the standard method.</li>
      </ul>
      <p>The astronomical formula converts this shadow ratio into a solar elevation angle. For the standard method, the sun angle at Asr varies throughout the year (since the noon shadow length changes with the seasons). In winter, when the sun is lower, Asr starts earlier. In summer, when the sun is higher, Asr starts later.</p>
      <p><strong>Practical example:</strong> In Riyadh on June 21 (summer solstice), standard Asr might begin around 3:15 PM, while Hanafi Asr would begin around 4:00 PM. On December 21 (winter solstice), standard Asr might begin around 2:45 PM, and Hanafi around 3:30 PM.</p>

      <h3>How Is Maghrib Time Calculated?</h3>
      <p>Maghrib begins at <strong>sunset</strong> — when the upper edge of the sun's disk disappears below the horizon. The calculation accounts for:</p>
      <ul>
        <li><strong>Solar angle:</strong> The standard is 0.833° below the horizon (accounting for the sun's apparent radius of 0.267° and average atmospheric refraction of 0.566°).</li>
        <li><strong>Altitude adjustment:</strong> If you are on a mountain or in a high-rise building, you can see the sun set later than someone at sea level. Some apps allow you to input your altitude for precision.</li>
        <li><strong>Terrain:</strong> Mountains to the west can block the sun earlier than the calculated time. Some mosques in mountainous areas adjust Maghrib slightly earlier based on actual observation.</li>
      </ul>
      <p>Maghrib is unique because it is the only prayer that is traditionally tied to <strong>actual visual observation</strong> of the sunset. The Prophet Muhammad (peace be upon him) said: "Prayer time is from when this twilight (Fajr) appears until the shadow becomes equal to the object (Asr)... Maghrib time remains as long as twilight has not disappeared." This is why some scholars emphasize that Maghrib should be prayed promptly — within 15–30 minutes of sunset.</p>

      <h3>How Is Isha Time Calculated?</h3>
      <p>Isha begins when <strong>complete darkness</strong> arrives — when the twilight glow disappears from the western horizon. Like Fajr, this is defined by the sun's angle below the horizon:</p>
      <ul>
        <li><strong>17 degrees:</strong> Muslim World League. This is the most widely used angle globally.</li>
        <li><strong>15 degrees:</strong> ISNA. Produces a later Isha time.</li>
        <li><strong>18 degrees:</strong> Used by some South Asian countries. Produces an earlier Isha time.</li>
        <li><strong>Fixed time (Umm al-Qura):</strong> Isha is set at exactly 90 minutes after Maghrib (or 120 minutes during Ramadan). This method is used in Makkah and some Gulf countries.</li>
        <li><strong>14 degrees:</strong> Used by the University of Islamic Sciences, Karachi. Produces a later Isha time.</li>
      </ul>
      <p>At extreme latitudes (above approximately 55°N), the sun may never reach 17° below the horizon during summer months. This creates a period where "true night" never arrives. Scholars have proposed several solutions: using the nearest day when Isha is calculable, using the nearest city at a normal latitude, or using a fixed proportion of the night. Most major apps implement one of these high-latitude adjustments.</p>

      <h2>What Are the Major Prayer Time Calculation Methods?</h2>
      <p>Different regions and organizations have standardized specific parameter sets. Here are the most widely used methods:</p>

      <h3>Muslim World League (MWL)</h3>
      <p>Used across Europe, the Middle East, and parts of Africa. Fajr angle: 18°. Isha angle: 17°. Asr: standard (shadow = 1× height). This is the default method in many popular apps including Muslim Pro and PrayTimes.org.</p>

      <h3>ISNA (Islamic Society of North America)</h3>
      <p>Used across the United States and Canada. Fajr angle: 15°. Isha angle: 15°. Asr: standard. Designed for North American latitudes with slightly more conservative angles.</p>

      <h3>Egyptian General Survey Authority (EGA)</h3>
      <p>Used in Egypt and parts of North Africa. Fajr angle: 19.5°. Isha angle: 17.5°. Asr: standard. Produces the earliest Fajr among major methods.</p>

      <h3>University of Islamic Sciences, Karachi (UISK)</h3>
      <p>Used in Pakistan, Bangladesh, and parts of India. Fajr angle: 18°. Isha angle: 18°. Asr: standard. Produces an earlier Isha time.</p>

      <h3>Umm al-Qura University (Makkah)</h3>
      <p>Used in Saudi Arabia. Fajr angle: 18.5°. Isha: fixed 90 minutes after Maghrib (120 minutes in Ramadan). Asr: standard. The fixed Isha time is unique to this method.</p>

      <h3>Dubai</h3>
      <p>Used in the UAE. Fajr angle: 18.2°. Isha angle: 18.2°. Asr: standard. Very similar to MWL but with slight adjustments.</p>

      <h3>Qatar</h3>
      <p>Similar to Umm al-Qura but with Fajr at 18° and Isha as a fixed 90 minutes after Maghrib.</p>

      <h3>Kuwait</h3>
      <p>Fajr angle: 18°. Isha angle: 17.5°. Asr: standard.</p>

      <h3>Moonsighting Committee</h3>
      <p>Fajr angle: 18°. Isha angle: 18°. Asr: standard. This method also incorporates moon sighting for Ramadan and Eid determinations.</p>

      <h3>Diyanet (Turkey)</h3>
      <p>Used in Turkey and the Balkans. Fajr angle: 18°. Isha angle: 17°. Asr: standard. Turkey uses the standard European time zone system with these angles.</p>

      <h3>Singapore</h3>
      <p>Fajr angle: 20°. Isha angle: 18°. Asr: standard. The higher Fajr angle (20°) produces a later Fajr time, which is common in Southeast Asian countries.</p>

      <h2>How Do Prayer Apps Handle High Latitude Locations?</h2>
      <p>In cities like London, Oslo, Stockholm, and Anchorage, the sun's behavior in summer and winter creates extreme prayer time challenges. In summer, Fajr can begin at 1:00 AM and Isha may not start until 1:00 AM the next day — leaving almost no night. In winter, the opposite occurs with very short days.</p>
      <p>Scholars and developers have developed several approaches:</p>
      <ul>
        <li><strong>Angle-based division:</strong> The night is divided into sevenths, and Fajr/Isha are assigned to specific portions. This is the "one-seventh" rule used by some scholars.</li>
        <li><strong>Nearest city rule:</strong> Use the prayer times of the nearest city at a "normal" latitude (below 48°) where standard angles work.</li>
        <li><strong>Nearest day rule:</strong> Use the last day when standard angles produced valid results.</li>
        <li><strong>Fixed interval:</strong> Set Fajr at a fixed time before sunrise (e.g., 90 minutes) and Isha at a fixed time after Maghrib (e.g., 90 minutes).</li>
        <li><strong>Combination:</strong> Most apps use a hybrid approach, switching between methods depending on the severity of the latitude issue.</li>
      </ul>
      <p>If you live at a high latitude, consult your local mosque or Islamic center for their recommended approach. Many communities in Scandinavia and northern Canada have established local conventions.</p>

      <h2>How to Verify Your Prayer Times Are Accurate</h2>
      <p>Here is a practical checklist to ensure your prayer times are correct:</p>
      <ul>
        <li><strong>Check your coordinates:</strong> Open your prayer app settings and verify your latitude and longitude. An error of 0.5° can shift times by 2–5 minutes.</li>
        <li><strong>Confirm the calculation method:</strong> Make sure your app uses the method recommended by your local mosque or country. In Saudi Arabia, use Umm al-Qura. In Egypt, use EGA. In the US, ISNA or MWL are common.</li>
        <li><strong>Check Asr setting:</strong> If you follow the Hanafi school, ensure your app is set to Hanafi Asr. Most apps default to the standard (Shafi'i) method.</li>
        <li><strong>Account for altitude:</strong> If you live in a high-rise building or mountainous area, adjust accordingly. Higher altitude = later sunset = later Maghrib.</li>
        <li><strong>Cross-reference:</strong> Compare your app with at least two other sources — your local mosque timetable, another app, and our <a href="/en/tools/prayer-times">Prayer Times tool</a> at Adwatak.</li>
        <li><strong>Seasonal awareness:</strong> Prayer times shift by 30–90 minutes over the course of a year in most locations. Do not rely on a printed timetable from last year.</li>
      </ul>

      <h2>How Qibla Direction Relates to Prayer Time Calculations</h2>
      <p>The same astronomical formulas used to calculate prayer times are also used to determine the <strong>Qibla direction</strong> (direction of the Kaaba in Makkah). Both calculations require knowing your exact latitude and longitude, and both use spherical trigonometry to determine the relationship between your location and a reference point.</p>
      <p>The Qibla calculation uses the <strong>great circle formula</strong> — the shortest path between two points on a sphere. This is why the Qibla direction from North America is northeast (not east, as many people assume), and from Japan it is west-northwest. If you want to find the Qibla direction from your city, use our <a href="/en/tools/qibla-direction">Qibla Direction tool</a> for an accurate, instant result.</p>

      <h2>Common Mistakes People Make with Prayer Times</h2>

      <h3>Mistake 1: Using the Wrong Calculation Method</h3>
      <p>Many Muslims download a prayer app and never check which calculation method it uses. If you live in Saudi Arabia but your app is set to ISNA (North American) settings, your Fajr could be off by 15–20 minutes. Always verify the method matches your region.</p>

      <h3>Mistake 2: Ignoring Hanafi Asr</h3>
      <p>Hanafi Muslims who do not change their app's Asr setting will pray Asr 30–60 minutes too early. This is one of the most common errors. Go into your app's settings and select "Hanafi" for Asr if that is your madhab.</p>

      <h3>Mistake 3: Relying on Outdated Printed Timetables</h3>
      <p>Paper timetables are often printed for an entire month using a single calculation. But prayer times shift by 1–2 minutes per day. Over a month, this accumulates to 30–60 minutes of drift. Always use a live digital source for accuracy.</p>

      <h3>Mistake 4: Not Accounting for Daylight Saving Time</h3>
      <p>When clocks spring forward or fall back, your prayer times shift by a full hour. Some apps handle this automatically; others do not. If you notice a sudden 1-hour jump in your prayer times, check your DST settings.</p>

      <h3>Mistake 5: Confusing Solar Noon with 12:00 PM</h3>
      <p>Dhuhr is based on solar noon, not clock noon. In some cities, solar noon occurs at 11:45 AM or 1:15 PM on your clock. If you assume Dhuhr is always at 12:15, you could be praying outside the valid time.</p>

      <h2>Practical Example: Calculating Prayer Times for Riyadh on June 4, 2026</h2>
      <p>Here is how the math works for a real location. Riyadh, Saudi Arabia (latitude 24.7136°N, longitude 46.6753°E) on June 4, 2026:</p>
      <ul>
        <li><strong>Sunrise:</strong> Calculated at approximately 5:05 AM. The sun's center crosses the horizon (adjusted for refraction at 0.833°).</li>
        <li><strong>Solar noon:</strong> Calculated at approximately 11:53 AM (accounting for Riyadh's longitude offset from the time zone meridian and the equation of time).</li>
        <li><strong>Dhuhr:</strong> 11:53 AM + 2 minute buffer = <strong>11:55 AM</strong></li>
        <li><strong>Asr (standard):</strong> When shadow = object height + noon shadow. Calculated at approximately <strong>3:25 PM</strong></li>
        <li><strong>Asr (Hanafi):</strong> When shadow = 2× object height + noon shadow. Calculated at approximately <strong>4:10 PM</strong></li>
        <li><strong>Sunset:</strong> Calculated at approximately 6:38 PM.</li>
        <li><strong>Maghrib:</strong> 6:38 PM + 2 minute buffer = <strong>6:40 PM</strong></li>
        <li><strong>Isha (Umm al-Qura):</strong> Maghrib + 90 minutes = <strong>8:10 PM</strong></li>
        <li><strong>Isha (MWL 17°):</strong> When sun reaches 17° below horizon = approximately <strong>8:05 PM</strong></li>
        <li><strong>Fajr (Umm al-Qura 18.5°):</strong> When sun reaches 18.5° below horizon = approximately <strong>3:55 AM</strong></li>
      </ul>
      <p>Notice how the different methods produce slightly different times. The Umm al-Qura fixed Isha (8:10 PM) is close to the MWL angle-based Isha (8:05 PM), but they are calculated using completely different approaches.</p>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <h3>Why Do Different Prayer Apps Show Different Times for the Same Location?</h3>
      <p>Different apps use different calculation methods, sun angles, and rounding conventions. For example, one app might use the Muslim World League method (Fajr at 18°) while another uses ISNA (Fajr at 15°), creating a 10–15 minute difference in Fajr. Additionally, some apps round times to the nearest 5 minutes for simplicity, while others show exact minutes. The app's geocoding accuracy also matters — if your coordinates are slightly off, the times will shift. To get the most accurate times, use an app that lets you select your preferred calculation method and verify your coordinates.</p>

      <h3>What Is the Correct Angle for Fajr — 15°, 18°, or 19.5°?</h3>
      <p>There is scholarly debate on this question. The 18° angle is the most widely accepted and is used by the Muslim World League, which represents scholars from over 200 countries. The 15° angle (used by ISNA) is considered more conservative by some scholars because it produces a later Fajr, ensuring you do not start fasting or praying too early. The 19.5° angle (Egyptian method) produces the earliest Fajr. All three are legitimate scholarly positions. The safest approach is to follow the method used by your local mosque or country's official religious authority.</p>

      <h3>How Is Asr Time Different in the Hanafi School?</h3>
      <p>In the Hanafi school, Asr begins when the shadow of an object is equal to <strong>twice</strong> the object's height plus the shadow at solar noon. In the Shafi'i, Maliki, and Hanbali schools, it is <strong>once</strong> the object's height plus the noon shadow. This means Hanafi Asr starts later — typically 30 to 60 minutes after the standard Asr time, depending on the season and latitude. If you are Hanafi, make sure your prayer app has a "Hanafi Asr" setting. Most major apps including Muslim Pro, Athan, and PrayTimes offer this option in their settings.</p>

      <h3>Can I Pray Isha Right After Maghrib?</h3>
      <p>Technically, yes — Isha begins when twilight disappears, which happens at a specific sun angle below the horizon. However, it is recommended (Mustahabb) to delay Isha slightly. The Prophet Muhammad (peace be upon him) said: "If it were not a hardship for my Ummah, I would have delayed this prayer to the middle of the night." Most scholars recommend praying Isha within the first third of the night, and some prefer the first half. In summer at high latitudes, when Isha may start very late, many scholars permit praying Isha earlier for convenience.</p>

      <h3>What Happens to Prayer Times in Places Like Norway or Alaska in Summer?</h3>
      <p>In extreme northern latitudes, the sun may not dip far enough below the horizon for Fajr and Isha to be calculated using standard angles. During certain weeks in summer, there may be no true night — the sun barely sets and immediately rises again. Scholars have ruled that Muslims in these locations should use alternative methods: either the nearest day when normal times are possible, the nearest city at a normal latitude, or divide the night into portions and assign Fajr and Isha to specific segments. Many mosques in Scandinavia and northern Canada have established local conventions — consult your local Islamic center for guidance.</p>

      <h3>How Accurate Are Phone Compass Apps for Qibla Direction?</h3>
      <p>Phone compass apps can be accurate to within 2–5 degrees if properly calibrated, but they are susceptible to magnetic interference from metal objects, electronics, and building structures. For the most accurate Qibla direction, use a dedicated tool like our <a href="/en/tools/qibla-direction">Qibla Direction Calculator</a> at Adwatak, which uses your GPS coordinates and spherical trigonometry to calculate the exact great-circle direction to the Kaaba. This method is more reliable than a magnetic compass, especially indoors.</p>

      <h3>Why Does My Mosque's Fajr Time Differ from My App by 10 Minutes?</h3>
      <p>This is extremely common and usually has a simple explanation. Your mosque may use a different calculation method, a different Fajr angle, or may add a safety buffer to ensure Fajr is not prayed too early. Some mosques also use actual moon sighting and visual dawn observation rather than purely astronomical calculations. Additionally, if your mosque is in a different part of the city or at a different altitude, the times will naturally differ slightly. A 5–10 minute difference is normal and does not mean either source is wrong.</p>

      <h3>How Do I Calculate Prayer Times Manually Without an App?</h3>
      <p>You can calculate approximate prayer times using basic astronomical data. For any location, you need: (1) your latitude and longitude, (2) the date, and (3) the sun's declination for that day (available in astronomical almanacs or online). Using the formula: cos(H) = [sin(−0.833°) − sin(lat) × sin(dec)] / [cos(lat) × cos(dec)], where H is the hour angle, you can calculate sunrise and sunset. From there, Dhuhr is solar noon, Asr uses the shadow ratio formula, and Fajr/Isha use their respective angles. However, this requires trigonometry and is time-consuming — which is why most people use apps or our <a href="/en/tools/prayer-times">Prayer Times tool</a> for instant, accurate results.</p>

      <h3>Is It Permissible to Combine Prayers to Avoid Difficult Times?</h3>
      <p>Combining prayers (Jam') is permitted in specific circumstances according to most scholars. The Hanafi school generally only permits combining at Arafah and Muzdalifah during Hajj. The Shafi'i and Hanbali schools permit combining due to rain, illness, or travel. Some scholars also permit combining for genuine hardship, such as extreme prayer times at high latitudes. If you face genuinely difficult prayer times (e.g., Fajr at 2:00 AM and Isha at 1:00 AM with only 1 hour of sleep), consult a knowledgeable scholar about your specific situation.</p>

      <h3>How Does the Equation of Time Affect Prayer Times?</h3>
      <p>The equation of time accounts for the fact that Earth's orbit is elliptical (not perfectly circular) and its axis is tilted. This means the sun does not cross the meridian at exactly 12:00 clock time every day. The difference ranges from about −14 minutes (in November) to +16 minutes (in February). This affects Dhuhr time directly — solar noon might occur at 11:46 AM or 12:14 PM on your clock. All accurate prayer time calculators account for this. If you are calculating manually, you can find the equation of time value for any date in astronomical tables.</p>

      <h3>What Is the Best Prayer Time App to Use?</h3>
      <p>The best app is one that: (1) uses the calculation method recommended in your country, (2) allows you to select your Asr school (Hanafi vs. standard), (3) updates automatically for daylight saving time, (4) uses accurate GPS coordinates, and (5) is regularly updated. Popular options include Muslim Pro, Athan, PrayTimes, and the built-in prayer time features on most smartphones. You can also use our <a href="/en/tools/prayer-times">Prayer Times tool</a> at Adwatak for a quick, accurate reference without installing anything.</p>

      <h2>Summary</h2>
      <p>Prayer times are not arbitrary — they are calculated using precise astronomical formulas based on the sun's position relative to your exact location. The five daily prayers correspond to specific solar angles and events: Fajr at dawn (sun 15–18° below horizon), Dhuhr at solar noon, Asr when shadows reach a specific ratio, Maghrib at sunset, and Isha at complete darkness (sun 15–18° below horizon). Differences between apps and mosques come from legitimate variations in calculation methods, Fajr/Isha angles, Asr school of thought, and geographic precision. Understanding these formulas helps you verify your times, choose the right settings, and appreciate the remarkable precision built into every adhan. For accurate prayer times and Qibla direction, visit <a href="https://adwatak.cloud">Adwatak.cloud</a> — your free, privacy-first Islamic tools platform.</p>
    `,
  },
  {
    slug: "zakat-on-stocks-investment-portfolios-2026",
    title: "How to Calculate Zakat on Stocks and Investments in 2026",
    excerpt:
      "Zakat on stocks and investment portfolios explained: learn exactly how to calculate Zakat on shares, mutual funds, ETFs, and retirement accounts in 2026 — step-by-step methods, scholar opinions, and practical examples.",
    date: "2026-06-04",
    category: "Islamic Finance",
    readTime: "15 min read",
    keywords: [
      "how to calculate zakat on stocks",
      "zakat on investment portfolio 2026",
      "is zakat due on stocks",
      "zakat on shares and dividends",
      "zakat on mutual funds and etfs",
      "zakat on 401k and retirement accounts",
      "how much zakat on stock market",
      "zakat on stocks scholars opinion",
      "is zakat obligatory on investments",
      "zakat calculation on equity investments",
      "do i pay zakat on my stock portfolio",
      "zakat on stocks hanafi shafi",
    ],
    content: `
      <h2>How Do You Calculate Zakat on Stocks and Investment Portfolios in 2026?</h2>
      <p>Calculating Zakat on stocks and investment portfolios in 2026 depends on your investment intent and the type of asset you hold. If you own stocks as a <strong>long-term investor</strong> (holding shares for their underlying business value), most scholars say you calculate Zakat on your <strong>proportional share of the company's Zakatable assets</strong> — primarily cash, receivables, and inventory. If you are a <strong>short-term trader</strong> (buying and selling shares for price fluctuations), you treat your entire portfolio as <strong>trade goods</strong> and pay 2.5% Zakat on the <strong>total current market value</strong> on your Zakat due date. For mutual funds and ETFs, the same principles apply: calculate based on the fund's underlying assets or its full market value depending on your holding intent. This guide covers every scenario — individual stocks, index funds, retirement accounts, dividends, and the exact calculation methods endorsed by major Islamic finance scholars.</p>

      <h2>Why Is Zakat on Stocks Different from Zakat on Cash?</h2>
      <p>Unlike cash or gold, stocks represent <strong>ownership in a business</strong> — not pure money. A company's balance sheet contains a mix of Zakatable assets (cash, accounts receivable, inventory) and non-Zakatable assets (machinery, buildings, equipment used for production). This distinction matters because Zakat is only due on the Zakatable portion of what you own.</p>
      <p>However, this complexity does not exempt you from Zakat. The obligation remains — the calculation method simply adjusts to reflect the nature of the asset. The two main scholarly approaches are:</p>
      <ul>
        <li><strong>Investment approach (long-term holding):</strong> Calculate Zakat on your proportional share of the company's Zakatable assets only. This is the method preferred by scholars like Dr. Yousef Al-Qaradawi and the Islamic Fiqh Council.</li>
        <li><strong>Trade approach (short-term trading):</strong> Pay 2.5% on the full current market value of your entire portfolio. This applies if you actively buy and sell stocks for profit.</li>
      </ul>
      <p>Most Muslims today hold stocks through brokerage accounts, retirement plans, or index funds. Understanding which approach applies to you is essential for fulfilling your Zakat obligation correctly.</p>

      <h2>How Do You Know If You Are an Investor or a Trader?</h2>
      <p>The distinction between investor and trader determines your Zakat calculation method. Here is how to tell which category you fall into:</p>

      <h3>You Are a Trader If:</h3>
      <ul>
        <li>You buy and sell stocks frequently (weekly, daily, or multiple times per month)</li>
        <li>Your primary goal is to profit from short-term price movements</li>
        <li>You follow market news, charts, and technical analysis to time your trades</li>
        <li>You hold stocks for days or weeks, not years</li>
      </ul>
      <p><strong>Your Zakat method:</strong> Pay 2.5% on the <strong>total market value</strong> of your entire portfolio on your Zakat due date. Treat your holdings like any other trade goods.</p>

      <h3>You Are an Investor If:</h3>
      <ul>
        <li>You buy stocks and hold them for months or years</li>
        <li>Your primary goal is long-term capital appreciation and dividend income</li>
        <li>You analyze company fundamentals, not daily price charts</li>
        <li>You may add to your positions periodically but rarely sell</li>
      </ul>
      <p><strong>Your Zakat method:</strong> Calculate Zakat on your <strong>proportional share of the company's Zakatable assets</strong>. This requires looking at the company's financial statements. The practical shortcut: estimate that approximately 20-30% of a typical company's assets are Zakatable (cash, receivables, inventory), and apply 2.5% to that portion of your holdings.</p>

      <h2>Step-by-Step: How to Calculate Zakat on Individual Stocks</h2>
      <p>Here is the exact process for calculating Zakat on stocks you hold as a long-term investor:</p>

      <h3>Step 1: Determine Your Zakat Due Date</h3>
      <p>Your Zakat year (Hawl) begins when your total Zakatable wealth first reached the Nisab. Many Muslims use a fixed annual date like 1st Ramadan. On this date, you will assess all your holdings.</p>

      <h3>Step 2: List All Your Stock Holdings</h3>
      <p>Make a complete list of every stock you own on your Zakat date, including:</p>
      <ul>
        <li>Individual company shares (Apple, Amazon, Saudi Aramco, etc.)</li>
        <li>Shares held in brokerage accounts (Interactive Brokers, E*TRADE, etc.)</li>
        <li>Shares in retirement accounts (401k, IRA, pension funds)</li>
        <li>Fractional shares</li>
      </ul>

      <h3>Step 3: Find Each Company's Zakatable Assets</h3>
      <p>For each company, look at its most recent quarterly or annual financial statement. You need three numbers:</p>
      <ul>
        <li><strong>Cash and cash equivalents</strong></li>
        <li><strong>Accounts receivable</strong> (money owed to the company)</li>
        <li><strong>Inventory</strong> (goods ready for sale)</li>
      </ul>
      <p>Add these three figures together to get the company's total Zakatable assets. Then calculate your proportional share:</p>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Your Zakatable Share = (Total Zakatable Assets ÷ Total Shares Outstanding) × Your Shares
      </div>

      <h3>Step 4: Apply the 2.5% Rate</h3>
      <p>Sum up your Zakatable share across all stocks, then multiply by 2.5%:</p>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Zakat = Total Zakatable Share × 0.025
      </div>

      <h3>Step 5: Add Dividends Received During the Year</h3>
      <p>Dividends you received and still hold (did not spend) are treated as cash savings. Add them to your total Zakatable wealth and include them in your Zakat calculation at 2.5%.</p>

      <h2>Practical Example: Zakat on a Stock Portfolio</h2>
      <p>Ahmed holds the following stocks on his Zakat due date (1st Ramadan 1447):</p>
      <ul>
        <li><strong>100 shares of Company A:</strong> Market value $5,000. Company A has $200 million in Zakatable assets and 50 million shares outstanding. Ahmed's share: ($200M ÷ 50M) × 100 = <strong>$400</strong></li>
        <li><strong>50 shares of Company B:</strong> Market value $3,000. Company B has $100 million in Zakatable assets and 25 million shares outstanding. Ahmed's share: ($100M ÷ 25M) × 50 = <strong>$200</strong></li>
        <li><strong>200 shares of Company C:</strong> Market value $8,000. Company C has $500 million in Zakatable assets and 200 million shares outstanding. Ahmed's share: ($500M ÷ 200M) × 200 = <strong>$500</strong></li>
      </ul>
      <p><strong>Total Zakatable share: $400 + $200 + $500 = $1,100</strong></p>
      <p><strong>Zakat owed: $1,100 × 2.5% = $27.50</strong></p>
      <p>If Ahmed also has $10,000 in cash savings, $2,000 in gold, and $500 in unpaid dividends, his total Zakatable wealth is $10,000 + $2,000 + $500 + $1,100 = $13,600, and his total Zakat would be <strong>$13,600 × 2.5% = $340</strong>.</p>

      <h2>How Do You Calculate Zakat on Mutual Funds and ETFs?</h2>
      <p>Mutual funds and ETFs pool money from many investors to buy a diversified basket of stocks, bonds, and other securities. Calculating Zakat on these is more complex because you do not directly own the underlying stocks — you own units in the fund.</p>

      <h3>The Simplified Method (Recommended for Most People)</h3>
      <p>Most contemporary scholars, including those on the AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions) board, allow a simplified approach for mutual funds and ETFs:</p>
      <ul>
        <li>Check the fund's latest fact sheet or annual report for its <strong>asset allocation</strong></li>
        <li>Estimate the percentage invested in <strong>equities (stocks)</strong> versus bonds, cash, and other assets</li>
        <li>Apply the 2.5% Zakat rate to the <strong>full current value of your units</strong> if the fund is primarily equity-based (more than 50% stocks)</li>
        <li>If the fund is primarily bond-based or money-market, Zakat is still due on the full value because the units themselves are tradeable assets</li>
      </ul>
      <p>For example, if you hold $20,000 in an S&P 500 index ETF, you would pay <strong>$20,000 × 2.5% = $500</strong> in Zakat. This simplified method is widely accepted and much more practical than trying to calculate the Zakatable assets of every company in the fund.</p>

      <h3>The Detailed Method (For Those Who Want Precision)</h3>
      <p>If you want to be more precise, you can use the fund's holdings data (available on the fund's website) to calculate your proportional share of each underlying company's Zakatable assets. This is time-consuming but more accurate. For a fund holding 500+ stocks, the simplified method is generally considered sufficient by scholars.</p>

      <h2>Is Zakat Due on Retirement Accounts Like 401k and IRA?</h2>
      <p>This is one of the most common questions Muslims ask. Retirement accounts — 401(k), IRA, Roth IRA, 403(b), and pension funds — present a unique Zakat question because the funds are often <strong>locked until retirement age</strong>.</p>

      <h3>The Majority Scholarly Position</h3>
      <p>Most contemporary scholars, including Dr. Yousef Al-Qaradawi and the European Council for Fatwa and Research (ECFR), hold that Zakat is due on retirement accounts <strong>every year</strong>, even before you can access the funds. The reasoning:</p>
      <ul>
        <li>You are the legal owner of the funds, even if access is restricted</li>
        <li>Zakat is due on wealth you own, not only wealth you can immediately spend</li>
        <li>The obligation does not wait until retirement</li>
      </ul>
      <p><strong>Calculation method:</strong> Determine the total value of your retirement account on your Zakat due date. If the account holds primarily stocks or mutual funds, use the simplified method (2.5% of total value). If it holds bonds or money market funds, pay 2.5% of the total value.</p>

      <h3>The Alternative Position</h3>
      <p>Some scholars argue that Zakat on retirement accounts is only due <strong>when you withdraw the funds</strong>, similar to how Zakat on debt is treated. Under this view, you would pay Zakat for all previous years when you actually receive the money. This position is less common but is held by some scholars who view restricted-access wealth differently.</p>

      <h3>Practical Recommendation</h3>
      <p>To be on the safe side, most scholars recommend paying Zakat annually on retirement accounts. If this is financially difficult, you can follow the alternative position and pay accumulated Zakat when you withdraw. Consult a knowledgeable scholar for your specific situation. Use our <a href="/en/tools/zakat-calculator">Zakat Calculator</a> to determine your exact Zakat amount.</p>

      <h2>How Do You Calculate Zakat on Dividends?</h2>
      <p>Dividends are payments made to shareholders from a company's profits. Here is how Zakat applies to dividends:</p>
      <ul>
        <li><strong>Dividends received and still unspent:</strong> If you received dividends during the year and still have the money (in your bank account or reinvested), Zakat is due on the full amount at 2.5% as part of your cash savings.</li>
        <li><strong>Dividends immediately spent:</strong> If you spent the dividends on living expenses right away and do not have a full Hawl's worth accumulated, Zakat is not due on those specific dividends.</li>
        <li><strong>Dividends reinvested (DRIP):</strong> If dividends are automatically reinvested into more shares, they become part of your stock holdings and are Zakatable under the stock calculation methods described above.</li>
      </ul>
      <p>The key principle: Zakat is on <strong>accumulated wealth held for one year</strong>, not on income that was immediately spent.</p>

      <h2>What About Zakat on Islamic Funds and Sharia-Compliant Investments?</h2>
      <p>If you invest in Islamic mutual funds, Sharia-compliant ETFs, or Sukuk (Islamic bonds), the Zakat calculation follows the same principles:</p>
      <ul>
        <li><strong>Islamic equity funds:</strong> These invest only in Sharia-compliant companies. Calculate Zakat on your proportional share of the fund's Zakatable assets, or use the simplified method (2.5% of your units' market value).</li>
        <li><strong>Sukuk (Islamic bonds):</strong> If the Sukuk represents ownership in a tangible asset (like a building or project), Zakat is due on your share of the asset's value. If it is more like a debt instrument, Zakat is due on the full value as cash-equivalent.</li>
        <li><strong>Sharia-compliant robo-advisors:</strong> Platforms like Wahed Invest or Amana funds — calculate Zakat on the total value of your account using the simplified method.</li>
      </ul>
      <p>Being Sharia-compliant does not exempt you from Zakat. In fact, paying Zakat on your Islamic investments is a core part of fulfilling your financial obligations in Islam.</p>

      <h2>Common Mistakes People Make When Paying Zakat on Stocks</h2>
      <p>Avoid these frequent errors:</p>
      <ul>
        <li><strong>Ignoring stocks entirely:</strong> Some people pay Zakat on cash and gold but forget their stock portfolio. Stocks are Zakatable wealth — do not leave them out.</li>
        <li><strong>Using the wrong method:</strong> If you are a day trader, use the trade goods method (2.5% of market value). If you are a long-term investor, use the asset-based method. Mixing them up leads to incorrect calculations.</li>
        <li><strong>Forgetting retirement accounts:</strong> 401(k), IRA, and pension funds are Zakatable. Include them in your calculation.</li>
        <li><strong>Double-counting dividends:</strong> If you already included reinvested dividends in your stock valuation, do not count them again as cash.</li>
        <li><strong>Not accounting for margin or borrowed funds:</strong> If you bought stocks on margin (with borrowed money), subtract the loan amount from your portfolio value before calculating Zakat. You do not owe Zakat on wealth you do not fully own.</li>
        <li><strong>Waiting for the portfolio to recover:</strong> If your portfolio dropped from $50,000 to $20,000, you still calculate Zakat on $20,000 — the current value, not the peak value.</li>
        <li><strong>Confusing Zakat with capital gains tax:</strong> Zakat is 2.5% of your <em>total wealth</em> held for one year. It is not a tax on profits or gains. Even if your portfolio lost money, Zakat is still due if the remaining value meets the Nisab.</li>
      </ul>

      <h2>How Does Zakat on Stocks Compare to Other Zakatable Assets?</h2>
      <p>Here is a quick comparison to help you understand where stocks fit in your overall Zakat calculation:</p>
      <ul>
        <li><strong>Cash and bank accounts:</strong> 2.5% of total balance held for one year</li>
        <li><strong>Gold and silver:</strong> 2.5% of market value if above 85g gold / 595g silver</li>
        <li><strong>Stocks (trader):</strong> 2.5% of total portfolio market value</li>
        <li><strong>Stocks (investor):</strong> 2.5% of proportional share of Zakatable assets</li>
        <li><strong>Mutual funds and ETFs:</strong> 2.5% of total value (simplified method)</li>
        <li><strong>Retirement accounts:</strong> 2.5% of total value (majority position)</li>
        <li><strong>Cryptocurrency:</strong> 2.5% of total market value — see our <a href="/en/blog/zakat-on-cryptocurrency-digital-assets-2026">Complete Crypto Zakat Guide</a></li>
      </ul>
      <p>Add all these amounts together to get your total annual Zakat obligation. For a complete overview of Zakat rules, read our <a href="/en/blog/how-to-calculate-zakat">Complete Guide to Calculating Zakat</a>. To calculate Zakat on gold, see <a href="/en/blog/calculate-zakat-on-gold-2026-complete-guide">How to Calculate Zakat on Gold in 2026</a>.</p>

      <h2>Summary: Your Stock Zakat Checklist</h2>
      <p>Follow this checklist every Zakat year:</p>
      <ul>
        <li>✅ Determine if you are an investor or a trader</li>
        <li>✅ List all stock holdings across all accounts (brokerage, retirement, etc.)</li>
        <li>✅ Calculate using the appropriate method (asset-based for investors, market value for traders)</li>
        <li>✅ Include mutual funds, ETFs, and index funds</li>
        <li>✅ Add retirement account values (401k, IRA, pension)</li>
        <li>✅ Include unspent dividends and cash from sold shares</li>
        <li>✅ Subtract any margin loans or debts against your portfolio</li>
        <li>✅ Add stock Zakat to your total Zakat from all other assets</li>
        <li>✅ Pay 2.5% of the total to eligible recipients</li>
        <li>✅ Keep records for next year</li>
      </ul>
      <p>Use our <a href="/en/tools/zakat-calculator">Zakat Calculator</a> to simplify your calculations and ensure accuracy.</p>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <h3>Is Zakat obligatory on stocks and shares?</h3>
      <p>Yes, Zakat is obligatory on stocks and shares according to the majority of Islamic scholars. If you hold stocks as a long-term investor, you pay Zakat on your proportional share of the company's Zakatable assets (cash, receivables, inventory). If you are a short-term trader, you pay 2.5% on the full market value of your portfolio. The key condition is that your total Zakatable wealth — including stocks, cash, gold, and other assets — must meet the Nisab threshold (85 grams of gold or 595 grams of silver equivalent) and be held for one lunar year.</p>

      <h3>How do I calculate Zakat on my stock portfolio if I do not know the company's financial details?</h3>
      <p>If you cannot access detailed financial statements for every company you invest in, most scholars allow you to use a simplified method: pay 2.5% on the total market value of your equity holdings. This is especially practical for diversified portfolios with many stocks. Alternatively, you can estimate that roughly 20-30% of a typical company's assets are Zakatable and apply 2.5% to that portion. For index funds and ETFs, the simplified method (2.5% of total value) is widely accepted by scholars and is the most practical approach.</p>

      <h3>Do I pay Zakat on stocks that have lost value?</h3>
      <p>Yes. Zakat is based on the <strong>current market value</strong> of your holdings on your Zakat due date, not what you originally paid. If your portfolio was worth $50,000 when you bought in and is now worth $20,000, you calculate Zakat on $20,000 (or your share of the underlying Zakatable assets at current prices). The only exception is if your total combined wealth — across all assets — falls below the Nisab threshold, in which case Zakat is not due.</p>

      <h3>Is Zakat due on my 401(k) or IRA if I cannot access it until retirement?</h3>
      <p>The majority of contemporary scholars say yes — Zakat is due on retirement accounts every year, even before you can withdraw. You owe 2.5% of the account's current value annually. However, some scholars hold the alternative view that Zakat is only due when you actually withdraw the funds. To be cautious, most scholars recommend paying annually. If this is financially difficult, consult a knowledgeable scholar about your specific situation and consider paying accumulated Zakat when you retire and withdraw the funds.</p>

      <h3>How do I calculate Zakat on index funds like the S&P 500?</h3>
      <p>For index funds and ETFs, use the simplified method: pay 2.5% on the total current market value of your units. If you hold $30,000 in an S&P 500 index fund, your Zakat on that holding is $30,000 × 2.5% = $750. This method is endorsed by AAOIFI and most contemporary scholars because it is impractical to calculate the Zakatable assets of every company in a 500-stock index. The simplified method ensures you fulfill your obligation without excessive complexity.</p>

      <h3>Should I pay Zakat on dividends separately or as part of my stock holdings?</h3>
      <p>It depends on what you did with the dividends. If you reinvested them (through a DRIP), they are now part of your stock holdings and are included in your stock Zakat calculation. If you received them as cash and still have the money, add them to your cash savings and pay 2.5% on them as part of your cash Zakat. If you spent them immediately on living expenses, Zakat is not due on those specific dividends. The key is to avoid double-counting: do not include dividends in both your stock value and your cash savings.</p>

      <h3>What if I bought stocks with borrowed money (margin trading)?</h3>
      <p>If you purchased stocks on margin (using borrowed funds), you must subtract the loan amount from your portfolio value before calculating Zakat. You only owe Zakat on the <strong>net value</strong> — the portion you actually own. For example, if your margin portfolio is worth $40,000 but you owe $15,000 on the margin loan, your Zakatable amount is $25,000. Note that margin trading involves interest (riba), which is prohibited in Islam. Scholars strongly advise avoiding margin trading altogether and using only your own capital for investments.</p>

      <h3>Do I pay Zakat on stocks in a child's custodial account (UTMA/UGMA)?</h3>
      <p>Yes. Custodial accounts belong to the child, and Zakat is due on the holdings. In practice, the parent or guardian is responsible for paying Zakat on the child's behalf until the child reaches the age of majority. The calculation method is the same: 2.5% of the proportional Zakatable assets (for long-term holdings) or 2.5% of market value (for trading accounts). If the child's total wealth meets the Nisab, Zakat is obligatory.</p>

      <h3>Is there a difference between how Hanafi and Shafi'i schools treat Zakat on stocks?</h3>
      <p>The basic obligation is the same across all four Sunni schools of thought. However, there are minor differences in methodology. The Hanafi school is generally more expansive in what it considers Zakatable, and some Hanafi scholars recommend using the market value method for all stocks (treating them as trade goods), which simplifies calculation. The Shafi'i and Maliki schools tend to favor the asset-based method for long-term holdings. In practice, both methods are accepted, and you should follow the guidance of the scholar or institution you trust most.</p>

      <h3>Can I deduct my debts from my stock portfolio value before calculating Zakat?</h3>
      <p>There is a scholarly debate on this. The majority position is that <strong>short-term debts</strong> (due within one year) can be deducted from your Zakatable wealth before calculating Zakat. Long-term debts (like a 30-year mortgage) are generally not deducted — you pay Zakat on your full wealth and the debt is handled separately. For margin loans or any debt directly tied to your stock portfolio, most scholars allow deduction. If you have personal loans or credit card debt, you can deduct the amount due within the next 12 months from your total Zakatable wealth.</p>

      <h3>What happens if I cannot afford to pay Zakat on my entire stock portfolio?</h3>
      <p>Zakat is only obligatory if your total net wealth meets the Nisab threshold. If your stock portfolio is your only asset and it has dropped significantly, you may no longer meet the Nisab — in which case Zakat is not due. However, if you have other assets (cash, gold, etc.) that push you above the Nisab, Zakat is obligatory on your total wealth. If paying the full amount is genuinely difficult, Islam allows you to pay what you can and make up the rest later. Zakat is a debt owed to Allah and should be paid as soon as you are able.</p>

      <h3>How do I handle Zakat on stocks if I live in a non-Muslim country?</h3>
      <p>The Zakat obligation is the same regardless of where you live. Calculate your Zakatable wealth using the methods described above, and pay Zakat to eligible recipients as defined in the Quran (9:60). You can pay Zakat to eligible individuals in your local community, to Islamic charities that distribute Zakat, or to Muslims in need anywhere in the world. Many Islamic organizations accept Zakat payments online and distribute them to verified recipients. The calculation method does not change based on your country of residence — only the Nisab threshold in local currency may differ slightly based on gold and silver prices.</p>
    `,
  },
  {
    slug: "zakat-on-cryptocurrency-digital-assets-2026",
    title: "Is Zakat Due on Cryptocurrency? Complete Guide for 2026",
    excerpt:
      "Cryptocurrency zakat explained: learn exactly how to calculate Zakat on Bitcoin, Ethereum, NFTs, and digital assets in 2026 — scholar opinions, step-by-step calculations, and common mistakes to avoid.",
    date: "2026-06-03",
    category: "Islamic Finance",
    readTime: "14 min read",
    keywords: [
      "is zakat due on cryptocurrency",
      "how to calculate zakat on bitcoin",
      "zakat on crypto 2026",
      "zakat on ethereum",
      "is cryptocurrency halal",
      "zakat on nfts",
      "zakat on digital assets",
      "how much zakat on crypto",
      "crypto zakat calculator",
      "zakat on stablecoins",
      "is zakat obligatory on bitcoin",
      "zakat on cryptocurrency scholars",
    ],
    content: `
      <h2>Is Zakat Due on Cryptocurrency in 2026?</h2>
      <p>Yes, Zakat is generally due on cryptocurrency holdings in 2026 according to the majority of contemporary Islamic scholars and fiqh councils. Cryptocurrency — including Bitcoin, Ethereum, stablecoins, and other digital tokens — is considered <strong>mal (wealth)</strong> in Islamic jurisprudence. If your crypto holdings meet the Nisab threshold (equivalent to 85 grams of gold or 595 grams of silver) and you have held them for one lunar year (Hawl), you owe <strong>2.5% Zakat</strong> on the total market value at the time your Zakat year ends. The rate is calculated based on the <strong>current market value in your local currency</strong>, not the price you originally paid. This guide covers everything: scholar opinions, step-by-step calculations, NFTs, DeFi, stablecoins, and the most common mistakes people make.</p>

      <h2>Why Do Scholars Say Cryptocurrency Is Zakatable?</h2>
      <p>The question of whether cryptocurrency is Zakatable has been addressed by several major Islamic institutions and scholars. Here is the reasoning:</p>
      <ul>
        <li><strong>It is mal (wealth):</strong> Cryptocurrency has monetary value, can be exchanged for goods and services, and is actively traded. In Islamic jurisprudence, anything that functions as a medium of exchange or store of value is subject to Zakat.</li>
        <li><strong>It grows and appreciates:</strong> Like cash and gold, cryptocurrency can increase in value. The concept of <strong>nama (growth)</strong> in wealth triggers the obligation of Zakat.</li>
        <li><strong>It is owned and controlled:</strong> You hold the private keys or have custody through an exchange. Ownership (milkiyyah) is a condition for Zakat.</li>
        <li><strong>Major scholarly bodies agree:</strong> The International Islamic Fiqh Academy (IIFA), the European Council for Fatwa and Research (ECFR), and prominent scholars including Dr. Yousef Al-Qaradawi and Mufti Taqi Usmani have all affirmed that cryptocurrency is Zakatable when it meets Nisab conditions.</li>
      </ul>
      <p>The key condition: your crypto must be held as an <strong>investment or store of value</strong>. If you are actively trading it like a day trader (buying and selling within short periods), some scholars treat it as trade goods, which has slightly different Zakat rules — but the 2.5% rate on current market value still applies at the end of your Zakat year.</p>

      <h2>How Do You Calculate Zakat on Cryptocurrency Step by Step?</h2>
      <p>Calculating Zakat on your crypto holdings follows the same principles as any other Zakatable asset. Here is the exact process:</p>

      <h3>Step 1: Determine Your Zakat Due Date</h3>
      <p>Your Zakat year (Hawl) begins on the date your wealth first reached the Nisab threshold. Many Muslims set their Zakat date to <strong>1st Ramadan</strong> or <strong>1st Muharram</strong> for convenience. Mark this date and calculate annually from it.</p>

      <h3>Step 2: Check the Total Value of Your Crypto Holdings</h3>
      <p>On your Zakat due date, check the <strong>total market value</strong> of all your cryptocurrency holdings across all wallets and exchanges. This includes:</p>
      <ul>
        <li>Bitcoin (BTC), Ethereum (ETH), and all altcoins</li>
        <li>Stablecoins (USDT, USDC, DAI, etc.)</li>
        <li>Tokens held in DeFi protocols, staking, or liquidity pools</li>
        <li>NFTs held as investments (not personal use)</li>
        <li>Crypto in cold storage, hot wallets, and exchange accounts</li>
      </ul>
      <p>Use the <strong>spot price at the close of your Zakat date</strong> in your local currency. Do not average prices over the year — use the value on the exact day.</p>

      <h3>Step 3: Compare Against the Nisab Threshold</h3>
      <p>Check if your total crypto value meets or exceeds the Nisab. You can use either the gold or silver standard — most scholars recommend using whichever is <strong>more beneficial to the poor</strong> (i.e., the lower threshold, which is usually silver):</p>
      <ul>
        <li><strong>Gold Nisab:</strong> 85 grams of 24k gold (~$6,375 at $75/gram)</li>
        <li><strong>Silver Nisab:</strong> 595 grams of silver (~$476 at $0.80/gram)</li>
      </ul>
      <p>Using the silver standard means more people will owe Zakat, which increases charity distribution. Many contemporary scholars recommend this approach.</p>

      <h3>Step 4: Apply the 2.5% Rate</h3>
      <p>If your holdings meet the Nisab, calculate 2.5% of the total market value:</p>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Zakat = Total Crypto Value × 0.025
      </div>

      <h3>Step 5: Pay in Your Preferred Currency</h3>
      <p>You can pay Zakat in cryptocurrency itself (sending the equivalent value to eligible recipients) or convert to fiat currency and pay in cash. Both methods are accepted by scholars.</p>

      <h2>What Is the Zakat on $10,000 Worth of Bitcoin?</h2>
      <p>Here is a practical example. Suppose you hold $10,000 worth of Bitcoin on your Zakat due date:</p>
      <ul>
        <li>Total crypto value: <strong>$10,000</strong></li>
        <li>Nisab threshold (silver standard): <strong>~$476</strong></li>
        <li>Does it meet Nisab? <strong>Yes ($10,000 > $476)</strong></li>
        <li>Zakat owed: <strong>$10,000 × 2.5% = $250</strong></li>
      </ul>
      <p>If you also hold $5,000 in Ethereum and $2,000 in stablecoins, your total Zakatable crypto is $17,000, and your Zakat would be <strong>$17,000 × 2.5% = $425</strong>.</p>

      <h2>Do You Pay Zakat on Lost or Inaccessible Crypto?</h2>
      <p>This is a common and important question. If you have lost access to your cryptocurrency — for example, you lost your private keys, forgot your exchange password, or sent funds to a wrong address — the Zakat obligation depends on the situation:</p>
      <ul>
        <li><strong>Permanently lost:</strong> If there is no realistic way to recover the funds, Zakat is not due because you no longer have control over the wealth.</li>
        <li><strong>Temporarily inaccessible:</strong> If you believe you may recover access (e.g., through a password recovery process), Zakat remains due because the wealth still exists and is technically yours.</li>
        <li><strong>Stolen crypto:</strong> If your crypto was stolen and cannot be recovered, Zakat is not due on the stolen amount.</li>
      </ul>
      <p>Keep records of any lost or inaccessible crypto for your own documentation.</p>

      <h2>Is Zakat Due on Stablecoins Like USDT and USDC?</h2>
      <p>Yes. Stablecoins are Zakatable because they function as a store of value and medium of exchange. A stablecoin pegged to the US dollar is treated the same as holding US dollars for Zakat purposes. If you hold $5,000 in USDT, that is equivalent to holding $5,000 in cash — and Zakat is due on it at 2.5% if it meets the Nisab threshold and has been held for one lunar year.</p>
      <p>This is particularly important for Muslims who keep their savings in stablecoins to avoid volatility. The Zakat obligation does not disappear just because the asset is stable.</p>

      <h2>How Do You Calculate Zakat on NFTs and Digital Collectibles?</h2>
      <p>NFTs (Non-Fungible Tokens) are treated differently depending on their purpose:</p>
      <ul>
        <li><strong>NFTs held as investments:</strong> If you purchased NFTs hoping they will appreciate in value, they are Zakatable. Calculate 2.5% of their current market value on your Zakat date.</li>
        <li><strong>NFTs for personal use:</strong> If you bought an NFT for personal enjoyment (e.g., digital art for your collection), most scholars say Zakat is not due on personal-use items.</li>
        <li><strong>Valuation challenge:</strong> NFTs can be illiquid and hard to price. Use the most recent comparable sale price or the floor price of the collection as a reasonable estimate.</li>
      </ul>

      <h2>What About Zakat on Staked or DeFi Crypto?</h2>
      <p>Crypto that is staked, locked in DeFi protocols, or earning yield is still Zakatable. You owe Zakat on the <strong>full current market value</strong> of staked tokens, including any accumulated rewards. The fact that the funds are locked does not remove the Zakat obligation — you still own the wealth.</p>
      <p>For DeFi yield farming or liquidity pool tokens, use the total value of your position (your share of the pool plus any unclaimed rewards) on your Zakat due date.</p>

      <h2>Common Mistakes People Make When Paying Crypto Zakat</h2>
      <p>Avoid these frequent errors:</p>
      <ul>
        <li><strong>Using the purchase price instead of current value:</strong> Zakat is based on the <em>current</em> market value, not what you paid. If you bought Bitcoin at $20,000 and it is now worth $60,000, you calculate Zakat on $60,000.</li>
        <li><strong>Forgetting small wallets:</strong> Add up ALL wallets, exchanges, and DeFi positions. Many people forget about small balances across multiple platforms.</li>
        <li><strong>Not accounting for stablecoins:</strong> Stablecoins are Zakatable. Do not exclude them just because they are "stable."</li>
        <li><strong>Waiting for the "perfect" price:</strong> Calculate Zakat based on the price on your Zakat due date. Do not try to time the market.</li>
        <li><strong>Confusing Zakat with income tax:</strong> Zakat is 2.5% of your <em>total accumulated wealth</em>, not your annual income. It is a wealth tax, not an income tax.</li>
        <li><strong>Not keeping records:</strong> Document your holdings, prices, and calculations on your Zakat date for future reference.</li>
      </ul>

      <h2>Can You Pay Zakat Using Cryptocurrency?</h2>
      <p>Yes, you can pay Zakat using cryptocurrency, but with an important condition: the recipient must <strong>benefit from it</strong>. This means:</p>
      <ul>
        <li>The recipient should be able to convert the crypto to local currency or use it directly.</li>
        <li>Many Islamic charities now accept cryptocurrency donations, including crypto Zakat.</li>
        <li>If the recipient cannot use crypto, you should convert to fiat currency first.</li>
      </ul>
      <p>Always ensure your Zakat reaches eligible recipients as defined in Quran 9:60 — the eight categories including the poor, the needy, and those in debt.</p>

      <h2>How Does Crypto Zakat Compare to Traditional Zakat?</h2>
      <p>The principles are identical. Here is a quick comparison:</p>
      <ul>
        <li><strong>Cash savings:</strong> 2.5% of total savings held for one year</li>
        <li><strong>Gold and silver:</strong> 2.5% of market value if above 85g gold / 595g silver</li>
        <li><strong>Cryptocurrency:</strong> 2.5% of total market value if above Nisab</li>
        <li><strong>Stocks and investments:</strong> 2.5% of current market value</li>
      </ul>
      <p>The only difference is the asset class. The Zakat rate, Nisab threshold, and Hawl (one-year holding period) remain the same. Use our <a href="/en/tools/zakat-calculator">Zakat Calculator</a> to simplify your calculations.</p>

      <h2>What If Your Crypto Portfolio Is Below Nisab?</h2>
      <p>If your total cryptocurrency holdings are below the Nisab threshold on your Zakat due date, you do not owe Zakat on crypto specifically. However, remember that Zakat is calculated on your <strong>total combined wealth</strong> — including cash, gold, silver, investments, and crypto. If your combined assets meet the Nisab, Zakat is due on the total amount, not just the crypto portion.</p>

      <h2>Summary: Your Crypto Zakat Checklist</h2>
      <p>Follow this checklist every Zakat year:</p>
      <ul>
        <li>✅ Determine your Zakat due date (Hawl anniversary)</li>
        <li>✅ Add up ALL crypto across wallets, exchanges, and DeFi</li>
        <li>✅ Check current market value in your local currency</li>
        <li>✅ Include stablecoins, staked tokens, and NFT investments</li>
        <li>✅ Compare total against Nisab (gold or silver standard)</li>
        <li>✅ Calculate 2.5% of total value</li>
        <li>✅ Pay Zakat in crypto or fiat to eligible recipients</li>
        <li>✅ Keep records for next year</li>
      </ul>
      <p>For a complete overview of Zakat rules and calculations, read our <a href="/en/blog/how-to-calculate-zakat">Complete Guide to Calculating Zakat</a>. To calculate Zakat on your gold holdings, see <a href="/en/blog/calculate-zakat-on-gold-2026-complete-guide">How to Calculate Zakat on Gold in 2026</a>. For inheritance distribution, visit our <a href="/en/blog/islamic-inheritance-distribution-guide">Islamic Inheritance Distribution Guide</a>.</p>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <h3>Is Zakat obligatory on Bitcoin and Ethereum?</h3>
      <p>Yes, the majority of contemporary Islamic scholars consider Bitcoin, Ethereum, and other cryptocurrencies to be Zakatable wealth. If your holdings meet the Nisab threshold (85 grams of gold or 595 grams of silver equivalent) and you have held them for one lunar year, you owe 2.5% Zakat on the current market value. This position has been affirmed by the International Islamic Fiqh Academy and numerous individual scholars including Mufti Taqi Usmani and Dr. Yousef Al-Qaradawi. The reasoning is that cryptocurrency functions as a store of value and medium of exchange, which qualifies it as mal (wealth) in Islamic jurisprudence.</p>

      <h3>How do I calculate Zakat on cryptocurrency if the price changes every day?</h3>
      <p>Zakat is calculated based on the market value of your holdings on your specific Zakat due date — the anniversary of when your wealth first reached Nisab. You do not average prices over the year or use the highest/lowest price. Simply check the total value of all your crypto holdings on that exact date and apply the 2.5% rate. Many Muslims choose a fixed date like the 1st of Ramadan to make this easier. If your Zakat date falls on a weekend or holiday, use the closing price of the nearest trading day.</p>

      <h3>Do I pay Zakat on cryptocurrency I bought less than a year ago?</h3>
      <p>This depends on your overall wealth. The Hawl (one-year holding period) applies to your total Zakatable wealth, not to individual assets. If your total wealth has been above Nisab for one full lunar year, you owe Zakat on everything you own on your Zakat date — including crypto you bought last month. However, if you only recently acquired wealth and have not yet completed a full Hawl, Zakat is not yet due. Track your Zakat anniversary date carefully.</p>

      <h3>Is Zakat due on cryptocurrency that has lost value?</h3>
      <p>Yes. Even if your cryptocurrency has decreased in value since you bought it, Zakat is still due if the remaining value meets the Nisab threshold. You calculate Zakat based on the current market value, not your purchase price. For example, if you bought Bitcoin worth $20,000 and it is now worth $8,000, you calculate Zakat on $8,000 — provided this amount still meets the Nisab when combined with your other Zakatable assets.</p>

      <h3>Can I give Zakat in Bitcoin instead of cash?</h3>
      <p>Yes, you can pay Zakat using Bitcoin or other cryptocurrencies, provided the recipient can actually benefit from it. Many Islamic charities now accept crypto donations. The key principle in Islamic law is that Zakat must reach eligible recipients in a form they can use. If the recipient cannot convert or use cryptocurrency, you should convert to fiat currency first. The amount given should equal 2.5% of your total Zakatable wealth valued on your Zakat due date.</p>

      <h3>What if I hold cryptocurrency on an exchange that does not allow withdrawals?</h3>
      <p>If your crypto is on an exchange that restricts withdrawals (due to regulatory issues, platform problems, or other reasons), Zakat is still technically due because you still own the wealth. However, if you genuinely cannot access or use the funds, some scholars provide flexibility — you would pay Zakat on those funds once you regain access. Document the situation carefully and consult a knowledgeable scholar for your specific case.</p>

      <h3>Do I owe Zakat on airdrops and free tokens I received?</h3>
      <p>If you received free tokens through airdrops, forks, or promotional giveaways, Zakat is due on them once you have held them for one lunar year and their combined value meets the Nisab. The Zakat year for these tokens begins when you receive them and gain control over them (i.e., when you can transfer or sell them). If the tokens are worthless or you cannot sell them, Zakat is not due on them.</p>

      <h3>Is Zakat due on cryptocurrency mining rewards?</h3>
      <p>Yes. Cryptocurrency mining rewards are considered earned wealth and are Zakatable. If you mine crypto regularly, each batch of rewards begins its own Hawl period from the date you receive it. However, most scholars allow you to combine all your crypto holdings and calculate Zakat on the total value on a single annual date, which is simpler and more practical for miners.</p>

      <h3>Should I use the gold Nisab or silver Nisab for crypto Zakat?</h3>
      <p>You can use either, but most contemporary scholars recommend using the standard that results in more Zakat being paid (i.e., the lower threshold). Since the silver Nisab is significantly lower in monetary terms than the gold Nisab, using the silver standard means more people will owe Zakat, which benefits more recipients. At current prices, the silver Nisab is approximately $400-500, while the gold Nisab is approximately $6,000-7,000. Using the silver standard is the more cautious and charitable approach.</p>

      <h3>What happens if I cannot afford to pay my full crypto Zakat?</h3>
      <p>Zakat is only obligatory on those who have wealth above the Nisab threshold. If you genuinely cannot pay, note that Zakat is calculated on your net wealth — not your income. If your crypto is your only asset and it has dropped significantly, you may no longer meet the Nisab. However, if you have the means to pay, Zakat is a religious obligation and takes priority over discretionary spending. If you owe Zakat from previous years, make a reasonable plan to pay it as soon as possible.</p>

      <h3>Is there a difference between how Sunni and Shia scholars treat crypto Zakat?</h3>
      <p>The basic principles are similar, but there are some differences. Sunni scholars generally apply the standard 2.5% Zakat rate on cryptocurrency as they would on any other wealth. Shia scholars typically apply Khums (20%) on annual net savings and gains, which includes cryptocurrency profits. The calculation method differs — Shia jurisprudence often calculates based on net increase over the year rather than total holdings. Consult a scholar from your specific tradition for precise guidance.</p>

      <h3>Do I pay Zakat on cryptocurrency held in a hardware wallet?</h3>
      <p>Yes. The storage method — whether your crypto is on an exchange, in a software wallet, or on a hardware wallet like Ledger or Trezor — does not affect the Zakat obligation. If you own the private keys and control the funds, the wealth is Zakatable. Hardware wallets are actually the easiest to track for Zakat purposes because you have full visibility of your holdings at all times.</p>
    `,
  },
  {
    slug: "calculate-zakat-on-gold-2026-complete-guide",
    title: "How to Calculate Zakat on Gold in 2026 — Complete Guide",
    excerpt:
      "Learn exactly how to calculate Zakat on gold in 2026: Nisab thresholds by carat, step-by-step calculations, common mistakes, and practical examples for every type of gold ownership.",
    date: "2026-06-03",
    category: "Islamic Finance",
    readTime: "12 min read",
    keywords: [
      "how to calculate zakat on gold 2026",
      "zakat on gold nisab 2026",
      "zakat on 24k gold",
      "zakat on gold jewelry",
      "gold nisab today",
      "how much zakat on gold",
      "zakat on gold bars",
      "is zakat due on gold jewelry",
      "gold price zakat calculator",
      "zakat on gold coins",
      "nisab gold 85 grams",
      "zakat gold per gram",
    ],
    content: `
      <h2>How Do You Calculate Zakat on Gold in 2026?</h2>
      <p>Calculating Zakat on gold in 2026 is straightforward once you know the Nisab threshold and your gold's current market value. The Nisab for gold is <strong>85 grams of pure (24-carat) gold</strong>. If your gold holdings — including jewelry, bars, coins, and investments — meet or exceed this threshold and you have held them for one lunar year (Hawl), you owe Zakat at a rate of <strong>2.5%</strong> of the total market value.</p>
      <p>For example, if 85 grams of 24k gold is worth $6,375 (at $75/gram), and your total gold holdings are worth $10,000, your Zakat would be <strong>$10,000 × 2.5% = $250</strong>. This guide walks you through every detail: different carat types, mixed gold ownership, jewelry, and common mistakes to avoid.</p>

      <h2>What Is the Nisab Threshold for Gold in 2026?</h2>
      <p>The Nisab is the minimum amount of wealth that makes Zakat obligatory. For gold, the Islamic standard is fixed:</p>
      <ul>
        <li><strong>Gold Nisab:</strong> 85 grams of 24-carat (pure) gold</li>
        <li><strong>Silver Nisab:</strong> 595 grams of pure silver</li>
      </ul>
      <p>Because gold prices fluctuate daily, the <strong>monetary equivalent</strong> of the Nisab changes constantly. Here is how to calculate it:</p>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Nisab (USD) = 85 × current price per gram of 24k gold
      </div>
      <p>At different gold prices, the Nisab threshold looks like this:</p>
      <ul>
        <li>Gold at <strong>$65/gram</strong> → Nisab = $5,525</li>
        <li>Gold at <strong>$75/gram</strong> → Nisab = $6,375</li>
        <li>Gold at <strong>$85/gram</strong> → Nisab = $7,225</li>
        <li>Gold at <strong>$95/gram</strong> → Nisab = $8,075</li>
      </ul>
      <p>Check today's gold price and multiply by 85 to know your exact Nisab threshold. If your total wealth (cash + gold + other Zakatable assets) meets or exceeds this amount, Zakat is due.</p>

      <h2>How Do You Calculate Zakat on Different Carat Types?</h2>
      <p>Not all gold is 24-carat. Jewelry is often 18k, 21k, or 22k, which means it is mixed with other metals. For Zakat calculation, you must determine the <strong>actual pure gold content</strong> in your holdings.</p>

      <h3>Understanding Carat Purity</h3>
      <ul>
        <li><strong>24K:</strong> 99.9% pure gold — full weight counts</li>
        <li><strong>22K:</strong> 91.7% pure gold — multiply weight by 0.917</li>
        <li><strong>21K:</strong> 87.5% pure gold — multiply weight by 0.875</li>
        <li><strong>18K:</strong> 75% pure gold — multiply weight by 0.75</li>
        <li><strong>14K:</strong> 58.3% pure gold — multiply weight by 0.583</li>
      </ul>

      <h3>Formula for Pure Gold Equivalent</h3>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Pure gold weight = Total weight × (Carat ÷ 24)
      </div>

      <h3>Example: Calculating Pure Gold in Jewelry</h3>
      <p>Fatima owns the following gold jewelry:</p>
      <ul>
        <li>22K necklace: 40 grams → 40 × (22÷24) = <strong>36.67g pure gold</strong></li>
        <li>18K bracelet: 25 grams → 25 × (18÷24) = <strong>18.75g pure gold</strong></li>
        <li>24K ring: 10 grams → 10 × (24÷24) = <strong>10g pure gold</strong></li>
        <li>21K earrings: 15 grams → 15 × (21÷24) = <strong>13.13g pure gold</strong></li>
      </ul>
      <p><strong>Total pure gold: 36.67 + 18.75 + 10 + 13.13 = 78.55 grams</strong></p>
      <p>Since 78.55g is <strong>less than 85g</strong>, Fatima's gold jewelry alone does not meet the Nisab. However, if she also has cash, savings, or other Zakatable assets that push her total above the Nisab, Zakat is due on her <strong>entire wealth</strong> including the gold.</p>

      <h2>Is Zakat Due on Gold Jewelry You Wear Daily?</h2>
      <p>This is one of the most debated questions in Islamic jurisprudence. There are two main positions:</p>

      <h3>Position 1: Zakat Is Due on All Gold (Majority Opinion)</h3>
      <p>The majority of scholars — including the Hanafi, Shafi'i, and Hanbali schools — hold that <strong>Zakat is obligatory on all gold and silver</strong>, including jewelry that is worn regularly, as long as it meets the Nisab. This is based on several hadiths where the Prophet ﷺ asked women about their jewelry and instructed them to pay Zakat on it.</p>

      <h3>Position 2: No Zakat on Personal Jewelry (Maliki School)</h3>
      <p>The Maliki school of thought exempts personal jewelry that is worn regularly and not held as an investment. This is based on the analogy with other personal items like clothing and furniture, which are exempt from Zakat.</p>

      <h3>Practical Recommendation</h3>
      <p>Given the strength of the majority opinion, we recommend calculating Zakat on <strong>all gold holdings</strong> including personal jewelry. If you follow the Maliki school, you may exempt regularly worn pieces — but consult a knowledgeable scholar for your specific situation. When in doubt, paying Zakat is the safer path.</p>

      <h2>How Do You Calculate Zakat on Gold Bars and Coins?</h2>
      <p>Gold bars and coins are the simplest to calculate because they are typically 24-carat (99.9% pure) and come with certified weights.</p>

      <h3>Step-by-Step Calculation</h3>
      <ol>
        <li><strong>Weigh your gold:</strong> Use a precise scale or check the certified weight on each bar/coin</li>
        <li><strong>Confirm purity:</strong> Most investment gold is 24k (999.9 fine)</li>
        <li><strong>Calculate total grams:</strong> Add up all bars and coins</li>
        <li><strong>Check Nisab:</strong> Is total ≥ 85 grams? If yes, Zakat is due</li>
        <li><strong>Find current price:</strong> Use today's gold spot price per gram</li>
        <li><strong>Calculate value:</strong> Total grams × price per gram = total value</li>
        <li><strong>Apply Zakat rate:</strong> Total value × 2.5% = Zakat owed</li>
      </ol>

      <h3>Example: Gold Bars and Coins</h3>
      <p>Omar owns:</p>
      <ul>
        <li>One 100g gold bar (24k)</li>
        <li>Two 1 oz gold coins (31.1g each = 62.2g)</li>
        <li>One 10g gold coin (24k)</li>
      </ul>
      <p><strong>Total: 100 + 62.2 + 10 = 172.2 grams of pure gold</strong></p>
      <p>At $75/gram: 172.2 × $75 = <strong>$12,915</strong></p>
      <p><strong>Zakat owed: $12,915 × 2.5% = $322.88</strong></p>

      <h2>How Do You Calculate Zakat on Gold Stocks and ETFs?</h2>
      <p>Many Muslims invest in gold through stocks, ETFs (like GLD or IAU), or digital gold platforms. The Zakat treatment depends on the nature of the investment:</p>

      <h3>Physical Gold ETFs (Backed by Real Gold)</h3>
      <p>If the ETF holds physical gold in a vault, treat it like physical gold. Calculate the grams of gold your shares represent, check against Nisab, and pay 2.5% on the total value.</p>

      <h3>Gold Mining Stocks</h3>
      <p>Gold mining company stocks are <strong>not</strong> the same as owning gold. They are company shares, and Zakat is calculated on the <strong>current market value</strong> of your shares as part of your overall investment portfolio. Pay 2.5% on the total value if you meet Nisab.</p>

      <h3>Digital Gold Platforms</h3>
      <p>If you own digital gold that is fully backed by physical gold held in custody, treat it the same as physical gold. Calculate the grams you own and apply the standard Zakat rate.</p>

      <h2>When Is Zakat on Gold Due? Understanding the Hawl</h2>
      <p>Zakat is only due after you have held the wealth for <strong>one complete lunar year (Hawl)</strong> — approximately 354 days. Key rules:</p>
      <ul>
        <li><strong>Start date:</strong> The day your wealth first reaches the Nisab threshold</li>
        <li><strong>Same date next year:</strong> Zakat becomes due on the same lunar date one year later</li>
        <li><strong>Wealth fluctuations:</strong> Your wealth may go below Nisab during the year — that does not reset the clock, as long as it is above Nisab at the start and end</li>
        <li><strong>Multiple Hawl dates:</strong> If you acquire additional gold at different times, each batch has its own Hawl date (Hanafi opinion) or you can use one unified date (Shafi'i opinion)</li>
      </ul>
      <p>Many Muslims choose <strong>Ramadan</strong> as their Zakat date because of the multiplied rewards for good deeds during this blessed month.</p>

      <h2>Common Mistakes When Calculating Zakat on Gold</h2>
      <p>Avoid these frequent errors that can lead to underpaying or overpaying Zakat:</p>
      <ul>
        <li>❌ <strong>Using purchase price instead of current market value:</strong> Zakat is based on the <strong>current market value</strong> of your gold on the Zakat due date, not what you paid for it</li>
        <li>❌ <strong>Ignoring carat differences:</strong> Counting 18k jewelry at full weight without adjusting for purity — this overstates your Zakat</li>
        <li>❌ <strong>Forgetting gold in safe deposit boxes:</strong> Gold stored anywhere — at home, in a bank vault, or with a relative — is all Zakatable</li>
        <li>❌ <strong>Not including all gold sources:</strong> Gold coins, bars, jewelry, dental gold, and gold-plated items (if significant) should all be counted</li>
        <li>❌ <strong>Calculating on net weight of jewelry settings:</strong> Some people subtract the weight of gemstones or settings — this is correct for stones, but the gold portion must be included</li>
        <li>❌ <strong>Waiting for the "perfect" gold price:</strong> Use the price on your Zakat due date, not the highest or lowest price of the year</li>
      </ul>

      <h2>Zakat on Gold vs Silver: Which Nisab Should You Use?</h2>
      <p>Both gold and silver have Nisab thresholds, and scholars differ on which standard to use for cash and monetary assets:</p>
      <ul>
        <li><strong>Gold Nisab (85g):</strong> Higher monetary threshold — fewer people reach it, so less Zakat is collected</li>
        <li><strong>Silver Nisab (595g):</strong> Lower monetary threshold — more people reach it, so more Zakat is collected</li>
      </ul>
      <p>The majority of contemporary scholars recommend using the <strong>silver Nisab</strong> for cash and monetary assets because it is more precautionary (Ihtiyat) and benefits the poor. However, for gold itself, you must use the gold Nisab of 85 grams.</p>

      <h2>How to Pay Zakat on Gold</h2>
      <p>Once you have calculated your Zakat, you can pay in two ways:</p>
      <ul>
        <li><strong>Cash equivalent:</strong> Calculate the value of your gold and pay 2.5% in cash — this is the most common and practical method</li>
        <li><strong>Physical gold:</strong> Give actual gold equal to 2.5% of your holdings — less common but permissible</li>
      </ul>
      <p>The cash method is preferred because it is more useful to recipients. Zakat should be distributed to the <strong>eight categories</strong> mentioned in Quran 9:60: the poor, the needy, Zakat administrators, those whose hearts are to be reconciled, freeing slaves, debtors, in the cause of Allah, and the wayfarer.</p>

      <h2>Related Tools to Help You</h2>
      <p>Calculating Zakat on gold involves multiple steps: determining purity, checking current prices, and applying the correct rate. These tools can help:</p>
      <ul>
        <li><a href="/en/tools/zakat-calculator" class="text-blue-600 hover:underline">Zakat Calculator</a> — Calculate your total Zakat including gold, cash, and investments</li>
        <li><a href="/en/tools/gold-calculator" class="text-blue-600 hover:underline">Gold Calculator</a> — Determine the value of your gold by carat and weight</li>
        <li><a href="/en/tools/currency-converter" class="text-blue-600 hover:underline">Currency Converter</a> — Convert gold value if you hold assets in multiple currencies</li>
        <li><a href="/en/tools/hijri-converter" class="text-blue-600 hover:underline">Hijri Date Converter</a> — Track your Hawl (lunar year) start and end dates</li>
        <li><a href="/en/tools/inheritance-calculator" class="text-blue-600 hover:underline">Islamic Inheritance Calculator</a> — Plan your estate according to Shariah</li>
      </ul>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <h3>How much Zakat do I pay on 100 grams of 24k gold?</h3>
      <p>First, check if you meet the Nisab: 100 grams exceeds the 85-gram threshold, so Zakat is due. At $75 per gram, 100g is worth $7,500. Your Zakat is <strong>$7,500 × 2.5% = $187.50</strong>. If gold is priced differently in your area, simply multiply 100 by the current price per gram, then multiply by 0.025.</p>

      <h3>Is Zakat due on gold if I have debt?</h3>
      <p>Yes, but with an important nuance. Short-term debts (due within the current year) can be subtracted from your Zakatable wealth before calculating Zakat. Long-term debts (like a mortgage) are treated differently across the four schools of thought. The Hanafi school allows deducting the next 12 months of payments. If after subtracting eligible debts your wealth still meets the Nisab, Zakat is due. Consult a scholar for your specific debt situation.</p>

      <h3>Do I pay Zakat on gold jewelry that I never wear?</h3>
      <p>Absolutely. Gold that is stored, saved, or held as an investment — whether in a safe, bank vault, or drawer — is fully Zakatable. In fact, the exemption debate (in the Maliki school) only applies to jewelry that is <strong>actively worn</strong> on a regular basis. Stored gold has no exemption under any school of thought.</p>

      <h3>What if the gold price drops right before my Zakat date?</h3>
      <p>Zakat is calculated based on the <strong>market value on your Zakat due date</strong>, not the highest value during the year. If gold drops from $85/gram to $70/gram on your Hawl date, you calculate based on $70. This is why some people prefer to pay Zakat in Ramadan — if prices are lower, their Zakat is less, but the reward is greater.</p>

      <h3>Can I pay Zakat on gold in advance?</h3>
      <p>Yes, you can pay Zakat <strong>before your Hawl is complete</strong>, especially if you want to pay during Ramadan for the multiplied rewards. However, you must ensure that at the time of payment, you actually meet the Nisab and that you have held the wealth for the full year by the time your original Hawl date arrives. Pre-paying is permissible and encouraged by many scholars.</p>

      <h3>Is Zakat due on gold-plated items?</h3>
      <p>Gold-plated items contain only a microscopic layer of gold and are generally <strong>not Zakatable</strong> because the gold content is negligible. However, if you own items with significant gold plating (such as certain electronics components or industrial items) where the gold content is substantial and measurable, you should include the pure gold equivalent in your calculation. For everyday gold-plated jewelry, the gold content is too minimal to matter.</p>

      <h3>How do I calculate Zakat on mixed gold (different carats in one piece)?h3>
      <p>For jewelry with mixed carats (e.g., a necklace that is partly 18k and partly 22k), you should separate the weights by carat type if possible. Calculate the pure gold content for each section separately, then add them together. If separation is not practical, use the <strong>lowest carat</strong> in the piece to be on the safe side — this ensures you do not underpay Zakat.</p>

      <h3>Do I pay Zakat on gold I am saving for my daughter's wedding?</h3>
      <p>Yes. The intention behind holding gold does not affect the Zakat obligation. Whether you are saving for a wedding, an emergency, or retirement, if the gold meets the Nisab and you have held it for one lunar year, Zakat is due. The purpose of the savings is irrelevant to the calculation — what matters is ownership, Nisab, and Hawl.</p>

      <h3>What is the difference between Zakat on gold and Zakat al-Fitr?</h3>
      <p>These are two completely different obligations. <strong>Zakat on gold</strong> (Zakat al-Mal) is 2.5% of your wealth held for one lunar year. <strong>Zakat al-Fitr</strong> is a fixed amount (approximately one Sa' of food, or its cash equivalent of $5–$15 depending on your country) paid by every Muslim — rich or poor — before Eid al-Fitr prayer. Zakat al-Fitr is obligatory on every Muslim regardless of wealth, while Zakat on gold only applies if you meet the Nisab.</p>

      <h3>Can I give my gold Zakat to a family member?</h3>
      <p>Yes, you can give Zakat to eligible family members <strong>who are not your dependents</strong>. You cannot give Zakat to your spouse, children, or parents because you are already obligated to support them. However, you can give Zakat to siblings, cousins, uncles, aunts, and other relatives who are poor or needy. In fact, giving Zakat to a poor relative carries <strong>double reward</strong> — the reward of charity and the reward of maintaining family ties (Silat al-Rahim).</p>

      <h3>How do I track my gold Zakat year if I buy and sell gold frequently?</h3>
      <p>If you trade gold frequently (buying and selling within the same year), the Hawl requirement may not apply to individual pieces. However, if you maintain a <strong>consistent balance</strong> of gold that meets the Nisab, most scholars say Zakat is due on that balance. The simplest approach: pick a fixed date (like 1 Ramadan), calculate your total gold holdings on that date each year, and pay 2.5% if you meet the Nisab. This is the method used by most gold investors and businesses.</p>
    `,
  },
  {
    slug: "islamic-inheritance-distribution-guide",
    title: "Islamic Inheritance Distribution — Complete Shariah Guide 2026",
    excerpt:
      "Learn how Islamic inheritance works: fixed shares, heirs categories, step-by-step distribution with real examples, and common mistakes to avoid.",
    date: "2026-06-02",
    category: "Islamic",
    readTime: "11 min read",
    keywords: [
      "islamic inheritance",
      "shariah inheritance distribution",
      "mirath",
      "faraid",
      "islamic will",
      "estate planning islam",
      "inheritance calculator",
    ],
    content: `
      <h2>What Is Islamic Inheritance (Al-Mirath)?</h2>
      <p>In Islam, the distribution of a deceased person's estate is not left to personal preference or cultural tradition. Allah ﷻ Himself outlined precise rules for inheritance in the Quran, making <strong>Al-Mirath</strong> (the inherited estate) one of the most detailed areas of Islamic law.</p>
      <p>The science of inheritance distribution is called <strong>Al-Faraid</strong> (الفرائض), derived from the Arabic word "Faridah" meaning an obligatory duty. It is a precise mathematical system that ensures every rightful heir receives their divinely ordained share.</p>
      <p>Understanding Islamic inheritance is essential for every Muslim — not just scholars. When a family member passes away, knowing the correct shares prevents disputes, injustice, and the sin of consuming wealth unlawfully.</p>

      <h2>The Three Types of Heirs in Islam</h2>
      <p>Islamic inheritance law categorizes heirs into three distinct groups based on how they receive their share:</p>

      <h3>1. Ashab al-Furud (أصحاب الفروض) — Fixed-Share Heirs</h3>
      <p>These heirs receive a <strong>specific, predetermined fraction</strong> mentioned in the Quran. There are 12 fixed-share heirs in total:</p>
      <ul>
        <li><strong>Husband:</strong> 1/2 (if no children) or 1/4 (if children exist)</li>
        <li><strong>Wife:</strong> 1/4 (if no children) or 1/8 (if children exist)</li>
        <li><strong>Father:</strong> 1/6 (if children exist) or residual share (if no children)</li>
        <li><strong>Mother:</strong> 1/6 (if children or multiple siblings exist) or 1/3 (if no children and no multiple siblings)</li>
        <li><strong>Daughter:</strong> 1/2 (if only one daughter, no son) or 2/3 shared among multiple daughters</li>
        <li><strong>Full sister:</strong> 1/2 (if only one, no father, no children) or 2/3 shared among multiple sisters</li>
        <li><strong>Paternal grandmother:</strong> 1/6</li>
        <li><strong>Maternal grandmother:</strong> 1/6</li>
        <li><strong>Paternal half-sister:</strong> 1/6 (if only one, with a full sister)</li>
        <li><strong>Maternal half-sibling:</strong> 1/6 (if 1–3 siblings) or 1/3 (if 4+ siblings)</li>
      </ul>

      <h3>2. Asabat (العصبات) — Residual Heirs</h3>
      <p>These heirs receive whatever remains <strong>after</strong> the fixed-share heirs have been given their portions. The primary residual heirs are:</p>
      <ul>
        <li><strong>Son</strong> (and his male descendants)</li>
        <li><strong>Father</strong> (when no children exist)</li>
        <li><strong>Full brother</strong> (when no father or children exist)</li>
        <li><strong>Paternal half-brother</strong></li>
        <li><strong>Uncle and his male descendants</strong></li>
      </ul>
      <p>A key rule: <strong>a son makes his sister a residual heir too</strong>. If there is one son and one daughter, the daughter receives half of what the son receives (2:1 ratio based on Quran 4:11).</p>

      <h3>3. Dhawu al-Arham (ذوو الأرحام) — Distant Kindred</h3>
      <p>These are relatives who are neither fixed-share nor residual heirs. They inherit <strong>only if</strong> there are no fixed-share or residual heirs remaining. Examples include maternal uncles, aunts, and their children.</p>

      <h2>Step-by-Step: How to Distribute an Islamic Estate</h2>
      <p>Follow these steps to correctly distribute an estate according to Shariah:</p>

      <h3>Step 1: Deduct Funeral and Administrative Expenses</h3>
      <p>From the total estate, first deduct reasonable funeral costs, burial expenses, and any administrative fees for settling the estate.</p>

      <h3>Step 2: Pay Off Debts</h3>
      <p>All outstanding debts must be paid before distribution — whether owed to people or to Allah (unpaid Zakat, unfulfilled vows, unperformed Hajj).</p>

      <h3>Step 3: Execute the Wasiyyah (Will)</h3>
      <p>The deceased's will can allocate <strong>up to one-third</strong> of the remaining estate to non-heirs (charity, friends, etc.). The remaining two-thirds goes to the legal heirs.</p>

      <h3>Step 4: Distribute to Fixed-Share Heirs</h3>
      <p>Calculate and distribute the fixed Quranic shares to all eligible heirs.</p>

      <h3>Step 5: Distribute the Remainder to Residual Heirs</h3>
      <p>Whatever remains goes to the residual heirs (sons, brothers, etc.). If there are no residual heirs, the remainder is redistributed among fixed-share heirs proportionally (a process called <strong>Al-Awl</strong> or <strong>Al-Radd</strong>, depending on the school of thought).</p>

      <h2>Practical Example: Distributing $360,000</h2>
      <p>Let us work through a real example. A man passes away leaving:</p>
      <ul>
        <li><strong>Estate after debts and expenses:</strong> $360,000</li>
        <li><strong>Heirs:</strong> Wife, 2 daughters, father, mother</li>
      </ul>

      <h3>Calculating the Shares</h3>
      <ul>
        <li><strong>Wife:</strong> 1/8 (because children exist) → $360,000 × 1/8 = <strong>$45,000</strong></li>
        <li><strong>2 Daughters:</strong> 2/3 shared equally → $360,000 × 2/3 = <strong>$240,000</strong> ($120,000 each)</li>
        <li><strong>Father:</strong> 1/6 → $360,000 × 1/6 = <strong>$60,000</strong></li>
        <li><strong>Mother:</strong> 1/6 → $360,000 × 1/6 = <strong>$60,000</strong></li>
      </ul>

      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Total shares: 1/8 + 2/3 + 1/6 + 1/6 = 3/24 + 16/24 + 4/24 + 4/4 = 27/24
      </div>

      <p>The sum exceeds 1 (27/24), so we apply <strong>Al-Awl</strong> (proportional reduction). The base is adjusted from 24 to 27:</p>
      <ul>
        <li><strong>Wife:</strong> 3/27 → $360,000 × 3/27 = <strong>$40,000</strong></li>
        <li><strong>2 Daughters:</strong> 16/27 → $360,000 × 16/27 = <strong>$213,333</strong> ($106,667 each)</li>
        <li><strong>Father:</strong> 4/27 → $360,000 × 4/27 = <strong>$53,333</strong></li>
        <li><strong>Mother:</strong> 4/27 → $360,000 × 4/27 = <strong>$53,333</strong></li>
      </ul>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 my-4">
        <p class="font-bold text-green-800">Total distributed: $40,000 + $213,333 + $53,333 + $53,333 = $360,000 ✓</p>
      </div>

      <h2>Common Mistakes in Islamic Inheritance</h2>
      <p>Many Muslim families unknowingly distribute estates incorrectly. Here are the most common errors:</p>
      <ul>
        <li>❌ <strong>Ignoring the will limit:</strong> Allocating more than 1/3 to non-heirs without heirs' consent</li>
        <li>❌ <strong>Excluding female heirs:</strong> Some cultures deny daughters or sisters their rightful share — this is a major sin</li>
        <li>❌ <strong>Not paying debts first:</strong> Distributing the estate before settling debts</li>
        <li>❌ <strong>Confusing schools of thought:</strong> Al-Radd (redistribution of surplus) is applied differently across the four madhabs</li>
        <li>❌ <strong>Forgetting the son-daughter ratio:</strong> A son receives twice the share of a daughter (Quran 4:11)</li>
        <li>❌ <strong>Assuming grandchildren are excluded:</strong> If a son predeceased the grandfather, his children may still have rights (this varies by madhab)</li>
      </ul>

      <h2>Who Cannot Inherit in Islam?</h2>
      <p>There are specific conditions that prevent inheritance:</p>
      <ul>
        <li><strong>Difference of religion:</strong> A non-Muslim does not inherit from a Muslim relative, and vice versa (according to the majority opinion)</li>
        <li><strong>Homicide:</strong> The killer does not inherit from their victim, even if accidental (majority opinion includes accidental killing)</li>
        <li><strong>Slavery:</strong> A slave does not inherit (historical ruling)</li>
      </ul>

      <h2>The Importance of Writing an Islamic Will (Wasiyyah)</h2>
      <p>The Prophet Muhammad ﷺ said: <em>"It is not permissible for any Muslim who has something to bequeath to sleep for two nights except that his will is written and kept ready with him."</em> (Sahih al-Bukhari 2738)</p>
      <p>An Islamic will should include:</p>
      <ul>
        <li>Your debts and who should pay them</li>
        <li>Bequests up to 1/3 of the estate (to charity, non-heirs, etc.)</li>
        <li>A declaration that the remaining 2+ thirds will be distributed according to Faraid</li>
        <li>Appointment of an executor (Wasi) to oversee the distribution</li>
        <li>Guardianship arrangements for minor children</li>
      </ul>

      <h2>Related Tools You May Find Useful</h2>
      <p>Planning your estate involves more than just inheritance. You may also want to explore:</p>
      <ul>
        <li><a href="/en/tools/zakat-calculator" class="text-blue-600 hover:underline">Zakat Calculator</a> — Ensure your Zakat obligations are met during your lifetime</li>
        <li><a href="/en/tools/hijri-converter" class="text-blue-600 hover:underline">Hijri Date Converter</a> — Track important dates for estate planning</li>
        <li><a href="/en/tools/gold-calculator" class="text-blue-600 hover:underline">Gold Calculator</a> — Value your gold assets for accurate estate calculation</li>
        <li><a href="/en/tools/currency-converter" class="text-blue-600 hover:underline">Currency Converter</a> — Convert assets held in multiple currencies</li>
      </ul>

      <h2>Frequently Asked Questions (FAQ)</h2>

      <h3>Q1: Can I leave all my money to one person in my will?</h3>
      <p>No. In Islamic law, you can only bequeath up to <strong>one-third</strong> of your estate through a will, and it cannot go to someone who is already a legal heir (unless other heirs consent). The remaining two-thirds must be distributed according to the fixed Quranic shares.</p>

      <h3>Q2: Do daughters inherit the same as sons?</h3>
      <p>No. According to Quran 4:11, a son receives <strong>twice the share</strong> of a daughter. This is because men are financially responsible for maintaining their wives, children, and sometimes extended family. The daughter's share is her own — no one can claim it.</p>

      <h3>Q3: What happens if there are no heirs at all?</h3>
      <p>If no fixed-share, residual, or distant kindred heirs exist, the estate goes to <strong>Bait al-Mal</strong> (the public treasury) for the benefit of the Muslim community. In the absence of a functioning Bait al-Mal, it should be distributed to Islamic charities.</p>

      <h3>Q4: Can I give my house to my daughter while I am alive?</h3>
      <p>Yes. During your lifetime, you can gift your property to anyone — including your children. However, the majority of scholars recommend <strong>equal treatment</strong> among children in lifetime gifts to avoid injustice. This is separate from inheritance rules, which only apply after death.</p>

      <h3>Q5: What is Al-Awl and Al-Radd?</h3>
      <p><strong>Al-Awl</strong> (العول) is applied when the total fixed shares exceed 1 (the whole estate). All shares are proportionally reduced. <strong>Al-Radd</strong> (الرد) is applied when fixed shares total less than 1 and there are no residual heirs — the surplus is redistributed among fixed-share heirs proportionally. The application of Al-Radd varies between the four schools of Islamic jurisprudence.</p>

      <h3>Q6: Does a non-Muslim family member inherit from a Muslim?</h3>
      <p>According to the majority of scholars, a non-Muslim does not inherit from a Muslim relative, and a Muslim does not inherit from a non-Muslim relative. This is based on the hadith: "A Muslim does not inherit from a disbeliever, and a disbeliever does not inherit from a Muslim." (Sahih al-Bukhari)</p>

      <h3>Q7: How do I calculate inheritance if the deceased had debts?</h3>
      <p>Debts must be paid <strong>first</strong> from the estate before any distribution. This includes money owed to people, unpaid Zakat, unfulfilled vows (Nadhr), and the cost of unperformed Hajj if the deceased was able to perform it. Only the remaining amount is distributed among heirs.</p>

      <h2>Try Our Islamic Inheritance Calculator</h2>
      <p>Calculating Islamic inheritance manually can be complex — especially when dealing with Al-Awl, multiple heirs, and different scenarios. Use our <a href="/en/tools/inheritance-calculator" class="text-blue-600 hover:underline">free Islamic Inheritance Calculator</a> to get accurate, Shariah-compliant results in seconds. Simply enter the estate value and select the heirs, and the calculator will compute every share automatically.</p>
    `,
  },
  {
    slug: "simple-vs-compound-interest",
    title: "Simple Interest vs Compound Interest — Complete Guide 2026",
    excerpt:
      "Understand the difference between simple and compound interest with real examples, comparison tables, and practical tips. Learn how compound interest can build wealth or drown you in debt.",
    date: "2026-05-31",
    category: "Finance",
    readTime: "9 min read",
    keywords: ["simple interest", "compound interest", "interest calculator", "investment", "loans", "credit cards"],
    content: `
      <h2>What Are Simple and Compound Interest?</h2>
      <p>When you deposit money in a bank or take out a loan, there is something called <strong>interest</strong>. But not all interest works the same way. There are two basic types: <strong>simple interest</strong> and <strong>compound interest</strong>. The difference between them can save or cost you thousands of dollars over time.</p>
      <p>This topic matters to anyone who deals with money — whether you are investing, saving in a bank, or taking out a loan.</p>

      <h2>Simple Interest Explained</h2>
      <p><strong>Simple interest</strong> is calculated on the <strong>principal amount only</strong> and does not accumulate on previous interest.</p>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Interest = Principal × Rate × Time
      </div>
      <p>Example: $10,000 at 5% for 3 years = $1,500 interest | Total: $11,500</p>

      <h2>Compound Interest — The Eighth Wonder</h2>
      <p><strong>Compound interest</strong> is calculated on the <strong>principal + accumulated interest</strong>. It is interest on interest!</p>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Final Amount = Principal × (1 + Rate)^Time
      </div>
      <p>Same example with compounding: Total after 3 years = <strong>$11,576.25</strong> ($76.25 more)</p>

      <h2>Comparison Over Time</h2>
      <ul>
        <li>1 year: difference = $0</li>
        <li>5 years: difference = +$262.81</li>
        <li>10 years: difference = +$1,288.95</li>
        <li>20 years: difference = +$6,532.98</li>
        <li>30 years: difference = <strong>+$18,219.40!</strong></li>
      </ul>

      <h2>Compound Interest Is a Double-Edged Sword</h2>
      <ul>
        <li>✅ <strong>As an investor:</strong> Returns grow exponentially — start early</li>
        <li>❌ <strong>As a borrower:</strong> Credit cards use daily compounding!</li>
      </ul>

      <h2>Important Tips</h2>
      <ul>
        <li>🔑 Pay off credit card balance in full each month</li>
        <li>🔑 Ask about interest type before any loan</li>
        <li>🔑 Start investing early even with small amounts</li>
        <li>🔑 Reinvest returns — do not withdraw earnings</li>
      </ul>

      <h2>Try Our Calculators</h2>
      <p>Use our <a href="/en/tools/compound-interest" class="text-blue-600 hover:underline">Compound Interest Calculator</a> to see how compounding grows your money. Also check out the <a href="/en/tools/mortgage-calculator" class="text-blue-600 hover:underline">Mortgage Calculator</a> if you are planning a home loan.</p>
    `,
  },
  {
    slug: "how-to-calculate-zakat",
    title: "How to Calculate Zakat Step by Step — Complete Guide 2026",
    excerpt:
      "Everything you need to know about calculating Zakat: conditions, Nisab threshold, types of wealth, and practical examples. Calculate your Zakat easily.",
    date: "2026-05-30",
    category: "Islamic",
    readTime: "10 min read",
    keywords: ["zakat", "zakat calculator", "nisab", "zakat al mal", "zakat gold"],
    content: `
      <h2>What Is Zakat?</h2>
      <p>Zakat is the third pillar of Islam. It is a fixed percentage of wealth that has reached the Nisab threshold and been held for one lunar year, given to those in need.</p>
      <p>Understanding <strong>how to calculate Zakat</strong> is essential for every Muslim who has savings, investments, or assets.</p>

      <h2>Conditions for Zakat Obligation</h2>
      <ul>
        <li>✅ <strong>Islam</strong> — Zakat is obligatory upon Muslims</li>
        <li>✅ <strong>Freedom</strong> — not required from slaves</li>
        <li>✅ <strong>Adulthood and sanity</strong></li>
        <li>✅ <strong>Reaching the Nisab</strong> — minimum wealth threshold</li>
        <li>✅ <strong>One lunar year (Hawl)</strong> has passed</li>
        <li>✅ <strong>Complete ownership</strong> of the wealth</li>
      </ul>

      <h2>What Is the Nisab?</h2>
      <p>The Nisab is the minimum amount of wealth that makes Zakat obligatory:</p>
      <ul>
        <li><strong>Gold Nisab:</strong> 85 grams of 24-carat gold</li>
        <li><strong>Silver Nisab:</strong> 595 grams of pure silver</li>
      </ul>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        If gold price = $75/g → Nisab = 85 × $75 = $6,375
      </div>

      <h2>Zakat Rate</h2>
      <p>The Zakat rate on cash wealth is <strong>2.5%</strong> (one quarter of one-tenth).</p>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        Example: $10,000 × 2.5% = $250
      </div>

      <h2>How to Calculate Zakat Step by Step</h2>
      <ol>
        <li><strong>Determine your Hawl start date</strong></li>
        <li><strong>Add up all your wealth</strong> — cash, gold, stocks, rental properties, recoverable debts</li>
        <li><strong>Subtract short-term debts</strong></li>
        <li><strong>Compare to Nisab</strong> — if equal or more, Zakat is due</li>
        <li><strong>Multiply by 2.5%</strong> — this is your Zakat amount</li>
      </ol>

      <h2>Practical Example</h2>
      <p>Ahmed has: $5,000 checking + $3,000 savings + $2,000 stocks + $4,000 gold + $2,400 rental - $1,000 debt = <strong>$15,400</strong></p>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 my-4">
        <p class="font-bold text-green-800">Ahmed's Zakat = $15,400 × 2.5% = $385</p>
      </div>

      <h2>Who Receives Zakat?</h2>
      <p>Eight categories defined in the Quran: the poor, the needy, Zakat administrators, those whose hearts are to be reconciled, slaves, debtors, in the cause of Allah, and the wayfarer.</p>

      <h2>Try Our Zakat Calculator</h2>
      <p>Use our <a href="/en/tools/zakat-calculator" class="text-blue-600 hover:underline">free Zakat Calculator</a> to calculate your Zakat accurately in seconds. Also see our <a href="/en/tools/inheritance-calculator" class="text-blue-600 hover:underline">Inheritance Calculator</a> for Islamic estate planning.</p>
    `,
  },
  {
    slug: "how-to-calculate-mortgage",
    title: "How to Calculate a Mortgage — Complete Guide 2026",
    excerpt:
      "Everything you need to know about mortgage calculations: monthly payments, interest rates, amortization schedules, and tips before taking a home loan.",
    date: "2026-05-29",
    category: "Finance",
    readTime: "8 min read",
    keywords: ["mortgage", "mortgage calculator", "home loan", "monthly payment", "amortization"],
    content: `
      <h2>What Is a Mortgage?</h2>
      <p>A mortgage is a loan from a bank or lender used to purchase real estate (house, apartment, land). The lender pays the property price, and you repay in monthly installments over many years.</p>

      <h2>How to Calculate Monthly Payments</h2>
      <p>The monthly payment is calculated using this formula:</p>
      <div class="bg-gray-100 rounded-xl p-4 my-4 text-center font-mono text-lg">
        M = P × [r(1+r)^n] ÷ [(1+r)^n - 1]
      </div>
      <p>Where: M = monthly payment, P = loan amount, r = monthly interest rate, n = number of payments</p>

      <h2>Practical Example</h2>
      <p>Property price: $200,000 with $40,000 down payment at 5.5% interest for 25 years:</p>
      <ul>
        <li><strong>Loan amount:</strong> $160,000</li>
        <li><strong>Monthly payment:</strong> approximately $982</li>
        <li><strong>Total repayment:</strong> approximately $294,600</li>
        <li><strong>Total interest:</strong> approximately $134,600</li>
      </ul>

      <h2>Important Tips</h2>
      <ul>
        <li>✅ Compare lenders — interest rates vary significantly</li>
        <li>✅ Use our <a href="/en/tools/mortgage-calculator" class="text-blue-600 hover:underline">Mortgage Calculator</a></li>
        <li>✅ Make a larger down payment to reduce interest</li>
        <li>✅ Ask about fixed vs variable rates</li>
      </ul>

      <h2>Try the Calculator Now</h2>
      <p>Use our <a href="/en/tools/mortgage-calculator" class="text-blue-600 hover:underline">Mortgage Calculator</a> to find your monthly payments. Also try the <a href="/en/tools/loan-calculator" class="text-blue-600 hover:underline">Loan Calculator</a> for personal loans.</p>
    `,
  },
  {
    slug: "best-free-arabic-tools-2026",
    title: "40+ Free Online Tools Every Professional Needs in 2026",
    excerpt: "Your complete guide to 40+ free online tools: financial calculators, Islamic tools, converters, generators, and text tools. All free, no signup required.",
    date: todayEnStr(),
    category: "Tech",
    readTime: "12 min read",
    keywords: ["free online tools", "free tools", "online calculators", "arabic tools", "web tools"],
    content: `
      <h2>Introduction</h2>
      <p>We all need quick, free online tools to get work done. The problem? Most tool directories are outdated, full of broken links, or require paid subscriptions.</p>
      <p><strong>Adwatak</strong> is the largest Arabic free tools platform — 40+ tools, completely free, in Arabic and English, no signup required. Here is the complete guide to every tool on the platform.</p>

      <h2>1. Financial Calculators — Precision Financial Planning</h2>
      <ul>
        <li><strong><a href="/en/tools/mortgage-calculator">Mortgage Calculator</a></strong> — Calculate monthly payments based on loan amount, interest rate, and term. Ideal for KSA, UAE, and Egypt.</li>
        <li><strong><a href="/en/tools/loan-calculator">Loan Calculator</a></strong> — Personal loans, car loans, education loans — know your payment before you apply.</li>
        <li><strong><a href="/en/tools/installment-calculator">Installment Calculator</a></strong> — Calculate store installments with total interest.</li>
        <li><strong><a href="/en/tools/vat-calculator">VAT Calculator</a></strong> — Add or remove VAT (15% for KSA) from any amount.</li>
        <li><strong><a href="/en/tools/salary-calculator">Salary Calculator</a></strong> — Calculate net salary after deductions.</li>
        <li><strong><a href="/en/tools/compound-interest">Compound Interest Calculator</a></strong> — See how your money grows exponentially over time.</li>
        <li><strong><a href="/en/tools/profit-margin">Profit Margin Calculator</a></strong> — For business owners: cost, selling price, margin, and markup.</li>
        <li><strong><a href="/en/tools/currency-converter">Currency Converter</a></strong> — Real-time conversions between SAR, USD, EGP, AED, and more.</li>
        <li><strong><a href="/en/tools/gold-calculator">Gold Calculator</a></strong> — Calculate gold value by carat, weight, and current price.</li>
      </ul>

      <h2>2. Islamic Tools — Faith-Based Utilities</h2>
      <ul>
        <li><strong><a href="/en/tools/inheritance-calculator">Islamic Inheritance Calculator</a></strong> — Shariah-compliant inheritance distribution by Islamic law.</li>
        <li><strong><a href="/en/tools/zakat-calculator">Zakat Calculator</a></strong> — Calculate your Zakat accurately: Nisab, Hawl, wealth types, 2.5% rate.</li>
        <li><strong><a href="/en/tools/hijri-converter">Hijri Converter</a></strong> — Convert between Hijri and Gregorian dates.</li>
        <li><strong><a href="/en/tools/prayer-times">Prayer Times</a></strong> — Accurate prayer times for your city.</li>
        <li><strong><a href="/en/tools/qibla-direction">Qibla Direction</a></strong> — Compass direction to Mecca from anywhere.</li>
        <li><strong><a href="/en/tools/age-calculator">Age Calculator</a></strong> — Calculate age in Hijri and Gregorian.</li>
      </ul>

      <h2>3. Text Tools — For Writers and Designers</h2>
      <ul>
        <li><strong><a href="/en/tools/word-counter">Word Counter</a></strong> — Count words, characters, and paragraphs.</li>
        <li><strong><a href="/en/tools/text-case">Text Case Converter</a></strong> — Title case, uppercase, lowercase, and more.</li>
        <li><strong><a href="/en/tools/number-to-words">Number to Words</a></strong> — Convert numbers to English words ($1,234 → one thousand two hundred thirty-four).</li>
        <li><strong><a href="/en/tools/text-cleaner">Text Cleaner</a></strong> — Remove formatting, extra spaces, and special characters.</li>
        <li><strong><a href="/en/tools/text-compare">Text Compare</a></strong> — Compare two texts and highlight differences.</li>
      </ul>

      <h2>4. Converters and File Tools</h2>
      <ul>
        <li><strong><a href="/en/tools/unit-converter">Unit Converter</a></strong> — Length, weight, temperature, area — convert between any units.</li>
        <li><strong><a href="/en/tools/color-converter">Color Converter</a></strong> — Convert between HEX, RGB, HSL.</li>
      </ul>

      <h2>5. Developer Tools</h2>
      <ul>
        <li><strong><a href="/en/tools/json-formatter">JSON Formatter</a></strong> — Format, validate, and minify JSON.</li>
        <li><strong><a href="/en/tools/base64-encoder">Base64 Encoder</a></strong> — Encode and decode Base64.</li>
        <li><strong><a href="/en/tools/hash-generator">Hash Generator</a></strong> — Generate MD5, SHA-1, SHA-256 hashes.</li>
      </ul>

      <h2>6. Generators</h2>
      <ul>
        <li><strong><a href="/en/tools/qr-generator">QR Code Generator</a></strong> — Generate QR codes for any URL or text.</li>
        <li><strong><a href="/en/tools/password-generator">Password Generator</a></strong> — Strong, secure passwords.</li>
        <li><strong><a href="/en/tools/whatsapp-link">WhatsApp Link Generator</a></strong> — Direct WhatsApp links with pre-filled messages.</li>
        <li><strong><a href="/en/tools/random-number">Random Number Generator</a></strong> — Random numbers for giveaways, testing, or decisions.</li>
      </ul>

      <h2>Why Choose Adwatak?</h2>
      <ul>
        <li>✅ <strong>100% Free</strong> — No hidden fees, no premium tiers.</li>
        <li>✅ <strong>No Signup</strong> — Open and use instantly. No email, no phone.</li>
        <li>✅ <strong>Privacy First</strong> — All tools run in your browser. Data never leaves your device.</li>
        <li>✅ <strong>Bilingual</strong> — Fully supported in Arabic and English.</li>
      </ul>

      <h2>Summary</h2>
      <p><a href="https://adwatak.cloud">Adwatak</a> is the most comprehensive free tools platform for the Middle East and North Africa. Whether you need to calculate a mortgage, zakat, generate a QR code, or check your text length — all the tools you need in one place, for free.</p>
    `,
  },
];
