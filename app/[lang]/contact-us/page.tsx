import ContactUsForm from '@/components/forms/ContactForm'
import { client } from '@/lib/sanity.client';

export default async function Page({ params }: any) {
  const { lang } = await params
  
  const hero = `*[_type == "contactPage"][0]{
    title,
    image,
  }`;
  const heroData = await client.fetch(hero);

  return <ContactUsForm language={lang} hero={heroData} />
}