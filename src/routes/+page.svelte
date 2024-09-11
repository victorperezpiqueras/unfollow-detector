<script lang="ts">
	import { type User } from '$lib/shared/User';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import UsersList from '$lib/components/UsersList.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import TutorialModalButton from '$lib/components/TutorialModalButton.svelte';
	import DeleteButton from '$lib/components/DeleteButton.svelte';

	let followers: User[] | null = null;
	let following: User[] | null = null;

	function handleUploadComplete(event: CustomEvent<{ followers: User[]; following: User[] }>) {
		followers = event.detail.followers;
		following = event.detail.following;
	}

	function reset() {
		followers = null;
		following = null;
	}

	$: followersAvailable = followers != null && following != null;
</script>

<!-- TODO unit test buttons depending on list elements -->

<div class="h-screen overflow-hidden">
	<AppBar
		background="bg-primary-active-token"
		gridColumns="grid-cols-3"
		slotDefault="place-self-center"
		slotTrail="place-content-end"
	>
		<svelte:fragment slot="lead">
			<span class="text-3xl">🔎</span>
		</svelte:fragment>
		<h1 class="h2 md:h1 whitespace-nowrap tracking-tight font-mono font-bold">Unfollow Detector</h1>
		<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
	</AppBar>

	<div class="flex flex-col h-full gap-4">
		<div class="flex flex-col justify-start w-100 items-center gap-4 p-4 pb-2 h-3/4 md:h-4/5">
			{#if followersAvailable}
				<DeleteButton on:delete={reset} />
				<div class="w-4/5 md:w-3/5 flex flex-col justify-start items-center list-users-custom">
					<UsersList {followers} {following} />
				</div>
			{:else}
				<div class="flex flex-col card text-md p-4 w-full md:w-1/3 gap-2">
					<h4>
						<span>Descubre quién no te sigue de vuelta de forma </span>
						<span class="font-semibold">segura y rápida⚡</span>
						<br />
						<span>No necesitas ingresar tus credenciales: simple, fácil y </span>
						<span class="font-semibold">100% seguro🛡️</span>
					</h4>
					<div class="flex w-full justify-center items-center">
						<TutorialModalButton />
					</div>
				</div>

				<div class="flex h-1/5 md:h-1/10 w-4/5 md:w-2/5">
					<FileUpload on:uploadComplete={handleUploadComplete} />
				</div>
			{/if}
		</div>
		<div class="flex h-48 md:h-24 w-full">
			<Footer />
		</div>
	</div>
</div>

<style>
	.list-users-custom {
		height: 90%;
	}
</style>
