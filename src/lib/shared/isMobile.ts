export const isMobile = () =>
	typeof window !== 'undefined' && window.matchMedia('(width <= 640px)').matches;
