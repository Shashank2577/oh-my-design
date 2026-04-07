import { CopyPromptButton } from '@/components/CopyPromptButton'

export default function StylesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <CopyPromptButton />
    </>
  )
}
