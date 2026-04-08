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
 * Structure — controls shape, spacing, layout per style variant.
 * No color values here.
 */
const STYLE_STRUCTURE = {
	split: {
		layout: 'split',
		headingSize: 'text-[2rem] md:text-[2.75rem] lg:text-[3.5rem]',
		maxSubWidth: 'max-w-[28rem]',
		hasImage: true,
		hasForm: false,
		hasStats: false,
		textAlign: 'text-left',
		alignItems: 'items-start',
	},
	fullbleed: {
		layout: 'fullbleed',
		headingSize: 'text-[2.25rem] md:text-[3rem] lg:text-[4.25rem]',
		maxSubWidth: 'max-w-[32rem]',
		hasImage: true,
		hasForm: false,
		hasStats: false,
		textAlign: 'text-left',
		alignItems: 'items-start',
	},
	centered: {
		layout: 'centered',
		headingSize: 'text-[2.25rem] md:text-[3rem] lg:text-[4.5rem]',
		maxSubWidth: 'max-w-[35rem]',
		hasImage: false,
		hasForm: false,
		hasStats: false,
		textAlign: 'text-center',
		alignItems: 'items-center',
	},
	textonly: {
		layout: 'textonly',
		headingSize: 'text-[2.5rem] md:text-[3.5rem] lg:text-[5.5rem]',
		maxSubWidth: 'max-w-[40rem]',
		hasImage: false,
		hasForm: false,
		hasStats: false,
		textAlign: 'text-left',
		alignItems: 'items-start',
	},
	saas: {
		layout: 'centered',
		headingSize: 'text-[2rem] md:text-[2.75rem] lg:text-[4rem]',
		maxSubWidth: 'max-w-[36rem]',
		hasImage: false,
		hasForm: true,
		hasStats: false,
		textAlign: 'text-center',
		alignItems: 'items-center',
	},
	dark: {
		layout: 'split',
		headingSize: 'text-[2rem] md:text-[2.5rem] lg:text-[3.75rem]',
		maxSubWidth: 'max-w-[30rem]',
		hasImage: false,
		hasForm: false,
		hasStats: true,
		textAlign: 'text-left',
		alignItems: 'items-start',
	},
};

/**
 * Colors — every style x colorMode combination fully resolved.
 */
const STYLE_COLORS = {
	split: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			badgeBg: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)]',
			trustText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			statValue: 'text-[var(--wp--preset--color--foreground)]',
			statLabel: 'text-[var(--wp--preset--color--foreground-muted)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			badgeBg: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			trustText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			statValue: 'text-[var(--wp--preset--color--white)]',
			statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
	},
	fullbleed: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--foreground)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--foreground-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--muted-on-dark)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			badgeBg: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			trustText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			statValue: 'text-[var(--wp--preset--color--white)]',
			statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--foreground-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--muted-on-dark)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			badgeBg: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			trustText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			statValue: 'text-[var(--wp--preset--color--white)]',
			statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
	},
	centered: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			badgeBg: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)]',
			trustText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			statValue: 'text-[var(--wp--preset--color--foreground)]',
			statLabel: 'text-[var(--wp--preset--color--foreground-muted)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			badgeBg: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			trustText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			statValue: 'text-[var(--wp--preset--color--white)]',
			statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
	},
	textonly: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			badgeBg: 'text-[var(--wp--preset--color--foreground-subtle)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-warm)] text-[var(--wp--preset--color--foreground-muted)]',
			trustText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			statValue: 'text-[var(--wp--preset--color--foreground)]',
			statLabel: 'text-[var(--wp--preset--color--foreground-muted)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			badgeBg: 'text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			trustText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			statValue: 'text-[var(--wp--preset--color--white)]',
			statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
	},
	saas: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			badgeBg: 'bg-[var(--wp--preset--color--accent-surface)] border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--accent)]',
			primaryBtn: 'bg-[var(--wp--preset--color--accent)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)]',
			trustText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			statValue: 'text-[var(--wp--preset--color--foreground)]',
			statLabel: 'text-[var(--wp--preset--color--foreground-muted)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			badgeBg: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--accent-light)]',
			primaryBtn: 'bg-[var(--wp--preset--color--accent)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			trustText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			statValue: 'text-[var(--wp--preset--color--white)]',
			statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
	},
	dark: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			badgeBg: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--accent)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			trustText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			statValue: 'text-[var(--wp--preset--color--white)]',
			statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			badgeBg: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--accent)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			trustText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			statValue: 'text-[var(--wp--preset--color--white)]',
			statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
	},
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		subheading,
		style,
		colorMode,
		showBadge,
		badgeText,
		primaryCtaText,
		primaryCtaUrl,
		showSecondaryCta,
		secondaryCtaText,
		secondaryCtaUrl,
		showTrustBar,
		trustLabel,
		trustItems,
		imageUrl,
		imageId,
		imageAlt,
		showStatsBar,
		stats,
		emailPlaceholder,
		emailButtonText,
		proofItems,
	} = attributes;

	const struct = STYLE_STRUCTURE[ style ] || STYLE_STRUCTURE.split;
	const c = ( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) || STYLE_COLORS.split.light;
	const isSplit = struct.layout === 'split';
	const isCentered = struct.layout === 'centered';
	const isFullbleed = struct.layout === 'fullbleed';

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem] ${ isFullbleed ? 'relative overflow-hidden min-h-[28rem]' : '' }`,
	} );

	/* Trust item CRUD */
	const updateTrustItem = ( index, value ) => {
		const updated = [ ...trustItems ];
		updated[ index ] = { ...updated[ index ], label: value };
		setAttributes( { trustItems: updated } );
	};

	const addTrustItem = () => {
		const newId = trustItems.length > 0 ? Math.max( ...trustItems.map( ( t ) => t.id ) ) + 1 : 1;
		setAttributes( { trustItems: [ ...trustItems, { id: newId, label: 'NEW' } ] } );
	};

	const removeTrustItem = ( index ) => {
		if ( trustItems.length <= 1 ) return;
		setAttributes( { trustItems: trustItems.filter( ( _, i ) => i !== index ) } );
	};

	/* Stat CRUD */
	const updateStat = ( index, field, value ) => {
		const updated = [ ...stats ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { stats: updated } );
	};

	const addStat = () => {
		const newId = stats.length > 0 ? Math.max( ...stats.map( ( s ) => s.id ) ) + 1 : 1;
		setAttributes( { stats: [ ...stats, { id: newId, value: '0', label: 'New stat' } ] } );
	};

	const removeStat = ( index ) => {
		if ( stats.length <= 1 ) return;
		setAttributes( { stats: stats.filter( ( _, i ) => i !== index ) } );
	};

	/* Proof item CRUD */
	const updateProofItem = ( index, value ) => {
		const updated = [ ...proofItems ];
		updated[ index ] = { ...updated[ index ], label: value };
		setAttributes( { proofItems: updated } );
	};

	const addProofItem = () => {
		const newId = proofItems.length > 0 ? Math.max( ...proofItems.map( ( p ) => p.id ) ) + 1 : 1;
		setAttributes( { proofItems: [ ...proofItems, { id: newId, label: 'New item' } ] } );
	};

	const removeProofItem = ( index ) => {
		if ( proofItems.length <= 1 ) return;
		setAttributes( { proofItems: proofItems.filter( ( _, i ) => i !== index ) } );
	};

	/* Shared components */
	const badgeEl = showBadge ? (
		<span className={ `inline-flex ${ isCentered ? 'self-center' : 'self-start' } items-center rounded-full px-[1rem] py-[0.375rem] text-[0.75rem] font-semibold tracking-wider font-[family-name:var(--wp--preset--font-family--inter)] ${ c.badgeBg }` }>
			{ badgeText }
		</span>
	) : null;

	const primaryBtnEl = (
		<span className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] px-[1.75rem] py-[0.875rem] text-[0.9375rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 ${ c.primaryBtn }` }>
			{ primaryCtaText }
			<svg className="w-[1rem] h-[1rem]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<line x1="5" y1="12" x2="19" y2="12" />
				<polyline points="12 5 19 12 12 19" />
			</svg>
		</span>
	);

	const secondaryBtnEl = showSecondaryCta ? (
		<span className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] px-[1.75rem] py-[0.875rem] text-[0.9375rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 ${ c.secondaryBtn }` }>
			{ secondaryCtaText }
		</span>
	) : null;

	const trustBarEl = showTrustBar ? (
		<div className={ `flex flex-wrap ${ isCentered ? 'justify-center' : '' } items-center gap-[1.5rem] pt-[0.5rem]` }>
			<span className={ `text-[0.6875rem] font-semibold tracking-widest font-[family-name:var(--wp--preset--font-family--inter)] ${ c.trustText }` }>
				{ trustLabel }
			</span>
			{ trustItems.map( ( item ) => (
				<span key={ item.id } className={ `text-[1rem] font-bold tracking-widest font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.trustText }` }>
					{ item.label }
				</span>
			) ) }
		</div>
	) : null;

	const statsBarEl = showStatsBar ? (
		<div className={ `flex flex-wrap ${ isCentered ? 'justify-center' : '' } items-center gap-[2.5rem] lg:gap-[5rem] pt-[1rem]` }>
			{ stats.map( ( stat ) => (
				<div key={ stat.id } className="flex items-center gap-[0.75rem]">
					<span className={ `text-[1.5rem] font-bold tracking-tight font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.statValue }` }>
						{ stat.value }
					</span>
					<span className={ `text-[0.8125rem] font-[family-name:var(--wp--preset--font-family--inter)] ${ c.statLabel }` }>
						{ stat.label }
					</span>
				</div>
			) ) }
		</div>
	) : null;

	const formEl = struct.hasForm ? (
		<div className="flex flex-col items-center gap-[1rem] w-full max-w-[26rem]">
			<div className={ `flex w-full rounded-[0.75rem] overflow-hidden border border-[var(--wp--preset--color--border)]` }>
				<span className="flex-1 px-[1.25rem] py-[0.875rem] text-[0.9375rem] text-[var(--wp--preset--color--foreground-subtle)] font-[family-name:var(--wp--preset--font-family--inter)]">
					{ emailPlaceholder }
				</span>
				<span className={ `px-[1.75rem] py-[0.875rem] text-[0.9375rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] ${ c.primaryBtn } whitespace-nowrap` }>
					{ emailButtonText }
				</span>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-[0.5rem]">
				{ proofItems.map( ( item, i ) => (
					<span key={ item.id }>
						<span className={ `text-[0.8125rem] font-medium font-[family-name:var(--wp--preset--font-family--inter)] ${ c.subtle }` }>
							{ item.label }
						</span>
						{ i < proofItems.length - 1 && (
							<span className={ `mx-[0.25rem] ${ c.subtle }` }>&middot;</span>
						) }
					</span>
				) ) }
			</div>
		</div>
	) : null;

	/* Image element */
	const imageEl = ( struct.hasImage && ( isSplit || isFullbleed ) ) ? (
		<div className={ `${ isSplit ? 'flex-1 w-full max-w-[35rem]' : '' } ${ isFullbleed ? 'absolute inset-0 z-0' : '' }` }>
			{ imageUrl ? (
				<img
					src={ imageUrl }
					alt={ imageAlt }
					width="800"
					height="620"
					loading="eager"
					decoding="async"
					className={ `w-full h-auto object-cover ${ isSplit ? 'rounded-[1.25rem]' : 'w-full h-full' }` }
				/>
			) : (
				<div className={ `flex items-center justify-center ${ isSplit ? 'rounded-[1.25rem] aspect-[4/3]' : 'w-full h-full min-h-[28rem]' } bg-[var(--wp--preset--color--surface-dark)]` }>
					<span className="text-[var(--wp--preset--color--muted-on-dark)] text-[0.875rem] font-[family-name:var(--wp--preset--font-family--inter)]">
						{ __( 'Select hero image', 'kw-package' ) }
					</span>
				</div>
			) }
		</div>
	) : null;

	/* Text content block */
	const textContent = (
		<div className={ `flex flex-col gap-[1.75rem] ${ struct.alignItems } ${ isSplit ? 'flex-1' : 'w-full' } ${ isFullbleed ? 'relative z-10' : '' }` }>
			{ badgeEl }
			<RichText
				tagName="h2"
				value={ heading }
				onChange={ ( val ) => setAttributes( { heading: val } ) }
				className={ `${ struct.headingSize } font-bold tracking-tight leading-[1.1] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ struct.textAlign }` }
				id="hero-heading"
			/>
			<RichText
				tagName="p"
				value={ subheading }
				onChange={ ( val ) => setAttributes( { subheading: val } ) }
				className={ `text-[1rem] md:text-[1.0625rem] leading-[1.65] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] ${ struct.maxSubWidth } ${ struct.textAlign }` }
			/>
			{ struct.hasForm ? formEl : (
				<div className={ `flex flex-wrap ${ isCentered ? 'justify-center' : '' } items-center gap-[1rem]` }>
					{ primaryBtnEl }
					{ secondaryBtnEl }
				</div>
			) }
			{ trustBarEl }
			{ statsBarEl }
		</div>
	);

	return (
		<>
			<InspectorControls>
				{ /* Style & Layout */ }
				<PanelBody title={ __( 'Style & Layout', 'kw-package' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Style Variant', 'kw-package' ) }
						value={ style }
						options={ [
							{ label: 'Split Warm Editorial (A)', value: 'split' },
							{ label: 'Full-Bleed Dramatic (B)', value: 'fullbleed' },
							{ label: 'Centered Minimal (C)', value: 'centered' },
							{ label: 'Text Only / Creative (D)', value: 'textonly' },
							{ label: 'Inline Form / SaaS (E)', value: 'saas' },
							{ label: 'Dark Gradient / Fintech (F)', value: 'dark' },
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

				{ /* Badge */ }
				<PanelBody title={ __( 'Badge', 'kw-package' ) } initialOpen={ false }>
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
				</PanelBody>

				{ /* CTA Buttons */ }
				<PanelBody title={ __( 'Call to Action', 'kw-package' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Primary CTA Text', 'kw-package' ) }
						value={ primaryCtaText }
						onChange={ ( val ) => setAttributes( { primaryCtaText: val } ) }
					/>
					<TextControl
						label={ __( 'Primary CTA URL', 'kw-package' ) }
						value={ primaryCtaUrl }
						onChange={ ( val ) => setAttributes( { primaryCtaUrl: val } ) }
					/>
					<ToggleControl
						label={ __( 'Show Secondary CTA', 'kw-package' ) }
						checked={ showSecondaryCta }
						onChange={ ( val ) => setAttributes( { showSecondaryCta: val } ) }
					/>
					{ showSecondaryCta && (
						<>
							<TextControl
								label={ __( 'Secondary CTA Text', 'kw-package' ) }
								value={ secondaryCtaText }
								onChange={ ( val ) => setAttributes( { secondaryCtaText: val } ) }
							/>
							<TextControl
								label={ __( 'Secondary CTA URL', 'kw-package' ) }
								value={ secondaryCtaUrl }
								onChange={ ( val ) => setAttributes( { secondaryCtaUrl: val } ) }
							/>
						</>
					) }
				</PanelBody>

				{ /* Image (only for split/fullbleed) */ }
				{ struct.hasImage && (
					<PanelBody title={ __( 'Hero Image', 'kw-package' ) } initialOpen={ false }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										imageUrl: media.url,
										imageId: media.id,
										imageAlt: media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ imageId }
								render={ ( { open } ) => (
									<>
										{ imageUrl && (
											<img
												src={ imageUrl }
												alt={ imageAlt }
												style={ { maxWidth: '100%', marginBottom: '8px', borderRadius: '8px' } }
											/>
										) }
										<Button onClick={ open } variant="secondary" style={ { width: '100%', marginBottom: '8px' } }>
											{ imageUrl ? __( 'Replace Image', 'kw-package' ) : __( 'Select Image', 'kw-package' ) }
										</Button>
										{ imageUrl && (
											<Button
												onClick={ () => setAttributes( { imageUrl: '', imageId: 0, imageAlt: '' } ) }
												variant="secondary"
												isDestructive
												style={ { width: '100%' } }
											>
												{ __( 'Remove Image', 'kw-package' ) }
											</Button>
										) }
									</>
								) }
							/>
						</MediaUploadCheck>
						{ imageUrl && (
							<TextControl
								label={ __( 'Alt Text', 'kw-package' ) }
								value={ imageAlt }
								onChange={ ( val ) => setAttributes( { imageAlt: val } ) }
								style={ { marginTop: '8px' } }
							/>
						) }
					</PanelBody>
				) }

				{ /* Trust Bar */ }
				<PanelBody title={ __( 'Trust Bar', 'kw-package' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Trust Bar', 'kw-package' ) }
						checked={ showTrustBar }
						onChange={ ( val ) => setAttributes( { showTrustBar: val } ) }
					/>
					{ showTrustBar && (
						<>
							<TextControl
								label={ __( 'Trust Label', 'kw-package' ) }
								value={ trustLabel }
								onChange={ ( val ) => setAttributes( { trustLabel: val } ) }
							/>
							{ trustItems.map( ( item, index ) => (
								<div key={ item.id } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' } }>
									<TextControl
										value={ item.label }
										onChange={ ( val ) => updateTrustItem( index, val ) }
										style={ { flex: 1, marginBottom: 0 } }
									/>
									{ trustItems.length > 1 && (
										<Button icon="no-alt" isDestructive onClick={ () => removeTrustItem( index ) } label={ __( 'Remove', 'kw-package' ) } />
									) }
								</div>
							) ) }
							<Button onClick={ addTrustItem } variant="secondary" style={ { width: '100%' } }>
								{ __( '+ Add Trust Item', 'kw-package' ) }
							</Button>
						</>
					) }
				</PanelBody>

				{ /* Stats Bar (dark variant) */ }
				<PanelBody title={ __( 'Stats Bar', 'kw-package' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Stats Bar', 'kw-package' ) }
						checked={ showStatsBar }
						onChange={ ( val ) => setAttributes( { showStatsBar: val } ) }
					/>
					{ showStatsBar && (
						<>
							{ stats.map( ( stat, index ) => (
								<PanelBody key={ stat.id } title={ stat.value || `Stat ${ index + 1 }` } initialOpen={ index === 0 }>
									<TextControl
										label={ __( 'Value', 'kw-package' ) }
										value={ stat.value }
										onChange={ ( val ) => updateStat( index, 'value', val ) }
									/>
									<TextControl
										label={ __( 'Label', 'kw-package' ) }
										value={ stat.label }
										onChange={ ( val ) => updateStat( index, 'label', val ) }
									/>
									{ stats.length > 1 && (
										<Button onClick={ () => removeStat( index ) } variant="secondary" isDestructive style={ { marginTop: '8px' } }>
											{ __( 'Remove Stat', 'kw-package' ) }
										</Button>
									) }
								</PanelBody>
							) ) }
							<Button onClick={ addStat } variant="primary" style={ { width: '100%', marginTop: '8px' } }>
								{ __( '+ Add Stat', 'kw-package' ) }
							</Button>
						</>
					) }
				</PanelBody>

				{ /* SaaS Form (saas variant) */ }
				{ struct.hasForm && (
					<PanelBody title={ __( 'Email Form', 'kw-package' ) } initialOpen={ false }>
						<TextControl
							label={ __( 'Placeholder', 'kw-package' ) }
							value={ emailPlaceholder }
							onChange={ ( val ) => setAttributes( { emailPlaceholder: val } ) }
						/>
						<TextControl
							label={ __( 'Button Text', 'kw-package' ) }
							value={ emailButtonText }
							onChange={ ( val ) => setAttributes( { emailButtonText: val } ) }
						/>
						{ proofItems.map( ( item, index ) => (
							<div key={ item.id } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' } }>
								<TextControl
									value={ item.label }
									onChange={ ( val ) => updateProofItem( index, val ) }
									style={ { flex: 1, marginBottom: 0 } }
								/>
								{ proofItems.length > 1 && (
									<Button icon="no-alt" isDestructive onClick={ () => removeProofItem( index ) } label={ __( 'Remove', 'kw-package' ) } />
								) }
							</div>
						) ) }
						<Button onClick={ addProofItem } variant="secondary" style={ { width: '100%' } }>
							{ __( '+ Add Proof Item', 'kw-package' ) }
						</Button>
					</PanelBody>
				) }
			</InspectorControls>

			{ /* Editor canvas */ }
			<section { ...blockProps } aria-labelledby="hero-heading">
				{ /* Fullbleed background image overlay */ }
				{ isFullbleed && imageUrl && (
					<div className="absolute inset-0 z-0" aria-hidden="true">
						<img src={ imageUrl } alt="" className="w-full h-full object-cover" />
						<div className="absolute inset-0 bg-gradient-to-r from-[var(--wp--preset--color--background-dark)] via-[var(--wp--preset--color--background-dark)]/80 to-transparent" />
					</div>
				) }

				<div className={ `max-w-[80rem] mx-auto ${ isSplit ? 'flex flex-col lg:flex-row items-center gap-[2rem] lg:gap-[3.5rem]' : '' } ${ isCentered ? 'flex flex-col items-center' : '' } ${ isFullbleed ? 'relative z-10 flex flex-col justify-center min-h-[24rem]' : '' }` }>
					{ textContent }
					{ isSplit && imageEl }
				</div>
			</section>
		</>
	);
}
