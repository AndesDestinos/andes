import StoreGrid from '@/components/store/StoreGrid'
import { client } from '@/lib/sanity.client'

export default async function TiendaPage({ params }: any) {
  const { lang } = await params

  const [products, categories, storePage] = await Promise.all([
    client.fetch(`
      *[_type == "storeProduct"]{
        _id,
        name,
        price,
        slug,
        category,
        "image": images[0]
      }
    `),
    client.fetch(`
      *[_type == "category" && type == "tienda"]{
        _id,
        title,
        slug
      }
    `),
    client.fetch(`*[_type == "storePage"][0]{
      title,
      description,
      images[]{
        asset->{
          _id,
          url
        }
      },
      faq{
        title,
        subtitle,
        items[]{
          title,
          description
        }
      },
      strengths{
        title,
        subtitle,
        items[]{
          title,
          description,
          image{
            asset->{
              _id,
              url
            }
          }
        }
      }
    }`)
  ])

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

  return (
    <StoreGrid
      storePage={storePage}
      products={products}
      categories={categories}
      lang={lang}
      reconocimiento={reconocimiento}
    />
  )
}