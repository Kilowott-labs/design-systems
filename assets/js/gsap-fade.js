/**
 * GSAP Fade on Scroll — Global Utility
 * Queries all [data-fade] elements and applies scroll-triggered fade-up.
 * Blocks emit data-fade and optional data-fade-delay attributes.
 */
(function () {
	if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

	function initFade() {
		gsap.utils.toArray('[data-fade]').forEach((item) => {
			const delay = parseFloat(item.getAttribute('data-fade-delay')) || 0.15;
			const offset = parseFloat(item.getAttribute('data-fade-offset')) || 40;
			const duration = parseFloat(item.getAttribute('data-fade-duration')) || 0.75;
			const ease = item.getAttribute('data-fade-ease') || 'power2.out';

			gsap.from(item, {
				opacity: 0,
				y: offset,
				duration: duration,
				delay: delay,
				ease: ease,
				scrollTrigger: {
					trigger: item,
					start: 'top 85%',
				},
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => setTimeout(initFade, 200));
	} else {
		setTimeout(initFade, 200);
	}
})();
