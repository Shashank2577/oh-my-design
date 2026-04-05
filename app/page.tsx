import Link from 'next/link'
import { STYLES } from '@/lib/styles-registry'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            oh-my-design
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
            32 design style showcases
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {STYLES.map((style) => (
            <Link
              key={style.slug}
              href={`/styles/${style.slug}`}
              className="group block relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-slate-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                  {style.category}
                </span>
                <div className="flex items-center space-x-2">
                  <span
                    className="h-4 w-4 rounded-full ring-1 ring-slate-200"
                    style={{ backgroundColor: style.accentColor }}
                    aria-hidden="true"
                  />
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      style.built ? 'bg-green-500' : 'bg-slate-300'
                    }`}
                    title={style.built ? 'Built' : 'Not built yet'}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {style.name}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2">
                {style.vibe}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
