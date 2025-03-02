import type {
	DynamicImportLanguageRegistration,
	DynamicImportThemeRegistration,
	HighlighterGeneric,
} from '@shikijs/types'
import { createSingletonShorthands, createdBundledHighlighter } from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'

type BundledLanguage = 'typescript'
type BundledTheme = 'github-light'
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const bundledLanguages = {
	typescript: () => import('@shikijs/langs/typescript'),
} as Record<BundledLanguage, DynamicImportLanguageRegistration>

const bundledThemes = {
	'github-light': () => import('@shikijs/themes/github-light'),
} as Record<BundledTheme, DynamicImportThemeRegistration>

const createHighlighter = /* @__PURE__ */ createdBundledHighlighter<BundledLanguage, BundledTheme>({
	langs: bundledLanguages,
	themes: bundledThemes,
	engine: () => createJavaScriptRegexEngine(),
})

const { codeToHtml } = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(
	createHighlighter
)

export { bundledLanguages, bundledThemes, codeToHtml }
export type { BundledLanguage, BundledTheme, Highlighter }
