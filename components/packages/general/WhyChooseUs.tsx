type Props = {
  lang: string
}

export default function WhyChooseUs({ lang }: Props) {
  const t = {
    es: {
      title: "Amarás esta experiencia porque",
      items: [
        {
          image: "/images/packages/ticket.svg",
          title: "Viaja sin complicaciones",
          desc: "Entradas, trenes, guías y traslados personalizados de principio a fin",
        },
        {
          image: "/images/packages/punto.svg",
          title: "Guiado por expertos",
          desc: "Viaje con guías locales certificados, en grupos pequeños y tours privados",
        },
        {
          image: "/images/packages/mapa.svg",
          title: "Viajes personalizados",
          desc: "Elija viajes de un día, varios días e itinerarios totalmente personalizados",
        },
      ],
    },
    en: {
      title: "You will love this experience because",
      items: [
        {
          image: "/images/packages/ticket.svg",
          title: "Travel hassle-free",
          desc: "Tickets, trains, guides and transfers fully organized",
        },
        {
          image: "/images/packages/punto.svg",
          title: "Expert guides",
          desc: "Travel with certified local guides in small or private groups",
        },
        {
          image: "/images/packages/mapa.svg",
          title: "Custom trips",
          desc: "Choose from day trips or multi-day personalized itineraries",
        },
      ],
    },
  }

  const content = t[lang as "es" | "en"]

  return (
    <section className="andes-contenido-pequenio text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-12">
        {content.title}
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {content.items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <img src={item.image} className="w-6 h-6" />
            </div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-600 max-w-[250px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}