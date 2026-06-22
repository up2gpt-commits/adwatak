#!/bin/bash
# Batch translate all Turkish tool files
cd /home/ops123/adwatak

TOOLS=$(python3 -c "
import os
tools = sorted([d for d in os.listdir('src/app/tr/tools/') if os.path.isdir(os.path.join('src/app/tr/tools/', d))])
for t in tools:
    print(t)
")

COUNT=0
TOTAL=0
for t in $TOOLS; do
    TOTAL=$((TOTAL + 1))
done

for t in $TOOLS; do
    COUNT=$((COUNT + 1))
    echo "[$COUNT/$TOTAL] $t..."
    python3 test_one_tr.py "$t" 2>&1 || echo "FAILED: $t"
    # Small delay
    sleep 0.5
done

echo ""
echo "=== ALL DONE ==="
