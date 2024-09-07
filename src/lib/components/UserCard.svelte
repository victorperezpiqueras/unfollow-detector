<script lang="ts">
	export let user: {
		href: string;
		value: string;
	};
</script>

<a href={user.href} target="_blank" rel="noopener noreferrer">
	<div class="card mb-4">
		<header class="card-header">
			<p class="card-header-title is-size-5">
				<span class="icon mr-2 ig-icon">
					<i class="fab fa-instagram"></i>
				</span>
				<span>@{user.value}</span>
			</p>
		</header>
	</div>
</a>

<style>
	.ig-icon {
		color: #ff5aa7;
	}
</style>
