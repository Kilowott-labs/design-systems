import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl, Button } from '@wordpress/components';

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

export default function Edit( { attributes, setAttributes } ) {
	const { colorMode, tagline, heading, subheading, primaryCtaText, primaryCtaUrl, secondaryCtaText, secondaryCtaUrl, showSecondaryCta, stats } = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg }`,
	} );

	const updateStat = ( index, field, value ) => {
		const updated = [ ...stats ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { stats: updated } );
	};

	const addStat = () => {
		const newId = stats.length > 0 ? Math.max( ...stats.map( ( s ) => s.id ) ) + 1 : 1;
		setAttributes( { stats: [ ...stats, { id: newId, value: '0', label: 'New stat' } ] } );
	};

	const removeStat = ( index ) => {
		if ( stats.length <= 1 ) return;
		setAttributes( { stats: stats.filter( ( _, i ) => i !== index ) } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Style', 'kw-package' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Color Mode', 'kw-package' ) }
						value={ colorMode }
						options={ [
							{ label: 'Light', value: 'light' },
							{ label: 'Dark', value: 'dark' },
						] }
						onChange={ ( val ) => setAttributes( { colorMode: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Content', 'kw-package' ) } initialOpen={ false }>
					<TextControl label={ __( 'Tagline', 'kw-package' ) } value={ tagline } onChange={ ( val ) => setAttributes( { tagline: val } ) } />
				</PanelBody>
				<PanelBody title={ __( 'CTAs', 'kw-package' ) } initialOpen={ false }>
					<TextControl label={ __( 'Primary CTA Text', 'kw-package' ) } value={ primaryCtaText } onChange={ ( val ) => setAttributes( { primaryCtaText: val } ) } />
					<TextControl label={ __( 'Primary CTA URL', 'kw-package' ) } value={ primaryCtaUrl } onChange={ ( val ) => setAttributes( { primaryCtaUrl: val } ) } />
					<ToggleControl label={ __( 'Show Secondary CTA', 'kw-package' ) } checked={ showSecondaryCta } onChange={ ( val ) => setAttributes( { showSecondaryCta: val } ) } />
					{ showSecondaryCta && (
						<>
							<TextControl label={ __( 'Secondary CTA Text', 'kw-package' ) } value={ secondaryCtaText } onChange={ ( val ) => setAttributes( { secondaryCtaText: val } ) } />
							<TextControl label={ __( 'Secondary CTA URL', 'kw-package' ) } value={ secondaryCtaUrl } onChange={ ( val ) => setAttributes( { secondaryCtaUrl: val } ) } />
						</>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Stats', 'kw-package' ) } initialOpen={ true }>
					{ stats.map( ( stat, index ) => (
						<PanelBody key={ stat.id } title={ `${ stat.value } — ${ stat.label }` } initialOpen={ false }>
							<TextControl label={ __( 'Value', 'kw-package' ) } value={ stat.value } onChange={ ( val ) => updateStat( index, 'value', val ) } />
							<TextControl label={ __( 'Label', 'kw-package' ) } value={ stat.label } onChange={ ( val ) => updateStat( index, 'label', val ) } />
							{ stats.length > 1 && (
								<Button onClick={ () => removeStat( index ) } variant="secondary" isDestructive style={ { marginTop: '8px' } }>
									{ __( 'Remove Stat', 'kw-package' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button onClick={ addStat } variant="primary" style={ { width: '100%', marginTop: '8px' } }>
						{ __( '+ Add Stat', 'kw-package' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps } aria-labelledby="hero-stats-heading">
				<div className={ `border-b ${ c.divider }` }></div>
				<div className="max-w-[80rem] mx-auto flex flex-col lg:flex-row gap-[3rem] lg:gap-[5rem] px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem] items-center">
					<div className="lg:w-[35rem] shrink-0 flex flex-col gap-[1.75rem]">
						<span className={ `text-[0.75rem] font-semibold tracking-[0.15625rem] ${ c.tagline } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ tagline }
						</span>
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							className={ `text-[2rem] md:text-[2.5rem] lg:text-[2.875rem] font-normal tracking-tight leading-[1.2] ${ c.text } font-[family-name:var(--wp--preset--font-family--libre-baskerville)]` }
							id="hero-stats-heading"
						/>
						<RichText
							tagName="p"
							value={ subheading }
							onChange={ ( val ) => setAttributes( { subheading: val } ) }
							className={ `text-[1rem] leading-[1.7] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[30rem]` }
						/>
						<div className="flex items-center gap-[1rem]">
							<span className={ `inline-flex items-center rounded-[0.375rem] ${ c.primaryBg } ${ c.primaryText } px-[2rem] py-[1rem] text-[0.9375rem] font-semibold` }>
								{ primaryCtaText }
							</span>
							{ showSecondaryCta && (
								<span className={ `inline-flex items-center rounded-[0.375rem] ${ c.secondaryBorder } ${ c.secondaryText } px-[2rem] py-[1rem] text-[0.9375rem] font-semibold` }>
									{ secondaryCtaText }
								</span>
							) }
						</div>
					</div>
					<div className="flex-1 w-full">
						<dl className="flex flex-col">
							{ stats.map( ( stat ) => (
								<div key={ stat.id } className={ `${ c.statBorder } py-[2rem] flex flex-col gap-[0.5rem]` }>
									<dt className={ `text-[3rem] font-normal tracking-tight ${ c.statValue } font-[family-name:var(--wp--preset--font-family--libre-baskerville)]` }>{ stat.value }</dt>
									<dd className={ `text-[0.875rem] font-medium ${ c.statLabel } font-[family-name:var(--wp--preset--font-family--inter)] m-0` }>{ stat.label }</dd>
								</div>
							) ) }
						</dl>
					</div>
				</div>
			</section>
		</>
	);
}
