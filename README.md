# Unfollow Detector

[![CI/CD](https://github.com/unfollow-detector/unfollow-detector/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/unfollow-detector/unfollow-detector/actions/workflows/ci-cd.yml)

Application that provides a simple-to-use guide on how to download your Instagram followers and following information, where you can see which profiles that you follow dont follow you back, and vice versa.

## How to start

### Install and debug

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

### Testing

Unit tests can be run using `npm run test:unit`, and follow the pattern of `ComponentName.test.ts`, in the same folder as the source code.

End-to-end tests are stored in `/e2e`. They are run using Playwright: `npm run test:e2e`.

## Main dependencies

- Language: TypeScript
- Component library: [Svelte](https://svelte.dev/)
- UI: [Skeleton](https://www.skeleton.dev/docs/get-started)
- CSS: [Tailwind](https://tailwindcss.com/)
- Dev env: [Vite](https://vitejs.dev/)
- Testing framework: [Vitest](https://vitest.dev/)
