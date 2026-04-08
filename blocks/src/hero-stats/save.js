import { useBlockProps, RichText } from '@wordpress/block-editor';

const STYLE_COLORS = {
	light: {
		sectionBg: 'bg-[var(--wp--preset--color--white)]',
		text: 'text-[var(--wp--preset--color--background-dark)]',
		muted: 'text-[var(--wp--preset--color--foreground-muted)]',
		tagline: 'text-[var(--wp--preset--color--foreground-subtle)]',
		statValue: 'text-[var(--wp--preset--color--forest-green)]',
		statLabel: 'text-[var(--wp--preset--color--foreground-subtle)]',
		statBorder: 'border-t border-[var(--wp--preset--color--border)]',
		divider: 'border-[var(--wp--preset--color--border)]',
		primaryBg: 'bg-[var(--wp--preset--color--forest-green)]',
		primaryText: 'text-[var(--wp--preset--color--white)]',
		secondaryBorder: 'border border-[var(--wp--preset--color--grey-light)]',
		secondaryText: 'text-[var(--wp--preset--color--background-dark)]',
	},
	dark: {
		sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
		text: 'text-[var(--wp--preset--color--white)]',
		muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
		tagline: 'text-[var(--wp--preset--color--muted-on-dark)]',
		statValue: 'text-[var(--wp--preset--color--forest-green)]',
		statLabel: 'text-[var(--wp--preset--color--muted-on-dark)]',
		statBorder: 'border-t border-[var(--wp--preset--color--border-dark)]',
		divider: 'border-[var(--wp--preset--color--border-dark)]',
		primaryBg: 'bg-[var(--wp--preset--color--forest-green)]',
		primaryText: 'text-[var(--wp--preset--color--white)]',
		secondaryBorder: 'border border-[var(--wp--preset--color--border-dark)]',
		secondaryText: 'text-[var(--wp--preset--color--white)]',
	},
};

export default function save( { attributes } ) {
	const { colorMode, tagline, heading, subheading, primaryCtaText, primaryCtaUrl, secondaryCtaText, secondaryCtaUrl, showSecondaryCta, stats } = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg }`,
	} );

	return (
		<section
			{ ...blockProps }
			aria-labelledby="hero-stats-heading"
			data-hero-stats=""
			data-color-mode={ colorMode }
		>
			<div className={ `border-b ${ c.divider }` }></div>
			<div className="max-w-[80rem] mx-auto flex flex-col lg:flex-row gap-[3rem] lg:gap-[5rem] px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem] items-center">
				<div className="lg:w-[35rem] shrink-0 flex flex-col gap-[1.75rem]">
					<span className={ `text-[0.75rem] font-semibold tracking-[0.15625rem] ${ c.tagline } font-[family-name:var(--wp--preset--font-family--inter)]` }>
						{ tagline }
					</span>
					<RichText.Content
						tagName="h2"
						value={ heading }
						className={ `text-[2rem] md:text-[2.5rem] lg:text-[2.875rem] font-normal tracking-tight leading-[1.2] ${ c.text } font-[family-name:var(--wp--preset--font-family--libre-baskerville)]` }
						id="hero-stats-heading"
					/>
					<RichText.Content
						tagName="p"
						value={ subheading }
						className={ `text-[1rem] leading-[1.7] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[30rem]` }
					/>
					<div className="flex items-center gap-[1rem]">
						<a
							href={ primaryCtaUrl || '#' }
							className={ `inline-flex items-center rounded-[0.375rem] ${ c.primaryBg } ${ c.primaryText } px-[2rem] py-[1rem] text-[0.9375rem] font-semibold tracking-tight font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-90` }
						>
							{ primaryCtaText }
						</a>
						{ showSecondaryCta && (
							<a
								href={ secondaryCtaUrl || '#' }
								className={ `inline-flex items-center rounded-[0.375rem] ${ c.secondaryBorder } ${ c.secondaryText } px-[2rem] py-[1rem] text-[0.9375rem] font-semibold tracking-tight font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-80` }
							>
								{ secondaryCtaText }
							</a>
						) }
					</div>
				</div>
				<div className="flex-1 w-full">
					<dl className="flex flex-col list-none p-0 m-0">
						{ stats.map( ( stat ) => (
							<div key={ stat.id } className={ `${ c.statBorder } py-[2rem] flex flex-col gap-[0.5rem]` }>
								<dt className={ `text-[3rem] font-normal tracking-tight ${ c.statValue } font-[family-name:var(--wp--preset--font-family--libre-baskerville)]` }>
									{ stat.value }
								</dt>
								<dd className={ `text-[0.875rem] font-medium ${ c.statLabel } font-[family-name:var(--wp--preset--font-family--inter)] m-0` }>
									{ stat.label }
								</dd>
							</div>
						) ) }
					</dl>
				</div>
			</div>
		</section>
	);
}
