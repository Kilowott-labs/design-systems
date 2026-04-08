import { useBlockProps, RichText } from '@wordpress/block-editor';

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

export default function save( { attributes } ) {
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

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem] ${ isFullbleed ? 'relative overflow-hidden min-h-[28rem]' : '' }`,
	} );

	/* Arrow icon for CTA */
	const arrowIcon = (
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

	/* Badge */
	const badge = showBadge ? (
		<span
			className={ `inline-flex ${ isCentered ? 'self-center' : 'self-start' } items-center rounded-full px-[1rem] py-[0.375rem] text-[0.75rem] font-semibold tracking-wider font-[family-name:var(--wp--preset--font-family--inter)] ${ c.badgeBg }` }
		>
			{ badgeText }
		</span>
	) : null;

	/* CTA buttons */
	const primaryBtn = (
		<a
			href={ primaryCtaUrl || '#' }
			className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] px-[1.75rem] py-[0.875rem] text-[0.9375rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-80 ${ c.primaryBtn }` }
		>
			{ primaryCtaText }
			{ arrowIcon }
		</a>
	);

	const secondaryBtn = showSecondaryCta ? (
		<a
			href={ secondaryCtaUrl || '#' }
			className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] px-[1.75rem] py-[0.875rem] text-[0.9375rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-80 ${ c.secondaryBtn }` }
		>
			{ secondaryCtaText }
		</a>
	) : null;

	/* Trust bar */
	const trustBar = showTrustBar ? (
		<div
			className={ `flex flex-wrap ${ isCentered ? 'justify-center' : '' } items-center gap-[1.5rem] pt-[0.5rem]` }
			data-hero-trust=""
		>
			<span className={ `text-[0.6875rem] font-semibold tracking-widest font-[family-name:var(--wp--preset--font-family--inter)] ${ c.trustText }` }>
				{ trustLabel }
			</span>
			{ trustItems.map( ( item ) => (
				<span
					key={ item.id }
					className={ `text-[1rem] font-bold tracking-widest font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.trustText }` }
				>
					{ item.label }
				</span>
			) ) }
		</div>
	) : null;

	/* Stats bar */
	const statsBar = showStatsBar ? (
		<div
			className={ `flex flex-wrap ${ isCentered ? 'justify-center' : '' } items-center gap-[2.5rem] lg:gap-[5rem] pt-[1rem]` }
			data-hero-stats=""
		>
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

	/* Email form (SaaS variant) */
	const emailForm = struct.hasForm ? (
		<div className="flex flex-col items-center gap-[1rem] w-full max-w-[26rem]" data-hero-form="">
			<form
				className="flex w-full rounded-[0.75rem] overflow-hidden border border-[var(--wp--preset--color--border)]"
				data-hero-email-form=""
			>
				<label className="sr-only" htmlFor="hero-email">{ emailPlaceholder }</label>
				<input
					type="email"
					id="hero-email"
					name="email"
					placeholder={ emailPlaceholder }
					className={ `flex-1 px-[1.25rem] py-[0.875rem] text-[0.9375rem] font-[family-name:var(--wp--preset--font-family--inter)] bg-transparent ${ c.text } outline-none` }
					required
				/>
				<button
					type="submit"
					className={ `px-[1.75rem] py-[0.875rem] text-[0.9375rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] ${ c.primaryBtn } whitespace-nowrap transition-opacity duration-200 hover:opacity-80` }
				>
					{ emailButtonText }
				</button>
			</form>
			<div className="flex flex-wrap items-center justify-center gap-[0.5rem]">
				{ proofItems.map( ( item, i ) => (
					<span key={ item.id }>
						<span className={ `text-[0.8125rem] font-medium font-[family-name:var(--wp--preset--font-family--inter)] ${ c.subtle }` }>
							{ item.label }
						</span>
						{ i < proofItems.length - 1 && (
							<span className={ `mx-[0.25rem] ${ c.subtle }` } aria-hidden="true">&middot;</span>
						) }
					</span>
				) ) }
			</div>
		</div>
	) : null;

	/* Hero image */
	const heroImage = struct.hasImage && imageUrl ? (
		isSplit ? (
			<div className="flex-1 w-full max-w-[35rem]">
				<img
					src={ imageUrl }
					alt={ imageAlt }
					width="800"
					height="620"
					loading="eager"
					fetchpriority="high"
					decoding="async"
					className="w-full h-auto rounded-[1.25rem] object-cover"
				/>
			</div>
		) : null
	) : null;

	/* Fullbleed background */
	const fullbleedBg = isFullbleed && imageUrl ? (
		<div className="absolute inset-0 z-0" aria-hidden="true">
			<img
				src={ imageUrl }
				alt=""
				role="presentation"
				width="1440"
				height="800"
				loading="eager"
				fetchpriority="high"
				decoding="async"
				className="w-full h-full object-cover"
			/>
			<div className="hero-overlay absolute inset-0" />
		</div>
	) : null;

	/* Text content */
	const textContent = (
		<div className={ `flex flex-col gap-[1.75rem] ${ struct.alignItems } ${ isSplit ? 'flex-1' : 'w-full' } ${ isFullbleed ? 'relative z-10' : '' }` }>
			{ badge }
			<RichText.Content
				tagName="h2"
				value={ heading }
				className={ `${ struct.headingSize } font-bold tracking-tight leading-[1.1] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ struct.textAlign }` }
				id="hero-heading"
			/>
			<RichText.Content
				tagName="p"
				value={ subheading }
				className={ `text-[1rem] md:text-[1.0625rem] leading-[1.65] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] ${ struct.maxSubWidth } ${ struct.textAlign }` }
			/>
			{ struct.hasForm ? emailForm : (
				<div className={ `flex flex-wrap ${ isCentered ? 'justify-center' : '' } items-center gap-[1rem]` }>
					{ primaryBtn }
					{ secondaryBtn }
				</div>
			) }
			{ trustBar }
			{ statsBar }
		</div>
	);

	return (
		<section
			{ ...blockProps }
			aria-labelledby="hero-heading"
			data-hero-section=""
			data-style={ style }
			data-color-mode={ colorMode }
			data-layout={ struct.layout }
		>
			{ fullbleedBg }

			<div
				className={ `max-w-[80rem] mx-auto ${
					isSplit
						? 'flex flex-col lg:flex-row items-center gap-[2rem] lg:gap-[3.5rem]'
						: ''
				} ${
					isCentered
						? 'flex flex-col items-center'
						: ''
				} ${
					isFullbleed
						? 'relative z-10 flex flex-col justify-center min-h-[24rem]'
						: ''
				}` }
			>
				{ textContent }
				{ isSplit && heroImage }
			</div>
		</section>
	);
}
