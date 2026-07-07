'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { submitContactForm } from '../actions/contact';

export default function Contact() {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Save the form reference immediately before the async pause!
    const form = e.currentTarget; 
    
    setIsSubmitting(true);
    setStatus({ message: '', type: null });

    const formData = new FormData(form);
    const result = await submitContactForm(formData);

    if (result?.error) {
      setStatus({ message: result.error, type: 'error' });
    } else {
      setStatus({ message: 'Transmission successful. We will respond shortly.', type: 'success' });
      // 2. Use the saved reference to reset it
      form.reset(); 
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen flex flex-col font-sans bg-[#1a1c1e] text-[#ccc] overflow-x-hidden">

      {/* NAV */}
      <nav className="w-full h-[52px] border-b border-[#888] relative flex items-center bg-[#1a1c1e] z-30 shadow-xl">
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-16 h-16 rounded-full border-[2px] border-[#C0C0C0] bg-[#222] overflow-hidden z-20 shadow-[0_0_15px_rgba(192,192,192,.2)]">
          <Image src="/logo.png" alt="Logo" fill style={{ objectFit: 'cover' }} />
        </div>
        
        <div className="grid grid-cols-2 w-full h-full">
          <div className="flex items-center justify-end pr-10 md:pr-16 border-r border-[#555]">
            {[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Services', path: '/services' }
            ].map(link => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.name} href={link.path}
                  className={`h-full flex items-center px-3 md:px-5 text-[9px] md:text-[11px] tracking-[.18em] uppercase transition-all border-r border-[#2a2a2a] last:border-0 ${
                    isActive ? 'text-white bg-white/5 font-bold shadow-[inset_0_-2px_0_#C0C0C0]' : 'text-[#aaa] hover:text-white hover:bg-white/5'
                  }`}>
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center justify-start pl-10 md:pl-16">
            {[
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map(link => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.name} href={link.path}
                  className={`h-full flex items-center px-3 md:px-5 text-[9px] md:text-[11px] tracking-[.18em] uppercase transition-all border-r border-[#2a2a2a] last:border-0 ${
                    isActive ? 'text-white bg-white/5 font-bold shadow-[inset_0_-2px_0_#C0C0C0]' : 'text-[#aaa] hover:text-white hover:bg-white/5'
                  }`}>
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="w-full py-20 flex flex-col items-center justify-center border-b border-[#333] bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-[.2em] uppercase text-[#C0C0C0] mb-4 relative z-10">Initiate Contact</h1>
        <div className="h-[2px] w-24 bg-[#C0C0C0] mb-6 relative z-10 shadow-[0_0_10px_rgba(192,192,192,0.5)]"></div>
        <p className="text-[11px] tracking-widest text-[#888] uppercase relative z-10">Consultation • Collaboration • Deployment</p>
      </section>

      {/* CONTACT SECTION */}
      <section className="flex-1 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Contact Coordinates */}
          <div className="flex flex-col justify-center border-l-2 border-[#333] pl-8 py-4 relative">
            <div className="absolute top-0 -left-[2px] w-4 h-[2px] bg-[#C0C0C0]"></div>
            <div className="absolute bottom-0 -left-[2px] w-4 h-[2px] bg-[#C0C0C0]"></div>

            <h2 className="text-[10px] tracking-[.3em] font-mono text-[#888] mb-4">01 // THE COORDINATES</h2>
            <h3 className="text-2xl text-[#ddd] tracking-widest uppercase mb-10">Direct Lines</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="p-3 border border-[#333] bg-[#111] group-hover:border-[#C0C0C0] transition-colors duration-300">
                  <Mail strokeWidth={1} className="w-6 h-6 text-[#888] group-hover:text-[#C0C0C0] transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#666] mb-1">Electronic Mail</p>
                  <p className="text-[14px] text-[#ccc] group-hover:text-white transition-colors tracking-wider">inquiries@adalupedesign.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="p-3 border border-[#333] bg-[#111] group-hover:border-[#C0C0C0] transition-colors duration-300">
                  <Phone strokeWidth={1} className="w-6 h-6 text-[#888] group-hover:text-[#C0C0C0] transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#666] mb-1">Voice Communication</p>
                  <p className="text-[14px] text-[#ccc] group-hover:text-white transition-colors tracking-wider">+254 700 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 border border-[#333] bg-[#111] group-hover:border-[#C0C0C0] transition-colors duration-300">
                  <MapPin strokeWidth={1} className="w-6 h-6 text-[#888] group-hover:text-[#C0C0C0] transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#666] mb-1">Headquarters</p>
                  <p className="text-[14px] text-[#ccc] group-hover:text-white transition-colors tracking-wider">Nairobi, Kenya<br/><span className="text-[11px] text-[#888]">Operating Globally</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="bg-[#111] border border-[#222] p-8 md:p-10 relative group hover:border-[#444] transition-colors duration-500">
            <h2 className="text-[10px] tracking-[.3em] font-mono text-[#888] mb-4">02 // TRANSMISSION</h2>
            <h3 className="text-xl text-[#ddd] tracking-widest uppercase mb-8">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Identification</label>
                  <input required id="name" name="name" type="text" placeholder="Your Name" className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] focus:outline-none transition-colors" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Return Address</label>
                  <input required id="email" name="email" type="email" placeholder="Email Address" className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] focus:outline-none transition-colors" />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Subject Parameter</label>
                <input required id="subject" name="subject" type="text" placeholder="Project Type or Inquiry" className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] focus:outline-none transition-colors" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="payload" className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Data Payload</label>
                <textarea required id="payload" name="payload" rows={5} placeholder="Describe your engineering or design requirements..." className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] focus:outline-none transition-colors resize-none"></textarea>
              </div>

              {/* Status Message Display */}
              {status.message && (
                <div className={`p-3 border text-[11px] tracking-widest uppercase ${status.type === 'success' ? 'border-green-500/50 bg-green-500/10 text-green-400' : 'border-red-500/50 bg-red-500/10 text-red-400'}`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-transparent border border-[#C0C0C0] text-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-[#000] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#C0C0C0] p-4 text-[11px] tracking-[.2em] uppercase font-bold transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Request</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-[#888] bg-[#888] gap-[1px] mt-auto">
        <div className="flex flex-col gap-4 p-8 bg-[#141414]">
          <span className="text-[10px] tracking-[.22em] uppercase text-[#555] font-bold">Socials</span>
          {[
            { icon: 'M', label: 'Gmail' },
            { icon: 'W', label: 'WhatsApp' },
            { icon: 'in', label: 'LinkedIn' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-4 text-[#777] text-[13px] cursor-pointer hover:text-[#C0C0C0] transition-colors group">
              <div className="w-[36px] h-[36px] border border-[#333] group-hover:border-[#888] rounded flex items-center justify-center text-[12px] text-[#C0C0C0] font-bold transition-colors">{icon}</div>
              <span className="tracking-wider">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-start py-10 md:pt-0 md:pb-6 bg-[#141414]">
          <div className="relative md:-top-12 flex items-center justify-center mb-4 md:mb-0 w-[130px] h-[130px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite]">
              <path id="founderCircle" d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="transparent" />
              <text>
                <textPath href="#founderCircle" startOffset="0%" className="text-[9.5px] tracking-[0.22em] uppercase fill-[#888] font-bold">
                   FOUNDER • BENARD AKUNGU OGOLLA •
                </textPath>
              </text>
            </svg>
            <div className="relative w-20 h-20 rounded-full border-[2px] border-[#C0C0C0] bg-[#222] overflow-hidden shadow-[0_0_20px_rgba(192,192,192,.1)] z-10">
              <Image src="/founder-img.png" alt="Founder" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <p className="text-[11px] tracking-[.2em] uppercase text-[#C0C0C0] md:-mt-2 text-center font-bold">Adalupe Design</p>
          <p className="text-[9px] text-[#555] tracking-widest mt-2 text-center uppercase">Mechatronic Engineer</p>
        </div>

        <div className="relative flex flex-col justify-center gap-4 p-8 bg-[#141414]">
          <span className="absolute top-4 left-6 text-[60px] leading-none text-[#2a2a2a] font-serif">&ldquo;</span>
          <p className="text-[15px] italic text-[#888] leading-relaxed relative z-10 font-serif text-center px-4">Bro knows something about everything.</p>
          <p className="text-[10px] tracking-[.15em] uppercase text-[#555] relative z-10 text-right mt-2">~ Benard Akungu Ogolla<br /></p>
          <span className="absolute bottom-4 right-6 text-[60px] leading-none text-[#2a2a2a] font-serif">&rdquo;</span>
        </div>
      </footer>
    </main>
  );
}