<script lang="ts">
	import {
		FollowersFileWrongFormatError,
		loadFollowersFile,
		type User
	} from '$lib/loadFollowersFile';
	import FileUpload from '$lib/components/FileUpload.svelte';
	let showModal = false;

	// Function to toggle the modal visibility
	const toggleModal = () => {
		showModal = !showModal;
	};

	let followers: User[];
	let followed: User[];

	// Event handler for the uploadComplete event
	function handleUploadComplete(event: CustomEvent<{ followers: User[]; following: User[] }>) {
		followers = event.detail.followers;
		followed = event.detail.following;
		console.log('parent', followed, followers);
	}
</script>

<!-- 
<nav class="navbar">
	<div class="container">
		<div class="navbar-brand">
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<div class="buttons">
					<a class="button is-primary">
						<span class="icon">
							<i class="fas fa-home"></i>
						</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</nav> -->

<section class="hero is-medium is-bold">
	<div class="hero-body">
		<div class="container has-text-centered">
			<h1 class="title">
				<button
					class="button is-primary mr-4"
					on:click={toggleModal}
					data-target="modal-tutorial"
					style="border-radius: 50%; width:35px;height:35px;"
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
			<!-- <button class="button is-link" on:click={handleFileChange}>
				<span class="has-text-white"><i class="fa-solid fa-upload mr-2 is-size-4"></i></span>
				<span class="is-size-4">Sube tu fichero</span>
			</button> -->
			<!-- Button to trigger file upload -->
			<!-- <button class="button is-link" on:click={triggerFileUpload}>
				<span class="has-text-white">
					<i class="fa-solid fa-upload mr-2 is-size-4"></i>
				</span>
				<span class="is-size-4">Sube tu fichero</span>
			</button> -->
			<FileUpload on:uploadComplete={handleUploadComplete} />
			<!-- <div class="file is-centered is-boxed is-success has-name">
				<label class="file-label">
					<input class="file-input" type="file" name="resume" />
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
			</div> -->

			<!-- Hidden file input -->
			<!-- <input type="file" accept=".zip" bind:this={fileInput} on:change={handleFileChange} /> -->
		</div>
		<div class="button-row"></div>
	</div>
</section>
<main class="container p-6 is-flex is-flex-direction-column">
	<!-- 	{#if showModal}
		<div class="modal is-active">
			<div class="modal-background" on:click={toggleModal}></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Modal Title</p>
					<button class="delete" aria-label="close" on:click={toggleModal}></button>
				</header>
				<section class="modal-card-body">
					<p>This is the content inside the modal.</p>
				</section>
				<footer class="modal-card-foot">
					<button class="button is-success" on:click={toggleModal}>Close</button>
				</footer>
			</div>
		</div>
	{/if} -->
</main>

<div class={`modal ${showModal ? 'is-active' : ''}`}>
	<div class="modal-background" on:click={toggleModal}></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title is-bold">Pasos a seguir</p>
		</header>
		<section class="modal-card-body">
			<div class="content">
				<h1>Hello World</h1>
				<p>
					Lorem ipsum<sup><a>[1]</a></sup> dolor sit amet, consectetur adipiscing elit. Nulla
					accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh
					eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum
					mattis neque. Sub<sub>script</sub>
					works as well!
				</p>
			</div>
		</section>
		<footer class="modal-card-foot">
			<div class="buttons">
				<button class="button is-success" on:click={toggleModal}>OK</button>
			</div>
		</footer>
	</div>
</div>

<footer class="footer">
	<div class="content has-text-centered">
		<p>
			<strong>UnfollowDetector</strong> by <a href="#">Carolina Ordoño</a> and
			<a href="#">Víctor Pérez</a>. The source code is licensed
			<a href="https://opensource.org/license/mit">MIT</a>. The website content is licensed
			<a href="https://creativecommons.org/licenses/by-nc-sa/4.0//">CC BY NC SA 4.0</a>.
		</p>
		<a href="https://github.com/unfollow-detector/unfollow-detector"
			><span class="fa-brands fa-github is-size-1"></span></a
		>
	</div>
</footer>

<style>
	/* Hide the file input */
	input[type='file'] {
		display: none;
	}
</style>
