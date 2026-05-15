import ContactUsForm from '@/components/forms/ContactForm'

export default async function Page({ params }: any) {
  const { lang } = await params

  return <ContactUsForm language={lang} />
}