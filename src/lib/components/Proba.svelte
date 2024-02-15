<script lang="ts">
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';

	import { layout } from '$lib/stores/layout';
	import { page } from '$app/stores';

	//console.log($page);

	$: szoveg = 'a';

	function handleClick(x: string) {
		szoveg = x;
		$layout.theme = 'dark';
	}

	onMount(() => {
		// console.log('proba component onMount');
	});

	onDestroy(() => {
		// console.log('proba component onDestroy');
	});
</script>

{szoveg}
<button on:click={() => handleClick('szoveg')}>Katt</button>
