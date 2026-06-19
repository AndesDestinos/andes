import ComplaintsBookForm from "@/components/forms/ComplaintsBookForm"
import { client } from "@/lib/sanity.client";

export default async function Page({ params }: any) {
  const { lang } = await params
    
  const hero = `*[_type == "complaintPage"][0]{
    title,
    image,
  }`;
  const heroData = await client.fetch(hero);

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

  return <ComplaintsBookForm language={lang} hero={heroData} reconocimiento={reconocimiento} />
}