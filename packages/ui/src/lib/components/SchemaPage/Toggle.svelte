<script lang="ts">
	interface Props {
		checked: boolean
		oninput?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void
	}

	let { checked = $bindable(), oninput }: Props = $props()
</script>

<label class="toggle-label">
	<input type="checkbox" bind:checked {oninput} />
</label>

<style>
	input[type='checkbox'] {
		display: none;
	}

	.toggle-label {
		--toggle-height: 22px;
		--toggle-width: calc(var(--toggle-height) * 2);
		--transition-duration: 150ms;

		display: block;
		cursor: pointer;
		width: var(--toggle-width);
		height: var(--toggle-height);
		background: rgb(201, 208, 218);
		border-radius: calc(var(--toggle-height) * 0.5);
		position: relative;
		transition-duration: var(--transition-duration);

		&:after {
			--size: calc(var(--toggle-height) - 6px);
			--margin: calc((var(--toggle-height) - var(--size)) / 2);

			content: '';
			position: absolute;
			width: var(--size);
			height: var(--size);
			background: #ffffff;
			border-radius: 50%;
			transition-duration: var(--transition-duration);

			top: var(--margin);
			left: var(--margin);
		}
	}

	.toggle-label:has(:checked) {
		background: rgb(50, 173, 132);

		&:after {
			transform: translateX(calc(100% + var(--margin) * 2));
		}
	}
</style>
