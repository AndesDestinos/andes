'use client'

type Section = {
  name: any
  link: string
}

type Props = {
  lang: string
  sections: Section[]
  onNavigate: (link: string) => void
}

export default function DropdownAboutMenu({
  lang,
  sections,
  onNavigate
}: Props) {
  return (
    <div className="absolute left-0 top-[50px] w-[260px] border-t border-t-[#ABB8C3] bg-white text-black p-4 shadow-md">
      <div className="flex flex-col gap-2">
        {sections.map((section, i) => (
          <div
            key={i}
            onClick={() => onNavigate(section.link)}
            className="
              cursor-pointer py-2 px-2 rounded
              hover:bg-black/5 transition
            "
          >
            {section.name[lang]}
          </div>
        ))}
      </div>
    </div>
  )
}