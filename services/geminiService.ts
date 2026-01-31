
import { USER_BIO } from "../constants";

export const askJarvis = async (query: string) => {
  try {
    const messages = [
      { role: 'system', text: `You are JARVIX, a sophisticated AI assistant for a world-class engineer. Use the following bio to answer: ${USER_BIO}. Keep tone professional, slightly witty.` },
      { role: 'user', text: query }
    ];

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    if (!res.ok) {
      console.error('Jarvis backend error', await res.text());
      return 'Error accessing core systems. Please check back later.';
    }

    const json = await res.json();
    return json.reply || 'No reply from core.';
  } catch (error) {
    console.error('JARVIS error:', error);
    return 'Error accessing core systems. Please check back later.';
  }
};
