"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 8; // We have 8 slides

  useGSAP(
    () => {
      // 1. Setup Smooth Scroll with Lenis
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0, 0);

      // 2. Main Hero Animation Timeline
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      heroTl.to(
        ".frame-wrapper",
        {
          width: "100vw",
          top: "0%",
          bottom: "0%",
          ease: "none",
        },
        0
      );

      heroTl.to(
        [".frame-gold-border", ".frame-gap", ".frame-image"],
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)",
          ease: "none",
        },
        0
      );

      heroTl.to(
        [".frame-gap", ".frame-image"],
        {
          inset: "0px",
          ease: "none",
        },
        0
      );

      heroTl.to(
        [".bg-wine-text", ".floating-text", "header", ".logo-main", "nav ul li a"],
        {
          color: "#ffffff",
          ease: "none",
        },
        0
      );

      // Trigger for Section Two (Light Background)
      ScrollTrigger.create({
        trigger: ".section-two",
        start: "top 15%",
        onEnter: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#1a1a1a", duration: 0.3 }),
        onLeaveBack: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#ffffff", duration: 0.3 }),
      });

      // Trigger for Section Collection (Dark Background)
      ScrollTrigger.create({
        trigger: ".section-collection",
        start: "top 15%",
        onEnter: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#ffffff", duration: 0.3 }),
        onLeaveBack: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#1a1a1a", duration: 0.3 }),
      });

      // Trigger for Section Finest (Light Background)
      ScrollTrigger.create({
        trigger: ".section-finest",
        start: "top 15%",
        onEnter: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#1a1a1a", duration: 0.3 }),
        onLeaveBack: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#ffffff", duration: 0.3 }),
      });

      heroTl.to(".bg-wine-text", { scale: 1.05, ease: "none" }, 0);
      heroTl.to(".circle-btn", { opacity: 0, y: 30, ease: "none" }, 0);
      heroTl.to(".bottle-img", { scale: 1.08, ease: "none" }, 0);

      // 3. Custom Cursor Logic
      if (cursorRef.current && swiperContainerRef.current) {
        const xTo = gsap.quickTo(cursorRef.current, "left", {
          duration: 0.3,
          ease: "power3",
        });
        const yTo = gsap.quickTo(cursorRef.current, "top", {
          duration: 0.3,
          ease: "power3",
        });

        const onMouseMove = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        const onMouseEnter = () => {
          if (cursorRef.current) {
            cursorRef.current.style.opacity = "1";
            cursorRef.current.style.transform = "translate(-50%, -50%) scale(1)";
          }
        };
        const onMouseLeave = () => {
          if (cursorRef.current) {
            cursorRef.current.style.opacity = "0";
            cursorRef.current.style.transform = "translate(-50%, -50%) scale(0.5)";
          }
        };

        const sc = swiperContainerRef.current;
        sc.addEventListener("mousemove", onMouseMove);
        sc.addEventListener("mouseenter", onMouseEnter);
        sc.addEventListener("mouseleave", onMouseLeave);

        return () => {
          sc.removeEventListener("mousemove", onMouseMove);
          sc.removeEventListener("mouseenter", onMouseEnter);
          sc.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    },
    { scope: container }
  );

  const wines = [
    {
      img: "/wine (1).png",
      title: "Signature Rosé",
      desc: "A vibrant estate rosé with crisp notes of wild strawberry, pink grapefruit, and a hint of sea breeze.",
      price: "€182",
    },
    {
      img: "/wine (2).png",
      title: "Classic Merlot",
      desc: "Estate Grown - Valley Region\n750ML - 14% ALC/VOL",
      price: "€210",
    },
    {
      img: "/wine (3).png",
      title: "Reserve Pinot Noir",
      desc: "Premium Selection - Hillside Terroir\nVintage 2021",
      price: "€245",
    },
    {
      img: "/wine (4).png",
      title: "Grand Vintage Cabernet",
      desc: "Private Reserve - Oak Barrel Aged\nVintage 2018",
      price: "€320",
    },
    {
      img: "/wine-new-1.png",
      title: "Château Vieux Robin",
      desc: "Cru Bourgeois - Médoc\nMis en Bouteille au Château",
      price: "€182",
    },
    {
      img: "/wine-new-2.png",
      title: "Cantina Tollo",
      desc: "Montepulciano d'Abruzzo\nDenominazione di Origine Protetta",
      price: "€155",
    },
    {
      img: "/wine-new-3.png",
      title: "Rotari Brut",
      desc: "Metodo Classico\nTrentodoc",
      price: "€190",
    },
  ];

  // We loop 8 items total to simulate the original 10 items looping
  const duplicatedWines = [...wines, ...wines];

  return (
    <div ref={container} className="relative w-full overflow-x-hidden">
      <header>
        <div className="logo">
          <span className="logo-main">Lumina Estate</span>
          <span className="logo-sub">Vineyards</span>
        </div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Tours</a></li>
            <li><a href="#">Wineries</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </nav>
      </header>

      <main className="hero">
        <div className="bg-wine-text" aria-hidden="true">WINE</div>
        <div className="floating-text text-memorable">TIMELESS</div>
        <div className="floating-text text-journeys">VINTAGES</div>

        <div className="frame-wrapper">
          <div className="frame-gold-border"></div>
          <div className="frame-gap"></div>
          <div className="frame-image"></div>
        </div>

        <img src="/wine (1).png" alt="Wine Bottle" className="bottle-img" />

        <div className="circle-btn" role="button" tabIndex={0}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
          <span className="btn-label">CHECK<br />TOURS</span>
        </div>
      </main>

      <section className="section-two">
        <h2 className="about-heading">UNVEILING THE<br />ESSENCE OF<br />WINE</h2>
        <div className="about-grid">
          <div className="about-text">
            We believe that a wine tour should be more than just a sip-and-see experience. It should be a journey that engages, educates, and entertains.
          </div>
          <div className="about-text">
            Our approach is a perfect blend of rich heritage and modern viticulture expertise. Together, they create an atmosphere where learning about wine becomes an adventure.
          </div>
        </div>
        <hr className="about-divider" />
        <div className="offering-grid">
          <div className="offering-subtitle">WE OFFERING</div>
          <div className="offering-title">UNIQUE<br />BLEND OF<br />EDUCATION.</div>
        </div>
      </section>

      <section className="section-collection">
        <div className="bg-exclusive" aria-hidden="true">exclusive</div>
        
        <div className="collection-header">
          <h2 className="collection-heading">Our Wine Collection</h2>
          <button className="view-all-btn">View All Wines</button>
        </div>

        <div className="custom-cursor" ref={cursorRef}>Drag</div>

        <div className="collection-swiper" ref={swiperContainerRef}>
          <Swiper
            centeredSlides={true}
            loop={true}
            spaceBetween={0}
            speed={1200}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              768: { slidesPerView: 3 }
            }}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.realIndex + 1);
            }}
            className="w-full"
          >
            {duplicatedWines.map((wine, idx) => (
              <SwiperSlide key={idx}>
                <img src={wine.img} alt={wine.title} className="slide-bottle" />
                <div className="slide-details">
                  <h3 className="slide-title">{wine.title}</h3>
                  <p className="slide-desc whitespace-pre-line">{wine.desc}</p>
                  <div className="slide-price">{wine.price}</div>
                  <button className="slide-add-btn">Add to Cart</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="collection-footer">
          <div className="pagination-wrapper">
            <span className="current-slide">{currentSlide.toString().padStart(2, '0')}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
              ></div>
            </div>
            <span className="total-slides">{totalSlides.toString().padStart(2, '0')}</span>
          </div>
          <div className="glass-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 22h8" />
              <path d="M12 15v7" />
              <path d="M12 15a7.5 7.5 0 0 0 7.5-7.5V3a1 1 0 0 0-1-1H5.5a1 1 0 0 0-1 1v4.5A7.5 7.5 0 0 0 12 15z" />
              <path d="M4.5 7.5h15" />
            </svg>
          </div>
        </div>
      </section>

      <section className="section-finest">
        <div className="finest-header">
          <h2 className="finest-title">Finest Selection</h2>
          <div className="finest-subtitle">EXPLORE</div>
        </div>
        
        <div className="finest-grid">
          {/* Card 1 */}
          <div className="finest-card">
            <div className="finest-tag tag-white">WHITE</div>
            <img src="/wine (5).png" alt="Sip Happens 2020" className="finest-img" />
            <div className="finest-info w-full">
              <h3 className="finest-name">Sip Happens 2020</h3>
              <div className="finest-price">€33.00</div>
              <div className="text-xs text-gray-500 mt-0.5 mb-2 line-through">€44.00/l</div>
              <div className="flex gap-2 justify-center mt-2 mb-4 text-base">🍍 🍋 🍒</div>
              <button className="w-full border border-gray-400 rounded-full py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-all">Buy now</button>
              <div className="text-[10px] text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Available for pickup at Lively Store
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="finest-card">
            <div className="finest-tag tag-red">RED</div>
            <img src="/wine (6).png" alt="Velvet Tempest 2019" className="finest-img" />
            <div className="finest-info w-full">
              <h3 className="finest-name">Velvet Tempest 2019</h3>
              <div className="finest-price">€130.00</div>
              <div className="text-xs text-gray-500 mt-0.5 mb-2 line-through">€173.33/l</div>
              <div className="flex gap-2 justify-center mt-2 mb-4 text-base">🍒 🍫 ☕</div>
              <button className="w-full border border-gray-400 rounded-full py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-all">Buy now</button>
              <div className="text-[10px] text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Available for pickup at Lively Store
              </div>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="finest-card">
            <div className="finest-tag tag-rose">ROSE</div>
            <img src="/wine (2).png" alt="Sapphire Sunset Rosé" className="finest-img" />
            <div className="finest-info w-full">
              <h3 className="finest-name">Sapphire Sunset Rosé</h3>
              <div className="finest-price">€25.00</div>
              <div className="text-xs text-gray-500 mt-0.5 mb-2 line-through">€33.33/l</div>
              <div className="flex gap-2 justify-center mt-2 mb-4 text-base">🍋 🍫 🍍</div>
              <button className="w-full border border-gray-400 rounded-full py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-all">Buy now</button>
              <div className="text-[10px] text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Available for pickup at Lively Store
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
