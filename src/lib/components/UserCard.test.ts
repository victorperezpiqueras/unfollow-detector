import { render } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UserCard from '$lib/components/UserCard.svelte';
import { instagramAppUserLink } from '$lib/shared/getUserLink';
import type { User } from '$lib/shared/User';

describe('UsersList Component', () => {
	it('renders with user information and correct styling in non-mobile devices', () => {
		// Arrange
		const user = {
			href: 'https://instagram.com/test_user',
			value: 'test_user'
		};

		vi.spyOn(window, 'matchMedia').mockImplementation((query) => {
			return {
				matches: false, // Mock a non-mobile viewport
				media: query,
				onchange: null,
				addListener: vi.fn(), // Deprecated
				removeListener: vi.fn(), // Deprecated
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn()
			};
		});

		// Act
		const { getByText, getByRole } = render(UserCard, { props: { user } });

		// Assert
		expect(getByText('@test_user')).toBeInTheDocument();
		const link = getByRole('link');
		expect(link).toHaveAttribute('href', 'https://instagram.com/test_user');

		// Check the presence of Instagram icon by querying the i tag directly
		const icon = link.querySelector('i');
		expect(icon).toHaveClass('fab fa-instagram');
	});

	it('renders with user information and correct styling in mobile devices', () => {
		// Arrange
		const user: User = {
			href: 'https://instagram.com/test_user',
			value: 'test_user',
			timestamp: 0
		};

		vi.spyOn(window, 'matchMedia').mockImplementation((query) => {
			return {
				matches: true, // Mock a mobile viewport
				media: query,
				onchange: null,
				addListener: vi.fn(), // Deprecated
				removeListener: vi.fn(), // Deprecated
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn()
			};
		});

		// Act
		const { getByText, getByRole } = render(UserCard, { props: { user } });

		// Assert
		expect(getByText('@test_user')).toBeInTheDocument();
		const link = getByRole('link');
		expect(link).toHaveAttribute('href', instagramAppUserLink(user));

		// Check the presence of Instagram icon by querying the i tag directly
		const icon = link.querySelector('i');
		expect(icon).toHaveClass('fab fa-instagram');
	});
});
