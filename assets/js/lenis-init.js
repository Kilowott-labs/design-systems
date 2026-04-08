/**
 * Lenis Smooth Scroll — Global Init
 * Connects to GSAP ScrollTrigger. Exposes window.__lenis for blocks
 * that need to call lenis.stop() / lenis.start() (e.g. offcanvas menu).
 */
(function () {
	if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') return;

	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		orientation: 'vertical',
		smoothWheel: true,
	});

	lenis.on('scroll', window.ScrollTrigger ? ScrollTrigger.update : () => {});

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

	window.__lenis = lenis;
})();
