import { render } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import UserCard from '$lib/components/UserCard.svelte';

it('renders with user information and correct styling', () => {
	// Arrange
	const user = {
		href: 'https://instagram.com/example',
		value: 'example_user'
	};

	// Act
	const { getByText, getByRole } = render(UserCard, { props: { user } });

	// Assert
	expect(getByText('@example_user')).toBeInTheDocument();
	const link = getByRole('link');
	expect(link).toHaveAttribute('href', 'https://instagram.com/example');

	// Check the presence of Instagram icon by querying the i tag directly
	const icon = link.querySelector('i');
	expect(icon).toHaveClass('fab fa-instagram');
});
