/**
 * Frontend interactivity for kw-package/gallery.
 * Handles tab filtering, lightbox on click, and hover animations.
 * Uses data- attributes as selectors — never Tailwind class names.
 */

function initGallery( block ) {
	const tabs = block.querySelectorAll( '[data-gallery-tab]' );
	const items = block.querySelectorAll( '[data-gallery-item]' );
	const grid = block.querySelector( '[data-gallery-grid]' );
	const isDark = block.dataset.colorMode === 'dark';

	/* ===========================
	 * Tab filtering
	 * =========================== */
	if ( tabs.length > 0 && items.length > 0 ) {
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
				var category = tab.dataset.galleryTab;

				/* Update tab states */
				tabs.forEach( deactivateTab );
				activateTab( tab );

				/* Filter items */
				items.forEach( function ( item ) {
					var itemCategory = item.dataset.category;
					if (
						! category ||
						category === 'all' ||
						itemCategory === category
					) {
						item.removeAttribute( 'data-hidden' );
						item.style.display = '';
					} else {
						item.setAttribute( 'data-hidden', 'true' );
						/* Let the CSS transition finish, then hide */
						setTimeout( function () {
							if ( item.getAttribute( 'data-hidden' ) === 'true' ) {
								item.style.display = 'none';
							}
						}, 310 );
					}
				} );
			} );

			tab.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'Enter' || e.key === ' ' ) {
					e.preventDefault();
					tab.click();
				}
			} );
		} );
	}

	/* ===========================
	 * Lightbox
	 * =========================== */
	var lightbox = null;
	var lightboxImg = null;

	function createLightbox() {
		lightbox = document.createElement( 'div' );
		lightbox.className = 'gallery-lightbox';
		lightbox.setAttribute( 'role', 'dialog' );
		lightbox.setAttribute( 'aria-label', 'Image lightbox' );
		lightbox.setAttribute( 'data-active', 'false' );

		lightboxImg = document.createElement( 'img' );
		lightboxImg.alt = '';
		lightboxImg.loading = 'lazy';
		lightboxImg.decoding = 'async';
		lightbox.appendChild( lightboxImg );

		/* Close button */
		var closeBtn = document.createElement( 'button' );
		closeBtn.type = 'button';
		closeBtn.className =
			'absolute top-[1.5rem] right-[1.5rem] text-white/80 hover:text-white transition-colors';
		closeBtn.setAttribute( 'aria-label', 'Close lightbox' );
		closeBtn.innerHTML =
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
		closeBtn.addEventListener( 'click', closeLightbox );
		lightbox.appendChild( closeBtn );

		/* Close on backdrop click */
		lightbox.addEventListener( 'click', function ( e ) {
			if ( e.target === lightbox ) {
				closeLightbox();
			}
		} );

		/* Close on Escape */
		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && lightbox.getAttribute( 'data-active' ) === 'true' ) {
				closeLightbox();
			}
		} );

		block.appendChild( lightbox );
	}

	function openLightbox( src, alt ) {
		if ( ! lightbox ) {
			createLightbox();
		}
		lightboxImg.src = src;
		lightboxImg.alt = alt || '';
		lightbox.style.display = 'flex';

		/* Force reflow before transition */
		void lightbox.offsetHeight;
		lightbox.setAttribute( 'data-active', 'true' );
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		if ( ! lightbox ) return;
		lightbox.setAttribute( 'data-active', 'false' );
		document.body.style.overflow = '';

		setTimeout( function () {
			lightbox.style.display = 'none';
		}, 310 );
	}

	/* Bind click on images for lightbox */
	var allImages = block.querySelectorAll( '[data-gallery-item] img' );
	allImages.forEach( function ( img ) {
		img.style.cursor = 'zoom-in';
		img.setAttribute( 'tabindex', '0' );
		img.setAttribute( 'role', 'button' );
		img.setAttribute( 'aria-label', 'Open image: ' + ( img.alt || 'gallery image' ) );

		img.addEventListener( 'click', function () {
			openLightbox( img.src, img.alt );
		} );

		img.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Enter' || e.key === ' ' ) {
				e.preventDefault();
				openLightbox( img.src, img.alt );
			}
		} );
	} );
}

/* Init all Gallery blocks */
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', function () {
		document
			.querySelectorAll( '[data-gallery-block]' )
			.forEach( initGallery );
	} );
} else {
	document
		.querySelectorAll( '[data-gallery-block]' )
		.forEach( initGallery );
}
