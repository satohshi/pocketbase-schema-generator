onAfterBootstrap(() => {
	require(`${__hooks}/generate-schema.js`).default()
})

onCollectionAfterCreateRequest(() => {
	require(`${__hooks}/generate-schema.js`).default()
})

onCollectionAfterUpdateRequest(() => {
	require(`${__hooks}/generate-schema.js`).default()
})

onCollectionAfterDeleteRequest(() => {
	require(`${__hooks}/generate-schema.js`).default()
})
