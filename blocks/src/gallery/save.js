import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Arrow icon — reused in "View All" links.
 */
const ArrowRight = () => (
	<svg
		className="w-[1rem] h-[1rem]"
		aria-hidden="true"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
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

const ArrowUpRight = () => (
	<svg
		className="w-[0.875rem] h-[0.875rem]"
		aria-hidden="true"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="7" y1="17" x2="17" y2="7" />
		<polyline points="7 7 17 7 17 17" />
	</svg>
);

/**
 * Structure — controls shape, spacing, layout per style variant.
 * No color values here.
 */
const STYLE_STRUCTURE = {
	masonry: {
		headerAlign: 'center',
		gridLayout: 'masonry',
		showOverlay: true,
		showCardContent: false,
		showMeta: false,
		showLink: false,
		showTag: false,
		featuredLayout: false,
	},
	cards: {
		headerAlign: 'split',
		gridLayout: 'uniform',
		showOverlay: false,
		showCardContent: true,
		showMeta: false,
		showLink: true,
		showTag: true,
		featuredLayout: false,
	},
	featured: {
		headerAlign: 'split',
		gridLayout: 'featured',
		showOverlay: false,
		showCardContent: true,
		showMeta: true,
		showLink: false,
		showTag: false,
		featuredLayout: true,
	},
	showcase: {
		headerAlign: 'center',
		gridLayout: 'uniform',
		showOverlay: false,
		showCardContent: true,
		showMeta: false,
		showLink: false,
		showTag: false,
		featuredLayout: false,
	},
	portfolio: {
		headerAlign: 'center',
		gridLayout: 'uniform',
		showOverlay: false,
		showCardContent: true,
		showMeta: true,
		showLink: false,
		showTag: false,
		featuredLayout: false,
	},
};

/**
 * Colors — every style x colorMode combination fully resolved.
 * Access: STYLE_COLORS[ style ][ colorMode ]
 */
const STYLE_COLORS = {
	masonry: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			cardBg: '',
			cardBorder: '',
			overlayTitle: 'text-[var(--wp--preset--color--white)]',
			overlayMeta: 'text-white/70',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			tabActive: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--foreground)]',
			tagBg: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			dotColor: 'text-[var(--wp--preset--color--border)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: '',
			cardBorder: '',
			overlayTitle: 'text-[var(--wp--preset--color--white)]',
			overlayMeta: 'text-white/70',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--white)]',
			tagBg: 'bg-[var(--wp--preset--color--surface-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			dotColor: 'text-[var(--wp--preset--color--border-dark)]',
		},
	},
	cards: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			cardBg: 'bg-[var(--wp--preset--color--white)]',
			cardBorder: 'border border-[var(--wp--preset--color--border)]',
			overlayTitle: '',
			overlayMeta: '',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			tabActive: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--foreground)]',
			tagBg: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			dotColor: 'text-[var(--wp--preset--color--border)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border border-[var(--wp--preset--color--border-dark)]',
			overlayTitle: '',
			overlayMeta: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--white)]',
			tagBg: 'bg-[var(--wp--preset--color--surface-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			dotColor: 'text-[var(--wp--preset--color--border-dark)]',
		},
	},
	featured: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			cardBg: '',
			cardBorder: '',
			overlayTitle: '',
			overlayMeta: '',
			badgeClasses: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			tabActive: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-warm)] text-[var(--wp--preset--color--foreground-muted)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--foreground)]',
			tagBg: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			dotColor: 'text-[var(--wp--preset--color--border-warm)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: '',
			cardBorder: '',
			overlayTitle: '',
			overlayMeta: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--white)]',
			tagBg: 'bg-[var(--wp--preset--color--surface-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			dotColor: 'text-[var(--wp--preset--color--border-dark)]',
		},
	},
	showcase: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--foreground)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--foreground-subtle)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: '',
			cardBorder: '',
			overlayTitle: '',
			overlayMeta: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--white)]',
			tagBg: 'bg-[var(--wp--preset--color--surface-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			dotColor: 'text-[var(--wp--preset--color--border-dark)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: '',
			cardBorder: '',
			overlayTitle: '',
			overlayMeta: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--white)]',
			tagBg: 'bg-[var(--wp--preset--color--surface-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			dotColor: 'text-[var(--wp--preset--color--border-dark)]',
		},
	},
	portfolio: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			cardBg: '',
			cardBorder: '',
			overlayTitle: '',
			overlayMeta: '',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			tabActive: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--foreground)]',
			tagBg: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			dotColor: 'text-[var(--wp--preset--color--border)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: '',
			cardBorder: '',
			overlayTitle: '',
			overlayMeta: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			viewAllText: 'text-[var(--wp--preset--color--white)]',
			tagBg: 'bg-[var(--wp--preset--color--surface-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			dotColor: 'text-[var(--wp--preset--color--border-dark)]',
		},
	},
};

export default function save( { attributes } ) {
	const {
		heading,
		description,
		showDescription,
		style,
		colorMode,
		showBadge,
		badgeText,
		showViewAll,
		viewAllText,
		viewAllUrl,
		showTabs,
		items,
		categories,
	} = attributes;

	const struct = STYLE_STRUCTURE[ style ] || STYLE_STRUCTURE.masonry;
	const c = ( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) || STYLE_COLORS.masonry.light;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem]`,
	} );

	/* Badge */
	const badge = showBadge ? (
		<span
			className={ `inline-flex items-center rounded-full px-[1rem] py-[0.375rem] text-[0.6875rem] font-semibold tracking-[0.1em] font-[family-name:var(--wp--preset--font-family--inter)] ${ c.badgeClasses }` }
		>
			{ badgeText }
		</span>
	) : null;

	/* View All link */
	const viewAllLink = showViewAll ? (
		<a
			href={ viewAllUrl || '#' }
			className={ `inline-flex items-center gap-[0.5rem] text-[0.875rem] font-semibold ${ c.viewAllText } font-[family-name:var(--wp--preset--font-family--inter)] hover:opacity-80 transition-opacity shrink-0` }
		>
			{ viewAllText }
			<ArrowRight />
		</a>
	) : null;

	/* Tabs */
	const tabs = showTabs ? (
		<nav
			aria-label="Portfolio filter categories"
			className="flex flex-wrap items-center justify-center gap-[0.5rem]"
			data-gallery-tabs=""
		>
			{ categories.map( ( cat, i ) => (
				<button
					key={ cat.id }
					type="button"
					className={ `rounded-full px-[1.25rem] py-[0.625rem] text-[0.875rem] font-[family-name:var(--wp--preset--font-family--inter)] transition-colors duration-200 ${
						i === 0 ? c.tabActive : c.tabInactive
					}` }
					aria-pressed={ i === 0 ? 'true' : 'false' }
					data-gallery-tab={ cat.slug }
				>
					{ cat.label }
				</button>
			) ) }
		</nav>
	) : null;

	/* Header — centered or split */
	const isCentered = struct.headerAlign === 'center';
	const headerContent = (
		<header
			className={ `flex flex-col ${
				isCentered
					? 'items-center text-center'
					: 'md:flex-row md:items-end md:justify-between'
			} gap-[0.75rem] md:gap-[1rem]` }
		>
			{ isCentered ? (
				<>
					{ badge }
					<RichText.Content
						tagName="h2"
						value={ heading }
						className={ `${ style === 'showcase' ? 'text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] tracking-[-0.03em]' : 'text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] tracking-tight' } font-bold ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
						id="gallery-heading"
					/>
					{ showDescription && (
						<RichText.Content
							tagName="p"
							value={ description }
							className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[30rem] leading-relaxed` }
						/>
					) }
				</>
			) : (
				<>
					<div className="flex flex-col gap-[0.5rem]">
						<RichText.Content
							tagName="h2"
							value={ heading }
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
							id="gallery-heading"
						/>
						{ showDescription && (
							<RichText.Content
								tagName="p"
								value={ description }
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-relaxed` }
							/>
						) }
					</div>
					{ viewAllLink }
				</>
			) }
		</header>
	);

	/* ======================== */
	/* Masonry item renderer    */
	/* ======================== */
	const renderMasonryItem = ( item ) => (
		<li key={ item.id } className="mb-[1.25rem] break-inside-avoid" data-gallery-item="" data-category={ item.category || '' }>
			<figure className="gallery-card relative overflow-hidden rounded-[0.75rem] group">
				{ item.image && (
					<img
						src={ item.image }
						alt={ item.alt || item.title }
						width="400"
						height="320"
						loading="lazy"
						decoding="async"
						className="w-full h-auto object-cover"
					/>
				) }
				<figcaption className="gallery-overlay absolute bottom-0 left-0 right-0 p-[1.25rem] flex flex-col gap-[0.25rem]">
					<span className={ `text-[0.9375rem] font-semibold tracking-[-0.02em] ${ c.overlayTitle } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
						{ item.title }
					</span>
					<span className={ `text-[0.75rem] font-medium ${ c.overlayMeta } font-[family-name:var(--wp--preset--font-family--inter)]` }>
						{ item.tag }
					</span>
				</figcaption>
			</figure>
		</li>
	);

	/* ======================== */
	/* Cards item renderer      */
	/* ======================== */
	const renderCardItem = ( item ) => (
		<li key={ item.id } data-gallery-item="" data-category={ item.category || '' }>
			<article className={ `overflow-hidden rounded-[0.75rem] ${ c.cardBg } ${ c.cardBorder } h-full flex flex-col` }>
				<div className="aspect-[4/3] overflow-hidden">
					{ item.image && (
						<img
							src={ item.image }
							alt={ item.alt || item.title }
							width="400"
							height="300"
							loading="lazy"
							decoding="async"
							className="w-full h-full object-cover gallery-card-img"
						/>
					) }
				</div>
				<div className="flex flex-col gap-[0.625rem] p-[1rem_1.25rem]">
					{ struct.showTag && item.tag && (
						<span className={ `inline-flex self-start items-center rounded-full px-[0.625rem] py-[0.25rem] text-[0.6875rem] font-semibold ${ c.tagBg } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ item.tag }
						</span>
					) }
					<h3 className={ `text-[1.125rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
						{ item.title }
					</h3>
					{ item.description && (
						<p className={ `text-[0.8125rem] leading-[1.6] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ item.description }
						</p>
					) }
					{ struct.showLink && item.link && (
						<a
							href={ item.link }
							className={ `inline-flex items-center gap-[0.375rem] text-[0.8125rem] font-semibold ${ c.accent } font-[family-name:var(--wp--preset--font-family--inter)] hover:opacity-80 transition-opacity` }
						>
							View Project
							<ArrowUpRight />
						</a>
					) }
				</div>
			</article>
		</li>
	);

	/* ======================== */
	/* Showcase item renderer   */
	/* ======================== */
	const renderShowcaseItem = ( item ) => (
		<li key={ item.id } data-gallery-item="" data-category={ item.category || '' }>
			<article className="flex flex-col gap-[1rem]">
				<div className="overflow-hidden rounded-[0.75rem] aspect-[4/3]">
					{ item.image && (
						<img
							src={ item.image }
							alt={ item.alt || item.title }
							width="400"
							height="320"
							loading="lazy"
							decoding="async"
							className="w-full h-full object-cover gallery-card-img"
						/>
					) }
				</div>
				<div className="flex flex-col gap-[0.375rem]">
					<h3 className={ `text-[1.125rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
						{ item.title }
					</h3>
					{ item.description && (
						<p className={ `text-[0.875rem] leading-[1.6] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ item.description }
						</p>
					) }
				</div>
			</article>
		</li>
	);

	/* ======================== */
	/* Portfolio item renderer  */
	/* ======================== */
	const renderPortfolioItem = ( item ) => (
		<li key={ item.id } data-gallery-item="" data-category={ item.category || '' }>
			<article className="flex flex-col gap-[0.875rem]">
				<div className="overflow-hidden rounded-[0.75rem] aspect-[4/3]">
					{ item.image && (
						<img
							src={ item.image }
							alt={ item.alt || item.title }
							width="400"
							height="300"
							loading="lazy"
							decoding="async"
							className="w-full h-full object-cover gallery-card-img"
						/>
					) }
				</div>
				<div className="flex flex-col gap-[0.25rem]">
					<h3 className={ `text-[1.0625rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
						{ item.title }
					</h3>
					<div className="flex items-center gap-[0.5rem]">
						<span className={ `text-[0.8125rem] font-medium ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ item.tag }
						</span>
						<span className={ `text-[0.8125rem] ${ c.dotColor } font-[family-name:var(--wp--preset--font-family--inter)]` } aria-hidden="true">&bull;</span>
						<span className={ `text-[0.8125rem] font-medium ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ item.year }
						</span>
					</div>
				</div>
			</article>
		</li>
	);

	/* ======================== */
	/* Featured layout renderer */
	/* ======================== */
	const renderFeaturedLayout = () => {
		if ( items.length === 0 ) return null;
		const featured = items[ 0 ];
		const sideItems = items.slice( 1, 3 );

		return (
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem]">
				<article className="flex flex-col gap-[1rem]" data-gallery-item="" data-category={ featured.category || '' }>
					<div className="overflow-hidden rounded-[0.75rem] aspect-[4/3]">
						{ featured.image && (
							<img
								src={ featured.image }
								alt={ featured.alt || featured.title }
								width="600"
								height="450"
								loading="lazy"
								decoding="async"
								className="w-full h-full object-cover gallery-card-img"
							/>
						) }
					</div>
					<div className="flex flex-col gap-[0.25rem]">
						<div className="flex items-center gap-[0.5rem]">
							<span className={ `inline-flex items-center rounded-full px-[0.625rem] py-[0.25rem] text-[0.6875rem] font-semibold ${ c.badgeClasses } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ featured.tag || 'Case Study' }
							</span>
							<span className={ `text-[0.8125rem] font-medium ${ c.subtle } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ featured.category && featured.year ? `${ featured.tag } \u00B7 ${ featured.year }` : featured.year }
							</span>
						</div>
						<h3 className={ `text-[1.375rem] font-bold tracking-[-0.03em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
							{ featured.title }
						</h3>
						{ featured.description && (
							<p className={ `text-[0.875rem] leading-[1.6] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ featured.description }
							</p>
						) }
					</div>
				</article>
				{ sideItems.length > 0 && (
					<div className="flex flex-col gap-[1.5rem]">
						{ sideItems.map( ( item ) => (
							<article key={ item.id } className="flex flex-col gap-[0.75rem]" data-gallery-item="" data-category={ item.category || '' }>
								<div className="overflow-hidden rounded-[0.75rem] aspect-[16/9]">
									{ item.image && (
										<img
											src={ item.image }
											alt={ item.alt || item.title }
											width="400"
											height="225"
											loading="lazy"
											decoding="async"
											className="w-full h-full object-cover gallery-card-img"
										/>
									) }
								</div>
								<div className="flex flex-col gap-[0.125rem]">
									<h3 className={ `text-[1rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
										{ item.title }
									</h3>
									<span className={ `text-[0.8125rem] font-medium ${ c.subtle } font-[family-name:var(--wp--preset--font-family--inter)]` }>
										{ item.tag && item.year ? `${ item.tag } \u00B7 ${ item.year }` : item.tag || item.year }
									</span>
								</div>
							</article>
						) ) }
					</div>
				) }
			</div>
		);
	};

	/* ======================== */
	/* Grid content             */
	/* ======================== */
	const renderGrid = () => {
		if ( style === 'masonry' ) {
			return (
				<ul className="columns-1 md:columns-2 lg:columns-3 gap-[1.25rem] list-none p-0 m-0" data-gallery-grid="">
					{ items.map( renderMasonryItem ) }
				</ul>
			);
		}

		if ( style === 'featured' ) {
			return renderFeaturedLayout();
		}

		if ( style === 'cards' ) {
			return (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] list-none p-0 m-0" data-gallery-grid="">
					{ items.map( renderCardItem ) }
				</ul>
			);
		}

		if ( style === 'showcase' ) {
			return (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.25rem] list-none p-0 m-0" data-gallery-grid="">
					{ items.map( renderShowcaseItem ) }
				</ul>
			);
		}

		/* portfolio */
		return (
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] list-none p-0 m-0" data-gallery-grid="">
				{ items.map( renderPortfolioItem ) }
			</ul>
		);
	};

	return (
		<section
			{ ...blockProps }
			aria-labelledby="gallery-heading"
			data-gallery-block=""
			data-style={ style }
			data-color-mode={ colorMode }
		>
			<div className={ `max-w-[80rem] mx-auto flex flex-col ${ style === 'portfolio' ? 'gap-[2.5rem]' : 'gap-[3rem]' }` }>
				{ headerContent }
				{ tabs }
				{ renderGrid() }
			</div>
		</section>
	);
}
