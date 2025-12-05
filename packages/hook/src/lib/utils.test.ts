import { describe, it } from 'vitest'
import {
	toPascalCase,
	toCamelCase,
	haveSameValues,
	format,
	generateMDTable,
	extractFilename,
} from './utils'

describe('toPascalCase', () => {
	it('should convert snake_case to PascalCase', ({ expect }) => {
		expect(toPascalCase('example_name')).toBe('ExampleName')
		expect(toPascalCase('another_example_name')).toBe('AnotherExampleName')
	})

	it('should handle single word input', ({ expect }) => {
		expect(toPascalCase('example')).toBe('Example')
	})

	it('should handle empty string input', ({ expect }) => {
		expect(toPascalCase('')).toBe('')
	})

	it('should handle input with multiple underscores', ({ expect }) => {
		expect(toPascalCase('example__name')).toBe('ExampleName')
		expect(toPascalCase('__example_name')).toBe('ExampleName')
		expect(toPascalCase('example_name__')).toBe('ExampleName')
	})

	it('should handle input with no underscores', ({ expect }) => {
		expect(toPascalCase('examplename')).toBe('Examplename')
	})
})

describe('haveSameValues', () => {
	it('should return true for sets with the same values', ({ expect }) => {
		const set1 = new Set(['a', 'b', 'c'])
		const set2 = new Set(['c', 'b', 'a'])
		expect(haveSameValues(set1, set2)).toBe(true)
	})

	it('should return false for sets with different values', ({ expect }) => {
		const set1 = new Set(['a', 'b', 'c'])
		const set2 = new Set(['a', 'b', 'd'])
		expect(haveSameValues(set1, set2)).toBe(false)
	})

	it('should return false for sets with different sizes', ({ expect }) => {
		const set1 = new Set(['a', 'b', 'c'])
		const set2 = new Set(['a', 'b'])
		expect(haveSameValues(set1, set2)).toBe(false)
	})

	it('should return true for two empty sets', ({ expect }) => {
		const set1 = new Set<string>()
		const set2 = new Set<string>()
		expect(haveSameValues(set1, set2)).toBe(true)
	})

	it('should return false for one empty set and one non-empty set', ({ expect }) => {
		const set1 = new Set<string>()
		const set2 = new Set(['a'])
		expect(haveSameValues(set1, set2)).toBe(false)
	})
})

describe('format', () => {
	it('should format a simple schema correctly', ({ expect }) => {
		const input = '{\nkey: value\n}'
		const expectedOutput = `{
    key: value
}
`
		expect(format(input)).toBe(expectedOutput)
	})

	it('should handle nested objects correctly', ({ expect }) => {
		const input = '{\nkey: value\nnested: {\nkey: value\n}\n}'
		const expectedOutput = `{
    key: value
    nested: {
        key: value
    }
}
`
		expect(format(input)).toBe(expectedOutput)
	})

	it('should handle multiple nested objects correctly', ({ expect }) => {
		const input = '{\nkey: value\nnested1: {\nkey: value\nnested2: {\nkey: value\n}\n}\n}'
		const expectedOutput = `{
    key: value
    nested1: {
        key: value
        nested2: {
            key: value
        }
    }
}
`
		expect(format(input)).toBe(expectedOutput)
	})

	it('should handle empty input', ({ expect }) => {
		const input = ``
		const expectedOutput = ``
		expect(format(input)).toBe(expectedOutput)
	})

	it('should handle cases where "{" is on the same line as "}"', ({ expect }) => {
		const input = `{\nkey: { key: value }\n}`
		const expectedOutput = `{
    key: { key: value }
}
`
		expect(format(input)).toBe(expectedOutput)
	})
})

describe('generateMDTable', () => {
	it('should generate an empty table for empty input', ({ expect }) => {
		expect(generateMDTable([])).toBe('')
	})

	it('should generate a table with one row', ({ expect }) => {
		const rows: [string, string][] = [['key', 'value']]
		const expectedOutput = `/**\n * |     |         |\n * | --- | ------- |\n * | key | \`value\` |\n */`
		expect(generateMDTable(rows)).toBe(expectedOutput)
	})

	it('should generate a table with multiple rows', ({ expect }) => {
		const rows: [string, string][] = [
			['key1', 'value1'],
			['key2', 'value2'],
		]
		const expectedOutput = `/**\n * |      |          |\n * | ---- | -------- |\n * | key1 | \`value1\` |\n * | key2 | \`value2\` |\n */`
		expect(generateMDTable(rows)).toBe(expectedOutput)
	})

	it('should handle rows with different lengths', ({ expect }) => {
		const rows: [string, string][] = [
			['short', 'longvalue'],
			['longkey', 'short'],
		]
		const expectedOutput = `/**\n * |         |             |\n * | ------- | ----------- |\n * | short   | \`longvalue\` |\n * | longkey | \`short\`     |\n */`
		expect(generateMDTable(rows)).toBe(expectedOutput)
	})
})

describe('toCamelCase', () => {
	it('should convert snake_case to camelCase', ({ expect }) => {
		expect(toCamelCase('example_name')).toBe('exampleName')
		expect(toCamelCase('another_example_name')).toBe('anotherExampleName')
	})

	it('should handle single word input', ({ expect }) => {
		expect(toCamelCase('example')).toBe('example')
	})

	it('should handle empty string input', ({ expect }) => {
		expect(toCamelCase('')).toBe('')
	})

	it('should handle input with multiple underscores', ({ expect }) => {
		expect(toCamelCase('example__name')).toBe('exampleName')
		expect(toCamelCase('__example_name')).toBe('exampleName')
		expect(toCamelCase('example_name__')).toBe('exampleName')
	})

	it('should handle input with no underscores', ({ expect }) => {
		expect(toCamelCase('examplename')).toBe('examplename')
	})

	it('should handle single character input', ({ expect }) => {
		expect(toCamelCase('a')).toBe('a')
	})

	it('should handle input starting with underscore', ({ expect }) => {
		expect(toCamelCase('_example')).toBe('example')
	})
})

describe('extractFilename', () => {
	it('should extract filename from Windows path', ({ expect }) => {
		expect(extractFilename('C:\\Users\\test\\file.ts')).toBe('file.ts')
		expect(extractFilename('C:\\path\\to\\schema.ts')).toBe('schema.ts')
	})

	it('should extract filename from Unix path', ({ expect }) => {
		expect(extractFilename('/home/user/file.ts')).toBe('file.ts')
		expect(extractFilename('/path/to/schema.ts')).toBe('schema.ts')
	})

	it('should return filename when no path separators', ({ expect }) => {
		expect(extractFilename('file.ts')).toBe('file.ts')
		expect(extractFilename('schema.ts')).toBe('schema.ts')
	})

	it('should handle relative paths', ({ expect }) => {
		expect(extractFilename('./file.ts')).toBe('file.ts')
		expect(extractFilename('../schema.ts')).toBe('schema.ts')
		expect(extractFilename('../../generated/schema.ts')).toBe('schema.ts')
	})

	it('should handle paths with mixed separators', ({ expect }) => {
		expect(extractFilename('C:/Users/test/file.ts')).toBe('file.ts')
		expect(extractFilename('\\path/to\\file.ts')).toBe('file.ts')
	})
})
