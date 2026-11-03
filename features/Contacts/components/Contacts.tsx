'use client'

import { useState, type FormEvent } from 'react'
import { Fraunces } from 'next/font/google'

const display = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'] })

const EMAIL = 'joellembithi@gmail.com'
const FORM_URL = 'https://formspree.io/f/myzjpoyl'

const DETAILS = [
  { label: 'Phone', value: '+254 743 861 565', href: 'tel:+254743861565' },
  { label: 'WhatsApp', value: 'Send a message', href: 'https://wa.me/254743861565' },
  { label: 'Based in', value: 'Nairobi, Kenya' },
]

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joel-mbithi-84bab9278/' },
  { label: 'GitHub', href: 'https://github.com/joelmbithi' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Twitter', href: 'https://twitter.com/joelmbithi' },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full border-b border-white/30 bg-transparent py-3 text-base text-white placeholder:text-white/35 transition-colors focus:border-[#00ade2] focus:outline-none'

export const Contact = () => {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        form.reset()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[#004d9c] px-6 pb-10 pt-24 text-white md:pt-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          {/* left */}
          <div className="md:col-span-5">
            <h2
              className={`${display.className} text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight`}
            >
              Let&rsquo;s
              <br />
              <span className="italic text-[#00ade2]">talk.</span>
            </h2>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-white/75">
              Have a website or project in mind? Tell me what you need and I&rsquo;ll
              get back to you.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-10 inline-block break-all border-b-2 border-[#00ade2] pb-1 text-lg font-semibold transition-colors hover:border-white sm:text-xl"
            >
              {EMAIL}
            </a>

            <dl className="mt-10 border-b border-white/20">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-white/20 py-4"
                >
                  <dt className="text-sm text-white/55">{d.label}</dt>
                  <dd>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="transition-colors hover:text-[#00ade2]"
                      >
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-white/30 pb-0.5 transition-colors hover:border-[#00ade2] hover:text-[#00ade2]"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* right: form */}
          <div className="md:col-span-7">
            {status === 'success' ? (
              <div role="status" className="border-t border-white/20 pt-8">
                <p className={`${display.className} text-3xl font-semibold`}>
                  Message sent.
                </p>
                <p className="mt-3 max-w-sm leading-relaxed text-white/75">
                  Thanks for writing. I&rsquo;ll reply as soon as I can, usually
                  within a day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 border-b border-white/40 pb-0.5 text-sm transition-colors hover:border-[#00ade2] hover:text-[#00ade2]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm text-white/60">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm text-white/60">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="text-sm text-white/60">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm text-white/60">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {/* spam trap: real visitors never see or fill this */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="bg-white px-8 py-3.5 text-sm font-medium text-[#004d9c] transition-colors hover:bg-[#00ade2] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>

                  {status === 'error' && (
                    <p role="alert" className="text-sm text-white/85">
                      That didn&rsquo;t send. Try again, or email me at{' '}
                      <a
                        href={`mailto:${EMAIL}`}
                        className="underline underline-offset-2"
                      >
                        {EMAIL}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        
      </div>
    </section>
  )
}

export default Contact