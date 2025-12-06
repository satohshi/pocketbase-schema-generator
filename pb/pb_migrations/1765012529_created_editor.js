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
					convertURLs: false,
					hidden: false,
					id: 'editor960149537',
					maxSize: 0,
					name: 'editorBase',
					presentable: false,
					required: false,
					system: false,
					type: 'editor',
				},
				{
					convertURLs: false,
					hidden: false,
					id: 'editor3485770541',
					maxSize: 0,
					name: 'editorNonempty',
					presentable: false,
					required: true,
					system: false,
					type: 'editor',
				},
				{
					convertURLs: false,
					hidden: false,
					id: 'editor3885742995',
					maxSize: 0,
					name: 'editorHidden',
					presentable: false,
					required: false,
					system: false,
					type: 'editor',
				},
				{
					convertURLs: false,
					hidden: false,
					id: 'editor3162615935',
					maxSize: 100,
					name: 'editorMax100',
					presentable: false,
					required: false,
					system: false,
					type: 'editor',
				},
				{
					convertURLs: false,
					hidden: true,
					id: 'editor209804865',
					maxSize: 100,
					name: 'editorAll',
					presentable: false,
					required: true,
					system: false,
					type: 'editor',
				},
			],
			id: 'pbc_4225928436',
			indexes: [],
			listRule: null,
			name: 'editor',
			system: false,
			type: 'base',
			updateRule: null,
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_4225928436')

		return app.delete(collection)
	}
)
