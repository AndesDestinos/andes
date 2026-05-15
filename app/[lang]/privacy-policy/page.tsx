import PrivacyClient from '@/components/privacy-policy/PrivacyClient'
import { client } from '@/lib/sanity.client'

const query = `
*[_type == "privacyPage"][0]{
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

    return <PrivacyClient data={data} lang={lang} />
}