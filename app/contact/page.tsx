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

    const form = e.currentTarget;

    setIsSubmitting(true);
    setStatus({ message: '', type: null });

    const formData = new FormData(form);
    const result = await submitContactForm(formData);

    if (result?.error) {
      setStatus({ message: result.error, type: 'error' });
    } else {
      setStatus({ message: 'Message sent successfully. We will respond shortly.', type: 'success' });
      form.reset();
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen flex flex-col font-sans bg-[#1a1c1e] text-[#ccc] overflow-x-hidden">

       <nav className="w-full h-[52px] border-b border-[#888] relative flex items-center bg-[#1a1c1e] z-30 shadow-xl">
        
        {/* Floating Center Logo */}
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-16 h-16 rounded-full border-[2px] border-[#C0C0C0] bg-[#222] overflow-hidden z-40 shadow-[0_0_15px_rgba(192,192,192,.2)]">
          <Image src="/logo.png" alt="Logo" fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="grid grid-cols-2 w-full h-full">
          
          {/* Left Side Links */}
          <div className="flex items-center justify-end pr-[36px] md:pr-16 border-r border-[#555] overflow-hidden">
            {[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Services', path: '/services' }
            ].map(link => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.name} href={link.path}
                  /* Scaled down to px-1.5, text-[8px], and tighter tracking for tiny mobile screens */
                  className={`h-full flex items-center px-1.5 sm:px-3 md:px-5 text-[8px] md:text-[11px] tracking-widest md:tracking-[.18em] uppercase transition-all border-r border-[#2a2a2a] whitespace-nowrap shrink-0 ${
                    isActive ? 'text-white bg-white/5 font-bold shadow-[inset_0_-2px_0_#C0C0C0]' : 'text-[#aaa] hover:text-white hover:bg-white/5'
                  }`}>
                  {link.name}
                </Link>
              );
            })}
          </div>
          
          {/* Right Side Links */}
          <div className="flex items-center justify-start pl-[36px] md:pl-16 overflow-hidden">
            {[
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map(link => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.name} href={link.path}
                  /* Scaled down to match the left side proportions */
                  className={`h-full flex items-center px-2 sm:px-3 md:px-5 text-[8px] md:text-[11px] tracking-widest md:tracking-[.18em] uppercase transition-all border-r border-[#2a2a2a] last:border-0 whitespace-nowrap shrink-0 ${
                    isActive ? 'text-white bg-white/5 font-bold shadow-[inset_0_-2px_0_#C0C0C0]' : 'text-[#aaa] hover:text-white hover:bg-white/5'
                  }`}>
                  {link.name}
                </Link>
              );
            })}
          </div>

        </div>
      </nav>

      <section className="w-full py-20 flex flex-col items-center justify-center border-b border-[#333] bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-[.2em] uppercase text-[#C0C0C0] mb-4 relative z-10">Get In Touch</h1>
        <div className="h-[2px] w-24 bg-[#C0C0C0] mb-6 relative z-10 shadow-[0_0_10px_rgba(192,192,192,0.5)]"></div>
        <p className="text-[11px] tracking-widest text-[#888] uppercase relative z-10">Let&apos;s Discuss Your Next Project</p>
      </section>

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div className="flex flex-col justify-center border-l-2 border-[#333] pl-8 py-4 relative">
            <div className="absolute top-0 -left-[2px] w-4 h-[2px] bg-[#C0C0C0]"></div>
            <div className="absolute bottom-0 -left-[2px] w-4 h-[2px] bg-[#C0C0C0]"></div>

            <h2 className="text-[10px] tracking-[.3em] font-mono text-[#888] mb-4">CONTACT DETAILS</h2>
            <h3 className="text-2xl text-[#ddd] tracking-widest uppercase mb-10">Direct Lines</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="p-3 border border-[#333] bg-[#111] group-hover:border-[#C0C0C0] transition-colors duration-300">
                  <Mail strokeWidth={1} className="w-6 h-6 text-[#888] group-hover:text-[#C0C0C0] transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#666] mb-1">Email</p>
                  <p className="text-[14px] text-[#ccc] group-hover:text-white transition-colors tracking-wider">bennyES1318@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="p-3 border border-[#333] bg-[#111] group-hover:border-[#C0C0C0] transition-colors duration-300">
                  <Phone strokeWidth={1} className="w-6 h-6 text-[#888] group-hover:text-[#C0C0C0] transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#666] mb-1">Phone</p>
                  <p className="text-[14px] text-[#ccc] group-hover:text-white transition-colors tracking-wider">+254 738 129 916</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 border border-[#333] bg-[#111] group-hover:border-[#C0C0C0] transition-colors duration-300">
                  <MapPin strokeWidth={1} className="w-6 h-6 text-[#888] group-hover:text-[#C0C0C0] transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#666] mb-1">Location</p>
                  <p className="text-[14px] text-[#ccc] group-hover:text-white transition-colors tracking-wider">Nairobi, Kenya<br /><span className="text-[11px] text-[#888]">Operating Globally</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-[#222] p-8 md:p-10 relative group hover:border-[#444] transition-colors duration-500">
            <h2 className="text-[10px] tracking-[.3em] font-mono text-[#888] mb-4">INQUIRIES</h2>
            <h3 className="text-xl text-[#ddd] tracking-widest uppercase mb-8">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Name</label>
                  <input required id="name" name="name" type="text" placeholder="Your Name" className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] focus:outline-none transition-colors" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Email</label>
                  <input required id="email" name="email" type="email" placeholder="Email Address" className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] focus:outline-none transition-colors" />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Subject</label>
                <input required id="subject" name="subject" type="text" placeholder="Project Type or Inquiry" className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] focus:outline-none transition-colors" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="payload" className="text-[9px] tracking-widest uppercase text-[#777] mb-2">Message</label>
                <textarea required id="payload" name="payload" rows={5} placeholder="Describe your engineering or design requirements..." className="bg-[#0a0a0a] border border-[#333] p-3 text-[13px] text-white focus:border-[#C0C0C0] focus:outline-none transition-colors resize-none"></textarea>
              </div>

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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
}