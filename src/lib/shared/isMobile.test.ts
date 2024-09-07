import { describe, it, expect, vi } from 'vitest';
import { isMobile } from './isMobile';

describe('isMobile', () => {
	it('should return true for mobile devices', async () => {
		vi.spyOn(window, 'matchMedia').mockImplementation((query) => {
			return {
				matches: true, // Mock a non-mobile viewport
				media: query,
				onchange: null,
				addListener: vi.fn(), // Deprecated
				removeListener: vi.fn(), // Deprecated
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn()
			};
		});

		expect(isMobile()).toBe(true);
	});

	it('should return false for non-mobile devices', async () => {
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

		expect(isMobile()).toBe(false);
	});

	it('should return false if window is undefined (e.g., server-side)', async () => {
		vi.stubGlobal('window', undefined);

		expect(isMobile()).toBe(false);
	});
});
