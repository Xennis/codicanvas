"use client"

import { BundledLanguage, bundledThemes, codeToHtml } from "shiki"
import React, { useEffect, useState } from "react"
import { BundledTheme } from "shiki/themes"
import "./code-editor.css"
import { getIconForFile } from "vscode-icons-ts"
import NextImage from "next/image"
import { fileIcon } from "@/lib/config"

type HexColor = string
type ThemeColors = {
  codeBg: HexColor
  tabBg: HexColor
  tabText: HexColor
  windowBg: HexColor
}

export const CodeEditor = ({
  code,
  language,
  theme,
  file,
}: {
  code: string
  language: BundledLanguage
  theme: BundledTheme
  file?: string
}) => {
  const [html, setHtml] = useState<string>()
  const [themeColors, setThemeColors] = useState<ThemeColors>({
    tabBg: "#22272E",
    tabText: "#FFFFFF",
    windowBg: "#404040",
    codeBg: "#22272e",
  })

  useEffect(() => {
    codeToHtml(code, {
      lang: language,
      theme: theme,
    })
      .then((html) => setHtml(html))
      .catch((error) => {
        console.warn("code to html failed", error)
      })

    bundledThemes[theme]().then((data) => {
      const colors = data.default.colors
      if (!colors) {
        return
      }
      setThemeColors({
        codeBg: colors["editor.background"],
        // See https://code.visualstudio.com/api/references/theme-color#editor-groups-tabs
        // Link to color themes of Themes can be found here: https://shiki.style/themes
        tabBg: colors["tab.activeBackground"],
        tabText: colors["foreground"],
        // Not all themes have a tabsBackground. Further on also not all have a menu background.
        windowBg: themeColorFix(colors["editorGroupHeader.tabsBackground"]) ?? colors["menu.background"] ?? "#404040",
      })
    })
  }, [code, language, theme])

  return (
    <div className="h-full w-full overflow-hidden rounded-lg" style={{ backgroundColor: themeColors?.codeBg }}>
      <div
        className="flex h-[44px] flex-row items-center gap-5 px-5"
        style={{ backgroundColor: themeColors?.windowBg }}
      >
        <div className="flex flex-row gap-1.5">
          <div className="h-3.5 w-3.5 rounded-full bg-red-400"></div>
          <div className="h-3.5 w-3.5 rounded-full bg-yellow-400"></div>
          <div className="h-3.5 w-3.5 rounded-full bg-green-400"></div>
        </div>
        <div>{file && themeColors && <FileTab file={file} themeColors={themeColors} />}</div>
      </div>
      {html && <div className="font-mono" dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  )
}

const FileTab = ({ file, themeColors }: { file: string; themeColors: ThemeColors }) => {
  const iconFilename = getIconForFile(file)

  return (
    <div className="mt-[6px] h-[38px] rounded-t-md" style={{ backgroundColor: themeColors.tabBg }}>
      <div className="flex flex-row items-center gap-2 ps-4 pe-5 pt-2 text-base text-gray-100">
        {iconFilename && (
          <NextImage
            src={fileIcon(iconFilename)}
            alt="Icon"
            width={18}
            height={18}
            style={{ height: "18px", width: "auto" }}
          />
        )}
        <span style={{ color: themeColors.tabText }}>{file}</span>
      </div>
    </div>
  )
}

const themeColorFix = (color: string | undefined) => {
  // E.g. https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-themes/themes/rose-pine.json
  // has this. This seems to cause trouble in React.
  if (color === "#0000") {
    return "#000000"
  }
  return color
}
