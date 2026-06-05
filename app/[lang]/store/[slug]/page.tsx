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
      details
    }
  `,
    { slug }
  );

  return (
    <div className="px-6 md:px-12 mt-[60px] md:mt-[80px]">
      <ProductDetail product={product} lang={lang} />
    </div>
  );
}