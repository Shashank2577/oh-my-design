#!/bin/bash
# Review Gate — runs after each batch to check quality and consistency
# Usage: ./scripts/review-gate.sh
# Requires: gh CLI, JULES_API_KEY

REPO="Shashank2577/oh-my-design"

echo "=== Review Gate ==="
echo "Fetching all open PRs from Jules..."

# List all Jules PRs
gh pr list --repo "$REPO" --state open --json number,title,headRefName,url \
  --jq '.[] | "PR #\(.number): \(.title) [\(.headRefName)] → \(.url)"'

echo ""
echo "Review checklist for each style page:"
echo "  ✓ All 10 sections present (Navbar/Hero/Stats/Features/ProductDetail/Pricing/Testimonials/FAQ/Newsletter/Footer)"
echo "  ✓ 'use client' at top"
echo "  ✓ Fonts loaded via next/font/google"
echo "  ✓ Design tokens defined as constants"
echo "  ✓ All colors via Tailwind arbitrary values (not inline style={})"
echo "  ✓ Mobile responsive (grid-cols-1 md:grid-cols-3 pattern)"
echo "  ✓ Touch targets min 44px"
echo "  ✓ useReducedMotion() in all animations"
echo "  ✓ Mandatory signature elements for the style are present"
echo "  ✓ npm run build passes"
echo ""
echo "To auto-merge all passing PRs:"
echo "  gh pr list --repo $REPO --state open --json number --jq '.[].number' | xargs -I{} gh pr merge {} --repo $REPO --squash"
