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
					id: 'autodate936789409',
					name: 'createdBase',
					onCreate: true,
					onUpdate: false,
					presentable: false,
					system: false,
					type: 'autodate',
				},
				{
					hidden: true,
					id: 'autodate521446293',
					name: 'createdHidden',
					onCreate: true,
					onUpdate: false,
					presentable: false,
					system: false,
					type: 'autodate',
				},
				{
					hidden: false,
					id: 'autodate1645973335',
					name: 'updatedBase',
					onCreate: false,
					onUpdate: true,
					presentable: false,
					system: false,
					type: 'autodate',
				},
				{
					hidden: true,
					id: 'autodate641965005',
					name: 'updatedHidden',
					onCreate: false,
					onUpdate: true,
					presentable: false,
					system: false,
					type: 'autodate',
				},
				{
					hidden: false,
					id: 'autodate3647022355',
					name: 'createUpdateBase',
					onCreate: true,
					onUpdate: true,
					presentable: false,
					system: false,
					type: 'autodate',
				},
				{
					hidden: true,
					id: 'autodate2220220480',
					name: 'createUpdateHidden',
					onCreate: true,
					onUpdate: true,
					presentable: false,
					system: false,
					type: 'autodate',
				},
			],
			id: 'pbc_658780362',
			indexes: [],
			listRule: null,
			name: 'autoDate',
			system: false,
			type: 'base',
			updateRule: null,
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_658780362')

		return app.delete(collection)
	}
)
