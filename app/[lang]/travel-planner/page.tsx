import TravelPlannerForm from "@/components/forms/TravelPlannerForm"
import { client } from "@/lib/sanity.client";

export default async function Page({ params }: any) {
  const { lang } = await params
      
  const hero = `*[_type == "plannerPage"][0]{
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

  return <TravelPlannerForm language={lang} hero={heroData} reconocimiento={reconocimiento} />
}