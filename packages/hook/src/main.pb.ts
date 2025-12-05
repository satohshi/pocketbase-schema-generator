type Endpoint = typeof import('./lib/endpoint')

onBootstrap((e) => {
	e.next()
	require(`${__hooks}/handler.js`).default()
})

onCollectionCreateRequest((e) => {
	e.next()
	require(`${__hooks}/handler.js`).default()
})

onCollectionUpdateRequest((e) => {
	e.next()
	require(`${__hooks}/handler.js`).default()
})

onCollectionDeleteRequest((e) => {
	e.next()
	require(`${__hooks}/handler.js`).default()
})

if ((require(`${__hooks}/config.json`) as Config).exposeEndpoint) {
	routerUse($apis.gzip())

	if ((require(`${__hooks}/config.json`) as Config).secureEndpoint) {
		// auth required
		routerAdd('GET', `${(require(`${__hooks}/config.json`) as Config).endpointPath}`, (e) => {
			;(require(`${__hooks}/lib/endpoint.js`) as Endpoint).secureEndpointHandler(e)
		})
		routerAdd('GET', '/logout', (e) => {
			;(require(`${__hooks}/lib/endpoint.js`) as Endpoint).logout(e)
		})
	} else {
		// no auth required
		routerAdd('GET', `${(require(`${__hooks}/config.json`) as Config).endpointPath}`, (e) => {
			;(require(`${__hooks}/lib/endpoint.js`) as Endpoint).renderSchema(e, false)
		})
	}
}
