/**
 * Parallax Image — Frontend JS
 * Uses GSAP ScrollTrigger to move the image at a slower rate than page scroll.
 */
(function () {
	function initParallax() {
		if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

		document.querySelectorAll('[data-parallax-block]').forEach((block) => {
			const img = block.querySelector('.parallax-img');
			if (!img) return;

			const amount = parseFloat(block.getAttribute('data-parallax-amount')) || 0.3;

			gsap.to(img, {
				y: () => -block.offsetHeight * amount,
				ease: 'none',
				scrollTrigger: {
					trigger: block,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initParallax);
	} else {
		initParallax();
	}
})();
