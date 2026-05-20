import BookingForm from '@/components/booking/bookingForm';
import { client } from '@/lib/sanity.client';

export default async function Booking({ params }: any) {
  const { lang } = await params
  const hero = `*[_type == "bookingPage"][0]{
    title,
    image,
  }`;
  const heroData = await client.fetch(hero);

  return <BookingForm lang={lang} hero={heroData} />
}