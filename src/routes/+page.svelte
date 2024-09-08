<script lang="ts">
	import { type User } from '$lib/shared/User';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import TutorialModal from '$lib/components/TutorialModal.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import UsersList from '$lib/components/UsersList.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import TutorialModalButton from '$lib/components/TutorialModalButton.svelte';
	/* MODAL LOGIC */
	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};
	const handleCloseModal = () => {
		showModal = false;
	};

	/* UPLOAD FILE LOGIC */
	let followers: User[];
	let following: User[];
	function handleUploadComplete(event: CustomEvent<{ followers: User[]; following: User[] }>) {
		followers = event.detail.followers;
		following = event.detail.following;
	}
</script>

<!-- <section class="hero is-medium is-bold">
	<div class="hero-body">
		<div class="container has-text-centered">
			<h1 class="title">
				<button
					class="button is-primary mr-4"
					on:click={toggleModal}
					data-target="modal-tutorial"
					style="border-radius: 50%; width:40px;height:40px;"
				>
					<span class="has-text-white is-size-4"><i class="fa-solid fa-circle-question"></i></span>
				</button>Unfollow Detector
			</h1>
			<h4 class="text">Encuentra quién no te sigue, sin dar tu cuenta a nadie.</h4>
		</div>
	</div>
</section> -->

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<TutorialModalButton />
	</svelte:fragment>
	<h1 class="h1">Unfollow Detector</h1>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>

<div class="flex flex-col justify-start items-center h-screen p-4 gap-4">
	<h4 class="h4">Encuentra quién no te sigue, sin dar tu cuenta a nadie.</h4>

	<FileUpload on:uploadComplete={handleUploadComplete} />

	{#if followers != null && following != null}
		<div class="w-4/5" data-testid="users-list">
			<UsersList {followers} {following} />
		</div>
	{/if}
</div>

<!-- <section class="hero is-small is-bold">
	<div class="hero-body">
		<div class="container has-text-centered">
			<FileUpload on:uploadComplete={handleUploadComplete} />
		</div>
		<div class="button-row"></div>
	</div>
</section> -->

<!-- <TutorialModal onClose={handleCloseModal} />
 -->
<!-- <Footer /> -->
