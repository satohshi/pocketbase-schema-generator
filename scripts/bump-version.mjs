import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { select, confirm } from '@inquirer/prompts'

const __dirname = dirname(fileURLToPath(import.meta.url))

const status = execSync('git status --porcelain').toString()
if (status !== '') {
	console.error('Repository is not clean. Please commit all changes before running this script.')
	process.exit(1)
}

/** @type {'patch' | 'minor' | 'major'} */
const bumpType = await select({
	message: 'Select the type of bump',
	choices: ['patch', 'minor', 'major'],
})

const jsonPath = resolve(__dirname, '../packages/hook/package.json')
const packageJson = await readFile(jsonPath, 'utf8').then(JSON.parse)

// Bump version
const [major, minor, patch] = packageJson.version.split('.')
if (bumpType === 'major') {
	packageJson.version = `${Number(major) + 1}.0.0`
} else if (bumpType === 'minor') {
	packageJson.version = `${major}.${Number(minor) + 1}.0`
} else if (bumpType === 'patch') {
	packageJson.version = `${major}.${minor}.${Number(patch) + 1}`
}

const newVersion = packageJson.version

const confirmed = await confirm({
	message: `Bump version to ${newVersion}?`,
	default: false,
})
if (!confirmed) {
	process.exit(0)
}

// Update package.json
await writeFile(jsonPath, JSON.stringify(packageJson, null, '\t') + '\n')

// Update CHANGELOG.md
const changelog = await readFile('./CHANGELOG.md', 'utf8')
const updatedChangelog = changelog.replace(/^## Unreleased$/gm, `## Unreleased\n\n## ${newVersion}`)
await writeFile('./CHANGELOG.md', updatedChangelog)

// Commit and tag
const currentBranch = execSync('git branch --show-current').toString().trim()
execSync(`git add .`)
execSync(`git commit -m "chore: bump version to ${newVersion}"`)
execSync(`git tag -a v${newVersion} -m "v${newVersion}"`)
execSync(`git push origin ${currentBranch} --tags`)
