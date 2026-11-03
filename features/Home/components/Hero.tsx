'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiChevronDown, FiDownload, FiExternalLink } from 'react-icons/fi'

const STATS = [
  { value: '3+', label: 'years of experience' },
  { value: '12', label: 'projects shipped' },
  { value: '30+',  label: 'designs delivered' },
  { value: '8+',  label: 'stacks & tools' },

]

const HEADLINE = ['I design and build', 'web apps people', 'actually use.']

const css = `
  @keyframes hero-rise {
    from { transform: translateY(105%); }
    to   { transform: translateY(0); }
  }
  @keyframes hero-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hero-wipe {
    from { clip-path: inset(0 0 100% 0); }
    to   { clip-path: inset(0 0 0 0); }
  }
  @keyframes hero-settle {
    from { transform: scale(1.1); }
    to   { transform: scale(1); }
  }
  @keyframes hero-frame {
    from { opacity: 0; transform: translate(-22px, -22px); }
    to   { opacity: 1; transform: translate(0, 0); }
  }

  .hero-rise   { display: block; animation: hero-rise 900ms cubic-bezier(0.2, 0.7, 0.1, 1) both; }
  .hero-fade   { animation: hero-fade 700ms ease-out both; }
  .hero-wipe   { animation: hero-wipe 1100ms cubic-bezier(0.65, 0, 0.35, 1) both; }
  .hero-settle { animation: hero-settle 1600ms cubic-bezier(0.2, 0.7, 0.1, 1) both; }
  .hero-frame  { animation: hero-frame 800ms cubic-bezier(0.2, 0.7, 0.1, 1) both; }

  @media (prefers-reduced-motion: reduce) {
    .hero-rise, .hero-fade, .hero-wipe, .hero-settle, .hero-frame {
      animation: none;
    }
  }
`

/* ── "See my work" dropdown ───────────────────────── */
function WorkMenu() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        btnRef.current?.focus()
      }
    }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  const item =
    'flex items-center justify-between gap-6 px-5 py-3 text-sm text-[#0b1f33] transition-colors hover:bg-[#004d9c]/5 hover:text-[#004d9c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#004d9c]'

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="
          inline-flex items-center gap-2 rounded-full border border-[#0b1f33]/20
          px-7 py-3.5 text-sm font-medium text-[#0b1f33]
          transition-colors duration-200
          hover:border-[#004d9c] hover:text-[#004d9c]
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-4 focus-visible:outline-[#004d9c]
        "
      >
        See my work
        <FiChevronDown
          size={15}
          aria-hidden
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="See my work"
          className="
            absolute  left-0 bottom-[calc(100%+8px)] z-[160] min-w-[220px]
            overflow-x-clip rounded-lg border border-[#0b1f33]/12
            bg-white shadow-[0_18px_40px_-16px_rgba(11,31,51,0.35)]
          "
        >
          <Link href="/projects" role="menuitem" className={item} onClick={close}>
            <span>
              <span className="block font-semibold">View projects</span>
              <span className="block text-xs text-[#6b6b6b]">
                Web apps &amp; platforms
              </span>
            </span>
            <FiExternalLink size={14} aria-hidden className="text-[#004d9c]" />
          </Link>

          <Link
            href="/Design"
            role="menuitem"
            className={`${item} border-t border-[#0b1f33]/8`}
            onClick={close}
          >
            <span>
              <span className="block font-semibold">View designs</span>
              <span className="block text-xs text-[#6b6b6b]">
                Posters, branding &amp; print
              </span>
            </span>
            <FiExternalLink size={14} aria-hidden className="text-[#004d9c]" />
          </Link>
        </div>
      )}
    </div>
  )
}

/* ── hero ─────────────────────────────────────────── */
const Hero = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Africa/Nairobi',
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="
        relative flex min-h-[100svh] items-center overflow-hidden
        bg-[#f7f6f3] px-6 pb-20 pt-36 text-[#0b1f33]
        md:px-12 md:pb-24 md:pt-40
      "
    >
      <style>{css}</style>

      <div
        className="
          mx-auto grid w-full max-w-[1400px]
          grid-cols-1 items-center gap-14
          md:grid-cols-[1.15fr_0.85fr] md:gap-20
        "
      >
        {/* ── LEFT ── */}
        <div className="flex flex-col">
          <p
            className="hero-fade mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]"
            style={{ animationDelay: '0ms' }}
          >
            <span className="font-semibold"></span>
            <span className="text-[#6b6b6b]">Full Stack Developer</span>
          </p>

          <h1
            className="
              m-0 mb-8 max-w-[680px] font-sans
              text-[clamp(42px,6vw,78px)]
              font-bold leading-[1.05] tracking-[-0.03em]
            "
          >
            {HEADLINE.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"
              >
                <span
                  className="hero-rise"
                  style={{ animationDelay: `${150 + i * 120}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-fade m-0 mb-10 max-w-[500px] text-[17px] leading-[1.7] text-[#454545]"
            style={{ animationDelay: '750ms' }}
          >
            I build with the MERN and PERN stacks and take projects from the
            first wireframe to launch day, then keep them fast and maintained
            after that. Websites, SaaS products, redesigns and ongoing support.
          </p>

          <div
            className="hero-fade flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ animationDelay: '850ms' }}
          >
            <Link
              href="/contact"
              className="
                inline-flex items-center rounded-full bg-[#004d9c]
                px-7 py-3.5 text-sm font-medium text-white
                transition-colors duration-200 hover:bg-[#003d7c]
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-4 focus-visible:outline-[#004d9c]
              "
            >
              Start a project
            </Link>

            <WorkMenu />

            <a
              href="/JOEL_MBITHI_MUTUKU.pdf"
              download
              className="
                inline-flex items-center gap-2 text-sm font-medium text-[#004d9c]
                underline-offset-4 hover:underline
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-4 focus-visible:outline-[#004d9c]
              "
            >
              <FiDownload size={15} aria-hidden />
              Download CV
            </a>
          </div>

          <ul
            className="
              hero-fade mt-14 flex max-w-[500px] gap-12
              border-t border-[#0b1f33]/12 pt-6
            "
            style={{ animationDelay: '950ms' }}
          >
            {STATS.map((s) => (
              <li key={s.label} className="flex items-baseline gap-2.5">
                <strong className="text-2xl font-bold tabular-nums tracking-[-0.02em]">
                  {s.value}
                </strong>
                <span className="text-sm text-[#6b6b6b]">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: PHOTO ── */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-[440px]">
            <div className="relative">
              <span
                aria-hidden
                className="
                  hero-frame absolute left-[22px] top-[22px] z-0 h-full w-full
                  rounded border border-[#004d9c]
                "
                style={{ animationDelay: '1000ms' }}
              />

              <div
                className="
                  hero-wipe relative z-10 aspect-[4/5] overflow-hidden rounded
                  bg-[#e8e6e1] shadow-[0_30px_60px_-30px_rgba(11,31,51,0.4)]
                "
                style={{ animationDelay: '300ms' }}
              >
                <div
                  className="hero-settle absolute inset-0"
                  style={{ animationDelay: '300ms' }}
                >
                  <Image
                    src="/joe2.jpeg"
                    alt="Joel Mbithi"
                    fill
                    sizes="(max-width: 900px) 90vw, 440px"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              className="hero-fade mt-10 flex items-center justify-between text-sm text-[#6b6b6b]"
              style={{ animationDelay: '1150ms' }}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00ade2]" />
                Open to remote and hybrid work
              </span>
              <span className="tabular-nums">
                {time ? `Nairobi ${time}` : '\u00A0'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero