import { Fraunces } from 'next/font/google'

const display = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'] })

const BACKGROUND = [
  {
    label: 'Now',
    title: 'Farma24 Pharmacy',
    detail: 'Field marketing and business development',
  },
  {
    label: '2024',
    title: 'Nairobi City County, ICT department',
    detail: 'Intern',
  },
  {
    label: 'Education',
    title: 'Chuka University',
    detail: 'BSc Applied Computer Science',
  },
  {
    label: 'Certification',
    title: 'ALX',
    detail: 'Software Engineering',
  },
]

export const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-[#f7f5f0] px-6 py-24 text-[#0b1f33] md:py-32"
    >
      <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-12 md:gap-12">
        {/* left */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2
              className={`${display.className} text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight`}
            >
              About
              <br />
              <span className="italic text-[#004d9c]">me.</span>
            </h2>
            <p className="mt-6 text-sm text-[#0b1f33]/55">Nairobi, Kenya</p>
          </div>
        </div>

        {/* right */}
        <div className="md:col-span-8">
          <div className="max-w-xl space-y-5 text-lg leading-relaxed text-[#0b1f33]/80">
            <p>
              I&rsquo;m Joel, a full stack developer in Nairobi. I build websites
              and web apps and I design them too, so what I hand over looks right
              and works properly.
            </p>
            <p>
              I studied Applied Computer Science at Chuka University and did the
              ALX software engineering programme. Alongside the coding, I work in
              field marketing and business development, which means I think about
              who is actually going to use a site, not only how it&rsquo;s built.
            </p>
            <p>
              Most of my work is React, Next.js and Node, with some PHP when a
              project needs it.
            </p>
          </div>

          <dl className="mt-14 border-b border-[#0b1f33]/15">
            {BACKGROUND.map((b) => (
              <div
                key={b.title}
                className="grid gap-1 border-t border-[#0b1f33]/15 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <dt className="text-sm text-[#0b1f33]/50">{b.label}</dt>
                <dd>
                  <span className="font-medium">{b.title}</span>
                  <span className="block text-[15px] text-[#0b1f33]/65">
                    {b.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          
        </div>
      </div>
    </section>
  )
}

export default About