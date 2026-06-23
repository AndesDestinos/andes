type Item = {
  alt?: string
  image: {
    asset: {
      url: string
    }
  }
}

type Props = {
  title: {
    [key: string]: string
  }
  items: Item[]
  lang: string
}

export default function RecognizedExcellence({
  title,
  items,
  lang,
}: Props) {
  return (
    <section className="andes-contenido-pequenio !pb-36">
      <div className="flex flex-col gap-21">
        <h3 className="text-center text-gray-500">
          {title?.[lang]}
        </h3>

        <div className="
          flex flex-wrap 
          items-center 
          justify-center 
          gap-8 md:gap-12 lg:gap-16
        ">
          {items?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={item.image.asset.url}
                alt={item.alt || 'logo'}
                className="
                  h-7 md:h-10 lg:h-12
                  w-auto
                  object-contain
                  grayscale hover:grayscale-0 opacity-50 hover:opacity-100
                  transition duration-300 ease-in-out
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}