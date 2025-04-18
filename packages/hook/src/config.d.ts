interface Config {
	exposeEndpoint: boolean
	endpointPath: string
	secureEndpoint: boolean

	tsSchema: {
		generateFile: boolean
		includeDocs: boolean
		includeSystemCollections: boolean
		outputPath: string
		overrides?: {
			[collectionName: string]: {
				[fieldName: string]: string
			}
		}
	}

	zodSchema: {
		generateFile: boolean
		includeSystemCollections: boolean
		outputPath: string
		overrides?: {
			importStatements?: string[]
			[collectionName: string]: {
				[fieldName: string]: string
			}
		}
	}
}

declare module '*/config.json' {
	const config: Config
	export default config
}
