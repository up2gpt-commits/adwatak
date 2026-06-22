#!/usr/bin/env python3
"""
Translate all Turkish tool Client.tsx files from English UI strings to Turkish.
Uses Fireworks AI (deepseek-v4-pro) for translation.
Preserves: faqs array (already Turkish), code structure, JSX, variable names.
"""

import os
import re
import json
import time
import urllib.request
import urllib.error

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TOOLS_DIR = "/home/ops123/adwatak/src/app/tr/tools/"

def call_fireworks(prompt, system="You are a professional Turkish translator. Translate English to Turkish accurately, keeping all numbers, code, and structure intact."):
    """Call Fireworks AI API with a prompt and return the response text."""
    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.1,
        "max_tokens": 16000
    }
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(data).encode('utf-8'),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {FIREWORKS_KEY}"
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read())
            return result["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"  API error: {e}")
        return None

def translate_file(filepath):
    """Translate one Turkish tool Client.tsx file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract h1 heading (first one after the JSX starts)
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content)
    h1_text = h1_match.group(1).strip() if h1_match else None
    
    # Extract Breadcrumb props
    bc_match = re.search(r'<Breadcrumb\s+category="([^"]+)"\s+categorySlug="([^"]+)"\s+toolName="([^"]+)"', content)
    bc_info = bc_match.groups() if bc_match else None
    
    # Extract p subtitle (right after h1)
    p_match = re.search(r'<h1[^>]*>.*?</h1>\s*<p[^>]*>(.*?)</p>', content)
    p_text = p_match.group(1).strip() if p_match else None
    
    # Extract all labels
    labels = re.findall(r'<label[^>]*>(.*?)</label>', content)
    
    # Extract button text (not in JSX)
    buttons = re.findall(r'<button[^>]*>(.*?)</button>', content)
    
    # Extract placeholders
    placeholders = re.findall(r'placeholder="([^"]*)"', content)
    
    # Extract howToSchema params
    howto_match = re.search(r'howToSchema\("([^"]+)",\s*"([^"]+)"', content)
    howto_info = howto_match.groups() if howto_match else None
    
    # Extract howToSchema steps
    steps = re.findall(r'\{\s*name:\s*"([^"]+)",\s*text:\s*"([^"]+)"\s*\}', content)
    
    # Extract howToSchema duration
    dur_match = re.search(r'howToSchema\([^,]+,\s*[^,]+,\s*\[[^\]]+\],\s*"([^"]+)"', content)
    duration = dur_match.group(1) if dur_match else None
    
    # Extract howToSchema language
    lang_match = re.search(r'howToSchema\([^,]+,\s*[^,]+,\s*\[[^\]]+\],\s*"[^"]+",\s*"([^"]+)"', content)
    schema_lang = lang_match.group(1) if lang_match else None
    
    # Extract seoContent array items
    seo_match = re.search(r'const seoContent = \[(.*?)\];', content, re.DOTALL)
    seo_items = []
    if seo_match:
        raw = seo_match.group(1)
        seo_items = re.findall(r'"(?:[^"\\]|\\.)*"', raw)
    
    # Extract relatedTools titles
    rt_match = re.search(r'const relatedTools = \[(.*?)\];', content, re.DOTALL)
    rt_items = []
    if rt_match:
        raw = rt_match.group(1)
        rt_items = re.findall(r'title:\s*"([^"]+)"', raw)
    
    # Build translation items
    translations_needed = {}
    
    if h1_text and not any(turkish_word in h1_text.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'hesapla', 'aracı', 'oluşturucu', 'dönüştürücü']):
        translations_needed['h1'] = h1_text
    
    if p_text and not any(turkish_word in p_text.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
        translations_needed['subtitle'] = p_text
    
    if bc_info:
        for i, val in enumerate(bc_info):
            if val and not any(turkish_word in val.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
                key = ['bc_category', 'bc_categorySlug', 'bc_toolName'][i]
                if not val.islower() and not val.isnumeric():
                    translations_needed[key] = val
    
    for i, label in enumerate(labels):
        if label and not any(turkish_word in label.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
            translations_needed[f'label_{i}'] = label
    
    for i, btn in enumerate(buttons):
        # Skip buttons with emoji icons or that are already Turkish
        cleaned = re.sub(r'[🌀-🗿]', '', btn).strip()
        if cleaned and cleaned != btn and cleaned not in ['▴', '▾', 'Copy', 'Copied!']:
            if not any(turkish_word in cleaned.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
                translations_needed[f'button_{i}'] = cleaned
    
    for i, ph in enumerate(placeholders):
        if ph and not any(turkish_word in ph.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
            translations_needed[f'placeholder_{i}'] = ph
    
    for i, seo in enumerate(seo_items):
        seo_val = seo.strip('"')
        if seo_val and not any(turkish_word in seo_val.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
            translations_needed[f'seo_{i}'] = seo_val
    
    for i, rt in enumerate(rt_items):
        if rt and not any(turkish_word in rt.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
            translations_needed[f'related_{i}'] = rt
    
    if howto_info:
        for i, val in enumerate(howto_info):
            if val and not any(turkish_word in val.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
                translations_needed[f'howto_{["name","desc"][i]}'] = val
    
    for i, (name, text) in enumerate(steps):
        if name and not any(turkish_word in name.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
            translations_needed[f'step_name_{i}'] = name
        if text and not any(turkish_word in text.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
            translations_needed[f'step_text_{i}'] = text
    
    if duration and not any(turkish_word in duration.lower() for turkish_word in ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü']):
        translations_needed['duration'] = duration
    
    if not translations_needed:
        print(f"  ✓ Already translated or no strings to translate")
        return True
    
    print(f"  Need to translate {len(translations_needed)} items")
    
    # Build the translation prompt
    items_str = json.dumps(translations_needed, ensure_ascii=False, indent=2)
    prompt = f"""Translate the following English UI strings to NATURAL Turkish. 
Keep all formatting, emojis, $ signs, numbers, and special characters EXACTLY as they are.
Translate ONLY the text content. Do NOT add or remove any characters beyond translation.
Do NOT translate domain-specific names like 'Adwatak', 'Adawatak' or URLs.

Return ONLY a valid JSON object with the same keys and translated values.

Items to translate:
{items_str}"""
    
    result = call_fireworks(prompt)
    if not result:
        return False
    
    # Parse the JSON response
    try:
        # Find JSON in response
        json_match = re.search(r'\{[\s\S]*\}', result)
        if json_match:
            translations = json.loads(json_match.group())
        else:
            translations = json.loads(result)
    except json.JSONDecodeError as e:
        print(f"  Failed to parse translation JSON: {e}")
        print(f"  Raw response: {result[:500]}")
        return False
    
    # Apply translations
    new_content = content
    
    # Update h1
    if 'h1' in translations and translations['h1'] and h1_match:
        old_tag = h1_match.group(0)
        new_tag = old_tag.replace(h1_text, translations['h1'])
        new_content = new_content.replace(old_tag, new_tag)
    
    # Update subtitle
    if 'subtitle' in translations and translations['subtitle'] and p_match:
        old_tag = p_match.group(0)
        new_tag = old_tag.replace(p_text, translations['subtitle'])
        new_content = new_content.replace(old_tag, new_tag)
    
    # Update Breadcrumb
    if bc_info and bc_match:
        new_parts = list(bc_info)
        for i, key in enumerate(['bc_category', 'bc_categorySlug', 'bc_toolName']):
            if key in translations:
                new_parts[i] = translations[key]
        old_bc = bc_match.group(0)
        new_bc = old_bc
        for i, (old_val, new_val) in enumerate(zip(bc_info, new_parts)):
            if old_val != new_val:
                new_bc = new_bc.replace(f'category="{old_val}"' if i == 0 else 
                                        f'categorySlug="{old_val}"' if i == 1 else
                                        f'toolName="{old_val}"',
                                        f'category="{new_val}"' if i == 0 else
                                        f'categorySlug="{new_val}"' if i == 1 else
                                        f'toolName="{new_val}"')
        new_content = new_content.replace(old_bc, new_bc)
    
    # Update labels
    label_idx = 0
    for match in re.finditer(r'<label[^>]*>(.*?)</label>', new_content):
        key = f'label_{label_idx}'
        if key in translations:
            old_label = match.group(0)
            new_label = old_label.replace(match.group(1), translations[key])
            new_content = new_content.replace(old_label, new_label, 1)
        label_idx += 1
    
    # Update buttons
    btn_idx = 0
    for match in re.finditer(r'<button[^>]*>((?:(?!</button>).)*)</button>', new_content):
        key = f'button_{btn_idx}'
        if key in translations:
            old_text = match.group(1)
            old_tag = match.group(0)
            new_tag = old_tag.replace(old_text, translations[key])
            new_content = new_content.replace(old_tag, new_tag, 1)
        btn_idx += 1
    
    # Update placeholders - replace all at once to avoid partial replacements
    for i in range(len(placeholders)):
        key = f'placeholder_{i}'
        if key in translations and i < len(placeholders):
            old_ph = placeholders[i]
            new_content = new_content.replace(f'placeholder="{old_ph}"', f'placeholder="{translations[key]}"', 1)
    
    # Update seoContent items
    seo_match2 = re.search(r'const seoContent = \[(.*?)\];', new_content, re.DOTALL)
    if seo_match2:
        raw_seo = seo_match2.group(1)
        new_raw = raw_seo
        for i, old_seo in enumerate(seo_items):
            key = f'seo_{i}'
            if key in translations:
                old_seo_clean = old_seo.strip('"')
                new_raw = new_raw.replace(f'"{old_seo_clean}"', f'"{translations[key]}"', 1)
        new_content = new_content.replace(raw_seo, new_raw)
    
    # Update relatedTools titles
    for i, old_rt in enumerate(rt_items):
        key = f'related_{i}'
        if key in translations:
            new_content = new_content.replace(f'title: "{old_rt}"', f'title: "{translations[key]}"', 1)
    
    # Update howToSchema
    if howto_info:
        for i, key in enumerate(['howto_name', 'howto_desc']):
            if key in translations and i < len(howto_info):
                old_val = howto_info[i]
                # Replace in howToSchema call
                new_content = new_content.replace(f'howToSchema("{old_val}"', f'howToSchema("{translations[key]}"', 1)
    
    for i, (name, text) in enumerate(steps):
        key_name = f'step_name_{i}'
        key_text = f'step_text_{i}'
        if key_name in translations:
            new_content = new_content.replace(f'name:"{name}"', f'name:"{translations[key_name]}"', 1)
        if key_text in translations:
            new_content = new_content.replace(f'text:"{text}"', f'text:"{translations[key_text]}"', 1)
    
    if 'duration' in translations and duration:
        new_content = new_content.replace(f'"{duration}","en"', f'"{translations[duration]}","tr"', 1)
        new_content = new_content.replace(f'"{duration}","tr"', f'"{translations[duration]}","tr"', 1)
    
    # Fix language param for howToSchema
    new_content = new_content.replace('howToSchema(...),"en")', 'howToSchema(...),"tr")')
    # Also fix the literal "en" in howToSchema calls
    new_content = re.sub(r'(howToSchema\([^,]+,\s*"[^"]+",\s*\[.*?\],\s*"[^"]+",\s*)"en"', r'\1"tr"', new_content)
    
    # Write the updated file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  ✓ Translated and saved")
    return True


def main():
    tools = sorted([d for d in os.listdir(TOOLS_DIR) 
                    if os.path.isdir(os.path.join(TOOLS_DIR, d)) 
                    and os.path.exists(os.path.join(TOOLS_DIR, d, 'Client.tsx'))])
    
    total = len(tools)
    print(f"Found {total} Turkish tool directories with Client.tsx")
    
    success = 0
    fail = 0
    skipped = 0
    
    for i, tool in enumerate(tools):
        filepath = os.path.join(TOOLS_DIR, tool, 'Client.tsx')
        print(f"\n[{i+1}/{total}] {tool}...", end=" ", flush=True)
        
        try:
            result = translate_file(filepath)
            if result:
                success += 1
            else:
                fail += 1
            # Rate limit - small delay between tools
            time.sleep(0.5)
        except Exception as e:
            print(f"ERROR: {e}")
            fail += 1
    
    print(f"\n\n=== SUMMARY ===")
    print(f"Total: {total}, Success: {success}, Failed: {fail}, Skipped: {skipped}")

if __name__ == "__main__":
    main()
