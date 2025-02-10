if (require(`${__hooks}/config.json`).generateFile) {
	onBootstrap((e) => {
		e.next()
		require(`${__hooks}/lib/generate-schema.js`).writeSchemaToFile()
	})

	onCollectionCreateRequest((e) => {
		e.next()
		require(`${__hooks}/lib/generate-schema.js`).writeSchemaToFile()
	})

	onCollectionUpdateRequest((e) => {
		e.next()
		require(`${__hooks}/lib/generate-schema.js`).writeSchemaToFile()
	})

	onCollectionDeleteRequest((e) => {
		e.next()
		require(`${__hooks}/lib/generate-schema.js`).writeSchemaToFile()
	})
}

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
