import PackagesSection from "@/components/packages/general/PackagesSection"
import WhyChooseUs from "@/components/packages/general/WhyChooseUs"
import HeroSection from "@/components/packages/general/HeroSection"
import { client } from "@/lib/sanity.client"
import BlogSection from "@/components/packages/general/BlogSection"
import IntroductionSection from "@/components/packages/general/IntroductionSection"

export default async function Page({ params }: any) {
  const hero = `*[_type == "experiencePage"][0]{
    title,
    image,
    introduction {
      title,
      description
    }
  }`;
  const packagesByCategoryQuery = `
    *[_type == "category" && type == "experience"]{
    _id,
    title,
    subtitle,
    description,
    "packages": *[_type == "experiences" && references(^._id)]{
        _id,
        title,
        slug,
        durationLabel,
        days,
        "mainImage": mainImage.asset->url,
        category->{
          type,
          slug
        }
    }
    }
    `
  const blogsQuery = `
    *[_type == "blogPost" && featured == true] | order(publishedAt desc){
    _id,
    headline,
    slug,
    publishedAt,
    readingTime,
    excerpt,
    "mainImage": mainImage.asset->url,
    category->{
        title
    }
    }
    `

  const { lang } = await params;

  const heroData = await client.fetch(hero);
  const categories = await client.fetch(packagesByCategoryQuery);
  const blogs = await client.fetch(blogsQuery);

  return (
    <main>
      <HeroSection lang={lang} hero={heroData} />
      <IntroductionSection lang={lang} introduction={heroData.introduction} />
      <WhyChooseUs lang={lang} />
      <PackagesSection categories={categories} lang={lang} />
      <BlogSection posts={blogs} lang={lang} />
    </main>
  )
}