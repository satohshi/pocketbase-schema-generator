<script lang="ts">
	interface Props {
		schema: string
		filename: string
	}

	let { schema, filename }: Props = $props()

	const downloadSchemaFile = () => {
		const blob = new Blob([schema], { type: 'text/plain' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = filename
		a.click()
		URL.revokeObjectURL(url)
	}
</script>

<button
	onclick={downloadSchemaFile}
	class="flex cursor-pointer items-center justify-center gap-1.5 rounded-sm border-2 border-gray-900 bg-gray-900 px-6 py-1.5 transition-all hover:border-gray-800 hover:bg-gray-800"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="size-[18px] fill-none stroke-gray-50 stroke-2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
		/>
	</svg>
	<span class="font-semibold text-white">Download</span>
</button>
