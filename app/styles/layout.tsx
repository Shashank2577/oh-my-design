import { CopyPromptButton } from '@/components/CopyPromptButton'
import { DesignSwitcher } from '@/components/DesignSwitcher'
import { Suspense } from 'react'

export default function StylesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <DesignSwitcher />
      </Suspense>
      <CopyPromptButton />
    </>
  )
}
