"use client"

import { useEffect, useState } from "react"
import { Spinner } from "@/components/layout/loading"
import { loadLocalState, saveLocalState } from "@/components/editor/save"
import { SnippetState } from "@/components/editor/model"
import { CodeEditor } from "@/components/editor/code-editor"

const initialState: SnippetState = {
  props: {
    width: 750,
  },
  content: {
    code: "// Your code here",
    file: "main.ts",
    language: "typescript",
    theme: "github-dark-dimmed",
  },
}

export const EditorSetup = () => {
  const [savedState, setSavedState] = useState<SnippetState>()

  useEffect(() => {
    try {
      const localState = loadLocalState()
      if (localState !== null) {
        setSavedState(localState)
        return
      }
    } catch (e) {
      console.warn(`failed to load locally saved state`, e)
    }
    setSavedState(initialState)
  }, [setSavedState])

  const onStateChanged = (state: SnippetState) => {
    try {
      saveLocalState(state)
    } catch (e) {
      console.error("failed to locally save file", e)
    }
  }

  if (savedState === undefined) {
    return <Spinner />
  }
  return (
    <div>
      <CodeEditor {...savedState.content} />
    </div>
  )
}
