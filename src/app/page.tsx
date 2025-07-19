import { Suspense } from "react"
import { Spinner } from "@/components/layout/loading"
import { EditorSetup } from "@/components/editor/editor-setup"
import { appName } from "@/lib/config"

export default function HomePage() {
  return (
    <>
      <h1>{appName}</h1>
      <Suspense fallback={<Spinner />}>
        <EditorSetup />
      </Suspense>
    </>
  )
}
