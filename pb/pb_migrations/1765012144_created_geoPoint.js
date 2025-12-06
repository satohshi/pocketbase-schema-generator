/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = new Collection({
			createRule: null,
			deleteRule: null,
			fields: [
				{
					autogeneratePattern: '[a-z0-9]{15}',
					hidden: false,
					id: 'text3208210256',
					max: 15,
					min: 15,
					name: 'id',
					pattern: '^[a-z0-9]+$',
					presentable: false,
					primaryKey: true,
					required: true,
					system: true,
					type: 'text',
				},
				{
					hidden: false,
					id: 'geoPoint1017739870',
					name: 'geoPointBase',
					presentable: false,
					required: false,
					system: false,
					type: 'geoPoint',
				},
				{
					hidden: false,
					id: 'geoPoint1152744607',
					name: 'geoPointNonempty',
					presentable: false,
					required: true,
					system: false,
					type: 'geoPoint',
				},
				{
					hidden: true,
					id: 'geoPoint978745509',
					name: 'geoPointHidden',
					presentable: false,
					required: false,
					system: false,
					type: 'geoPoint',
				},
				{
					hidden: true,
					id: 'geoPoint2668900998',
					name: 'geoPointAll',
					presentable: false,
					required: true,
					system: false,
					type: 'geoPoint',
				},
			],
			id: 'pbc_1864948514',
			indexes: [],
			listRule: null,
			name: 'geoPoint',
			system: false,
			type: 'base',
			updateRule: null,
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_1864948514')

		return app.delete(collection)
	}
)
