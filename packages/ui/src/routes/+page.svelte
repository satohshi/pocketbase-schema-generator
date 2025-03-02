<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte'
	import SchemaPage from '$lib/components/SchemaPage/SchemaPage.svelte'

	let { data } = $props()

	let mode = $state<'ts' | 'zod'>('ts')
</script>

<svelte:head>
	<title>{mode === 'ts' ? 'pocketbase-ts' : 'Zod'} Schema</title>
</svelte:head>

<div class="grid min-h-screen grid-cols-[auto_1fr]">
	<Sidebar
		bind:mode
		anchorIds={mode === 'ts' ? data.tsAnchorIds : data.zodAnchorIds}
		showLogOut={data.showLogOut}
	/>

	<main class="max-h-screen bg-gray-50 px-6 py-4">
		{#if mode === 'ts'}
			<SchemaPage
				filename={data.tsFilename}
				schema={data.tsSchema}
				html={data.tsHtml}
				schemaWithtoutComments={data.tsSchemaWithoutComments}
				htmlWithtoutComments={data.tsHtmlWithoutComments}
			/>
		{:else}
			<SchemaPage filename={data.zodFilename} schema={data.zodSchema} html={data.zodHtml} />
		{/if}
	</main>
</div>
