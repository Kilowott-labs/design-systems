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
 * Arrow icon used on primary CTA buttons.
 */
const ArrowIcon = () => (
	<svg
		className="w-[1.125rem] h-[1.125rem]"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
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

/**
 * Colors — every style x colorMode combination fully resolved.
 */
const STYLE_COLORS = {
	banner: {
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--accent)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--surface-dark)] text-[var(--wp--preset--color--foreground-on-dark)]',
		},
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground)]',
		},
	},
	split: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'text-[var(--wp--preset--color--foreground)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--accent)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'text-[var(--wp--preset--color--accent-light)]',
		},
	},
	card: {
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[rgba(255,255,255,0.8)]',
			cardBg: 'bg-gradient-to-r from-[var(--wp--preset--color--accent)] to-[#7C3AED]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--accent)]',
			secondaryBtn: 'border border-[rgba(255,255,255,0.4)] text-[var(--wp--preset--color--white)]',
		},
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[rgba(255,255,255,0.8)]',
			cardBg: 'bg-gradient-to-r from-[var(--wp--preset--color--accent)] to-[#7C3AED]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--accent)]',
			secondaryBtn: 'border border-[rgba(255,255,255,0.4)] text-[var(--wp--preset--color--white)]',
		},
	},
	newsletter: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			formBorder: 'border-[var(--wp--preset--color--border)]',
			submitBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			formBorder: 'border-[var(--wp--preset--color--border-dark)]',
			submitBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
		},
	},
	testimonial: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			divider: 'bg-[var(--wp--preset--color--border)]',
			primaryBtn: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			divider: 'bg-[var(--wp--preset--color--border-dark)]',
			primaryBtn: 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]',
			secondaryBtn: 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--white)]',
		},
	},
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		style,
		colorMode,
		heading,
		description,
		showDescription,
		primaryButtonText,
		primaryButtonUrl,
		showPrimaryArrow,
		secondaryButtonText,
		secondaryButtonUrl,
		showSecondaryButton,
		imageUrl,
		imageId,
		imageAlt,
		newsletterPlaceholder,
		newsletterButtonText,
		newsletterPrivacyText,
		testimonialQuote,
		testimonialAuthor,
		testimonialCompany,
		testimonialAvatarUrl,
		testimonialAvatarId,
	} = attributes;

	const c = ( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) || STYLE_COLORS.banner.dark;

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem]`,
	} );

	/* Determine default colorMode based on style when switching */
	const getDefaultColorMode = ( newStyle ) => {
		const defaults = {
			banner: 'dark',
			split: 'light',
			card: 'dark',
			newsletter: 'light',
			testimonial: 'light',
		};
		return defaults[ newStyle ] || 'dark';
	};

	/* Determine default content when switching styles */
	const getDefaultContent = ( newStyle ) => {
		const defaults = {
			banner: {
				heading: 'Ready to transform your workflow?',
				description: 'Join 10,000+ teams already shipping faster. Start your free trial today \u2014 no credit card required.',
				primaryButtonText: 'Start Free Trial',
				secondaryButtonText: 'Talk to Sales',
			},
			split: {
				heading: 'Let\u2019s create something beautiful together',
				description: 'Whether you\u2019re launching a brand, redesigning a product, or scaling your marketing \u2014 we\u2019re here to help.',
				primaryButtonText: 'Start a Project',
				secondaryButtonText: 'View our work',
			},
			card: {
				heading: 'Start building for free',
				description: 'No credit card required. Get started in under 2 minutes with our guided setup.',
				primaryButtonText: 'Get Started Free',
				secondaryButtonText: 'See Pricing',
			},
			newsletter: {
				heading: 'Stay in the loop',
				description: 'Get weekly insights on design, product, and engineering \u2014 no spam, unsubscribe anytime.',
			},
			testimonial: {
				heading: 'Start your free 14-day trial',
				description: 'No credit card required. Full access to all features. Cancel anytime.',
				primaryButtonText: 'Get Started Free',
				secondaryButtonText: 'Book a Demo',
			},
		};
		return defaults[ newStyle ] || defaults.banner;
	};

	const hasButtons = style !== 'newsletter';
	const hasImage = style === 'split';
	const hasForm = style === 'newsletter';
	const hasTestimonial = style === 'testimonial';

	return (
		<>
			<InspectorControls>
				{ /* Style & Layout */ }
				<PanelBody
					title={ __( 'Style & Layout', 'kw-package' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Style Variant', 'kw-package' ) }
						value={ style }
						options={ [
							{ label: 'Full-Width Banner', value: 'banner' },
							{ label: 'Split with Image', value: 'split' },
							{ label: 'Inline Gradient Card', value: 'card' },
							{ label: 'Newsletter Signup', value: 'newsletter' },
							{ label: 'CTA + Testimonial', value: 'testimonial' },
						] }
						onChange={ ( val ) => {
							const defaults = getDefaultContent( val );
							setAttributes( {
								style: val,
								colorMode: getDefaultColorMode( val ),
								...defaults,
							} );
						} }
					/>
					<SelectControl
						label={ __( 'Color Mode', 'kw-package' ) }
						value={ colorMode }
						options={ [
							{ label: 'Light', value: 'light' },
							{ label: 'Dark', value: 'dark' },
						] }
						onChange={ ( val ) =>
							setAttributes( { colorMode: val } )
						}
					/>
				</PanelBody>

				{ /* Content Options */ }
				<PanelBody
					title={ __( 'Content', 'kw-package' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Description', 'kw-package' ) }
						checked={ showDescription }
						onChange={ ( val ) =>
							setAttributes( { showDescription: val } )
						}
					/>
					{ hasButtons && (
						<>
							<ToggleControl
								label={ __( 'Show Arrow on Primary Button', 'kw-package' ) }
								checked={ showPrimaryArrow }
								onChange={ ( val ) =>
									setAttributes( { showPrimaryArrow: val } )
								}
							/>
							<ToggleControl
								label={ __( 'Show Secondary Button', 'kw-package' ) }
								checked={ showSecondaryButton }
								onChange={ ( val ) =>
									setAttributes( { showSecondaryButton: val } )
								}
							/>
						</>
					) }
				</PanelBody>

				{ /* Button URLs */ }
				{ hasButtons && (
					<PanelBody
						title={ __( 'Button Links', 'kw-package' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Primary Button URL', 'kw-package' ) }
							value={ primaryButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { primaryButtonUrl: val } )
							}
						/>
						{ showSecondaryButton && (
							<TextControl
								label={ __( 'Secondary Button URL', 'kw-package' ) }
								value={ secondaryButtonUrl }
								onChange={ ( val ) =>
									setAttributes( { secondaryButtonUrl: val } )
								}
							/>
						) }
					</PanelBody>
				) }

				{ /* Image (split style) */ }
				{ hasImage && (
					<PanelBody
						title={ __( 'Image', 'kw-package' ) }
						initialOpen={ false }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										imageUrl: media.url,
										imageId: media.id,
										imageAlt: media.alt || imageAlt,
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
												style={ {
													width: '100%',
													height: 'auto',
													borderRadius: '8px',
													marginBottom: '8px',
												} }
											/>
										) }
										<Button
											onClick={ open }
											variant="secondary"
											style={ { width: '100%' } }
										>
											{ imageUrl
												? __( 'Replace Image', 'kw-package' )
												: __( 'Select Image', 'kw-package' ) }
										</Button>
									</>
								) }
							/>
						</MediaUploadCheck>
						<TextControl
							label={ __( 'Image Alt Text', 'kw-package' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
							style={ { marginTop: '8px' } }
						/>
					</PanelBody>
				) }

				{ /* Newsletter Settings */ }
				{ hasForm && (
					<PanelBody
						title={ __( 'Newsletter Settings', 'kw-package' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Placeholder Text', 'kw-package' ) }
							value={ newsletterPlaceholder }
							onChange={ ( val ) =>
								setAttributes( { newsletterPlaceholder: val } )
							}
						/>
						<TextControl
							label={ __( 'Button Text', 'kw-package' ) }
							value={ newsletterButtonText }
							onChange={ ( val ) =>
								setAttributes( { newsletterButtonText: val } )
							}
						/>
						<TextControl
							label={ __( 'Privacy Text', 'kw-package' ) }
							value={ newsletterPrivacyText }
							onChange={ ( val ) =>
								setAttributes( { newsletterPrivacyText: val } )
							}
						/>
					</PanelBody>
				) }

				{ /* Testimonial Settings */ }
				{ hasTestimonial && (
					<PanelBody
						title={ __( 'Testimonial', 'kw-package' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Author Name', 'kw-package' ) }
							value={ testimonialAuthor }
							onChange={ ( val ) =>
								setAttributes( { testimonialAuthor: val } )
							}
						/>
						<TextControl
							label={ __( 'Company', 'kw-package' ) }
							value={ testimonialCompany }
							onChange={ ( val ) =>
								setAttributes( { testimonialCompany: val } )
							}
						/>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										testimonialAvatarUrl: media.url,
										testimonialAvatarId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ testimonialAvatarId }
								render={ ( { open } ) => (
									<>
										{ testimonialAvatarUrl && (
											<img
												src={ testimonialAvatarUrl }
												alt={ testimonialAuthor }
												style={ {
													width: '40px',
													height: '40px',
													borderRadius: '50%',
													objectFit: 'cover',
													marginBottom: '8px',
												} }
											/>
										) }
										<Button
											onClick={ open }
											variant="secondary"
											style={ { width: '100%' } }
										>
											{ testimonialAvatarUrl
												? __( 'Replace Avatar', 'kw-package' )
												: __( 'Select Avatar', 'kw-package' ) }
										</Button>
									</>
								) }
							/>
						</MediaUploadCheck>
					</PanelBody>
				) }
			</InspectorControls>

			{ /* ─── Editor Canvas ─── */ }
			<section { ...blockProps } aria-label="CTA section preview">
				{ /* Banner */ }
				{ style === 'banner' && (
					<div className="max-w-[80rem] mx-auto flex flex-col items-center text-center gap-[1.5rem]">
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-bold tracking-[-0.03em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
						/>
						{ showDescription && (
							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) => setAttributes( { description: val } ) }
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.6] max-w-[35rem]` }
							/>
						) }
						<div className="flex flex-wrap items-center justify-center gap-[0.75rem]">
							<span className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.primaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] md:text-[1rem] font-bold tracking-[-0.02em] px-[2.25rem] py-[1rem]` }>
								{ primaryButtonText }
								{ showPrimaryArrow && <ArrowIcon /> }
							</span>
							{ showSecondaryButton && (
								<span className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.secondaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] md:text-[1rem] font-semibold tracking-[-0.02em] px-[2.25rem] py-[1rem]` }>
									{ secondaryButtonText }
								</span>
							) }
						</div>
					</div>
				) }

				{ /* Split with Image */ }
				{ style === 'split' && (
					<div className="max-w-[80rem] mx-auto flex flex-col lg:flex-row items-center gap-[2.5rem] lg:gap-[4rem]">
						<div className="flex-1 flex flex-col gap-[1.5rem]">
							<RichText
								tagName="h2"
								value={ heading }
								onChange={ ( val ) => setAttributes( { heading: val } ) }
								className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-normal tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--playfair)] leading-[1.2]` }
							/>
							{ showDescription && (
								<RichText
									tagName="p"
									value={ description }
									onChange={ ( val ) => setAttributes( { description: val } ) }
									className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.65] max-w-[27.5rem]` }
								/>
							) }
							<div className="flex flex-wrap items-center gap-[1rem]">
								<span className={ `inline-flex items-center gap-[0.5rem] rounded-[0.75rem] ${ c.primaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] font-bold tracking-[-0.02em] px-[2rem] py-[1rem]` }>
									{ primaryButtonText }
									{ showPrimaryArrow && <ArrowIcon /> }
								</span>
								{ showSecondaryButton && (
									<span className={ `inline-flex items-center gap-[0.5rem] ${ c.secondaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] font-semibold tracking-[-0.02em]` }>
										{ secondaryButtonText }
										<ArrowIcon />
									</span>
								) }
							</div>
						</div>
						{ imageUrl && (
							<div className="w-full lg:w-[30rem] shrink-0">
								<img
									src={ imageUrl }
									alt={ imageAlt }
									className="w-full h-auto rounded-[1rem] object-cover aspect-[480/340]"
								/>
							</div>
						) }
					</div>
				) }

				{ /* Inline Card */ }
				{ style === 'card' && (
					<div className={ `max-w-[68.75rem] w-full mx-auto rounded-[1.25rem] ${ c.cardBg } px-[2rem] md:px-[3.5rem] py-[2.5rem] md:py-[3rem] flex flex-col lg:flex-row items-center justify-between gap-[2rem]` }>
						<div className="flex flex-col gap-[0.75rem]">
							<RichText
								tagName="h2"
								value={ heading }
								onChange={ ( val ) => setAttributes( { heading: val } ) }
								className={ `text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
							/>
							{ showDescription && (
								<RichText
									tagName="p"
									value={ description }
									onChange={ ( val ) => setAttributes( { description: val } ) }
									className={ `text-[0.875rem] md:text-[0.9375rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.6]` }
								/>
							) }
						</div>
						<div className="flex flex-wrap items-center gap-[0.75rem] shrink-0">
							<span className={ `inline-flex items-center rounded-[0.625rem] ${ c.primaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] font-bold tracking-[-0.02em] px-[2rem] py-[0.875rem]` }>
								{ primaryButtonText }
							</span>
							{ showSecondaryButton && (
								<span className={ `inline-flex items-center rounded-[0.625rem] ${ c.secondaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] font-semibold tracking-[-0.02em] px-[2rem] py-[0.875rem]` }>
									{ secondaryButtonText }
								</span>
							) }
						</div>
					</div>
				) }

				{ /* Newsletter */ }
				{ style === 'newsletter' && (
					<div className="max-w-[80rem] mx-auto flex flex-col items-center text-center gap-[1.5rem]">
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							className={ `text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-bold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
						/>
						{ showDescription && (
							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) => setAttributes( { description: val } ) }
								className={ `text-[0.875rem] md:text-[0.9375rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.6] max-w-[30rem]` }
							/>
						) }
						<div className={ `flex items-center rounded-[0.625rem] border ${ c.formBorder } overflow-hidden w-full max-w-[24rem]` }>
							<div className="flex items-center gap-[0.625rem] px-[1.125rem] flex-1">
								<svg
									className="w-[1.125rem] h-[1.125rem] text-[var(--wp--preset--color--foreground-subtle)] shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect width="20" height="16" x="2" y="4" rx="2" />
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
								</svg>
								<span className="flex-1 py-[0.75rem] text-[0.875rem] font-[family-name:var(--wp--preset--font-family--inter)] text-[var(--wp--preset--color--foreground-subtle)]">
									{ newsletterPlaceholder }
								</span>
							</div>
							<span className={ `${ c.submitBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.875rem] font-semibold tracking-[-0.02em] px-[1.5rem] py-[0.75rem]` }>
								{ newsletterButtonText }
							</span>
						</div>
						<div className="flex items-center gap-[0.375rem]">
							<svg
								className="w-[0.75rem] h-[0.75rem] text-[var(--wp--preset--color--foreground-subtle)]"
								aria-hidden="true"
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
								<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
								<path d="M7 11V7a5 5 0 0 1 10 0v4" />
							</svg>
							<span className="text-[0.75rem] text-[var(--wp--preset--color--foreground-subtle)] font-[family-name:var(--wp--preset--font-family--inter)]">
								{ newsletterPrivacyText }
							</span>
						</div>
					</div>
				) }

				{ /* Testimonial */ }
				{ style === 'testimonial' && (
					<div className="max-w-[80rem] mx-auto flex flex-col lg:flex-row items-center gap-[2.5rem] lg:gap-[5rem]">
						<div className="flex-1 flex flex-col gap-[1.5rem]">
							<RichText
								tagName="h2"
								value={ heading }
								onChange={ ( val ) => setAttributes( { heading: val } ) }
								className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-bold tracking-[-0.03em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
							/>
							{ showDescription && (
								<RichText
									tagName="p"
									value={ description }
									onChange={ ( val ) => setAttributes( { description: val } ) }
									className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.6] max-w-[27.5rem]` }
								/>
							) }
							<div className="flex flex-wrap items-center gap-[0.75rem]">
								<span className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.primaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] md:text-[1rem] font-bold tracking-[-0.02em] px-[2.25rem] py-[1rem]` }>
									{ primaryButtonText }
									{ showPrimaryArrow && <ArrowIcon /> }
								</span>
								{ showSecondaryButton && (
									<span className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.secondaryBtn } font-[family-name:var(--wp--preset--font-family--inter)] text-[0.9375rem] md:text-[1rem] font-semibold tracking-[-0.02em] px-[2.25rem] py-[1rem]` }>
										{ secondaryButtonText }
									</span>
								) }
							</div>
						</div>
						<div className={ `hidden lg:block w-px h-[13.75rem] ${ c.divider }` }></div>
						<div className="flex-1 flex flex-col gap-[1.25rem]">
							<span className={ `text-[4rem] leading-[0.5] ${ c.accent } font-[family-name:var(--wp--preset--font-family--playfair)]` } aria-hidden="true">&ldquo;</span>
							<RichText
								tagName="p"
								value={ testimonialQuote }
								onChange={ ( val ) => setAttributes( { testimonialQuote: val } ) }
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.text } font-[family-name:var(--wp--preset--font-family--inter)] leading-[1.65]` }
							/>
							<div className="flex items-center gap-[0.75rem]">
								{ testimonialAvatarUrl && (
									<img
										src={ testimonialAvatarUrl }
										alt={ testimonialAuthor }
										className="w-[2.5rem] h-[2.5rem] rounded-full object-cover"
									/>
								) }
								<div className="flex flex-col gap-[0.125rem]">
									<span className={ `text-[0.8125rem] font-semibold ${ c.text } font-[family-name:var(--wp--preset--font-family--inter)]` }>
										{ testimonialAuthor }
									</span>
									<span className={ `text-[0.75rem] ${ c.subtle } font-[family-name:var(--wp--preset--font-family--inter)]` }>
										{ testimonialCompany }
									</span>
								</div>
							</div>
						</div>
					</div>
				) }
			</section>
		</>
	);
}
