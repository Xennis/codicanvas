import { SnippetState, snippetStateSchema } from "@/components/editor/model"

const key = "codicanvas.save"

export const loadLocalState = (): SnippetState | null => {
  const value = localStorage.getItem(key)
  if (!value) {
    return null
  }
  return snippetStateSchema.parse(value)
}

export const saveLocalState = (editor: SnippetState) => {
  localStorage.setItem(key, JSON.stringify(editor))
}
