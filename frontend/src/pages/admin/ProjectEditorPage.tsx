import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createProject, getAdminProject, updateProject } from "../../services/adminProjectService";
import type { ProjectPayload } from "../../services/adminProjectService";

const empty: ProjectPayload = { title: "", slug: "", short_description: "", description: "", technologies: [], image: "", github_url: "", demo_url: "", status: "draft", featured: false, display_order: 0 };

export default function ProjectEditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<ProjectPayload>(empty);
  const [tech, setTech] = useState("");
  const [loading, setLoading] = useState(Boolean(slug));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    getAdminProject(slug).then((project) => { setForm(project); setTech(project.technologies?.join(", ") || ""); }).catch((e) => setError(e instanceof Error ? e.message : "Projet introuvable.")).finally(() => setLoading(false));
  }, [slug]);

  function set<K extends keyof ProjectPayload>(key: K, value: ProjectPayload[K]) { setForm((current) => ({ ...current, [key]: value })); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    const payload = { ...form, technologies: tech.split(",").map((item) => item.trim()).filter(Boolean), slug: form.slug || undefined };
    try { if (slug) await updateProject(slug, payload); else await createProject(payload); navigate("/admin/projects"); }
    catch (e) { setError(e instanceof Error ? e.message : "Enregistrement impossible."); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="flex min-h-72 items-center justify-center"><LoaderCircle className="animate-spin text-lime-300" /></div>;
  return <section className="max-w-5xl">
    <Link to="/admin/projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={17}/> Retour aux projets</Link>
    <div className="mt-6"><p className="font-semibold text-lime-300">Portfolio</p><h1 className="mt-2 text-3xl font-bold">{slug ? "Modifier le projet" : "Nouveau projet"}</h1><p className="mt-2 text-slate-400">Les données enregistrées seront disponibles dans le portfolio public.</p></div>
    {error && <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</div>}
    <form onSubmit={submit} className="mt-8 grid gap-5 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:grid-cols-2">
      <Field label="Titre"><input required value={form.title} onChange={(e)=>set("title",e.target.value)}/></Field>
      <Field label="Slug (optionnel)"><input value={form.slug || ""} onChange={(e)=>set("slug",e.target.value)}/></Field>
      <div className="sm:col-span-2"><Field label="Description courte"><input value={form.short_description || ""} maxLength={255} onChange={(e)=>set("short_description",e.target.value)}/></Field></div>
      <div className="sm:col-span-2"><Field label="Description"><textarea required rows={6} value={form.description} onChange={(e)=>set("description",e.target.value)}/></Field></div>
      <div className="sm:col-span-2"><Field label="Technologies (séparées par des virgules)"><input value={tech} onChange={(e)=>setTech(e.target.value)} placeholder="React, Laravel, PostgreSQL"/></Field></div>
      <Field label="URL image"><input value={form.image || ""} onChange={(e)=>set("image",e.target.value)}/></Field>
      <Field label="URL GitHub"><input type="url" value={form.github_url || ""} onChange={(e)=>set("github_url",e.target.value)}/></Field>
      <Field label="URL démo"><input type="url" value={form.demo_url || ""} onChange={(e)=>set("demo_url",e.target.value)}/></Field>
      <Field label="Statut"><select value={form.status} onChange={(e)=>set("status",e.target.value as ProjectPayload["status"])}><option value="draft">Brouillon</option><option value="published">Publié</option><option value="archived">Archivé</option></select></Field>
      <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={form.featured} onChange={(e)=>set("featured",e.target.checked)} className="h-5 w-5"/> Mettre ce projet en avant</label>
      <Field label="Ordre d’affichage"><input type="number" min="0" value={form.display_order} onChange={(e)=>set("display_order",Number(e.target.value))}/></Field>
      <div className="sm:col-span-2 flex justify-end gap-3 border-t border-white/10 pt-5"><Link to="/admin/projects" className="rounded-xl border border-white/10 px-5 py-3 text-sm">Annuler</Link><button disabled={saving} className="flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 text-sm font-bold text-slate-950 disabled:opacity-60">{saving?<LoaderCircle className="animate-spin" size={18}/>:<Save size={18}/>} Enregistrer</button></div>
    </form>
  </section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="admin-field"><span>{label}</span>{children}</label>;
}
