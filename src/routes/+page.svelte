<script lang="ts">
	import { type User } from '$lib/shared/User';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import UsersList from '$lib/components/UsersList.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import TutorialModalButton from '$lib/components/TutorialModalButton.svelte';

	/* UPLOAD FILE LOGIC */
	let followers: User[];
	let following: User[];
	function handleUploadComplete(event: CustomEvent<{ followers: User[]; following: User[] }>) {
		followers = event.detail.followers;
		following = event.detail.following;
	}
</script>

<div class="h-screen overflow-hidden">
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<svelte:fragment slot="lead">
			<TutorialModalButton />
		</svelte:fragment>
		<h1 class="h1">Unfollow Detector</h1>
		<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
	</AppBar>

	<div class="flex flex-col h-full gap-4">
		<div class="flex flex-col justify-start items-center gap-4 p-4 h-4/6">
			<h4 class="text-lg font-semibold">Encuentra quién no te sigue, sin dar tu cuenta a nadie.</h4>

			<FileUpload on:uploadComplete={handleUploadComplete} />

			{#if followers != null && following != null}
				<div class="w-4/5 md:w-3/5 flex-grow justify-center h-4/5">
					<UsersList {followers} {following} />
				</div>
			{/if}
		</div>
		<Footer />
	</div>
</div>
