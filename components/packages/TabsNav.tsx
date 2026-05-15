export default function TabsNav({lang}: any) {
  return (
    <section className="border-b">
      <div className="andes-contenido">
        <nav className="flex gap-12 overflow-x-auto whitespace-nowrap">
          <a href="#resumen" className="shrink-0">
            { lang === 'es' ? 'Resumen' : 'Resume' }
          </a>
          <a href="#itinerario" className="shrink-0">
            { lang === 'es' ? 'Itinerario' : 'Itinerary' }
          </a>
          <a href="#incluye" className="shrink-0">
            { lang === 'es' ? 'Incluye' : 'Include' }
          </a>
          <a href="#recomendations" className="shrink-0">
            { lang === 'es' ? 'Que llevar' : 'What to wear' }
          </a>
          <a href="#ayuda" className="shrink-0">
            { lang === 'es' ? 'Ayuda' : 'Help' }
          </a>
          <a href="#moreDestinations" className="shrink-0">
            { lang === 'es' ? 'Más destinos' : 'More destinations' }
          </a>
        </nav>
      </div>
    </section>
  )
}