<script lang="ts">
	export let user: {
		href: string;
		value: string;
	};

	const isMobile = typeof window !== 'undefined' && window.matchMedia('(width <= 640px)').matches;
	const finalHref = isMobile ? `instagram://user?username=${user.value}` : user.href;
</script>

<a href={finalHref} target="_blank" rel="noopener noreferrer">
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
