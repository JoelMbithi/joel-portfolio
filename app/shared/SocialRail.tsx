'use client'

import { useEffect, useState } from 'react'
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiInstagram,
  FiTwitter,
  
  
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/JoelMbithi',                       icon: FiGithub,    external: true },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/joel-mbithi',             icon: FiLinkedin,  external: true },
  { label: 'Twitter', href: 'https://twitter.com/yourhandle',                    icon: FiTwitter,   external: true },
    { label: 'WhatsApp',  href: 'https://wa.me/254743861565',                     icon: FaWhatsapp,  external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/_jhoelloh_/',                icon: FiInstagram, external: true },
  { label: 'Email',     href: 'mailto:joellembithi@gmail.com',                         icon: FiMail,      external: false },
]

export default function SocialRail() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // small delay so the rail enters after the page paints
    const t = setTimeout(() => setMounted(true), 350)
    return () => clearTimeout(t)
  }, [])

  return (
    <aside
      aria-label="Social links"
      className={`
        fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:flex md:flex-col
        transition-all duration-700 ease-[cubic-bezier(.2,.7,.1,1)]
        ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}
      `}
    >
      <ul className="flex flex-col gap-1.5">
        {SOCIALS.map(({ label, href, icon: Icon, external }, i) => (
          <li
            key={label}
            className="transition-all duration-500 ease-[cubic-bezier(.2,.7,.1,1)]"
            style={{
              transitionDelay: mounted ? `${i * 70 + 150}ms` : '0ms',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateX(0)' : 'translateX(-14px)',
            }}
          >
            <a
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={label}
              className="
                group relative flex h-10 w-10 items-center justify-center
                rounded-full border border-[#0b1f33]/15 bg-white/70 text-[#0b1f33]
                backdrop-blur-sm
                transition-all duration-300
                hover:w-[120px] hover:justify-start hover:gap-2 hover:border-[#004d9c]
                hover:bg-[#004d9c]  hover:text-white hover:pl-3
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-[#004d9c]
              "
            >
              <Icon size={16} aria-hidden className="shrink-0" />
              <span
                className="
                  max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-medium
                  uppercase tracking-[0.14em] opacity-0
                  transition-all duration-300
                  group-hover:max-w-[80px] group-hover:opacity-100
                "
              >
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>

    
    </aside>
  )
}