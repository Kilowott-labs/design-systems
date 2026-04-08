import { useBlockProps, RichText } from '@wordpress/block-editor';

const STYLE_COLORS = {
	light: {
		sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
		text: 'text-[var(--wp--preset--color--foreground)]',
		muted: 'text-[var(--wp--preset--color--foreground-muted)]',
		subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
		catBg: 'bg-[var(--wp--preset--color--foreground)]',
		catText: 'text-[var(--wp--preset--color--white)]',
		trendingBg: 'bg-[var(--wp--preset--color--white)]',
		trendingBorder: 'border-t border-[var(--wp--preset--color--border-warm)]',
		trendLabel: 'text-[var(--wp--preset--color--terracotta)]',
		trendText: 'text-[var(--wp--preset--color--foreground-muted)]',
		navBorder: 'border-b border-[var(--wp--preset--color--border-warm)]',
		authorName: 'text-[var(--wp--preset--color--foreground)]',
		authorDate: 'text-[var(--wp--preset--color--foreground-subtle)]',
	},
	dark: {
		sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
		text: 'text-[var(--wp--preset--color--white)]',
		muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
		subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
		catBg: 'bg-[var(--wp--preset--color--white)]',
		catText: 'text-[var(--wp--preset--color--foreground)]',
		trendingBg: 'bg-[var(--wp--preset--color--surface-dark)]',
		trendingBorder: 'border-t border-[var(--wp--preset--color--border-dark)]',
		trendLabel: 'text-[var(--wp--preset--color--terracotta)]',
		trendText: 'text-[var(--wp--preset--color--muted-on-dark)]',
		navBorder: 'border-b border-[var(--wp--preset--color--border-dark)]',
		authorName: 'text-[var(--wp--preset--color--white)]',
		authorDate: 'text-[var(--wp--preset--color--foreground-subtle)]',
	},
};

export default function save( { attributes } ) {
	const { colorMode, heading, deck, categoryLabel, readTime, authorName, authorDate, authorImage, featuredImage, featuredImageAlt, showTrending, trendingItems } = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg }`,
	} );

	const placeholderImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="660" height="600" fill="%23E5E7EB"%3E%3Crect width="660" height="600"/%3E%3C/svg%3E';

	return (
		<section
			{ ...blockProps }
			aria-labelledby="hero-magazine-heading"
			data-hero-magazine=""
			data-color-mode={ colorMode }
		>
			<div className="flex flex-col lg:flex-row min-h-[40rem]">
				<div className="lg:w-[45%] shrink-0">
					<img
						src={ featuredImage || placeholderImg }
						alt={ featuredImageAlt }
						width="660"
						height="600"
						loading="eager"
						fetchpriority="high"
						decoding="async"
						className="w-full h-full object-cover rounded-[0.25rem]"
					/>
				</div>
				<div className="flex-1 flex flex-col justify-center gap-[1.25rem] px-[1.25rem] md:px-[2.5rem] lg:px-[3rem] py-[2.5rem]">
					<div className="flex items-center gap-[0.75rem]">
						<span className={ `${ c.catBg } ${ c.catText } rounded-[0.125rem] px-[0.75rem] py-[0.25rem] text-[0.625rem] font-bold tracking-[0.09375rem] font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ categoryLabel }
						</span>
						<span className={ `text-[0.6875rem] font-semibold tracking-[0.09375rem] ${ c.subtle } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ readTime }
						</span>
					</div>
					<RichText.Content
						tagName="h2"
						value={ heading }
						className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-normal tracking-tight leading-[1.2] ${ c.text } font-[family-name:var(--wp--preset--font-family--playfair)]` }
						id="hero-magazine-heading"
					/>
					<RichText.Content
						tagName="p"
						value={ deck }
						className={ `text-[0.9375rem] leading-[1.7] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[30rem]` }
					/>
					<div className="flex items-center gap-[0.75rem] mt-[0.5rem]">
						{ authorImage && (
							<img
								src={ authorImage }
								alt={ authorName }
								width="36"
								height="36"
								loading="lazy"
								decoding="async"
								className="w-[2.25rem] h-[2.25rem] rounded-full object-cover"
							/>
						) }
						<div className="flex flex-col gap-[0.125rem]">
							<span className={ `text-[0.8125rem] font-semibold ${ c.authorName } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ authorName }
							</span>
							<span className={ `text-[0.75rem] ${ c.authorDate } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ authorDate }
							</span>
						</div>
					</div>
				</div>
			</div>

			{ showTrending && trendingItems.length > 0 && (
				<div className={ `${ c.trendingBg } ${ c.trendingBorder } flex items-center gap-[2rem] px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] h-[3.75rem]` }>
					<span className={ `text-[0.625rem] font-bold tracking-[0.125rem] ${ c.trendLabel } font-[family-name:var(--wp--preset--font-family--inter)]` }>
						TRENDING
					</span>
					{ trendingItems.map( ( item, index ) => (
						<span key={ item.id } className={ `text-[0.8125rem] font-medium ${ c.trendText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ String( index + 1 ).padStart( 2, '0' ) }  { item.text }
						</span>
					) ) }
				</div>
			) }
		</section>
	);
}
