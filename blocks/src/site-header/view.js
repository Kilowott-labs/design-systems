/**
 * Frontend interactivity for kw-package/site-header.
 * Handles: mobile menu toggle, mega menu dropdown, search toggle.
 * Uses data- attributes as selectors — never Tailwind class names.
 */

function initSiteHeader( block ) {
	const hamburgers = block.querySelectorAll( '[data-site-header-hamburger]' );
	const mobileMenu = block.querySelector( '[data-site-header-mobile]' );
	const closeBtn = mobileMenu ? mobileMenu.querySelector( '[data-site-header-close]' ) : null;
	const megaTrigger = block.querySelector( '[data-site-header-mega-trigger]' );
	const megaPanel = block.querySelector( '[data-site-header-mega]' );

	/* ── Mobile Menu ──────────────────────────────────────────────── */

	function openMobileMenu() {
		if ( ! mobileMenu ) return;
		mobileMenu.classList.remove( 'hidden' );
		mobileMenu.setAttribute( 'aria-hidden', 'false' );
		hamburgers.forEach( function ( btn ) {
			btn.setAttribute( 'aria-expanded', 'true' );
		} );
		document.body.style.overflow = 'hidden';

		/* Trap focus inside mobile menu */
		var focusable = mobileMenu.querySelectorAll( 'a, button, [tabindex]:not([tabindex="-1"])' );
		if ( focusable.length > 0 ) {
			focusable[ 0 ].focus();
		}
	}

	function closeMobileMenu() {
		if ( ! mobileMenu ) return;
		mobileMenu.classList.add( 'hidden' );
		mobileMenu.setAttribute( 'aria-hidden', 'true' );
		hamburgers.forEach( function ( btn ) {
			btn.setAttribute( 'aria-expanded', 'false' );
		} );
		document.body.style.overflow = '';
	}

	hamburgers.forEach( function ( btn ) {
		btn.addEventListener( 'click', function () {
			var expanded = btn.getAttribute( 'aria-expanded' ) === 'true';
			if ( expanded ) {
				closeMobileMenu();
			} else {
				openMobileMenu();
			}
		} );
	} );

	if ( closeBtn ) {
		closeBtn.addEventListener( 'click', closeMobileMenu );
	}

	/* Close mobile menu on Escape */
	if ( mobileMenu ) {
		mobileMenu.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' ) {
				closeMobileMenu();
				/* Return focus to first hamburger */
				if ( hamburgers.length > 0 ) {
					hamburgers[ 0 ].focus();
				}
			}
		} );
	}

	/* ── Mega Menu ────────────────────────────────────────────────── */

	if ( megaTrigger && megaPanel ) {
		megaTrigger.addEventListener( 'click', function () {
			var expanded = megaTrigger.getAttribute( 'aria-expanded' ) === 'true';
			var newState = ! expanded;

			megaTrigger.setAttribute( 'aria-expanded', String( newState ) );
			megaPanel.setAttribute( 'aria-hidden', String( ! newState ) );

			if ( newState ) {
				megaPanel.classList.remove( 'hidden' );
			} else {
				megaPanel.classList.add( 'hidden' );
			}
		} );

		megaTrigger.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Enter' || e.key === ' ' ) {
				e.preventDefault();
				megaTrigger.click();
			}
		} );

		/* Close mega menu on Escape */
		megaPanel.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' ) {
				megaTrigger.setAttribute( 'aria-expanded', 'false' );
				megaPanel.setAttribute( 'aria-hidden', 'true' );
				megaPanel.classList.add( 'hidden' );
				megaTrigger.focus();
			}
		} );

		/* Close mega menu when clicking outside */
		document.addEventListener( 'click', function ( e ) {
			if ( ! block.contains( e.target ) ) {
				megaTrigger.setAttribute( 'aria-expanded', 'false' );
				megaPanel.setAttribute( 'aria-hidden', 'true' );
				megaPanel.classList.add( 'hidden' );
			}
		} );
	}

	/* ── Search Toggle (ecommerce variant) ────────────────────────── */

	var searchToggle = block.querySelector( '[data-site-header-search-toggle]' );
	var searchBar = block.querySelector( '[data-site-header-search]' );

	if ( searchToggle && searchBar ) {
		searchToggle.addEventListener( 'click', function () {
			var isHidden = searchBar.classList.contains( 'hidden' );
			if ( isHidden ) {
				searchBar.classList.remove( 'hidden' );
				var input = searchBar.querySelector( 'input' );
				if ( input ) {
					input.focus();
				}
			} else {
				searchBar.classList.add( 'hidden' );
			}
		} );
	}
}

/* Init all site header blocks */
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', function () {
		document
			.querySelectorAll( '[data-site-header]' )
			.forEach( initSiteHeader );
	} );
} else {
	document
		.querySelectorAll( '[data-site-header]' )
		.forEach( initSiteHeader );
}
