import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsersList from './UsersList.svelte';
import type { User } from '$lib/shared/User';

describe('UsersList Component', () => {
	const followers: User[] = [
		{ href: 'youDontFollow', timestamp: 0, value: 'youDontFollow' },
		{ href: 'mutual', timestamp: 0, value: 'mutual' }
	];

	const following = [
		{ href: 'doesntFollowYou', timestamp: 0, value: 'doesntFollowYou' },
		{ href: 'mutual', timestamp: 0, value: 'mutual' }
	];

	beforeEach(() => {
		// TODO this shouldnt be needed as UserCard should be mocked
		vi.spyOn(window, 'matchMedia').mockImplementation((query) => {
			return {
				matches: query === '(max-width: 1600px)', // Mock a non-mobile viewport
				media: query,
				onchange: null,
				addListener: vi.fn(), // Deprecated
				removeListener: vi.fn(), // Deprecated
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn()
			};
		});
	});

	it('should render following that do not follow you', async () => {
		const { getByText, queryByText, getAllByTestId } = render(UsersList, {
			props: { followers, following }
		});

		const tabAnchors = getAllByTestId('tab-anchor');
		expect(tabAnchors).toHaveLength(2);

		const followingThatDontFollowYou = tabAnchors[0];
		expect(followingThatDontFollowYou).toBeInTheDocument();
		await fireEvent.click(followingThatDontFollowYou);

		expect(getByText(/doesntFollowYou/i)).toBeInTheDocument();
		expect(queryByText(/youDontFollow/i)).toBeNull();
		expect(queryByText(/mutual/i)).toBeNull();
	});

	it('should render followers that you do not follow', async () => {
		const { getByText, queryByText, getAllByTestId } = render(UsersList, {
			props: { followers, following }
		});

		const tabAnchors = getAllByTestId('tab-anchor');
		expect(tabAnchors).toHaveLength(2);

		const followingThatDontFollowYou = tabAnchors[1];
		expect(followingThatDontFollowYou).toBeInTheDocument();
		await fireEvent.click(followingThatDontFollowYou);

		expect(getByText(/youDontFollow/i)).toBeInTheDocument();
		expect(queryByText(/doesntFollowYou/i)).toBeNull();
		expect(queryByText(/mutual/i)).toBeNull();
	});
});
