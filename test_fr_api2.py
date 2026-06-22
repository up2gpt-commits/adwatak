#!/usr/bin/env python3
"""Simple test: translate one tool's FAQ."""
import os, re, json, subprocess, sys

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
sys.stdout.reconfigure(line_buffering=True)

api_key = os.environ.get("FW_API_KEY", "")
if not api_key:
    print("No FW_API_KEY env var!", flush=True)
    sys.exit(1)

print("Starting...", flush=True)

tool = "bmi-calculator"
cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
with open(cf) as f:
    content = f.read()

print("File size: " + str(len(content)), flush=True)

# Find English FAQ questions
eng = []
for m in re.finditer(r'question:\s*["\x27]([^"\x27]{10,})["\x27]', content):
    text = m.group(1)
    if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text):
        continue
    french_words = ['est','les','des','une','dans','pour','avec','sur','sans','tous',
                    'comment','quelle','quand','pourquoi','combien','entre','apres']
    skip = any(fw in text.lower() for fw in french_words)
    if skip:
        continue
    eng.append(text)

print("Found " + str(len(eng)) + " English FAQ questions", flush=True)
for e in eng[:5]:
    print("  - " + e[:80], flush=True)

if not eng:
    print("Nothing to translate", flush=True)
    sys.exit(0)

prompt = "Translate each English phrase to French. Return ONLY JSON where key=English, value=French. These are FAQ questions.\n\n"
prompt += "\n".join(str(i+1) + ". " + t for i, t in enumerate(eng))

print("Sending API request...", flush=True)

payload = json.dumps({
    "model": "accounts/fireworks/models/deepseek-v4-pro",
    "messages": [{"role": "user", "content": prompt[:32000]}],
    "max_tokens": 2000,
    "temperature": 0.1,
    "response_format": {"type": "json_object"},
})

auth_val = "Authorization: Bearer " + api_key

result = subprocess.run(
    ["curl", "-s", "-X", "POST", API_URL,
     "-H", auth_val,
     "-H", "Content-Type: application/json",
     "-d", payload],
    capture_output=True, text=True, timeout=120
)

print("API response length: " + str(len(result.stdout)), flush=True)

try:
    resp = json.loads(result.stdout)
    content_resp = resp["choices"][0]["message"]["content"]
    translations = json.loads(content_resp)
    print("Got " + str(len(translations)) + " translations", flush=True)
    for eng, fr in list(translations.items())[:5]:
        print("  " + eng[:40] + " -> " + fr[:40], flush=True)
except Exception as e:
    print("Error: " + str(e), flush=True)
    print("Response: " + result.stdout[:500], flush=True)
