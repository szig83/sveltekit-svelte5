<script lang="ts">
	import { page } from '$app/stores';
	import { hrefTransform } from '$lib/common/utils';
</script>

<nav>
	<a href="/">Home</a>
	<a href="/page1">Page1</a>
	<a href="/elso">Első</a>
	<a href={hrefTransform('proba/masodik', $page)}>Második</a>
	<a href="/proba/harmadik">Hiányzó oldal</a>
</nav>

<style>
	nav {
		@apply p-3 flex gap-2 bg-gray-900 text-gray-200 dark:bg-red-900 dark:text-gray-200;
	}
</style>
