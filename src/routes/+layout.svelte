<script>
	import '../app.css';
	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Modal />
<Toast />
<slot></slot>
