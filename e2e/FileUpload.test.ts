import { test, expect } from '@playwright/test';

import { Page } from '@playwright/test';

// this file contains 2 followers and 2 following, 1 of which is shared by both
const INSTAGRAM_EXPORTED_DATA = './e2e/fixtures/instagram_exported_data.zip';

async function uploadFile(page: Page, filePath: string) {
	await page.locator('[data-testid="file-button"]').click();
	await page.locator('input[type="file"]').setInputFiles(filePath);
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
		await expect(page.getByTestId('users-list')).not.toContainText('@userMutual');
		await expect(page.getByTestId('users-list')).toContainText('@userThatDoesntFollowYou');
	});

	test('should display followers who don’t follow back when clicked', async ({ page }) => {
		await page.goto('/');

		// Upload the file
		await uploadFile(page, INSTAGRAM_EXPORTED_DATA);

		// Click on followers who don’t follow back
		await page.getByRole('button', { name: 'No les sigues' }).click();

		// Verify displayed users
		await expect(page.getByTestId('users-list')).not.toContainText('@userMutual');
		await expect(page.getByTestId('users-list')).toContainText('@userThatYouDontFollow');
	});

	test('should open new tab when clicking on a user in non-mobile devices', async ({ page }) => {
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

	test('should open instagram app when clicking on a user in mobile devices', async ({ page }) => {
		await page.goto('/');
		await page.setViewportSize({ width: 320, height: 480 });

		// Upload the file
		await uploadFile(page, INSTAGRAM_EXPORTED_DATA);

		const userLink = page.locator('a[href^="instagram://"]'); // Locator for links with Instagram deep link
		const href = await userLink.getAttribute('href');

		// Check that the href is the Instagram deep link
		expect(href).toBe('instagram://user?username=userThatDoesntFollowYou');
	});

	test('should show an alert when an invalid file is uploaded', async ({ page }) => {
		await page.goto('/');

		await uploadFile(page, './e2e/fixtures/instagram_invalid_exported_data.zip');

		// Listen for the dialog (alert) and handle it
		const dialog = await page.waitForEvent('dialog');

		// Assert the alert's message
		expect(dialog.message()).toBe('El fichero no tiene el formato correcto. Revisa su estructura.');

		await dialog.accept();
	});
});
