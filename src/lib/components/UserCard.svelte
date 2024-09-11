<script lang="ts">
	export let user: {
		href: string;
		value: string;
	};

	const isMobile = typeof window !== 'undefined' && window.matchMedia('(width <= 640px)').matches;
	const finalHref = isMobile ? `instagram://user?username=${user.value}` : user.href;
</script>

<a href={finalHref} target="_blank" rel="noopener noreferrer">
	<div class="card card-hover mb-3 w-full">
		<div class="p-3 flex gap-3 justify-start items-center">
			<i class="fab fa-instagram ig-icon text-xl"></i>
			<span class="truncate">@{user.value}</span>
		</div>
	</div>
</a>

<style>
	.ig-icon {
		color: #ff5aa7;
	}
</style>
