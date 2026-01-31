import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors());

const UPSTREAM_URL = process.env.UPSTREAM_URL || 'http://127.0.0.1:8080/generate';
const PORT = process.env.PORT || 3001;

function extractTextFromUpstream(json) {
  // Try common payload shapes
  if (!json) return null;
  if (typeof json === 'string') return json;
  if (json.generated_text) return json.generated_text;
  if (json.output && typeof json.output === 'string') return json.output;
  if (Array.isArray(json) && json.length && json[0].generated_text) return json[0].generated_text;
  if (json.data && Array.isArray(json.data) && json.data[0] && json.data[0].generated_text) return json.data[0].generated_text;
  // fallback to stringify
  return JSON.stringify(json);
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, prompt } = req.body;
    // Build a prompt if messages array is provided
    let finalPrompt = prompt;
    if (!finalPrompt && Array.isArray(messages)) {
      finalPrompt = messages.map(m => (m.role === 'user' ? `User: ${m.text}` : `Assistant: ${m.text}`)).join('\n') + '\nAssistant:';
    }
    if (!finalPrompt) return res.status(400).json({ error: 'No prompt or messages provided' });

    const body = {
      prompt: finalPrompt,
      max_new_tokens: req.body.max_tokens || 512,
      temperature: req.body.temperature ?? 0.7,
    };

    const upstreamResp = await fetch(UPSTREAM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!upstreamResp.ok) {
      const text = await upstreamResp.text();
      return res.status(502).json({ error: 'Upstream error', details: text });
    }

    const json = await upstreamResp.json();
    const reply = extractTextFromUpstream(json) || '';
    res.json({ reply });
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: 'Proxy failed', details: String(err) });
  }
});

app.listen(PORT, () => console.log(`Jarvis proxy running on http://localhost:${PORT} -> upstream ${UPSTREAM_URL}`));
