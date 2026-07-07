'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target, Zap, ShieldCheck } from 'lucide-react';

export default function About() {
  const pathname = usePathname();

  return (
    <main className="min-h-screen flex flex-col font-sans bg-[#1a1c1e] text-[#ccc] overflow-x-hidden">

      {/* NAV - With Active Route Detection */}
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
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-[.2em] uppercase text-[#C0C0C0] mb-4 relative z-10">Our Story</h1>
        <div className="h-[2px] w-24 bg-[#C0C0C0] mb-6 relative z-10 shadow-[0_0_10px_rgba(192,192,192,0.5)]"></div>
        <p className="text-[11px] tracking-widest text-[#888] uppercase relative z-10">Engineering • Aesthetics • Logic</p>
      </section>

      {/* THE FOUNDER & THE FIRM SECTION */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image & Badge */}
          <div className="relative group">
            {/* The structural border frame */}
            <div className="absolute -inset-4 border border-[#333] group-hover:border-[#555] transition-colors duration-500 z-0 hidden md:block">
              {/* Corner crosshairs */}
              <div className="absolute -top-[5px] -left-[5px] w-2 h-2 border-t-2 border-l-2 border-[#C0C0C0]"></div>
              <div className="absolute -bottom-[5px] -right-[5px] w-2 h-2 border-b-2 border-r-2 border-[#C0C0C0]"></div>
            </div>

            <div className="relative w-full aspect-[4/5] bg-[#111] border border-[#444] overflow-hidden z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700">
              <Image 
                src="/founder-img.png" 
                alt="Benard Akungu Ogolla" 
                fill 
                style={{ objectFit: 'cover', objectPosition: 'top center' }} 
              />
            </div>
            
            {/* Overlay Tag */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-[#0d0d0d] border border-[#888] p-6 z-20 shadow-2xl">
              <p className="text-[14px] tracking-[.2em] uppercase text-[#C0C0C0] font-bold mb-1">Benard A. Ogolla</p>
              <p className="text-[9px] text-[#777] tracking-widest uppercase">Founder // Mechatronic Engineer</p>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[10px] tracking-[.3em] font-mono text-[#888] mb-4">01 // THE ARCHITECT OF SYSTEMS</h2>
            <h3 className="text-2xl md:text-3xl text-[#ddd] tracking-wider mb-8 leading-snug">
              Bridging the gap between <span className="text-white border-b border-[#C0C0C0]">physical hardware</span> and <span className="text-white border-b border-[#C0C0C0]">digital intelligence</span>.
            </h3>
            
            <div className="space-y-6 text-[13px] text-[#888] leading-relaxed">
              <p>
                Adalupe Design Group was founded on a singular premise: true innovation occurs at the intersection of disciplines. In a world where mechanical, electrical, and software engineering are often siloed, we treat them as one cohesive ecosystem.
              </p>
              <p>
                As a Mechatronic Engineer, Benard Akungu Ogolla approaches every project with a systems-level mindset. Whether it is designing the precise tolerances of a mechanical component, programming the logic of an automated system, or conceptualizing a structural blueprint, the focus is always on creating solutions that are structurally sound, aesthetically striking, and highly functional.
              </p>
              <blockquote className="border-l-2 border-[#C0C0C0] pl-6 py-2 my-6 bg-[#141414] italic text-[#aaa]">
                "Bro knows something about everything."
              </blockquote>
              <p>
                We don't just draft blueprints; we engineer reality. From East Africa to the global stage, Adalupe Design Group is dedicated to pushing the boundaries of what is mechanically and digitally possible.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CORE PRINCIPLES GRID */}
      <section className="w-full bg-[#111] border-y border-[#333] py-20 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[14px] tracking-[.3em] uppercase text-[#C0C0C0] font-bold">Core Principles</h2>
            <div className="h-[1px] w-12 bg-[#555] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Absolute Precision', text: 'Every CAD line, line of code, and structural joint is calculated with mathematical rigor. There is no room for guesswork in engineering.', icon: Target },
              { title: 'Systemic Synergy', text: 'We ensure that software, electronics, and physical mechanics communicate flawlessly. A system is only as strong as its integration.', icon: Zap },
              { title: 'Structural Integrity', text: 'Design is not just what it looks like; it is how it works and how long it lasts. We build frameworks meant to withstand the test of time.', icon: ShieldCheck }
            ].map((principle, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 border border-[#222] bg-[#141414] hover:border-[#555] transition-colors duration-300">
                <principle.icon strokeWidth={1} className="w-12 h-12 text-[#C0C0C0] mb-6" />
                <h3 className="text-[13px] tracking-widest uppercase text-[#ddd] mb-3">{principle.title}</h3>
                <p className="text-[11px] text-[#777] leading-relaxed">{principle.text}</p>
              </div>
            ))}
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