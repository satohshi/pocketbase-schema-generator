import type { ShikiTransformer } from '@shikijs/types'

interface TextNode {
	type: 'text'
	value: string
}

interface ElementNode {
	type: 'element'
	tagName: 'span'
	properties: Record<string, string>
	children: [TextNode, ...TextNode[]]
}

interface LineNode {
	type: 'element'
	tagName: 'span'
	properties: Record<string, string>
	children: ElementNode[]
}

// add id to line span so we can scroll to it using anchor tag
export const addIdToLine: NonNullable<ShikiTransformer['line']> = (node, lineNumber) => {
	const lineNode = node as LineNode

	const firstToken = lineNode.children[0]
	const firstTokenTextValue = firstToken?.children[0].value

	node.properties = {
		...node.properties,
		'data-line': lineNumber - 1, // convert to 0-based index
		class: node.properties.class + ' duration-500', // for highlight animation
	}

	if (firstTokenTextValue === 'export') {
		const nameToken = lineNode.children[2]!
		const id = nameToken.children[0].value.trim()

		node.properties = { ...node.properties, id }
	}
}
