import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl, Button } from '@wordpress/components';

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

export default function Edit( { attributes, setAttributes } ) {
	const { colorMode, quote, authorName, authorCompany, authorImage, results, primaryCtaText, primaryCtaUrl, secondaryCtaText, secondaryCtaUrl, showSecondaryCta, showTrustBar, trustLabel, trustItems } = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg }`,
	} );

	const updateResult = ( index, field, value ) => {
		const updated = [ ...results ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { results: updated } );
	};

	const addResult = () => {
		const newId = results.length > 0 ? Math.max( ...results.map( ( r ) => r.id ) ) + 1 : 1;
		setAttributes( { results: [ ...results, { id: newId, value: '0', label: 'New metric' } ] } );
	};

	const removeResult = ( index ) => {
		if ( results.length <= 1 ) return;
		setAttributes( { results: results.filter( ( _, i ) => i !== index ) } );
	};

	const updateTrust = ( index, field, value ) => {
		const updated = [ ...trustItems ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { trustItems: updated } );
	};

	const addTrust = () => {
		const newId = trustItems.length > 0 ? Math.max( ...trustItems.map( ( t ) => t.id ) ) + 1 : 1;
		setAttributes( { trustItems: [ ...trustItems, { id: newId, label: 'COMPANY' } ] } );
	};

	const removeTrust = ( index ) => {
		if ( trustItems.length <= 1 ) return;
		setAttributes( { trustItems: trustItems.filter( ( _, i ) => i !== index ) } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Style', 'kw-package' ) } initialOpen={ true }>
					<SelectControl label={ __( 'Color Mode', 'kw-package' ) } value={ colorMode } options={ [ { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' } ] } onChange={ ( val ) => setAttributes( { colorMode: val } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Author', 'kw-package' ) } initialOpen={ false }>
					<TextControl label={ __( 'Author Name', 'kw-package' ) } value={ authorName } onChange={ ( val ) => setAttributes( { authorName: val } ) } />
					<TextControl label={ __( 'Author Company', 'kw-package' ) } value={ authorCompany } onChange={ ( val ) => setAttributes( { authorCompany: val } ) } />
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { authorImage: media.url, authorImageId: media.id } ) }
							allowedTypes={ [ 'image' ] }
							value={ attributes.authorImageId }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ authorImage ? __( 'Replace Avatar', 'kw-package' ) : __( 'Upload Avatar', 'kw-package' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
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
				<PanelBody title={ __( 'Results', 'kw-package' ) } initialOpen={ true }>
					{ results.map( ( result, index ) => (
						<PanelBody key={ result.id } title={ `${ result.value } — ${ result.label }` } initialOpen={ false }>
							<TextControl label={ __( 'Value', 'kw-package' ) } value={ result.value } onChange={ ( val ) => updateResult( index, 'value', val ) } />
							<TextControl label={ __( 'Label', 'kw-package' ) } value={ result.label } onChange={ ( val ) => updateResult( index, 'label', val ) } />
							{ results.length > 1 && (
								<Button onClick={ () => removeResult( index ) } variant="secondary" isDestructive style={ { marginTop: '8px' } }>
									{ __( 'Remove', 'kw-package' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button onClick={ addResult } variant="primary" style={ { width: '100%', marginTop: '8px' } }>
						{ __( '+ Add Result', 'kw-package' ) }
					</Button>
				</PanelBody>
				<PanelBody title={ __( 'Trust Bar', 'kw-package' ) } initialOpen={ false }>
					<ToggleControl label={ __( 'Show Trust Bar', 'kw-package' ) } checked={ showTrustBar } onChange={ ( val ) => setAttributes( { showTrustBar: val } ) } />
					{ showTrustBar && (
						<>
							<TextControl label={ __( 'Trust Label', 'kw-package' ) } value={ trustLabel } onChange={ ( val ) => setAttributes( { trustLabel: val } ) } />
							{ trustItems.map( ( item, index ) => (
								<div key={ item.id } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' } }>
									<TextControl value={ item.label } onChange={ ( val ) => updateTrust( index, 'label', val ) } style={ { flex: 1, marginBottom: 0 } } />
									{ trustItems.length > 1 && <Button icon="no-alt" isDestructive onClick={ () => removeTrust( index ) } label={ __( 'Remove', 'kw-package' ) } /> }
								</div>
							) ) }
							<Button onClick={ addTrust } variant="secondary" style={ { width: '100%' } }>
								{ __( '+ Add Company', 'kw-package' ) }
							</Button>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps } aria-labelledby="hero-testimonial-heading">
				<div className="flex flex-col items-center gap-[2.5rem] px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[2.5rem] md:py-[3.5rem]">
					<blockquote className="flex flex-col items-center gap-[1.5rem] max-w-[53.75rem]">
						<span className={ `text-[5rem] leading-[0.5] ${ c.quoteAccent } select-none` } aria-hidden="true">&ldquo;</span>
						<RichText
							tagName="p"
							value={ quote }
							onChange={ ( val ) => setAttributes( { quote: val } ) }
							className={ `text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-normal tracking-tight leading-[1.35] text-center ${ c.text } font-[family-name:var(--wp--preset--font-family--playfair)]` }
							id="hero-testimonial-heading"
						/>
						<footer className="flex items-center gap-[0.875rem]">
							{ authorImage && <img src={ authorImage } alt={ authorName } className="w-[2.75rem] h-[2.75rem] rounded-full object-cover" /> }
							<div className="flex flex-col gap-[0.125rem]">
								<cite className={ `not-italic text-[0.875rem] font-semibold ${ c.authorName } font-[family-name:var(--wp--preset--font-family--inter)]` }>{ authorName }</cite>
								<span className={ `text-[0.8125rem] ${ c.authorCompany } font-[family-name:var(--wp--preset--font-family--inter)]` }>{ authorCompany }</span>
							</div>
						</footer>
					</blockquote>

					<div className="flex items-center gap-[3rem]">
						{ results.map( ( result, index ) => (
							<div key={ result.id } className="flex items-center gap-[3rem]">
								{ index > 0 && <span className={ `w-[0.0625rem] h-[2.5rem] ${ c.resultDivider } shrink-0` } aria-hidden="true"></span> }
								<div className="flex flex-col items-center gap-[0.125rem]">
									<span className={ `text-[2rem] md:text-[2.25rem] font-bold tracking-tight font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.resultValue }` }>{ result.value }</span>
									<span className={ `text-[0.8125rem] font-medium ${ c.resultLabel } font-[family-name:var(--wp--preset--font-family--inter)]` }>{ result.label }</span>
								</div>
							</div>
						) ) }
					</div>

					<div className="flex items-center gap-[0.75rem]">
						<span className={ `inline-flex items-center rounded-[0.5rem] ${ c.primaryBg } ${ c.primaryText } px-[2rem] py-[0.875rem] text-[0.9375rem] font-bold` }>
							{ primaryCtaText }
						</span>
						{ showSecondaryCta && (
							<span className={ `inline-flex items-center rounded-[0.5rem] ${ c.secondaryBorder } ${ c.secondaryText } px-[2rem] py-[0.875rem] text-[0.9375rem] font-semibold` }>
								{ secondaryCtaText }
							</span>
						) }
					</div>
				</div>

				{ showTrustBar && trustItems.length > 0 && (
					<div className={ `${ c.trustBorder } flex items-center justify-center gap-[3.5rem] h-[4rem] px-[1.25rem] md:px-[5.625rem]` }>
						<span className={ `text-[0.625rem] font-semibold tracking-[0.125rem] ${ c.trustLabel }` }>{ trustLabel }</span>
						{ trustItems.map( ( item ) => (
							<span key={ item.id } className={ `text-[1rem] font-bold tracking-[0.09375rem] ${ c.trustText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>{ item.label }</span>
						) ) }
					</div>
				) }
			</section>
		</>
	);
}
