const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  token?: string;
  access_token?: string;
  data?: {
    token?: string;
    user?: User;
  };
  user?: User;
}

export async function login(
  email: string,
  password: string
): Promise<User | undefined> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result: LoginResponse & {
    message?: string;
    errors?: Record<string, string[]>;
  } = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ?? "Email ou mot de passe incorrect."
    );
  }

  const token =
    result.token ??
    result.access_token ??
    result.data?.token;

  if (!token) {
    throw new Error("Le serveur n'a retourné aucun token.");
  }

  localStorage.setItem("admin_token", token);

  return result.user ?? result.data?.user;
}

export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem("admin_token");

  if (!token) {
    throw new Error("Utilisateur non authentifié.");
  }

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    localStorage.removeItem("admin_token");
    throw new Error("Session expirée.");
  }

  return response.json();
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem("admin_token");

  try {
    if (token) {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } finally {
    localStorage.removeItem("admin_token");
  }
}

export function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}