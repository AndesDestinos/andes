import ProductDetail from "@/components/store/ProductDetail";
import { client } from "@/lib/sanity.client";

export default async function ProductPage({ params }: any) {
  const { lang, slug } = await params;

  const product = await client.fetch(
    `
    *[_type == "storeProduct" && slug.current == $slug][0]{
      _id,
      name,
      price,
      images,
      details,
      stock,
    }
  `,
    { slug }
  );

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
    <div className="px-2 md:px-12 mt-[60px] md:mt-[80px]">
      <ProductDetail product={product} lang={lang} reconocimiento={reconocimiento} />
    </div>
  );
}