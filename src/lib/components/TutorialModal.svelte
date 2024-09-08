<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">Cómo usar</header>
		<article>Cómo utilizar</article>

		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Atrás</button>
			<button class="btn {parent.buttonPositive}" on:click={() => {}}>Siguiente</button>
		</footer>
	</div>
{/if}
