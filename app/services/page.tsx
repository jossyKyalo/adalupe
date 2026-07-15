'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
 
import { Cuboid, Cpu, Activity, Users } from 'lucide-react';

const SERVICES = [
  {
    title: 'CAD Design',
    description: 'Precision 3D modeling for mechanical parts and architectural structures. We transform concepts into production-ready blueprints using Autodesk Inventor, FreeCAD, and SketchUp.',
    icon: Cuboid
  },
  {
    title: 'PCB Design',
    description: 'Custom board layouts and schematic engineering. We develop robust printed circuit boards and microcontroller systems using KiCAD, Proteus, and professional toolchains.',
    icon: Cpu
  },
  {
    title: 'Circuit Simulation',
    description: 'Rigorous pre-production performance testing. We validate circuit behavior, logic, and overall efficiency using advanced simulation environments such as PSPICE and LTspice.',
    icon: Activity
  },
  {
    title: 'Community Projects',
    description: 'Empowering local innovation. We offer our core CAD, PCB, and simulation design services pro bono for community-driven initiatives that aim to build a better future.',
    icon: Users
  }
];

export default function Services() {
  const pathname = usePathname();

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
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-[.2em] uppercase text-[#C0C0C0] mb-4 relative z-10">Expertise</h1>
        <div className="h-[2px] w-24 bg-[#C0C0C0] mb-6 relative z-10 shadow-[0_0_10px_rgba(192,192,192,0.5)]"></div>
        <p className="text-[11px] tracking-widest text-[#888] uppercase relative z-10">Precision • Innovation • Execution</p>
      </section>
 
      <section className="flex-1 w-full max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => ( 
            <div key={index} className="group relative border border-[#333] hover:border-[#C0C0C0] bg-[#141414] p-8 transition-all duration-500 overflow-hidden rounded-lg cursor-crosshair">
               
              <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
 
              <div className="flex justify-between items-start mb-12 relative z-10">
                <service.icon 
                  strokeWidth={1.2} 
                  className="w-10 h-10 text-[#666] group-hover:text-[#C0C0C0] transition-colors duration-500" 
                />
              </div> 

              <div className="relative z-10">
                <h3 className="text-lg uppercase tracking-widest text-[#ddd] group-hover:text-white mb-4 transition-colors">{service.title}</h3>
                <p className="text-[12px] text-[#777] leading-relaxed group-hover:text-[#aaa] transition-colors">
                  {service.description}
                </p>
              </div>
  
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C0C0C0] group-hover:w-full transition-all duration-700 ease-in-out"></div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}