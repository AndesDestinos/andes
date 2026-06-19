import CheckoutPage from "@/components/store/CheckoutPage";
import { client } from "@/lib/sanity.client";

export default async function Page({ params }: { params: { lang: "es" | "en" } }) {
  const { lang } = await params;
  const hero = `*[_type == "checkoutPage"][0]{
    title,
    image,
  }`;
  const heroData = await client.fetch(hero);

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

  return <CheckoutPage lang={lang} hero={heroData} reconocimiento={reconocimiento} />;
}