import TermsClient from '@/components/terms-conditions/TermsClient'
import { client } from '@/lib/sanity.client'

const query = `
*[_type == "termsPage"][0]{
  hero{
    image,
    title
  },
  title,
  intro,
  sections[]{
    heading,
    content
  }
}
`

export default async function Page({
    params,
}: {
    params: { lang: string }
}) {
    const { lang } = await params
    const data = await client.fetch(query)

    const reconocimiento = await client.fetch(`
    *[_type == "recognizedExcellence"][0]{
      title,
      items[]{
        alt,
        image{
          asset->{
            url
          }
        }
      }
    }
  `)

    return <TermsClient data={data} lang={lang} reconocimiento={reconocimiento} />
}