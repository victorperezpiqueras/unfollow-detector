import { describe, it, expect, vi, afterEach } from 'vitest';
import { getUserLink } from './getUserLink';
import type { User } from './User';
import { isMobile } from './isMobile';

vi.mock('./isMobile', () => ({
	isMobile: vi.fn()
}));

describe('getUserLink', () => {
	const user: User = {
		value: 'testuser',
		href: 'https://instagram.com/testuser',
		timestamp: 0
	};

	it('should return Instagram deep link for mobile devices', () => {
		(vi.mocked(isMobile) as any).mockReturnValue(true);

		const result = getUserLink(user);

		expect(result).toBe('instagram://user?username=testuser');
	});

	it('should return normal href for non-mobile devices', () => {
		(vi.mocked(isMobile) as any).mockReturnValue(false);

		const result = getUserLink(user);

		expect(result).toBe('https://instagram.com/testuser');
	});
});
