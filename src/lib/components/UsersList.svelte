<script lang="ts">
	import type { User } from '$lib/shared/User';
	import UserCard from '$lib/components/UserCard.svelte';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

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

	export let followers: User[] = [{ href: '', timestamp: 0, value: 'usuario' }];
	export let following: User[] = [{ href: '', timestamp: 0, value: 'usuario2' }];

	const followersSet = new Set(followers.map((user) => user.value));
	const followingSet = new Set(following.map((user) => user.value));

	const followersThatYouDontFollow = followers.filter((user) => !followingSet.has(user.value));
	const followingThatDontFollowYou = following.filter((user) => !followersSet.has(user.value));

	const setActiveTab = (tabId: string) => {
		activeTab = tabId;
	};
</script>

<div class="flex flex-col justify-center items-center h-full w-full">
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-auto lg:flex-none"
		rounded="rounded-container-token"
		border=""
		class="bg-surface-100-800-token w-full md:w-2/5"
	>
		{#each tabs as { id, label, icon }}
			<TabAnchor
				href="#"
				selected={activeTab === id}
				on:click={() => setActiveTab(id)}
				data-testid={id}
			>
				<svelte:fragment slot="lead">
					<span class="icon is-small">
						<i class={icon} aria-hidden="true"></i>
					</span>
				</svelte:fragment>
				<span>{label}</span>
			</TabAnchor>
		{/each}
	</TabGroup>

	<div class="overflow-y-auto w-full max-w-lg h-xl md:h-full mt-4">
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
</div>

<style>
	.ig-icon {
		color: #ff5aa7;
	}
</style>
