import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Arrow icon used on primary CTA buttons.
 */
const ArrowIcon = () => (
	<svg
		className="w-[1.125rem] h-[1.125rem]"
		aria-hidden="true"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

/**
 * Mail icon for the newsletter form input.
 */
const MailIcon = () => (
	<svg
		className="w-[1.125rem] h-[1.125rem] text-[var(--wp--preset--color--foreground-subtle)] shrink-0"
		aria-hidden="true"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
	</svg>
);

/**
 * Lock icon for privacy notice.
 */
const LockIcon = () => (
	<svg
		className="w-[0.75rem] h-[0.75rem] text-[var(--wp--preset--color--foreground-subtle)]"
		aria-hidden="true"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
		width="12"
		height="12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
		<path d="M7 11V7a5 5 0 0 1 10 0v4" />
	</svg>
);

/**
 * Structure — controls shape/spacing per style variant. No color values.
 */
const STYLE_STRUCTURE = {
	banner: {
		layout: 'centered',
		hasImage: false,
		hasForm: false,
		hasTestimonial: false,
	},
	split: {
		layout: 'split-image',
		hasImage: true,
		hasForm: false,
		hasTestimonial: false,
	},
	card: {
		layout: 'card',
		hasImage: false,
		hasForm: false,
		hasTestimonial: false,
	},
	newsletter: {
		layout: 'centered',
		hasImage: false,
		hasForm: true,
		hasTestimonial: false,
	},
	testimonial: {
		layout: 'split-testimonial',
		hasImage: false,
		hasForm: false,
		hasTestimonial: true,
	},
};

/**
 * Colors — every style x colorMode combination fully resolved.
 * Access: STYLE_COLORS[ style ][ colorMode ]
 */
const STYLE_COLORS = {
	banner: {
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--accent)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--surface-dark)] text-[var(--wp--preset--color--foreground-on-dark)]',
		},
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground)]',
		},
	},
	split: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'text-[var(--wp--preset--color--foreground)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--accent)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'text-[var(--wp--preset--color--accent-light)]',
		},
	},
	card: {
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[rgba(255,255,255,0.8)]',
			cardBg: 'bg-gradient-to-r from-[var(--wp--preset--color--accent)] to-[#7C3AED]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--accent)]',
			secondaryBtn: 'border border-[rgba(255,255,255,0.4)] text-[var(--wp--preset--color--white)]',
		},
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[rgba(255,255,255,0.8)]',
			cardBg: 'bg-gradient-to-r from-[var(--wp--preset--color--accent)] to-[#7C3AED]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--accent)]',
			secondaryBtn: 'border border-[rgba(255,255,255,0.4)] text-[var(--wp--preset--color--white)]',
		},
	},
	newsletter: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			formBorder: 'border-[var(--wp--preset--color--border)]',
			submitBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			formBorder: 'border-[var(--wp--preset--color--border-dark)]',
			submitBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
		},
	},
	testimonial: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			divider: 'bg-[var(--wp--preset--color--border)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			divider: 'bg-[var(--wp--preset--color--border-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--white)]',
		},
	},
};

export default function save( { attributes } ) {
	const {
		style,
		colorMode,
		heading,
		description,
		showDescription,
		primaryButtonText,
		primaryButtonUrl,
		showPrimaryArrow,
		secondaryButtonText,
		secondaryButtonUrl,
		showSecondaryButton,
		imageUrl,
		imageAlt,
		newsletterPlaceholder,
		newsletterButtonText,
		newsletterPrivacyText,
		testimonialQuote,
		testimonialAuthor,
		testimonialCompany,
		testimonialAvatarUrl,
	} = attributes;

	const struct = STYLE_STRUCTURE[ style ] || STYLE_STRUCTURE.banner;
	const c = ( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) || STYLE_COLORS.banner.dark;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem]`,
	} );

	/* ──────────────────────────────────────────────────────────
	 * CTA 1 — Banner (centered)
	 * ────────────────────────────────────────────────────────── */
	if ( style === 'banner' ) {
		return (
			<section
				{ ...blockProps }
				aria-label="Call to action banner"
				data-cta-block=""
				data-style="banner"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col items-center text-center gap-[1.5rem]">
					<RichText.Content
						tagName="h2"
						value={ heading }
						className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-bold tracking-[-0.03em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
					/>
					{ showDescription && (
						<RichText.Content
							tagName="p"
							value={ description }
							className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.6] max-w-[35rem]` }
						/>
					) }
					<div className="flex flex-wrap items-center justify-center gap-[0.75rem]">
						<a
							href={ primaryButtonUrl || '#' }
							className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.primaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] md:text-[1rem] font-bold tracking-[-0.02em] px-[2.25rem] py-[1rem] transition-opacity duration-200 hover:opacity-80` }
						>
							{ primaryButtonText }
							{ showPrimaryArrow && <ArrowIcon /> }
						</a>
						{ showSecondaryButton && (
							<a
								href={ secondaryButtonUrl || '#' }
								className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.secondaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] md:text-[1rem] font-semibold tracking-[-0.02em] px-[2.25rem] py-[1rem] transition-opacity duration-200 hover:opacity-80` }
							>
								{ secondaryButtonText }
							</a>
						) }
					</div>
				</div>
			</section>
		);
	}

	/* ──────────────────────────────────────────────────────────
	 * CTA 2 — Split with Image
	 * ────────────────────────────────────────────────────────── */
	if ( style === 'split' ) {
		return (
			<section
				{ ...blockProps }
				aria-label="Call to action with image"
				data-cta-block=""
				data-style="split"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col lg:flex-row items-center gap-[2.5rem] lg:gap-[4rem]">
					<div className="flex-1 flex flex-col gap-[1.5rem]">
						<RichText.Content
							tagName="h2"
							value={ heading }
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-normal tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--playfair)] leading-[1.2]` }
						/>
						{ showDescription && (
							<RichText.Content
								tagName="p"
								value={ description }
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.65] max-w-[27.5rem]` }
							/>
						) }
						<div className="flex flex-wrap items-center gap-[1rem]">
							<a
								href={ primaryButtonUrl || '#' }
								className={ `inline-flex items-center gap-[0.5rem] rounded-[0.75rem] ${ c.primaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] font-bold tracking-[-0.02em] px-[2rem] py-[1rem] transition-opacity duration-200 hover:opacity-80` }
							>
								{ primaryButtonText }
								{ showPrimaryArrow && <ArrowIcon /> }
							</a>
							{ showSecondaryButton && (
								<a
									href={ secondaryButtonUrl || '#' }
									className={ `inline-flex items-center gap-[0.5rem] ${ c.secondaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] font-semibold tracking-[-0.02em] transition-opacity duration-200 hover:opacity-70` }
								>
									{ secondaryButtonText }
									<ArrowIcon />
								</a>
							) }
						</div>
					</div>
					{ imageUrl && (
						<div className="w-full lg:w-[30rem] shrink-0">
							<img
								src={ imageUrl }
								alt={ imageAlt }
								width="480"
								height="340"
								loading="lazy"
								decoding="async"
								className="w-full h-auto rounded-[1rem] object-cover aspect-[480/340]"
							/>
						</div>
					) }
				</div>
			</section>
		);
	}

	/* ──────────────────────────────────────────────────────────
	 * CTA 3 — Inline Card
	 * ────────────────────────────────────────────────────────── */
	if ( style === 'card' ) {
		return (
			<section
				{ ...blockProps }
				className={ `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem] flex items-center justify-center` }
				aria-label="Get started for free"
				data-cta-block=""
				data-style="card"
				data-color-mode={ colorMode }
			>
				<div className={ `max-w-[68.75rem] w-full rounded-[1.25rem] ${ c.cardBg } px-[2rem] md:px-[3.5rem] py-[2.5rem] md:py-[3rem] flex flex-col lg:flex-row items-center justify-between gap-[2rem]` }>
					<div className="flex flex-col gap-[0.75rem]">
						<RichText.Content
							tagName="h2"
							value={ heading }
							className={ `text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
						/>
						{ showDescription && (
							<RichText.Content
								tagName="p"
								value={ description }
								className={ `text-[0.875rem] md:text-[0.9375rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.6]` }
							/>
						) }
					</div>
					<div className="flex flex-wrap items-center gap-[0.75rem] shrink-0">
						<a
							href={ primaryButtonUrl || '#' }
							className={ `inline-flex items-center rounded-[0.625rem] ${ c.primaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] font-bold tracking-[-0.02em] px-[2rem] py-[0.875rem] transition-opacity duration-200 hover:opacity-90` }
						>
							{ primaryButtonText }
						</a>
						{ showSecondaryButton && (
							<a
								href={ secondaryButtonUrl || '#' }
								className={ `inline-flex items-center rounded-[0.625rem] ${ c.secondaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] font-semibold tracking-[-0.02em] px-[2rem] py-[0.875rem] transition-opacity duration-200 hover:opacity-80` }
							>
								{ secondaryButtonText }
							</a>
						) }
					</div>
				</div>
			</section>
		);
	}

	/* ──────────────────────────────────────────────────────────
	 * CTA 4 — Newsletter Signup
	 * ────────────────────────────────────────────────────────── */
	if ( style === 'newsletter' ) {
		return (
			<section
				{ ...blockProps }
				className={ `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem] flex flex-col items-center justify-center text-center` }
				aria-label="Newsletter signup"
				data-cta-block=""
				data-style="newsletter"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col items-center gap-[1.5rem]">
					<RichText.Content
						tagName="h2"
						value={ heading }
						className={ `text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
					/>
					{ showDescription && (
						<RichText.Content
							tagName="p"
							value={ description }
							className={ `text-[0.875rem] md:text-[0.9375rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.6] max-w-[30rem]` }
						/>
					) }
					<form
						className={ `flex items-center rounded-[0.625rem] border ${ c.formBorder } overflow-hidden w-full max-w-[24rem]` }
						data-cta-form=""
					>
						<div className="flex items-center gap-[0.625rem] px-[1.125rem] flex-1">
							<MailIcon />
							<input
								type="email"
								placeholder={ newsletterPlaceholder }
								required
								className={ `flex-1 py-[0.75rem] text-[0.875rem] font-[family-name:var(--wp--preset--font-family--inter)] ${ c.text } placeholder:text-[var(--wp--preset--color--foreground-subtle)] outline-none bg-transparent` }
								aria-label="Email address"
							/>
						</div>
						<button
							type="submit"
							className={ `${ c.submitBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.875rem] font-semibold tracking-[-0.02em] px-[1.5rem] py-[0.75rem] h-[3rem] transition-opacity duration-200 hover:opacity-80` }
						>
							{ newsletterButtonText }
						</button>
					</form>
					<div className="flex items-center gap-[0.375rem]" aria-live="polite" data-cta-status="">
						<LockIcon />
						<p className="text-[0.75rem] text-[var(--wp--preset--color--foreground-subtle)] font-[family-name:var(--wp--preset--font-family--inter)]">
							{ newsletterPrivacyText }
						</p>
					</div>
				</div>
			</section>
		);
	}

	/* ──────────────────────────────────────────────────────────
	 * CTA 5 — Final CTA + Testimonial
	 * ────────────────────────────────────────────────────────── */
	if ( style === 'testimonial' ) {
		return (
			<section
				{ ...blockProps }
				aria-label="Start your free trial"
				data-cta-block=""
				data-style="testimonial"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col lg:flex-row items-center gap-[2.5rem] lg:gap-[5rem]">
					<div className="flex-1 flex flex-col gap-[1.5rem]">
						<RichText.Content
							tagName="h2"
							value={ heading }
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-bold tracking-[-0.03em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
						/>
						{ showDescription && (
							<RichText.Content
								tagName="p"
								value={ description }
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.6] max-w-[27.5rem]` }
							/>
						) }
						<div className="flex flex-wrap items-center gap-[0.75rem]">
							<a
								href={ primaryButtonUrl || '#' }
								className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.primaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] md:text-[1rem] font-bold tracking-[-0.02em] px-[2.25rem] py-[1rem] transition-opacity duration-200 hover:opacity-80` }
							>
								{ primaryButtonText }
								{ showPrimaryArrow && <ArrowIcon /> }
							</a>
							{ showSecondaryButton && (
								<a
									href={ secondaryButtonUrl || '#' }
									className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.secondaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] md:text-[1rem] font-semibold tracking-[-0.02em] px-[2.25rem] py-[1rem] transition-opacity duration-200 hover:opacity-80` }
								>
									{ secondaryButtonText }
								</a>
							) }
						</div>
					</div>
					<div
						className={ `hidden lg:block w-px h-[13.75rem] ${ c.divider }` }
						role="presentation"
						aria-hidden="true"
					></div>
					<div className="flex-1 flex flex-col gap-[1.25rem]">
						<blockquote className="flex flex-col gap-[1.25rem]">
							<span
								className={ `text-[4rem] leading-[0.5] ${ c.accent } font-[family-name:var(--wp--preset--font-family--playfair)]` }
								aria-hidden="true"
							>
								&ldquo;
							</span>
							<RichText.Content
								tagName="p"
								value={ testimonialQuote }
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.text } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.65]` }
							/>
							<footer className="flex items-center gap-[0.75rem]">
								{ testimonialAvatarUrl && (
									<img
										src={ testimonialAvatarUrl }
										alt={ testimonialAuthor }
										width="40"
										height="40"
										loading="lazy"
										decoding="async"
										className="w-[2.5rem] h-[2.5rem] rounded-full object-cover"
									/>
								) }
								<div className="flex flex-col gap-[0.125rem]">
									<cite className={ `not-italic text-[0.8125rem] font-semibold ${ c.text } font-[family-name:var(--wp--preset--font-family--inter)]` }>
										{ testimonialAuthor }
									</cite>
									<span className={ `text-[0.75rem] ${ c.subtle } font-[family-name:var(--wp--preset--font-family--inter)]` }>
										{ testimonialCompany }
									</span>
								</div>
							</footer>
						</blockquote>
					</div>
				</div>
			</section>
		);
	}

	/* Fallback — should never render */
	return (
		<section { ...blockProps } data-cta-block="" data-style={ style } data-color-mode={ colorMode }>
			<div className="max-w-[80rem] mx-auto">
				<RichText.Content tagName="h2" value={ heading } className={ c.text } />
			</div>
		</section>
	);
}
