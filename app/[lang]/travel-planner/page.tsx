import TravelPlannerForm from "@/components/forms/TravelPlannerForm"

export default async function Page({ params }: any) {
  const { lang } = await params

  return <TravelPlannerForm language={lang} />
}