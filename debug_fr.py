#!/usr/bin/env python3
"""Debug: check how many French tools still have English strings."""
import os, re

base = "/home/ops123/adwatak/src/app/fr/tools"
for d in sorted(os.listdir(base))[:10]:
    cf = os.path.join(base, d, "Client.tsx")
    if not os.path.exists(cf): continue
    with open(cf) as f:
        c = f.read()
    eng = 0
    for m in re.finditer(r'["\x27]([A-Z][a-zA-Z\s()\x2d\d,;:.!?\x27`]{10,})["\x27]', c):
        t = m.group(1)
        if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', t): continue
        eng += 1
    print(f"{d}: {eng}")
