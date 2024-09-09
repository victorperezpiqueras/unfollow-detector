<script lang="ts">
	import { FollowersFileWrongFormatError, loadFollowersFile } from '$lib/shared/loadFollowersFile';
	import { createEventDispatcher } from 'svelte';
	import { FileDropzone, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const dispatch = createEventDispatcher();

	const toastStore = getToastStore();
	const t: ToastSettings = {
		message:
			'El fichero no tiene el formato correcto. Revisa las instrucciones en el botón de ayuda.',
		background: 'variant-filled-error',
		timeout: 6000
	};

	const handleFileChange = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		const file = input?.files?.[0];
		try {
			const { followers, following } = await loadFollowersFile(file);
			dispatch('uploadComplete', { followers, following });
		} catch (error) {
			if (error instanceof FollowersFileWrongFormatError) {
				toastStore.trigger(t);
			}
		}
	};
</script>

<FileDropzone name="files" padding="p-2 py-2" on:change={handleFileChange}>
	<svelte:fragment slot="lead"><i class="fa-solid fa-file-arrow-up text-3xl"></i></svelte:fragment>
	<svelte:fragment slot="message">Sube tu fichero</svelte:fragment>
	<svelte:fragment slot="meta">Formato ZIP</svelte:fragment>
</FileDropzone>
