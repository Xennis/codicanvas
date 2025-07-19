import { z } from "zod"
import type { BundledLanguage } from "shiki"
import type { BundledTheme } from "shiki/themes"

export const snippetStateSchema = z.object({
  content: z.object({
    code: z.string(),
    file: z.string().optional(),
    language: z.string() as z.ZodType<BundledLanguage>,
    theme: z.string() as z.ZodType<BundledTheme>,
  }),
  props: z.object({
    width: z.number(),
  }),
})

export type SnippetState = z.infer<typeof snippetStateSchema>
