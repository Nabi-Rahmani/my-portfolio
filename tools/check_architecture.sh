#!/usr/bin/env bash
# Architecture floors for Feature-First Next.js (see .claude/agents/nextjs-architect.md).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fail() { echo "ARCHITECTURE FAIL: $*" >&2; exit 1; }

# R1 — no legacy dump trees
for dump in src/components src/types src/data src/hooks src/lib src/config; do
  if [[ -e "$ROOT/$dump" ]]; then
    fail "$dump must not exist — use src/core/ and src/features/<name>/{domain,data,application,presentation}/"
  fi
done

# R2 — every feature has the four layers
if [[ ! -d "$ROOT/src/features" ]]; then
  fail "src/features/ is required"
fi

shopt -s nullglob
for feature_dir in "$ROOT"/src/features/*/; do
  name="$(basename "$feature_dir")"
  for layer in domain data application presentation; do
    if [[ ! -d "$feature_dir$layer" ]]; then
      fail "features/$name is missing $layer/"
    fi
  done
done

# R3 — dump folder names are forbidden
for name in helpers utils misc stuff common shared widgets; do
  if [[ -d "$ROOT/src/core/$name" ]] || [[ -d "$ROOT/src/features/$name" ]]; then
    fail "dump folder $name is not allowed under core/ or features/"
  fi
  find "$ROOT/src/features" "$ROOT/src/core" -type d -name "$name" 2>/dev/null | while read -r dump_dir; do
    fail "dump folder $dump_dir is not allowed"
  done
done

# R4 — no icon library / unused backend SDK in source (blog markdown may mention them)
if command -v rg >/dev/null 2>&1; then
  if rg -l --glob '!**/blog/data/blog.ts' "from ['\"]lucide-react" "$ROOT/src"; then
    fail "lucide-react is not allowed; use inline SVGs"
  fi
  if rg -l --glob '!src/features/**/data/**' "@supabase" "$ROOT/src"; then
    fail "Supabase is not part of this static site — do not import it from app/core/presentation"
  fi
fi

echo "Architecture checks passed."
