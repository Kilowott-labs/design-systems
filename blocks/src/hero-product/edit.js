import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button } from '@wordpress/components';

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

export default function Edit( { attributes, setAttributes } ) {
	const { colorMode, tagline, heading, subheading, productImage, productImageAlt, specs, buyText, buyUrl, installmentText } = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg } flex flex-col`,
	} );

	const updateSpec = ( index, field, value ) => {
		const updated = [ ...specs ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { specs: updated } );
	};

	const addSpec = () => {
		const newId = specs.length > 0 ? Math.max( ...specs.map( ( s ) => s.id ) ) + 1 : 1;
		setAttributes( { specs: [ ...specs, { id: newId, value: '0', label: 'New spec' } ] } );
	};

	const removeSpec = ( index ) => {
		if ( specs.length <= 1 ) return;
		setAttributes( { specs: specs.filter( ( _, i ) => i !== index ) } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Style', 'kw-package' ) } initialOpen={ true }>
					<SelectControl label={ __( 'Color Mode', 'kw-package' ) } value={ colorMode } options={ [ { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' } ] } onChange={ ( val ) => setAttributes( { colorMode: val } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Content', 'kw-package' ) } initialOpen={ false }>
					<TextControl label={ __( 'Tagline', 'kw-package' ) } value={ tagline } onChange={ ( val ) => setAttributes( { tagline: val } ) } />
					<TextControl label={ __( 'Product Image Alt', 'kw-package' ) } value={ productImageAlt } onChange={ ( val ) => setAttributes( { productImageAlt: val } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Product Image', 'kw-package' ) } initialOpen={ false }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { productImage: media.url, productImageId: media.id } ) }
							allowedTypes={ [ 'image' ] }
							value={ attributes.productImageId }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ productImage ? __( 'Replace Image', 'kw-package' ) : __( 'Upload Image', 'kw-package' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody title={ __( 'Buy Bar', 'kw-package' ) } initialOpen={ false }>
					<TextControl label={ __( 'Buy Button Text', 'kw-package' ) } value={ buyText } onChange={ ( val ) => setAttributes( { buyText: val } ) } />
					<TextControl label={ __( 'Buy URL', 'kw-package' ) } value={ buyUrl } onChange={ ( val ) => setAttributes( { buyUrl: val } ) } />
					<TextControl label={ __( 'Installment Text', 'kw-package' ) } value={ installmentText } onChange={ ( val ) => setAttributes( { installmentText: val } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Specs', 'kw-package' ) } initialOpen={ true }>
					{ specs.map( ( spec, index ) => (
						<PanelBody key={ spec.id } title={ `${ spec.value } — ${ spec.label }` } initialOpen={ false }>
							<TextControl label={ __( 'Value', 'kw-package' ) } value={ spec.value } onChange={ ( val ) => updateSpec( index, 'value', val ) } />
							<TextControl label={ __( 'Label', 'kw-package' ) } value={ spec.label } onChange={ ( val ) => updateSpec( index, 'label', val ) } />
							{ specs.length > 1 && (
								<Button onClick={ () => removeSpec( index ) } variant="secondary" isDestructive style={ { marginTop: '8px' } }>
									{ __( 'Remove Spec', 'kw-package' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button onClick={ addSpec } variant="primary" style={ { width: '100%', marginTop: '8px' } }>
						{ __( '+ Add Spec', 'kw-package' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps } aria-labelledby="hero-product-heading">
				<div className="flex-1 flex flex-col items-center justify-center px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[2rem] md:py-[3rem]">
					<div className="flex flex-col items-center gap-[1rem] mb-[2rem]">
						<span className={ `text-[0.6875rem] font-bold tracking-[0.1875rem] ${ c.tagline } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ tagline }
						</span>
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							className={ `text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-bold tracking-tight leading-[1] text-center font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.text }` }
							id="hero-product-heading"
						/>
						<RichText
							tagName="p"
							value={ subheading }
							onChange={ ( val ) => setAttributes( { subheading: val } ) }
							className={ `text-[1rem] leading-[1.65] text-center ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[30rem]` }
						/>
					</div>

					{ productImage ? (
						<img src={ productImage } alt={ productImageAlt } className="max-w-[31.25rem] w-full h-auto object-contain mb-[2rem]" />
					) : (
						<div className="max-w-[31.25rem] w-full h-[21.25rem] bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-muted)] rounded-[0.5rem] mb-[2rem]">
							<span>{ __( 'Upload product image', 'kw-package' ) }</span>
						</div>
					) }

					<div className="flex flex-wrap justify-between gap-[2rem] md:gap-[3rem] w-full max-w-[50rem] px-[1rem] md:px-[4rem]">
						{ specs.map( ( spec ) => (
							<div key={ spec.id } className="flex flex-col items-center gap-[0.25rem]">
								<span className={ `text-[1.5rem] md:text-[1.75rem] font-bold tracking-tight font-[family-name:var(--wp--preset--font-family--dm-sans)] ${ c.specValue }` }>{ spec.value }</span>
								<span className={ `text-[0.75rem] font-medium ${ c.specLabel } font-[family-name:var(--wp--preset--font-family--inter)]` }>{ spec.label }</span>
							</div>
						) ) }
					</div>
				</div>

				<div className="flex items-center justify-center gap-[1rem] h-[4rem] px-[1.25rem]">
					<span className={ `inline-flex items-center rounded-full ${ c.buyBg } ${ c.buyText } px-[2.5rem] py-[0.875rem] text-[0.9375rem] font-bold` }>
						{ buyText }
					</span>
					{ installmentText && <span className={ `text-[0.8125rem] ${ c.installment }` }>{ installmentText }</span> }
				</div>
			</section>
		</>
	);
}
