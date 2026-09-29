import type { Project } from "../types/project";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";
export async function getProjects(): Promise<Project[]> { const response = await fetch(`${API_URL}/projects`, { headers: { Accept: "application/json", }, });
if (!response.ok) { throw new Error("Impossible de charger les projets."); }
return response.json(); }