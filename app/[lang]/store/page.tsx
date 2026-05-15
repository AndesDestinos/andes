import StoreGrid from '@/components/store/StoreGrid'
import { client } from '@/lib/sanity.client'

export default async function TiendaPage({ params }: any) {
  const { lang } = await params

  const [products, categories] = await Promise.all([
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
    `)
  ])

  return (
    <StoreGrid
      products={products}
      categories={categories}
      lang={lang}
    />
  )
}