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
					id: 'json1795630405',
					maxSize: 0,
					name: 'json',
					presentable: false,
					required: false,
					system: false,
					type: 'json',
				},
				{
					hidden: false,
					id: 'json3680078391',
					maxSize: 100,
					name: 'jsonMaxSize',
					presentable: false,
					required: false,
					system: false,
					type: 'json',
				},
				{
					hidden: false,
					id: 'json3083811615',
					maxSize: 0,
					name: 'jsonNonempty',
					presentable: false,
					required: true,
					system: false,
					type: 'json',
				},
				{
					hidden: true,
					id: 'json1100632',
					maxSize: 0,
					name: 'jsonHidden',
					presentable: false,
					required: false,
					system: false,
					type: 'json',
				},
				{
					hidden: true,
					id: 'json59981113',
					maxSize: 100,
					name: 'jsonAll',
					presentable: false,
					required: true,
					system: false,
					type: 'json',
				},
			],
			id: 'pbc_1275740917',
			indexes: [],
			listRule: null,
			name: 'json',
			system: false,
			type: 'base',
			updateRule: null,
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_1275740917')

		return app.delete(collection)
	}
)
