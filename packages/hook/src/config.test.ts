import Ajv from 'ajv'
import { describe, it } from 'vitest'
import schemaJson from './schema.json'

const { $schema, ...schema } = schemaJson

const ajv = new Ajv()
const validate = ajv.compile(schema)

describe('config schema', () => {
	it("shouldn't require `endpointPath` and `secureEndpoint` when `exposeEndpoint` is set to `false`", ({
		expect,
	}) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it("shouldn't error when `endpointPath`, `secureEndpoint`, and `exposeEndpoint` are all defined", ({
		expect,
	}) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/schema',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should require `endpointPath` when `exposeEndpoint` is set to `true`', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should require `secureEndpoint` when `exposeEndpoint` is set to `true`', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/schema',

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should accept valid `endpointPath` with single segment', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/schema',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept valid `endpointPath` with multiple segments', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/schema',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept valid `endpointPath` with hyphens', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/schema-v1',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept valid `endpointPath` with underscores', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/schema_v2',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept valid `endpointPath` with numbers', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/v1/schema',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept valid `endpointPath` with single character', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/a',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should reject `endpointPath` without leading slash', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: 'schema',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should reject `endpointPath` with spaces', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/schema v1',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should accept `endpointPath` with dots', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/schema.json',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept `endpointPath` with dots in multiple segments', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/v1.0/schema.json',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should reject `endpointPath` with only a slash', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should accept valid `endpointPath` with complex nested path', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/v1/schema-generator/test-endpoint',
			secureEndpoint: true,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it("shouldn't require `outputPath` when `generateFile` is set to `false`", ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
				includeSystemCollections: false,
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should require `outputPath` when `generateFile` is set to `true` for tsSchema', ({
		expect,
	}) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should require `outputPath` when `generateFile` is set to `true` for zodSchema', ({
		expect,
	}) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
				includeSystemCollections: false,
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should require `tsSchema`', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should require `zodSchema`', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should require `includeSystemCollections` in tsSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should require `includeSystemCollections` in zodSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
				includeSystemCollections: false,
			},

			zodSchema: {
				generateFile: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should require `includeDocs` in tsSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should accept optional `banner` field in tsSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				banner: ['// Custom banner', '// Another line'],
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept optional `banner` field in zodSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
				includeSystemCollections: false,
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
				banner: ['// Custom banner'],
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept optional `overrides` field in tsSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				overrides: {
					users: {
						metadata: 'Record<string, string>',
					},
				},
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept optional `overrides` field in zodSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
				includeSystemCollections: false,
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
				overrides: {
					posts: {
						tags: 'string[]',
						settings: 'Record<string, unknown>',
					},
				},
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should accept optional `outputPath` when `generateFile` is `false`', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should reject empty `outputPath` string', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: '',
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should reject empty `banner` array', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				banner: [],
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should reject empty `overrides` object', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				overrides: {},
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should accept valid config with all optional fields', ({ expect }) => {
		const config = {
			exposeEndpoint: true,
			endpointPath: '/api/schema',
			secureEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: true,
				outputPath: './generated/tsSchema.ts',
				banner: ['// Auto-generated file', '// Do not edit manually'],
				overrides: {
					users: {
						metadata: 'Record<string, string>',
						preferences: 'UserPreferences',
					},
					posts: {
						tags: 'string[]',
					},
				},
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './generated/zodSchema.ts',
				banner: ['// Zod schema'],
				overrides: {
					users: {
						metadata: 'z.record(z.string())',
					},
				},
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should reject empty string values in `overrides` for tsSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				overrides: {
					users: {
						metadata: '',
					},
				},
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should reject empty string values in `overrides` for zodSchema', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: false,
				includeDocs: true,
				includeSystemCollections: false,
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
				overrides: {
					posts: {
						tags: '',
					},
				},
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should reject empty string values in nested `overrides` collections', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				overrides: {
					users: {
						metadata: 'Record<string, string>',
						preferences: '',
					},
					posts: {
						tags: 'string[]',
					},
				},
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should accept single character string values in `overrides`', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				overrides: {
					users: {
						metadata: 'X',
					},
				},
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})

	it('should reject empty string values when multiple collections are defined', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				overrides: {
					users: {
						metadata: 'Record<string, string>',
					},
					posts: {
						tags: '',
						settings: 'Record<string, unknown>',
					},
				},
			},

			zodSchema: {
				generateFile: false,
				includeSystemCollections: false,
			},
		}

		const valid = validate(config)
		expect(valid).toBe(false)
	})

	it('should accept valid overrides with complex type strings', ({ expect }) => {
		const config = {
			exposeEndpoint: false,

			tsSchema: {
				generateFile: true,
				includeDocs: true,
				includeSystemCollections: false,
				outputPath: './tsSchema.ts',
				overrides: {
					users: {
						metadata: 'Record<string, { id: string; name: string }>',
						preferences: 'UserPreferences',
					},
					posts: {
						tags: 'string[]',
						metadata: 'Record<string, unknown>',
					},
				},
			},

			zodSchema: {
				generateFile: true,
				includeSystemCollections: false,
				outputPath: './zodSchema.ts',
				overrides: {
					users: {
						metadata: 'z.record(z.object({ id: z.string(), name: z.string() }))',
					},
				},
			},
		}

		const valid = validate(config)
		expect(valid).toBe(true)
	})
})
