import AlsoLikeSection from '@/components/packages/AlsoLikeSection';
import HelpSection from '@/components/packages/HelpSection';
import HeroSection from '@/components/packages/HeroSection';
import IncludeSection from '@/components/packages/IncludeSection';
import ItinerarySection from '@/components/packages/ItinerarySection';
import RecomendationSection from '@/components/packages/Recomendation';
import SummarySection from '@/components/packages/SummarySection';
import TabsNav from '@/components/packages/TabsNav';
import {client} from '@/lib/sanity.client'
import {notFound} from 'next/navigation'

const getExperienceBySlugQuery = `
*[_type == "experiences" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  destinations,
  days,
  durationLabel,
  recommendedFor,
  price,
  rating,
  mainImage,
  summary,
  itinerary,
  includes,
  notIncludes,
  recommendations,
  helpSection,
  "category": category->{
    title,
    slug
  }
}
`

const getRelatedPackagesQuery = `
*[_type == "experiences" 
  && category->slug.current == $category
  && slug.current != $slug
  && defined(slug.current)
]{
  _id,
  title,
  slug,
  mainImage,
  price,
  rating,
  days,
  destinations,
  "category": category->{
    slug
  }
}
`

export default async function ExperiencePage({
    params,
}: {
    params: { lang: string; category: string; slug: string }
}) {
    const { lang, slug, category } = await params
    const paquete = await client.fetch(getExperienceBySlugQuery, { slug })
        const otrosPaquetes = await client.fetch(getRelatedPackagesQuery, { slug, category })
    if (!paquete) {
        notFound()
    }

    if (paquete.category?.slug?.current !== category) {
        notFound()
    }

    return (
        <>
            <HeroSection
                title={paquete.title}
                destinations={paquete.destinations}
                days={paquete.days}
                category={paquete.category?.title}
                image={paquete.mainImage}
                recommended={paquete.recommendedFor}
                lang={lang}
            />

            <TabsNav lang={lang} />

            <div className='flex flex-col w-full gap-36 pt-12 pb-36'>
            <SummarySection 
                summary={paquete.summary} 
                title={paquete.title}
                price={paquete.price}
                category={paquete.category?.title}
                rating={paquete.rating}
                lang={lang} />

            <ItinerarySection itinerary={paquete.itinerary} lang={lang} />

            <IncludeSection includes={paquete.includes} notIncludes={paquete.notIncludes} lang={lang} />

            <RecomendationSection recommendations={paquete.recommendations} lang={lang} />

            <HelpSection help={paquete.helpSection} lang={lang} />
            
            <AlsoLikeSection tours={otrosPaquetes} lang={lang} path={"experiences"} />
            </div>
        </>
    )
}