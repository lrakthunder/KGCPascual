#!/usr/bin/env bash
# Bash helper to download a single file from a Hugging Face model repo using huggingface_hub.
# Requires: python, huggingface_hub (pip install huggingface_hub), and `huggingface-cli login` performed at least once.
# Usage: ./download_model.sh <repo-id> <filename> [outdir]

REPO_ID=${1}
FILENAME=${2}
OUTDIR=${3:-models}

if [ -z "$REPO_ID" ] || [ -z "$FILENAME" ]; then
  echo "Usage: $0 <repo-id> <filename> [outdir]"
  exit 1
fi

python - <<PY
from huggingface_hub import hf_hub_download
import sys
repo, fname, out = sys.argv[1], sys.argv[2], sys.argv[3]
print('Downloading', fname, 'from', repo)
path = hf_hub_download(repo_id=repo, filename=fname, local_dir=out)
print('Saved to', path)
PY
$?
