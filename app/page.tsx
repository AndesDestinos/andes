'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const lang = localStorage.getItem('language')

    if (lang === 'es' || lang === 'en') {
      router.replace(`/${lang}`)
    } else {
      localStorage.setItem('language', 'en')
      router.replace('/en')
    }
  }, [router])

  return null
}