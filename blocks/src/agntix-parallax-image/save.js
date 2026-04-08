import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { imageUrl, imageAlt, sectionHeight, sectionHeightMobile, parallaxAmount } = attributes;

	if ( ! imageUrl ) return null;

	const blockProps = useBlockProps.save( {
		className: 'relative overflow-hidden',
		style: {
			'--parallax-height': `${ sectionHeight }px`,
			'--parallax-height-mobile': `${ sectionHeightMobile }px`,
		},
		'data-parallax-block': '',
		'data-parallax-amount': String( parallaxAmount ),
	} );

	return (
		<section { ...blockProps }>
			<img
				src={ imageUrl }
				alt={ imageAlt }
				className="parallax-img"
				loading="lazy"
				decoding="async"
			/>
		</section>
	);
}
