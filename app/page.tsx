'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Home() {

  useEffect(() => {
    let root: any = null;
    let isMounted = true;

    const renderGlobe = async () => {
      const am5 = await import("@amcharts/amcharts5");
      const am5map = await import("@amcharts/amcharts5/map");
      const am5geodata_worldLow = (await import("@amcharts/amcharts5-geodata/worldLow")).default;
      const am5themes_Animated = (await import("@amcharts/amcharts5/themes/Animated")).default;

      if (!isMounted) return;

      root = am5.Root.new("globe-chart");

      if (root._logo) {
        root._logo.dispose();
      }

      root.setThemes([am5themes_Animated.new(root)]);

      // 1. Create the Map Chart
      let chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        rotationX: -38, // Focus on East Africa
        rotationY: 0,

        // Widen the globe internally so it takes up more space
        zoomLevel: 1.0,

        // Keep user zoom disabled for layout stability
        wheelY: "none",
        wheelX: "none",
        pinchZoom: false,
      }));

      // 2. Slow Motion Auto-Rotation Logic
      let isRotating = true;

      chart.seriesContainer.events.on("pointerdown", () => { isRotating = false; });
      chart.seriesContainer.events.on("pointerup", () => { isRotating = true; });
      chart.seriesContainer.events.on("globalpointerup", () => { isRotating = true; });

      root.events.on("frame", () => {
        if (isRotating) {
          chart.set("rotationX", (chart.get("rotationX") as number) - 0.1);
        }
      });

      // 3. Create ocean/globe background
      let backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
      backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color(0x0a0a0a),
        fillOpacity: 0.8,
        strokeOpacity: 0
      });
      backgroundSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

      // 4. Create countries polygon series
      let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      }));

      polygonSeries.mapPolygons.template.setAll({
        fill: am5.color(0x1a1c20),
        fillOpacity: 1,
        strokeWidth: 1,
        stroke: am5.color(0xC0C0C0),
        interactive: true
      });

      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0x4a5560)
      });

      // 5. Create Point Series for Animated Signals
      let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
        latitudeField: "lat",
        longitudeField: "lon"
      }));

      // Create the pulsing signal bullets
      pointSeries.bullets.push(function (root: any, series: any, dataItem: any) {
        let dataContext = dataItem.dataContext;
        let color = dataContext.color || am5.color(0xC0C0C0);

        let container = am5.Container.new(root, {});

        // The outer radiating ring
        let signal = am5.Circle.new(root, {
          radius: 3,
          fill: color,
          opacity: 0.7
        });

        // The tiny solid center dot
        let dot = am5.Circle.new(root, {
          radius: 2.5,
          fill: am5.color(0xffffff),
          stroke: color,
          strokeWidth: 1,
          tooltipText: "{name}"
        });

        // Animate the ring growing
        signal.animate({
          key: "radius",
          to: 25,
          duration: 2000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });

        // Animate the ring fading out
        signal.animate({
          key: "opacity",
          to: 0,
          duration: 2000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });

        container.children.push(signal);
        container.children.push(dot);

        return am5.Bullet.new(root, {
          sprite: container
        });
      });

      // 6. Data
      let data = [
        { "id": "KE", "name": "Kenya", color: am5.color(0xc09060), polygonTemplate: { fill: am5.color(0xc09060) } },
        { "id": "UG", "name": "Uganda", color: am5.color(0x7a9ec0), polygonTemplate: { fill: am5.color(0x7a9ec0) } },
        { "id": "TZ", "name": "Tanzania", color: am5.color(0x7ac09a), polygonTemplate: { fill: am5.color(0x7ac09a) } },
        { "id": "RW", "name": "Rwanda", color: am5.color(0xc07a9e), polygonTemplate: { fill: am5.color(0xc07a9e) } },
        { "id": "BI", "name": "Burundi", color: am5.color(0xc07a9e), polygonTemplate: { fill: am5.color(0xc07a9e) } },
        { "id": "SS", "name": "South Sudan", color: am5.color(0x8899aa), polygonTemplate: { fill: am5.color(0x8899aa) } },
      ];

      // Extract country center coordinates and push to point series
      polygonSeries.events.on("datavalidated", function () {
        pointSeries.data.clear();
        for (let i = 0; i < data.length; i++) {
          let dataContext = data[i];
          let countryDataItem = polygonSeries.getDataItemById(dataContext.id);
          let countryPolygon = countryDataItem?.get("mapPolygon");

          if (countryPolygon) {
            let centroid = countryPolygon.visualCentroid();
            pointSeries.data.push({
              name: dataContext.name,
              color: dataContext.color,
              lon: centroid.longitude,
              lat: centroid.latitude
            });
          }
        }
      });

      chart.appear(1000, 100);
    };

    renderGlobe();

    return () => {
      isMounted = false;
      if (root) {
        root.dispose();
      }
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col font-sans bg-[#1a1c1e] text-[#ccc] overflow-x-hidden">

      {/* 1. HEADER */}
      <header className="w-full h-[200px] md:h-[300px] relative border-b border-[#888] overflow-hidden bg-[#0d0d0d]">
        <Image
          src="/header-image.png"
          alt="Adalupe Design Group"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </header>

      {/* NAV - Upgraded with Next.js Active Route Detection */}
      <nav className="w-full h-[52px] border-y border-[#888] relative flex items-center bg-[#1a1c1e] z-30">
        <div className="absolute left-1/2 -top-10 md:-top-12 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-[#C0C0C0] bg-[#222] overflow-hidden z-20 shadow-[0_0_0_4px_#1a1c1e,0_0_20px_rgba(192,192,192,.3)]">
          <Image src="/logo.png" alt="Logo" fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="grid grid-cols-2 w-full h-full">
          {/* Left Side Links */}
          <div className="flex items-center justify-end pr-10 md:pr-16 border-r border-[#555]">
            {[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Services', path: '/services' }
            ].map(link => {
              // Check if we are currently on this page
              const isActive = usePathname() === link.path;
              return (
                <Link key={link.name} href={link.path}
                  className={`h-full flex items-center px-3 md:px-5 text-[9px] md:text-[11px] tracking-[.18em] uppercase transition-all border-r border-[#2a2a2a] last:border-0 ${isActive ? 'text-white bg-white/5 font-bold shadow-[inset_0_-2px_0_#C0C0C0]' : 'text-[#aaa] hover:text-white hover:bg-white/5'
                    }`}>
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Links */}
          <div className="flex items-center justify-start pl-10 md:pl-16">
            {[
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map(link => {
              const isActive = usePathname() === link.path;
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

      {/* 3. 3D GLOBE MAP SECTION */}
      {/* Notice: Increased max-w and h for a bigger globe presence */}
      <section className="flex-1 flex flex-col items-center px-4 py-12 gap-8 relative overflow-hidden">

        <div className="w-full text-center z-20">
          <h2 className="text-[14px] tracking-[.3em] uppercase text-[#C0C0C0] font-bold">Global Reach</h2>
          <p className="text-[10px] tracking-widest text-[#666] mt-2">Drag to explore</p>
        </div>

        <div
          id="globe-chart"
          className="w-full max-w-6xl h-[550px] md:h-[750px] relative z-10"
        ></div>

      </section>

      {/* 4. FOOTER */}
      <footer className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-[#888] bg-[#888] gap-[1px]">

        {/* Socials */}
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

        {/* Founder with Spinning Circular Text */}
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

        {/* Quote */}
        <div className="relative flex flex-col justify-center gap-4 p-8 bg-[#141414]">
          <span className="absolute top-4 left-6 text-[60px] leading-none text-[#2a2a2a] font-serif">&ldquo;</span>
          <p className="text-[15px] italic text-[#888] leading-relaxed relative z-10 font-serif text-center px-4">
            Bro knows something about everything.
          </p>
          <p className="text-[10px] tracking-[.15em] uppercase text-[#555] relative z-10 text-right mt-2">
            ~ Benard Akungu Ogolla<br />
          </p>
          <span className="absolute bottom-4 right-6 text-[60px] leading-none text-[#2a2a2a] font-serif">&rdquo;</span>
        </div>
      </footer>
    </main>
  );
}