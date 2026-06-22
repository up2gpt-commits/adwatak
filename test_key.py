#!/usr/bin/env python3
"""Test API key."""
import json, subprocess

payload = '{"model":"accounts/fireworks/models/deepseek-v4-pro","messages":[{"role":"user","content":"say hi in french"}],"max_tokens":10}'

result = subprocess.run(
    ["curl", "-s", "-X", "POST", "https://api.fireworks.ai/inference/v1/chat/completions",
     "-H", "Content-Type: application/json",
     "-H", "Authorization: Bearer ***     "-d", payload],
    capture_output=True, text=True, timeout=30
)
print(result.stdout[:300])
