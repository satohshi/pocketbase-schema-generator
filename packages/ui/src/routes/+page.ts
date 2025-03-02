import { dev } from '$app/environment'
import { codeToHtml } from '$lib/shiki.bundle'
import { addIdToLine } from '$lib/shiki.transformers'
import { removeDocs, getAnchorIds } from '$lib/utils'
import { testTsSchema, testZodSchema } from './devSchema'

const HTML_OPTIONS = {
	lang: 'typescript',
	theme: 'github-light',
	transformers: [{ line: addIdToLine }],
} satisfies Parameters<typeof codeToHtml>[1]

export const load = async () => {
	const showLogOut = dev ? 'true' : '{{ .showLogOut }}'

	const tsSchema = dev ? testTsSchema : '{{ .tsSchema }}'
	const zodSchema = dev ? testZodSchema : '{{ .zodSchema }}'

	const tsFilename = dev ? 'tsSchema.ts' : '{{ .tsFilename }}'
	const zodFilename = dev ? 'zodSchema.ts' : '{{ .zodFilename }}'

	const tsAnchorIds = getAnchorIds(tsSchema)
	const tsHtml = await codeToHtml(tsSchema, HTML_OPTIONS)

	const tsSchemaWithoutComments = removeDocs(tsSchema)
	const tsHtmlWithoutComments = await codeToHtml(tsSchemaWithoutComments, HTML_OPTIONS)

	const zodAnchorIds = getAnchorIds(zodSchema)
	const zodHtml = await codeToHtml(zodSchema, HTML_OPTIONS)

	return {
		tsAnchorIds,
		tsSchema,
		tsHtml,
		tsFilename,
		tsSchemaWithoutComments,
		tsHtmlWithoutComments,
		zodAnchorIds,
		zodSchema,
		zodHtml,
		zodFilename,
		showLogOut: showLogOut === 'true',
	}
}
