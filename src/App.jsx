import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Mountain, Camera, ChevronDown, ExternalLink,
  CheckCircle2, Tent, Leaf, DollarSign, Link as LinkIcon
} from "lucide-react";

/** 
 * Moody Family Black Hills — Single-Page App
 * Uses local images from /public/images for rock-solid rendering on StackBlitz + Vercel.
 */

const cx = (...c) => c.filter(Boolean).join(" ");
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// simple localStorage hook for packing checklist
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch { return initial; }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0] || "");
  useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

// ====== DATA ======
const COVER = {
  title: "Moody Family Black Hills Adventure",
  subtitle: "June 2026 • 10-Day RV Journey",
  quote: "The best memories are made on the road.",
  image: "/images/rushmore.jpg", // put file at public/images/rushmore.jpg
};

const CAMPGROUNDS = [
  { name: "Lake Farm County Park (Madison, WI)", href: "https://www.reservedane.com/", note: "Night 1" },
  { name: "Sioux Falls KOA Journey", href: "https://koa.com/campgrounds/sioux-falls/", note: "Nights 2 & 9" },
  { name: "Cedar Pass Campground (Badlands)", href: "https://www.nps.gov/badl/planyourvisit/camping.htm", note: "Night 3" },
  { name: "Custer State Park – Blue Bell or Game Lodge", href: "https://www.campsd.com/", note: "Nights 4–8" },
  { name: "Rafter J Bar Ranch (backup)", href: "https://www.rafterj.com/", note: "Backup near Hill City" },
];

const BUDGET = [
  { label: "RV Rental + Mileage", cost: 2600 },
  { label: "Fuel (≈2,800 mi @ 9 mpg @ $3.50)", cost: 1085 },
  { label: "Campgrounds (9 nights)", cost: 440 },
  { label: "Attractions & Activities", cost: 850 },
  { label: "Food & Groceries", cost: 850 },
  { label: "Souvenirs / Misc.", cost: 200 },
];

const PACKING = {
  "Clothing & Personal": [
    "Lightweight shirts & shorts","Pants/jeans","Hoodies (cool evenings)","Rain jackets/ponchos","Hiking shoes/sneakers","Sandals/water shoes","Hats & sunglasses","Swimwear & towels","Underwear & socks","Sleepwear","Laundry bag & detergent","Toiletries kit","Sunscreen (SPF 30+)","Bug spray","Lip balm SPF","Personal meds","Contacts/glasses","Hand sanitizer","Wet wipes","Small daypack",
  ],
  "Kitchen & Cooking": [
    "Pots & pans","Skillet + lid","Oven mitts/pot holders","Knives & cutting board","Plates, bowls, cups","Measuring cups/spoons","Dish soap & sponge","Trash bags","Paper towels","Foil & zip bags","Coffee maker & mugs","Kettle","Cooler / extra bin","Condiments (salt/pepper/oil)","Breakfast staples","Kids snacks","S'mores kit","Reusable water bottles","Propane/spare cylinder","Matches/lighter",
  ],
  "RV & Camping Gear": [
    "Fresh water hose & filter","Pressure regulator","Sewer hose & gloves","Leveling blocks","Wheel chocks/stabilizers","30A/50A adapters & extension cord","Surge protector","Outdoor rug/mat","Folding chairs & table","Awning lights/lantern","Tool kit & duct tape","Broom/dustpan","RV toilet paper & chemicals","Grey/black tank caps","Hitch lock","Work gloves","Extra fuses/bulbs","Small step stool","Firewood (where allowed)","Campfire skewers",
  ],
  "Kids & Family": [
    "Car seats/boosters","Favorite blankets/stuffies","Bedtime books","Coloring kits/crayons","Tablet/headphones/chargers","Travel games/cards","Stroller or hiking carrier","Swim vests/floaties","Sun hats","Extra wipes & tissues","Kid-safe sanitizer","Refillable water bottles","Snack bin","Change of clothes (daypack)","Nightlight","White noise app","Emergency ID card","Small first-aid (daypack)","Spare pacifier (if needed)","Portable potty/liner (if useful)",
  ],
  "Emergency & Essentials": [
    "Comprehensive first-aid kit","Flashlights/headlamps","Spare batteries","Jumper cables","Tire gauge/air compressor","Roadside assistance numbers","Printed itinerary & maps","Copies of licenses/insurance","Multi-tool/knife","Emergency blankets","Whistle","Extra water & nonperishables","Fire extinguisher","Duct tape & zip ties","Phone power bank","USB cables & adapters","Small cash","Spare keys","Rain ponchos","Work light",
  ],
};

const SECTIONS = [
  {
    id: "letter",
    nav: "Letter",
    icon: <Leaf className="h-5 w-5" />,
    title: "A Letter from Dad",
    content: (
      <>
        <p className="text-lg leading-relaxed text-amber-200 max-w-3xl">
          The road west has been calling for a while now. This time, we’re answering it — not just to get away, but to chase the kind of moments that stick. The kind where the sky goes on forever, where the ground looks like another planet, and where the only plan is to explore together.
        </p>
        <p className="text-lg leading-relaxed text-amber-200 max-w-3xl mt-4">
          We’ll load up the RV, plug in a good playlist, and follow the sun across the plains until the land starts to rise and the horizon finally grows teeth. Somewhere between the cornfields and the mountains, I think we’ll find what we’ve been missing — space to breathe, time to laugh, and a few new stories that belong only to us.
        </p>
        <p className="text-lg leading-relaxed text-amber-200 max-w-3xl mt-4">
          So, buckle up. Pack your curiosity. We’re heading west — to the Black Hills, the Badlands, and wherever the road decides to take us next.
        </p>
        <p className="text-right text-amber-300 font-serif italic mt-6">– Dad</p>
      </>
    ),
    aside: (
      <div className="w-full h-full">
        <div className="rounded-xl ring-1 ring-white/10 overflow-hidden shadow-lg">
          {/* Replace src with your Google My Maps embed when ready */}
          <iframe
            title="Moody Route Map"
            className="w-full h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Mount%20Rushmore&t=&z=7&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </div>
    ),
  },
  {
    id: "badlands",
    nav: "Badlands",
    icon: <Mountain className="h-5 w-5" />,
    title: "Into the Badlands (Days 1–3)",
    image: "/images/badlands.jpg", // put file at public/images/badlands.jpg
    paragraphs: [
      "The road stretches straight ahead, and the world starts to look different. The air gets drier, the hills taller, the sky bigger.",
      "Then it happens — we pull off at the overlook, the kids tumble out of the RV, and all of us just stop. The cliffs rise up in layers of gold and red, striped like something from another planet.",
      "We’ll tackle Notch Trail, climb the wooden ladder, and take in a view that stretches clear across the White River Valley.",
      "That night, when the stars come out over Cedar Pass Campground, we’ll light our first campfire and know for sure — the trip has officially begun.",
    ],
    caption: "The layered cliffs of the Badlands glow gold at sunset.",
    tips: [
      "Bring binoculars — bighorn sheep love the cliffs near Door Trail!",
      "Best light: golden hour before sunset.",
    ],
    links: [
      { label: "Badlands National Park (NPS)", href: "https://www.nps.gov/badl/index.htm" },
      { label: "Cedar Pass Campground", href: "https://www.nps.gov/badl/planyourvisit/camping.htm" },
    ],
  },
  {
    id: "hills",
    nav: "Hills",
    icon: <Tent className="h-5 w-5" />,
    title: "Into the Hills (Days 4–6)",
    image: "/images/sylvan.jpg", // put file at public/images/sylvan.jpg
    paragraphs: [
      "We’ll roll into Custer State Park, where the granite spires close in and the water turns alpine-clear.",
      "Mornings at Sylvan Lake mean canoes, crisp air, and the echo of oars. Then we lace up for the climb — Black Elk Peak — the crown of the Hills.",
      "High above the pines, a stone fire tower waits with a 360° view. It’s a climb, no doubt, but with the little ones snug in their carriers and snacks tucked tight, we’ll earn it together.",
    ],
    caption: "From the summit of Black Elk Peak (7,244 ft), the Black Hills unfold in all directions.",
    tips: [
      "Start early, bring layers — wind at the top can be chilly.",
      "Skip Needles Highway in the RV — rent a car or shuttle for scenic drives.",
    ],
    links: [
      { label: "Custer State Park", href: "https://gfp.sd.gov/parks/detail/custer-state-park/" },
      { label: "Sylvan Lake Boat Rentals", href: "https://www.custerresorts.com/sylvan-lake/" },
      { label: "Black Elk Peak Trail Info", href: "https://www.alltrails.com/trail/us/south-dakota/black-elk-peak-loop" },
    ],
  },
  {
    id: "wonders",
    nav: "Wonders",
    icon: <Camera className="h-5 w-5" />,
    title: "Wonders in Stone (Days 7–8)",
    image: "/images/wonders.jpg", // put file at public/images/wonders.jpg
    paragraphs: [
      "We’ll head underground for cave formations and stair climbs, then race above the trees on the mountain coaster.",
      "At Mount Rushmore (Day 7), we’ll walk the Presidential Trail and the museum, then continue to Crazy Horse. And at Reptile Gardens, the kids will meet living dinosaurs and gentle giants.",
    ],
    caption: "Faces in stone and creatures from before the map had edges — the Black Hills keep surprising.",
    tips: [
      "Reserve cave tours ahead — slots fill up.",
      "Adventure parks: height limits vary — check before you go.",
    ],
    links: [
      { label: "Mount Rushmore National Memorial", href: "https://www.nps.gov/moru/index.htm" },
      { label: "Jewel Cave National Monument", href: "https://www.nps.gov/jeca/index.htm" },
      { label: "Wind Cave National Park", href: "https://www.nps.gov/wica/index.htm" },
      { label: "Rush Mountain Adventure Park", href: "https://www.rushmtn.com/" },
      { label: "Black Hills Central Railroad (1880 Train)", href: "https://www.1880train.com/" },
      { label: "Crazy Horse Memorial", href: "https://crazyhorsememorial.org/" },
      { label: "Reptile Gardens", href: "https://www.reptilegardens.com/" },
    ],
  },
];

function SectionHeader({ icon, title, id }) {
  return (
    <div id={id} className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-200">
        {icon}
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-amber-100">{title}</h2>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-[70vh] md:min-h-[80vh] flex items-end"
      style={{
        backgroundImage: `url(${COVER.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container mx-auto px-6 py-16 md:py-24">
        <motion.div {...fadeIn} className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-100 drop-shadow-lg">{COVER.title}</h1>
          <p className="mt-3 text-lg md:text-xl text-amber-200">{COVER.subtitle}</p>
          <p className="mt-6 italic text-amber-100">“{COVER.quote}”</p>
          <a href="#letter" className="mt-10 inline-flex items-center gap-2 text-amber-100/90 hover:text-white transition">
            Scroll to begin <ChevronDown className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function StickyTabs({ ids }) {
  const active = useScrollSpy(ids);
  const items = [
    { id: "letter", label: "Letter" },
    { id: "badlands", label: "Badlands" },
    { id: "hills", label: "Hills" },
    { id: "wonders", label: "Wonders" },
    { id: "essentials", label: "Budget" },
    { id: "packing", label: "Packing" },
  ];
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-[#0B0907]/70 border-b border-white/10">
      <div className="container mx-auto px-6 py-2 flex flex-wrap gap-2">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={cx(
              "px-3 py-1.5 rounded-full text-sm transition",
              active === it.id
                ? "bg-amber-500/20 text-amber-200 ring-1 ring-amber-300/40"
                : "text-amber-200/70 hover:text-amber-100"
            )}
          >
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function LetterSection() {
  const s = SECTIONS[0];
  return (
    <section id="letter" className="py-16 bg-[#1B1A17]">
      <div className="container mx-auto px-6">
        <SectionHeader icon={s.icon} title={s.title} />
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div {...fadeIn}>{s.content}</motion.div>
          <motion.div {...fadeIn}>{s.aside}</motion.div>
        </div>
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
        backgroundImage: `linear-gradient(rgba(0,0,0,.40), rgba(0,0,0,.40)), url(${s.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6">
        <SectionHeader icon={s.icon ?? <Camera className="h-5 w-5" />} title={s.title} />
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div {...fadeIn}>
            {s.paragraphs?.map((p, i) => (
              <p key={i} className="text-amber-50/95 leading-relaxed mb-4 text-lg">{p}</p>
            ))}
            {s.caption && <p className="mt-2 italic text-amber-200">{s.caption}</p>}
          </motion.div>
          {(s.tips || s.links) && (
            <motion.div {...fadeIn} className="bg-white/5 p-5 rounded-xl ring-1 ring-white/10">
              {s.tips && (
                <>
                  <h4 className="font-semibold text-amber-100 mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Family Tips</h4>
                  <ul className="space-y-2 list-disc pl-5 text-amber-50/95">
                    {s.tips.map((t, i) => (<li key={i}>{t}</li>))}
                  </ul>
                </>
              )}
              {s.links && (
                <>
                  <h4 className="font-semibold text-amber-100 mt-6 mb-2 flex items-center gap-2"><LinkIcon className="h-5 w-5" /> Useful Links</h4>
                  <ul className="space-y-2">
                    {s.links.map((l, i) => (
                      <li key={i}>
                        <a className="text-amber-200 hover:text-white inline-flex items-center gap-1" href={l.href} target="_blank" rel="noreferrer">
                          {l.label} <ExternalLink className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function BudgetAndCamp() {
  const total = useMemo(() => BUDGET.reduce((sum, x) => sum + x.cost, 0), []);
  return (
    <section className="py-16 bg-[#120F0C]" id="essentials">
      <div className="container mx-auto px-6">
        <SectionHeader icon={<DollarSign className="h-5 w-5" />} title="Budget Snapshot & Campgrounds" />
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div {...fadeIn} className="bg-white/5 rounded-xl p-6 ring-1 ring-white/10">
            <h4 className="text-amber-100 font-semibold mb-3">Budget</h4>
            <ul className="divide-y divide-white/10">
              {BUDGET.map((row, i) => (
                <li key={i} className="py-2 flex items-center justify-between text-amber-50/95">
                  <span>{row.label}</span>
                  <span className="font-medium">${row.cost.toLocaleString()}</span>
                </li>
              ))}
              <li className="pt-3 mt-2 flex items-center justify-between text-amber-50 border-t border-white/10">
                <span className="font-semibold">TOTAL</span>
                <span className="font-semibold">${total.toLocaleString()}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div {...fadeIn} className="bg-white/5 rounded-xl p-6 ring-1 ring-white/10">
            <h4 className="text-amber-100 font-semibold mb-3 flex items-center gap-2"><MapPin className="h-5 w-5" /> Campgrounds</h4>
            <ul className="space-y-2">
              {CAMPGROUNDS.map((c, i) => (
                <li key={i}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="text-amber-200 hover:text-white inline-flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> {c.name} <span className="opacity-70">— {c.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Checklist() {
  const [state, setState] = useLocalStorage("moody-packing", {});
  const toggle = (k, item) => setState((s) => ({ ...s, [k + "::" + item]: !s[k + "::" + item] }));
  return (
    <section id="packing" className="py-16 bg-[#0E0C0A]">
      <div className="container mx-auto px-6">
        <SectionHeader icon={<CheckCircle2 className="h-5 w-5" />} title="Trip Readiness & Packing" />
        <div className="grid lg:grid-cols-2 gap-10">
          {Object.entries(PACKING).map(([k, items]) => (
            <motion.div key={k} {...fadeIn} className="bg-white/5 rounded-xl p-6 ring-1 ring-white/10">
              <h4 className="text-amber-100 font-semibold mb-4">{k}</h4>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-amber-300 focus:ring-amber-400"
                      checked={!!state[k + "::" + item]}
                      onChange={() => toggle(k, item)}
                    />
                    <span className="text-amber-50/95">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-amber-200">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold">Moody • Black Hills 10-Day RV</p>
          <p className="opacity-80 mt-1">Itinerary • Photos • Links • Packing</p>
        </div>
        <nav className="flex flex-wrap gap-4 items-center md:justify-end">
          <a className="hover:text-white" href="#letter">Letter</a>
          <a className="hover:text-white" href="#badlands">Badlands</a>
          <a className="hover:text-white" href="#hills">Hills</a>
          <a className="hover:text-white" href="#wonders">Wonders</a>
          <a className="hover:text-white" href="#essentials">Budget</a>
          <a className="hover:text-white" href="#packing">Packing</a>
        </nav>
      </div>
    </footer>
  );
}

export default function App() {
  const sectionOrder = ["letter", "badlands", "hills", "wonders", "essentials", "packing"];
  return (
    <div className="min-h-screen bg-[#0B0907] text-white selection:bg-amber-300/30">
      {/* HERO */}
      <Hero />

      {/* STICKY NAV */}
      <StickyTabs ids={sectionOrder} />

      {/* LETTER */}
      <LetterSection />

      {/* SCENIC SECTIONS */}
      {SECTIONS.filter((s) => s.image).map((s) => (
        <ScenicSection key={s.id} s={s} />
      ))}

      {/* BUDGET + CAMPGROUNDS */}
      <BudgetAndCamp />

      {/* PACKING */}
      <Checklist />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
