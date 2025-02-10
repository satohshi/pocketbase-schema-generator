import config from '../config.json'
import { generateSchema } from './generate-schema.js'

export function renderSchema(e: core.RequestEvent, showLogOut: boolean) {
	const schema = generateSchema()
	const html = $template.loadFiles(`${__hooks}/views/schema.html`).render({ schema, showLogOut })
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
	const pathname = config.endpointPath
	const html = $template.loadFiles(`${__hooks}/views/logged-out.html`).render(pathname)
	return e.html(401, html)
}
