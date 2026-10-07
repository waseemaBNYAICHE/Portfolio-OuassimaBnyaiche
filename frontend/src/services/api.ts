export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export async function getPublic<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Erreur API (${response.status})`);
  return response.json() as Promise<T>;
}

export async function postContact(payload: Record<string, string>): Promise<void> {
  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Impossible d’envoyer le message.");
}
