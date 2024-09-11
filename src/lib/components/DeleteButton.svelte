<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('delete');
	}
</script>

<button type="button" class="btn btn-sm variant-filled-error" on:click={handleClick}>
	<span class="fa-solid fa-trash-can text-xl"></span>
	<span>Borrar</span>
</button>
