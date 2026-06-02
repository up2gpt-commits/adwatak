#!/usr/bin/env python3
"""
add_blog_post.py — Add a new blog post to adwatak blog.ts

Usage:
    python3 add_blog_post.py --title "العنوان" --excerpt "الوصف" --content "HTML content" \
        --category "مالية" --slug "post-slug" --keywords "كلمة1,كلمة2" [--lang ar]

If --lang en, adds to blog-en.ts instead.
The script prepends the new post to the blogPosts array (newest first).
"""

import argparse
import re
import sys
from pathlib import Path
from datetime import datetime

REPO_ROOT = Path(__file__).parent.parent


def today_str():
    d = datetime.now()
    return f"{d.year}-{d.month:02d}-{d.day:02d}"


def escape_ts_string(content: str) -> str:
    """Escape a string for use in a JS/TS template literal."""
    # Convert HTML content: backticks and ${ need escaping
    # The content goes inside backtick template literals
    content = content.replace("\\", "\\\\")
    content = content.replace("`", "\\`")
    content = content.replace("${", "\\${")
    return content


def read_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_file(path: Path, content: str):
    path.write_text(content, encoding="utf-8")


def add_post_to_blog_ts(blog_ts_path: Path, post: dict):
    """Insert a new post object at the beginning of the blogPosts array."""
    content = read_file(blog_ts_path)

    # Build the new post TS object
    keywords_list = ", ".join(f'"{k.strip()}"' for k in post["keywords"])
    escaped_content = escape_ts_string(post["content"])

    new_post = f"""{{
    slug: "{post['slug']}",
    title: "{post['title']}",
    excerpt: "{post['excerpt']}",
    content: `
{escaped_content}
    `,
    date: "{post['date']}",
    category: "{post['category']}",
    readTime: "{post['readTime']}",
    keywords: [{keywords_list}],
  }},"""

    # Find the blogPosts array opening
    # Pattern: const blogPosts: BlogPost[] = [
    match = re.search(r'(const blogPosts:\s*BlogPost\[\]\s*=\s*\[)', content)
    if not match:
        print("ERROR: Could not find blogPosts array in file", file=sys.stderr)
        sys.exit(1)

    insert_pos = match.end()
    # Insert the new post right after the opening bracket
    new_content = content[:insert_pos] + "\n  " + new_post + content[insert_pos:]

    write_file(blog_ts_path, new_content)
    print(f"✅ Post added to {blog_ts_path.name}: {post['slug']}")


def update_blog_listing_ts(repo_root: Path, lang: str, post: dict):
    """Update the blog page.tsx getAllPosts import if needed."""
    blog_page = repo_root / "src" / "app" / ("(ar)" if lang == "ar" else "en") / "blog" / "page.tsx"
    if blog_page.exists():
        print(f"✅ Blog listing page exists: {blog_page}")
    else:
        print(f"⚠️  Blog listing page not found: {blog_page}")


def main():
    parser = argparse.ArgumentParser(description="Add a new blog post to adwatak")
    parser.add_argument("--title", required=True, help="Post title")
    parser.add_argument("--excerpt", required=True, help="Post excerpt / description")
    parser.add_argument("--content", required=True, help="Post HTML content")
    parser.add_argument("--category", required=True, help="Post category")
    parser.add_argument("--slug", required=True, help="URL slug (URL-friendly)")
    parser.add_argument("--keywords", default="", help="Comma-separated keywords")
    parser.add_argument("--read-time", default="5 دقائق", help="Reading time estimate")
    parser.add_argument("--lang", choices=["ar", "en"], default="ar", help="Language (ar or en)")
    parser.add_argument("--dry-run", action="store_true", help="Print the post object without writing")

    args = parser.parse_args()

    repo_root = REPO_ROOT
    if args.lang == "en":
        blog_ts_path = repo_root / "src" / "lib" / "blog-en.ts"
    else:
        blog_ts_path = repo_root / "src" / "lib" / "blog.ts"

    if not blog_ts_path.exists():
        print(f"ERROR: {blog_ts_path} not found", file=sys.stderr)
        sys.exit(1)

    keywords = [k.strip() for k in args.keywords.split(",") if k.strip()]
    post = {
        "slug": args.slug,
        "title": args.title,
        "excerpt": args.excerpt,
        "content": args.content,
        "date": today_str(),
        "category": args.category,
        "readTime": args.read_time,
        "keywords": keywords,
    }

    if args.dry_run:
        print("--- DRY RUN ---")
        print(f"Target: {blog_ts_path}")
        print(f"Slug: {post['slug']}")
        print(f"Title: {post['title']}")
        print(f"Date: {post['date']}")
        return

    add_post_to_blog_ts(blog_ts_path, post)
    update_blog_listing_ts(repo_root, args.lang, post)
    print(f"\nNow run: cd {repo_root} && git add src/lib/blog.ts && git commit -m 'add: blog post {args.slug}' && git push")


if __name__ == "__main__":
    main()
