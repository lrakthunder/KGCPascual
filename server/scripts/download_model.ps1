<#
PowerShell helper to download a single file from a Hugging Face model repo using huggingface_hub.
Requires: python, huggingface_hub (pip install huggingface_hub), and `huggingface-cli login` performed at least once.
Usage:
  .\download_model.ps1
  or
  .\download_model.ps1 -RepoId "TheBloke/Mistral-7B-1.1-GGUF" -Filename "mistral-7b-q4_0.gguf" -OutDir "..\\text-generation-webui\\models"
#>

param(
  [string]$RepoId = $(Read-Host 'Enter HF repo id (e.g., TheBloke/Mistral-7B-1.1-GGUF)'),
  [string]$Filename = $(Read-Host 'Enter filename (e.g., mistral-7b-q4_0.gguf)'),
  [string]$OutDir = 'models'
)

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Error 'Python is not installed or not in PATH'
  exit 1
}

$py = @"
from huggingface_hub import hf_hub_download
import sys
repo, fname, out = sys.argv[1], sys.argv[2], sys.argv[3]
print('Downloading', fname, 'from', repo)
path = hf_hub_download(repo_id=repo, filename=fname, local_dir=out)
print('Saved to', path)
"@

$scriptPath = Join-Path $env:TEMP 'hf_downloader.py'
$py | Out-File -Encoding UTF8 $scriptPath

Write-Host "Running Python downloader..."
& python $scriptPath $RepoId $Filename $OutDir
$exitCode = $LASTEXITCODE

Remove-Item $scriptPath -ErrorAction SilentlyContinue
exit $exitCode
