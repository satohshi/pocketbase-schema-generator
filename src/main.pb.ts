onBootstrap((e) => {
	e.next()
	require(`${__hooks}/generate-schema.js`).default()
})

onCollectionCreateRequest((e) => {
	e.next()
	require(`${__hooks}/generate-schema.js`).default()
})

onCollectionUpdateRequest((e) => {
	e.next()
	require(`${__hooks}/generate-schema.js`).default()
})

onCollectionDeleteRequest((e) => {
	e.next()
	require(`${__hooks}/generate-schema.js`).default()
})
