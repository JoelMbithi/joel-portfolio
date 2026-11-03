import Link from 'next/link'
import { Fraunces } from 'next/font/google'

const display = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

const PAGES = [
  { label: 'Work',       href: '/#projects' },
  { label: 'Services',   href: '/#services' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About',      href: '/#about' },
  { label: 'Contact',    href: '/Contacts' },
]

const ELSEWHERE = [
  { label: 'GitHub',   href: 'https://github.com/joelmbithi' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joel-mbithi-84bab9278/' },
  { label: 'Email',    href: 'mailto:joellembithi@gmail.com' },
]

export const Footer = () => {
  return (
    <footer className="bg-[#0b1f33] px-6 pt-16 text-white md:px-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 border-b border-white/15 pb-14 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
          {/* brand */}
          <div className="sm:col-span-2 md:col-span-6">
            <Link
              href="/"
              className={`${display.className} text-3xl font-semibold tracking-tight`}
            >
              Joel<span className="text-[#00ade2]">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/65">
              Full stack developer and designer in Nairobi, building websites and
              web apps that look right and work properly.
            </p>
          </div>

          {/* pages */}
          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              Pages
            </p>
            <ul className="space-y-2.5 text-[15px]">
              {PAGES.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-white/75 transition-colors hover:text-[#00ade2]"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* elsewhere */}
          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              Elsewhere
            </p>
            <ul className="space-y-2.5 text-[15px]">
              {ELSEWHERE.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-white/75 transition-colors hover:text-[#00ade2]"
                  >
                    {s.label}
                    {s.href.startsWith('http') && ' ↗'}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Joel Mbithi</p>
          <a href="#" className="transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer