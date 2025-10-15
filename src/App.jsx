import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const COVER = {
  title: "Moody Family Black Hills Adventure",
  subtitle: "June 2026 • 10-Day RV Journey",
  quote: "The best memories are made on the road.",
  image:
    "https://images.unsplash.com/photo-1605647533136-761c62a90a47?auto=format&fit=crop&w=2000&q=80", // Authentic Mt. Rushmore sunset image
};

const SECTIONS = [
  {
    id: "badlands",
    title: "Into the Badlands (Days 1–3)",
    image:
      "https://images.unsplash.com/photo-1501549688710-7f4ef08baba0?auto=format&fit=crop&w=2000&q=80", // Authentic Badlands
    paragraphs: [
      "The road stretches straight ahead, and the world starts to look different. The air gets drier, the hills taller, the sky bigger.",
      "Then it happens — we pull off at the overlook, the kids tumble out of the RV, and all of us just stop. The cliffs rise up in layers of gold and red, striped like something from another planet.",
      "We’ll tackle Notch Trail, climb the wooden ladder, and take in a view that stretches clear across the White River Valley.",
      "That night, when the stars come out over Cedar Pass Campground, we’ll light our first campfire and know for sure — the trip has officially begun.",
    ],
    caption: "The layered cliffs of the Badlands glow gold at sunset.",
  },
  {
    id: "hills",
    title: "Into the Hills (Days 4–6)",
    image:
      "https://images.unsplash.com/photo-1629518657408-b2a0ad1bfa47?auto=format&fit=crop&w=2000&q=80", // Authentic Black Hills / Sylvan style
    paragraphs: [
      "We’ll roll into Custer State Park, where the granite spires close in and the water turns alpine-clear.",
      "Mornings at Sylvan Lake mean canoes, crisp air, and the echo of oars. Then we lace up for the climb — Black Elk Peak — the crown of the Hills.",
      "High above the pines, a stone fire tower waits with a 360° view. It’s a climb, no doubt, but with the little ones snug in their carriers, we’ll earn it together.",
    ],
    caption:
      "From the summit of Black Elk Peak (7,244 ft), the Black Hills unfold in all directions.",
  },
  {
    id: "wonders",
    title: "Wonders in Stone (Days 7–8)",
    image:
      "https://images.unsplash.com/photo-1580766800722-8a8d1f3c1f43?auto=format&fit=crop&w=2000&q=80", // Authentic monument / stone scenery
    paragraphs: [
      "We’ll head underground for cave formations and stair climbs, then race above the trees on the mountain coaster.",
      "At Mount Rushmore (Day 7), we’ll walk the Presidential Trail and the museum, then continue to Crazy Horse. And at Reptile Gardens, the kids will meet living dinosaurs and gentle giants.",
    ],
    caption: "Faces in stone and creatures from before the map had edges — the Black Hills keep surprising.",
  },
];

function Hero() {
  return (
    <section
      className="relative min-h-[70vh] flex items-end"
      style={{
        backgroundImage: `url(${COVER.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container mx-auto px-6 py-16">
        <motion.div {...fadeIn} className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-100 drop-shadow-lg">
            {COVER.title}
          </h1>
          <p className="mt-3 text-lg md:text-xl text-amber-200">{COVER.subtitle}</p>
          <p className="mt-6 italic text-amber-100">“{COVER.quote}”</p>
          <a
            href="#badlands"
            className="mt-10 inline-flex items-center gap-2 text-amber-100/90 hover:text-white transition"
          >
            Scroll to begin <ChevronDown className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ScenicSection({ s }) {
  return (
    <section
      id={s.id}
      className="relative py-16"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${s.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-semibold text-amber-100 mb-4">{s.title}</h2>
        {s.paragraphs.map((p, i) => (
          <p key={i} className="text-amber-50/90 leading-relaxed mb-3">
            {p}
          </p>
        ))}
        <p className="italic text-amber-200 mt-4">{s.caption}</p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0907] text-white selection:bg-amber-300/30">
      <Hero />
      {SECTIONS.map((s) => (
        <ScenicSection key={s.id} s={s} />
      ))}
    </div>
  );
}
