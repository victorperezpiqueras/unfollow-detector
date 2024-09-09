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

	following = Array(10).fill({ href: '', timestamp: 0, value: 'usuario2' });
	followers = Array(10).fill({ href: '', timestamp: 0, value: 'usuario' });
	function handleUploadComplete(event: CustomEvent<{ followers: User[]; following: User[] }>) {
		followers = event.detail.followers;
		following = event.detail.following;
	}
</script>

<div class="h-screen overflow-hidden">
	<AppBar
		background="bg-primary-active-token"
		gridColumns="grid-cols-3"
		slotDefault="place-self-center"
		slotTrail="place-content-end"
	>
		<svelte:fragment slot="lead">
			<TutorialModalButton />
		</svelte:fragment>
		<h1 class="h2 md:h1 font-sans whitespace-nowrap">Unfollow Detector</h1>
		<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
	</AppBar>

	<div class="flex flex-col h-full gap-4">
		<div class="flex flex-col justify-start w-100 items-center gap-4 p-4 pb-2 h-3/4 md:h-4/5">
			<h4 class="text-lg font-semibold">Encuentra quién no te sigue, sin dar tu cuenta a nadie.</h4>

			<div class="flex h-1/5 md:h-1/10 w-4/5 md:w-2/5">
				<FileUpload on:uploadComplete={handleUploadComplete} />
			</div>

			{#if followers != null && following != null}
				<div class="w-4/5 md:w-3/5 flex justify-center h-2/3 md:h-3/4">
					<UsersList {followers} {following} />
				</div>
			{/if}
		</div>
		<div class="flex h-48 md:h-24 w-full">
			<Footer />
		</div>
	</div>
</div>
