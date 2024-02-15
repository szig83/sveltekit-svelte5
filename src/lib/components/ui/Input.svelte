<script lang="ts">
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { beforeUpdate } from 'svelte';
	import { afterUpdate } from 'svelte';

	export let id: string = Math.random().toString(36).substring(2, 9);
	export let label: string;

	onMount(() => {
		// console.log('input component onMount');
	});

	onDestroy(() => {
		// console.log('input component onDestroy');
	});

	beforeUpdate(() => {
		// console.log('input component beforeUpdate');
	});

	afterUpdate(() => {
		// console.log('input component afterUpdate');
	});
</script>

<label for={id}>{label}</label>
<input {id} {...$$restProps} on:keyup />

<style scoped>
	label {
		@apply text-slate-700;
		font-weight: bold;
	}
	input {
		@apply border-2 border-gray-300 rounded-md;
	}
</style>
