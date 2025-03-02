import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const jsonPath = resolve(__dirname, '../packages/hook/package.json')
const changelogPath = resolve(__dirname, '../CHANGELOG.md')

const changelog = await readFile(changelogPath, 'utf8')
const packageJson = await readFile(jsonPath, 'utf8').then(JSON.parse)
const version = packageJson.version

const match = new RegExp(`## ${version}\n([\\s\\S]+?)\n## `).exec(changelog)

if (match) {
	let [, notes] = match
	console.log(notes?.trim())
} else {
	console.log('')
}
