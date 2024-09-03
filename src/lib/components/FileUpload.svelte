<script lang="ts">
	import { FollowersFileWrongFormatError, loadFollowersFile } from '$lib/shared/loadFollowersFile';
	import { createEventDispatcher } from 'svelte';

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

<div class="file is-centered is-boxed is-link has-name" data-testid="upload-button">
	<label class="file-label">
		<input
			class="file-input"
			type="file"
			accept=".zip"
			on:change={handleFileChange}
			data-testid="file-input"
		/>
		<span class="file-cta">
			<span class="file-icon">
				<span class="has-text-white">
					<i class="fa-solid fa-upload mr-2 is-size-4"></i>
				</span>
			</span>
			<span class="file-label is-size-4 has-text-white is-family-sans-serif">
				Sube tu fichero
			</span>
		</span>
	</label>
</div>
