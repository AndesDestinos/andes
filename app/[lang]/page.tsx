import CompanySection from "@/components/home/CompanySection";
import TripSection from "@/components/home/TripSection";
import HeroSection from "@/components/home/HeroSection";
import { client } from "@/lib/sanity.client";


export default async function HomePage({params}: any) {
    const { lang } = await params;

    const homeData = await client.fetch(`
        *[_type == "homePage"][0]{
            heroMedia{
            type,
            "image": image.asset->url,
            "video": video.asset->url
            },
            heroTitle,
            companySection{
            "image": image.asset->url,
            title,
            subtitle,
            description
            },
            yourTripSection{
            title,
            subtitle,
            images[]{
                asset->{
                url
                }
            },
            steps[]{
                title,
                description
            },
            ctaButton
            }
        }
    `);

  return (
    <main className="w-full flex flex-col gap-21">
      <HeroSection data={homeData} lang={lang} />

      <div className="andes-contenido-pequenio">
        <CompanySection data={homeData.companySection} lang={lang} />
      </div>

      <div className="andes-contenido-pequenio">
        <TripSection data={homeData.yourTripSection} lang={lang} />
      </div>
    </main>
  )
}