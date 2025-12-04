declare const config: {
	exposeEndpoint: boolean
	endpointPath: string
	secureEndpoint: boolean
	tsSchema: BaseSchemaConfig & { includeDocs: boolean }
	zodSchema: BaseSchemaConfig
}

type BaseSchemaConfig = {
	generateFile: boolean
	outputPath: string
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
