import {urlFor} from '@/lib/sanity.image'

export default function HeroSection({
  title,
  destinations,
  days,
  category,
  image,
  recommended,
  lang,
}: any) {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image ? urlFor(image).width(2000).url() : '/images/share/noImage.jpg'}
          alt={title?.[lang]}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-end text-white">
        <div className="andes-contenido">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-3">
              <div className='flex'>
                <span className="flex items-center gap-3 bg-black px-3 py-2">
                  <img 
                    src="/images/packages/corona.svg" 
                    alt="" 
                    className="h-[1em] w-auto"
                  />
                  { lang === 'es' ? 'Tour Privado' : 'Private Tour' }
                </span>
              </div>
              <h1>{title?.[lang]}</h1>
              <p>
                {destinations?.join(', ')}
              </p>
            </div>

            <div className="flex flex-col max-w-[400px]">
              <div className='flex gap-7 justify-end'>
                <div className='flex flex-col'>
                  <span className='text-[75px]'>{days}</span>
                  <p>DÍAS</p>
                </div>
                <div className='flex flex-col'>
                  <span className='text-[75px]'>{destinations?.length}</span>
                  <p>DESTINOS</p>
                </div>
              </div>
              <div className='flex w-full mb-7'>
                <img 
                  src="/images/packages/separador.svg" 
                  alt="" 
                  className="h-[1em] w-full"
                />
              </div>
              <div className='flex gap-7'>
                <img 
                  src="/images/packages/andesExperiences.svg" 
                  alt="" 
                  className="h-[3em] w-auto"
                />
                <p>
                  {recommended?.[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}