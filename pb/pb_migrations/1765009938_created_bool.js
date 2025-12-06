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
					id: 'bool1857088803',
					name: 'boolBase',
					presentable: false,
					required: false,
					system: false,
					type: 'bool',
				},
				{
					hidden: false,
					id: 'bool2601745318',
					name: 'boolNonfalsey',
					presentable: false,
					required: true,
					system: false,
					type: 'bool',
				},
				{
					hidden: true,
					id: 'bool3467389920',
					name: 'boolHidden',
					presentable: false,
					required: false,
					system: false,
					type: 'bool',
				},
				{
					hidden: true,
					id: 'bool3999365429',
					name: 'boolAll',
					presentable: false,
					required: true,
					system: false,
					type: 'bool',
				},
			],
			id: 'pbc_1921798434',
			indexes: [],
			listRule: null,
			name: 'bool',
			system: false,
			type: 'base',
			updateRule: null,
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_1921798434')

		return app.delete(collection)
	}
)
