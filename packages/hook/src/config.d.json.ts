declare const config: (
	| {
			exposeEndpoint: true
			endpointPath: string
			secureEndpoint: boolean
	  }
	| {
			exposeEndpoint: false
			endpointPath?: never
			secureEndpoint?: never
	  }
) & {
	tsSchema: BaseSchemaConfig & { includeDocs: boolean }
	zodSchema: BaseSchemaConfig
}

type BaseSchemaConfig = (
	| {
			generateFile: true
			outputPath: string
	  }
	| {
			generateFile: false
			outputPath?: string
	  }
) & {
	includeSystemCollections: boolean
	banner?: string[]
	overrides?: {
		[collectionName: string]: {
			[fieldName: string]: string
		}
	}
}

declare global {
	type Config = typeof config
}

export default config
