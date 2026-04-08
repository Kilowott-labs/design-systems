import { useBlockProps, RichText } from '@wordpress/block-editor';

const ChevronIcon = ({ className }) => (
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
		<polyline points="6 9 12 15 18 9" />
	</svg>
);

const PlusMinusIcon = ({ className }) => (
	<span className={ `faq-icon-plus ${ className }` } aria-hidden="true">
		<svg
			className="icon-plus w-[1rem] h-[1rem]"
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
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
		<svg
			className="icon-minus w-[1rem] h-[1rem]"
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
		</svg>
	</span>
);

/**
 * Structure — controls shape, spacing, layout per style variant.
 * No color values here.
 */
const STYLE_STRUCTURE = {
	minimal: {
		itemRadius: '',
		itemPadding: '',
		listSpacing: '',
		isCards: false,
	},
	cards: {
		itemRadius: 'rounded-[0.75rem]',
		itemPadding: 'p-[1.25rem_1.5rem]',
		listSpacing: 'space-y-[0.75rem]',
		isCards: true,
	},
	warm: {
		itemRadius: '',
		itemPadding: '',
		listSpacing: '',
		isCards: false,
	},
};

/**
 * Colors — every style × colorMode combination fully resolved.
 * Access: STYLE_COLORS[ style ][ colorMode ]
 */
const STYLE_COLORS = {
	minimal: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			border: 'border-[var(--wp--preset--color--border)]',
			itemBg: '',
			itemBorder: '',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			tabActive: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)] font-medium',
			ctaBg: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			border: 'border-[var(--wp--preset--color--border-dark)]',
			itemBg: '',
			itemBorder: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			ctaBg: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
		},
	},
	cards: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			border: '',
			itemBg: 'bg-[var(--wp--preset--color--white)]',
			itemBorder: 'border border-[var(--wp--preset--color--border)]',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			tabActive: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)] font-medium',
			ctaBg: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			border: '',
			itemBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			itemBorder: 'border border-[var(--wp--preset--color--border-dark)]',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			ctaBg: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
		},
	},
	warm: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--foreground)]',
			border: 'border-[var(--wp--preset--color--border-warm)]',
			itemBg: '',
			itemBorder: '',
			badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
			tabActive: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-warm)] text-[var(--wp--preset--color--foreground-muted)] font-medium',
			ctaBg: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			border: 'border-[var(--wp--preset--color--border-dark)]',
			itemBg: '',
			itemBorder: '',
			badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
			tabActive: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold',
			tabInactive: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium',
			ctaBg: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
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
		layout,
		iconStyle,
		showBadge,
		badgeText,
		showTabs,
		showCta,
		ctaText,
		ctaUrl,
		allowMultipleOpen,
		firstItemOpen,
		items,
		categories,
	} = attributes;

	const struct = STYLE_STRUCTURE[ style ] || STYLE_STRUCTURE.minimal;
	const c = ( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) || STYLE_COLORS.minimal.light;
	const isDark = colorMode === 'dark';
	const isCards = struct.isCards;
	const isSplit = layout === 'split';
	const IconComponent = iconStyle === 'plus-minus' ? PlusMinusIcon : ChevronIcon;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem]`,
	} );

	/* Badge */
	const badge = showBadge ? (
		<span
			className={ `inline-flex items-center rounded-full px-[1rem] py-[0.375rem] text-[0.75rem] font-semibold tracking-wider font-[family-name:var(--wp--preset--font-family--inter)] ${ c.badgeClasses }` }
		>
			{ badgeText }
		</span>
	) : null;

	/* Tabs */
	const tabs = showTabs ? (
		<nav
			aria-label="FAQ categories"
			className="flex flex-wrap items-center justify-center gap-[0.5rem] mb-[2.5rem]"
			data-faq-tabs=""
		>
			{ categories.map( ( cat, i ) => (
				<button
					key={ cat.id }
					type="button"
					className={ `rounded-full px-[1.25rem] py-[0.625rem] text-[0.875rem] font-[family-name:var(--wp--preset--font-family--inter)] transition-colors duration-200 ${
						i === 0 ? c.tabActive : c.tabInactive
					}` }
					aria-pressed={ i === 0 ? 'true' : 'false' }
					data-faq-tab={ cat.label.toLowerCase().replace( /\s+/g, '-' ) }
				>
					{ cat.label }
				</button>
			) ) }
		</nav>
	) : null;

	/* CTA (split layout) */
	const ctaButton = showCta && isSplit ? (
		<a
			href={ ctaUrl || '#' }
			className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] px-[1.75rem] py-[0.875rem] text-[0.875rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-80 ${ c.ctaBg }` }
		>
			{ ctaText }
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
		</a>
	) : null;

	/* Header block */
	const headerContent = (
		<header
			className={ `flex flex-col ${ isSplit ? 'items-start text-left' : 'items-center text-center' } gap-[0.75rem] ${ isSplit ? 'mb-0' : 'mb-[3rem]' }` }
		>
			{ badge }
			<RichText.Content
				tagName="h2"
				value={ heading }
				className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
				id="faq-heading"
			/>
			{ showDescription && (
				<RichText.Content
					tagName="p"
					value={ description }
					className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] ${ isSplit ? 'max-w-[22rem]' : 'max-w-[35rem]' } leading-relaxed` }
				/>
			) }
			{ ctaButton }
		</header>
	);

	/* FAQ item renderer */
	const renderItem = ( item, index ) => {
		const isOpen = firstItemOpen && index === 0;
		const iconColorClass = isOpen ? c.accent : c.subtle;

		const iconWrapper =
			iconStyle === 'plus-minus' ? (
				<span
					className={ `faq-icon-wrap flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-full shrink-0 transition-colors duration-200 ${
						isOpen
							? `bg-[var(--wp--preset--color--accent-surface)] ${ c.accent }`
							: `bg-[var(--wp--preset--color--surface)] ${ c.subtle }`
					}` }
				>
					<PlusMinusIcon className={ iconColorClass } />
				</span>
			) : (
				<ChevronIcon
					className={ `faq-icon w-[1.25rem] h-[1.25rem] shrink-0 ${ iconColorClass }` }
				/>
			);

		const itemClasses = isCards
			? `${ c.itemBg } ${ c.itemBorder } ${ struct.itemRadius } ${ struct.itemPadding }`
			: `border-b ${ c.border }`;

		return (
			<div
				key={ item.id }
				className={ itemClasses }
				data-faq-item=""
				data-category={ item.category || '' }
			>
				<dt>
					<button
						type="button"
						className={ `faq-trigger flex w-full items-center justify-between py-[1.25rem] text-left cursor-pointer ${ isCards ? 'py-0' : '' }` }
						aria-expanded={ isOpen ? 'true' : 'false' }
						aria-controls={ `faq-answer-${ item.id }` }
						data-faq-trigger=""
					>
						<span
							className={ `faq-question text-[1.0625rem] font-semibold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] pr-[1rem]` }
						>
							{ item.question }
						</span>
						{ iconWrapper }
					</button>
				</dt>
				<dd>
					<div
						id={ `faq-answer-${ item.id }` }
						className="faq-answer"
						data-open={ isOpen ? 'true' : 'false' }
						role="region"
						aria-hidden={ isOpen ? 'false' : 'true' }
					>
						<div className="faq-answer-inner">
							<p
								className={ `${ isCards ? 'pt-[0.5rem]' : '' } pb-[1.25rem] text-[0.9375rem] leading-[1.7] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }
							>
								{ item.answer }
							</p>
						</div>
					</div>
				</dd>
			</div>
		);
	};

	/* FAQ list */
	const faqList = (
		<dl
			className={ `w-full ${ isSplit ? '' : 'max-w-[50rem] mx-auto' } ${ struct.listSpacing }` }
			data-faq-list=""
			data-allow-multiple={ allowMultipleOpen ? 'true' : 'false' }
		>
			{ items.map( ( item, index ) => renderItem( item, index ) ) }
		</dl>
	);

	/* Layout: split or centered */
	if ( isSplit ) {
		return (
			<section
				{ ...blockProps }
				aria-labelledby="faq-heading"
				data-faq-accordion=""
				data-style={ style }
				data-color-mode={ colorMode }
				data-layout="split"
				data-icon={ iconStyle }
			>
				<div className="max-w-[80rem] mx-auto flex flex-col lg:flex-row gap-[3rem] lg:gap-[5rem]">
					<div className="lg:w-[24rem] shrink-0 flex flex-col gap-[1.25rem]">
						{ headerContent }
					</div>
					<div className="flex-1">
						{ tabs }
						{ faqList }
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			{ ...blockProps }
			aria-labelledby="faq-heading"
			data-faq-accordion=""
			data-style={ style }
			data-color-mode={ colorMode }
			data-layout="centered"
			data-icon={ iconStyle }
		>
			<div className="max-w-[80rem] mx-auto">
				{ headerContent }
				{ tabs }
				{ faqList }
			</div>
		</section>
	);
}
