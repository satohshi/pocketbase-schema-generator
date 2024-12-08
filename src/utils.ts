export function toPascalCase(collectionName: string): string {
	return collectionName
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('')
}

export function haveSameValues(set1: Set<string>, set2: Set<string>): boolean {
	if (set1.size !== set2.size) return false
	return [...set1].every((value) => set2.has(value))
}

export const format = (input: string): string => {
	if (!input.includes('\n')) return input

	const lines = input.split('\n')
	let indent = 0
	let output = ''
	for (const line of lines) {
		if (line.endsWith('}')) {
			indent -= 1
		}
		output += '    '.repeat(indent) + line + '\n'
		if (line.endsWith('{')) {
			indent += 1
		}
	}

	return output
}

export const generateMDTable = (rows: [string, string][]): string => {
	if (rows.length === 0) return ''

	const leftColWidth = Math.max(...rows.map(([key]) => key.length))
	const rightColWidth = Math.max(...rows.map(([_, value]) => value.length))

	const table = [
		` * | ${' '.repeat(leftColWidth)} | ${' '.repeat(rightColWidth)} |`,
		` * | ${'-'.repeat(leftColWidth)} | ${'-'.repeat(rightColWidth)} |`,
		...rows.map(
			([key, value]) =>
				` * | ${key.padEnd(leftColWidth, ' ')} | ${value.padEnd(rightColWidth, ' ')} |`
		),
	]

	return '/**\n' + table.join('\n') + '\n */'
}
