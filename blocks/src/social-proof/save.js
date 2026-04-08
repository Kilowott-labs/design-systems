import { Fragment } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Star SVG component — reused across reviews style.
 */
const StarIcon = ( { size = '0.875rem' } ) => (
	<svg
		aria-hidden="true"
		focusable="false"
		className={ `w-[${ size }] h-[${ size }] shrink-0` }
		fill="currentColor"
		viewBox="0 0 24 24"
	>
		<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
	</svg>
);

/**
 * Arrow-right SVG for links.
 */
const ArrowRight = ( { className } ) => (
	<svg
		aria-hidden="true"
		focusable="false"
		className={ className }
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		viewBox="0 0 24 24"
	>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

/**
 * Colors — every style x colorMode combination.
 */
const STYLE_COLORS = {
	'logo-ticker': {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			badgeText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			logoText: 'text-[var(--wp--preset--color--grey-light)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			badgeText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			logoText: 'text-[var(--wp--preset--color--surface-dark)]',
		},
	},
	testimonials: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			headingText: 'text-[var(--wp--preset--color--foreground)]',
			mutedText: 'text-[var(--wp--preset--color--foreground-muted)]',
			cardBg: 'bg-[var(--wp--preset--color--white)]',
			cardBorder: 'border-[var(--wp--preset--color--border)]',
			quoteText: 'text-[var(--wp--preset--color--body-text)]',
			authorName: 'text-[var(--wp--preset--color--foreground)]',
			authorRole: 'text-[var(--wp--preset--color--foreground-subtle)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			headingText: 'text-[var(--wp--preset--color--white)]',
			mutedText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border-[var(--wp--preset--color--border-dark)]',
			quoteText: 'text-[var(--wp--preset--color--foreground-on-dark)]',
			authorName: 'text-[var(--wp--preset--color--white)]',
			authorRole: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
	},
	stats: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			valueText: 'text-[var(--wp--preset--color--foreground)]',
			labelText: 'text-[var(--wp--preset--color--foreground-muted)]',
			divider: 'bg-[var(--wp--preset--color--border)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			valueText: 'text-[var(--wp--preset--color--white)]',
			labelText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			divider: 'bg-[var(--wp--preset--color--divider-dark)]',
		},
	},
	reviews: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			headingText: 'text-[var(--wp--preset--color--foreground)]',
			mutedText: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtleText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			cardBg: 'bg-[var(--wp--preset--color--review-bg)]',
			cardBorder: 'border-[var(--wp--preset--color--review-border)]',
			quoteText: 'text-[var(--wp--preset--color--body-text)]',
			authorName: 'text-[var(--wp--preset--color--foreground)]',
			starColor: 'text-[var(--wp--preset--color--star-yellow)]',
			ratingText: 'text-[var(--wp--preset--color--foreground)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			headingText: 'text-[var(--wp--preset--color--white)]',
			mutedText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtleText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border-[var(--wp--preset--color--border-dark)]',
			quoteText: 'text-[var(--wp--preset--color--foreground-on-dark)]',
			authorName: 'text-[var(--wp--preset--color--white)]',
			starColor: 'text-[var(--wp--preset--color--star-yellow)]',
			ratingText: 'text-[var(--wp--preset--color--white)]',
		},
	},
	'case-studies': {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			overline: 'text-[var(--wp--preset--color--muted-on-dark)]',
			headingText: 'text-[var(--wp--preset--color--near-black)]',
			cardBg: 'bg-[var(--wp--preset--color--white)]',
			cardBorder: 'border-[var(--wp--preset--color--border-warm)]',
			companyText: 'text-[var(--wp--preset--color--terracotta)]',
			titleText: 'text-[var(--wp--preset--color--near-black)]',
			quoteText: 'text-[var(--wp--preset--color--muted-warm)]',
			linkText: 'text-[var(--wp--preset--color--terracotta)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			overline: 'text-[var(--wp--preset--color--muted-on-dark)]',
			headingText: 'text-[var(--wp--preset--color--white)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border-[var(--wp--preset--color--border-dark)]',
			companyText: 'text-[var(--wp--preset--color--accent-light)]',
			titleText: 'text-[var(--wp--preset--color--white)]',
			quoteText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			linkText: 'text-[var(--wp--preset--color--accent-light)]',
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
		badgeText,
		overlineText,
		ratingValue,
		reviewCount,
		ctaText,
		ctaUrl,
		logos,
		testimonials,
		stats,
		reviews,
		caseStudies,
	} = attributes;

	const c =
		( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) ||
		STYLE_COLORS.testimonials.light;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[2rem] md:py-[3rem] lg:py-[4rem]`,
	} );

	/* =========================================
	 * STYLE: Logo Ticker
	 * ========================================= */
	if ( style === 'logo-ticker' ) {
		return (
			<section
				{ ...blockProps }
				aria-label={ badgeText }
				data-social-proof=""
				data-style="logo-ticker"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col items-center gap-[1.25rem]">
					<p
						className={ `text-[0.6875rem] font-semibold tracking-[0.125rem] ${ c.badgeText } font-[family-name:var(--wp--preset--font-family--inter)] uppercase` }
					>
						{ badgeText }
					</p>
					<div
						className="w-full overflow-hidden"
						aria-hidden="true"
						data-ticker-track=""
					>
						<div className="sp-ticker-track flex items-center gap-[3.5rem] whitespace-nowrap">
							{ logos.map( ( logo ) => (
								<span
									key={ logo.id }
									className={ `text-[1.25rem] font-bold tracking-[0.125rem] ${ c.logoText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
								>
									{ logo.name }
								</span>
							) ) }
							{ /* Duplicate for seamless loop */ }
							{ logos.map( ( logo ) => (
								<span
									key={ `dup-${ logo.id }` }
									className={ `text-[1.25rem] font-bold tracking-[0.125rem] ${ c.logoText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
								>
									{ logo.name }
								</span>
							) ) }
						</div>
					</div>
				</div>
			</section>
		);
	}

	/* =========================================
	 * STYLE: Testimonial Cards
	 * ========================================= */
	if ( style === 'testimonials' ) {
		return (
			<section
				{ ...blockProps }
				aria-labelledby="sp-testimonials-heading"
				data-social-proof=""
				data-style="testimonials"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col gap-[2.5rem]">
					<header className="flex flex-col items-center text-center gap-[0.75rem]">
						<RichText.Content
							tagName="h2"
							value={ heading }
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.headingText } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
							id="sp-testimonials-heading"
						/>
						{ showDescription && (
							<RichText.Content
								tagName="p"
								value={ description }
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.mutedText } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[35rem] leading-relaxed` }
							/>
						) }
					</header>
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.25rem] list-none p-0">
						{ testimonials.map( ( item ) => (
							<li key={ item.id }>
								<blockquote
									className={ `flex flex-col justify-between h-full rounded-[1rem] ${ c.cardBg } border ${ c.cardBorder } p-[1.75rem] gap-[1.25rem]` }
								>
									<p
										className={ `text-[0.9375rem] leading-[1.65] ${ c.quoteText } font-[family-name:var(--wp--preset--font-family--inter)]` }
									>
										{ `\u201C${ item.quote }\u201D` }
									</p>
									<footer className="flex items-center gap-[0.75rem]">
										{ item.avatarUrl && (
											<img
												src={ item.avatarUrl }
												alt={ `${ item.authorName }, ${ item.authorRole }` }
												width="40"
												height="40"
												loading="lazy"
												decoding="async"
												className="rounded-full object-cover w-[2.5rem] h-[2.5rem]"
											/>
										) }
										<div className="flex flex-col gap-[0.125rem]">
											<cite
												className={ `not-italic text-[0.8125rem] font-semibold ${ c.authorName } font-[family-name:var(--wp--preset--font-family--inter)]` }
											>
												{ item.authorName }
											</cite>
											<span
												className={ `text-[0.75rem] ${ c.authorRole } font-[family-name:var(--wp--preset--font-family--inter)]` }
											>
												{ item.authorRole }
											</span>
										</div>
									</footer>
								</blockquote>
							</li>
						) ) }
					</ul>
				</div>
			</section>
		);
	}

	/* =========================================
	 * STYLE: Stats Counter
	 * ========================================= */
	if ( style === 'stats' ) {
		return (
			<section
				{ ...blockProps }
				aria-label="Key statistics"
				data-social-proof=""
				data-style="stats"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto">
					<ul className="flex flex-col md:flex-row items-center justify-between gap-[2rem] md:gap-0 list-none p-0">
						{ stats.map( ( stat, index ) => (
							<Fragment key={ stat.id }>
								{ index > 0 && (
									<li
										className={ `hidden md:block w-[0.0625rem] h-[3.5rem] ${ c.divider }` }
										role="presentation"
										aria-hidden="true"
									/>
								) }
								<li
									className="sp-stat-item flex flex-col items-center gap-[0.25rem]"
								>
									<span
										className={ `text-[2.75rem] font-bold tracking-[-0.094rem] ${ c.valueText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
									>
										{ stat.value }
									</span>
									<span
										className={ `text-[0.875rem] ${ c.labelText } font-[family-name:var(--wp--preset--font-family--inter)]` }
									>
										{ stat.label }
									</span>
								</li>
							</Fragment>
						) ) }
					</ul>
				</div>
			</section>
		);
	}

	/* =========================================
	 * STYLE: Review Highlights
	 * ========================================= */
	if ( style === 'reviews' ) {
		return (
			<section
				{ ...blockProps }
				aria-labelledby="sp-reviews-heading"
				data-social-proof=""
				data-style="reviews"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col gap-[2.25rem]">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[1rem]">
						<header className="flex flex-col gap-[0.5rem]">
							<RichText.Content
								tagName="h2"
								value={ heading }
								className={ `text-[1.75rem] md:text-[2rem] font-bold tracking-[-0.05rem] ${ c.headingText } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
								id="sp-reviews-heading"
							/>
							{ showDescription && (
								<RichText.Content
									tagName="p"
									value={ description }
									className={ `text-[0.9375rem] ${ c.mutedText } font-[family-name:var(--wp--preset--font-family--inter)]` }
								/>
							) }
						</header>
						<div className="flex items-center gap-[0.75rem]">
							<div
								className={ `flex items-center gap-[0.25rem] ${ c.starColor }` }
								aria-label={ ratingValue }
							>
								{ [ 1, 2, 3, 4, 5 ].map( ( n ) => (
									<StarIcon key={ n } size="1.25rem" />
								) ) }
							</div>
							<span
								className={ `text-[0.875rem] font-semibold ${ c.ratingText } font-[family-name:var(--wp--preset--font-family--inter)]` }
							>
								{ ratingValue }
							</span>
							<span
								className={ `text-[0.875rem] ${ c.subtleText } font-[family-name:var(--wp--preset--font-family--inter)]` }
							>
								{ `\u00B7 ${ reviewCount }` }
							</span>
						</div>
					</div>
					<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.25rem] list-none p-0">
						{ reviews.map( ( review ) => (
							<li key={ review.id }>
								<article
									className={ `flex flex-col justify-between h-full rounded-[0.75rem] ${ c.cardBg } border ${ c.cardBorder } p-[1.5rem] gap-[1rem]` }
								>
									<div
										className={ `flex items-center gap-[0.1875rem] ${ c.starColor }` }
										aria-label="5 out of 5 stars"
									>
										{ [ 1, 2, 3, 4, 5 ].map( ( n ) => (
											<StarIcon
												key={ n }
												size="0.875rem"
											/>
										) ) }
									</div>
									<p
										className={ `text-[0.875rem] leading-[1.6] ${ c.quoteText } font-[family-name:var(--wp--preset--font-family--inter)]` }
									>
										{ `\u201C${ review.quote }\u201D` }
									</p>
									<div className="flex items-center gap-[0.5rem]">
										<span
											className={ `text-[0.75rem] font-semibold ${ c.authorName } font-[family-name:var(--wp--preset--font-family--inter)]` }
										>
											{ review.authorName }
										</span>
										<span
											className={ `text-[0.75rem] ${ c.subtleText } font-[family-name:var(--wp--preset--font-family--inter)]` }
										>
											{ review.source }
										</span>
									</div>
								</article>
							</li>
						) ) }
					</ul>
				</div>
			</section>
		);
	}

	/* =========================================
	 * STYLE: Case Study Preview
	 * ========================================= */
	if ( style === 'case-studies' ) {
		return (
			<section
				{ ...blockProps }
				aria-labelledby="sp-case-studies-heading"
				data-social-proof=""
				data-style="case-studies"
				data-color-mode={ colorMode }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col gap-[2.5rem]">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[1rem]">
						<header className="flex flex-col gap-[0.5rem]">
							<span
								className={ `text-[0.6875rem] font-bold tracking-[0.156rem] ${ c.overline } font-[family-name:var(--wp--preset--font-family--inter)] uppercase` }
							>
								{ overlineText }
							</span>
							<RichText.Content
								tagName="h2"
								value={ heading }
								className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-normal tracking-[-0.045rem] ${ c.headingText } font-[family-name:var(--wp--preset--font-family--playfair)] leading-tight` }
								id="sp-case-studies-heading"
							/>
						</header>
						{ ctaUrl && (
							<a
								href={ ctaUrl }
								className={ `flex items-center gap-[0.375rem] text-[0.875rem] font-semibold ${ c.linkText } font-[family-name:var(--wp--preset--font-family--inter)] hover:opacity-80 transition-opacity` }
							>
								{ ctaText }
								<ArrowRight className="w-[1rem] h-[1rem]" />
							</a>
						) }
					</div>
					<ul className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem] list-none p-0">
						{ caseStudies.map( ( cs ) => (
							<li key={ cs.id }>
								<article
									className={ `flex flex-col md:flex-row h-full rounded-[1rem] ${ c.cardBg } border ${ c.cardBorder } overflow-hidden` }
								>
									{ cs.imageUrl && (
										<div className="md:w-[17.5rem] shrink-0 h-[12rem] md:h-auto">
											<img
												src={ cs.imageUrl }
												alt={ `${ cs.company } case study` }
												width="280"
												height="400"
												loading="lazy"
												decoding="async"
												className="w-full h-full object-cover"
											/>
										</div>
									) }
									<div className="flex flex-col justify-center gap-[1rem] p-[1.75rem]">
										<span
											className={ `text-[0.6875rem] font-bold tracking-[0.125rem] ${ c.companyText } font-[family-name:var(--wp--preset--font-family--inter)] uppercase` }
										>
											{ cs.company }
										</span>
										<h3
											className={ `text-[1.25rem] font-bold tracking-[-0.025rem] leading-[1.3] ${ c.titleText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
										>
											{ cs.title }
										</h3>
										<p
											className={ `text-[0.875rem] italic ${ c.quoteText } font-[family-name:var(--wp--preset--font-family--inter)]` }
										>
											{ `\u201C${ cs.pullQuote }\u201D` }
										</p>
										{ cs.linkUrl && (
											<a
												href={ cs.linkUrl }
												className={ `flex items-center gap-[0.375rem] text-[0.8125rem] font-semibold ${ c.linkText } font-[family-name:var(--wp--preset--font-family--inter)] hover:opacity-80 transition-opacity` }
											>
												{ cs.linkText }
												<ArrowRight className="w-[0.875rem] h-[0.875rem]" />
											</a>
										) }
									</div>
								</article>
							</li>
						) ) }
					</ul>
				</div>
			</section>
		);
	}

	/* Fallback — should not happen */
	return (
		<section { ...blockProps } data-social-proof="" data-style={ style } data-color-mode={ colorMode }>
			<div className="max-w-[80rem] mx-auto">
				<p>Social Proof block — unknown style variant.</p>
			</div>
		</section>
	);
}
