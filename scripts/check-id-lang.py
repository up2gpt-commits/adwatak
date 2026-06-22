#!/usr/bin/env python3
"""Check which /id/tools/ pages are still in English."""
import os, re

tools_dir = "/home/ops123/adwatak/src/app/id/tools"
output = []

for tool_slug in sorted(os.listdir(tools_dir)):
    tool_path = os.path.join(tools_dir, tool_slug)
    if not os.path.isdir(tool_path):
        continue

    # Read both page.tsx and Client.tsx
    content = ""
    for fname in ["page.tsx", "Client.tsx"]:
        fpath = os.path.join(tool_path, fname)
        if os.path.isfile(fpath):
            with open(fpath) as f:
                content += f.read() + "\n"

    if not content:
        continue

    english_flags = []

    # 1. h1 or heading
    h1_match = re.search(r'<h1[^>]*>([^<]+)</h1>', content)
    if h1_match:
        h1_text = h1_match.group(1).strip()
        eng_heading_patterns = r'^(Calculator|Convert|Generate|Free|Online|Tool|Check|Find|How|What|Why|The |Best |Top )'
        if re.search(eng_heading_patterns, h1_text, re.IGNORECASE):
            english_flags.append("heading: " + h1_text[:70])

    # 2. Key English words in JSX text
    eng_patterns = [
        r'Calculate\b', r'Convert\b', r'Generate\b', r'Reset\b',
        r'Enter (text|value|number|your)', r'Paste (your|the)',
        r'Result', r'Results',
        r'Copy to Clipboard', r'Download',
        r'Usage Guide', r'How to Use',
        r'Related Tools', r'FAQs?'
    ]
    for pat in eng_patterns:
        if re.search(pat, content):
            english_flags.append("text: '" + pat.strip("?$^\\") + "'")
            break

    # 3. Breadcrumbs
    if re.search(r'>Home<', content) and not re.search(r'>Beranda<', content):
        english_flags.append("breadcrumb: 'Home' (not 'Beranda')")

    # 4. SEO content indicators
    seo_indicators = [
        r'our free online', r'this online tool', r'is a free',
        r'helps you', r'allows you to', r'simply enter',
        r'click the button', r'get instant',
    ]
    for pat in seo_indicators:
        if re.search(pat, content, re.IGNORECASE):
            english_flags.append("seo: '" + pat.strip("?$^\\") + "'")
            break

    if english_flags:
        output.append((tool_slug, english_flags))

tool_count = sum(1 for d in os.listdir(tools_dir) if os.path.isdir(os.path.join(tools_dir, d)))
print("Total ID tools:", tool_count)
print("English or partially English:", len(output))
print()
for slug, flags in output:
    print("  " + slug + ":")
    for f in flags:
        print("    - " + f)
