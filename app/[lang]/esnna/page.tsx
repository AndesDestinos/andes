import EsnnaClient from '@/components/esnna/EsnnaClient'

export default async function Page({
    params,
}: {
    params: { lang: string }
}) {
    const { lang } = await params

    return <EsnnaClient lang={lang} />
}