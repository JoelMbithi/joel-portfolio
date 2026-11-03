'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Fraunces } from 'next/font/google'
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import Link from 'next/link'

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const INITIAL = 9

/* public/Design/<category>/<file> */
const p = (cat: string, file: string) =>
  encodeURI(`/Design/${cat}/${file}`)

type Design = {
  title: string
  category: 'Print' | 'Social Media' | 'Branding' | 'Digital'
  image: string
}

const DESIGNS: Design[] = [
  /* ── PRINT ──────────────────────────────────────── */
  { title: ' A4 flyer',         category: 'Print', image: p('Print', 'A4 Size farma.png') },
  { title: 'Bi-fold brochure',           category: 'Print', image: p('Print', 'BI Fold Brochure.png') },
  { title: 'Tri-fold brochure',          category: 'Print', image: p('Print', 'tri fold Brochure.png') },
  { title: 'Church poster',              category: 'Print', image: p('Print', 'church poster.png') },
  { title: 'Salon promo flyer',          category: 'Print', image: p('Print', 'salon.png') },
  { title: 'Travel poster',              category: 'Print', image: p('Print', 'travelposter.png') },
  { title: 'Wedding invitation',         category: 'Print', image: p('Print', 'weddingcard.png') },

  /* ── SOCIAL MEDIA ───────────────────────────────── */
  
  { title: ' Heathy Care Poster', category: 'Social Media', image: p('Social Media', 'Farma24 Stay Healthy Save Big!.png') },
  { title: ' Holiday poster',             category: 'Social Media', image: p('Social Media', 'Mashujaa Farma24.jpg') },
  { title: ' Pharmacy Poster',  category: 'Social Media', image: p('Social Media', 'Delivered with Care.png') },
  { title: ' Delivery Poster',             category: 'Social Media', image: p('Social Media', 'DELIVERY.png') },
  { title: ' Pharmacy Poster',             category: 'Social Media', image: p('Social Media', 'Pharmacy.png') },
  { title: ' Pharmacy Poster',    category: 'Social Media', image: p('Social Media', 'more than pharmacy.png') },
  { title: ' Visit us',             category: 'Social Media', image: p('Social Media', 'Visit US.png') },
  { title: ' Marketing Poster',          category: 'Social Media', image: p('Social Media', "WE'VE GOT YOU COVERED.png") },
  { title: ' Marketing Poster',      category: 'Social Media', image: p('Social Media', 'Your Health, Our Priority.png') },
  { title: ' Marketing Poster',        category: 'Social Media', image: p('Social Media', 'Your health is our priority in your critical need.png') },
  { title: ' Quality healthcare',   category: 'Social Media', image: p('Social Media', 'to Quality Healthcare.png') },
  { title: ' Car post',             category: 'Social Media', image: p('Social Media', 'Car poster.png') },
  { title: ' TukoKadi',             category: 'Social Media', image: p('Social Media', 'TUKOKADI.png') },
  { title: 'Political campaign poster I',    category: 'Social Media', image: p('Social Media', 'PoliticalPoster1.png') },
  { title: 'Political campaign poster II',   category: 'Social Media', image: p('Social Media', 'PoliticalPoster2.png') },
  { title: 'Model portfolio poster',         category: 'Social Media', image: p('Social Media', 'modelposter.png') },
  { title: 'Instagram promo',                category: 'Social Media', image: p('Social Media', 'insta Poster.png') },

  /* ── BRANDING ───────────────────────────────────── */
  { title: 'Business card',                  category: 'Branding', image: p('Branding', 'JoeBusinessCard.png') },
  { title: 'College Poster',                category: 'Branding', image: p('Branding', 'Bimz College.jpg') },
  { title: 'Brand mark',           category: 'Branding', image: p('Branding', 'farma24.jpg') },
  { title: 'Milton — Identity',              category: 'Branding', image: p('Branding', 'milton (1).png') },
  { title: 'New Water Mark',             category: 'Branding', image: p('Branding', 'New Project.png') },
  { title: 'Top Model brand',               category: 'Branding', image: p('Branding', 'TOPMODEL.png') },
  { title: 'Marching band Emblem',         category: 'Branding', image: p('Branding', 'marchedince.png') },
  { title: 'Code-theme hoodie',              category: 'Branding', image: p('Branding', 'Tech-inspired hoodie design with code theme.png') },
  { title: 'T-shirt design',                 category: 'Branding', image: p('Branding', 'T-Shirt.png') },

  /* ── DIGITAL ────────────────────────────────────── */
  { title: 'Web banner',                     category: 'Digital', image: p('Digital', 'WebBanner.png') },
  { title: 'Home page mockup',               category: 'Digital', image: p('Digital', 'home page.png') },
  { title: 'Fashion drop',                   category: 'Digital', image: p('Digital', 'Fashion.png') },
  { title: 'G-Fuel poster',                  category: 'Digital', image: p('Digital', 'GfuelPoster.png') },
  { title: 'Lavender — Product',             category: 'Digital', image: p('Digital', 'lavender.png') },
  { title: 'Perfume — Product',              category: 'Digital', image: p('Digital', 'Perfume.png') },
  { title: 'Orange — Campaign',              category: 'Digital', image: p('Digital', 'ORANGE (2) (1).png') },
]

const CATEGORIES: Array<'All' | Design['category']> = [
  'All',
  'Print',
  'Social Media',
  'Branding',
  'Digital',
]

const css = `
  /* scroll-in reveals: one class (ds-in) is added when an element first appears */
  .ds-rise { display: block; transform: translateY(105%); transition: transform 900ms cubic-bezier(0.2, 0.7, 0.1, 1); }
  .ds-fade { opacity: 0; transition: opacity 700ms ease-out; }
  .ds-wipe { clip-path: inset(0 0 100% 0); transition: clip-path 1000ms cubic-bezier(0.65, 0, 0.35, 1); }

  .ds-in .ds-rise { transform: none; }
  .ds-in .ds-fade { opacity: 1; }
  .ds-in .ds-wipe { clip-path: inset(0 0 0 0); }

  /* lightbox */
  @keyframes ds-backdrop { from { opacity: 0; } to { opacity: 1; } }
  @keyframes ds-photo {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
  .ds-backdrop { animation: ds-backdrop 250ms ease-out both; }
  .ds-photo    { animation: ds-photo 350ms cubic-bezier(0.2, 0.7, 0.1, 1) both; }

  @media (prefers-reduced-motion: reduce) {
    .ds-rise, .ds-fade, .ds-wipe { transition: none; transform: none; opacity: 1; clip-path: none; }
    .ds-backdrop, .ds-photo { animation: none; }
  }
`

function useInView<T extends Element>() {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  return [ref, seen] as const
}

const smoothBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

/* ── lightbox ─────────────────────────────────────── */
function Lightbox({
  items,
  start,
  onClose,
}: {
  items: Design[]
  start: number
  onClose: () => void
}) {
  const [i, setI] = useState(start)
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[i]

  const next = useCallback(() => setI((n) => (n + 1) % items.length), [items.length])
  const prev = useCallback(
    () => setI((n) => (n - 1 + items.length) % items.length),
    [items.length]
  )

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [next, prev, onClose])

  const nav = `
    absolute top-1/2 z-10 -translate-y-1/2 px-3 py-6 text-white/60
    transition-colors hover:text-[#00ade2]
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00ade2]
  `

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="ds-backdrop fixed inset-0 z-[100] flex flex-col bg-[#0b1f33]/95 text-white"
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="flex items-baseline gap-3">
          <span className={`${display.className} text-lg font-semibold`}>{item.title}</span>
          <span className="text-sm text-white/55">{item.category}</span>
        </p>
        <button
          ref={closeRef}
          onClick={onClose}
          className="
            inline-flex items-center gap-1.5 text-sm text-white/70
            transition-colors hover:text-[#00ade2]
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00ade2]
          "
        >
          Close
          <FiX size={16} aria-hidden />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-16">
        <button
          onClick={(e) => {
            e.stopPropagation()
            prev()
          }}
          aria-label="Previous design"
          className={`${nav} left-0 md:left-3`}
        >
          <FiChevronLeft size={28} />
        </button>

        {/* keyed so each design fades in instead of snapping */}
        <Image
          key={i}
          src={item.image}
          alt={item.title}
          width={0}
          height={0}
          sizes="90vw"
          onClick={(e) => e.stopPropagation()}
          style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '75vh' }}
          className="ds-photo object-contain"
        />

        <button
          onClick={(e) => {
            e.stopPropagation()
            next()
          }}
          aria-label="Next design"
          className={`${nav} right-0 md:right-3`}
        >
          <FiChevronRight size={28} />
        </button>
      </div>

      <p className="pb-5 text-center text-sm tabular-nums text-white/50">
        {i + 1} of {items.length}
      </p>
    </div>
  )
}

/* ── header ───────────────────────────────────────── */
function Header() {
  const [ref, seen] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`grid gap-6 md:grid-cols-12 md:items-end md:gap-8 ${seen ? 'ds-in' : ''}`}
    >
      <h2
        className={`${display.className} text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] md:col-span-7`}
      >
        <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <span className="ds-rise">Design work.</span>
        </span>
      </h2>

      <p
        className="ds-fade max-w-sm text-base leading-relaxed text-[#0b1f33]/70 md:col-span-5 md:justify-self-end"
        style={{ transitionDelay: '250ms' }}
      >
        Posters, cards, brochures and banners I’ve designed for campaigns,
        events and small businesses.
      </p>
    </div>
  )
}

/* ── tile ─────────────────────────────────────────── */
function DesignTile({
  d,
  index,
  onOpen,
}: {
  d: Design
  index: number
  onOpen: () => void
}) {
  const [ref, seen] = useInView<HTMLLIElement>()
  const delay = (index % 3) * 120 // staggers across the three columns

  return (
    <li
      ref={ref}
      className={`mb-10 break-inside-avoid ${seen ? 'ds-in' : ''}`}
    >
      <button
        onClick={onOpen}
        aria-label={`View ${d.title}`}
        className="
          group block w-full cursor-zoom-in text-left
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-4 focus-visible:outline-[#004d9c]
        "
      >
        <div
          className="ds-wipe overflow-hidden bg-[#e8e6e1]"
          style={{ transitionDelay: `${delay}ms` }}
        >
          <Image
            src={d.image}
            alt={d.title}
            width={0}
            height={0}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        <div
          className="ds-fade mt-3 flex items-baseline justify-between gap-4"
          style={{ transitionDelay: `${delay + 350}ms` }}
        >
          <span className="text-sm font-semibold transition-colors group-hover:text-[#004d9c]">
            {d.title}
          </span>
          <span className="shrink-0 text-sm text-[#6b6b6b]">{d.category}</span>
        </div>
      </button>
    </li>
  )
}

/* ── main ─────────────────────────────────────────── */
export const Design = () => {
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const filtersRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => DESIGNS.filter((d) => category === 'All' || d.category === category),
    [category]
  )

  const shown = expanded ? filtered : filtered.slice(0, INITIAL)
  const remaining = filtered.length - INITIAL

  const changeCategory = (c: string) => {
    setCategory(c)
    setExpanded(false)
  }

  const toggle = () => {
    if (expanded) {
      filtersRef.current?.scrollIntoView({ behavior: smoothBehavior(), block: 'start' })
    }
    setExpanded((v) => !v)
  }

  const closeLightbox = useCallback(() => setLightbox(null), [])

  return (
    <section
      id="design"
      className="
        scroll-mt-20 border-t border-[#0b1f33]/10 bg-[#f7f6f3]
        px-6 py-24 text-[#0b1f33] md:px-12 md:py-32
      "
    >
      <style>{css}</style>

      <div className="mx-auto max-w-[1400px]">
        <Header />

        <div
          ref={filtersRef}
          className="mt-14 flex scroll-mt-28 flex-wrap items-baseline justify-between gap-x-8 gap-y-4"
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => {
              const on = category === c
              return (
                <button
                  key={c}
                  onClick={() => changeCategory(c)}
                  aria-pressed={on}
                  className={`
                    border-b-2 pb-1 text-sm font-medium transition-colors
                    focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-4 focus-visible:outline-[#004d9c]
                    ${on
                      ? 'border-[#004d9c] text-[#004d9c]'
                      : 'border-transparent text-[#0b1f33]/55 hover:text-[#0b1f33]'}
                  `}
                >
                  {c}
                </button>
              )
            })}
          </div>

          <p aria-live="polite" className="text-sm tabular-nums text-[#6b6b6b]">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {/* keyed by category so a new filter remounts the tiles and they reveal again */}
        <ul
          key={category}
          className="mt-10 columns-1 gap-8 sm:columns-2 lg:columns-3"
        >
          {shown.map((d, i) => (
            <DesignTile
              key={`${d.title}-${d.image}`}
              d={d}
              index={i}
              onOpen={() => setLightbox(i)}
            />
          ))}
        </ul>

        {filtered.length > INITIAL && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={toggle}
              aria-expanded={expanded}
              className="
                inline-flex items-center gap-2.5 rounded-full
                border border-[#0b1f33]/20 px-6 py-3
                text-sm font-medium text-[#0b1f33]
                transition-colors duration-200
                hover:border-[#004d9c] hover:text-[#004d9c]
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-4 focus-visible:outline-[#004d9c]
              "
            >
              {expanded ? 'Show less' : `Show ${remaining} more`}
              <FiChevronDown
                size={15}
                aria-hidden
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}

        {/* closing */}
        <div className="mt-24 flex flex-col gap-6 border-t border-[#0b1f33]/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p
            className={`${display.className} max-w-md text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.015em]`}
          >
            Have a project in mind?
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/Contacts"
              className="
                rounded-full bg-[#004d9c] px-7 py-3.5 text-sm font-medium text-white
                transition-colors hover:bg-[#003d7c]
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-4 focus-visible:outline-[#004d9c]
              "
            >
              Get in touch
            </Link>
            <a
              href="https://github.com/JoelMbithi"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm underline decoration-[#0b1f33]/40 underline-offset-4
                transition-colors hover:text-[#004d9c] hover:decoration-[#00ade2]
              "
            >
              GitHub profile
            </a>
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox items={filtered} start={lightbox} onClose={closeLightbox} />
      )}
    </section>
  )
}

export default Design