'use client'

type Item = {
  title: any
  slug: string
  category?: {
    title?: any,
    slug?: string
  }
}

type Props = {
  type: 'tour' | 'package' | 'experience'
  data: Item[]
  lang: string
  activeCategory: number
  setActiveCategory: (i: number) => void
  onNavigate: (slug: string) => void
  isMobile?: boolean
}

export default function DropdownMenu({
  type,
  data,
  lang,
  activeCategory,
  setActiveCategory,
  onNavigate,
  isMobile = false
}: Props) {
  const grouped: Record<string, Item[]> = {}
  data.forEach(item => {
    const cat = item.category?.title?.[lang] || 'Otros'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(item)
  })

  const categories = Object.keys(grouped)

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 mt-2">
        {Object.entries(grouped).map(([cat, items], i) => (
          <div key={i}>
            <div className="font-bold">{cat}</div>

            <div className="ml-3 mt-1">
              {items.map((item, j) => (
                <div
                  key={j}
                  onClick={() => onNavigate(item.category?.slug + '/' + item.slug)}
                  className="py-1 text-sm opacity-80"
                >
                  {item.title?.[lang]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'tour') {
    return (
      <div className="absolute left-0 top-[25px] w-[500px] bg-white text-black p-5">
        <div className="grid grid-cols-2 gap-10">
          <div>
            {categories.map((cat, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveCategory(i)}
                className={`cursor-pointer py-2 ${
                  activeCategory === i ? 'font-bold' : 'opacity-60'
                }`}
              >
                {cat}
              </div>
            ))}
          </div>
          <div>
            {grouped[categories[activeCategory]]?.map((item, i) => (
              <div
                key={i}
                onClick={() => onNavigate(item.category?.slug + '/' + item.slug)}
                className="cursor-pointer py-2 hover:opacity-60"
              >
                {item.title?.[lang]}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute left-0 top-[25px] w-[500px] bg-white text-black p-5">
      {Object.entries(grouped).map(([cat, items], i) => (
        <div key={i}>
          <div className="font-bold mb-2">{cat}</div>
          {items.map((item, j) => (
            <div
              key={j}
              onClick={() => onNavigate(item.category?.slug + '/' + item.slug)}
              className="cursor-pointer py-1 hover:opacity-60"
            >
              {item.title?.[lang]}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}