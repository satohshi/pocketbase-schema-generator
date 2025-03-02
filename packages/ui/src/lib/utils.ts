export function getAnchorIds(schema: string): string[] {
	return schema.match(/(?<=export \w+ )(\w+)/g) || []
}

export function removeDocs(code: string): string {
	const lines = code.split('\n')

	let newCode = ''
	for (let i = 0; i < lines.length; i++) {
		const trimmedLine = lines[i]!.trim()

		if (
			(trimmedLine.startsWith('/*') && lines[i + 1]!.includes('* |')) ||
			trimmedLine.startsWith('* |') ||
			(trimmedLine.startsWith('*/') && lines[i - 1]!.includes('* |'))
		) {
			continue
		}

		newCode += lines[i] + '\n'
	}

	return newCode
}

export function generateMap(code: string): {
	docsToNoDocs: Map<number, number>
	noDocsToDocs: Map<number, number>
} {
	const lines = code.split('\n')
	const docsToNoDocs = new Map<number, number>()
	const noDocsToDocs = new Map<number, number>()

	let lineNumberNew = 0
	for (let i = 0; i < lines.length; i++) {
		const trimmedLine = lines[i]!.trim()

		if (
			(trimmedLine.startsWith('/*') && lines[i + 1]!.includes('* |')) ||
			trimmedLine.startsWith('* |') ||
			(trimmedLine.startsWith('*/') && lines[i - 1]!.includes('* |'))
		) {
			continue
		}

		docsToNoDocs.set(i, lineNumberNew)
		noDocsToDocs.set(lineNumberNew, i)

		lineNumberNew++
	}

	return { docsToNoDocs, noDocsToDocs }
}
