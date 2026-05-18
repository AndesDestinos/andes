import Header from '@/components/header/Header'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import Footer from '@/components/footer/Footer'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

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
*[_type == "siteSettings"][0]{
  logoLight{
    asset->{
      url
    }
  },
  logoDark{
    asset->{
      url
    }
  },
  storeLogoLight{
    asset->{
      url
    }
  },
  storeLogoDark{
    asset->{
      url
    }
  },
  businessName,
  ruc,
  email,
  phone,
  address,
  socials[]{
    "icon": icon.asset->url,
    url
  },
  paymentMethods[]{
    "icon": asset->url
  }
}
`)

  return (
    <>
      <Header
        lang={lang}
        settings={home}
        tours={tours}
        packages={packages}
        experiences={experiences}
      />
      {children}
      <Footer lang={lang} home={home} />
    </>
  )
}