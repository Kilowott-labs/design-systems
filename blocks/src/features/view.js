/**
 * Frontend interactivity for kw-package/features.
 * Handles:
 *   - Staggered entrance animation via IntersectionObserver
 * Uses data- attributes as selectors — never Tailwind class names.
 */

function initFeaturesBlock( block ) {
	const items = block.querySelectorAll( 'li' );
	if ( ! items.length ) return;

	/* Respect reduced motion preference */
	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	if ( prefersReducedMotion ) {
		/* Show all items immediately */
		items.forEach( function ( item ) {
			item.style.opacity = '1';
			item.style.transform = 'none';
		} );
		return;
	}

	/* Set initial hidden state */
	items.forEach( function ( item ) {
		item.style.opacity = '0';
		item.style.transform = 'translateY(1.5rem)';
		item.style.transition =
			'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1)';
	} );

	/* Observe intersection */
	var observer = new IntersectionObserver(
		function ( entries ) {
			entries.forEach( function ( entry ) {
				if ( ! entry.isIntersecting ) return;

				var item = entry.target;
				var index = Array.prototype.indexOf.call( items, item );
				var delay = index * 80;

				setTimeout( function () {
					item.style.opacity = '1';
					item.style.transform = 'translateY(0)';
				}, delay );

				observer.unobserve( item );
			} );
		},
		{ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
	);

	items.forEach( function ( item ) {
		observer.observe( item );
	} );
}

/* Init all features blocks */
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', function () {
		document
			.querySelectorAll( '[data-features-block]' )
			.forEach( initFeaturesBlock );
	} );
} else {
	document
		.querySelectorAll( '[data-features-block]' )
		.forEach( initFeaturesBlock );
}
