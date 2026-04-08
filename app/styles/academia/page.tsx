'use client'
import { useSearchParams } from 'next/navigation'
import Classic from './classic'
import Kinetic from './kinetic'
import { Suspense } from 'react'

function StyleContent() {
  const searchParams = useSearchParams()
  const version = searchParams.get('v')
  return version === 'classic' ? <Classic /> : <Kinetic />
}

export default function StylePage() {
  return (
    <Suspense fallback={null}>
      <StyleContent />
    </Suspense>
  )
}
