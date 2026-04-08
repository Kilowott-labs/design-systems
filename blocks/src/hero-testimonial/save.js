import { useBlockProps, RichText } from '@wordpress/block-editor';

const STYLE_COLORS = {
	light: {
		sectionBg: 'bg-[var(--wp--preset--color--surface)]',
		text: 'text-[var(--wp--preset--color--background-dark)]',
		muted: 'text-[var(--wp--preset--color--foreground-subtle)]',
		quoteAccent: 'text-[var(--wp--preset--color--royal-blue)]',
		resultValue: 'text-[var(--wp--preset--color--royal-blue)]',
		resultLabel: 'text-[var(--wp--preset--color--foreground-subtle)]',
		resultDivider: 'bg-[var(--wp--preset--color--border)]',
		primaryBg: 'bg-[var(--wp--preset--color--royal-blue)]',
		primaryText: 'text-[var(--wp--preset--color--white)]',
		secondaryBorder: 'border border-[var(--wp--preset--color--grey-light)]',
		secondaryText: 'text-[var(--wp--preset--color--background-dark)]',
		trustBorder: 'border-t border-[var(--wp--preset--color--border)]',
		trustLabel: 'text-[var(--wp--preset--color--grey-light)]',
		trustText: 'text-[var(--wp--preset--color--grey-light)]',
		authorName: 'text-[var(--wp--preset--color--background-dark)]',
		authorCompany: 'text-[var(--wp--preset--color--foreground-subtle)]',
	},
	dark: {
		sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
		text: 'text-[var(--wp--preset--color--white)]',
		muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
		quoteAccent: 'text-[var(--wp--preset--color--accent-light)]',
		resultValue: 'text-[var(--wp--preset--color--accent-light)]',
		resultLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		resultDivider: 'bg-[var(--wp--preset--color--border-dark)]',
		primaryBg: 'bg-[var(--wp--preset--color--royal-blue)]',
		primaryText: 'text-[var(--wp--preset--color--white)]',
		secondaryBorder: 'border border-[var(--wp--preset--color--border-dark)]',
		secondaryText: 'text-[var(--wp--preset--color--white)]',
		trustBorder: 'border-t border-[var(--wp--preset--color--border-dark)]',
		trustLabel: 'text-[var(--wp--preset--color--foreground-subtle)]',
		trustText: 'text-[var(--wp--preset--color--foreground-subtle)]',
		authorName: 'text-[var(--wp--preset--color--white)]',
		authorCompany: 'text-[var(--wp--preset--color--muted-on-dark)]',
	},
};

export default function save( { attributes } ) {
	const { colorMode, quote, authorName, authorCompany, authorImage, results, primaryCtaText, primaryCtaUrl, secondaryCtaText, secondaryCtaUrl, showSecondaryCta, showTrustBar, trustLabel, trustItems } = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg }`,
	} );

	return (
		<section
			{ ...blockProps }
			aria-labelledby="hero-testimonial-heading"
			data-hero-testimonial=""
			data-color-mode={ colorMode }
		>
			<div className="flex flex-col items-center gap-[2.5rem] px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[2.5rem] md:py-[3.5rem]">
				<blockquote className="flex flex-col items-center gap-[1.5rem] max-w-[53.75rem]">
					<span className={ `text-[5rem] leading-[0.5] ${ c.quoteAccent } select-none` } aria-hidden="true">&ldquo;</span>
					<RichText.Content
						tagName="p"
						value={ quote }
						className={ `text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-normal tracking-tight leading-[1.35] text-center ${ c.text } font-[family-name:var(--wp--preset--font-family--playfair)]` }
						id="hero-testimonial-heading"
					/>
					<footer className="flex items-center gap-[0.875rem]">
						{ authorImage && (
							<img
								src={ authorImage }
								alt={ authorName }
								width="44"
								height="44"
								loading="lazy"
								decoding="async"
								className="w-[2.75rem] h-[2.75rem] rounded-full object-cover"
							/>
						) }
						<div className="flex flex-col gap-[0.125rem]">
							<cite className={ `not-italic text-[0.875rem] font-semibold ${ c.authorName } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ authorName }
							</cite>
							<span className={ `text-[0.8125rem] ${ c.authorCompany } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ authorCompany }
							</span>
						</div>
					</footer>
				</blockquote>

				<ul className="flex items-center gap-[3rem] list-none p-0 m-0">
					{ results.map( ( result, index ) => (
						<li key={ result.id } className="flex items-center gap-[3rem]">
							{ index > 0 && (
								<span className={ `w-[0.0625rem] h-[2.5rem] ${ c.resultDivider } shrink-0` } aria-hidden="true"></span>
							) }
							<div className="flex flex-col items-center gap-[0.125rem]">
								<span className={ `text-[2rem] md:text-[2.25rem] font-bold tracking-tight font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.resultValue }` }>
									{ result.value }
								</span>
								<span className={ `text-[0.8125rem] font-medium ${ c.resultLabel } font-[family-name:var(--wp--preset--font-family--inter)]` }>
									{ result.label }
								</span>
							</div>
						</li>
					) ) }
				</ul>

				<div className="flex items-center gap-[0.75rem]">
					<a
						href={ primaryCtaUrl || '#' }
						className={ `inline-flex items-center rounded-[0.5rem] ${ c.primaryBg } ${ c.primaryText } px-[2rem] py-[0.875rem] text-[0.9375rem] font-bold tracking-tight font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-90` }
					>
						{ primaryCtaText }
					</a>
					{ showSecondaryCta && (
						<a
							href={ secondaryCtaUrl || '#' }
							className={ `inline-flex items-center rounded-[0.5rem] ${ c.secondaryBorder } ${ c.secondaryText } px-[2rem] py-[0.875rem] text-[0.9375rem] font-semibold tracking-tight font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-80` }
						>
							{ secondaryCtaText }
						</a>
					) }
				</div>
			</div>

			{ showTrustBar && trustItems.length > 0 && (
				<div className={ `${ c.trustBorder } flex items-center justify-center gap-[3.5rem] h-[4rem] px-[1.25rem] md:px-[5.625rem]` }>
					<span className={ `text-[0.625rem] font-semibold tracking-[0.125rem] ${ c.trustLabel } font-[family-name:var(--wp--preset--font-family--inter)]` }>
						{ trustLabel }
					</span>
					{ trustItems.map( ( item ) => (
						<span key={ item.id } className={ `text-[1rem] font-bold tracking-[0.09375rem] ${ c.trustText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
							{ item.label }
						</span>
					) ) }
				</div>
			) }
		</section>
	);
}
