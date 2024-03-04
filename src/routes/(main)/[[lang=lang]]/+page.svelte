<script lang="ts">
	import type { PageData } from './$types';
	import Input from '$lib/components/ui/Input.svelte';
	import Proba from '$lib/components/Proba.svelte';
	const handleChange = (event: any) => {
		console.log(event.target.value);
	};

	export let data: PageData;
	//console.log(data);
</script>

<h1>Publikus felület főoldal</h1>
<div id="x">Hello svelte</div>
<Input id="name" on:keyup={handleChange} label="Name" />
<Proba />

<div class="bg-red-400 dark:bg-blue-400">Tailwind dark mode test</div>

<!-- <Input id="email" label="E-mail" type="email" />
<Input label="Phone" type="phone" disabled /> -->

<style scoped>
	#x {
		@apply text-red-900;
	}
</style>
