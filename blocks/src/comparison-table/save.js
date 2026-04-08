import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Check icon — green checkmark indicating feature is included.
 */
const CheckIcon = ( { className } ) => (
	<svg
		aria-label="Included"
		className={ className }
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polyline points="20 6 9 17 4 12" />
	</svg>
);

/**
 * Cross icon — grey X indicating feature is not included.
 */
const CrossIcon = ( { className } ) => (
	<svg
		aria-label="Not included"
		className={ className }
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
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
);

/**
 * Partial icon — grey dash indicating partial support.
 */
const PartialIcon = ( { className } ) => (
	<svg
		aria-label="Partial"
		className={ className }
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
		<line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);

/**
 * Colors — light and dark mode fully resolved.
 */
const STYLE_COLORS = {
	light: {
		sectionBg: 'bg-[var(--wp--preset--color--white)]',
		text: 'text-[var(--wp--preset--color--foreground)]',
		muted: 'text-[var(--wp--preset--color--foreground-muted)]',
		subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
		accent: 'text-[var(--wp--preset--color--accent)]',
		border: 'border-[var(--wp--preset--color--border)]',
		theadBg: 'bg-[var(--wp--preset--color--surface)]',
		rowBorder: 'border-[var(--wp--preset--color--surface)]',
		tableBg: 'bg-[var(--wp--preset--color--white)]',
		tableBorder: 'border-[var(--wp--preset--color--border)]',
		checkColor: 'text-[var(--wp--preset--color--forest-green)]',
		crossColor: 'text-[var(--wp--preset--color--grey-light)]',
		highlightedText: 'text-[var(--wp--preset--color--foreground)] font-semibold',
		normalText: 'text-[var(--wp--preset--color--foreground-subtle)]',
		badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
	},
	dark: {
		sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
		text: 'text-[var(--wp--preset--color--white)]',
		muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
		subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
		accent: 'text-[var(--wp--preset--color--accent-light)]',
		border: 'border-[var(--wp--preset--color--border-dark)]',
		theadBg: 'bg-[var(--wp--preset--color--surface-dark)]',
		rowBorder: 'border-[var(--wp--preset--color--border-dark)]',
		tableBg: 'bg-[var(--wp--preset--color--surface-dark)]',
		tableBorder: 'border-[var(--wp--preset--color--border-dark)]',
		checkColor: 'text-[var(--wp--preset--color--forest-green)]',
		crossColor: 'text-[var(--wp--preset--color--grey-light)]',
		highlightedText: 'text-[var(--wp--preset--color--white)] font-semibold',
		normalText: 'text-[var(--wp--preset--color--muted-on-dark)]',
		badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
	},
};

/**
 * Renders a cell value: "check", "cross", "partial", or text string.
 */
const CellValue = ( { value, isHighlighted, c } ) => {
	if ( value === 'check' ) {
		return <CheckIcon className={ `inline-block w-[1.25rem] h-[1.25rem] ${ c.checkColor }` } />;
	}
	if ( value === 'cross' ) {
		return <CrossIcon className={ `inline-block w-[1.25rem] h-[1.25rem] ${ c.crossColor }` } />;
	}
	if ( value === 'partial' ) {
		return <PartialIcon className={ `inline-block w-[1.25rem] h-[1.25rem] ${ c.crossColor }` } />;
	}
	return (
		<span className={ isHighlighted ? c.highlightedText : c.normalText }>
			{ value }
		</span>
	);
};

export default function save( { attributes } ) {
	const {
		heading,
		description,
		showDescription,
		showBadge,
		badgeText,
		colorMode,
		plans,
		features,
	} = attributes;

	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

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

	return (
		<section
			{ ...blockProps }
			aria-labelledby="comparison-heading"
			data-comparison-table=""
			data-color-mode={ colorMode }
		>
			<div className="max-w-[75rem] mx-auto">

				{ /* Header */ }
				<header className="flex flex-col items-center text-center gap-[0.75rem] mb-[2.5rem]">
					{ badge }
					<RichText.Content
						tagName="h2"
						value={ heading }
						className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
						id="comparison-heading"
					/>
					{ showDescription && (
						<RichText.Content
							tagName="p"
							value={ description }
							className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[35rem] leading-relaxed` }
						/>
					) }
				</header>

				{ /* Table wrapper for horizontal scroll on mobile */ }
				<div className="comparison-table-scroll overflow-x-auto -mx-[1.25rem] px-[1.25rem] md:mx-0 md:px-0">
					<table
						className={ `w-full border-collapse rounded-[0.75rem] border ${ c.tableBorder } overflow-hidden font-[family-name:var(--wp--preset--font-family--inter)]` }
						style={ { minWidth: '37.5rem' } }
					>
						<thead>
							<tr className={ c.theadBg }>
								<th
									scope="col"
									className={ `text-left px-[1.5rem] py-[0.875rem] text-[0.8125rem] font-semibold ${ c.text } border-b ${ c.border }` }
								>
									Feature
								</th>
								{ plans.map( ( plan ) => (
									<th
										key={ plan.id }
										scope="col"
										className={ `text-center px-[1.5rem] py-[0.875rem] text-[0.8125rem] border-b ${ c.border } ${ plan.highlighted ? `font-bold ${ c.accent }` : `font-semibold ${ c.muted }` }` }
										style={ { width: '11.25rem' } }
									>
										{ plan.name }
									</th>
								) ) }
							</tr>
						</thead>
						<tbody className={ c.tableBg }>
							{ features.map( ( feature, fIdx ) => (
								<tr
									key={ feature.id }
									className={ fIdx < features.length - 1 ? `border-b ${ c.rowBorder }` : '' }
								>
									<td className={ `px-[1.5rem] py-[0.875rem] text-[0.875rem] ${ c.text }` }>
										{ feature.name }
									</td>
									{ plans.map( ( plan, pIdx ) => (
										<td
											key={ plan.id }
											className="text-center px-[1.5rem] py-[0.875rem] text-[0.875rem]"
										>
											<CellValue
												value={ feature.values[ pIdx ] || '' }
												isHighlighted={ plan.highlighted }
												c={ c }
											/>
										</td>
									) ) }
								</tr>
							) ) }
						</tbody>
					</table>
				</div>

			</div>
		</section>
	);
}
