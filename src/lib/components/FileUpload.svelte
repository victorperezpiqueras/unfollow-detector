<script lang="ts">
	import { FollowersFileWrongFormatError, loadFollowersFile } from '$lib/shared/loadFollowersFile';
	import { createEventDispatcher } from 'svelte';
	import { FileButton, FileDropzone } from '@skeletonlabs/skeleton';
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

<!-- <FileButton
	name="files"
	button="btn bg-gradient-to-br variant-gradient-primary-secondary"
	on:change={handleFileChange}
>
	<i class="fa-solid fa-upload"></i>
	<span>Sube tu fichero</span>
</FileButton> -->
<FileDropzone name="files" padding="p-2 py-2">
	<svelte:fragment slot="lead"><i class="fa-solid fa-file-arrow-up text-3xl"></i></svelte:fragment>
	<svelte:fragment slot="message">Sube tu fichero</svelte:fragment>
	<svelte:fragment slot="meta">Formato ZIP</svelte:fragment>
</FileDropzone>
