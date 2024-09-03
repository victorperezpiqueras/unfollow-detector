<script lang="ts">
	import { type User } from '$lib/shared/User';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import TutorialModal from '$lib/components/TutorialModal.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import UsersList from '$lib/components/UsersList.svelte';

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

<section class="hero is-medium is-bold">
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
</section>

<section class="hero is-small is-bold">
	<div class="hero-body">
		<div class="container has-text-centered">
			<FileUpload on:uploadComplete={handleUploadComplete} />
		</div>
		<div class="button-row"></div>
	</div>
</section>

{#if followers != null && following != null}
	<section class="m-6" data-testid="users-list">
		<UsersList {followers} {following} />
	</section>
{/if}
<TutorialModal {showModal} onClose={handleCloseModal} />

<Footer />
