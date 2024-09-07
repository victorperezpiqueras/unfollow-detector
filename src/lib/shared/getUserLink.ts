import { isMobile } from './isMobile';
import type { User } from './User';

export const instagramAppUserLink = (user: User) => `instagram://user?username=${user.value}`;

export function getUserLink(user: User): string {
	const finalHref = isMobile() ? instagramAppUserLink(user) : user.href;
	return finalHref;
}
