'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Fraunces } from 'next/font/google'
import { FiChevronDown } from 'react-icons/fi'

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const INITIAL = 4

/* public/Projects/<file> */
const img = (file: string) => encodeURI(`/Projects/${file}`)

type Project = {
  title: string
  desc: string
  tags: string[]
  live?: string
  github: string
  image: string
  featured?: boolean
}

const PROJECTS: Project[] = [
  {
    title: 'Joe Website',
    desc: 'Freelance gig platform for managing jobs, clients and payments.',
    tags: ['React', 'MongoDB', 'Tailwind'],
    live: 'https://full-stack-dev-jx3r.vercel.app/',
    github: 'https://github.com/JoelMbithi/Joe-Gig-Web',
    image: img('joeGigsImg.jpeg'),
    featured: true,
  },
  {
    title: 'Build Estate',
    desc: 'Real estate reservation platform with property listings, filters and a booking flow.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/JoelMbithi/Build-Estate-Website',
    image: img('buildEstateImg.jpeg'),
    featured: true,
  },
  {
    title: 'Kazilink',
    desc: 'Freelance marketplace connecting Kenyan freelancers with local clients, with secure payments and escrow.',
    tags: ['React', 'Node.js', 'Prisma', 'Tailwind'],
    github: 'https://github.com/JoelMbithi/KaziLink_Kenya.git',
    image: img('kazilink.jpeg'),
    featured: true,
  },
  {
    title: 'AutoRentPro',
    desc: 'Car rental platform with vehicle listings, bookings and automated payments.',
    tags: ['React', 'Node.js', 'Prisma', 'PostgreSQL', 'Tailwind', 'TypeScript'],
    live: 'https://auto-rent-pro-car-hire-8qb8.vercel.app/',
    github: 'https://github.com/JoelMbithi/AutoRentPro-CarHire',
    image: img('autorentpro.png'),
    featured: true,
  },
  {
    title: 'Imara Sacco',
    desc: 'Sacco platform with member management, loan processing and secure transactions.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'TypeScript'],
    github: 'https://github.com/JoelMbithi/Imara_Sacco',
    image: img('imara-sacco.jpeg'),
    featured: true,
  },
  {
    title: 'Jumia Salon Studio',
    desc: 'Salon booking experience — service menu, stylist selection and appointment flow.',
    tags: ['React', 'Node.js', 'Tailwind'],
    github: 'https://github.com/JoelMbithi',
    image: img('Jumia Salon Studio.png'),
    featured: true,
  },
  {
    title: 'Scribe Blog',
    desc: 'A Django blog for writing and managing posts, with a minimal editor.',
    tags: ['Python', 'Django', 'Tailwind'],
    github: 'https://github.com/JoelMbithi/scribe-django.git',
    image: img('blog.png'),
  },
  {
    title: 'QuickCart',
    desc: 'Responsive e-commerce store with product management and a PostgreSQL backend.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    live: 'https://joe-devhub-xl5x.vercel.app/',
    github: 'https://github.com/JoelMbithi/QuickCart',
    image: img('quickCartImg.jpeg'),
  },
  {
    title: 'Employee Manager',
    desc: 'Django app for managing employees, with CRUD and role-based access.',
    tags: ['Python', 'Django', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/JoelMbithi/scribe-django',
    image: img('Employee.jpeg'),
  },
  {
    title: 'POS System',
    desc: 'Point-of-sale system with inventory, sales reports and customer records.',
    tags: ['React', 'TypeScript', 'Node.js', 'Laravel'],
    github: 'https://github.com/JoelMbithi/ts-starter-kit',
    image: img('POS.png'),
  },
  {
    title: 'CityConnect',
    desc: 'County-level platform that connects people and local businesses.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/JoelMbithi/ts-starter-kit',
    image: img('city-connect.jpeg'),
  },
  {
    title: 'SocialSphere',
    desc: 'Social media app for posting, reacting and connecting with friends, built in TypeScript.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/JoelMbithi/ts-starter-kit',
    image: img('social-media.jpeg'),
  },
]

const FILTERS = ['All', 'React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Django']


const css = `
  .pj-rise   { display: block; transform: translateY(105%); transition: transform 900ms cubic-bezier(0.2, 0.7, 0.1, 1); }
  .pj-fade   { opacity: 0; transition: opacity 700ms ease-out; }
  .pj-wipe   { clip-path: inset(0 0 100% 0); transition: clip-path 1000ms cubic-bezier(0.65, 0, 0.35, 1); }
  .pj-settle { transform: scale(1.08); transition: transform 1400ms cubic-bezier(0.2, 0.7, 0.1, 1); }

  .pj-in .pj-rise   { transform: none; }
  .pj-in .pj-fade   { opacity: 1; }
  .pj-in .pj-wipe   { clip-path: inset(0 0 0 0); }
  .pj-in .pj-settle { transform: none; }

  @media (prefers-reduced-motion: reduce) {
    .pj-rise, .pj-fade, .pj-wipe, .pj-settle {
      transition: none;
      transform: none;
      opacity: 1;
      clip-path: none;
    }
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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  return [ref, seen] as const
}

const smoothBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

/* ── header ───────────────────────────────────────── */
function Header() {
  const [ref, seen] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`grid gap-6 md:grid-cols-12 md:items-end md:gap-8 ${seen ? 'pj-in' : ''}`}
    >
      <h2
        className={`${display.className} text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] md:col-span-7`}
      >
        {['Things I’ve', 'built.'].map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <span className="pj-rise" style={{ transitionDelay: `${i * 120}ms` }}>
              {line}
            </span>
          </span>
        ))}
      </h2>

      <p
        className="pj-fade max-w-sm text-base leading-relaxed text-[#0b1f33]/70 md:col-span-5 md:justify-self-end"
        style={{ transitionDelay: '350ms' }}
      >
        Websites and apps I’ve built for clients and for myself, from small
        business sites to full platforms with payments and user accounts.
      </p>
    </div>
  )
}

/* ── card ─────────────────────────────────────────── */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [ref, seen] = useInView<HTMLElement>()
  const hasLive = p.live && p.live !== '#'
  const d = (index % 2) * 140 // second column lands slightly after the first

  const link = `
    underline decoration-[#00ade2] decoration-2 underline-offset-4
    transition-colors hover:decoration-[#004d9c]
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-[#004d9c]
  `

  return (
    <article ref={ref} className={`group ${seen ? 'pj-in' : ''}`}>
      <div
        className="pj-wipe relative aspect-[16/10] overflow-hidden bg-[#e8e6e1]"
        style={{ transitionDelay: `${d}ms` }}
      >
        <div className="pj-settle absolute inset-0" style={{ transitionDelay: `${d}ms` }}>
          <Image
            src={p.image}
            alt={`${p.title} screenshot`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="
              object-cover object-top
              transition-[object-position] duration-[1400ms] ease-out
              group-hover:[object-position:50%_35%]
            "
          />
        </div>
      </div>

      <h3
        className={`${display.className} pj-fade mt-5 text-2xl font-semibold tracking-[-0.015em]`}
        style={{ transitionDelay: `${d + 350}ms` }}
      >
        {p.title}
      </h3>

      <p
        className="pj-fade mt-2 max-w-md text-[15px] leading-relaxed text-[#0b1f33]/70"
        style={{ transitionDelay: `${d + 430}ms` }}
      >
        {p.desc}
      </p>

      <p
        className="pj-fade mt-3 text-sm text-[#6b6b6b]"
        style={{ transitionDelay: `${d + 510}ms` }}
      >
        {p.tags.join(', ')}
      </p>

      <div
        className="pj-fade mt-4 flex gap-6 text-sm font-semibold text-[#004d9c]"
        style={{ transitionDelay: `${d + 590}ms` }}
      >
        {hasLive && (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className={link}>
            View live site
          </a>
        )}
        <a href={p.github} target="_blank" rel="noopener noreferrer" className={link}>
          View code
        </a>
      </div>
    </article>
  )
}

/* ── main ─────────────────────────────────────────── */
export const Projects = () => {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(false)
  const filtersRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const list = PROJECTS.filter((p) => filter === 'All' || p.tags.includes(filter))
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  }, [filter])

  const shown = expanded ? filtered : filtered.slice(0, INITIAL)
  const remaining = filtered.length - INITIAL

  const changeFilter = (f: string) => {
    setFilter(f)
    setExpanded(false)
  }

  const toggle = () => {
    // Collapsing from far down the page would otherwise leave you stranded.
    if (expanded) {
      filtersRef.current?.scrollIntoView({ behavior: smoothBehavior(), block: 'start' })
    }
    setExpanded((v) => !v)
  }

  return (
    <section
      id="work"
      className="scroll-mt-20 bg-[#f7f6f3] px-6 py-24 text-[#0b1f33] md:px-12 md:py-32"
    >
      <style>{css}</style>

      <div className="mx-auto max-w-[1400px]">
        <Header />

        <div
          ref={filtersRef}
          className="mt-14 flex scroll-mt-28 flex-wrap items-baseline justify-between gap-x-8 gap-y-4"
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter by technology">
            {FILTERS.map((f) => {
              const on = filter === f
              return (
                <button
                  key={f}
                  onClick={() => changeFilter(f)}
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
                  {f}
                </button>
              )
            })}
          </div>

          <p aria-live="polite" className="text-sm tabular-nums text-[#6b6b6b]">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* keyed by filter so a new filter remounts the cards and they animate in again */}
        <div key={filter} className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {shown.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>

        {filtered.length > INITIAL && (
          <div className="mt-14 flex justify-center">
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
      </div>
    </section>
  )
}

export default Projects