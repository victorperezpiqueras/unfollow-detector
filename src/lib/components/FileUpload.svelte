<script lang="ts">
	import { FollowersFileWrongFormatError, loadFollowersFile } from '$lib/shared/loadFollowersFile';
	import { createEventDispatcher } from 'svelte';
	import { FileButton } from '@skeletonlabs/skeleton';
	const dispatch = createEventDispatcher();

	const handleFileChange = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		const file = input?.files?.[0];
		try {
			const { followers, following } = await loadFollowersFile(file);
			dispatch('uploadComplete', { followers, following });
		} catch (error) {
			if (error instanceof FollowersFileWrongFormatError)
				alert('El fichero no tiene el formato correcto. Revisa su estructura.');
		}
	};
</script>

<FileButton
	name="files"
	button="btn bg-gradient-to-br variant-gradient-primary-secondary"
	on:change={handleFileChange}
>
	<i class="fa-solid fa-upload"></i>
	<span>Sube tu fichero</span>
</FileButton>
