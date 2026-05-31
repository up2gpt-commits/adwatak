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
];
