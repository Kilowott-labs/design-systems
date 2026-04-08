import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { imageUrl, imageId, imageAlt, sectionHeight, sectionHeightMobile, parallaxAmount } = attributes;

	const blockProps = useBlockProps( {
		className: 'relative overflow-hidden bg-[var(--wp--preset--color--dark-alt)]',
		style: {
			'--parallax-height': `${ sectionHeight }px`,
			'--parallax-height-mobile': `${ sectionHeightMobile }px`,
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Image', 'agent-theme' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									imageUrl: media.url,
									imageId: media.id,
									imageAlt: media.alt || '',
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
											style={ { width: '100%', marginBottom: '8px', borderRadius: '4px' } }
										/>
									) }
									<Button variant="secondary" onClick={ open } style={ { width: '100%' } }>
										{ imageUrl
											? __( 'Replace Image', 'agent-theme' )
											: __( 'Select Image', 'agent-theme' ) }
									</Button>
								</>
							) }
						/>
					</MediaUploadCheck>
					<TextControl
						label={ __( 'Alt Text', 'agent-theme' ) }
						value={ imageAlt }
						onChange={ ( val ) => setAttributes( { imageAlt: val } ) }
						style={ { marginTop: '12px' } }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Layout', 'agent-theme' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Section Height (desktop)', 'agent-theme' ) }
						value={ sectionHeight }
						onChange={ ( val ) => setAttributes( { sectionHeight: val } ) }
						min={ 200 }
						max={ 1200 }
						step={ 50 }
					/>
					<RangeControl
						label={ __( 'Section Height (mobile)', 'agent-theme' ) }
						value={ sectionHeightMobile }
						onChange={ ( val ) => setAttributes( { sectionHeightMobile: val } ) }
						min={ 150 }
						max={ 800 }
						step={ 50 }
					/>
					<RangeControl
						label={ __( 'Parallax Amount', 'agent-theme' ) }
						value={ parallaxAmount }
						onChange={ ( val ) => setAttributes( { parallaxAmount: val } ) }
						min={ 0.1 }
						max={ 0.6 }
						step={ 0.05 }
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				{ imageUrl ? (
					<img
						src={ imageUrl }
						alt={ imageAlt }
						className="parallax-img"
						style={ { width: '100%', height: '130%', objectFit: 'cover' } }
					/>
				) : (
					<div
						className="flex items-center justify-center text-cream/30 font-inter"
						style={ { height: `${ sectionHeight }px` } }
					>
						{ __( 'Select a parallax image from the sidebar', 'agent-theme' ) }
					</div>
				) }
			</section>
		</>
	);
}
