/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';
import { Phone, Mail, Instagram, ChevronRight, Star, Quote, MapPin, Menu, X } from 'lucide-react';

// --- Constants ---
const COLORS = {
  charcoal: '#1A1A1A',
  marble: '#F2F2F2',
  gold: '#D4AF37',
};

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
  pillar: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200',
  heritage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
  precision: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1200',
  newHomes: 'https://images.unsplash.com/photo-1620626011761-9963d7b69a9c?auto=format&fit=crop&q=80&w=800',
  renovations: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800',
  maintenance: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=800',
  gallery1: 'https://images.unsplash.com/photo-1620626011761-9963d7b69a9c?auto=format&fit=crop&q=80&w=800',
  gallery2: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
  gallery3: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800',
  gallery4: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800',
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-6 md:py-8 lg:px-12 ${
          isScrolled ? 'bg-charcoal/95 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-baseline gap-2 z-50">
            <span className="text-gold font-serif text-2xl font-bold tracking-tighter italic">F.</span>
            <span className="text-lg md:text-xl tracking-[0.3em] font-light text-marble">FIGLIOMENI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-marble">
            {['Heritage', 'Services', 'Gallery', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleClick(e, item.toLowerCase())}
                whileHover={{ color: COLORS.gold }}
                className="hover:text-gold transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden z-50 flex items-center gap-4">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-marble">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              handleClick({ preventDefault: () => {} } as any, 'contact');
            }}
            className="hidden md:block px-8 py-3 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Book a Consultation
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-charcoal z-40 flex flex-col items-center justify-center lg:hidden"
      >
        <div className="flex flex-col items-center gap-8 text-xl uppercase tracking-[0.3em] font-light text-marble">
          {['Heritage', 'Services', 'Gallery', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleClick(e, item.toLowerCase())}
              whileHover={{ color: COLORS.gold }}
            >
              {item}
            </motion.a>
          ))}
          <button 
            onClick={(e) => handleClick({ preventDefault: () => {} } as any, 'contact')}
            className="mt-8 px-8 py-4 bg-gold text-charcoal text-xs font-bold uppercase tracking-[0.2em] rounded-full"
          >
            Book Now
          </button>
        </div>
      </motion.div>
    </>
  );
};

const ServiceCard = ({ title, subtitle, image, delay }: { title: string; subtitle: string; image: string; delay: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative aspect-square md:aspect-auto group overflow-hidden bg-white/5 border border-white/10 p-5 backdrop-blur-md flex flex-col justify-between hover:border-gold transition-all"
    >
      <div className="absolute inset-0 z-0 opacity-40 overflow-hidden pointer-events-none">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: 'translateZ(50px)' }}>
        <div className="text-gold font-serif italic text-xl">
          {(delay * 10).toFixed(0).padStart(2, '0')}.
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-marble">{title}</div>
          <div className="text-[10px] opacity-40 mt-1 italic text-marble">{subtitle}</div>
        </div>
      </div>
    </motion.div>
  );
};

const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax Transforms
  const heroTextY = useTransform(smoothY, [0, 0.2], [0, -200]);
  const heroBgY = useTransform(smoothY, [0, 0.2], [0, 100]);
  const heroPillarY = useTransform(smoothY, [0, 0.2], [0, -300]);
  
  const heritageImgY = useTransform(smoothY, [0.1, 0.4], [100, -100]);
  const detailsBgY = useTransform(smoothY, [0.6, 0.9], [-100, 100]);

  return (
    <div ref={containerRef} className="bg-charcoal text-marble selection:bg-gold selection:text-charcoal w-full overflow-hidden relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-marble/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[300px] border-t border-gold opacity-20"></div>
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-180 z-20 pointer-events-none" style={{ writingMode: 'vertical-rl' }}>
        <span className="text-[9px] uppercase tracking-[0.8em] opacity-20">CRAFTSMANSHIP • TRADITION • EXCELLENCE</span>
      </div>

      <Navbar />

      {/* Hero Section: 3D Window Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: Back (Video/Image) */}
        <motion.div 
          style={{ y: heroBgY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={IMAGES.hero} 
            alt="Modern Australian Residence" 
            className="w-full h-full object-cover scale-110 brightness-50"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Layer 2: Middle (Text) */}
        <motion.div 
          style={{ y: heroTextY }}
          className="relative z-10 text-center px-6 max-w-6xl mt-20 md:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-4 text-gold text-xs md:text-sm uppercase tracking-[0.4em] font-bold"
          >
            Since 1994
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            className="text-[54px] sm:text-[70px] md:text-[110px] lg:text-[160px] font-serif leading-[0.9] md:leading-[0.85] italic tracking-tight"
          >
            Precision in <br/>
            <span className="not-italic font-bold text-marble">every millimetre.</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center"
          >
            <div className="w-12 md:w-16 h-[1px] bg-gold hidden md:block"></div>
            <p className="max-w-xs text-xs md:text-sm text-marble/60 leading-relaxed font-light font-sans text-center md:text-left">
              Two generations of Italian craftsmanship interpreting architectural visions into permanent stone.
            </p>
          </motion.div>
        </motion.div>

        {/* Layer 3: Front (Removed for cleaner look) */}
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-widest text-gold mb-2">Scroll</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Heritage Section: Modern Heritage */}
      <section id="heritage" className="relative min-h-screen flex flex-col md:flex-row items-center py-24 md:py-40 border-b border-white/10">
        <div className="w-full md:w-1/2 px-8 lg:px-24 flex flex-col justify-center mb-16 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="mb-2 text-gold text-xs uppercase tracking-[0.4em] font-bold">Modern Heritage</div>
            <h2 className="text-[64px] md:text-[84px] font-serif leading-[0.9] italic tracking-tight mb-8">
              The Art of <br/>
              <span className="not-italic font-bold">Heritage Tiling.</span>
            </h2>
            
            <div className="mt-8 flex gap-6 items-start mb-12">
              <div className="w-16 h-[1px] bg-gold mt-3"></div>
              <div className="space-y-6 text-marble/60 font-sans leading-relaxed text-sm md:text-base max-w-sm font-light">
                <p>
                  Two generations of Italian craftsmanship. From the shores of Calabria to Western Australia’s finest residences.
                </p>
                <p>
                  Michael Figliomeni carries forward a legacy where tradition meets modern structural engineering, ensuring every edge is a testament to quality.
                </p>
              </div>
            </div>

            <section className="bg-white/5 border border-white/10 p-8 flex gap-8 items-center max-w-md backdrop-blur-sm">
              <div className="w-1/3 border-r border-white/10 pr-8">
                <div className="text-4xl font-serif italic text-gold">30+</div>
                <div className="text-[10px] uppercase tracking-widest mt-1 opacity-50">Years Experience</div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-serif mb-2 italic">The Father & Son Bond</h3>
                <p className="text-[11px] text-marble/60 leading-relaxed">
                  Michael Figliomeni carries forward a legacy of architectural tiling where tradition meets modern precision.
                </p>
              </div>
            </section>
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[500px] md:h-[800px] overflow-hidden px-6 md:px-12">
          <motion.div 
            style={{ y: heritageImgY }}
            className="absolute top-0 right-0 w-full h-[120%] z-0"
          >
            <img 
              src={IMAGES.heritage} 
              alt="Italian Heritage" 
              className="w-full h-full object-cover filter brightness-75"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 border-[20px] md:border-[40px] border-charcoal/50 m-6 md:m-12 pointer-events-none" />
        </div>
      </section>

      {/* Services Grid: Bento Box with 3D Tilt */}
      <section id="services" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-24 text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Precision Services</p>
            <h2 className="font-serif text-4xl md:text-6xl italic">The Architecture of Tiles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ServiceCard 
              title="New Homes" 
              subtitle="Architectural builds"
              image={IMAGES.newHomes}
              delay={0.1}
            />
          </div>
          <div className="lg:col-span-1">
             <ServiceCard 
              title="Renovations" 
              subtitle="Luxury transformation"
              image={IMAGES.renovations}
              delay={0.2}
            />
          </div>
          <div className="lg:col-span-1">
             <ServiceCard 
              title="Maintenance" 
              subtitle="Restoration services"
              image={IMAGES.maintenance}
              delay={0.3}
            />
          </div>
          <div className="lg:col-span-2 bg-gradient-to-r from-gold/20 to-transparent border border-gold/30 p-8 flex flex-col md:flex-row items-center justify-between backdrop-blur-sm">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Preserving High-Value Surfaces</div>
              <div className="text-sm text-marble/60 max-w-sm italic">Uncompromising quality for high-end boutiques and commercial spaces.</div>
            </div>
            <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold mt-6 md:mt-0 hover:bg-gold hover:text-charcoal transition-all cursor-pointer">
              →
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Gallery</p>
              <h2 className="font-serif text-4xl md:text-6xl italic">Curated Portfolio</h2>
            </div>
            <p className="text-marble/40 text-sm max-w-xs font-light font-sans italic">
              A glimpse into the most exclusive residences across Western Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[IMAGES.gallery2, IMAGES.gallery3, IMAGES.gallery4].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="aspect-[3/4] overflow-hidden group relative"
              >
                <img 
                  src={img} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                  alt="Work" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-gold/20 m-2 pointer-events-none group-hover:m-4 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Details Section: Full Width Parallax */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: detailsBgY }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <img 
            src={IMAGES.precision} 
            alt="Precision Detail" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-charcoal/30" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center"
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl italic mb-6">Precision in every millimetre</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 md:px-12 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <Quote className="text-gold mb-12 w-12 h-12 opacity-50" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-8"
          >
            <p className="font-serif text-3xl md:text-5xl leading-tight mb-8">
              "Michael and his team are not tilesetters; they are artists. The way they aligned the marble veins in our master suite is nothing short of breathtaking."
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 p-1">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" 
                  className="w-full h-full object-cover rounded-full" 
                  referrerPolicy="no-referrer"
                  alt="Client"
                />
              </div>
              <div>
                <p className="font-bold text-marble">Marco Vitale</p>
                <p className="text-xs uppercase tracking-widest text-gold">Principal Architect, Vitale Studio</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-32 px-6 md:px-12 border-t border-white/10 bg-black/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold mb-6">Contact Us</p>
            <h2 className="font-serif text-4xl md:text-6xl italic mb-10 leading-tight">Begin your <br/><span className="not-italic font-bold text-marble">transformation.</span></h2>
            <div className="space-y-8 font-sans text-marble/60">
              <p>Discuss your architectural vision with Michael Figliomeni. We specialize in complex, large-format tiling and bespoke renovation projects.</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <span>michael@figliomeni.com.au</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <span>Perth, Western Australia</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-md">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold">Full Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-gold transition-colors text-marble" placeholder="John Rossi" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-gold transition-colors text-marble" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold">Project Vision</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-gold transition-colors text-marble resize-none" placeholder="Describe your architectural project..." />
              </div>
              <MagneticButton className="w-full py-4 bg-gold text-charcoal font-sans text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(212,175,55,0.2)]">
                Send Inquiry
              </MagneticButton>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-20 pb-20 px-6 md:px-12 border-t border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-24">
          <div className="flex gap-12">
            <div>
              <div className="text-[9px] uppercase tracking-widest opacity-40 mb-1 text-gold">Inquiries</div>
              <div className="text-lg font-serif italic text-marble font-medium">Michael Figliomeni</div>
              <div className="text-xs text-marble/60 mt-1">michael@figliomeni.com.au</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest opacity-40 mb-1 text-gold">Studio Location</div>
              <div className="text-lg font-serif italic text-marble font-medium">Perth</div>
              <div className="text-xs text-marble/60 mt-1">Western Australia</div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-[9px] uppercase tracking-widest opacity-40 text-marble/60">Ready to build?</div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-10 py-4 bg-gold text-charcoal text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
            >
              Book a Consultation
            </motion.button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-marble/30 border-t border-white/10 pt-10">
          <div className="flex items-baseline gap-2 mb-4 md:mb-0">
            <span className="text-gold font-serif text-lg font-bold italic">F.</span>
            <span>FIGLIOMENI TILING & RENOVATIONS</span>
          </div>
          <div className="flex space-x-12">
            <a href="#" className="hover:text-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
          </div>
          <p className="mt-4 md:mt-0 italic">Handcrafted with precision</p>
        </div>
      </footer>
    </div>
  );
}
