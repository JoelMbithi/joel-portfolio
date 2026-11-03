'use client'

import { useEffect, useRef, useState } from 'react'
import { Fraunces } from 'next/font/google'

const display = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

type Entry = {
  period?: string
  title: string
  org?: string
  desc?: string
  points?: string[]
}

const ENTRIES: Entry[] = [
  {
    period: 'Currently',
    title: 'Field marketing and business development',
    org: 'Farma24 Pharmacy',
    desc: "Marketing and outreach for the pharmacy around Nairobi. I'm moving into the digital side of the work too: websites, social media and visuals.",
    // points: ['Add a result here, e.g. a number of new customers or a campaign'],
  },
  {
    period: '2024',
    title: 'ICT intern',
    org: 'Nairobi City County, ICT department',
    desc: 'Internship in the county ICT department.',
    // points: ['Add what you worked on, e.g. a system, support work or a project'],
  },
  {
    // period: 'Add dates',
    title: 'Fanikisha (J) Ventures',
    // org: 'Add your role here',
    points: [
      'Social media engagement grew by 30%',
      'Sales increased by 20%',
    ],
  },
]

export const Experience = () => {
  const listRef = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [reached, setReached] = useState(-1)

  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return

    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      items.forEach((el) => el.setAttribute('data-in', 'true'))
      fill.style.height = '100%'
      setReached(items.length - 1)
      return
    }

    // fade each entry in once
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', 'true')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.2 }
    )
    items.forEach((el) => io.observe(el))

    // draw the line as you scroll
    let raf = 0
    const update = () => {
      raf = 0
      const rect = list.getBoundingClientRect()
      const trigger = window.innerHeight * 0.6
      const px = Math.min(Math.max(trigger - rect.top, 0), rect.height)
      fill.style.height = `${Math.max(px - 8, 0)}px`

      let r = -1
      items.forEach((el, i) => {
        if (el.offsetTop + 8 <= px) r = i
      })
      setReached((prev) => (prev === r ? prev : r))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="experience"
      className="scroll-mt-20 bg-[#f7f6f3] px-6 py-24 text-[#0b1f33] md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-[1320px] gap-14 md:grid-cols-12 md:gap-12">
        {/* left: stays in view while the timeline scrolls */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#004d9c]">
              <span className="inline-block h-px w-6 bg-[#004d9c]" />
              Experience
              <span className="text-[#0b1f33]/30">— 05</span>
            </div>

            <h2
              className={`${display.className} text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]`}
            >
              Where I&rsquo;ve
              <br />
              <span className="italic text-[#004d9c]">worked.</span>
            </h2>

            <p className="mt-6 max-w-xs text-base leading-relaxed text-[#0b1f33]/70">
              Field marketing and ICT work so far, with web development growing
              alongside it.
            </p>

            
          </div>
        </div>

        {/* right: timeline */}
        <div className="md:col-span-8">
          <ol ref={listRef} className="relative">
            {/* track + fill */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[5px] top-2 w-px bg-[#0b1f33]/15"
            />
            <span
              ref={fillRef}
              aria-hidden
              className="absolute left-[5px] top-2 w-px bg-[#004d9c]"
              style={{ height: 0 }}
            />

            {ENTRIES.map((e, i) => (
              <li
                key={e.title}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className="
                  group/item relative translate-y-4 pb-14 pl-10 opacity-0
                  transition-[opacity,transform] duration-700 ease-out last:pb-0
                  data-[in=true]:translate-y-0 data-[in=true]:opacity-100
                  motion-reduce:transition-none
                "
              >
                <span
                  aria-hidden
                  className={`
                    absolute left-0 top-2 z-10 h-[11px] w-[11px] rounded-full border-2
                    transition-[background-color,border-color,transform] duration-500
                    ${reached >= i
                      ? 'border-[#004d9c] bg-[#004d9c]'
                      : 'border-[#0b1f33]/25 bg-[#f7f6f3]'}
                  `}
                />

                {e.period && (
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#0b1f33]/50">
                    {e.period}
                  </p>
                )}
                <h3
                  className={`${display.className} mt-1.5 text-2xl font-semibold leading-tight tracking-[-0.01em]`}
                >
                  {e.title}
                </h3>
                {e.org && (
                  <p className="mt-1 text-[15px] font-medium text-[#004d9c]">
                    {e.org}
                  </p>
                )}
                {e.desc && (
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#0b1f33]/75">
                    {e.desc}
                  </p>
                )}
                {e.points && (
                  <ul className="mt-4 space-y-2">
                    {e.points.map((p) => (
                      <li
                        key={p}
                        className="flex max-w-lg items-baseline gap-3 text-[15px] leading-relaxed text-[#0b1f33]/75"
                      >
                        <span
                          aria-hidden
                          className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-[#00ade2]"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          {/* mobile: the left column's buttons are hidden there */}
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 md:hidden">
            <a
              href="Contacts"
              className="bg-[#004d9c] px-7 py-3.5 text-sm font-medium text-white"
            >
              Get in touch
            </a>
            <a
              href="/Joel-Mbithi-CV.pdf"
              download
              className="border-b border-[#0b1f33]/40 pb-0.5 text-sm"
            >
              Full CV &darr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience