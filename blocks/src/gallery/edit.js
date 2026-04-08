import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';

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

export default function Edit( { attributes, setAttributes } ) {
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

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem]`,
	} );

	/* Item CRUD helpers */
	const updateItem = ( index, field, value ) => {
		const updated = [ ...items ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { items: updated } );
	};

	const updateItemMulti = ( index, fields ) => {
		const updated = [ ...items ];
		updated[ index ] = { ...updated[ index ], ...fields };
		setAttributes( { items: updated } );
	};

	const addItem = () => {
		const newId = items.length > 0 ? Math.max( ...items.map( ( it ) => it.id ) ) + 1 : 1;
		setAttributes( {
			items: [
				...items,
				{
					id: newId,
					image: '',
					imageId: 0,
					alt: '',
					title: 'New Project',
					category: categories.length > 1 ? categories[ 1 ].slug : 'branding',
					description: 'Project description here.',
					tag: 'Design',
					year: '2026',
					link: '#',
				},
			],
		} );
	};

	const removeItem = ( index ) => {
		if ( items.length <= 1 ) return;
		setAttributes( { items: items.filter( ( _, i ) => i !== index ) } );
	};

	/* Category CRUD */
	const updateCategory = ( index, field, value ) => {
		const updated = [ ...categories ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { categories: updated } );
	};

	const addCategory = () => {
		const newId = categories.length > 0 ? Math.max( ...categories.map( ( cat ) => cat.id ) ) + 1 : 1;
		setAttributes( {
			categories: [ ...categories, { id: newId, label: 'New Category', slug: 'new-category' } ],
		} );
	};

	const removeCategory = ( index ) => {
		if ( categories.length <= 1 ) return;
		setAttributes( { categories: categories.filter( ( _, i ) => i !== index ) } );
	};

	/* Badge */
	const badge = showBadge ? (
		<span className={ `inline-flex items-center rounded-full px-[1rem] py-[0.375rem] text-[0.6875rem] font-semibold tracking-[0.1em] font-[family-name:var(--wp--preset--font-family--inter)] ${ c.badgeClasses }` }>
			{ badgeText }
		</span>
	) : null;

	/* View All link (editor preview — non-interactive) */
	const viewAllLink = showViewAll ? (
		<span className={ `inline-flex items-center gap-[0.5rem] text-[0.875rem] font-semibold ${ c.viewAllText } font-[family-name:var(--wp--preset--font-family--inter)] shrink-0` }>
			{ viewAllText }
			<ArrowRight />
		</span>
	) : null;

	/* Tabs (editor preview — non-interactive) */
	const tabs = showTabs ? (
		<nav className="flex flex-wrap items-center justify-center gap-[0.5rem]">
			{ categories.map( ( cat, i ) => (
				<span
					key={ cat.id }
					className={ `rounded-full px-[1.25rem] py-[0.625rem] text-[0.875rem] font-[family-name:var(--wp--preset--font-family--inter)] ${ i === 0 ? c.tabActive : c.tabInactive }` }
				>
					{ cat.label }
				</span>
			) ) }
		</nav>
	) : null;

	/* Header — centered or split */
	const isCentered = struct.headerAlign === 'center';
	const headerContent = (
		<header
			className={ `flex flex-col ${ isCentered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between' } gap-[0.75rem] md:gap-[1rem]` }
		>
			{ isCentered ? (
				<>
					{ badge }
					<RichText
						tagName="h2"
						value={ heading }
						onChange={ ( val ) => setAttributes( { heading: val } ) }
						className={ `${ style === 'showcase' ? 'text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] tracking-[-0.03em]' : 'text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] tracking-tight' } font-bold ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
						id="gallery-heading"
					/>
					{ showDescription && (
						<RichText
							tagName="p"
							value={ description }
							onChange={ ( val ) => setAttributes( { description: val } ) }
							className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[30rem] leading-relaxed` }
						/>
					) }
				</>
			) : (
				<>
					<div className="flex flex-col gap-[0.5rem]">
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
							id="gallery-heading"
						/>
						{ showDescription && (
							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) => setAttributes( { description: val } ) }
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
	/* Masonry item preview     */
	/* ======================== */
	const renderMasonryItem = ( item ) => (
		<li key={ item.id } className="mb-[1.25rem] break-inside-avoid">
			<figure className="gallery-card relative overflow-hidden rounded-[0.75rem]">
				{ item.image ? (
					<img src={ item.image } alt={ item.alt || item.title } className="w-full h-auto object-cover" />
				) : (
					<div className="w-full aspect-[4/3] bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-muted)] text-[0.8125rem]">
						{ __( 'Upload image', 'kw-package' ) }
					</div>
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
	/* Cards item preview       */
	/* ======================== */
	const renderCardItem = ( item ) => (
		<li key={ item.id }>
			<article className={ `overflow-hidden rounded-[0.75rem] ${ c.cardBg } ${ c.cardBorder } h-full flex flex-col` }>
				<div className="aspect-[4/3] overflow-hidden">
					{ item.image ? (
						<img src={ item.image } alt={ item.alt || item.title } className="w-full h-full object-cover" />
					) : (
						<div className="w-full h-full bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-muted)] text-[0.8125rem]">
							{ __( 'Upload image', 'kw-package' ) }
						</div>
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
					{ struct.showLink && (
						<span className={ `inline-flex items-center gap-[0.375rem] text-[0.8125rem] font-semibold ${ c.accent } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							View Project
							<ArrowUpRight />
						</span>
					) }
				</div>
			</article>
		</li>
	);

	/* ======================== */
	/* Showcase item preview    */
	/* ======================== */
	const renderShowcaseItem = ( item ) => (
		<li key={ item.id }>
			<article className="flex flex-col gap-[1rem]">
				<div className="overflow-hidden rounded-[0.75rem] aspect-[4/3]">
					{ item.image ? (
						<img src={ item.image } alt={ item.alt || item.title } className="w-full h-full object-cover" />
					) : (
						<div className="w-full h-full bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-muted)] text-[0.8125rem]">
							{ __( 'Upload image', 'kw-package' ) }
						</div>
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
	/* Portfolio item preview   */
	/* ======================== */
	const renderPortfolioItem = ( item ) => (
		<li key={ item.id }>
			<article className="flex flex-col gap-[0.875rem]">
				<div className="overflow-hidden rounded-[0.75rem] aspect-[4/3]">
					{ item.image ? (
						<img src={ item.image } alt={ item.alt || item.title } className="w-full h-full object-cover" />
					) : (
						<div className="w-full h-full bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-muted)] text-[0.8125rem]">
							{ __( 'Upload image', 'kw-package' ) }
						</div>
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
	/* Featured layout preview  */
	/* ======================== */
	const renderFeaturedLayout = () => {
		if ( items.length === 0 ) return null;
		const featured = items[ 0 ];
		const sideItems = items.slice( 1, 3 );

		return (
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem]">
				<article className="flex flex-col gap-[1rem]">
					<div className="overflow-hidden rounded-[0.75rem] aspect-[4/3]">
						{ featured.image ? (
							<img src={ featured.image } alt={ featured.alt || featured.title } className="w-full h-full object-cover" />
						) : (
							<div className="w-full h-full bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-muted)] text-[0.8125rem]">
								{ __( 'Upload image', 'kw-package' ) }
							</div>
						) }
					</div>
					<div className="flex flex-col gap-[0.25rem]">
						<div className="flex items-center gap-[0.5rem]">
							<span className={ `inline-flex items-center rounded-full px-[0.625rem] py-[0.25rem] text-[0.6875rem] font-semibold ${ c.badgeClasses } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ featured.tag || 'Case Study' }
							</span>
							<span className={ `text-[0.8125rem] font-medium ${ c.subtle } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ featured.tag && featured.year ? `${ featured.tag } \u00B7 ${ featured.year }` : featured.year }
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
							<article key={ item.id } className="flex flex-col gap-[0.75rem]">
								<div className="overflow-hidden rounded-[0.75rem] aspect-[16/9]">
									{ item.image ? (
										<img src={ item.image } alt={ item.alt || item.title } className="w-full h-full object-cover" />
									) : (
										<div className="w-full h-full bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-muted)] text-[0.8125rem]">
											{ __( 'Upload image', 'kw-package' ) }
										</div>
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
				<ul className="columns-1 md:columns-2 lg:columns-3 gap-[1.25rem] list-none p-0 m-0">
					{ items.map( renderMasonryItem ) }
				</ul>
			);
		}

		if ( style === 'featured' ) {
			return renderFeaturedLayout();
		}

		if ( style === 'cards' ) {
			return (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] list-none p-0 m-0">
					{ items.map( renderCardItem ) }
				</ul>
			);
		}

		if ( style === 'showcase' ) {
			return (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.25rem] list-none p-0 m-0">
					{ items.map( renderShowcaseItem ) }
				</ul>
			);
		}

		/* portfolio */
		return (
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] list-none p-0 m-0">
				{ items.map( renderPortfolioItem ) }
			</ul>
		);
	};

	return (
		<>
			<InspectorControls>
				{ /* Style & Layout */ }
				<PanelBody title={ __( 'Style & Layout', 'kw-package' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Style Variant', 'kw-package' ) }
						value={ style }
						options={ [
							{ label: 'Masonry Grid', value: 'masonry' },
							{ label: 'Uniform Cards', value: 'cards' },
							{ label: 'Featured + Grid', value: 'featured' },
							{ label: 'Dark Showcase', value: 'showcase' },
							{ label: 'Filterable Portfolio', value: 'portfolio' },
						] }
						onChange={ ( val ) => setAttributes( { style: val } ) }
					/>
					<SelectControl
						label={ __( 'Color Mode', 'kw-package' ) }
						value={ colorMode }
						options={ [
							{ label: 'Light', value: 'light' },
							{ label: 'Dark', value: 'dark' },
						] }
						onChange={ ( val ) => setAttributes( { colorMode: val } ) }
					/>
				</PanelBody>

				{ /* Options */ }
				<PanelBody title={ __( 'Options', 'kw-package' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Description', 'kw-package' ) }
						checked={ showDescription }
						onChange={ ( val ) => setAttributes( { showDescription: val } ) }
					/>
					<ToggleControl
						label={ __( 'Show Badge', 'kw-package' ) }
						checked={ showBadge }
						onChange={ ( val ) => setAttributes( { showBadge: val } ) }
					/>
					{ showBadge && (
						<TextControl
							label={ __( 'Badge Text', 'kw-package' ) }
							value={ badgeText }
							onChange={ ( val ) => setAttributes( { badgeText: val } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Show View All Link', 'kw-package' ) }
						checked={ showViewAll }
						onChange={ ( val ) => setAttributes( { showViewAll: val } ) }
					/>
					{ showViewAll && (
						<>
							<TextControl
								label={ __( 'View All Text', 'kw-package' ) }
								value={ viewAllText }
								onChange={ ( val ) => setAttributes( { viewAllText: val } ) }
							/>
							<TextControl
								label={ __( 'View All URL', 'kw-package' ) }
								value={ viewAllUrl }
								onChange={ ( val ) => setAttributes( { viewAllUrl: val } ) }
							/>
						</>
					) }
					<ToggleControl
						label={ __( 'Show Filter Tabs', 'kw-package' ) }
						checked={ showTabs }
						onChange={ ( val ) => setAttributes( { showTabs: val } ) }
					/>
				</PanelBody>

				{ /* Categories (when tabs enabled) */ }
				{ showTabs && (
					<PanelBody title={ __( 'Categories', 'kw-package' ) } initialOpen={ false }>
						{ categories.map( ( cat, index ) => (
							<div key={ cat.id } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' } }>
								<TextControl
									value={ cat.label }
									onChange={ ( val ) => updateCategory( index, 'label', val ) }
									style={ { flex: 1, marginBottom: 0 } }
								/>
								<TextControl
									value={ cat.slug }
									onChange={ ( val ) => updateCategory( index, 'slug', val ) }
									style={ { flex: 1, marginBottom: 0 } }
									placeholder="slug"
								/>
								{ categories.length > 1 && (
									<Button
										icon="no-alt"
										isDestructive
										onClick={ () => removeCategory( index ) }
										label={ __( 'Remove category', 'kw-package' ) }
									/>
								) }
							</div>
						) ) }
						<Button onClick={ addCategory } variant="secondary" style={ { width: '100%' } }>
							{ __( '+ Add Category', 'kw-package' ) }
						</Button>
					</PanelBody>
				) }

				{ /* Gallery Items */ }
				<PanelBody title={ __( 'Gallery Items', 'kw-package' ) } initialOpen={ true }>
					{ items.map( ( item, index ) => (
						<PanelBody
							key={ item.id }
							title={ item.title || `${ __( 'Item', 'kw-package' ) } ${ index + 1 }` }
							initialOpen={ index === 0 }
						>
							<TextControl
								label={ __( 'Title', 'kw-package' ) }
								value={ item.title }
								onChange={ ( val ) => updateItem( index, 'title', val ) }
							/>
							<TextControl
								label={ __( 'Description', 'kw-package' ) }
								value={ item.description }
								onChange={ ( val ) => updateItem( index, 'description', val ) }
							/>
							<TextControl
								label={ __( 'Alt Text', 'kw-package' ) }
								value={ item.alt }
								onChange={ ( val ) => updateItem( index, 'alt', val ) }
							/>
							<TextControl
								label={ __( 'Tag', 'kw-package' ) }
								value={ item.tag }
								onChange={ ( val ) => updateItem( index, 'tag', val ) }
							/>
							<TextControl
								label={ __( 'Year', 'kw-package' ) }
								value={ item.year }
								onChange={ ( val ) => updateItem( index, 'year', val ) }
							/>
							<TextControl
								label={ __( 'Link', 'kw-package' ) }
								value={ item.link }
								onChange={ ( val ) => updateItem( index, 'link', val ) }
							/>
							{ showTabs && (
								<SelectControl
									label={ __( 'Category', 'kw-package' ) }
									value={ item.category }
									options={ categories
										.filter( ( cat ) => cat.slug !== 'all' )
										.map( ( cat ) => ( { label: cat.label, value: cat.slug } ) ) }
									onChange={ ( val ) => updateItem( index, 'category', val ) }
								/>
							) }
							<p className="components-base-control__label" style={ { marginTop: '8px' } }>
								{ __( 'Image', 'kw-package' ) }
							</p>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => updateItemMulti( index, { image: media.url, imageId: media.id } ) }
									allowedTypes={ [ 'image' ] }
									value={ item.imageId }
									render={ ( { open } ) => (
										<>
											{ item.image && (
												<img
													src={ item.image }
													alt={ item.alt || item.title }
													style={ { width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' } }
												/>
											) }
											<Button onClick={ open } variant="secondary" style={ { width: '100%', marginBottom: '8px' } }>
												{ item.image ? __( 'Replace Image', 'kw-package' ) : __( 'Upload Image', 'kw-package' ) }
											</Button>
										</>
									) }
								/>
							</MediaUploadCheck>
							{ items.length > 1 && (
								<Button
									onClick={ () => removeItem( index ) }
									variant="secondary"
									isDestructive
									style={ { marginTop: '4px' } }
								>
									{ __( 'Remove Item', 'kw-package' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button onClick={ addItem } variant="primary" style={ { width: '100%', marginTop: '8px' } }>
						{ __( '+ Add Gallery Item', 'kw-package' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			{ /* Editor canvas */ }
			<section { ...blockProps } aria-labelledby="gallery-heading">
				<div className={ `max-w-[80rem] mx-auto flex flex-col ${ style === 'portfolio' ? 'gap-[2.5rem]' : 'gap-[3rem]' }` }>
					{ headerContent }
					{ tabs }
					{ renderGrid() }
				</div>
			</section>
		</>
	);
}
