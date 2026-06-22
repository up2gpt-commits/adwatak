#!/usr/bin/env python3
"""Check full context around byte 3589 in invoice-generator."""
with open("src/app/id/tools/invoice-generator/Client.tsx", "rb") as f:
    content = f.read()

start = max(0, 3550)
end = min(len(content), 3700)
print("Context around className issue:")
print(content[start:end].decode('utf-8', errors='replace'))
print()
print("--- Raw bytes ---")
for i in range(start, end):
    b = content[i]
    c = chr(b) if 32 <= b < 127 else f"\\x{b:02x}"
    print(f"  [{i}] 0x{b:02x} {c}")
