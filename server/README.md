Local Mistral proxy (Q4) — setup

Overview
- This server proxies chat requests from the frontend to a locally hosted model server (Mistral 7B Q4 GGUF hosted via a local model server such as text-generation-webui or text-generation-inference).

Quick start

1. Install dependencies for this proxy:

```bash
cd server
npm ci
```

2. Run a local model server
- Option A: text-generation-webui (oobabooga)
  - Follow https://github.com/oobabooga/text-generation-webui README to install and place your GGUF model under `models/`.
  - Start the webui (commonly exposes an API endpoint like `http://127.0.0.1:5000/api/v1/generate`).

- Option B: text-generation-inference (TGI)
  - See https://github.com/huggingface/text-generation-inference for serving models. TGI commonly runs at `http://127.0.0.1:8080`.

3. Configure the proxy
- Copy `.env.example` to `.env` and set `UPSTREAM_URL` to your model server's generate endpoint. Example for TGI:

```
PORT=3001
UPSTREAM_URL=http://127.0.0.1:8080/generate
```

4. Start the proxy

```bash
npm start
```

5. Run the frontend
- From the repo root run `npm run dev` (or your normal frontend dev command). The frontend will call `/api/chat` relative to the web server. For local testing you can run both servers and use a proxy (or update URLs).

Notes
- The proxy expects the upstream /generate endpoint to accept JSON like `{ prompt, max_new_tokens, temperature }` and return JSON containing the generated text (key names vary; the proxy tries several common keys).
- If you want token-by-token streaming, you'll need to run a streaming-capable model server and we'll add a `/api/chat/stream` SSE endpoint to forward tokens.
