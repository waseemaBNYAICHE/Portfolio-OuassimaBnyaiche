export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  description: string;
  technologies: string[];
  image: string | null;
  github_url: string | null;
  demo_url: string | null;
  status: "draft" | "published" | "archived";
  featured: boolean;
  display_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}