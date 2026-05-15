import ComplaintsBookForm from "@/components/forms/ComplaintsBookForm"

export default async function Page({ params }: any) {
  const { lang } = await params

  return <ComplaintsBookForm language={lang} />
}