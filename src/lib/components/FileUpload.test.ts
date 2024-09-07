import { render, fireEvent } from '@testing-library/svelte';
import FileUpload from './FileUpload.svelte';
import { loadFollowersFile, FollowersFileWrongFormatError } from '$lib/shared/loadFollowersFile';
import { type User } from '$lib/shared/User';
import { describe, expect, it, vi } from 'vitest';

// Mock the loadFollowersFile function
vi.mock('$lib/shared/loadFollowersFile');

describe('FileUpload Component', () => {
	it('dispatches uploadComplete event with followers and following on successful file load', async () => {
		// Arrange
		const mockFollowers: User[] = [
			{ href: 'youDontFollow', timestamp: 0, value: 'youDontFollow' },
			{ href: 'mutual', timestamp: 0, value: 'mutual' }
		];
		const mockFollowing: User[] = [
			{ href: 'youDontFollow', timestamp: 0, value: 'youDontFollow' },
			{ href: 'mutual', timestamp: 0, value: 'mutual' }
		];

		// Mocking loadFollowersFile to resolve with the expected data
		(loadFollowersFile as any).mockResolvedValue({
			followers: mockFollowers,
			following: mockFollowing
		});

		// Render the component
		const { getByLabelText, component } = render(FileUpload);

		// Listen for the 'uploadComplete' event
		const uploadComplete = vi.fn();
		component.$on('uploadComplete', uploadComplete);

		// Act
		const input = getByLabelText('Sube tu fichero') as HTMLInputElement;
		const file = new File(['content'], 'followers.zip', { type: 'application/zip' });

		// Trigger file input change event
		await fireEvent.change(input, { target: { files: [file] } });

		// Assert
		expect(loadFollowersFile).toHaveBeenCalledWith(file);
		expect(uploadComplete).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: { followers: mockFollowers, following: mockFollowing }
			})
		);
	});

	it('alerts with error message when an invalid file is uploaded', async () => {
		// Arrange
		const mockErrorMessage = 'El fichero no tiene el formato correcto. Revisa su estructura.';

		(loadFollowersFile as any).mockImplementation(() => {
			throw new FollowersFileWrongFormatError(mockErrorMessage);
		});

		// Mock window.alert
		const alertMock = vi.spyOn(window, 'alert').mockImplementation((data) => {});

		// Render the component
		const { getByLabelText } = render(FileUpload);

		// Act
		const input = getByLabelText('Sube tu fichero') as HTMLInputElement;
		const file = new File(['invalid content'], 'invalid.zip', { type: 'application/zip' });

		// Trigger file input change event
		await fireEvent.change(input, { target: { files: [file] } });

		// Assert
		expect(loadFollowersFile).toHaveBeenCalledWith(file);
		expect(alertMock).toBeCalledWith(
			'El fichero no tiene el formato correcto. Revisa su estructura.'
		); // TODO check how to fix message

		// Clean up the mock
		alertMock.mockRestore();
	});
});
