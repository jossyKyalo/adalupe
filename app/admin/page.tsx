'use client';
import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react'; 
import { supabase } from '@/lib/supabase'; 

export default function AdminUpload() { 
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
 
  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (passcode === process.env.NEXT_PUBLIC_ADMIN_PASSCODE) {
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('ACCESS DENIED: INVALID AUTHORIZATION CODE');
      setPasscode('');
    }
  };

  // --- Handle Upload ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const form = e.currentTarget;
    
    setIsSubmitting(true);
    setStatus('Initializing secure upload protocol...');
 
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const files = formData.getAll('media') as File[];

    if (!name || !category || !description || files.length === 0 || files[0].size === 0) {
      setStatus('Error: Incomplete data payload.');
      setIsSubmitting(false);
      return;
    }

    const mediaUrls: string[] = [];

    try { 
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setStatus(`Uploading file ${i + 1} of ${files.length} (${(file.size / (1024 * 1024)).toFixed(2)} MB)...`);
        
        const fileExt = file.name.split('.').pop();
        const safeName = file.name.replace(/[^a-zA-Z0-9]/g, '');
        const fileName = `${Date.now()}-${safeName}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('portfolio')
          .getPublicUrl(filePath);

        mediaUrls.push(publicUrlData.publicUrl);
      }

      setStatus('Files secured. Writing to database...');
 
      const { error: dbError } = await supabase
        .from('projects')
        .insert([{ name, category, description, images: mediaUrls }]); 

      if (dbError) throw dbError;

      setStatus('Success! Project deployed to portfolio.');
       
      form.reset();

    } catch (error: any) {
      console.error(error);
      setStatus(`Transmission Failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-[#111] text-[#ccc] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="w-full max-w-sm border border-[#333] bg-[#141414] p-8 shadow-2xl relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-[#333] flex items-center justify-center mb-6 bg-[#0a0a0a]">
            <Lock className="w-6 h-6 text-[#C0C0C0]" />
          </div>
          
          <h1 className="text-[14px] font-bold tracking-[.3em] uppercase text-[#C0C0C0] mb-2 text-center">Restricted Area</h1>
          <p className="text-[9px] tracking-widest text-[#666] mb-8 text-center uppercase">System Admin Identification Required</p>

          <form onSubmit={handleAuth} className="w-full space-y-4">
            <input 
              type="password" 
              placeholder="ENTER SECURE CODE" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] p-4 text-[13px] text-center text-white focus:border-[#C0C0C0] outline-none transition-colors tracking-[.5em]"
              autoFocus
            />
            
            {authError && <p className="text-[9px] text-red-500 text-center uppercase tracking-widest animate-pulse">{authError}</p>}
            
            <button type="submit" className="w-full bg-[#C0C0C0] text-black hover:bg-white p-4 text-[11px] tracking-[.2em] uppercase font-bold transition-all duration-300">
              Authenticate
            </button>
          </form>
        </div>
      </main>
    );
  }
 
  return (
    <main className="min-h-screen bg-[#111] text-[#ccc] p-10 font-sans flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="w-full max-w-lg border border-[#333] bg-[#141414] p-8 shadow-2xl relative z-10">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-[#C0C0C0] mb-6 border-b border-[#333] pb-4 flex items-center justify-between">
          <span>Admin Control</span>
          <span className="text-[10px] text-[#00ff00] bg-[#00ff00]/10 px-2 py-1 border border-[#00ff00]/30 animate-pulse">AUTH VERIFIED</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Project Designation</label>
            <input required name="name" type="text" placeholder="e.g., V8 Engine Block CAD" className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] outline-none transition-colors" />
          </div>

          <div className="flex flex-col">
            <label className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Classification</label>
            <select required name="category" className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] outline-none transition-colors">
              <option value="CAD Design">CAD Design</option>
              <option value="PCB Design">PCB Design</option>
              <option value="Circuit Simulation">Circuit Simulation</option>
              <option value="Community Project">Community Project</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Technical Specifications</label>
            <textarea 
              required 
              name="description" 
              rows={4} 
              placeholder="Enter project details, structural parameters, or design notes..." 
              className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col border border-[#333] p-4 bg-[#0a0a0a]">
            <label className="text-[9px] tracking-widest uppercase text-[#C0C0C0] mb-2 font-bold">Media Payload (Images & .MP4 Videos)</label>
            <p className="text-[10px] text-[#666] mb-4">Hold CTRL/CMD to select multiple files. Videos must be under 30MB.</p>
            
            <input required name="media" type="file" multiple accept="image/*,video/mp4,video/webm" className="text-[11px] text-[#888] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:tracking-widest file:uppercase file:bg-[#333] file:text-[#ccc] hover:file:bg-[#C0C0C0] hover:file:text-black transition-colors" />
          </div>

          {status && (
            <div className={`p-3 border text-[11px] tracking-widest uppercase ${status.includes('Success') ? 'border-green-500/50 bg-green-500/10 text-green-400' : 'border-[#C0C0C0]/50 bg-[#C0C0C0]/10 text-[#C0C0C0]'}`}>
              {status}
            </div>
          )}

          <button disabled={isSubmitting} type="submit" className="w-full bg-transparent border border-[#C0C0C0] text-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-[#000] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#C0C0C0] p-4 text-[11px] tracking-[.2em] uppercase font-bold transition-all duration-300 flex justify-center items-center gap-2">
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting...</> : 'Deploy to Portfolio'}
          </button>
        </form>
      </div>
    </main>
  );
}