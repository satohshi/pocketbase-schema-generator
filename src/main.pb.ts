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

if (require(`${__hooks}/config.json`).exposeEndpoint) {
	if (require(`${__hooks}/config.json`).secureEndpoint) {
		// auth required
		routerAdd('GET', `${require(`${__hooks}/config.json`).endpointPath}`, (e) => {
			require(`${__hooks}/lib/endpoint.js`).secureEndpointHandler(e)
		})
		routerAdd('GET', '/logout', (e) => {
			require(`${__hooks}/lib/endpoint.js`).logout(e)
		})
	} else {
		// no auth required
		routerAdd('GET', `${require(`${__hooks}/config.json`).endpointPath}`, (e) => {
			require(`${__hooks}/lib/endpoint.js`).renderSchema(e, false)
		})
	}
}
