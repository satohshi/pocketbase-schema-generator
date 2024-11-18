export function newLine(indent: number, str: string, newLine = 1) {
	return '    '.repeat(indent) + str + '\n'.repeat(newLine)
}

export function toPascalCase(collectionName: string) {
	return collectionName
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('')
}

export function haveSameValues(set1: Set<string>, set2: Set<string>) {
	if (set1.size !== set2.size) return false
	return [...set1].every((value) => set2.has(value))
}
