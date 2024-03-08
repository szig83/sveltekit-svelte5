<script lang="ts">
	import '$src/app.css';
	import Header from 'admin-ui/Header.svelte';
</script>

<div class="container">
	<Header />
	<aside>
		<ul>
			<li>Menüpont 1</li>
			<li>Menüpont 2</li>
			<li>Menüpont 3</li>
		</ul>
	</aside>
	<main>
		<slot />
	</main>
</div>

<style>
	.container {
		display: grid;
		height: 100vh;
		grid-template-columns: 1fr 5fr;
		grid-template-rows: auto 1fr;
		grid-template-areas:
			'header header'
			'sidebar main';
		gap: 0.5rem;
	}
</style>
