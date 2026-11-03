'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type NavLink = {
  id: string
  label: string
  href: string
  external?: boolean
}

const links: NavLink[] = [
  { id: 'projects', label: 'Work',   href: '/projects' },
  { id: 'design',   label: 'Design', href: '/Design'   },
  { id: 'about',    label: 'About',  href: '/about'    },
  // external example — add your own:
  // { id: 'resume', label: 'Resume', href: '/resume.pdf', external: true },
]

/* ── letter-swap link ─────────────────────────────────────────── */
function SplitLink({
  href, label, index, active, external,
}: {
  href: string
  label: string
  index: number
  active: boolean
  external?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    el.style.setProperty('--mx', `${x}%`)
  }

  const onLeave = () => {
    ref.current?.style.setProperty('--mx', '50%')
  }

  const inner = (
    <>
      <span className="font-mono text-[9px] text-[#00ade2]/80">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="relative block overflow-hidden leading-none">
        <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(.6,0,.2,1)] group-hover/split:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full text-[#004d9c] transition-transform duration-[450ms] ease-[cubic-bezier(.6,0,.2,1)] group-hover/split:translate-y-0"
        >
          {label}
        </span>
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[2px] h-[2px] origin-center scale-x-0 bg-[#004d9c] transition-transform duration-300 group-hover/split:scale-x-100"
        style={{
          background:
            'radial-gradient(circle at var(--mx, 50%) 50%, #004d9c 0%, #00ade2 70%, transparent 100%)',
          opacity: active ? 1 : undefined,
        }}
      />

      <span
        aria-hidden
        className={`absolute -right-2 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#00ade2] transition-opacity duration-300 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )

  const commonProps = {
    ref,
    href,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'data-active': active || undefined,
    className:
      'group/split relative flex items-baseline gap-2 py-1 text-[13px] uppercase tracking-[0.06em]',
  } as const

  if (external) {
    return (
      <a {...commonProps} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }

  return <Link {...commonProps}>{inner}</Link>
}

/* ── ticking Nairobi clock ────────────────────────────────────── */
function NairobiClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Africa/Nairobi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="font-mono text-[10px] tabular-nums tracking-widest text-white/60">
      NBO {time}
    </span>
  )
}



/* ── navbar ───────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hidden,   setHidden]   = useState(false)
  const [open,     setOpen]     = useState(false)
  const [progress, setProgress] = useState(0)

  const pathname = usePathname()

  // keep scroll-progress up to date; also hide/show on scroll direction
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      setHidden(y > 240 && y > lastY && !open)
      lastY = y

      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // menu open: lock body, escape to close
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes curtain-word {
          from { transform: translateY(110%) skewY(4deg); opacity: 0; }
          to   { transform: translateY(0) skewY(0);       opacity: 1; }
        }
      `}</style>

      <header
        className={`fixed inset-x-0 bg-white top-0 h-16 z-50 transition-transform duration-500 ease-[cubic-bezier(.6,0,.2,1)] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        

        <div
          className={`relative transition-colors duration-300 ${
            scrolled && !open
              ? 'border-b border-[#004d9c]/10 h-16 bg-white/90 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6 md:h-20">
            {/* wordmark + logo */}
            <Link
              href="/"
              className="group/logo flex items-center gap-2"
              aria-label="Joel Mbithi — home"
            >
              <Image
  src="/logo3.png"
  alt=""
  width={100}
  height={100}
  priority
  className={`
    h-[100px] w-[100px] object-contain
    transition-[opacity,transform] duration-200 ease-out
    group-hover/logo:scale-105
    ${open ? 'brightness-0 invert opacity-90' : 'opacity-100'}
  `}
/>
              <span className="flex items-baseline gap-1 text-xl font-semibold tracking-tight">
                <span className={open ? 'text-white' : 'text-[#0b1f33]'}>Joel</span>
                <span className="text-[#00ade2] transition-transform duration-300 group-hover/logo:translate-x-0.5">
                  Mbithi
                </span>
                <span className="text-[#004d9c] group-hover/logo:animate-pulse">.</span>
              </span>
            </Link>

            {/* desktop nav */}
            <ul className="hidden items-center gap-9 md:flex">
              {links.map(({ id, label, href, external }, i) => (
                <li key={id}>
                  <SplitLink
                    href={href}
                    label={label}
                    index={i}
                    active={isActive(href)}
                    external={external}
                  />
                </li>
              ))}
              <li>
                <Link
                  href="/Contacts"
                  className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#004d9c]/30 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#004d9c] transition-colors hover:border-[#004d9c]"
                >
                  <span className="absolute inset-0 -z-10 translate-y-full bg-[#004d9c] transition-transform duration-300 ease-[cubic-bezier(.6,0,.2,1)] group-hover/cta:translate-y-0" />
                  <span className="transition-colors group-hover/cta:text-white">
                    Get in touch
                  </span>
                  <span className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:text-white">
                    →
                  </span>
                </Link>
              </li>
            </ul>

            {/* mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-[6px] md:hidden"
            >
              <span
                className={`h-px w-7 transition-all duration-300 ${
                  open ? 'translate-y-[3.5px] -rotate-45 bg-white' : 'bg-[#0b1f33]'
                }`}
              />
              <span
                className={`h-px transition-all duration-300 ${
                  open ? '-translate-y-[3.5px] w-7 rotate-45 bg-white' : 'w-4 bg-[#0b1f33]'
                }`}
              />
            </button>
          </nav>

          {/* scroll progress bar */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-[#004d9c] via-[#00ade2] to-[#004d9c]"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {/* mobile curtain */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#004d9c] px-6 pb-10 pt-28 transition-all duration-500 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <ul className="relative space-y-1">
          {links.map(({ id, label, href, external }, i) => {
            const url = href
            const Anchor = external ? 'a' : Link
            return (
              <li key={id} className="overflow-hidden">
                <Anchor
                  href={url}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-white/15 py-5 text-5xl font-semibold tracking-tight text-white"
                  style={{
                    animation: open
                      ? `curtain-word 650ms cubic-bezier(.2,.7,.2,1) ${120 + i * 90}ms both`
                      : undefined,
                  }}
                >
                  <span className="font-mono text-xs text-[#00ade2]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {label}
                </Anchor>
              </li>
            )
          })}
        </ul>

        <div className="relative flex items-end justify-between gap-4 text-sm text-white/70">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="border-b-2 border-[#00ade2] pb-0.5 font-medium text-white"
          >
            Get in touch →
          </Link>
          <NairobiClock />
        </div>
      </div>
    </>
  )
}

export default Navbar