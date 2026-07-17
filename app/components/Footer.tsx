'use client';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-[#888] bg-[#888] gap-[1px] mt-auto">
    
      <div className="flex flex-col gap-4 p-8 bg-[#141414] relative z-[99]">
        <span className="text-[10px] tracking-[.22em] uppercase text-[#555] font-bold mb-2">Socials</span>
        {[
          { 
            label: 'Gmail', 
            href: 'mailto:bennyES1318@gmail.com',
            icon: (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            )
          },
          { 
            label: 'WhatsApp', 
            href: 'https://wa.me/254738129916',
            icon: (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            )
          },
          { 
            label: 'LinkedIn', 
            href: 'https://www.linkedin.com/in/benard-ogolla-59a086258', 
            icon: (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            )
          },
          { 
            label: 'TikTok', 
            href: 'https://www.tiktok.com/@troneiks_bes?is_from_webapp=1&sender_device=pc', 
            icon: (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.97-1.561 4.78 4.78 0 0 1-1.358-3.414h-3.882v14.15a3.639 3.639 0 1 1-3.64-3.64 3.64 3.64 0 0 1 2.228.774V9.083a7.514 7.514 0 1 0 5.295 7.185V10.15a8.683 8.683 0 0 0 5.327 1.831V8.093a4.832 4.832 0 0 1-0-.001z"/>
              </svg>
            )
          },
        ].map(({ icon, label, href }) => (
          <a 
            key={label} 
            href={href}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-[#777] text-[13px] cursor-pointer hover:text-[#C0C0C0] transition-colors group pointer-events-auto"
          >
            <div className="w-[36px] h-[36px] border border-[#333] group-hover:border-[#C0C0C0] rounded flex items-center justify-center text-[#C0C0C0] group-hover:text-[#000] group-hover:bg-[#C0C0C0] transition-all duration-300">
              {icon}
            </div>
            <span className="tracking-wider">{label}</span>
          </a>
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
        <p className="text-[15px] italic text-[#888] leading-relaxed relative z-10 font-serif text-center px-4">~ Good design should not be a luxury reserved for the few. It must be a common good that serves the many.</p>
        <p className="text-[10px] tracking-[.15em] uppercase text-[#555] relative z-10 text-right mt-2">~ Benard Akungu Ogolla<br /></p>
        <span className="absolute bottom-4 right-6 text-[60px] leading-none text-[#2a2a2a] font-serif">&rdquo;</span>
      </div>
    </footer>
  );
}