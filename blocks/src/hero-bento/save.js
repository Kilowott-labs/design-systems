import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Color tokens — mapped to closest theme.json values.
 *
 * Design hex → theme.json token mapping:
 * #FAFAFA  → surface (exact)
 * #18181B  → foreground (#111827 — closest dark)
 * #71717A  → foreground-muted (#6B7280 — close)
 * #FF6B2C  → terracotta (#b7423a — MISSING: no orange token)
 * #C2410C  → terracotta (#b7423a — closest warm red)
 * #FFF7ED  → surface-warm (#F5F0EB — closest warm light)
 * #FFEDD5  → border-warm (#D4C4B8 — closest warm border)
 * #E4E4E7  → border (#E5E7EB — close)
 * #F4F4F5  → border (#E5E7EB — closest light border)
 * #16A34A  → forest-green (#2e6b3f — closest green)
 * #F0FDF4  → hero-bg (#f6f8ef — closest light green)
 * #A1A1AA  → foreground-subtle (#9CA3AF — close)
 * #F97316  → mango (#f6b44c — closest warm)
 * #FFFFFF  → white (exact)
 * #000000  → black (exact)
 */
const STYLE_COLORS = {
	light: {
		sectionBg: 'bg-[var(--wp--preset--color--surface)]',
		text: 'text-[var(--wp--preset--color--foreground)]',
		muted: 'text-[var(--wp--preset--color--foreground-muted)]',
		cardBg: 'bg-[var(--wp--preset--color--white)]',
		cardBorder: 'border border-[var(--wp--preset--color--border)]',
		cardDarkBg: 'bg-[var(--wp--preset--color--foreground)]',
		cardDarkText: 'text-[var(--wp--preset--color--white)]',
		cardDarkMuted: 'text-[var(--wp--preset--color--foreground-subtle)]',
		accentGradient: 'hero-bento-accent-gradient',
		accentText: 'text-[var(--wp--preset--color--white)]',
		iconColor: 'text-[var(--wp--preset--color--terracotta)]',
		badgeBg: 'bg-[var(--wp--preset--color--surface-warm)]',
		badgeBorder: 'border border-[var(--wp--preset--color--border-warm)]',
		badgeLabel: 'text-[var(--wp--preset--color--terracotta)]',
		badgeText: 'text-[var(--wp--preset--color--terracotta)]',
		primaryBg: 'bg-[var(--wp--preset--color--terracotta)]',
		primaryText: 'text-[var(--wp--preset--color--white)]',
		secondaryBorder: 'border-[1.5px] border-[var(--wp--preset--color--border)]',
		secondaryText: 'text-[var(--wp--preset--color--foreground)]',
		trendBg: 'bg-[var(--wp--preset--color--hero-bg)]',
		trendText: 'text-[var(--wp--preset--color--forest-green)]',
	},
	dark: {
		sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
		text: 'text-[var(--wp--preset--color--white)]',
		muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
		cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
		cardBorder: 'border border-[var(--wp--preset--color--border-dark)]',
		cardDarkBg: 'bg-[var(--wp--preset--color--foreground)]',
		cardDarkText: 'text-[var(--wp--preset--color--white)]',
		cardDarkMuted: 'text-[var(--wp--preset--color--foreground-subtle)]',
		accentGradient: 'hero-bento-accent-gradient',
		accentText: 'text-[var(--wp--preset--color--white)]',
		iconColor: 'text-[var(--wp--preset--color--terracotta)]',
		badgeBg: 'bg-[var(--wp--preset--color--surface-dark)]',
		badgeBorder: 'border border-[var(--wp--preset--color--border-dark)]',
		badgeLabel: 'text-[var(--wp--preset--color--accent-light)]',
		badgeText: 'text-[var(--wp--preset--color--muted-on-dark)]',
		primaryBg: 'bg-[var(--wp--preset--color--terracotta)]',
		primaryText: 'text-[var(--wp--preset--color--white)]',
		secondaryBorder: 'border-[1.5px] border-[var(--wp--preset--color--border-dark)]',
		secondaryText: 'text-[var(--wp--preset--color--white)]',
		trendBg: 'bg-[var(--wp--preset--color--surface-dark)]',
		trendText: 'text-[var(--wp--preset--color--forest-green)]',
	},
};

/* ── SVG card icons ── */
const CardIcon = ( { name, className } ) => {
	const icons = {
		'chart-bar': (
			<>
				<rect x="3" y="12" width="4" height="9" rx="1" />
				<rect x="10" y="8" width="4" height="13" rx="1" />
				<rect x="17" y="3" width="4" height="18" rx="1" />
			</>
		),
		users: (
			<>
				<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
				<path d="M16 3.13a4 4 0 0 1 0 7.75" />
			</>
		),
		zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
		globe: (
			<>
				<circle cx="12" cy="12" r="10" />
				<line x1="2" y1="12" x2="22" y2="12" />
				<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
	};
	return (
		<svg
			className={ className }
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
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
		badgeLabel,
		primaryCtaText,
		primaryCtaUrl,
		secondaryCtaText,
		secondaryCtaUrl,
		showSecondaryCta,
		cards,
	} = attributes;

	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg } overflow-hidden`,
	} );

	const topCards = cards.filter( ( _, i ) => i < 2 );
	const botCards = cards.filter( ( _, i ) => i >= 2 );

	const renderCard = ( card ) => {
		const isDark = card.dark;
		const isAccent = card.accent;
		const isLarge = card.size === 'large';

		/* Background */
		let bgClass;
		if ( isAccent ) {
			bgClass = c.accentGradient;
		} else if ( isDark ) {
			bgClass = c.cardDarkBg;
		} else {
			bgClass = `${ c.cardBg } ${ c.cardBorder }`;
		}

		/* Text color */
		const textClass = isAccent ? c.accentText : ( isDark ? c.cardDarkText : c.text );

		/* Icon color */
		const iconClass = isAccent ? c.accentText : c.iconColor;

		/* Gap — large cards 0.75rem, small cards 0.5rem */
		const gapClass = isLarge ? 'gap-[0.75rem]' : 'gap-[0.5rem]';

		/* Value size — 32px (2rem) for large, 28px (1.75rem) for small */
		const valueSize = isLarge ? 'text-[2rem]' : 'text-[1.75rem]';

		return (
			<li
				key={ card.id }
				className={ `rounded-[1rem] p-[1.25rem] flex flex-col ${ gapClass } flex-1 ${ bgClass }` }
			>
				{ /* Icon */ }
				<CardIcon
					name={ card.icon }
					className={ `w-[1.5rem] h-[1.5rem] ${ iconClass }` }
				/>

				{ /* Label */ }
				<span
					className={ `text-[0.875rem] font-semibold tracking-tight font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ isDark ? c.cardDarkText : textClass }` }
				>
					{ card.label }
				</span>

				{ /* Value */ }
				<span
					className={ `${ valueSize } font-bold tracking-tight font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ textClass }` }
				>
					{ card.value }
				</span>

				{ /* Trend tag — green pill for normal cards with trendUp */ }
				{ card.trend && card.trendUp && ! isDark && ! isAccent && (
					<span
						className={ `inline-flex items-center self-start gap-[0.25rem] rounded-full ${ c.trendBg } ${ c.trendText } px-[0.625rem] py-[0.1875rem] text-[0.6875rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)]` }
					>
						<svg
							aria-hidden="true"
							focusable="false"
							className="w-[0.75rem] h-[0.75rem]"
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
							<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
							<polyline points="16 7 22 7 22 13" />
						</svg>
						{ card.trend }
					</span>
				) }

				{ /* Muted text for dark cards */ }
				{ card.trend && isDark && (
					<span
						className={ `text-[0.75rem] ${ c.cardDarkMuted } font-[family-name:var(--wp--preset--font-family--inter)]` }
					>
						{ card.trend }
					</span>
				) }
			</li>
		);
	};

	return (
		<section
			{ ...blockProps }
			aria-labelledby="hero-bento-heading"
			data-hero-bento=""
			data-color-mode={ colorMode }
		>
			{ /* ── Hero Body ── */ }
			<div className="px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] pt-[3rem] pb-[2.5rem]">
				<div className="max-w-[80rem] mx-auto flex flex-col lg:flex-row gap-[1.5rem] min-h-[28rem]">
					{ /* Left column */ }
					<div className="lg:w-[27.5rem] shrink-0 flex flex-col justify-center gap-[1.5rem]">
						{ showBadge && (
							<span
								className={ `inline-flex self-start items-center gap-[0.5rem] rounded-full ${ c.badgeBg } ${ c.badgeBorder } px-[0.875rem] py-[0.3125rem] font-[family-name:var(--wp--preset--font-family--inter)]` }
							>
								<span className={ `text-[0.625rem] font-bold tracking-[0.0625em] ${ c.badgeLabel }` }>
									{ badgeLabel }
								</span>
								<span className={ `text-[0.75rem] font-medium ${ c.badgeText }` }>
									{ badgeText }
								</span>
							</span>
						) }

						<RichText.Content
							tagName="h2"
							value={ heading }
							className={ `text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold tracking-tight leading-[1.1] font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.text }` }
							id="hero-bento-heading"
						/>

						<RichText.Content
							tagName="p"
							value={ subheading }
							className={ `text-[1rem] leading-[1.65] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[23.75rem]` }
						/>

						<div className="flex items-center gap-[0.75rem]">
							<a
								href={ primaryCtaUrl || '#' }
								className={ `inline-flex items-center rounded-[0.625rem] ${ c.primaryBg } ${ c.primaryText } px-[1.75rem] py-[0.875rem] text-[0.9375rem] font-bold tracking-tight no-underline font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-90` }
							>
								{ primaryCtaText }
							</a>
							{ showSecondaryCta && (
								<a
									href={ secondaryCtaUrl || '#' }
									className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.secondaryBorder } ${ c.secondaryText } px-[1.75rem] py-[0.875rem] text-[0.9375rem] font-semibold tracking-tight no-underline font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-80` }
								>
									{ secondaryCtaText }
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
										<polygon points="5 3 19 12 5 21 5 3" />
									</svg>
								</a>
							) }
						</div>
					</div>

					{ /* Right column — Bento Grid */ }
					<div className="flex-1 flex flex-col gap-[0.75rem]">
						<ul className="flex flex-col sm:flex-row gap-[0.75rem] list-none p-0 m-0 flex-1">
							{ topCards.map( renderCard ) }
						</ul>
						<ul className="flex flex-col sm:flex-row gap-[0.75rem] list-none p-0 m-0 flex-1">
							{ botCards.map( renderCard ) }
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
