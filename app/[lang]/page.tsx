import CompanySection from "@/components/home/CompanySection";
import TripSection from "@/components/home/TripSection";
import HeroSection from "@/components/home/HeroSection";
import { client } from "@/lib/sanity.client";
import StrengthsSection from "@/components/home/StrengthsSection";
import FeaturedToursSection from "@/components/home/FeaturedToursSection";
import BlogSection from "@/components/home/BlogSection";


export default async function HomePage({params}: any) {
  const { lang } = await params;

  const aboutData = await client.fetch(`
    *[_type == "aboutPage"][0]{
      heroImage,
      heroTitle,
      ourStory,
      coreValuesSection,
      strengthsSection,
      detalleSection,
    }
  `)

  const featuredTours = await client.fetch(`
    *[_type == "tours" && featured == true]{
      _id,
      title,
      slug,
      durationLabel,
      destinations,
      mainImage,
      category->{
        title,
        slug
      }
    }
  `)

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

  const blogs = await client.fetch(`
    *[_type == "blogPost" && featured == true] | order(publishedAt desc){
      headline,
      slug,
      publishedAt,
      readingTime,
      excerpt,
      mainImage,
      category->{
        title,
        slug
      }
    }
  `)

  return (
    <main className="w-full flex flex-col gap-21">
      <HeroSection data={homeData} lang={lang} />

      <div className="andes-contenido-pequenio">
        <CompanySection data={homeData.companySection} lang={lang} />
      </div>

      <div className="andes-contenido">
        <StrengthsSection data={aboutData.strengthsSection} lang={lang} />
      </div>

      <div className="andes-contenido">
        <FeaturedToursSection tours={featuredTours} lang={lang} />
      </div>

      <div className="andes-contenido-pequenio">
        <TripSection data={homeData.yourTripSection} lang={lang} />
      </div>

      <div className="andes-contenido">
        <BlogSection posts={blogs} lang={lang} />
      </div>
    </main>
  )
}