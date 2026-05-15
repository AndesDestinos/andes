import AboutPage from '@/components/about/AboutPage'
import { client } from '@/lib/sanity.client'

export default async function Page({ params }: any) {
  const { lang } = await params

  const data = await client.fetch(`
    *[_type == "aboutPage"][0]{
      heroImage,
      heroTitle,
      ourStory,
      coreValuesSection,
      strengthsSection,
      detalleSection,
    }
  `)

  return <AboutPage data={data} lang={lang} />
}