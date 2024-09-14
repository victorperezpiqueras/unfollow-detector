<script>
	import '../app.css';
	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<svelte:head>
	<title>Unfollower Finder</title>
</svelte:head>

<Modal />
<Toast />
<slot></slot>
