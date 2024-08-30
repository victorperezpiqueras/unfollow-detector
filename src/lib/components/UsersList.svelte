<script lang="ts">
	import type { User } from '$lib/loadFollowersFile';
	import UserCard from './UserCard.svelte';

	let activeTab = 'followingThatDontFollowYou';

	const tabs = [
		{
			id: 'followingThatDontFollowYou',
			label: 'No te siguen',
			icon: 'fas fa-thumbs-down'
		},
		{
			id: 'followersThatYouDontFollow',
			label: 'No les sigues',
			icon: 'fas fa-thumbs-up'
		}
	];

	export let followers: User[] = [];
	export let following: User[] = [];

	const followersSet = new Set(followers.map((user) => user.value));
	const followingSet = new Set(following.map((user) => user.value));

	const followersThatYouDontFollow = followers.filter((user) => !followingSet.has(user.value));
	const followingThatDontFollowYou = following.filter((user) => !followersSet.has(user.value));

	const setActiveTab = (tabId: string) => {
		activeTab = tabId;
	};
</script>

<div class="tabs is-toggle is-fullwidth">
	<ul>
		{#each tabs as { id, label, icon }}
			<li class={activeTab === id ? 'is-active' : ''}>
				<a on:click={() => setActiveTab(id)}>
					<span class="icon is-small">
						<i class={icon} aria-hidden="true"></i>
					</span>
					<span>{label}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<div class="card-container">
	{#if activeTab === 'followingThatDontFollowYou'}
		{#each followingThatDontFollowYou as user}
			<UserCard {user} />
		{/each}
	{:else if activeTab === 'followersThatYouDontFollow'}
		{#each followersThatYouDontFollow as user}
			<UserCard {user} />
		{/each}
	{/if}
</div>

<style>
	.ig-icon {
		color: #ff5aa7;
	}
</style>
