import {urlFor} from '@/lib/sanity.image'

export default function SummarySection({summary, title, price, category, rating, lang}: any) {
  return (
    <section id="resumen">
      <div className="andes-contenido">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-12 items-center">
          <div className='flex flex-col gap-7 justify-between'>
            <div>
              <span className='text-gray-300'>Packages {'< ' + category?.[lang] + ' < '} </span>
              <span>{ title?.[lang] }</span>
            </div>
            <div className='flex justify-between gap-7'>
              <div className='flex flex-col'>
                <span>{ lang === 'es' ? 'Desde' : 'From' }</span>
                <span className='text-[36px] font-medium'>{ `$${price}` }</span>
                <span>{ lang === 'es' ? 'por persona' : 'per person' }</span>
              </div>
              <div className='flex items-center w-[170px]'>
                <img 
                  src="/images/packages/iconoIzquierdo.svg" 
                  alt="" 
                  className="h-[3em] w-auto"
                />
                <span className='text-center'>{ lang === 'es' ? 'Favorito de muchos viajeros' : 'A favorite of many travelers' }</span>
                <img 
                  src="/images/packages/iconoDerecho.svg" 
                  alt="" 
                  className="h-[3em] w-auto"
                />
              </div>
              <div className='flex flex-col items-center'>
                <span className='flex justify-center text-[32px]'>{ rating + '.0'}</span>
                <div className='flex gap-1'>
                  {Array.from({ length: rating }).map((_, i) => (
                    <img key={i} src="/images/packages/estrella.svg" alt="" className="h-[1em] w-auto" />
                  ))}
                </div>
              </div>
            </div>
            <h2>Resumen</h2>
            <p className=''>{summary?.text?.[lang]}</p>
          </div>
          
          <div>
            {summary?.image && (
              <img
                src={summary.image ? urlFor(summary.image).width(800).url() : '/images/share/noImage.jpg'}
                alt=""
                className="w-full aspect-[3/2] object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}