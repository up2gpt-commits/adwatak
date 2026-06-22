#!/usr/bin/env python3
"""Check exact bytes around className in invoice-generator."""
with open("src/app/id/tools/invoice-generator/Client.tsx", "rb") as f:
    lines = f.readlines()

l5 = lines[4]
idx = 0
while True:
    idx = l5.find(b"className=", idx)
    if idx == -1 or idx > 5000:
        break
    after = l5[idx+10:idx+50]
    if b"\\" in after:
        print(f"Found at byte {idx}:")
        for i in range(idx, min(idx+50, len(l5))):
            b = l5[i]
            c = chr(b) if 32 <= b < 127 else "."
            print(f"  byte[{i}] = 0x{b:02x} ({c})")
        print()
    idx += 1
