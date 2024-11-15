/// <reference path="../pb/pb_data/types.d.ts" />

onAfterBootstrap(() => {
	require(`${__hooks}/generate-schema.js`).default()
})

onModelAfterCreate(() => {
	require(`${__hooks}/generate-schema.js`).default()
})

onModelAfterUpdate(() => {
	require(`${__hooks}/generate-schema.js`).default()
})

onModelAfterDelete(() => {
	require(`${__hooks}/generate-schema.js`).default()
})
