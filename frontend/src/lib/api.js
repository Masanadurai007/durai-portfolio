import axios from 'axios';

const API_BASE_URL =
  (process.env.REACT_APP_API_URL || "http://localhost:8000") + "/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

export async function sendChatMessage(sessionId, message) {
  const { data } = await api.post('/chat', { session_id: sessionId, message });
  return data;
}

export async function submitLead({ name, email, subject, message, source = 'contact_form' }) {
  const { data } = await api.post('/leads', { name, email, subject, message, source });
  return data;
}
