import config from './config.json'
import { writeTsSchemaToFile } from './lib/ts-schema/generate-ts-schema'
import { writeZodSchemaToFile } from './lib/zod/generate-zod-schema'

export default function () {
	if (config.tsSchema.generateFile) {
		writeTsSchemaToFile()
	}
	if (config.zodSchema.generateFile) {
		writeZodSchemaToFile()
	}
}
