import { test, expect } from '@playwright/test';

import { Page } from '@playwright/test';

// this file contains 2 followers and 2 following, 1 of which is shared by both
const INSTAGRAM_EXPORTED_DATA = './e2e/fixtures/instagram_exported_data.zip';

async function uploadFile(page: Page, filePath: string) {
	await page.locator('[data-testid="file-dropzone"]').click();
	await page.locator('input[type="file"]').setInputFiles(filePath);
}

test.describe('File upload and UsersList display', () => {
	test('should upload a file and display initial user data', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('body')).toContainText('Unfollower Finder');

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
		await page.getByRole('button', { name: 'Fans' }).click();

		// Verify displayed users
		await expect(page.getByTestId('users-list')).not.toContainText('@userMutual');
		await expect(page.getByTestId('users-list')).toContainText('@userThatYouDontFollow');
	});

	test('should open new tab when clicking on a user in non-mobile devices', async ({ page }) => {
		await page.goto('/');

		// Upload the file
		await uploadFile(page, INSTAGRAM_EXPORTED_DATA);

		const userLink = page.locator('a[href^="https://www.instagram.com"]');
		const href = await userLink.getAttribute('href');

		// Check that the href is the Instagram deep link
		expect(href).toBe('https://www.instagram.com/userThatDoesntFollowYou');
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

		// Listen for the dialog (toast) and handle it
		await expect(page.getByTestId('toast')).toContainText(
			'El fichero no tiene el formato correcto. Revisa las instrucciones en el botón de ayuda.'
		);
	});

	test('should popup tutorial modal steps correctly', async ({ page }) => {
		await page.goto('/');

		await page.getByRole('button', { name: 'Guía de uso' }).click();

		await expect(page.getByTestId('modal-component').locator('span')).toContainText('Paso 1/11');
		await expect(page.getByTestId('modal-component').getByRole('contentinfo')).toContainText(
			'Cerrar'
		);
		await expect(page.getByTestId('modal-component').getByRole('contentinfo')).not.toContainText(
			'Atrás'
		);

		await expect(page.getByTestId('modal-component').getByRole('contentinfo')).toContainText(
			'Siguiente'
		);
		await expect(page.getByTestId('modal-component').getByRole('contentinfo')).not.toContainText(
			'Finalizar'
		);
		// TODO test image loaded
		// TODO test image changed

		for (let index = 0; index < 10; index++) {
			await page.getByRole('button', { name: 'Siguiente' }).click();
		}

		await expect(page.getByTestId('modal-component').locator('span')).toContainText('Paso 11/11');

		await expect(page.getByTestId('modal-component').getByRole('contentinfo')).not.toContainText(
			'Cerrar'
		);
		await expect(page.getByTestId('modal-component').getByRole('contentinfo')).toContainText(
			'Atrás'
		);

		await expect(page.getByTestId('modal-component').getByRole('contentinfo')).not.toContainText(
			'Siguiente'
		);
		await expect(page.getByTestId('modal-component').getByRole('contentinfo')).toContainText(
			'Finalizar'
		);
	});
	// TODO test buttons appear when they have to
});
