import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl, Button } from '@wordpress/components';

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
		authorName: 'text-[var(--wp--preset--color--white)]',
		authorDate: 'text-[var(--wp--preset--color--foreground-subtle)]',
	},
};

export default function Edit( { attributes, setAttributes } ) {
	const { colorMode, heading, deck, categoryLabel, readTime, authorName, authorDate, authorImage, featuredImage, featuredImageAlt, showTrending, trendingItems } = attributes;
	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg }`,
	} );

	const updateTrending = ( index, field, value ) => {
		const updated = [ ...trendingItems ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { trendingItems: updated } );
	};

	const addTrending = () => {
		const newId = trendingItems.length > 0 ? Math.max( ...trendingItems.map( ( t ) => t.id ) ) + 1 : 1;
		setAttributes( { trendingItems: [ ...trendingItems, { id: newId, text: 'New trending story' } ] } );
	};

	const removeTrending = ( index ) => {
		if ( trendingItems.length <= 1 ) return;
		setAttributes( { trendingItems: trendingItems.filter( ( _, i ) => i !== index ) } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Style', 'kw-package' ) } initialOpen={ true }>
					<SelectControl label={ __( 'Color Mode', 'kw-package' ) } value={ colorMode } options={ [ { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' } ] } onChange={ ( val ) => setAttributes( { colorMode: val } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Article Meta', 'kw-package' ) } initialOpen={ false }>
					<TextControl label={ __( 'Category Label', 'kw-package' ) } value={ categoryLabel } onChange={ ( val ) => setAttributes( { categoryLabel: val } ) } />
					<TextControl label={ __( 'Read Time', 'kw-package' ) } value={ readTime } onChange={ ( val ) => setAttributes( { readTime: val } ) } />
					<TextControl label={ __( 'Author Name', 'kw-package' ) } value={ authorName } onChange={ ( val ) => setAttributes( { authorName: val } ) } />
					<TextControl label={ __( 'Author Date', 'kw-package' ) } value={ authorDate } onChange={ ( val ) => setAttributes( { authorDate: val } ) } />
					<TextControl label={ __( 'Featured Image Alt', 'kw-package' ) } value={ featuredImageAlt } onChange={ ( val ) => setAttributes( { featuredImageAlt: val } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Images', 'kw-package' ) } initialOpen={ false }>
					<p className="components-base-control__label">{ __( 'Featured Image', 'kw-package' ) }</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { featuredImage: media.url, featuredImageId: media.id } ) }
							allowedTypes={ [ 'image' ] }
							value={ attributes.featuredImageId }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary" style={ { marginBottom: '8px' } }>
									{ featuredImage ? __( 'Replace Image', 'kw-package' ) : __( 'Upload Image', 'kw-package' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<p className="components-base-control__label">{ __( 'Author Avatar', 'kw-package' ) }</p>
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
				<PanelBody title={ __( 'Trending Bar', 'kw-package' ) } initialOpen={ false }>
					<ToggleControl label={ __( 'Show Trending', 'kw-package' ) } checked={ showTrending } onChange={ ( val ) => setAttributes( { showTrending: val } ) } />
					{ showTrending && trendingItems.map( ( item, index ) => (
						<div key={ item.id } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' } }>
							<TextControl value={ item.text } onChange={ ( val ) => updateTrending( index, 'text', val ) } style={ { flex: 1, marginBottom: 0 } } />
							{ trendingItems.length > 1 && <Button icon="no-alt" isDestructive onClick={ () => removeTrending( index ) } label={ __( 'Remove', 'kw-package' ) } /> }
						</div>
					) ) }
					{ showTrending && (
						<Button onClick={ addTrending } variant="secondary" style={ { width: '100%' } }>
							{ __( '+ Add Trending', 'kw-package' ) }
						</Button>
					) }
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps } aria-labelledby="hero-magazine-heading">
				<div className="flex flex-col lg:flex-row min-h-[40rem]">
					<div className="lg:w-[45%] shrink-0">
						{ featuredImage ? (
							<img src={ featuredImage } alt={ featuredImageAlt } className="w-full h-full object-cover rounded-[0.25rem]" />
						) : (
							<div className="w-full h-full min-h-[20rem] bg-[var(--wp--preset--color--border)] flex items-center justify-center text-[var(--wp--preset--color--foreground-muted)] rounded-[0.25rem]">
								<span>{ __( 'Upload featured image', 'kw-package' ) }</span>
							</div>
						) }
					</div>
					<div className="flex-1 flex flex-col justify-center gap-[1.25rem] px-[1.25rem] md:px-[2.5rem] lg:px-[3rem] py-[2.5rem]">
						<div className="flex items-center gap-[0.75rem]">
							<span className={ `${ c.catBg } ${ c.catText } rounded-[0.125rem] px-[0.75rem] py-[0.25rem] text-[0.625rem] font-bold tracking-[0.09375rem]` }>
								{ categoryLabel }
							</span>
							<span className={ `text-[0.6875rem] font-semibold tracking-[0.09375rem] ${ c.subtle }` }>{ readTime }</span>
						</div>
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-normal tracking-tight leading-[1.2] ${ c.text } font-[family-name:var(--wp--preset--font-family--playfair)]` }
							id="hero-magazine-heading"
						/>
						<RichText
							tagName="p"
							value={ deck }
							onChange={ ( val ) => setAttributes( { deck: val } ) }
							className={ `text-[0.9375rem] leading-[1.7] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[30rem]` }
						/>
						<div className="flex items-center gap-[0.75rem] mt-[0.5rem]">
							{ authorImage && <img src={ authorImage } alt={ authorName } className="w-[2.25rem] h-[2.25rem] rounded-full object-cover" /> }
							<div className="flex flex-col gap-[0.125rem]">
								<span className={ `text-[0.8125rem] font-semibold ${ c.authorName }` }>{ authorName }</span>
								<span className={ `text-[0.75rem] ${ c.authorDate }` }>{ authorDate }</span>
							</div>
						</div>
					</div>
				</div>

				{ showTrending && trendingItems.length > 0 && (
					<div className={ `${ c.trendingBg } ${ c.trendingBorder } flex items-center gap-[2rem] px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] h-[3.75rem]` }>
						<span className={ `text-[0.625rem] font-bold tracking-[0.125rem] ${ c.trendLabel }` }>TRENDING</span>
						{ trendingItems.map( ( item, index ) => (
							<span key={ item.id } className={ `text-[0.8125rem] font-medium ${ c.trendText }` }>
								{ String( index + 1 ).padStart( 2, '0' ) }  { item.text }
							</span>
						) ) }
					</div>
				) }
			</section>
		</>
	);
}
