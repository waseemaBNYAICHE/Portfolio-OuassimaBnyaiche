import type { Project } from "../types/project";
import { adminFetch } from "./adminApi";

export type AdminProject = Project;
export type ProjectPayload = Pick<Project, "title" | "description" | "status" | "featured" | "display_order"> & Partial<Pick<Project, "slug" | "short_description" | "technologies" | "image" | "github_url" | "demo_url">>;

export function getAdminProjects() { return adminFetch<AdminProject[]>("/admin/projects"); }
export function getAdminProject(slug: string) { return adminFetch<AdminProject>(`/projects/${slug}`); }
export async function createProject(payload: ProjectPayload) {
  const result = await adminFetch<{ data: AdminProject }>("/admin/projects", { method: "POST", body: JSON.stringify(payload) });
  return result.data;
}
export async function updateProject(slug: string, payload: ProjectPayload) {
  const result = await adminFetch<{ data: AdminProject }>(`/admin/projects/${slug}`, { method: "PUT", body: JSON.stringify(payload) });
  return result.data;
}
export function deleteProject(slug: string) { return adminFetch<void>(`/admin/projects/${slug}`, { method: "DELETE" }); }
