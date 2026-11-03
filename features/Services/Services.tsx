import { Fraunces } from 'next/font/google'

const display = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'] })

const SERVICES = [
  {
    title: 'Web development',
    desc: 'Business sites, landing pages and web apps that load fast and work properly on a phone first.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'UI and graphic design',
    desc: 'Layouts, brand visuals and social graphics. I design and build, so nothing gets lost between the mockup and the live site.',
    tools: ['Figma', 'Photoshop'],
  },
  {
    title: 'Digital marketing',
    desc: 'Social media content and campaigns, backed by real field marketing experience.',
    tools: ['Content', 'Campaigns', 'Analytics'],
  },
  {
    title: 'SEO',
    desc: 'Technical audits, page speed and on-page fixes so people can actually find your site.',
    tools: ['Audits', 'Keyword research', 'Performance'],
  },
  {
    title: 'SaaS products',
    desc: 'Products with logins, payments and dashboards, taken from idea to launch.',
    tools: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'App development',
    desc: 'Cross-platform mobile apps for iOS and Android.',
    tools: ['React Native'],
  },
  {
    title: 'Deployment',
    desc: 'Getting your site live and keeping it live, with automatic builds on every update.',
    tools: ['Vercel', 'Netlify', 'Docker', 'Git'],
  },
]

const STACK = [
  {
    name: 'Frontend',
    items: [
      { name: 'React', core: true },
      { name: 'Next.js', core: true },
      { name: 'TypeScript', core: true },
      { name: 'JavaScript', core: true },
      { name: 'Tailwind CSS', core: true },
      { name: 'HTML & CSS', core: true },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', core: true },
      { name: 'Express', core: true },
      { name: 'PHP', core: false },
      { name: 'Python', core: true },
      { name: 'Django', core: false },
       { name: 'ASP.NET', core: false },
    ],
  },
  {
    name: 'Databases',
    items: [
      { name: 'MySQL', core: true },
      { name: 'MongoDB', core: true },
      { name: 'PostgreSQL', core: true },
      { name: 'Firebase', core: false },
      { name: 'Supabase', core: true },
    ],
  },
]

export const Services = () => {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-[#f7f5f0] px-6 py-24 text-[#0b1f33] md:py-32"
    >
      <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-12 md:gap-12">
        {/* left: stays in view while the list scrolls */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2
              className={`${display.className} text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight`}
            >
              What I
              <br />
              <span className="italic text-[#004d9c]">do.</span>
            </h2>

            <p className="mt-6 max-w-xs text-base leading-relaxed text-[#0b1f33]/70">
              I take a project from design to deployment. Most of the code is
              JavaScript and TypeScript, from the interface down to the database.
            </p>

            <div className="mt-10 hidden md:block">
              <p className={`${display.className} text-xl font-semibold`}>
                Not sure what you need?
              </p>
              <a
                href="Contacts"
                className="mt-4 inline-block bg-[#004d9c] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#003d7c]"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>

        {/* right: services + stack */}
        <div className="md:col-span-8">
          <ol className="border-b border-[#0b1f33]/15">
            {SERVICES.map((s, i) => (
              <li
                key={s.title}
                className="group grid grid-cols-[2.5rem_1fr] border-t border-[#0b1f33]/15 py-7"
              >
                <span className="pt-1.5 font-mono text-xs text-[#00ade2]">
                  0{i + 1}
                </span>
                <div>
                  <h3
                    className={`${display.className} text-2xl font-semibold transition-colors group-hover:text-[#004d9c]`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#0b1f33]/70">
                    {s.desc}
                  </p>
                  <p className="mt-2 text-sm text-[#0b1f33]/45">
                    {s.tools.join(', ')}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={`${display.className} text-2xl font-semibold`}>
                The stack
              </h3>
              <p className="text-xs text-[#0b1f33]/50">
                Darker names are the ones I use most.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {STACK.map((g) => (
                <div key={g.name} className="border-t border-[#0b1f33]/15 pt-4">
                  <p className="mb-3 text-sm text-[#0b1f33]/55">{g.name}</p>
                  <ul className="space-y-1.5 text-[15px]">
                    {g.items.map((item) => (
                      <li
                        key={item.name}
                        className={
                          item.core
                            ? 'font-medium text-[#0b1f33]'
                            : 'text-[#0b1f33]/45'
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* mobile only: the left column's CTA is hidden there */}
          <div className="mt-16 md:hidden">
            <p className={`${display.className} text-xl font-semibold`}>
              Not sure what you need?
            </p>
            <a
              href="Contacts"
              className="mt-4 inline-block bg-[#004d9c] px-7 py-3.5 text-sm font-medium text-white"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services