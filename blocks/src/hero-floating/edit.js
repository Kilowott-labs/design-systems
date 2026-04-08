import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

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

export default function Edit( { attributes, setAttributes } ) {
	const {
		colorMode,
		heading,
		subheading,
		showBadge,
		badgeText,
		showTrustBadge,
		trustBadgeText,
		primaryCtaText,
		secondaryCtaText,
		showSecondaryCta,
		floatingCards,
	} = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.dark;

	const blockProps = useBlockProps( {
		className: `hero-floating-section ${ c.sectionBg } relative overflow-hidden`,
	} );

	const updateCard = ( index, field, value ) => {
		const updated = [ ...floatingCards ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { floatingCards: updated } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Style', 'kw-package' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Color Mode', 'kw-package' ) }
						value={ colorMode }
						options={ [
							{ label: 'Dark', value: 'dark' },
							{ label: 'Light', value: 'light' },
						] }
						onChange={ ( val ) =>
							setAttributes( { colorMode: val } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Badge', 'kw-package' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Badge', 'kw-package' ) }
						checked={ showBadge }
						onChange={ ( val ) =>
							setAttributes( { showBadge: val } )
						}
					/>
					{ showBadge && (
						<TextControl
							label={ __( 'Badge Text', 'kw-package' ) }
							value={ badgeText }
							onChange={ ( val ) =>
								setAttributes( { badgeText: val } )
							}
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Trust Badge', 'kw-package' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Trust Badge', 'kw-package' ) }
						checked={ showTrustBadge }
						onChange={ ( val ) =>
							setAttributes( { showTrustBadge: val } )
						}
					/>
					{ showTrustBadge && (
						<TextControl
							label={ __(
								'Trust Badge Text',
								'kw-package'
							) }
							value={ trustBadgeText }
							onChange={ ( val ) =>
								setAttributes( { trustBadgeText: val } )
							}
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'CTAs', 'kw-package' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Primary CTA Text', 'kw-package' ) }
						value={ primaryCtaText }
						onChange={ ( val ) =>
							setAttributes( { primaryCtaText: val } )
						}
					/>
					<ToggleControl
						label={ __(
							'Show Secondary CTA',
							'kw-package'
						) }
						checked={ showSecondaryCta }
						onChange={ ( val ) =>
							setAttributes( { showSecondaryCta: val } )
						}
					/>
					{ showSecondaryCta && (
						<TextControl
							label={ __(
								'Secondary CTA Text',
								'kw-package'
							) }
							value={ secondaryCtaText }
							onChange={ ( val ) =>
								setAttributes( {
									secondaryCtaText: val,
								} )
							}
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Floating Cards', 'kw-package' ) }
					initialOpen={ false }
				>
					{ floatingCards.map( ( card, index ) => (
						<PanelBody
							key={ card.id }
							title={
								card.title || `Card ${ index + 1 }`
							}
							initialOpen={ false }
						>
							<TextControl
								label={ __( 'Title', 'kw-package' ) }
								value={ card.title }
								onChange={ ( val ) =>
									updateCard( index, 'title', val )
								}
							/>
							<TextControl
								label={ __(
									'Description',
									'kw-package'
								) }
								value={ card.description }
								onChange={ ( val ) =>
									updateCard(
										index,
										'description',
										val
									)
								}
							/>
							<SelectControl
								label={ __(
									'Icon Color',
									'kw-package'
								) }
								value={ card.iconColor }
								options={ [
									{
										label: 'Purple',
										value: 'purple',
									},
									{ label: 'Cyan', value: 'cyan' },
									{
										label: 'Green',
										value: 'green',
									},
									{
										label: 'Yellow',
										value: 'yellow',
									},
								] }
								onChange={ ( val ) =>
									updateCard(
										index,
										'iconColor',
										val
									)
								}
							/>
						</PanelBody>
					) ) }
				</PanelBody>
			</InspectorControls>

			<section
				{ ...blockProps }
				aria-labelledby="hero-floating-heading"
				data-color-mode={ colorMode }
			>
				{ /* Hero body */ }
				<div className="relative z-10 flex flex-col items-center justify-center flex-1 hero-floating-body px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] pt-[4.5rem] pb-[3rem]">
					<div className="flex flex-col items-center gap-[1.75rem] max-w-[47rem]">
						{ showBadge && (
							<span
								className={ `inline-flex items-center gap-[0.5rem] rounded-full ${ c.badgeBg } ${ c.badgeBorder } px-[1rem] py-[0.375rem]` }
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
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) =>
								setAttributes( { heading: val } )
							}
							className={ `text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.08] text-center font-[family-name:var(--wp--preset--font-family--dm-sans)] tracking-[-0.156rem] ${ c.headingText }` }
							id="hero-floating-heading"
						/>
						<RichText
							tagName="p"
							value={ subheading }
							onChange={ ( val ) =>
								setAttributes( { subheading: val } )
							}
							className={ `text-[1.0625rem] leading-[1.65] text-center ${ c.subtitleText } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[35rem]` }
						/>
						{ showTrustBadge && (
							<div className="flex items-center gap-[0.625rem]">
								<span
									className={ `text-[0.75rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] ${ c.trustText }` }
								>
									{ trustBadgeText }
								</span>
							</div>
						) }
						<div className="flex items-center gap-[0.75rem]">
							<span
								className={ `hero-floating-primary-cta inline-flex items-center rounded-[0.625rem] ${ c.primaryText } px-[2rem] py-[0.875rem] text-[0.9375rem] font-bold` }
							>
								{ primaryCtaText }
							</span>
							{ showSecondaryCta && (
								<span
									className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] ${ c.secondaryBorder } ${ c.secondaryText } px-[2rem] py-[0.875rem] text-[0.9375rem] font-semibold` }
								>
									{ secondaryCtaText }
								</span>
							) }
						</div>
					</div>
				</div>

				{ /* Floating cards — simplified preview in editor */ }
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
		</>
	);
}
