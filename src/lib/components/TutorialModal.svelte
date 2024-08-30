<script lang="ts">
	export let showModal: boolean;
	export let onClose: () => void;

	const handleClose = () => {
		onClose();
	};
</script>

<div class={`modal ${showModal ? 'is-active' : ''}`}>
	<div class="modal-background" on:click={handleClose}></div>
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
				<button class="button is-success" on:click={handleClose}>OK</button>
			</div>
		</footer>
	</div>
</div>
