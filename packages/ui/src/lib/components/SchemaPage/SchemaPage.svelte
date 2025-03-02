<script lang="ts">
	import { generateMap } from '$lib/utils'
	import CopyButton from './CopyButton.svelte'
	import DownloadButton from './DownloadButton.svelte'
	import Toggle from './Toggle.svelte'

	type Props = {
		filename: string
		schema: string
		html: string
	} & (
		| {
				schemaWithtoutComments?: undefined
				htmlWithtoutComments?: undefined
		  }
		| {
				schemaWithtoutComments: string
				htmlWithtoutComments: string
		  }
	)

	let { filename, schema, html, schemaWithtoutComments, htmlWithtoutComments }: Props = $props()

	let includeComments = $state(true)
	const { docsToNoDocs, noDocsToDocs } = generateMap(schema)

	function maintainScrollPosition(): void {
		const scrollContainer = document.getElementById('scroll-container')!
		const lineSpans = scrollContainer.querySelectorAll<HTMLSpanElement>('.line')
		const containerTop = scrollContainer.getBoundingClientRect().top

		for (const lineSpan of lineSpans) {
			const lineTop = lineSpan.getBoundingClientRect().top
			if (lineTop - containerTop > 0) {
				const map = (includeComments ? docsToNoDocs : noDocsToDocs)!

				let lineNumber = Number(lineSpan.getAttribute('data-line')!)
				let targetNumber = map.get(lineNumber)
				while (targetNumber === undefined) {
					targetNumber = map.get(++lineNumber)
				}

				const originLineSpan = document.querySelector<HTMLDivElement>(
					`[data-line="${lineNumber}"]`
				)!
				const offset = originLineSpan.getBoundingClientRect().top - containerTop - 21

				requestAnimationFrame(() => {
					const targetLineSpan = document.querySelector<HTMLSpanElement>(
						`[data-line="${targetNumber}"]`
					)!
					targetLineSpan.scrollIntoView({ block: 'start', behavior: 'instant' })
					scrollContainer.scrollBy({ top: -offset, behavior: 'instant' })
				})

				break
			}
		}
	}
</script>

<div class="grid max-h-full grid-rows-[auto_1fr] space-y-3">
	<div
		class={[
			'flex items-center  px-2',
			htmlWithtoutComments ? 'justify-between' : 'justify-end',
		]}
	>
		{#if htmlWithtoutComments}
			<label class="flex cursor-pointer items-center gap-2">
				<Toggle bind:checked={includeComments} oninput={maintainScrollPosition} />
				<span class="select-none">Include Docs</span>
			</label>
		{/if}

		<div class="flex items-center gap-4">
			<CopyButton schema={includeComments ? schema : schemaWithtoutComments!} />
			<DownloadButton
				schema={includeComments ? schema : schemaWithtoutComments!}
				{filename}
			/>
		</div>
	</div>

	<div
		id="scroll-container"
		style:scrollbar-width="thin"
		class="scroll-pt-5 overflow-y-scroll scroll-smooth rounded-sm border border-gray-200 text-sm *:text-wrap *:px-6 *:py-5"
	>
		{@html includeComments ? html : htmlWithtoutComments}
	</div>
</div>
