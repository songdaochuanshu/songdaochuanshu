"use client"
import Giscus from "@giscus/react"
import { giscus } from "@/lib/config"

export default function GiscusComments({ term }: { term: string }) {
  return (
    <div className="mt-12 border-t border-[var(--border-subtle)] pt-8">
      <Giscus
        repo={giscus.repo} repoId={giscus.repoId} category={giscus.category}
        categoryId={giscus.categoryId} mapping={giscus.mapping} term={term}
        reactionsEnabled={giscus.reactionsEnabled} emitMetadata={giscus.emitMetadata}
        inputPosition={giscus.inputPosition} theme={giscus.theme} lang={giscus.lang} loading={giscus.loading}
      />
    </div>
  )
}
