/**
 * Frontend interactivity for kw-package/hero-section.
 * Handles the SaaS email form submission and fullbleed parallax-like scroll.
 * Uses data- attributes as selectors — never Tailwind class names.
 */

function initHeroSection( block ) {
	const form = block.querySelector( '[data-hero-email-form]' );

	/* Email form — prevent default and show feedback */
	if ( form ) {
		form.addEventListener( 'submit', function ( e ) {
			e.preventDefault();
			const emailInput = form.querySelector( 'input[type="email"]' );
			const submitBtn = form.querySelector( 'button[type="submit"]' );

			if ( ! emailInput || ! emailInput.value ) {
				return;
			}

			/* Visual feedback — disable button temporarily */
			if ( submitBtn ) {
				const originalText = submitBtn.textContent;
				submitBtn.textContent = 'Sending\u2026';
				submitBtn.setAttribute( 'disabled', 'true' );
				submitBtn.style.opacity = '0.6';

				setTimeout( function () {
					submitBtn.textContent = originalText;
					submitBtn.removeAttribute( 'disabled' );
					submitBtn.style.opacity = '';
					emailInput.value = '';
				}, 2000 );
			}
		} );
	}
}

/* Init all hero section blocks */
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', function () {
		document
			.querySelectorAll( '[data-hero-section]' )
			.forEach( initHeroSection );
	} );
} else {
	document
		.querySelectorAll( '[data-hero-section]' )
		.forEach( initHeroSection );
}
