import config from './config.json'
import { writeToFile } from './lib/utils'
import { generateTsSchema } from './lib/pb-ts/generate-ts-schema'
import { generateZodSchema } from './lib/zod/generate-zod-schema'

export default function () {
	if (config.tsSchema.generateFile) {
		const tsSchema = generateTsSchema()
		writeToFile(config.tsSchema.outputPath, tsSchema)
	}

	if (config.zodSchema.generateFile) {
		const zodSchema = generateZodSchema()
		writeToFile(config.zodSchema.outputPath, zodSchema)
	}
}
