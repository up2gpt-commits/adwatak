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
