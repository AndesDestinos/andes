import BookingForm from '@/components/booking/bookingForm';
import { client } from '@/lib/sanity.client';

export default async function Booking({ params }: any) {
  const { lang } = await params
  const hero = `*[_type == "bookingPage"][0]{
    title,
    image,
  }`;
  const heroData = await client.fetch(hero);

  const query = `*[
    _type in ["tours", "travelPackage", "experiences"]
  ]{
    _id,
    "title": title[$lang],
    "image": mainImage.asset->url,
    "price": price,
    days,
    "durationLabel": durationLabel[$lang],
    "category": category->{
      "title": title[$lang],
      type
    },
    "_type": _type
  }`
  const data = await client.fetch(query, { lang })

  return <BookingForm lang={lang} hero={heroData} data={data} />
}