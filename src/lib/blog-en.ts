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
