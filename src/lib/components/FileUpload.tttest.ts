/* import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import FileUploader from '$lib/components/FileUpload.svelte';

// Mock the loadFollowersFile function
vi.mock('$lib/loadFollowersFile', () => ({
	loadFollowersFile: vi.fn(),
	FollowersFileWrongFormatError: vi.fn()
}));

describe('FileUpload', () => {
	it('should dispatch "uploadComplete" event when a valid file is uploaded', async () => {
		const mockLoadFollowersFile = require('$lib/loadFollowersFile').loadFollowersFile;
		mockLoadFollowersFile.mockResolvedValueOnce({
			followers: ['follower1', 'follower2'],
			following: ['following1', 'following2']
		});

		const { getByLabelText, component } = render(FileUploader);

		const fileInput = getByLabelText(/sube tu fichero/i);
		const file = new File(['dummy content'], 'followers.zip', { type: 'application/zip' });

		const dispatchMock = vi.fn();
		component.$on('uploadComplete', dispatchMock);

		await fireEvent.change(fileInput, {
			target: { files: [file] }
		});

		expect(mockLoadFollowersFile).toHaveBeenCalledWith(file);
		expect(dispatchMock).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					followers: ['follower1', 'follower2'],
					following: ['following1', 'following2']
				}
			})
		);
	});

	it('should alert when the file format is wrong', async () => {
		const mockLoadFollowersFile = require('$lib/loadFollowersFile').loadFollowersFile;
		const mockFollowersFileWrongFormatError =
			new (require('$lib/loadFollowersFile').FollowersFileWrongFormatError)('Wrong file format');
		mockLoadFollowersFile.mockRejectedValueOnce(mockFollowersFileWrongFormatError);

		window.alert = vi.fn();

		const { getByLabelText } = render(FileUploader);

		const fileInput = getByLabelText(/sube tu fichero/i);
		const file = new File(['dummy content'], 'followers.zip', { type: 'application/zip' });

		await fireEvent.change(fileInput, {
			target: { files: [file] }
		});

		expect(window.alert).toHaveBeenCalledWith('Wrong file format');
	});
});
 */
