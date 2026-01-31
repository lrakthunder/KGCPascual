Mistral 7B (Q4) GGUF — Quick setup for text-generation-webui

This guide shows how to download a Mistral 7B Q4 GGUF model from Hugging Face and run it locally with oobabooga's text-generation-webui. Includes Windows (PowerShell) and Linux commands plus small helper scripts.

Prerequisites
- Git
- Git LFS (`git lfs install`)
- Python 3.10+ and pip
- Optional: NVIDIA GPU + drivers + CUDA for good performance
- `huggingface_hub` (for programmatic download)

1) Clone the web UI

Windows / PowerShell

```powershell
# Windows / PowerShell
cd C:\path\to\where\you\want\it
git clone https://github.com/oobabooga/text-generation-webui.git
cd text-generation-webui
python -m venv .venv
.\.venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

Linux / macOS

```bash
# Linux / macOS
git clone https://github.com/oobabooga/text-generation-webui.git
cd text-generation-webui
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

2) Obtain model files (GGUF Q4)

Option A — git LFS clone (if the model repo supports it):

```bash
git lfs install
git clone https://huggingface.co/<model-repo> models/<model-name>
# locate the .gguf file inside models/<model-name> and move/copy it to text-generation-webui/models/
```

Option B — programmatic download (recommended when repo requires token):

1. Install and login with Hugging Face CLI or huggingface_hub:

```bash
pip install huggingface_hub
huggingface-cli login   # paste your HF token
```

2. Use the helper script from this repo (PowerShell or Bash) to download a file by name.

Example Python snippet you can run directly:

```python
from huggingface_hub import hf_hub_download
# replace repo_id and filename
hf_hub_download(repo_id='TheBloke/Mistral-7B-1.1-GGUF', filename='mistral-7b-q4_0.gguf', local_dir='models')
```

3) Place model into webui `models/` folder

After download, move the `.gguf` file into `text-generation-webui/models/` (create folder if needed).

4) Run text-generation-webui with the GGUF model

```bash
# from text-generation-webui directory
# use explicit path to the .gguf file for best results
python server.py --model /full/path/to/mistral-7b-q4_0.gguf --listen
```

On success the web UI will be available at http://127.0.0.1:7860 by default and the API endpoints will be exposed (depending on the webui version). Note the port and endpoint — `server/README.md` proxy expects an upstream `/generate`-like endpoint; consult the webui output for the correct API path.

Notes and tips
- Use a GPU with sufficient memory (24GB recommended for non-quantized models). Q4 GGUF reduces memory usage — some Q4 builds run on 8–16GB GPUs.
- If you run into dependencies or CUDA issues, follow the webui repo troubleshooting steps.
- This repo includes `server/scripts/download_model.ps1` and `server/scripts/download_model.sh` to help download a specific file from Hugging Face programmatically (requires `huggingface_hub` and login).
