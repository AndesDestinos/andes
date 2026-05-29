import EsnnaClient from '@/components/esnna/EsnnaClient'
import { client } from '@/lib/sanity.client';

export default async function Page({ params }: any) {
  const { lang } = await params
    
  const hero = `*[_type == "esnnaPage"][0]{
    title,
    image,
  }`;
  const heroData = await client.fetch(hero);

  return <EsnnaClient lang={lang} hero={heroData} />
}