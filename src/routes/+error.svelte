<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { hrefTransform } from '$lib/common/utils';
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';

	const critical = $page.status.toString().startsWith('5');

	const back = () => {
		if ($page.error?.isHistoryBack) {
			history.back();
		} else {
			goto(hrefTransform('', $page));
		}
	};
</script>

<div id="wrapper">
	<main class={dev ? 'dev' : ''}>
		<h1 class:critical>{$page.status}</h1>
		<h2>{$page.error?.message}</h2>
		{#if dev && $page.error?.stack}
			<pre class="stack">{$page.error.stack}</pre>
		{/if}
		<button class="btn-back" onclick={back}>{$page.error?.backLinkText ?? 'Vissza'}</button>
	</main>
</div>

<style>
	#wrapper {
		@apply absolute inset-0 overflow-auto flex items-center justify-center;
	}

	main {
		@apply max-w-lg;
	}

	main.dev {
		@apply max-w-5xl;
	}

	h1 {
		color: theme('colors.gray.800');
		@apply text-2xl font-bold mb-2 border-b border-solid border-[theme('colors.gray.800')];
	}

	h1.critical {
		color: theme('colors.red.600');
	}

	h2 {
		@apply text-sm font-extralight;
		color: theme('colors.gray.500');
	}

	.btn-back {
		@apply text-sm transition-colors mt-5;
		color: theme('colors.gray.500');
	}

	.btn-back:hover {
		color: theme('colors.gray.900');
	}

	/*dark mode*/
	:global(.dark) h1 {
		color: theme('colors.gray.200');
		border-bottom-color: theme('colors.gray.400');
	}

	:global(.dark) h1.critical {
		color: theme('colors.red.400');
	}

	:global(.dark) h2 {
		color: theme('colors.gray.400');
	}

	:global(.dark) .btn-back {
		color: theme('colors.gray.300');
	}

	:global(.dark) .btn-back:hover {
		color: theme('colors.gray.100');
	}

	:global(.stack) {
		margin-top: 0.5rem;
		line-height: 1.4em;
		padding: 0.8rem 1rem;
		@apply overflow-auto bg-gray-200 text-gray-800 rounded-md text-xs;
	}

	:global(.dark) :global(.stack) {
		@apply bg-gray-700 text-gray-200;
	}
</style>
