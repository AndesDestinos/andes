export default function BlogTabs({ categories, active, setActive, lang }: any) {
  return (
    <div className="border-b">
      <div className="max-w-[1100px] mx-auto px-4 flex gap-6 overflow-x-auto py-4">

        {categories.map((cat: any) => (
          <button
            key={cat._id}
            onClick={() => setActive(cat.slug.current)}
            className={`
              pb-2 whitespace-nowrap text-sm
              ${active === cat.slug.current
                ? 'border-b-2 border-black'
                : 'text-gray-400'
              }
            `}
          >
            {cat.title?.[lang]}
          </button>
        ))}

      </div>
    </div>
  )
}