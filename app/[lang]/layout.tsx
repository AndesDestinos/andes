import Header from '@/components/header/Header'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import Footer from '@/components/footer/Footer'

export default async function Layout({ children, params }: { children: React.ReactNode, params: { lang: string } }) {
  const { lang } = params

  if (lang !== 'es' && lang !== 'en') {
    notFound()
  }

  const tours = await client.fetch(`
    *[_type == "tours"]{
      title,
      "slug": slug.current,
      "category": category->{
        title,
        "slug": slug.current
      }
    }
  `)

  const packages = await client.fetch(`
    *[_type == "travelPackage"]{
      title,
      "slug": slug.current,
      "category": category->{
        title,
        "slug": slug.current
      }
    }
  `)

  const experiences = await client.fetch(`
    *[_type == "experiences"]{
      title,
      "slug": slug.current,
      "category": category->{
        title,
        "slug": slug.current
      }
    }
  `)

  const home = await client.fetch(`
    *[_type == "homePage"][0]{
      socialLinks[]{
        "icon": icon.asset->url,
        url
      },
      companyName,
      ruc,
      email,
      phone,
      address,
    }
  `)

  return (
    <>
      <Header
        lang={lang}
        tours={tours}
        packages={packages}
        experiences={experiences}
      />
      {children}
      <Footer lang={lang} home={home} />
    </>
  )
}