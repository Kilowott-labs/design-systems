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
	TextareaControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';

/* ──────────────────────────────────────────────────────────────────
   ICON MAP — SVG paths for Lucide icon names used in the designs.
   Each key returns a JSX <path>/<line>/<circle> set.
   ────────────────────────────────────────────────────────────────── */
const ICON_MAP = {
	zap: (
		<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
	),
	lock: (
		<>
			<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
			<path d="M7 11V7a5 5 0 0 1 10 0v4" />
		</>
	),
	'git-merge': (
		<>
			<circle cx="18" cy="18" r="3" />
			<circle cx="6" cy="6" r="3" />
			<path d="M6 21V9a9 9 0 0 0 9 9" />
		</>
	),
	sparkles: (
		<>
			<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
			<path d="M5 3v4" />
			<path d="M19 17v4" />
			<path d="M3 5h4" />
			<path d="M17 19h4" />
		</>
	),
	layers: (
		<>
			<polygon points="12 2 2 7 12 12 22 7 12 2" />
			<polyline points="2 17 12 22 22 17" />
			<polyline points="2 12 12 17 22 12" />
		</>
	),
	globe: (
		<>
			<circle cx="12" cy="12" r="10" />
			<line x1="2" y1="12" x2="22" y2="12" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</>
	),
	palette: (
		<>
			<circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
			<circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
			<circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
			<circle cx="6.5" cy="12" r="0.5" fill="currentColor" />
			<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
		</>
	),
	monitor: (
		<>
			<rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
			<line x1="8" y1="21" x2="16" y2="21" />
			<line x1="12" y1="17" x2="12" y2="21" />
		</>
	),
	smartphone: (
		<>
			<rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
			<line x1="12" y1="18" x2="12.01" y2="18" />
		</>
	),
	megaphone: (
		<>
			<path d="m3 11 18-5v12L3 13v-2z" />
			<path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
		</>
	),
	shield: (
		<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
	),
	'bar-chart': (
		<>
			<line x1="12" y1="20" x2="12" y2="10" />
			<line x1="18" y1="20" x2="18" y2="4" />
			<line x1="6" y1="20" x2="6" y2="16" />
		</>
	),
};

const ICON_OPTIONS = Object.keys( ICON_MAP ).map( ( key ) => ( {
	label: key.replace( /-/g, ' ' ).replace( /\b\w/g, ( c ) => c.toUpperCase() ),
	value: key,
} ) );

const FeatureIcon = ( { name, className } ) => (
	<svg
		className={ className }
		aria-hidden="true"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
		width="22"
		height="22"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		{ ICON_MAP[ name ] || ICON_MAP.zap }
	</svg>
);

/* ──────────────────────────────────────────────────────────────────
   STYLE_STRUCTURE — controls shape, spacing, layout per variant.
   No color values here.
   ────────────────────────────────────────────────────────────────── */
const STYLE_STRUCTURE = {
	'icon-grid': {
		gridCols: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
		gridGap: 'gap-[2rem]',
		itemLayout: 'flex flex-col gap-[0.875rem]',
		hasIconBox: true,
		hasNumber: false,
		hasImage: false,
		hasCards: false,
		isBento: false,
		headerAlign: 'center',
	},
	alternating: {
		gridCols: '',
		gridGap: 'gap-[4rem]',
		itemLayout: 'flex flex-col lg:flex-row items-center gap-[2.5rem] lg:gap-[4rem]',
		hasIconBox: false,
		hasNumber: true,
		hasImage: true,
		hasCards: false,
		isBento: false,
		headerAlign: 'left',
	},
	bento: {
		gridCols: '',
		gridGap: 'gap-[0.75rem]',
		itemLayout: 'flex flex-col gap-[0.75rem]',
		hasIconBox: true,
		hasNumber: false,
		hasImage: false,
		hasCards: true,
		isBento: true,
		headerAlign: 'center',
	},
	steps: {
		gridCols: 'grid grid-cols-1 md:grid-cols-3',
		gridGap: 'gap-[2.5rem]',
		itemLayout: 'flex flex-col items-center text-center gap-[1rem]',
		hasIconBox: false,
		hasNumber: true,
		hasImage: false,
		hasCards: false,
		isBento: false,
		headerAlign: 'center',
	},
	cards: {
		gridCols: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
		gridGap: 'gap-[1.25rem]',
		itemLayout: 'flex flex-col justify-between gap-[1rem]',
		hasIconBox: true,
		hasNumber: false,
		hasImage: false,
		hasCards: true,
		isBento: false,
		headerAlign: 'left',
	},
};

/* ──────────────────────────────────────────────────────────────────
   STYLE_COLORS — every style x colorMode fully resolved.
   Access: STYLE_COLORS[ style ][ colorMode ]
   ────────────────────────────────────────────────────────────────── */
const STYLE_COLORS = {
	'icon-grid': {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			iconBg: 'bg-[var(--wp--preset--color--accent-surface)]',
			iconColor: 'text-[var(--wp--preset--color--accent)]',
			cardBg: '',
			cardBorder: '',
			numberBg: '',
			numberText: '',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			linkColor: 'text-[var(--wp--preset--color--accent)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			iconBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			iconColor: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: '',
			cardBorder: '',
			numberBg: '',
			numberText: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			linkColor: 'text-[var(--wp--preset--color--accent-light)]',
		},
	},
	alternating: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			iconBg: '',
			iconColor: '',
			cardBg: '',
			cardBorder: '',
			numberBg: 'bg-[var(--wp--preset--color--foreground)]',
			numberText: 'text-[var(--wp--preset--color--white)]',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			linkColor: 'text-[var(--wp--preset--color--accent)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			iconBg: '',
			iconColor: '',
			cardBg: '',
			cardBorder: '',
			numberBg: 'bg-[var(--wp--preset--color--white)]',
			numberText: 'text-[var(--wp--preset--color--foreground)]',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			linkColor: 'text-[var(--wp--preset--color--accent-light)]',
		},
	},
	bento: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			iconBg: '',
			iconColor: 'text-[var(--wp--preset--color--accent)]',
			cardBg: 'bg-[var(--wp--preset--color--white)]',
			cardBorder: 'border border-[var(--wp--preset--color--border)]',
			numberBg: '',
			numberText: '',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			linkColor: 'text-[var(--wp--preset--color--accent)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--near-black,#09090B)]',
			text: 'text-[var(--wp--preset--color--surface)]',
			muted: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			iconBg: '',
			iconColor: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border border-[var(--wp--preset--color--border-dark)]',
			numberBg: '',
			numberText: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			linkColor: 'text-[var(--wp--preset--color--accent-light)]',
		},
	},
	steps: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			iconBg: '',
			iconColor: '',
			cardBg: '',
			cardBorder: '',
			numberBg: 'bg-[var(--wp--preset--color--foreground)]',
			numberText: 'text-[var(--wp--preset--color--white)]',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			linkColor: 'text-[var(--wp--preset--color--accent)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			iconBg: '',
			iconColor: '',
			cardBg: '',
			cardBorder: '',
			numberBg: 'bg-[var(--wp--preset--color--white)]',
			numberText: 'text-[var(--wp--preset--color--foreground)]',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			linkColor: 'text-[var(--wp--preset--color--accent-light)]',
		},
	},
	cards: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			iconBg: '',
			iconColor: 'text-[var(--wp--preset--color--accent)]',
			cardBg: 'bg-[var(--wp--preset--color--white)]',
			cardBorder: '',
			numberBg: '',
			numberText: '',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			linkColor: 'text-[var(--wp--preset--color--accent)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			iconBg: '',
			iconColor: 'text-[var(--wp--preset--color--accent-light)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border border-[var(--wp--preset--color--border-dark)]',
			numberBg: '',
			numberText: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			linkColor: 'text-[var(--wp--preset--color--accent-light)]',
		},
	},
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		description,
		showDescription,
		showBadge,
		badgeText,
		style,
		colorMode,
		showItemLinks,
		items,
	} = attributes;

	const struct = STYLE_STRUCTURE[ style ] || STYLE_STRUCTURE[ 'icon-grid' ];
	const c =
		( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) ||
		STYLE_COLORS[ 'icon-grid' ].light;

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem]`,
	} );

	/* ── Item CRUD ── */
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
		const newId =
			items.length > 0
				? Math.max( ...items.map( ( it ) => it.id ) ) + 1
				: 1;
		setAttributes( {
			items: [
				...items,
				{
					id: newId,
					icon: 'zap',
					title: 'New Feature',
					description: 'Describe this feature.',
					linkText: 'Learn more',
					linkUrl: '#',
					image: '',
					imageId: 0,
				},
			],
		} );
	};

	const removeItem = ( index ) => {
		if ( items.length <= 1 ) return;
		setAttributes( { items: items.filter( ( _, i ) => i !== index ) } );
	};

	/* ── Render helpers ── */
	const headerAlignClasses =
		struct.headerAlign === 'center'
			? 'items-center text-center'
			: 'items-start text-left';

	/* Alternating row direction: odd rows reverse */
	const getAlternatingClasses = ( index ) => {
		return index % 2 !== 0 ? 'lg:flex-row-reverse' : '';
	};

	/* Bento grid layout */
	const renderBentoGrid = () => {
		const topItems = items.slice( 0, 3 );
		const bottomItems = items.slice( 3, 5 );

		return (
			<div className="flex flex-col gap-[0.75rem]">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-[0.75rem]">
					{ topItems.map( ( item, i ) => renderBentoCard( item, i ) ) }
				</div>
				{ bottomItems.length > 0 && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-[0.75rem]">
						{ bottomItems.map( ( item, i ) =>
							renderBentoCard( item, i + 3 )
						) }
					</div>
				) }
			</div>
		);
	};

	const renderBentoCard = ( item, index ) => (
		<div
			key={ item.id }
			className={ `rounded-[1rem] p-[1.5rem] ${ c.cardBg } ${ c.cardBorder } flex flex-col gap-[0.75rem]` }
		>
			<span className={ `${ c.iconColor }` }>
				<FeatureIcon name={ item.icon } className="w-[1.5rem] h-[1.5rem]" />
			</span>
			<span
				className={ `text-[1.125rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
			>
				{ item.title }
			</span>
			<span
				className={ `text-[0.8125rem] leading-[1.6] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }
			>
				{ item.description }
			</span>
		</div>
	);

	/* Standard item (icon-grid, steps, cards) */
	const renderStandardItem = ( item, index ) => {
		const isCardsStyle = struct.hasCards && ! struct.isBento;

		const cardWrap = isCardsStyle
			? `rounded-[1rem] p-[1.75rem] ${ c.cardBg } ${ c.cardBorder }`
			: '';

		return (
			<li
				key={ item.id }
				className={ `${ struct.itemLayout } ${ cardWrap }` }
			>
				{ /* Icon box */ }
				{ struct.hasIconBox && (
					<span
						className={ `flex items-center justify-center w-[2.75rem] h-[2.75rem] rounded-[0.625rem] ${ c.iconBg } ${ c.iconColor }` }
					>
						<FeatureIcon
							name={ item.icon }
							className="w-[1.375rem] h-[1.375rem]"
						/>
					</span>
				) }

				{ /* Number circle (steps) */ }
				{ struct.hasNumber && ! struct.hasImage && (
					<span
						className={ `flex items-center justify-center w-[3rem] h-[3rem] rounded-full ${ c.numberBg } ${ c.numberText } text-[1.25rem] font-bold font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
					>
						{ String( index + 1 ).padStart( 2, '0' ) }
					</span>
				) }

				<div className="flex flex-col gap-[0.625rem]">
					<span
						className={ `text-[1.125rem] md:text-[1.25rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
					>
						{ item.title }
					</span>
					<span
						className={ `text-[0.875rem] leading-[1.6] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }
					>
						{ item.description }
					</span>
				</div>

				{ /* Item link */ }
				{ showItemLinks && (
					<span
						className={ `inline-flex items-center gap-[0.375rem] text-[0.8125rem] font-semibold ${ c.linkColor } font-[family-name:var(--wp--preset--font-family--inter)]` }
					>
						{ item.linkText || 'Learn more' }
						<svg
							aria-hidden="true"
							focusable="false"
							width="14"
							height="14"
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
					</span>
				) }
			</li>
		);
	};

	/* Alternating item */
	const renderAlternatingItem = ( item, index ) => (
		<div
			key={ item.id }
			className={ `flex flex-col lg:flex-row items-center gap-[2.5rem] lg:gap-[4rem] ${ getAlternatingClasses(
				index
			) }` }
		>
			{ /* Image */ }
			<div className="w-full lg:w-1/2 shrink-0">
				{ item.image ? (
					<img
						src={ item.image }
						alt={ item.title || 'Feature illustration' }
						width="540"
						height="360"
						loading="lazy"
						decoding="async"
						className="w-full h-auto rounded-[1rem] object-cover"
					/>
				) : (
					<div className="w-full aspect-[3/2] rounded-[1rem] bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-subtle)] text-[0.875rem] font-[family-name:var(--wp--preset--font-family--inter)]">
						Select image in sidebar
					</div>
				) }
			</div>

			{ /* Text */ }
			<div className="flex flex-col gap-[1rem] w-full lg:w-1/2">
				{ struct.hasNumber && (
					<span
						className={ `text-[3rem] font-bold ${ colorMode === 'dark' ? 'text-[var(--wp--preset--color--border-dark)]' : 'text-[var(--wp--preset--color--border)]' } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-none` }
					>
						{ String( index + 1 ).padStart( 2, '0' ) }
					</span>
				) }
				<span
					className={ `text-[1.5rem] md:text-[1.75rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
				>
					{ item.title }
				</span>
				<span
					className={ `text-[0.9375rem] leading-[1.65] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }
				>
					{ item.description }
				</span>
				{ showItemLinks && (
					<span
						className={ `inline-flex items-center gap-[0.375rem] text-[0.875rem] font-semibold ${ c.linkColor } font-[family-name:var(--wp--preset--font-family--inter)]` }
					>
						{ item.linkText || 'Learn more' }
						<svg
							aria-hidden="true"
							focusable="false"
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
					</span>
				) }
			</div>
		</div>
	);

	/* ── Main render ── */
	const renderItems = () => {
		if ( struct.isBento ) {
			return renderBentoGrid();
		}

		if ( style === 'alternating' ) {
			return (
				<div className={ `flex flex-col ${ struct.gridGap }` }>
					{ items.map( ( item, index ) =>
						renderAlternatingItem( item, index )
					) }
				</div>
			);
		}

		return (
			<ul
				className={ `${ struct.gridCols } ${ struct.gridGap } list-none p-0 m-0` }
			>
				{ items.map( ( item, index ) =>
					renderStandardItem( item, index )
				) }
			</ul>
		);
	};

	return (
		<>
			<InspectorControls>
				{ /* Style & Layout */ }
				<PanelBody
					title={ __( 'Style & Layout', 'kw-package' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Style Variant', 'kw-package' ) }
						value={ style }
						options={ [
							{ label: 'Icon Grid (3-col)', value: 'icon-grid' },
							{
								label: 'Alternating Image + Text',
								value: 'alternating',
							},
							{ label: 'Bento Grid', value: 'bento' },
							{ label: 'Numbered Steps', value: 'steps' },
							{ label: 'Feature Cards', value: 'cards' },
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
						onChange={ ( val ) =>
							setAttributes( { colorMode: val } )
						}
					/>
				</PanelBody>

				{ /* Options */ }
				<PanelBody
					title={ __( 'Options', 'kw-package' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Description', 'kw-package' ) }
						checked={ showDescription }
						onChange={ ( val ) =>
							setAttributes( { showDescription: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Badge', 'kw-package' ) }
						checked={ showBadge }
						onChange={ ( val ) =>
							setAttributes( { showBadge: val } )
						}
					/>
					{ showBadge && (
						<TextControl
							label={ __( 'Badge Text', 'kw-package' ) }
							value={ badgeText }
							onChange={ ( val ) =>
								setAttributes( { badgeText: val } )
							}
						/>
					) }
					<ToggleControl
						label={ __( 'Show Item Links', 'kw-package' ) }
						checked={ showItemLinks }
						onChange={ ( val ) =>
							setAttributes( { showItemLinks: val } )
						}
					/>
				</PanelBody>

				{ /* Feature Items */ }
				<PanelBody
					title={ __( 'Feature Items', 'kw-package' ) }
					initialOpen={ true }
				>
					{ items.map( ( item, index ) => (
						<PanelBody
							key={ item.id }
							title={
								item.title ||
								`${ __( 'Item', 'kw-package' ) } ${
									index + 1
								}`
							}
							initialOpen={ index === 0 }
						>
							<SelectControl
								label={ __( 'Icon', 'kw-package' ) }
								value={ item.icon }
								options={ ICON_OPTIONS }
								onChange={ ( val ) =>
									updateItem( index, 'icon', val )
								}
							/>
							<TextControl
								label={ __( 'Title', 'kw-package' ) }
								value={ item.title }
								onChange={ ( val ) =>
									updateItem( index, 'title', val )
								}
							/>
							<TextareaControl
								label={ __( 'Description', 'kw-package' ) }
								value={ item.description }
								onChange={ ( val ) =>
									updateItem( index, 'description', val )
								}
								rows={ 3 }
							/>
							{ showItemLinks && (
								<>
									<TextControl
										label={ __(
											'Link Text',
											'kw-package'
										) }
										value={ item.linkText }
										onChange={ ( val ) =>
											updateItem(
												index,
												'linkText',
												val
											)
										}
									/>
									<TextControl
										label={ __(
											'Link URL',
											'kw-package'
										) }
										value={ item.linkUrl }
										onChange={ ( val ) =>
											updateItem(
												index,
												'linkUrl',
												val
											)
										}
									/>
								</>
							) }
							{ style === 'alternating' && (
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) => {
											updateItemMulti(
												index,
												{
													image: media.url,
													imageId: media.id,
												}
											);
										} }
										allowedTypes={ [ 'image' ] }
										value={ item.imageId }
										render={ ( { open } ) => (
											<>
												{ item.image && (
													<img
														src={ item.image }
														alt=""
														style={ {
															maxWidth: '100%',
															marginBottom: '8px',
															borderRadius: '4px',
														} }
													/>
												) }
												<Button
													onClick={ open }
													variant="secondary"
													style={ {
														width: '100%',
														marginBottom: '8px',
													} }
												>
													{ item.image
														? __(
																'Replace Image',
																'kw-package'
														  )
														: __(
																'Select Image',
																'kw-package'
														  ) }
												</Button>
												{ item.image && (
													<Button
														onClick={ () => {
															updateItemMulti(
																index,
																{
																	image: '',
																	imageId: 0,
																}
															);
														} }
														variant="secondary"
														isDestructive
														style={ {
															width: '100%',
														} }
													>
														{ __(
															'Remove Image',
															'kw-package'
														) }
													</Button>
												) }
											</>
										) }
									/>
								</MediaUploadCheck>
							) }
							{ items.length > 1 && (
								<Button
									onClick={ () => removeItem( index ) }
									variant="secondary"
									isDestructive
									style={ { marginTop: '8px' } }
								>
									{ __( 'Remove Item', 'kw-package' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button
						onClick={ addItem }
						variant="primary"
						style={ { width: '100%', marginTop: '8px' } }
					>
						{ __( '+ Add Feature Item', 'kw-package' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			{ /* Editor canvas */ }
			<section { ...blockProps } aria-labelledby="features-heading">
				<div className="max-w-[80rem] mx-auto flex flex-col gap-[3rem]">
					{ /* Header */ }
					<header
						className={ `flex flex-col ${ headerAlignClasses } gap-[0.75rem]` }
					>
						{ showBadge && (
							<span
								className={ `inline-flex items-center rounded-full px-[1rem] py-[0.375rem] text-[0.6875rem] font-bold tracking-[0.15em] uppercase font-[family-name:var(--wp--preset--font-family--inter)] ${ c.badgeClasses }` }
							>
								{ badgeText }
							</span>
						) }
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) =>
								setAttributes( { heading: val } )
							}
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
							id="features-heading"
						/>
						{ showDescription && (
							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) =>
									setAttributes( { description: val } )
								}
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[35rem] leading-relaxed` }
							/>
						) }
					</header>

					{ /* Items */ }
					{ renderItems() }
				</div>
			</section>
		</>
	);
}
