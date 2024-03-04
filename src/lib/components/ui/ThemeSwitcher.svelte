<script lang="ts">
	import { getContext } from 'svelte';
	import { layout } from '$lib/stores/layout';

	const cookieMaxAge = <number>getContext('cookieMaxAge');

	const handleThemeChange = (theme: string) => {
		$layout.theme = theme;
		saveLayout();
	};

	const handleColorChange = (color: string) => {
		$layout.color = color;
		saveLayout();
	};

	async function saveLayout() {
		//localStorage.setItem('layout', JSON.stringify($layout));
		document.cookie = `layout=${JSON.stringify($layout)}; max-age=${cookieMaxAge}; path=/; SameSite=Lax`;
		if ($layout.theme === 'dark') {
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add('dark');
		} else if ($layout.theme === 'light') {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
		} else {
			document.documentElement.classList.remove('dark', 'light');
		}
	}
</script>

<nav class="p-3 m-3 flex gap-2 bg-slate-400 rounded-md">
	<button on:click={() => handleThemeChange('light')}>Light</button>
	<button on:click={() => handleThemeChange('dark')}>Dark</button>
	<button on:click={() => handleThemeChange('system')}>System</button>
	<button on:click={() => handleColorChange('default')}>Default color</button>
	<button on:click={() => handleColorChange('green')}>Green color</button>
</nav>
