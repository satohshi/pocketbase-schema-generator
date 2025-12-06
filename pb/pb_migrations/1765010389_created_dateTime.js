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
					id: 'date1135978265',
					max: '',
					min: '',
					name: 'dateTimeBase',
					presentable: false,
					required: false,
					system: false,
					type: 'date',
				},
				{
					hidden: false,
					id: 'date1940366023',
					max: '',
					min: '2025-12-01 12:00:00.000Z',
					name: 'dateTimeMin',
					presentable: false,
					required: false,
					system: false,
					type: 'date',
				},
				{
					hidden: false,
					id: 'date1336581534',
					max: '2025-12-31 12:00:00.000Z',
					min: '',
					name: 'dateTimeMax',
					presentable: false,
					required: false,
					system: false,
					type: 'date',
				},
				{
					hidden: false,
					id: 'date3790244744',
					max: '',
					min: '',
					name: 'dateTimeNonempty',
					presentable: false,
					required: true,
					system: false,
					type: 'date',
				},
				{
					hidden: true,
					id: 'date2097967122',
					max: '',
					min: '',
					name: 'dateTimeHidden',
					presentable: false,
					required: false,
					system: false,
					type: 'date',
				},
				{
					hidden: true,
					id: 'date3921989322',
					max: '2025-12-31 12:00:00.000Z',
					min: '2025-12-01 12:00:00.000Z',
					name: 'dateTimeAll',
					presentable: false,
					required: true,
					system: false,
					type: 'date',
				},
			],
			id: 'pbc_1938764269',
			indexes: [],
			listRule: null,
			name: 'dateTime',
			system: false,
			type: 'base',
			updateRule: null,
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_1938764269')

		return app.delete(collection)
	}
)
