/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = new Collection({
			createRule: null,
			deleteRule: null,
			fields: [
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'text3208210256',
					max: 0,
					min: 0,
					name: 'id',
					pattern: '^[a-z0-9]+$',
					presentable: false,
					primaryKey: true,
					required: true,
					system: true,
					type: 'text',
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: '_clone_rSdt',
					max: 255,
					min: 0,
					name: 'username',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text',
				},
				{
					hidden: false,
					id: 'number2287844090',
					max: null,
					min: null,
					name: 'posts',
					onlyInt: false,
					presentable: false,
					required: false,
					system: false,
					type: 'number',
				},
				{
					hidden: false,
					id: 'json1237995133',
					maxSize: 1,
					name: 'likes',
					presentable: false,
					required: false,
					system: false,
					type: 'json',
				},
			],
			id: 'pbc_3231763405',
			indexes: [],
			listRule: null,
			name: 'viewCollection',
			system: false,
			type: 'view',
			updateRule: null,
			viewQuery:
				'SELECT \n  users.id as id, \n  users.name as username, \n  COUNT(posts.id) as posts, \n  SUM(posts.likes) as likes \nFROM \n  users \n  LEFT JOIN posts on users.id = posts.author \nGROUP BY \n  users.id\n',
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3231763405')

		return app.delete(collection)
	}
)
