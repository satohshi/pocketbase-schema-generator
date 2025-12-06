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
					cascadeDelete: false,
					collectionId: '_pb_users_auth_',
					hidden: false,
					id: 'relation3182418120',
					maxSelect: 1,
					minSelect: 0,
					name: 'author',
					presentable: false,
					required: false,
					system: false,
					type: 'relation',
				},
				{
					convertURLs: false,
					hidden: false,
					id: 'editor4274335913',
					maxSize: 0,
					name: 'content',
					presentable: false,
					required: false,
					system: false,
					type: 'editor',
				},
				{
					hidden: false,
					id: 'number1237995133',
					max: null,
					min: null,
					name: 'likes',
					onlyInt: false,
					presentable: false,
					required: false,
					system: false,
					type: 'number',
				},
			],
			id: 'pbc_1125843985',
			indexes: [],
			listRule: null,
			name: 'posts',
			system: false,
			type: 'base',
			updateRule: null,
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_1125843985')

		return app.delete(collection)
	}
)
