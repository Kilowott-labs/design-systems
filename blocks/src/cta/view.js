/**
 * CTA Block — Frontend interactions
 *
 * Handles newsletter form submission with client-side validation
 * and status feedback. Uses data- attributes for all selectors.
 */
function initCtaBlocks() {
	const blocks = document.querySelectorAll( '[data-cta-block]' );

	blocks.forEach( ( block ) => {
		const ctaStyle = block.getAttribute( 'data-style' );

		if ( ctaStyle === 'newsletter' ) {
			initNewsletterForm( block );
		}
	} );
}

/**
 * Newsletter form — validates email and shows feedback.
 * In production, replace the timeout with an actual API call.
 */
function initNewsletterForm( block ) {
	const form = block.querySelector( '[data-cta-form]' );
	const statusEl = block.querySelector( '[data-cta-status]' );

	if ( ! form ) {
		return;
	}

	form.addEventListener( 'submit', ( e ) => {
		e.preventDefault();

		const emailInput = form.querySelector( 'input[type="email"]' );
		if ( ! emailInput || ! emailInput.value ) {
			return;
		}

		const submitBtn = form.querySelector( 'button[type="submit"]' );
		const originalText = submitBtn ? submitBtn.textContent : '';

		/* Disable form during submission */
		if ( submitBtn ) {
			submitBtn.textContent = 'Sending\u2026';
			submitBtn.disabled = true;
		}
		emailInput.disabled = true;

		/* Simulate API call — replace with actual endpoint in production */
		setTimeout( () => {
			emailInput.value = '';
			emailInput.disabled = false;

			if ( submitBtn ) {
				submitBtn.textContent = originalText;
				submitBtn.disabled = false;
			}

			if ( statusEl ) {
				const statusP = statusEl.querySelector( 'p' );
				if ( statusP ) {
					statusP.textContent = 'Thank you for subscribing!';
				}
			}

			/* Reset status message after 5 seconds */
			setTimeout( () => {
				if ( statusEl ) {
					const statusP = statusEl.querySelector( 'p' );
					if ( statusP ) {
						statusP.textContent = block.querySelector( '[data-cta-form]' )
							? 'We respect your privacy. Unsubscribe at any time.'
							: '';
					}
				}
			}, 5000 );
		}, 1000 );
	} );
}

document.readyState === 'loading'
	? document.addEventListener( 'DOMContentLoaded', initCtaBlocks )
	: initCtaBlocks();
