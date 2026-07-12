'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CrystalScene = dynamic(() => import('@/components/CrystalScene'), { ssr: false });

const gallery = [
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1606755962773-d324e9a13086?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80'
];
const burgers = [
  ['Ember Royale', 'Dry-aged beef, smoked cheddar, black garlic aioli, brioche crown.', '$28'],
  ['Crystal Inferno', 'Wagyu blend, habanero honey glaze, charred onion, molten jack.', '$34'],
  ['Noir Truffle', 'Prime patty, truffle fondue, caramelized shallot, gold dust bun.', '$39']
];
const ingredients = ['Beef', 'Cheese', 'Lettuce', 'Tomato', 'Pickles', 'Bacon', 'Onion'];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.28], [1, 1.18]);
  const smokeY = useTransform(scrollYProgress, [0, 0.35], [0, -220]);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 70, opacity: 0, filter: 'blur(18px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
      });
      gsap.to('.parallax-flame', { yPercent: -22, ease: 'none', scrollTrigger: { trigger: pageRef.current, start: 'top top', end: 'bottom bottom', scrub: true } });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-black text-white">
      <Hero heroScale={heroScale} smokeY={smokeY} />
      <Story />
      <Menu />
      <Signature />
      <Ingredients />
      <Reviews />
      <Gallery />
      <Order />
      <Footer />
    </main>
  );
}

function Hero({ heroScale, smokeY }: any) {
  return <section className="relative grid min-h-screen place-items-center isolate">
    <motion.video style={{ scale: heroScale }} className="absolute inset-0 h-full w-full object-cover opacity-60" autoPlay muted loop playsInline poster={gallery[0]} aria-label="Cinematic burger grilling flames">
      <source src="https://cdn.coverr.co/videos/coverr-cooking-burger-on-a-grill-5116/1080p.mp4" type="video/mp4" />
    </motion.video>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,106,0,.28),transparent_35%),linear-gradient(180deg,rgba(0,0,0,.45),#050000_92%)]" />
    <CrystalScene />
    <motion.div style={{ y: smokeY }} className="smoke absolute inset-x-0 bottom-0 h-2/3 opacity-70" />
    <Particles />
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="relative z-10 mx-auto max-w-6xl px-6 text-center">
      <p className="mb-5 tracking-[.55em] text-gold">NOIR EMBER</p>
      <h1 className="font-display text-7xl font-bold leading-none md:text-9xl">Flame. Crystal. Desire.</h1>
      <p className="mx-auto mt-7 max-w-2xl text-lg text-white/75">Premium burgers staged with cinematic fire, smoked aromatics, and a glass-luxury digital experience.</p>
      <a href="#order" className="crystal-btn mt-10 inline-flex rounded-full px-8 py-4 font-semibold">Reserve the First Bite</a>
    </motion.div>
  </section>;
}
function Particles(){return <div className="absolute inset-0">{Array.from({length:42}).map((_,i)=><i key={i} className="particle" style={{left:`${(i*37)%100}%`, animationDelay:`${i*.17}s`, animationDuration:`${6+i%7}s`}} />)}</div>}
function Story(){return <section className="relative px-6 py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div className="reveal"><p className="eyebrow">Brand Story</p><h2 className="font-display text-6xl md:text-8xl">A Burger Isn't Just Food. It's an Experience.</h2></div><div className="grid gap-5 sm:grid-cols-2">{['Meat sizzling on the grill','Melting cheese','Pouring sauces','Flying ingredients'].map((t,i)=><motion.div whileHover={{rotateX:6,rotateY:-6,scale:1.03}} className="glass-card reveal min-h-56 p-5" key={t}><img className="h-40 w-full rounded-2xl object-cover" src={gallery[i]} alt={t}/><h3 className="mt-4 text-xl font-semibold">{t}</h3></motion.div>)}</div></div></section>}
function Menu(){return <section className="px-6 py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow reveal">Burger Menu</p><h2 className="reveal font-display text-6xl">Glasshouse Signatures</h2><div className="mt-12 grid gap-7 md:grid-cols-3">{burgers.map((b,i)=><motion.article whileHover={{y:-14,rotateX:7,rotateY:i===1?0:-5}} className="glass-card shine reveal p-5" key={b[0]}><img src={gallery[i+3]} alt={`${b[0]} burger`} className="h-72 w-full rounded-3xl object-cover"/><h3 className="mt-6 text-3xl font-display">{b[0]}</h3><p className="mt-3 text-white/65">{b[1]}</p><div className="mt-6 flex items-center justify-between"><span className="text-3xl text-gold">{b[2]}</span><button className="crystal-btn rounded-full px-5 py-3">Order Now</button></div></motion.article>)}</div></div></section>}
function Signature(){return <section className="relative min-h-screen px-6 py-28 grid place-items-center"><div className="parallax-flame absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(circle_at_50%_100%,rgba(255,102,0,.42),transparent_45%)]"/><div className="reveal relative mx-auto max-w-5xl text-center"><p className="eyebrow">Signature Burger</p><motion.img animate={{y:[0,-18,0]}} transition={{duration:5,repeat:Infinity}} src={gallery[5]} alt="The Noir Crown signature burger" className="mx-auto w-full max-w-3xl rounded-[3rem] shadow-crystal"/><h2 className="mt-10 font-display text-7xl">The Noir Crown</h2><p className="mx-auto mt-5 max-w-2xl text-white/70">A luxury product advertisement in edible form: fire-seared beef, velvet cheese, smoked tomato jam, and a glowing brioche halo.</p></div></section>}
function Ingredients(){return <section className="px-6 py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow reveal">Ingredients</p><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-7">{ingredients.map((x,i)=><motion.div whileInView={{y:[40,0],rotate:[-5,3,0],opacity:1}} initial={{opacity:0}} viewport={{once:true}} className="glass-card p-5 text-center" key={x}><div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-gold/40 to-ember/20 text-4xl">{x[0]}</div><h3 className="font-display text-2xl">{x}</h3></motion.div>)}</div></div></section>}
function Reviews(){return <section className="py-24"><div className="marquee flex gap-6">{[...Array(2)].flatMap(()=>['Absolutely cinematic. The burger arrived like a premiere.','Glass, fire, smoke—the most memorable dinner this year.','Every bite felt engineered for pleasure.']).map((r,i)=><div className="glass-card min-w-[340px] p-7" key={i}><p className="text-xl">“{r}”</p><span className="mt-5 block text-gold">★★★★★</span></div>)}</div></section>}
function Gallery(){return <section className="px-6 py-28"><div className="mx-auto columns-1 gap-6 space-y-6 md:columns-3 max-w-7xl">{gallery.map((g,i)=><img key={g} src={g} alt="Noir Ember cinematic gallery" className={`reveal w-full rounded-[2rem] border border-white/10 object-cover transition duration-700 hover:scale-[1.03] ${i%2?'h-96':'h-72'}`}/>)}</div></section>}
function Order(){return <section id="order" className="px-6 py-28"><form className="glass-card reveal mx-auto max-w-3xl p-8"><p className="eyebrow">Order</p><h2 className="font-display text-5xl">Begin the Ritual</h2><div className="mt-8 grid gap-5 md:grid-cols-2"><input aria-label="Name" placeholder="Name"/><input aria-label="Phone" placeholder="Phone"/><select aria-label="Burger"><option>Ember Royale</option><option>Crystal Inferno</option><option>Noir Truffle</option></select><input aria-label="Time" type="time"/></div><textarea aria-label="Notes" placeholder="Private notes for the chef" className="mt-5"/><button type="button" className="crystal-btn mt-6 rounded-full px-8 py-4">Send Order</button></form></section>}
function Footer(){return <footer className="relative px-6 py-20 text-center"><Particles/><h2 className="font-display text-5xl">Noir Ember</h2><p className="mt-4 text-white/60">Crystal flame dining · Open nightly · @noirember</p><div className="mt-8 flex justify-center gap-4"><span className="glass-icon">◎</span><span className="glass-icon">𝕏</span><span className="glass-icon">▶</span></div></footer>}
