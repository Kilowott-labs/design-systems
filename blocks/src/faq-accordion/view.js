/**
 * Frontend interactivity for kw-package/faq-accordion.
 * Supports multiple independent block instances on the same page.
 * Uses data- attributes as selectors — never Tailwind class names.
 */

function initFaqAccordion( block ) {
	const triggers = block.querySelectorAll( '[data-faq-trigger]' );
	const faqList = block.querySelector( '[data-faq-list]' );
	const allowMultiple = faqList && faqList.dataset.allowMultiple === 'true';
	const tabs = block.querySelectorAll( '[data-faq-tab]' );
	const faqItems = block.querySelectorAll( '[data-faq-item]' );

	if ( ! triggers.length ) return;

	/* Accordion toggle */
	function toggleItem( trigger ) {
		const expanded = trigger.getAttribute( 'aria-expanded' ) === 'true';
		const answerId = trigger.getAttribute( 'aria-controls' );
		const answer = document.getElementById( answerId );

		if ( ! answer ) return;

		/* Close others if single-open mode */
		if ( ! allowMultiple ) {
			triggers.forEach( function ( otherTrigger ) {
				if ( otherTrigger === trigger ) return;
				const otherAnswerId =
					otherTrigger.getAttribute( 'aria-controls' );
				const otherAnswer = document.getElementById( otherAnswerId );
				if ( ! otherAnswer ) return;

				otherTrigger.setAttribute( 'aria-expanded', 'false' );
				otherAnswer.setAttribute( 'data-open', 'false' );
				otherAnswer.setAttribute( 'aria-hidden', 'true' );
			} );
		}

		/* Toggle current */
		const newState = ! expanded;
		trigger.setAttribute( 'aria-expanded', String( newState ) );
		answer.setAttribute( 'data-open', String( newState ) );
		answer.setAttribute( 'aria-hidden', String( ! newState ) );
	}

	/* Bind triggers */
	triggers.forEach( function ( trigger ) {
		trigger.addEventListener( 'click', function () {
			toggleItem( trigger );
		} );

		trigger.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Enter' || e.key === ' ' ) {
				e.preventDefault();
				toggleItem( trigger );
			}
		} );
	} );

	/* Tab filtering */
	if ( tabs.length > 0 && faqItems.length > 0 ) {
		const isDark = block.dataset.colorMode === 'dark';

		/* Classes for active and inactive tab states */
		const activeBg = isDark
			? 'bg-[var(--wp--preset--color--white)]'
			: 'bg-[var(--wp--preset--color--foreground)]';
		const activeText = isDark
			? 'text-[var(--wp--preset--color--foreground)]'
			: 'text-[var(--wp--preset--color--white)]';
		const inactiveBorder = isDark
			? 'border-[var(--wp--preset--color--border-dark)]'
			: 'border-[var(--wp--preset--color--border)]';
		const inactiveText = isDark
			? 'text-[var(--wp--preset--color--muted-on-dark)]'
			: 'text-[var(--wp--preset--color--foreground-muted)]';

		function deactivateTab( t ) {
			t.setAttribute( 'aria-pressed', 'false' );
			t.classList.remove( activeBg, activeText, 'font-semibold' );
			t.classList.add( 'border', inactiveBorder, inactiveText, 'font-medium' );
		}

		function activateTab( t ) {
			t.setAttribute( 'aria-pressed', 'true' );
			t.classList.remove( 'border', inactiveBorder, inactiveText, 'font-medium' );
			t.classList.add( activeBg, activeText, 'font-semibold' );
		}

		tabs.forEach( function ( tab ) {
			tab.addEventListener( 'click', function () {
				const category = tab.dataset.faqTab;

				/* Update tab states */
				tabs.forEach( deactivateTab );
				activateTab( tab );

				/* Filter items */
				faqItems.forEach( function ( item ) {
					const itemCategory = item.dataset.category;
					if (
						! category ||
						category === 'all' ||
						itemCategory === category
					) {
						item.style.display = '';
					} else {
						item.style.display = 'none';
					}
				} );
			} );
		} );
	}
}

/* Init all FAQ accordion blocks */
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', function () {
		document
			.querySelectorAll( '[data-faq-accordion]' )
			.forEach( initFaqAccordion );
	} );
} else {
	document
		.querySelectorAll( '[data-faq-accordion]' )
		.forEach( initFaqAccordion );
}
