'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Home() { 
  const pathname = usePathname();

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

      let chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        rotationX: -38,
        rotationY: 0,

        zoomLevel: 1.0,

        wheelY: "none",
        wheelX: "none",
        pinchZoom: false,
      }));

      let isRotating = true;

      chart.seriesContainer.events.on("pointerdown", () => { isRotating = false; });
      chart.seriesContainer.events.on("pointerup", () => { isRotating = true; });
      chart.seriesContainer.events.on("globalpointerup", () => { isRotating = true; });

      root.events.on("frame", () => {
        if (isRotating) {
          chart.set("rotationX", (chart.get("rotationX") as number) - 0.1);
        }
      });

      let backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
      backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color(0x0a0a0a),
        fillOpacity: 0.8,
        strokeOpacity: 0
      });
      backgroundSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

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

      let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
        latitudeField: "lat",
        longitudeField: "lon"
      }));

      pointSeries.bullets.push(function (root: any, series: any, dataItem: any) {
        let dataContext = dataItem.dataContext;
        let color = dataContext.color || am5.color(0xC0C0C0);

        let container = am5.Container.new(root, {});

        let signal = am5.Circle.new(root, {
          radius: 3,
          fill: color,
          opacity: 0.7
        });

        let dot = am5.Circle.new(root, {
          radius: 2.5,
          fill: am5.color(0xffffff),
          stroke: color,
          strokeWidth: 1,
          tooltipText: "{name}"
        });

        signal.animate({
          key: "radius",
          to: 25,
          duration: 2000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });

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

      let data = [
        { "id": "KE", "name": "Kenya", color: am5.color(0xc09060), polygonTemplate: { fill: am5.color(0xc09060) } },
        { "id": "UG", "name": "Uganda", color: am5.color(0x7a9ec0), polygonTemplate: { fill: am5.color(0x7a9ec0) } },
        { "id": "TZ", "name": "Tanzania", color: am5.color(0x7ac09a), polygonTemplate: { fill: am5.color(0x7ac09a) } },
        { "id": "RW", "name": "Rwanda", color: am5.color(0xc07a9e), polygonTemplate: { fill: am5.color(0xc07a9e) } },
        { "id": "BI", "name": "Burundi", color: am5.color(0xc07a9e), polygonTemplate: { fill: am5.color(0xc07a9e) } },
        { "id": "SS", "name": "South Sudan", color: am5.color(0x8899aa), polygonTemplate: { fill: am5.color(0x8899aa) } },
      ];

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

      <header className="w-full h-[200px] md:h-[300px] relative border-b border-[#888] overflow-hidden bg-[#0d0d0d]">
        <Image
          src="/header-image.png"
          alt="Adalupe Design Group"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </header>

      <nav className="w-full h-[52px] border-y border-[#888] relative flex items-center bg-[#1a1c1e] z-30">
        <div className="absolute left-1/2 -top-10 md:-top-12 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-[#C0C0C0] bg-[#222] overflow-hidden z-40 shadow-[0_0_0_4px_#1a1c1e,0_0_20px_rgba(192,192,192,.3)] shrink-0">
          <Image src="/logo.png" alt="Logo" fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="grid grid-cols-2 w-full h-full">
           
          <div className="flex items-center justify-end pr-[56px] md:pr-[80px] border-r border-[#555] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Services', path: '/services' }
            ].map(link => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.name} href={link.path}
                  className={`h-full flex items-center px-2 sm:px-3 md:px-5 text-[8px] md:text-[11px] tracking-widest md:tracking-[.18em] uppercase transition-all border-r border-[#2a2a2a] whitespace-nowrap shrink-0 ${
                    isActive ? 'text-white bg-white/5 font-bold shadow-[inset_0_-2px_0_#C0C0C0]' : 'text-[#aaa] hover:text-white hover:bg-white/5'
                  }`}>
                  {link.name}
                </Link>
              );
            })}
          </div>
 
          <div className="flex items-center justify-start pl-[56px] md:pl-[80px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map(link => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.name} href={link.path}
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

      <section className="flex-1 flex flex-col items-center px-4 py-12 gap-8 relative overflow-hidden">

        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/background-image.png"
            alt="Cosmic Background"
            fill
            className="object-cover scale-[1.1] opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1a1c1e_100%)]"></div>
        </div>

        <div className="w-full text-center z-20 relative">
          <h2 className="text-[14px] tracking-[.3em] uppercase text-[#C0C0C0] font-bold">Global Reach</h2>
          <p className="text-[10px] tracking-widest text-[#666] mt-2">Drag to explore</p>
        </div>

        <div
          id="globe-chart"
          className="w-full max-w-6xl h-[550px] md:h-[750px] relative z-10"
        ></div>
        <div className="relative z-20 pb-12">
          <Link
            href="/projects"
            className="group flex items-center gap-3 px-8 py-4 border border-[#333] hover:border-[#C0C0C0] bg-[#111]/50 hover:bg-[#C0C0C0] text-[#C0C0C0] hover:text-[#000] transition-all duration-500 backdrop-blur-sm"
          >
            <span className="text-[11px] tracking-[.3em] uppercase font-bold">Explore Portfolio</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </section>

    </main>
  );
}