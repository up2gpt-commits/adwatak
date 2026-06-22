#!/usr/bin/env python3
"""Apply translations from /tmp/ files. Reads file, finds array by bracket counting."""
import json, os, re, sys

def readf(p):
    with open(p) as f: return f.read()
def writef(p,c):
    with open(p,"w") as f: f.write(c)

def find_array(text, start_pos):
    """Find a JS array by bracket counting from start_pos."""
    pos = text.find('[', start_pos)
    if pos < 0: return None
    depth = 0
    in_str = False
    str_char = None
    escape_mode = False
    for i in range(pos, len(text)):
        ch = text[i]
        if escape_mode:
            escape_mode = False
            continue
        if in_str:
            if ch == '\\':
                escape_mode = True
            elif ch == str_char:
                in_str = False
        else:
            if ch in '"\'':
                in_str = True
                str_char = ch
            elif ch == '[': depth += 1
            elif ch == ']': depth -= 1
            if depth == 0: return (pos, i+1)
    return None

def replace_array(content, key, new_value):
    """Find 'const key = [...]' and replace with new value."""
    p = re.search(r'const\s+'+key+r'\s*=\s*', content)
    if not p: return content
    start = p.end()
    arr = find_array(content, start)
    if not arr: return content
    # Find the semicolon after the array
    end = arr[1]
    while end < len(content) and content[end] in ' \t\n;':
        end += 1
    return content[:p.start()] + "const " + key + " = " + new_value + content[end:]

lang=sys.argv[1]
tool=sys.argv[2]
path=f"/home/ops123/adwatak/src/app/{lang}/tools/{tool}/Client.tsx"
c=readf(path)

for key in ["faqs","seoContent","relatedTools"]:
    tf=f"/tmp/{key}_{lang}_{tool}.txt"
    if not os.path.exists(tf): continue
    new_val=readf(tf).strip()
    if not new_val: continue
    nc=replace_array(c,key,new_val)
    if nc!=c:
        writef(path,nc)
        c=nc
        print(f"Applied {key}")
    else:
        print(f"SKIP {key} (not found)")

print(f"DONE {lang}/{tool}")
