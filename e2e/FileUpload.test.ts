import { test, expect } from '@playwright/test';

import { Page } from '@playwright/test';

// this file contains 2 followers and 2 following, 1 of which is shared by both
const INSTAGRAM_EXPORTED_DATA = './e2e/fixtures/instagram_export_followers.zip';

async function uploadFile(page: Page, filePath: string) {
	await page.locator('[data-testid="upload-button"]').click();
	await page.locator('[data-testid="file-input"]').setInputFiles(filePath);
}

async function clickByTestId(page: Page, testId: string) {
	await page.getByTestId(testId).click();
}

test.describe('File upload and UsersList display', () => {
	test('should upload a file and display initial user data', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('body')).toContainText('Unfollow Detector');

		// Upload the file
		await uploadFile(page, INSTAGRAM_EXPORTED_DATA);

		// Check initial conditions
		await expect(page.getByTestId('followingThatDontFollowYou')).toBeVisible();
		await expect(page.getByTestId('users-list')).not.toContainText('@userMutual');
		await expect(page.getByTestId('users-list')).toContainText('@userThatDoesntFollowYou');
	});

	test('should display followers who don’t follow back when clicked', async ({ page }) => {
		await page.goto('/');

		// Upload the file
		await uploadFile(page, INSTAGRAM_EXPORTED_DATA);

		// Click on followers who don’t follow back
		await clickByTestId(page, 'followersThatYouDontFollow');

		// Verify displayed users
		await expect(page.getByTestId('users-list')).not.toContainText('@userMutual');
		await expect(page.getByTestId('users-list')).toContainText('@userThatYouDontFollow');
	});

	test('should open new tab when clicking on a user', async ({ page }) => {
		await page.goto('/');

		// Upload the file
		await uploadFile(page, INSTAGRAM_EXPORTED_DATA);

		// Click on a specific user and check new tab URL
		await page.getByText('@userThatDoesntFollowYou').click();

		const newPagePromise = page.waitForEvent('popup');
		const newPage = await newPagePromise;

		await newPage.waitForLoadState();
		expect(newPage.url()).toBe('https://www.instagram.com/userThatDoesntFollowYou/');

		await newPage.close();
	});
});
