import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./src/setupTests.ts'],
		globals: true,
		environment: 'jsdom'
	},
	resolve: {
		alias: {
			$lib: resolve(__dirname, 'src/lib') // Alias for $lib
		}
	}
});
