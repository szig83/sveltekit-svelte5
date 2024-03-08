<script lang="ts">
	import '$src/app.css';
	//	import type { LayoutData } from './$types';
	import { layout } from '$lib/stores/layout';
	import ThemeSwitcher from '$lib/components/ui/ThemeSwitcher.svelte';
	import TopNavBar from '$lib/components/ui/TopNavBar.svelte';
	import { getCookieValue } from '$lib/common/utils';
	import { setContext } from 'svelte';
	import { clientConfig } from '$lib/common/config';

	//export let data: LayoutData;
	setContext('cookieMaxAge', clientConfig.common.adminSite.cookieMaxAge);

	$effect.pre(() => {
		const layoutLocalStorageValue = getCookieValue('layout');
		if (layoutLocalStorageValue) {
			const layoutLocalStorage = JSON.parse(layoutLocalStorageValue);
			layout.set(layoutLocalStorage);
		}
	});
</script>

<svelte:head>
	<meta name="color-scheme" content={$layout.theme == 'system' ? 'light dark' : $layout.theme} />
	<!-- <link rel="stylesheet" href={`/css/theme/${$layout.theme}.css`} /> -->
	<link rel="stylesheet" href={`/css/color_scheme/${$layout.color}.css`} />
	<title>Valami title</title>
	<meta name="description" content="Valami description" />
</svelte:head>
<TopNavBar />
<div>{$layout.theme}</div>
<div>{$layout.size}</div>
<ThemeSwitcher />
<slot />
