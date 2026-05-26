type Props = {
  lang: string,
  introduction: any
}

export default function IntroductionSection({ lang, introduction }: Props) {
  return (
    <section className="andes-contenido-pequenio text-center flex flex-col">
      <h2 className="mb-12">
        {introduction.title?.[lang]}
      </h2>

      <div className="w-full whitespace-pre-line">
        {introduction.description?.[lang]}
      </div>
    </section>
  )
}