<script lang="ts">
	import TypeScriptIcon from '$lib/components/Sidebar/icons/TypeScriptIcon.svelte'
	import ZodIcon from '$lib/components/Sidebar/icons/ZodIcon.svelte'

	interface Props {
		mode: 'ts' | 'zod'
		anchorIds: string[]
		showLogOut: boolean
	}

	let { mode = $bindable(), anchorIds, showLogOut }: Props = $props()
</script>

{#snippet schemaTypeListItem(buttonType: Props['mode'])}
	{@const selected = mode === buttonType}
	{@const textContent = buttonType === 'ts' ? 'pocketbase-ts' : 'Zod'}
	<li class:bg-gray-200={selected} class="group rounded-sm transition-colors hover:bg-gray-200">
		<button
			onclick={() => (mode = buttonType)}
			class="flex w-full cursor-pointer items-center gap-2 px-3 py-2"
		>
			{#if buttonType === 'ts'}
				<TypeScriptIcon />
			{:else}
				<ZodIcon />
			{/if}
			<span
				class={['group-hover:text-gray-950', selected ? 'text-gray-950' : 'text-gray-600']}
				>{textContent}</span
			>
		</button>
	</li>
{/snippet}

<nav class="flex w-64 flex-col justify-between border-r border-gray-200 bg-white p-4">
	<div class="flex flex-col gap-4">
		<ul class="space-y-2">
			{@render schemaTypeListItem('ts')}
			{@render schemaTypeListItem('zod')}
		</ul>

		<div class="h-px w-full bg-gray-200"></div>

		<ul class="space-y-1.5">
			{#each anchorIds as id (id)}
				<li class="flex before:px-1.5 before:content-['-']">
					<button
						onclick={function scrollAndHighlight(e) {
							e.preventDefault()

							const line = document.getElementById(id)!
							const scrollContainer =
								document.querySelector<HTMLDivElement>('#scroll-container')!

							let timeout: ReturnType<typeof setTimeout>
							const abortController = new AbortController()
							const timeoutCallback = () => {
								abortController.abort()
								line.classList.add('bg-gray-200')
								setTimeout(() => line.classList.remove('bg-gray-200'), 500)
							}

							scrollContainer.addEventListener(
								'scroll',
								() => {
									clearTimeout(timeout)
									timeout = setTimeout(timeoutCallback, 50)
								},
								{ signal: abortController.signal }
							)
							line.scrollIntoView()

							timeout = setTimeout(timeoutCallback, 50)
						}}
						class="cursor-pointer truncate text-start text-sm text-gray-600 hover:text-gray-900"
					>
						{id}
					</button>
				</li>
			{/each}
		</ul>
	</div>

	{#if showLogOut}
		<div class="border-t border-gray-200 pt-2">
			<button
				onclick={async () => {
					await fetch('/logout')
					window.location.reload()
				}}
				class="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-gray-600 transition-all hover:bg-gray-200 hover:text-gray-950"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-5 fill-current"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
					/>
					<path
						fill-rule="evenodd"
						d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
					/>
				</svg>
				Log Out
			</button>
		</div>
	{/if}
</nav>
