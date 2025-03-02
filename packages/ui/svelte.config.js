import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const outDirIndex = process.argv.indexOf('--outDir')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			// use --outDir if provided, otherwise use 'build'
			pages: outDirIndex > -1 ? process.argv[outDirIndex + 1] : 'build',
		}),

		output: {
			bundleStrategy: 'inline',
		},

		prerender: {
			handleHttpError: 'warn',
		},
	},
}

export default config
