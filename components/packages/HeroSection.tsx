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
    <>
    <section className="relative h-[75vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image ? urlFor(image).width(2000).url() : '/images/share/noImage.jpg'}
          alt={title?.[lang]}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/10" />

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
              <div className='flex gap-2 items-center'>
                <div className='px-3 py-2 border border-white rounded-full'>
                  <img src="/images/packages/ubicacionClara.svg" />
                </div>
                <p>
                  {destinations?.join(', ')}
                </p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='p-2 border border-white rounded-full'>
                  <img src="/images/packages/edit.svg" />
                </div>
                <p>
                  {lang === 'es' ? 'TOUR PERSONALIZABLE' : 'CUSTOMIZABLE TOUR'}
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-col max-w-[400px]">
              <div className='flex gap-7 justify-end'>
                <div className='flex flex-col'>
                  <span className='!text-[75px]'>{days}</span>
                  <p>{lang === 'es' ? 'DÍAS' : 'DAYS'}</p>
                </div>
                <div className='flex flex-col'>
                  <span className='!text-[75px]'>{destinations?.length}</span>
                  <p>{lang === 'es' ? 'DESTINOS' : 'DESTINATIONS'}</p>
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

    <div className="md:hidden andes-contenido py-6">
      <div className="flex flex-col gap-5">
        <div className='flex w-full gap-7 justify-center'>
          <div className='flex flex-col text-center'>
            <span className='!text-[50px]'>{days}</span>
            <p>{lang === 'es' ? 'DÍAS' : 'DAYS'}</p>
          </div>
          <div className='flex flex-col text-center'>
            <span className='!text-[50px]'>{destinations?.length}</span>
            <p>{lang === 'es' ? 'DESTINOS' : 'DESTINATIONS'}</p>
          </div>
        </div>

        <div className='flex w-full'>
          <img 
            src="/images/packages/separatorDark.svg" 
            alt="" 
            className="h-[2em] w-full"
          />
        </div>

        <div className='flex gap-5 items-center'>
          <img 
            src="/images/packages/andesExperiencesDark.svg" 
            alt="" 
            className="h-[2.5em] w-auto"
          />
          <p>{recommended?.[lang]}</p>
        </div>

      </div>
    </div>
    </>
  )
}