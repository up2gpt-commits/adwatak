"use client";

export interface HeirSelection {
  husband: boolean;
  wife: boolean;
  wifeCount: number;
  sons: number;
  daughters: number;
  father: boolean;
  mother: boolean;
  grandfather: boolean;
  grandmotherPaternal: boolean;
  grandmotherMaternal: boolean;
  fullBrothers: number;
  fullSisters: number;
  paternalBrothers: number;
  paternalSisters: number;
  maternalBrothers: number;
  maternalSisters: number;
}

export interface HeirResult {
  name: string;
  nameEn: string;
  icon: string;
  share: number;
  amount: number;
  percentage: number;
  color: string;
  group: string;
}

const defaultHeirs: HeirSelection = {
  husband: false,
  wife: false,
  wifeCount: 1,
  sons: 0,
  daughters: 0,
  father: false,
  mother: false,
  grandfather: false,
  grandmotherPaternal: false,
  grandmotherMaternal: false,
  fullBrothers: 0,
  fullSisters: 0,
  paternalBrothers: 0,
  paternalSisters: 0,
  maternalBrothers: 0,
  maternalSisters: 0,
};

export function getDefaultHeirs(): HeirSelection {
  return { ...defaultHeirs };
}

function hasChildren(h: HeirSelection): boolean {
  return h.sons > 0 || h.daughters > 0;
}

function hasSons(h: HeirSelection): boolean {
  return h.sons > 0;
}

// Strong male blockers (يحجبون الإخوة)
function hasMaleBlocker(h: HeirSelection): boolean {
  return h.sons > 0 || h.father || h.grandfather;
}

interface RawShare {
  name: string;
  nameEn: string;
  icon: string;
  raw: number;       // numerator
  denom: number;     // denominator (for fractional display)
  group: string;
}

const COLORS = [
  "#2563eb", "#7c3aed", "#059669", "#d97706",
  "#dc2626", "#0891b2", "#db2777", "#65a30d",
  "#0d9488", "#9333ea", "#ca8a04", "#4f46e5",
  "#e11d48", "#0284c7", "#16a34a", "#ea580c",
];

export function calculateInheritance(heirs: HeirSelection, estateAmount: number): HeirResult[] {
  const raw: RawShare[] = [];
  let hasAsabah = false;
  let asabahGroup: string[] = [];

  const children = hasChildren(heirs);
  const sons = hasSons(heirs);
  const maleBlocker = hasMaleBlocker(heirs);
  const parentPresent = heirs.father || heirs.mother;
  const childrenPresent = children;

  // ===== SPOUSES (Quranic fixed shares) =====
  if (heirs.husband) {
    raw.push({
      name: "الزوج", nameEn: "Husband", icon: "👨",
      raw: children ? 1 : 2, denom: children ? 8 : 4, group: "spouse",
    });
  }

  if (heirs.wife) {
    const count = Math.max(1, heirs.wifeCount);
    const share = children ? 1/8 : 1/4;
    for (let i = 0; i < count; i++) {
      raw.push({
        name: count > 1 ? `الزوجة ${i+1}` : `الزوجة`,
        nameEn: count > 1 ? `Wife ${i+1}` : "Wife",
        icon: "👩",
        raw: children ? 1 : 2,
        denom: children ? 8 * count : 4 * count,
        group: "spouse",
      });
    }
  }

  // ===== PARENTS (Quranic) =====
  if (heirs.father) {
    if (children) {
      // Father gets 1/6 when there are children
      raw.push({
        name: "الأب", nameEn: "Father", icon: "👨‍🦳",
        raw: 1, denom: 6, group: "parents",
      });
      // Father is also asabah if there are no sons
      if (!sons) {
        hasAsabah = true;
        asabahGroup.push("father");
      }
    } else {
      // No children: father is pure asabah
      hasAsabah = true;
      asabahGroup.push("father");
    }
  }

  if (heirs.mother) {
    const siblingCount = heirs.fullBrothers + heirs.fullSisters + heirs.paternalBrothers + heirs.paternalSisters + heirs.maternalBrothers + heirs.maternalSisters;
    if (children || siblingCount >= 2) {
      raw.push({
        name: "الأم", nameEn: "Mother", icon: "👩‍🦳",
        raw: 1, denom: 6, group: "parents",
      });
    } else {
      // No children, less than 2 siblings → mother gets 1/3
      raw.push({
        name: "الأم", nameEn: "Mother", icon: "👩‍🦳",
        raw: 1, denom: 3, group: "parents",
      });
    }
  }

  // ===== GRANDPARENTS =====
  if (heirs.grandfather && !heirs.father) {
    if (children) {
      raw.push({
        name: "الجد", nameEn: "Grandfather", icon: "👴",
        raw: 1, denom: 6, group: "parents",
      });
    } else {
      hasAsabah = true;
      asabahGroup.push("grandfather");
    }
  }

  if (heirs.grandmotherPaternal && !heirs.mother) {
    raw.push({
      name: "الجدة (لأب)", nameEn: "Paternal Grandmother", icon: "👵",
      raw: 1, denom: 6, group: "parents",
    });
  }

  if (heirs.grandmotherMaternal && !heirs.mother) {
    raw.push({
      name: "الجدة (لأم)", nameEn: "Maternal Grandmother", icon: "👵",
      raw: 1, denom: 6, group: "parents",
    });
  }

  // ===== CHILDREN =====
  if (heirs.sons > 0) {
    // Sons take the remainder (asabah)
    hasAsabah = true;
    asabahGroup.push("sons");
  }

  if (heirs.daughters > 0 && !sons) {
    // Daughters without sons: Quranic fixed shares
    const shareRaw = heirs.daughters === 1 ? 1 : 2;
    const shareDenom = heirs.daughters === 1 ? 2 : 3;
    for (let i = 0; i < heirs.daughters; i++) {
      raw.push({
        name: heirs.daughters > 1 ? `البنت ${i+1}` : `البنت`,
        nameEn: heirs.daughters > 1 ? `Daughter ${i+1}` : "Daughter",
        icon: "👧",
        raw: shareRaw,
        denom: shareDenom * heirs.daughters,
        group: "children",
      });
    }
  }

  // ===== FULL SIBLINGS =====
  if (heirs.fullBrothers > 0 && !maleBlocker) {
    hasAsabah = true;
    asabahGroup.push("fullBrothers");
  }

  if (heirs.fullSisters > 0 && !maleBlocker) {
    if (heirs.fullBrothers > 0) {
      // With brothers: asabah (male gets 2x female)
      hasAsabah = true;
      asabahGroup.push("fullSisters");
    } else {
      // Without brothers: Quranic share
      const shareRaw = heirs.fullSisters === 1 ? 1 : 2;
      const shareDenom = heirs.fullSisters === 1 ? 2 : 3;
      for (let i = 0; i < heirs.fullSisters; i++) {
        raw.push({
          name: heirs.fullSisters > 1 ? `أخت شقيقة ${i+1}` : `أخت شقيقة`,
          nameEn: heirs.fullSisters > 1 ? `Full Sister ${i+1}` : "Full Sister",
          icon: "👩",
          raw: shareRaw,
          denom: shareDenom * heirs.fullSisters,
          group: "siblings",
        });
      }
    }
  }

  // ===== PATERNAL SIBLINGS =====
  const noFullBrotherBlocker = heirs.fullBrothers === 0 && !maleBlocker;
  if (noFullBrotherBlocker) {
    if (heirs.paternalBrothers > 0) {
      hasAsabah = true;
      asabahGroup.push("paternalBrothers");
    }
    if (heirs.paternalSisters > 0) {
      if (heirs.paternalBrothers > 0) {
        hasAsabah = true;
        asabahGroup.push("paternalSisters");
      } else if (heirs.fullSisters === 0) {
        // Without full sisters or brothers: Quranic share
        const shareRaw = heirs.paternalSisters === 1 ? 1 : 2;
        const shareDenom = heirs.paternalSisters === 1 ? 2 : 3;
        for (let i = 0; i < heirs.paternalSisters; i++) {
          raw.push({
            name: heirs.paternalSisters > 1 ? `أخت لأب ${i+1}` : `أخت لأب`,
            nameEn: heirs.paternalSisters > 1 ? `Paternal Sister ${i+1}` : "Paternal Sister",
            icon: "👩",
            raw: shareRaw,
            denom: shareDenom * heirs.paternalSisters,
            group: "siblings",
          });
        }
      }
    }
  }

  // ===== MATERNAL SIBLINGS =====
  // Only inherit when no child, no father, no grandfather
  if (!childrenPresent && !heirs.father && !heirs.grandfather) {
    const matCount = heirs.maternalBrothers + heirs.maternalSisters;
    if (matCount > 0) {
      // Each maternal sibling gets 1/6, but total max 1/3
      const eachRaw = 1;
      const eachDenom = 6;
      const totalRaw = matCount * eachRaw;
      const maxDenom = 1/3;
      // Use 1/6 each but cap at 1/3
      const effectiveDenom = Math.max(eachDenom, totalRaw / maxDenom);
      for (let i = 0; i < heirs.maternalBrothers; i++) {
        raw.push({
          name: heirs.maternalBrothers > 1 ? `أخ لأم ${i+1}` : `أخ لأم`,
          nameEn: heirs.maternalBrothers > 1 ? `Maternal Brother ${i+1}` : "Maternal Brother",
          icon: "👨",
          raw: eachRaw,
          denom: effectiveDenom,
          group: "siblings",
        });
      }
      for (let i = 0; i < heirs.maternalSisters; i++) {
        raw.push({
          name: heirs.maternalSisters > 1 ? `أخت لأم ${i+1}` : `أخت لأم`,
          nameEn: heirs.maternalSisters > 1 ? `Maternal Sister ${i+1}` : "Maternal Sister",
          icon: "👩",
          raw: eachRaw,
          denom: effectiveDenom,
          group: "siblings",
        });
      }
    }
  }

  // ===== Compute Shares =====
  // Step 1: Calculate total from fixed Quranic shares
  const fixedTotal = raw.reduce((s, r) => s + r.raw / r.denom, 0);

  // Step 2: Calculate asabah (remainder)
  const remainder = Math.max(0, 1 - fixedTotal);

  // Step 3: Build result list with amounts
  const results: HeirResult[] = [];
  let colorIdx = 0;

  // Add all fixed shares
  for (const r of raw) {
    const shareValue = r.raw / r.denom;
    results.push({
      name: r.name,
      nameEn: r.nameEn,
      icon: r.icon,
      share: shareValue,
      amount: estateAmount * shareValue,
      percentage: shareValue * 100,
      color: COLORS[colorIdx % COLORS.length],
      group: r.group,
    });
    colorIdx++;
  }

  // Step 4: Distribute asabah
  if (remainder > 0.001 && hasAsabah) {
    // Calculate how much each asabah group gets
    // Group: sons (with daughters), father, full brothers (with full sisters), paternal brothers

    type AsabahGroup = {
      name: string;
      nameEn: string;
      icon: string;
      weight: number;      // 2 for male, 1 for female within same group
      baseName: string;
      count: number;
      gender: "male" | "female";
    };

    const asabahHeirs: AsabahGroup[] = [];

    // Sons (and daughters if present)
    if (heirs.sons > 0) {
      for (let i = 0; i < heirs.sons; i++) {
        asabahHeirs.push({
          name: heirs.sons > 1 ? `الابن ${i+1}` : `الابن`,
          nameEn: heirs.sons > 1 ? `Son ${i+1}` : "Son",
          icon: "👦",
          weight: 2,
          baseName: "son",
          count: heirs.sons,
          gender: "male",
        });
      }
      if (heirs.daughters > 0) {
        for (let i = 0; i < heirs.daughters; i++) {
          asabahHeirs.push({
            name: heirs.daughters > 1 ? `البنت ${i+1}` : `البنت`,
            nameEn: heirs.daughters > 1 ? `Daughter ${i+1}` : "Daughter",
            icon: "👧",
            weight: 1,
            baseName: "daughter",
            count: heirs.daughters,
            gender: "female",
          });
        }
      }
    } else if (asabahGroup.includes("father") && !heirs.father) {
      // Grandfather as asabah
      asabahHeirs.push({
        name: "الجد", nameEn: "Grandfather (asabah)", icon: "👴",
        weight: 1, baseName: "grandfather", count: 1, gender: "male",
      });
    }

    // Full brothers (and full sisters if present)
    if (heirs.fullBrothers > 0 && !maleBlocker) {
      for (let i = 0; i < heirs.fullBrothers; i++) {
        asabahHeirs.push({
          name: heirs.fullBrothers > 1 ? `أخ شقيق ${i+1}` : `أخ شقيق`,
          nameEn: heirs.fullBrothers > 1 ? `Full Brother ${i+1}` : "Full Brother",
          icon: "🧑",
          weight: 2, baseName: "fullBrother", count: heirs.fullBrothers, gender: "male",
        });
      }
      if (heirs.fullSisters > 0) {
        for (let i = 0; i < heirs.fullSisters; i++) {
          asabahHeirs.push({
            name: heirs.fullSisters > 1 ? `أخت شقيقة ${i+1}` : `أخت شقيقة`,
            nameEn: heirs.fullSisters > 1 ? `Full Sister ${i+1}` : "Full Sister",
            icon: "👩",
            weight: 1, baseName: "fullSister", count: heirs.fullSisters, gender: "female",
          });
        }
      }
    }

    // Paternal brothers (and sisters)
    if (heirs.paternalBrothers > 0 && !maleBlocker && heirs.fullBrothers === 0) {
      for (let i = 0; i < heirs.paternalBrothers; i++) {
        asabahHeirs.push({
          name: heirs.paternalBrothers > 1 ? `أخ لأب ${i+1}` : `أخ لأب`,
          nameEn: heirs.paternalBrothers > 1 ? `Paternal Brother ${i+1}` : "Paternal Brother",
          icon: "🧑",
          weight: 2, baseName: "paternalBrother", count: heirs.paternalBrothers, gender: "male",
        });
      }
      if (heirs.paternalSisters > 0) {
        for (let i = 0; i < heirs.paternalSisters; i++) {
          asabahHeirs.push({
            name: heirs.paternalSisters > 1 ? `أخت لأب ${i+1}` : `أخت لأب`,
            nameEn: heirs.paternalSisters > 1 ? `Paternal Sister ${i+1}` : "Paternal Sister",
            icon: "👩",
            weight: 1, baseName: "paternalSister", count: heirs.paternalSisters, gender: "female",
          });
        }
      }
    }

    // Distribute remainder by weight
    const totalWeight = asabahHeirs.reduce((s, h) => s + h.weight, 0);
    if (totalWeight > 0) {
      const perWeight = remainder / totalWeight;
      for (const h of asabahHeirs) {
        const shareValue = perWeight * h.weight;
        results.push({
          name: h.name,
          nameEn: h.nameEn,
          icon: h.icon,
          share: shareValue,
          amount: estateAmount * shareValue,
          percentage: shareValue * 100,
          color: COLORS[colorIdx % COLORS.length],
          group: "asabah",
        });
        colorIdx++;
      }
    }
  }

  // Step 5: الرد (Radd) — If no asabah and total < 100%, return remainder to Quranic heirs
  const currentTotal = results.reduce((s, r) => s + r.share, 0);
  const finalRemainder = Math.max(0, 1 - currentTotal);

  if (finalRemainder > 0.001 && !hasAsabah) {
    // Distribute remainder to all Quranic heirs proportionally (excluding spouse if there are other heirs)
    const nonSpouseResults = results.filter(r => r.group !== "spouse");
    const spouseResults = results.filter(r => r.group === "spouse");

    if (nonSpouseResults.length > 0) {
      const nonSpouseTotal = nonSpouseResults.reduce((s, r) => s + r.share, 0);
      if (nonSpouseTotal > 0) {
        for (const r of nonSpouseResults) {
          const additional = finalRemainder * (r.share / nonSpouseTotal);
          r.share += additional;
          r.amount = estateAmount * r.share;
          r.percentage = r.share * 100;
        }
      }
    } else if (spouseResults.length > 0) {
      // Only spouse exists — spouse takes all
      for (const r of spouseResults) {
        const additional = finalRemainder * (r.share / spouseResults.reduce((s, x) => s + x.share, 0));
        r.share += additional;
        r.amount = estateAmount * r.share;
        r.percentage = r.share * 100;
      }
    }
  }

  // Step 6: العول (Awl) — If total exceeds 100%, proportionally reduce all shares
  const finalTotal = results.reduce((s, r) => s + r.share, 0);
  if (finalTotal > 1.001) {
    const factor = 1 / finalTotal;
    for (const r of results) {
      r.share *= factor;
      r.amount = estateAmount * r.share;
      r.percentage = r.share * 100;
    }
  }

  // Step 7: Merge duplicate heirs (same person with fixed + asabah shares, e.g. father)
  const merged: HeirResult[] = [];
  const seen = new Map<string, number>();
  for (const r of results) {
    const key = r.name;
    if (seen.has(key)) {
      const idx = seen.get(key)!;
      merged[idx].share += r.share;
      merged[idx].amount += r.amount;
      merged[idx].percentage += r.percentage;
    } else {
      seen.set(key, merged.length);
      merged.push({ ...r });
    }
  }

  // Sort by share descending
  merged.sort((a, b) => b.share - a.share);

  return merged;
}
