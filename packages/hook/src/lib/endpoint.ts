import config from '../config.json'
import { extractFilename } from './utils'
import { generateTsSchema } from './pb-ts/generate-ts-schema.js'
import { generateZodSchema } from './zod/generate-zod-schema'

export function renderSchema(e: core.RequestEvent, showLogOut: boolean) {
	const tsSchema = generateTsSchema()
	const tsFilename = config.tsSchema.outputPath
		? extractFilename(config.tsSchema.outputPath)
		: 'tsSchema.ts'

	const zodSchema = generateZodSchema()
	const zodFilename = config.zodSchema.outputPath
		? extractFilename(config.zodSchema.outputPath)
		: 'zodSchema.ts'

	const html = $template.loadFiles(`${__hooks}/views/index.html`).render({
		tsSchema,
		tsFilename,
		zodSchema,
		zodFilename,
		showLogOut,
	})

	return e.html(200, html)
}

export function secureEndpointHandler(e: core.RequestEvent): void {
	const [email, password, ok] = e.request?.basicAuth() ?? ['', '', false]

	if (ok) {
		try {
			const authRecord = $app.findAuthRecordByEmail('_superusers', email)
			if (authRecord.validatePassword(password)) {
				return renderSchema(e, true)
			}
		} catch (e) {
			console.error(e)
		}
	}

	e.response.header().set('WWW-Authenticate', 'Basic')

	return e.string(401, 'Unauthorized')
}

export function logout(e: core.RequestEvent): void {
	return e.string(401, '')
}
