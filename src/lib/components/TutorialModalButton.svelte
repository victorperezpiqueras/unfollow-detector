<script lang="ts">
	import TutorialModal from '$lib/components/TutorialModal.svelte';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalComponent: ModalComponent = { ref: TutorialModal };

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	const modalStore = getModalStore();
</script>

<button type="button" class="btn-icon variant-filled" on:click={() => modalStore.trigger(modal)}>
	<span class="fa-solid fa-question text-2xl"></span>
</button>
