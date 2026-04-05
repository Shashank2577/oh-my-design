#!/bin/bash
# Jules Orchestrator — polls sessions, auto-merges PRs, dispatches next batches
# Usage: ./scripts/jules-orchestrator.sh
# Reads: .jules-state.json, .jules-plan.json
# Requires: JULES_API_KEY env var, gh CLI authenticated

set -e

JULES_API_KEY="${JULES_API_KEY:?Error: JULES_API_KEY env var is required. Export it before running.}"
REPO="Shashank2577/oh-my-design"
STATE_FILE=".jules-state.json"
PLAN_FILE=".jules-plan.json"

# ─────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────

log() { echo "[$(date '+%H:%M:%S')] $1"; }

check_session() {
  local session_id="$1"
  curl -s "https://jules.googleapis.com/v1alpha/${session_id}" \
    -H "X-Goog-Api-Key: $JULES_API_KEY" | \
    python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('state','UNKNOWN'))"
}

get_pr_url() {
  local session_id="$1"
  curl -s "https://jules.googleapis.com/v1alpha/${session_id}" \
    -H "X-Goog-Api-Key: $JULES_API_KEY" | \
    python3 -c "
import sys,json
d=json.load(sys.stdin)
pr = d.get('pullRequestMetadata',{}).get('url','')
print(pr)
"
}

create_session() {
  local prompt="$1"
  curl -s -X POST 'https://jules.googleapis.com/v1alpha/sessions' \
    -H "X-Goog-Api-Key: $JULES_API_KEY" \
    -H 'Content-Type: application/json' \
    -d "{
      \"prompt\": $(echo "$prompt" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'),
      \"sourceContext\": {
        \"source\": \"sources/github/${REPO}\",
        \"githubRepoContext\": { \"startingBranch\": \"main\" }
      },
      \"automationMode\": \"AUTO_CREATE_PR\"
    }" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('name','ERROR'))"
}

auto_merge_pr() {
  local pr_url="$1"
  local pr_number
  pr_number=$(echo "$pr_url" | grep -o '[0-9]*$')
  if [ -n "$pr_number" ]; then
    log "Auto-merging PR #$pr_number"
    gh pr merge "$pr_number" --repo "$REPO" --squash --auto 2>/dev/null || \
    gh pr merge "$pr_number" --repo "$REPO" --squash 2>/dev/null || \
    log "Warning: Could not auto-merge PR #$pr_number — may need manual merge"
  fi
}

# ─────────────────────────────────────────────────────
# Wave 1 prompts (Batches 2+3, tasks t2-t6)
# ─────────────────────────────────────────────────────

PROMPT_ACADEMIA="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 1. Academia' in designprompts_dev_all_styles.md.

Create app/styles/academia/page.tsx — a full, production-grade landing page implementing the Academia/Classical design system exactly as specified.

Requirements:
- 'use client' at top
- Fonts: Cormorant_Garamond (heading), Crimson_Pro (body), Cinzel (display/labels) via next/font/google
- Exact design tokens: background #1C1714, backgroundAlt #251E19, foreground #E8DFD4, muted #3D332B, mutedForeground #9C8B7A, border #4A3F35, accent #C9A962, accentSecondary #8B2635
- All 10 sections: Navbar, Hero, Stats, Features, ProductDetail, Pricing, Testimonials, FAQ, Newsletter, Footer
- MANDATORY signature elements: arch-top images (border-radius: 40% 40% 0 0 / 20% 20% 0 0), sepia-to-color image transitions on hover (700ms), Roman numeral section labels (Volume I, II, III...), drop caps on opening paragraphs (Cinzel font, 72px, brass color), corner flourishes on cards (brass pseudo-element brackets), ornate gradient dividers with centered Unicode glyphs, wax seal badges (crimson radial gradient circles) on featured pricing tier, brass gradient buttons (linear-gradient(180deg, #D4B872 0%, #C9A962 50%, #B8953F 100%)), engraved text shadows on buttons, paper texture overlay (3% opacity noise), vignette effect (radial gradient overlay)
- Framer Motion: dignified timing 500-700ms, ease-out, scroll-triggered entrances
- Content: scholarly/academic language, knowledge/scholarship theme
- Fully responsive mobile-first, 44px min touch targets, useReducedMotion()
- After creating the file, run: cd /repo && npm run build to verify it compiles"

PROMPT_ARTDECO="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 2. Art Deco' in designprompts_dev_all_styles.md.

Create app/styles/art-deco/page.tsx — a full Art Deco landing page. All 10 sections. Follow every signature element in the spec exactly. Fonts, tokens, animations all from the spec. Content themed for luxury/premium. Build verifies with npm run build."

PROMPT_BAUHAUS="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 3. Bauhaus' in designprompts_dev_all_styles.md.

Create app/styles/bauhaus/page.tsx — a full Bauhaus landing page. All 10 sections. Geometric, primary colors, form-follows-function. Mechanical 300ms animations. Design tool theme. npm run build must pass."

PROMPT_BOLD_TYPOGRAPHY="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 4. Bold Typography' in designprompts_dev_all_styles.md.

Create app/styles/bold-typography/page.tsx — a full Bold Typography landing page. All 10 sections. Type IS the design — oversized headlines, dramatic contrasts, editorial feel. All spec signature elements. npm run build must pass."

PROMPT_BOTANICAL="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 5. Botanical' in designprompts_dev_all_styles.md.

Create app/styles/botanical/page.tsx — a full Botanical landing page. All 10 sections. Organic shapes, earthy greens, flowing curves, no sharp corners. 600-900ms ease-in-out animations. Wellness theme. npm run build must pass."

PROMPT_CLAYMORPHISM="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 6. Claymorphism' in designprompts_dev_all_styles.md.

Create app/styles/claymorphism/page.tsx — a full Claymorphism landing page. All 10 sections. Puffy 3D clay elements via layered box-shadows, pastels, rounded blobs. Spring bounce animations. Creative/playful theme. npm run build must pass."

PROMPT_CYBERPUNK="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 7. Cyberpunk' in designprompts_dev_all_styles.md.

Create app/styles/cyberpunk/page.tsx — a full Cyberpunk landing page. All 10 sections. Neon glows via box-shadow, dark bg, cyan/magenta accents, glitch CSS effects, grid overlays, scanlines. Fast 100-200ms snappy animations. Gaming/tech theme. npm run build must pass."

PROMPT_ENTERPRISE="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 8. Enterprise' in designprompts_dev_all_styles.md.

Create app/styles/enterprise/page.tsx — a full Enterprise landing page. All 10 sections. Corporate blue, trust badges, clean grid, data visualization hints, professional testimonials with company logos. Subtle 300ms animations. B2B SaaS theme. npm run build must pass."

PROMPT_FLAT="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 9. Flat Design' in designprompts_dev_all_styles.md.

Create app/styles/flat-design/page.tsx — a full Flat Design landing page. All 10 sections. Zero shadows, flat 2D icons, bright solids, no gradients, geometric shapes. Clean precise animations. Mobile app/dashboard theme. npm run build must pass."

PROMPT_FLUENT="Read AGENTS.md, docs/architecture.md, docs/ui-ux-guidelines.md, docs/animation-guide.md, and docs/page-template.tsx. Then read section '## 10. Fluent 2' in designprompts_dev_all_styles.md.

Create app/styles/fluent-2/page.tsx — a full Fluent 2 landing page. All 10 sections. Acrylic/mica materials via backdrop-filter blur, layered depth, Microsoft blue palette, Fluent depth system. Spring physics animations. Windows/Microsoft ecosystem theme. npm run build must pass."

# ─────────────────────────────────────────────────────
# Main polling loop
# ─────────────────────────────────────────────────────

log "Starting Jules Orchestrator for $REPO"
log "Polling every 5 minutes..."

while true; do
  # Read current state
  CURRENT_BATCH=$(python3 -c "import json; d=json.load(open('$STATE_FILE')); print(d['current_batch'])")
  log "Current batch: $CURRENT_BATCH"

  if [ "$CURRENT_BATCH" = "1" ]; then
    # Check if t1 is done
    SESSION_ID=$(python3 -c "import json; d=json.load(open('$STATE_FILE')); print(d['sessions'][0]['session_id'])")
    STATE=$(check_session "$SESSION_ID")
    log "t1 state: $STATE"

    if [ "$STATE" = "COMPLETED" ]; then
      PR_URL=$(get_pr_url "$SESSION_ID")
      log "t1 completed! PR: $PR_URL"

      # Auto-merge t1 PR
      if [ -n "$PR_URL" ]; then
        auto_merge_pr "$PR_URL"
        sleep 10  # Wait for merge to propagate
      fi

      # Dispatch all 10 style pages simultaneously (batches 2+3)
      log "Dispatching all 10 style pages in parallel..."

      S_T2=$(create_session "$PROMPT_ACADEMIA"); log "t2 academia: $S_T2"
      S_T3=$(create_session "$PROMPT_ARTDECO"); log "t3 art-deco: $S_T3"
      S_T4=$(create_session "$PROMPT_BAUHAUS"); log "t4 bauhaus: $S_T4"
      S_T5=$(create_session "$PROMPT_BOLD_TYPOGRAPHY"); log "t5 bold-typography: $S_T5"
      S_T6=$(create_session "$PROMPT_BOTANICAL"); log "t6 botanical: $S_T6"
      S_T7=$(create_session "$PROMPT_CLAYMORPHISM"); log "t7 claymorphism: $S_T7"
      S_T8=$(create_session "$PROMPT_CYBERPUNK"); log "t8 cyberpunk: $S_T8"
      S_T9=$(create_session "$PROMPT_ENTERPRISE"); log "t9 enterprise: $S_T9"
      S_T10=$(create_session "$PROMPT_FLAT"); log "t10 flat-design: $S_T10"
      S_T11=$(create_session "$PROMPT_FLUENT"); log "t11 fluent-2: $S_T11"

      # Update state
      python3 -c "
import json
d = json.load(open('$STATE_FILE'))
d['current_batch'] = 2
d['sessions'][0]['state'] = 'COMPLETED'
d['sessions'][0]['pr_url'] = '$PR_URL'
d['sessions'] += [
  {'task_id':'t2','title':'Academia','session_id':'$S_T2','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t3','title':'Art Deco','session_id':'$S_T3','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t4','title':'Bauhaus','session_id':'$S_T4','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t5','title':'Bold Typography','session_id':'$S_T5','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t6','title':'Botanical','session_id':'$S_T6','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t7','title':'Claymorphism','session_id':'$S_T7','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t8','title':'Cyberpunk','session_id':'$S_T8','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t9','title':'Enterprise','session_id':'$S_T9','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t10','title':'Flat Design','session_id':'$S_T10','state':'IN_PROGRESS','pr_url':None},
  {'task_id':'t11','title':'Fluent 2','session_id':'$S_T11','state':'IN_PROGRESS','pr_url':None},
]
json.dump(d, open('$STATE_FILE','w'), indent=2)
print('State updated to batch 2')
"
      log "All 10 style pages dispatched!"
    fi

  elif [ "$CURRENT_BATCH" = "2" ]; then
    # Poll all style page sessions (t2-t11), auto-merge completed ones
    COMPLETED=0
    TOTAL=10

    python3 - <<'EOF'
import json, subprocess, sys

state_file = ".jules-state.json"
import os
api_key = os.environ["JULES_API_KEY"]

d = json.load(open(state_file))
sessions = [s for s in d['sessions'] if s['task_id'] != 't1']
completed = 0

for s in sessions:
    if s['state'] == 'COMPLETED':
        completed += 1
        continue

    result = subprocess.run([
        'curl', '-s', f"https://jules.googleapis.com/v1alpha/{s['session_id']}",
        '-H', f"X-Goog-Api-Key: {api_key}"
    ], capture_output=True, text=True)

    try:
        data = json.loads(result.stdout)
        state = data.get('state', 'UNKNOWN')
        pr_url = data.get('pullRequestMetadata', {}).get('url', '')
        s['state'] = state
        if pr_url:
            s['pr_url'] = pr_url
        print(f"  {s['title']}: {state} {pr_url or ''}")

        if state == 'COMPLETED' and pr_url:
            completed += 1
            # Extract PR number and merge
            pr_num = pr_url.rstrip('/').split('/')[-1]
            merge = subprocess.run([
                'gh', 'pr', 'merge', pr_num, '--repo', 'Shashank2577/oh-my-design',
                '--squash', '--auto'
            ], capture_output=True, text=True)
            if merge.returncode == 0:
                print(f"  ✅ Auto-merged PR #{pr_num} for {s['title']}")
            else:
                print(f"  ⚠️  Could not auto-merge #{pr_num}: {merge.stderr[:100]}")
    except Exception as e:
        print(f"  Error checking {s['title']}: {e}")

d['completed_style_pages'] = completed
json.dump(d, open(state_file, 'w'), indent=2)
print(f"\nProgress: {completed}/10 style pages completed")
EOF

    # Check if all done
    COMPLETED=$(python3 -c "import json; d=json.load(open('$STATE_FILE')); print(d.get('completed_style_pages',0))")
    if [ "$COMPLETED" = "10" ]; then
      log "All 10 style pages done! 🎉"
      log "Run the review gate next: claude -p 'Review all 10 style pages in the repo for quality and consistency per docs/ui-ux-guidelines.md'"
      python3 -c "import json; d=json.load(open('$STATE_FILE')); d['current_batch']=3; json.dump(d,open('$STATE_FILE','w'),indent=2)"
      break
    fi
  else
    log "All batches complete! Check https://github.com/$REPO"
    break
  fi

  log "Sleeping 5 minutes..."
  sleep 300
done
