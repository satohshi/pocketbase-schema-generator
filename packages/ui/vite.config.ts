import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import packageJson from '../hook/package.json'

export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(packageJson.version),
	},
	build: {
		assetsInlineLimit: Infinity,
	},
	plugins: [sveltekit(), tailwindcss()],
})
