'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Import updated icons matching the poster services
import { Cuboid, Cpu, Activity, Users } from 'lucide-react';

const SERVICES = [
  {
    id: '01',
    title: 'CAD Designs',
    description: 'Specializing in 3D Parts & Buildings. We utilize industry-standard tools including Autodesk Inventor, FreeCAD, and SketchUp to bring your mechanical and architectural concepts to life.',
    icon: Cuboid
  },
  {
    id: '02',
    title: 'PCB Designs',
    description: 'Precision Board Layouts & Schematics. We engineer robust printed circuit boards and microcontroller systems utilizing KiCAD, Proteus, Arduino IDE, and Microchip toolchains.',
    icon: Cpu
  },
  {
    id: '03',
    title: 'Circuit Simulation',
    description: 'Rigorous Performance Testing before production. We validate circuit behavior, logic, and efficiency using advanced simulation environments like PSPICE and LTspice.',
    icon: Activity
  },
  {
    id: '04',
    title: 'Community Projects',
    description: 'Have a vision for a better Kenya? We invite community projects and offer our core CAD, PCB, and Simulation design services completely FREE to help bring your idea to life.',
    icon: Users
  }
];

export default function Services() {
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
        {/* Subtle grid background for engineering vibe */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-[.2em] uppercase text-[#C0C0C0] mb-4 relative z-10">Expertise</h1>
        <div className="h-[2px] w-24 bg-[#C0C0C0] mb-6 relative z-10 shadow-[0_0_10px_rgba(192,192,192,0.5)]"></div>
        <p className="text-[11px] tracking-widest text-[#888] uppercase relative z-10">Precision • Innovation • Execution</p>
      </section>

      {/* SERVICES GRID */}
      <section className="flex-1 w-full max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group relative border border-[#333] hover:border-[#C0C0C0] bg-[#141414] p-8 transition-all duration-500 overflow-hidden cursor-crosshair">
              
              {/* Background Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Number & Lucide Icon */}
              <div className="flex justify-between items-start mb-12 relative z-10">
                <service.icon 
                  strokeWidth={1.2} 
                  className="w-10 h-10 text-[#666] group-hover:text-[#C0C0C0] transition-colors duration-500" 
                />
                <span className="text-[10px] tracking-[.3em] font-mono text-[#444] group-hover:text-[#888] transition-colors">{service.id} //</span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg uppercase tracking-widest text-[#ddd] group-hover:text-white mb-4 transition-colors">{service.title}</h3>
                <p className="text-[12px] text-[#777] leading-relaxed group-hover:text-[#aaa] transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C0C0C0] group-hover:w-full transition-all duration-700 ease-in-out"></div>
            </div>
          ))}
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