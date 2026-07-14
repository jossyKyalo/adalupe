'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const FALLBACK_PROJECTS = [
  {
    id: 1,
    category: 'CAD Design',
    name: 'Mechanical Assembly',
    images: ['/header-image.png', '/header-image.png', '/header-image.png']
  },
  {
    id: 2,
    category: 'CAD Design',
    name: 'Turbine Housing Concept',
    images: ['/header-image.png', '/header-image.png', '/header-image.png']
  },
  {
    id: 3,
    category: 'PCB Design',
    name: 'Custom Control Board',
    images: ['/header-image.png', '/header-image.png', '/header-image.png']
  },
  {
    id: 4,
    category: 'PCB Design',
    name: 'IoT Sensor Array',
    images: ['/header-image.png', '/header-image.png', '/header-image.png']
  },
  {
    id: 5,
    category: 'Circuit Simulation',
    name: 'Power Distribution Test',
    images: ['/header-image.png', '/header-image.png', '/header-image.png']
  },
  {
    id: 6,
    category: 'Community Project',
    name: 'Solar Hub Blueprint',
    images: ['/header-image.png', '/header-image.png', '/header-image.png']
  },
];

const CATEGORIES = ['All', 'CAD Design', 'PCB Design', 'Circuit Simulation', 'Community Project'];

 
const ProjectCard = ({ project, isAutoPlay }: { project: any, isAutoPlay: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAutoPlay || !project.images || project.images.length <= 1 || isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % project.images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [project?.images?.length, isAutoPlay, isModalOpen]);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  if (!project || !project.images) return null;

  return (
    <> 
      <div
        onClick={() => setIsModalOpen(true)}
        className="relative z-0 group cursor-pointer border border-[#333] hover:border-[#C0C0C0] transition-all duration-500 bg-[#111] h-full flex flex-col rounded-lg hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(192,192,192,0.15)] hover:z-10"
      > 

        <div className="w-full h-56 md:h-60 relative overflow-hidden bg-[#0a0a0a] shrink-0 rounded-t-lg">
 
          {project.images.map((mediaUrl: string, idx: number) => {
            const isVideo = mediaUrl.toLowerCase().endsWith('.mp4') || mediaUrl.toLowerCase().endsWith('.webm');
            return (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                {isVideo ? (
                  <video src={mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                ) : (
                  <img src={mediaUrl} alt={`${project.name} - Slide ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </div>
            );
          })}
 
          {project.images.length > 1 && (
            <>
              <button onClick={prevSlide} className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white transition-opacity hover:bg-black/90 border border-[#444] hover:border-[#C0C0C0] z-20 ${isAutoPlay ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white transition-opacity hover:bg-black/90 border border-[#444] hover:border-[#C0C0C0] z-20 ${isAutoPlay ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
 
          <div className="absolute top-4 right-4 bg-[#1a1c1e]/90 border border-[#C0C0C0]/50 rounded-full px-4 py-1.5 backdrop-blur-sm z-20">
            <span className="text-[8px] tracking-widest text-[#C0C0C0] uppercase">{project.category}</span>
          </div>
 
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {project.images.map((_: any, idx: number) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#C0C0C0] scale-125' : 'bg-[#555]'}`} />
              ))}
            </div>
          )}
        </div>
 
        <div className="p-6 flex-1 flex flex-col justify-center">
          <h3 className="text-lg md:text-xl text-[#ddd] tracking-wide group-hover:text-white transition-colors">{project.name}</h3>
          <div className="w-12 h-[1px] bg-[#444] group-hover:bg-[#C0C0C0] my-4 transition-colors duration-500"></div>
          <p className="text-[10px] text-[#666] tracking-widest uppercase group-hover:text-[#aaa] transition-colors">
            {isAutoPlay ? 'View Details' : 'Swipe To Explore'}
          </p>
        </div>
      </div>
 
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        > 

          <div
            className="bg-[#0a0a0a]/75 backdrop-blur-xl border border-[#333] rounded-lg w-full max-w-4xl max-h-[85vh] flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          > 

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 bg-[#111]/60 hover:bg-[#C0C0C0] text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center border border-[#444] transition-colors backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
 
            <div className="w-full md:w-1/2 h-[300px] md:h-[65vh] bg-black/40 relative">
              {project.images.map((mediaUrl: string, idx: number) => {
                const isVideo = mediaUrl.toLowerCase().endsWith('.mp4') || mediaUrl.toLowerCase().endsWith('.webm');
                return (
                  <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    {isVideo ? (
                      <video src={mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-contain" />
                    ) : (
                      <img src={mediaUrl} alt={`${project.name} - Modal Slide`} className="w-full h-full object-contain" />
                    )}
                  </div>
                );
              })}
 
              {project.images.length > 1 && (
                <>
                  <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#C0C0C0] hover:text-black border border-[#444] z-20 transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#C0C0C0] hover:text-black border border-[#444] z-20 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div> 

            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto bg-transparent">
              <span className="inline-block px-3 py-1 border border-[#444] rounded-full text-[9px] tracking-widest text-[#aaa] uppercase mb-6 w-max">
                {project.category}
              </span>
              <h2 className="text-2xl md:text-3xl text-[#ddd] tracking-wide mb-6">{project.name}</h2>
              <div className="w-12 h-[2px] bg-[#C0C0C0] mb-6 shadow-[0_0_10px_rgba(192,192,192,0.5)]"></div>

              <div className="text-[#aaa] text-xs md:text-sm leading-relaxed space-y-4 mb-8">
                <p>
                  {project.description || "Detailed technical specifications, design parameters, and deployment notes for this project will be populated here from the database."}
                </p>
              </div>

              {/* Action Button */}
              <a
                href="/contact"
                className="mt-auto w-full inline-flex items-center justify-center gap-3 bg-white/5 border border-[#C0C0C0] text-[#C0C0C0] rounded-md hover:bg-[#C0C0C0] hover:text-[#000] p-4 text-[10px] tracking-[.2em] uppercase font-bold transition-all duration-300"
              >
                Inquire About Similar Work
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default function Projects() {
  const pathname = usePathname();
  const [filter, setFilter] = useState('All');

  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setDbProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects from Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);


  const activeProjects = dbProjects.length > 0 ? dbProjects : FALLBACK_PROJECTS;

  const filteredProjects = filter === 'All'
    ? activeProjects
    : activeProjects.filter(p => p.category === filter);

  return (
    <main className="min-h-screen flex flex-col font-sans bg-[#1a1c1e] text-[#ccc] overflow-x-hidden">

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
                  className={`h-full flex items-center px-3 md:px-5 text-[9px] md:text-[11px] tracking-[.18em] uppercase transition-all border-r border-[#2a2a2a] last:border-0 ${isActive ? 'text-white bg-white/5 font-bold shadow-[inset_0_-2px_0_#C0C0C0]' : 'text-[#aaa] hover:text-white hover:bg-white/5'
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
                  className={`h-full flex items-center px-3 md:px-5 text-[9px] md:text-[11px] tracking-[.18em] uppercase transition-all border-r border-[#2a2a2a] last:border-0 ${isActive ? 'text-white bg-white/5 font-bold shadow-[inset_0_-2px_0_#C0C0C0]' : 'text-[#aaa] hover:text-white hover:bg-white/5'
                    }`}>
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <section className="w-full py-16 flex flex-col items-center justify-center border-b border-[#333] bg-[#0d0d0d]">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[.2em] uppercase text-[#C0C0C0] mb-4">Portfolio</h1>
        <div className="h-[2px] w-24 bg-[#C0C0C0] mb-6 shadow-[0_0_10px_rgba(192,192,192,0.5)]"></div>
        <p className="text-[11px] tracking-widest text-[#888] uppercase">Where Engineering Meets Design</p>
      </section>

      <section className="w-full py-6 flex justify-center px-4 bg-[#141414] border-b border-[#222]">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 text-[10px] tracking-widest uppercase transition-all duration-300 border rounded ${filter === category
                ? 'border-[#C0C0C0] text-white bg-[#C0C0C0]/10 shadow-[0_0_10px_rgba(192,192,192,0.2)]'
                : 'border-[#333] text-[#777] hover:border-[#666] hover:text-[#aaa]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="w-full flex justify-center items-center py-20 text-[#666]">
            <Loader2 className="w-8 h-8 animate-spin mr-3" />
            <span className="text-[11px] tracking-widest uppercase">Connecting to Database...</span>
          </div>
        ) : filter === 'All' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} isAutoPlay={true} />
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div key={project.id || index} className="w-full md:w-[75%] flex-shrink-0 snap-center">
                  <ProjectCard project={project} isAutoPlay={false} />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10 text-[#666] text-[11px] tracking-widest uppercase">
                No projects found in this category.
              </div>
            )}
          </div>
        )}
      </section>


    </main>
  );
}