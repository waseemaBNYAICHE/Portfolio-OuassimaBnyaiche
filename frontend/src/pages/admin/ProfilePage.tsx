import { useEffect, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { getPublic } from "../../services/api";
import { adminFetch } from "../../services/adminApi";

type Profile = { id?: number; full_name: string; headline: string; bio: string; photo: string; cv_url: string; location: string; availability: string; phone: string; email_public: string };
const empty: Profile = { full_name: "", headline: "", bio: "", photo: "", cv_url: "", location: "", availability: "", phone: "", email_public: "" };
export default function ProfilePage(){
  const [form,setForm]=useState<Profile>(empty);const [loading,setLoading]=useState(true);const [saving,setSaving]=useState(false);const [message,setMessage]=useState("");
  useEffect(()=>{getPublic<Profile|null>("/profile").then(p=>p&&setForm({...empty,...p})).finally(()=>setLoading(false))},[]);
  function set(key:keyof Profile,value:string){setForm(current=>({...current,[key]:value}))}
  async function submit(e:React.FormEvent){e.preventDefault();setSaving(true);setMessage("");const payload={...form};delete payload.id;try{await adminFetch(form.id?"/admin/profile/"+form.id:"/admin/profile",{method:form.id?"PUT":"POST",body:JSON.stringify(payload)});setMessage("Profil enregistré avec succès.")}catch(err){setMessage(err instanceof Error?err.message:"Enregistrement impossible")}finally{setSaving(false)}}
  if(loading)return <div className="grid min-h-72 place-items-center"><LoaderCircle className="animate-spin text-lime-300"/></div>;
  return <section className="max-w-5xl"><p className="font-semibold text-lime-300">Identité</p><h1 className="mt-2 text-3xl font-bold">Profil public</h1><p className="mt-2 text-slate-400">Ces informations alimentent directement la page d’accueil.</p>{message&&<div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">{message}</div>}<form onSubmit={submit} className="mt-8 grid gap-5 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:grid-cols-2">
    <Field label="Nom complet"><input required value={form.full_name} onChange={e=>set("full_name",e.target.value)}/></Field><Field label="Titre professionnel"><input required value={form.headline} onChange={e=>set("headline",e.target.value)}/></Field><div className="sm:col-span-2"><Field label="Biographie"><textarea rows={6} value={form.bio} onChange={e=>set("bio",e.target.value)}/></Field></div><Field label="Localisation"><input value={form.location} onChange={e=>set("location",e.target.value)}/></Field><Field label="Disponibilité"><input value={form.availability} onChange={e=>set("availability",e.target.value)}/></Field><Field label="E-mail public"><input type="email" value={form.email_public} onChange={e=>set("email_public",e.target.value)}/></Field><Field label="Téléphone"><input value={form.phone} onChange={e=>set("phone",e.target.value)}/></Field><Field label="URL photo"><input value={form.photo} onChange={e=>set("photo",e.target.value)}/></Field><Field label="URL CV"><input value={form.cv_url} onChange={e=>set("cv_url",e.target.value)}/></Field><button disabled={saving} className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-lime-300 px-5 py-3 font-bold text-slate-950">{saving?<LoaderCircle size={18} className="animate-spin"/>:<Save size={18}/>} Enregistrer le profil</button>
  </form></section>
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="admin-field"><span>{label}</span>{children}</label>}
