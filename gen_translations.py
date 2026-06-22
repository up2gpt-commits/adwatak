#!/usr/bin/env python3
"""Simple translator - read EN array, get Kimi translation, write back."""
import json, os, sys, subprocess, re

AK="fw_NuSpvm1K6VR4teLpx8VkWj"
AU="https://api.fireworks.ai/inference/v1/chat/completions"

def readf(p):
    with open(p) as f: return f.read()
def writef(p,c):
    with open(p,"w") as f: f.write(c)

lang=sys.argv[1]
tool=sys.argv[2]
ln={"fr":"French","id":"Indonesian","tr":"Turkish"}[lang]

path=f"/home/ops123/adwatak/src/app/{lang}/tools/{tool}/Client.tsx"
en_path=f"/home/ops123/adwatak/src/app/en/tools/{tool}/Client.tsx"

c=readf(path)
ec=readf(en_path)

# Extract arrays from EN
for key,label in [("faqs","FAQ"),("seoContent","SEO"),("relatedTools","Tools")]:
    m=re.search(r'const\s+'+key+r'\s*=\s*(\[.*?\])\s*;',ec,re.DOTALL)
    if not m: continue
    
    en_val=m.group(1)
    if key=="relatedTools":
        en_val=en_val.replace('/en/',f'/{lang}/')
    
    # Check if already translated
    if "What is" not in c and "Why 33" not in c and "How does" not in c:
        print(f"OK {lang}/{tool}")
        sys.exit(0)
    
    print(f"Translating {key}...")
    
    data={"model":"accounts/fireworks/models/deepseek-v4-pro","messages":[
        {"role":"system","content":f"Translate to {ln}. Output ONLY the translated JS array. No explanations."},
        {"role":"user","content":f"Translate the text content in this array to {ln}. Keep Arabic/Islamic terms and references as-is. Output ONLY the translated array:\n\n{en_val}"}
    ],"temperature":0,"max_tokens":4000}
    ah="Bearer "+AK
    r=subprocess.run(["curl","-s","-X","POST",AU,"-H","Authorization: "+ah,"-H","Content-Type: application/json","-d",json.dumps(data)],capture_output=True,text=True,timeout=120)
    j=json.loads(r.stdout)
    resp=j["choices"][0]["message"]["content"]
    
    # Extract the last [..] that contains the right structure
    arr=None
    r_lc=resp.lower()
    if (key=="faqs" and "question" in r_lc) or \
       (key=="seoContent" and '"' in max(resp.split('\n'),key=len) if resp.strip().startswith('[') else False):
        m2=re.search(r'(\[.*\])\s*$',resp,re.DOTALL)
        if m2: arr=m2.group(1)
    elif key=="relatedTools" and "title" in r_lc:
        m2=re.search(r'(\[.*\])\s*$',resp,re.DOTALL)
        if m2: arr=m2.group(1)
    
    if not arr:
        # Try simpler: find first [ to last ]
        s=resp.find('[')
        e=resp.rfind(']')
        if s>=0 and e>s:
            arr=resp[s:e+1]
    
    if not arr:
        print(f"  FAIL: no array found")
        print(f"  Raw: {resp[:200]}")
        continue
    
    # Write a temporary file with the replacement info
    writef(f"/tmp/{key}_{lang}_{tool}.txt", arr)
    print(f"  OK {key}")

print("Now apply with: patch_arrays.py <lang> <tool>")
print(f"Arrays saved to /tmp/[faqs|seoContent|relatedTools]_{lang}_{tool}.txt")
