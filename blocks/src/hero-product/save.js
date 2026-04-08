import { useBlockProps, RichText } from '@wordpress/block-editor';

const STYLE_COLORS = {
	light: {
		sectionBg: 'bg-[var(--wp--preset--color--surface)]',
		text: 'text-[var(--wp--preset--color--foreground)]',
		muted: 'text-[var(--wp--preset--color--foreground-subtle)]',
		tagline: 'text-[var(--wp--preset--color--foreground-subtle)]',
		specValue: 'text-[var(--wp--preset--color--foreground)]',
		specLabel: 'text-[var(--wp--preset--color--foreground-subtle)]',
		buyBg: 'bg-[var(--wp--preset--color--foreground)]',
		buyText: 'text-[var(--wp--preset--color--white)]',
		installment: 'text-[var(--wp--preset--color--foreground-subtle)]',
	},
	dark: {
		sectionBg: 'bg-[var(--wp--preset--color--dark)]',
		text: 'text-[var(--wp--preset--color--white)]',
		muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
		tagline: 'text-[var(--wp--preset--color--foreground-subtle)]',
		specValue: 'text-[var(--wp--preset--color--white)]',
		specLabel: 'text-[var(--wp--preset--color--foreground-subtle)]',
		buyBg: 'bg-[var(--wp--preset--color--white)]',
		buyText: 'text-[var(--wp--preset--color--foreground)]',
		installment: 'text-[var(--wp--preset--color--foreground-subtle)]',
	},
};

export default function save( { attributes } ) {
	const { colorMode, tagline, heading, subheading, productImage, productImageAlt, specs, buyText, buyUrl, installmentText } = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps.save( {
		className: `${ c.sectionBg } flex flex-col`,
	} );

	const placeholderImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="340" fill="%23E5E7EB"%3E%3Crect width="500" height="340"/%3E%3C/svg%3E';

	return (
		<section
			{ ...blockProps }
			aria-labelledby="hero-product-heading"
			data-hero-product=""
			data-color-mode={ colorMode }
		>
			<div className="flex-1 flex flex-col items-center justify-center px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[2rem] md:py-[3rem]">
				<div className="flex flex-col items-center gap-[1rem] mb-[2rem]">
					<span className={ `text-[0.6875rem] font-bold tracking-[0.1875rem] ${ c.tagline } font-[family-name:var(--wp--preset--font-family--inter)]` }>
						{ tagline }
					</span>
					<RichText.Content
						tagName="h2"
						value={ heading }
						className={ `text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-bold tracking-tight leading-[1] text-center font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.text }` }
						id="hero-product-heading"
					/>
					<RichText.Content
						tagName="p"
						value={ subheading }
						className={ `text-[1rem] leading-[1.65] text-center ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[30rem]` }
					/>
				</div>

				<figure className="mb-[2rem]">
					<img
						src={ productImage || placeholderImg }
						alt={ productImageAlt }
						width="500"
						height="340"
						loading="eager"
						fetchpriority="high"
						decoding="async"
						className="max-w-[31.25rem] w-full h-auto object-contain"
					/>
				</figure>

				<ul className="flex flex-wrap justify-between gap-[2rem] md:gap-[3rem] w-full max-w-[50rem] list-none p-0 m-0 px-[1rem] md:px-[4rem]">
					{ specs.map( ( spec ) => (
						<li key={ spec.id } className="flex flex-col items-center gap-[0.25rem]">
							<span className={ `text-[1.5rem] md:text-[1.75rem] font-bold tracking-tight font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.specValue }` }>
								{ spec.value }
							</span>
							<span className={ `text-[0.75rem] font-medium ${ c.specLabel } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ spec.label }
							</span>
						</li>
					) ) }
				</ul>
			</div>

			<div className="flex items-center justify-center gap-[1rem] h-[4rem] px-[1.25rem] md:px-[5.625rem]">
				<a
					href={ buyUrl || '#' }
					className={ `inline-flex items-center rounded-full ${ c.buyBg } ${ c.buyText } px-[2.5rem] py-[0.875rem] text-[0.9375rem] font-bold tracking-tight font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-90` }
				>
					{ buyText }
				</a>
				{ installmentText && (
					<span className={ `text-[0.8125rem] ${ c.installment } font-[family-name:var(--wp--preset--font-family--inter)]` }>
						{ installmentText }
					</span>
				) }
			</div>
		</section>
	);
}
