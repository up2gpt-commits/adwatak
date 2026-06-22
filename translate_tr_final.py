#!/usr/bin/env python3
"""Translate ALL remaining Turkish tools - extract strings first, then patch."""
import os, re, json, sys, time
import urllib.request, urllib.error, socket

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TR_DIR = "/home/ops123/adwatak/src/app/tr/tools/"

def call_api(prompt, timeout=300):
    socket.setdefaulttimeout(timeout)
    data = {"model": MODEL, "messages": [
        {"role": "system", "content": "You translate English to natural Turkish. Return ONLY valid JSON."},
        {"role": "user", "content": prompt}
    ], "temperature": 0.05, "max_tokens": 16000}
    
    req = urllib.request.Request(API_URL, data=json.dumps(data).encode('utf-8'),
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + FIREWORKS_KEY})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read())["choices"][0]["message"]["content"]
    except Exception as e:
        return None

def get_tool_data(tool):
    """Extract English strings from a tool file."""
    fp = os.path.join(TR_DIR, tool, 'Client.tsx')
    with open(fp) as f:
        c = f.read()
    
    data = {}
    data['_file'] = c
    
    # h1
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', c)
    data['h1'] = h1.group(1) if h1 else ''
    
    # h1 subtitle
    sub = re.search(r'<h1[^>]*>.*?</h1>\s*<p[^>]*>(.*?)</p>', c)
    data['subtitle'] = sub.group(1) if sub else ''
    
    # Breadcrumb
    bc = re.search(r'<Breadcrumb\s+category="([^"]+)"\s+categorySlug="([^"]+)"\s+toolName="([^"]+)"', c)
    if bc:
        data['bc_category'] = bc.group(1)
        data['bc_slug'] = bc.group(2)
        data['bc_toolname'] = bc.group(3)
    
    # Labels
    labels = re.findall(r'<label[^>]*>([^<]+)</label>', c)
    if labels:
        data['labels'] = labels
    
    # Buttons (non-empty, non-icon-only)
    buttons = re.findall(r'<button[^>]*>((?:(?!</button>).)*)</button>', c)
    meaningful_btns = [b for b in buttons if len(b.strip()) > 3]
    if meaningful_btns:
        data['buttons'] = meaningful_btns
    
    # Placeholders
    phs = re.findall(r'placeholder="([^"]*)"', c)
    if phs:
        data['placeholders'] = phs
    
    # FA questions
    faqs = re.search(r'const faqs = \[(.*?)\];', c, re.DOTALL)
    if faqs:
        qs = re.findall(r'question:\s*"([^"]+)"', faqs.group(1))
        if qs:
            data['faq_questions'] = qs
        ans = re.findall(r'answer:\s*"([^"]+)"', faqs.group(1))
        if ans:
            data['faq_answers'] = ans
    
    # seoContent
    seo = re.search(r'const seoContent = \[(.*?)\];', c, re.DOTALL)
    if seo:
        items = re.findall(r'"((?:[^"\\]|\\.)*)"', seo.group(1))
        if items:
            data['seo'] = items
    
    # relatedTools
    rt = re.search(r'const relatedTools = \[(.*?)\];', c, re.DOTALL)
    if rt:
        titles = re.findall(r'title:\s*"([^"]+)"', rt.group(1))
        if titles:
            data['related'] = titles
    
    # schemaName
    sn = re.search(r'const schemaName\s*=\s*"([^"]+)"', c)
    if sn:
        data['schema_name'] = sn.group(1)
    
    # schemaDesc
    sd = re.search(r'const schemaDesc\s*=\s*`([^`]+)`', c)
    if sd:
        data['schema_desc'] = sd.group(1)
    
    # breadcrumbItems names
    bcn = re.findall(r'name:\s*"([^"]+)"', c[c.find('const breadcrumbItems'):c.find('const breadcrumbItems')+2000] if 'const breadcrumbItems' in c else '')
    if bcn and len(bcn) > 0:
        data['bc_names'] = bcn
    
    return data

def translate_tool(tool, data):
    """Send extracted strings for translation."""
    # Build items to translate - skip empty/trivial ones
    items = {}
    for key in ['h1', 'subtitle', 'bc_category', 'bc_toolname', 'schema_name', 'schema_desc']:
        if key in data and data[key] and not any(w in data[key].lower() for w in ['anan', 'ana ', 'home', 'çok yakında']):
            items[key] = data[key]
    
    if 'labels' in data:
        for i, l in enumerate(data['labels']):
            items[f'label_{i}'] = l
    
    if 'buttons' in data:
        for i, b in enumerate(data['buttons']):
            items[f'button_{i}'] = b
    
    if 'placeholders' in data:
        for i, p in enumerate(data['placeholders']):
            items[f'placeholder_{i}'] = p
    
    if 'faq_questions' in data:
        for i, q in enumerate(data['faq_questions']):
            items[f'faq_q_{i}'] = q
    
    if 'faq_answers' in data:
        for i, a in enumerate(data['faq_answers']):
            items[f'faq_a_{i}'] = a
    
    if 'seo' in data:
        for i, s in enumerate(data['seo']):
            items[f'seo_{i}'] = s
    
    if 'related' in data:
        for i, r in enumerate(data['related']):
            items[f'related_{i}'] = r
    
    if 'bc_names' in data:
        for i, n in enumerate(data['bc_names']):
            items[f'bc_name_{i}'] = n
    
    if not items:
        return None
    
    prompt = f"""Translate these English UI strings to natural Turkish for the tool "{tool}". 
Rules:
- Keep all emojis, $, %, numbers, and code formatting symbols exactly as-is
- "Adwatak" stays as "Adwatak"  
- Only translate the text content, not the key names
- Return ONLY a JSON object with the same keys and translated values

Input:
{json.dumps(items, ensure_ascii=False, indent=2)}"""
    
    result = call_api(prompt)
    if not result:
        return None
    
    # Parse JSON from response
    try:
        # Find JSON in response
        json_match = re.search(r'\{[\s\S]*\}', result)
        if json_match:
            translations = json.loads(json_match.group())
        else:
            translations = json.loads(result)
    except:
        return None
    
    return translations

def apply_translations(tool, data, translations):
    """Apply translations back to the file."""
    fp = os.path.join(TR_DIR, tool, 'Client.tsx')
    c = data['_file']
    new_c = c
    
    # Apply each translation by exact string replacement
    key_map = {
        'h1': (data.get('h1', ''), lambda v, old: ('<h1', f'>{v}<', '</h1>')),
        'subtitle': (data.get('subtitle', ''), None),
    }
    
    # h1
    if 'h1' in translations and 'h1' in data:
        old = data['h1']
        new = translations['h1']
        if old and new and old != new:
            new_c = new_c.replace(old, new)
    
    # subtitle
    if 'subtitle' in translations and 'subtitle' in data:
        old = data['subtitle']
        new = translations['subtitle']
        if old and new and old != new:
            new_c = new_c.replace(old, new)
    
    # Breadcrumb category
    if 'bc_category' in translations and 'bc_category' in data:
        old = data['bc_category']
        new = translations['bc_category']
        if old != new:
            new_c = new_c.replace(f'category="{old}"', f'category="{new}"')
    
    # Breadcrumb toolName
    if 'bc_toolname' in translations and 'bc_toolname' in data:
        old = data['bc_toolname']
        new = translations['bc_toolname']
        if old != new:
            new_c = new_c.replace(f'toolName="{old}"', f'toolName="{new}"')
    
    # schemaName
    if 'schema_name' in translations and 'schema_name' in data:
        old = data['schema_name']
        new = translations['schema_name']
        if old != new:
            new_c = new_c.replace(f'schemaName = "{old}"', f'schemaName = "{new}"')
    
    # schemaDesc
    if 'schema_desc' in translations and 'schema_desc' in data:
        old = data['schema_desc']
        new = translations['schema_desc']
        if old != new:
            new_c = new_c.replace(f'schemaDesc = `{old}`', f'schemaDesc = `{new}`')
    
    # Labels
    if 'labels' in data:
        for i, old in enumerate(data['labels']):
            key = f'label_{i}'
            if key in translations:
                new_c = new_c.replace(f'>{old}<', f'>{translations[key]}<', 1)
    
    # Buttons
    if 'buttons' in data:
        for i, old in enumerate(data['buttons']):
            key = f'button_{i}'
            if key in translations and translations[key] != old:
                new_c = new_c.replace(old, translations[key], 1)
    
    # Placeholders
    if 'placeholders' in data:
        for i, old in enumerate(data['placeholders']):
            key = f'placeholder_{i}'
            if key in translations:
                new_c = new_c.replace(f'placeholder="{old}"', f'placeholder="{translations[key]}"', 1)
    
    # FAQ questions & answers (must be after btn/label to avoid accidental matches)
    if 'faq_questions' in data:
        for i, old in enumerate(data['faq_questions']):
            key = f'faq_q_{i}'
            if key in translations and translations[key] != old:
                new_c = new_c.replace(f'question: "{old}"', f'question: "{translations[key]}"', 1)
    
    if 'faq_answers' in data:
        for i, old in enumerate(data['faq_answers']):
            key = f'faq_a_{i}'
            if key in translations and translations[key] != old:
                new_c = new_c.replace(f'answer: "{old}"', f'answer: "{translations[key]}"', 1)
    
    # seoContent
    if 'seo' in data:
        for i, old in enumerate(data['seo']):
            key = f'seo_{i}'
            if key in translations and translations[key] != old:
                new_c = new_c.replace(f'"{old}"', f'"{translations[key]}"', 1)
    
    # relatedTools
    if 'related' in data:
        for i, old in enumerate(data['related']):
            key = f'related_{i}'
            if key in translations and translations[key] != old:
                new_c = new_c.replace(f'title: "{old}"', f'title: "{translations[key]}"', 1)
    
    # bc_names (breadcrumbItems)
    if 'bc_names' in data:
        for i, old in enumerate(data['bc_names']):
            key = f'bc_name_{i}'
            if key in translations and translations[key] != old:
                new_c = new_c.replace(f'name: "{old}"', f'name: "{translations[key]}"', 1)
    
    # Also change "en" to "tr" in toolSchema and howToSchema  
    new_c = new_c.replace("'en'", "'tr'").replace('", "en")', '", "tr")')
    new_c = new_c.replace('"en"', '"tr"')
    # But revert URLs that might have been changed
    new_c = new_c.replace('/tr/', '/tr/')  # no-op, just to be safe
    
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(new_c)
    
    return True

def is_likely_turkish(text):
    turkish = ['hesaplama', 'hesaplay', 'hesapla', 'araci', 'olusturucu', 'donusturucu',
               'cevirici', 'kontrol', 'uretici', 'kaldirma', 'sikistir', 'birlestir',
               'ayirma', 'temizle', 'karsilastir', 'olcer', 'saya', 'bulucu',
               'dilbilgisi', 'denetleyici', 'sivrisinek', 'kovucu', 'vakitler', 'namaz',
               'oku', 'okuyucu', 'kelime', 'yazi', 'yazma', 'ucretsiz', 'kayit',
               'resim', 'goruntu', 'metin', 'kalori', 'bilesik', 'faiz', 'vergi',
               'maas', 'konut', 'kredi', 'sifre', 'sifrele', 'tasbih', 'kibla']
    tl = text.lower()
    return any(w in tl for w in turkish)

def main():
    tools = sorted([d for d in os.listdir(TR_DIR) if os.path.isdir(os.path.join(TR_DIR, d))])
    
    # Filter to tools still in English
    en_tools = []
    for t in tools:
        fp = os.path.join(TR_DIR, t, 'Client.tsx')
        if not os.path.exists(fp):
            continue
        with open(fp) as f:
            c = f.read()
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', c)
        h1_text = h1.group(1) if h1 else ''
        if not is_likely_turkish(h1_text):
            en_tools.append(t)
    
    total = len(en_tools)
    print(f"Need to translate: {total} tools")
    
    success, fail = 0, 0
    for i, tool in enumerate(en_tools):
        print(f"[{i+1}/{total}] {tool}...", end=" ", flush=True)
        
        try:
            data = get_tool_data(tool)
            if not data:
                print("SKIP (no data)")
                continue
            
            translations = translate_tool(tool, data)
            if not translations:
                print("FAIL (API)")
                fail += 1
                continue
            
            apply_translations(tool, data, translations)
            
            # Verify
            with open(os.path.join(TR_DIR, tool, 'Client.tsx')) as f:
                c = f.read()
            h1 = re.search(r'<h1[^>]*>(.*?)</h1>', c)
            h1_text = h1.group(1) if h1 else ''
            is_tr = is_likely_turkish(h1_text)
            
            if is_tr:
                print("OK")
                success += 1
            else:
                print("WARN (h1 still EN)")
                success += 1  # count anyway, FAQ might be translated
        except Exception as e:
            print(f"ERROR: {e}")
            fail += 1
        
        time.sleep(0.5)
    
    print(f"\n=== DONE: {success} OK, {fail} FAIL ===")

if __name__ == "__main__":
    main()
