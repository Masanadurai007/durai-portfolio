import { useState } from 'react';

function generateSessionId() {
  return 'durai_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** In-memory session id for the current browser tab's chat conversation.
 * Intentionally not persisted to localStorage/sessionStorage (unsupported
 * in this environment) — a fresh session starts each page load. */
export function useSessionId() {
  const [sessionId] = useState(generateSessionId);
  return sessionId;
}
