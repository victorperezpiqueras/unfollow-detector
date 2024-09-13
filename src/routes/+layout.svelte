<script>
	import '../app.css';
	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<svelte:head>
	<title>Unfollow Detector</title>
</svelte:head>

<Modal />
<Toast />
<slot></slot>
