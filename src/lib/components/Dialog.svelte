<script lang="ts">
	import { on } from 'events';

	// let { children } = $props();
	let { children, isOpen, onClose, onShow } = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (isOpen) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	});

	const handler = (e) => {
		if (e.key === 'Escape' && isOpen) {
			isOpen = false;
			() => onClose();
		}
	};
</script>

<svelte:document onkeyup={handler} />

<dialog bind:this={dialog}>
	<div>
		{@render children()}
		<button
			onclick={() => {
				dialogState = false;
			}}>Close</button
		>
	</div>
</dialog>

<style>
	dialog {
		border: none;
		padding: 2rem 4rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}

	dialog > div {
		display: flex;
		flex-direction: column;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
