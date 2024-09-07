import JSZip from 'jszip';
import { loadFollowersFile, FollowersFileWrongFormatError } from './loadFollowersFile';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock JSZip
vi.mock('jszip', () => {
	return {
		default: {
			loadAsync: vi.fn()
		}
	};
});

describe('loadFollowersFile', () => {
	const mockFile = new File([''], 'test.zip', { type: 'application/zip' });

	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods:
		vi.clearAllMocks();
	});

	it('should throw an error if the file is undefined', async () => {
		await expect(loadFollowersFile(undefined)).rejects.toThrow(FollowersFileWrongFormatError);
	});

	it('should throw an error if followers.json is not found in the zip file', async () => {
		// Arrange
		const mockZip = {
			file: vi.fn().mockReturnValueOnce(null), // Simulate missing followers.json
			async: vi.fn()
		};
		(JSZip.loadAsync as any).mockResolvedValue(mockZip);

		// Act & Assert
		await expect(loadFollowersFile(mockFile)).rejects.toThrow(FollowersFileWrongFormatError);
	});

	it('should throw an error if following.json is not found in the zip file', async () => {
		// Arrange
		const mockZip = {
			file: vi
				.fn()
				.mockReturnValueOnce({
					async: vi.fn().mockResolvedValueOnce(
						JSON.stringify({
							string_list_data: [{ href: 'http://example.com', timestamp: 1, value: 'user1' }]
						})
					)
				}) // Simulate followers.json
				.mockReturnValueOnce(null), // Simulate missing following.json
			async: vi.fn()
		};
		(JSZip.loadAsync as any).mockResolvedValue(mockZip);

		// Act & Assert
		await expect(loadFollowersFile(mockFile)).rejects.toThrow(FollowersFileWrongFormatError);
	});

	it('should throw an error if there is an error reading the zip file', async () => {
		// Arrange
		(JSZip.loadAsync as any).mockRejectedValue(new Error('JSZip error'));

		// Act & Assert
		await expect(loadFollowersFile(mockFile)).rejects.toThrow(FollowersFileWrongFormatError);
	});

	/* 	it('should correctly parse followers and following data', async () => { // TODO fix zip mocking
		// Arrange
		const mockFollowersJson = JSON.stringify({
			string_list_data: [{ href: 'http://example.com', timestamp: 1, value: 'user1' }]
		});

		const mockFollowingJson = JSON.stringify({
			relationships_following: [
				{ string_list_data: [{ href: 'http://example.com', timestamp: 1, value: 'user2' }] }
			]
		});

		const mockZip = {
			file: vi.fn((fileName: string) => {
				if (fileName === 'connections/followers_and_following/followers_1.json') {
					return { async: vi.fn().mockResolvedValue(mockFollowersJson) };
				}
				if (fileName === 'connections/followers_and_following/following.json') {
					return { async: vi.fn().mockResolvedValue(mockFollowingJson) };
				}
				return null;
			}),
			async: vi.fn()
		};
		(JSZip.loadAsync as any).mockResolvedValue(mockZip);

		// Act
		const result = await loadFollowersFile(mockFile);

		// Assert
		expect(result).toEqual({
			followers: [{ href: 'http://example.com', timestamp: 1, value: 'user1' }],
			following: [{ href: 'http://example.com', timestamp: 1, value: 'user2' }]
		});
	}); */
});
