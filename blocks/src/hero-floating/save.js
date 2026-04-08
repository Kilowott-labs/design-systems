import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Color tokens mapped to theme.json where possible.
 * Design-specific colors that have no theme.json token are noted.
 *
 * Missing from theme.json (used as hardcoded values in SCSS only):
 *   #8B5CF6 (violet-500) — used for mesh gradient, CTA gradient, logo icon
 *   #6D28D9 (violet-700) — CTA gradient end
 *   #06B6D4 (cyan-500) — mesh gradient glow
 *   #A78BFA (violet-400) — badge dot, card icon purple
 *   #22D3EE (cyan-400) — card icon cyan
 *   #34D399 (emerald-400) — card icon green
 *   #FBBF24 (amber-400) — card icon yellow
 *   #09090B (zinc-950) — hero background base
 *   #71717A (zinc-500) — subtitle text
 *   #A1A1AA (zinc-400) — secondary CTA
 *   #D4D4D8 (zinc-300) — compact card text
 */
const STYLE_COLORS = {
	dark: {
		sectionBg: '',
		headingText: 'text-[var(--wp--preset--color--surface)]',
		subtitleText: 'text-[var(--wp--preset--color--foreground-muted)]',
		badgeBg: 'bg-[var(--wp--preset--color--white)]/[0.04]',
		badgeBorder: 'border border-[var(--wp--preset--color--white)]/[0.08]',
		badgeDot: 'hero-floating-badge-dot',
		badgeText: 'text-[var(--wp--preset--color--foreground-subtle)]',
		primaryText: 'text-[var(--wp--preset--color--white)]',
		secondaryBorder: 'border border-[var(--wp--preset--color--white)]/[0.13]',
		secondaryText: 'text-[var(--wp--preset--color--foreground-subtle)]',
		trustText: 'text-[var(--wp--preset--color--grey-light)]',
		cardBg: 'bg-[var(--wp--preset--color--white)]/[0.05]',
		cardBorder: 'border border-[var(--wp--preset--color--white)]/[0.07]',
		cardTitle: 'text-[var(--wp--preset--color--surface)]',
		cardDesc: 'text-[var(--wp--preset--color--foreground-muted)]',
		compactCardText: 'text-[var(--wp--preset--color--grey-light)]',
	},
	light: {
		sectionBg: 'hero-floating-light',
		headingText: 'text-[var(--wp--preset--color--foreground)]',
		subtitleText: 'text-[var(--wp--preset--color--foreground-muted)]',
		badgeBg: 'bg-[var(--wp--preset--color--accent-surface)]',
		badgeBorder: 'border border-[var(--wp--preset--color--border)]',
		badgeDot: 'hero-floating-badge-dot-light',
		badgeText: 'text-[var(--wp--preset--color--foreground-muted)]',
		primaryText: 'text-[var(--wp--preset--color--white)]',
		secondaryBorder: 'border border-[var(--wp--preset--color--border)]',
		secondaryText: 'text-[var(--wp--preset--color--foreground-muted)]',
		trustText: 'text-[var(--wp--preset--color--foreground-muted)]',
		cardBg: 'bg-[var(--wp--preset--color--white)]',
		cardBorder: 'border border-[var(--wp--preset--color--border)]',
		cardTitle: 'text-[var(--wp--preset--color--foreground)]',
		cardDesc: 'text-[var(--wp--preset--color--foreground-muted)]',
		compactCardText: 'text-[var(--wp--preset--color--foreground)]',
	},
};

const ICON_COLOR_CLASSES = {
	purple: 'hero-floating-icon-purple',
	cyan: 'hero-floating-icon-cyan',
	green: 'hero-floating-icon-green',
	yellow: 'hero-floating-icon-yellow',
};

const FloatIcon = ( { name, className } ) => {
	const icons = {
		'file-text': (
			<>
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
				<polyline points="14 2 14 8 20 8" />
				<line x1="16" y1="13" x2="8" y2="13" />
				<line x1="16" y1="17" x2="8" y2="17" />
				<polyline points="10 9 9 9 8 9" />
			</>
		),
		'message-square': (
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		),
		shield: (
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
		),
		zap: (
			<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
		),
		sparkles: (
			<>
				<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
				<path d="M20 3v4" />
				<path d="M22 5h-4" />
				<path d="M4 17v2" />
				<path d="M5 18H3" />
			</>
		),
		play: (
			<polygon points="5 3 19 12 5 21 5 3" />
		),
	};
	return (
		<svg
			className={ className }
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{ icons[ name ] || icons.zap }
		</svg>
	);
};

export default function save( { attributes } ) {
	const {
		colorMode,
		heading,
		subheading,
		showBadge,
		badgeText,
		showTrustBadge,
		trustBadgeText,
		primaryCtaText,
		primaryCtaUrl,
		secondaryCtaText,
		secondaryCtaUrl,
		showSecondaryCta,
		floatingCards,
	} = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.dark;

	const blockProps = useBlockProps.save( {
		className: `hero-floating-section ${ c.sectionBg } relative overflow-hidden`,
	} );

	return (
		<section
			{ ...blockProps }
			aria-labelledby="hero-floating-heading"
			data-hero-floating=""
			data-color-mode={ colorMode }
		>
			{ /* Mesh gradient BG — rendered via ::before in SCSS */ }

			{ /* Hero body */ }
			<div className="relative z-10 flex flex-col items-center justify-center flex-1 hero-floating-body px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] pt-[4.5rem] pb-[3rem]">
				<div className="flex flex-col items-center gap-[1.75rem] max-w-[47rem]">
					{ /* Pill badge */ }
					{ showBadge && (
						<span
							className={ `inline-flex items-center gap-[0.5rem] rounded-full ${ c.badgeBg } ${ c.badgeBorder } px-[1rem] py-[0.375rem] font-[family-name:var(--wp--preset--font-family--inter)]` }
						>
							<span
								className={ `w-[0.375rem] h-[0.375rem] rounded-full ${ c.badgeDot }` }
								aria-hidden="true"
							></span>
							<span
								className={ `text-[0.75rem] font-medium ${ c.badgeText }` }
							>
								{ badgeText }
							</span>
						</span>
					) }

					{ /* Heading */ }
					<RichText.Content
						tagName="h2"
						value={ heading }
						className={ `text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.08] text-center font-[family-name:var(--wp--preset--font-family--dm-sans)] tracking-[-0.156rem] ${ c.headingText }` }
						id="hero-floating-heading"
					/>

					{ /* Subtitle */ }
					<RichText.Content
						tagName="p"
						value={ subheading }
						className={ `text-[1.0625rem] leading-[1.65] text-center ${ c.subtitleText } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[35rem]` }
					/>

					{ /* Trust badge */ }
					{ showTrustBadge && (
						<div className="flex items-center gap-[0.625rem]">
							<FloatIcon
								name="shield"
								className={ `w-[1rem] h-[1rem] hero-floating-icon-green` }
							/>
							<span
								className={ `text-[0.75rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] ${ c.trustText }` }
							>
								{ trustBadgeText }
							</span>
						</div>
					) }

					{ /* CTA buttons */ }
					<div className="flex items-center gap-[0.75rem]">
						<a
							href={ primaryCtaUrl || '#' }
							className={ `hero-floating-primary-cta inline-flex items-center rounded-[0.625rem] ${ c.primaryText } px-[2rem] py-[0.875rem] text-[0.9375rem] font-bold tracking-[-0.019rem] font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-90` }
						>
							{ primaryCtaText }
						</a>
						{ showSecondaryCta && (
							<a
								href={ secondaryCtaUrl || '#' }
								className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.secondaryBorder } ${ c.secondaryText } px-[2rem] py-[0.875rem] text-[0.9375rem] font-semibold tracking-[-0.019rem] font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-80` }
							>
								{ secondaryCtaText }
								<FloatIcon
									name="play"
									className="w-[1rem] h-[1rem]"
								/>
							</a>
						) }
					</div>
				</div>
			</div>

			{ /* Floating cards */ }
			{ floatingCards.map( ( card ) => {
				const isCompact = ! card.description;
				const iconColorClass =
					ICON_COLOR_CLASSES[ card.iconColor ] ||
					ICON_COLOR_CLASSES.purple;
				return (
					<div
						key={ card.id }
						className={ `hero-floating-card hero-floating-pos-${ card.position } hidden lg:flex ${ isCompact ? 'flex-row items-center' : 'flex-col' } gap-[0.625rem] ${ c.cardBg } ${ c.cardBorder } rounded-[0.875rem] p-[1rem] ${ isCompact ? '' : 'w-[12.5rem]' }` }
						aria-hidden="true"
					>
						<FloatIcon
							name={ card.icon }
							className={ `w-[1.25rem] h-[1.25rem] ${ iconColorClass }` }
						/>
						<span
							className={ `text-[0.8125rem] font-semibold font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ isCompact ? c.compactCardText : c.cardTitle }` }
						>
							{ card.title }
						</span>
						{ card.description && (
							<span
								className={ `text-[0.6875rem] leading-[1.5] ${ c.cardDesc } font-[family-name:var(--wp--preset--font-family--inter)]` }
							>
								{ card.description }
							</span>
						) }
					</div>
				);
			} ) }
		</section>
	);
}
