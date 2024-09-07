import { render } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UserCard from '$lib/components/UserCard.svelte';

describe('UsersList Component', () => {
	it('renders with user information and correct styling in PC', () => {
		// Arrange
		const user = {
			href: 'https://instagram.com/example_user',
			value: 'example_user'
		};

		vi.spyOn(window, 'matchMedia').mockImplementation((query) => {
			return {
				matches: false, // Mock a PC viewport
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
		expect(getByText('@example_user')).toBeInTheDocument();
		const link = getByRole('link');
		expect(link).toHaveAttribute('href', 'https://instagram.com/example_user');

		// Check the presence of Instagram icon by querying the i tag directly
		const icon = link.querySelector('i');
		expect(icon).toHaveClass('fab fa-instagram');
	});

	it('renders with user information and correct styling in mobile', () => {
		// Arrange
		const user = {
			href: 'https://instagram.com/example_user',
			value: 'example_user'
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
		expect(getByText('@example_user')).toBeInTheDocument();
		const link = getByRole('link');
		expect(link).toHaveAttribute('href', 'instagram://user?username=example_user');

		// Check the presence of Instagram icon by querying the i tag directly
		const icon = link.querySelector('i');
		expect(icon).toHaveClass('fab fa-instagram');
	});
});
