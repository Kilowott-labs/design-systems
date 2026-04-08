/**
 * Frontend interactivity for kw-package/social-proof.
 * Handles:
 *   - Logo ticker auto-scroll (pause on hover handled via CSS)
 *   - Stats counter IntersectionObserver fade-in animation
 * Uses data- attributes as selectors — never Tailwind class names.
 */

function initSocialProof( block ) {
	const style = block.dataset.style;

	if ( style === 'stats' ) {
		initStatsAnimation( block );
	}
}

/**
 * Stats — fade-in animation triggered on scroll into view.
 * Adds .sp-animated class when section enters viewport.
 */
function initStatsAnimation( block ) {
	/* If IntersectionObserver not supported, show immediately */
	if ( ! ( 'IntersectionObserver' in window ) ) {
		block.classList.add( 'sp-animated' );
		return;
	}

	const observer = new IntersectionObserver(
		function ( entries ) {
			entries.forEach( function ( entry ) {
				if ( entry.isIntersecting ) {
					block.classList.add( 'sp-animated' );
					observer.unobserve( block );
				}
			} );
		},
		{ threshold: 0.3 }
	);

	observer.observe( block );
}

/* Init all social proof blocks */
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', function () {
		document
			.querySelectorAll( '[data-social-proof]' )
			.forEach( initSocialProof );
	} );
} else {
	document
		.querySelectorAll( '[data-social-proof]' )
		.forEach( initSocialProof );
}
