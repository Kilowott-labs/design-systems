import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
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
	TextareaControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';

/**
 * Star SVG for editor preview.
 */
const StarIcon = ( { size = '0.875rem' } ) => (
	<svg
		aria-hidden="true"
		className={ `w-[${ size }] h-[${ size }] shrink-0` }
		fill="currentColor"
		viewBox="0 0 24 24"
	>
		<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
	</svg>
);

/**
 * Arrow-right SVG for links.
 */
const ArrowRight = ( { className } ) => (
	<svg
		aria-hidden="true"
		className={ className }
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		viewBox="0 0 24 24"
	>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

/**
 * Colors — mirrors save.js exactly.
 */
const STYLE_COLORS = {
	'logo-ticker': {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			badgeText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			logoText: 'text-[var(--wp--preset--color--grey-light)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			badgeText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			logoText: 'text-[var(--wp--preset--color--surface-dark)]',
		},
	},
	testimonials: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			headingText: 'text-[var(--wp--preset--color--foreground)]',
			mutedText: 'text-[var(--wp--preset--color--foreground-muted)]',
			cardBg: 'bg-[var(--wp--preset--color--white)]',
			cardBorder: 'border-[var(--wp--preset--color--border)]',
			quoteText: 'text-[var(--wp--preset--color--body-text)]',
			authorName: 'text-[var(--wp--preset--color--foreground)]',
			authorRole: 'text-[var(--wp--preset--color--foreground-subtle)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			headingText: 'text-[var(--wp--preset--color--white)]',
			mutedText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border-[var(--wp--preset--color--border-dark)]',
			quoteText: 'text-[var(--wp--preset--color--foreground-on-dark)]',
			authorName: 'text-[var(--wp--preset--color--white)]',
			authorRole: 'text-[var(--wp--preset--color--muted-on-dark)]',
		},
	},
	stats: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			valueText: 'text-[var(--wp--preset--color--foreground)]',
			labelText: 'text-[var(--wp--preset--color--foreground-muted)]',
			divider: 'bg-[var(--wp--preset--color--border)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			valueText: 'text-[var(--wp--preset--color--white)]',
			labelText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			divider: 'bg-[var(--wp--preset--color--divider-dark)]',
		},
	},
	reviews: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			headingText: 'text-[var(--wp--preset--color--foreground)]',
			mutedText: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtleText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			cardBg: 'bg-[var(--wp--preset--color--review-bg)]',
			cardBorder: 'border-[var(--wp--preset--color--review-border)]',
			quoteText: 'text-[var(--wp--preset--color--body-text)]',
			authorName: 'text-[var(--wp--preset--color--foreground)]',
			starColor: 'text-[var(--wp--preset--color--star-yellow)]',
			ratingText: 'text-[var(--wp--preset--color--foreground)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			headingText: 'text-[var(--wp--preset--color--white)]',
			mutedText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtleText: 'text-[var(--wp--preset--color--foreground-subtle)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border-[var(--wp--preset--color--border-dark)]',
			quoteText: 'text-[var(--wp--preset--color--foreground-on-dark)]',
			authorName: 'text-[var(--wp--preset--color--white)]',
			starColor: 'text-[var(--wp--preset--color--star-yellow)]',
			ratingText: 'text-[var(--wp--preset--color--white)]',
		},
	},
	'case-studies': {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			overline: 'text-[var(--wp--preset--color--muted-on-dark)]',
			headingText: 'text-[var(--wp--preset--color--near-black)]',
			cardBg: 'bg-[var(--wp--preset--color--white)]',
			cardBorder: 'border-[var(--wp--preset--color--border-warm)]',
			companyText: 'text-[var(--wp--preset--color--terracotta)]',
			titleText: 'text-[var(--wp--preset--color--near-black)]',
			quoteText: 'text-[var(--wp--preset--color--muted-warm)]',
			linkText: 'text-[var(--wp--preset--color--terracotta)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			overline: 'text-[var(--wp--preset--color--muted-on-dark)]',
			headingText: 'text-[var(--wp--preset--color--white)]',
			cardBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			cardBorder: 'border-[var(--wp--preset--color--border-dark)]',
			companyText: 'text-[var(--wp--preset--color--accent-light)]',
			titleText: 'text-[var(--wp--preset--color--white)]',
			quoteText: 'text-[var(--wp--preset--color--muted-on-dark)]',
			linkText: 'text-[var(--wp--preset--color--accent-light)]',
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
		badgeText,
		overlineText,
		ratingValue,
		reviewCount,
		ctaText,
		ctaUrl,
		logos,
		testimonials,
		stats,
		reviews,
		caseStudies,
	} = attributes;

	const c =
		( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) ||
		STYLE_COLORS.testimonials.light;

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[2rem] md:py-[3rem] lg:py-[4rem]`,
	} );

	/* ---- CRUD helpers ---- */
	const updateLogo = ( index, value ) => {
		const updated = [ ...logos ];
		updated[ index ] = { ...updated[ index ], name: value };
		setAttributes( { logos: updated } );
	};
	const addLogo = () => {
		const newId = logos.length > 0 ? Math.max( ...logos.map( ( l ) => l.id ) ) + 1 : 1;
		setAttributes( { logos: [ ...logos, { id: newId, name: 'BRAND' } ] } );
	};
	const removeLogo = ( index ) => {
		if ( logos.length <= 1 ) return;
		setAttributes( { logos: logos.filter( ( _, i ) => i !== index ) } );
	};

	const updateTestimonial = ( index, field, value ) => {
		const updated = [ ...testimonials ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { testimonials: updated } );
	};
	const updateTestimonialMulti = ( index, fields ) => {
		const updated = [ ...testimonials ];
		updated[ index ] = { ...updated[ index ], ...fields };
		setAttributes( { testimonials: updated } );
	};
	const addTestimonial = () => {
		const newId = testimonials.length > 0 ? Math.max( ...testimonials.map( ( t ) => t.id ) ) + 1 : 1;
		setAttributes( {
			testimonials: [
				...testimonials,
				{ id: newId, quote: 'New testimonial quote.', authorName: 'Name', authorRole: 'Role, Company', avatarUrl: '', avatarId: 0 },
			],
		} );
	};
	const removeTestimonial = ( index ) => {
		if ( testimonials.length <= 1 ) return;
		setAttributes( { testimonials: testimonials.filter( ( _, i ) => i !== index ) } );
	};

	const updateStat = ( index, field, value ) => {
		const updated = [ ...stats ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { stats: updated } );
	};
	const addStat = () => {
		const newId = stats.length > 0 ? Math.max( ...stats.map( ( s ) => s.id ) ) + 1 : 1;
		setAttributes( { stats: [ ...stats, { id: newId, value: '0', label: 'Description' } ] } );
	};
	const removeStat = ( index ) => {
		if ( stats.length <= 1 ) return;
		setAttributes( { stats: stats.filter( ( _, i ) => i !== index ) } );
	};

	const updateReview = ( index, field, value ) => {
		const updated = [ ...reviews ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { reviews: updated } );
	};
	const addReview = () => {
		const newId = reviews.length > 0 ? Math.max( ...reviews.map( ( r ) => r.id ) ) + 1 : 1;
		setAttributes( { reviews: [ ...reviews, { id: newId, quote: 'New review.', authorName: 'Name', source: 'via Platform' } ] } );
	};
	const removeReview = ( index ) => {
		if ( reviews.length <= 1 ) return;
		setAttributes( { reviews: reviews.filter( ( _, i ) => i !== index ) } );
	};

	const updateCaseStudy = ( index, field, value ) => {
		const updated = [ ...caseStudies ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { caseStudies: updated } );
	};
	const updateCaseStudyMulti = ( index, fields ) => {
		const updated = [ ...caseStudies ];
		updated[ index ] = { ...updated[ index ], ...fields };
		setAttributes( { caseStudies: updated } );
	};
	const addCaseStudy = () => {
		const newId = caseStudies.length > 0 ? Math.max( ...caseStudies.map( ( cs ) => cs.id ) ) + 1 : 1;
		setAttributes( {
			caseStudies: [
				...caseStudies,
				{ id: newId, company: 'COMPANY', title: 'Case study title', pullQuote: 'A key result quote.', linkText: 'Read case study', linkUrl: '#', imageUrl: '', imageId: 0 },
			],
		} );
	};
	const removeCaseStudy = ( index ) => {
		if ( caseStudies.length <= 1 ) return;
		setAttributes( { caseStudies: caseStudies.filter( ( _, i ) => i !== index ) } );
	};

	/* ---- Inspector Panels ---- */
	const stylePanel = (
		<PanelBody title={ __( 'Style & Layout', 'kw-package' ) } initialOpen={ true }>
			<SelectControl
				label={ __( 'Style Variant', 'kw-package' ) }
				value={ style }
				options={ [
					{ label: 'Logo Ticker', value: 'logo-ticker' },
					{ label: 'Testimonial Cards', value: 'testimonials' },
					{ label: 'Stats Counter', value: 'stats' },
					{ label: 'Review Highlights', value: 'reviews' },
					{ label: 'Case Study Preview', value: 'case-studies' },
				] }
				onChange={ ( val ) => setAttributes( { style: val } ) }
			/>
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
	);

	/* Style-specific panels */
	const logoTickerPanel = style === 'logo-ticker' && (
		<PanelBody title={ __( 'Logos', 'kw-package' ) } initialOpen={ true }>
			<TextControl
				label={ __( 'Badge Text', 'kw-package' ) }
				value={ badgeText }
				onChange={ ( val ) => setAttributes( { badgeText: val } ) }
			/>
			{ logos.map( ( logo, index ) => (
				<div key={ logo.id } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' } }>
					<TextControl
						value={ logo.name }
						onChange={ ( val ) => updateLogo( index, val ) }
						style={ { flex: 1, marginBottom: 0 } }
					/>
					{ logos.length > 1 && (
						<Button icon="no-alt" isDestructive onClick={ () => removeLogo( index ) } label={ __( 'Remove logo', 'kw-package' ) } />
					) }
				</div>
			) ) }
			<Button onClick={ addLogo } variant="secondary" style={ { width: '100%' } }>
				{ __( '+ Add Logo', 'kw-package' ) }
			</Button>
		</PanelBody>
	);

	const testimonialsPanel = style === 'testimonials' && (
		<PanelBody title={ __( 'Testimonials', 'kw-package' ) } initialOpen={ true }>
			<ToggleControl
				label={ __( 'Show Description', 'kw-package' ) }
				checked={ showDescription }
				onChange={ ( val ) => setAttributes( { showDescription: val } ) }
			/>
			{ testimonials.map( ( item, index ) => (
				<PanelBody key={ item.id } title={ item.authorName || `Item ${ index + 1 }` } initialOpen={ index === 0 }>
					<TextareaControl
						label={ __( 'Quote', 'kw-package' ) }
						value={ item.quote }
						onChange={ ( val ) => updateTestimonial( index, 'quote', val ) }
						rows={ 3 }
					/>
					<TextControl
						label={ __( 'Author Name', 'kw-package' ) }
						value={ item.authorName }
						onChange={ ( val ) => updateTestimonial( index, 'authorName', val ) }
					/>
					<TextControl
						label={ __( 'Author Role', 'kw-package' ) }
						value={ item.authorRole }
						onChange={ ( val ) => updateTestimonial( index, 'authorRole', val ) }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								updateTestimonialMulti( index, { avatarUrl: media.url, avatarId: media.id } )
							}
							allowedTypes={ [ 'image' ] }
							value={ item.avatarId }
							render={ ( { open } ) => (
								<div style={ { marginBottom: '8px' } }>
									{ item.avatarUrl ? (
										<div>
											<img
												src={ item.avatarUrl }
												alt=""
												style={ { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginBottom: '4px' } }
											/>
											<br />
											<Button onClick={ open } variant="secondary" size="small">
												{ __( 'Replace Avatar', 'kw-package' ) }
											</Button>
											<Button
												onClick={ () => updateTestimonialMulti( index, { avatarUrl: '', avatarId: 0 } ) }
												variant="secondary"
												isDestructive
												size="small"
												style={ { marginLeft: '4px' } }
											>
												{ __( 'Remove', 'kw-package' ) }
											</Button>
										</div>
									) : (
										<Button onClick={ open } variant="secondary">
											{ __( 'Select Avatar', 'kw-package' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					{ testimonials.length > 1 && (
						<Button onClick={ () => removeTestimonial( index ) } variant="secondary" isDestructive style={ { marginTop: '8px' } }>
							{ __( 'Remove Testimonial', 'kw-package' ) }
						</Button>
					) }
				</PanelBody>
			) ) }
			<Button onClick={ addTestimonial } variant="primary" style={ { width: '100%', marginTop: '8px' } }>
				{ __( '+ Add Testimonial', 'kw-package' ) }
			</Button>
		</PanelBody>
	);

	const statsPanel = style === 'stats' && (
		<PanelBody title={ __( 'Stats', 'kw-package' ) } initialOpen={ true }>
			{ stats.map( ( stat, index ) => (
				<PanelBody key={ stat.id } title={ `${ stat.value } — ${ stat.label }` } initialOpen={ index === 0 }>
					<TextControl
						label={ __( 'Value', 'kw-package' ) }
						value={ stat.value }
						onChange={ ( val ) => updateStat( index, 'value', val ) }
					/>
					<TextControl
						label={ __( 'Label', 'kw-package' ) }
						value={ stat.label }
						onChange={ ( val ) => updateStat( index, 'label', val ) }
					/>
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
	);

	const reviewsPanel = style === 'reviews' && (
		<PanelBody title={ __( 'Reviews', 'kw-package' ) } initialOpen={ true }>
			<ToggleControl
				label={ __( 'Show Description', 'kw-package' ) }
				checked={ showDescription }
				onChange={ ( val ) => setAttributes( { showDescription: val } ) }
			/>
			<TextControl
				label={ __( 'Rating Value', 'kw-package' ) }
				value={ ratingValue }
				onChange={ ( val ) => setAttributes( { ratingValue: val } ) }
			/>
			<TextControl
				label={ __( 'Review Count', 'kw-package' ) }
				value={ reviewCount }
				onChange={ ( val ) => setAttributes( { reviewCount: val } ) }
			/>
			{ reviews.map( ( review, index ) => (
				<PanelBody key={ review.id } title={ review.authorName || `Review ${ index + 1 }` } initialOpen={ index === 0 }>
					<TextareaControl
						label={ __( 'Quote', 'kw-package' ) }
						value={ review.quote }
						onChange={ ( val ) => updateReview( index, 'quote', val ) }
						rows={ 3 }
					/>
					<TextControl
						label={ __( 'Author', 'kw-package' ) }
						value={ review.authorName }
						onChange={ ( val ) => updateReview( index, 'authorName', val ) }
					/>
					<TextControl
						label={ __( 'Source', 'kw-package' ) }
						value={ review.source }
						onChange={ ( val ) => updateReview( index, 'source', val ) }
					/>
					{ reviews.length > 1 && (
						<Button onClick={ () => removeReview( index ) } variant="secondary" isDestructive style={ { marginTop: '8px' } }>
							{ __( 'Remove Review', 'kw-package' ) }
						</Button>
					) }
				</PanelBody>
			) ) }
			<Button onClick={ addReview } variant="primary" style={ { width: '100%', marginTop: '8px' } }>
				{ __( '+ Add Review', 'kw-package' ) }
			</Button>
		</PanelBody>
	);

	const caseStudiesPanel = style === 'case-studies' && (
		<PanelBody title={ __( 'Case Studies', 'kw-package' ) } initialOpen={ true }>
			<TextControl
				label={ __( 'Overline Text', 'kw-package' ) }
				value={ overlineText }
				onChange={ ( val ) => setAttributes( { overlineText: val } ) }
			/>
			<TextControl
				label={ __( 'CTA Text', 'kw-package' ) }
				value={ ctaText }
				onChange={ ( val ) => setAttributes( { ctaText: val } ) }
			/>
			<TextControl
				label={ __( 'CTA URL', 'kw-package' ) }
				value={ ctaUrl }
				onChange={ ( val ) => setAttributes( { ctaUrl: val } ) }
			/>
			{ caseStudies.map( ( cs, index ) => (
				<PanelBody key={ cs.id } title={ cs.company || `Case Study ${ index + 1 }` } initialOpen={ index === 0 }>
					<TextControl
						label={ __( 'Company', 'kw-package' ) }
						value={ cs.company }
						onChange={ ( val ) => updateCaseStudy( index, 'company', val ) }
					/>
					<TextControl
						label={ __( 'Title', 'kw-package' ) }
						value={ cs.title }
						onChange={ ( val ) => updateCaseStudy( index, 'title', val ) }
					/>
					<TextareaControl
						label={ __( 'Pull Quote', 'kw-package' ) }
						value={ cs.pullQuote }
						onChange={ ( val ) => updateCaseStudy( index, 'pullQuote', val ) }
						rows={ 2 }
					/>
					<TextControl
						label={ __( 'Link Text', 'kw-package' ) }
						value={ cs.linkText }
						onChange={ ( val ) => updateCaseStudy( index, 'linkText', val ) }
					/>
					<TextControl
						label={ __( 'Link URL', 'kw-package' ) }
						value={ cs.linkUrl }
						onChange={ ( val ) => updateCaseStudy( index, 'linkUrl', val ) }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								updateCaseStudyMulti( index, { imageUrl: media.url, imageId: media.id } )
							}
							allowedTypes={ [ 'image' ] }
							value={ cs.imageId }
							render={ ( { open } ) => (
								<div style={ { marginBottom: '8px' } }>
									{ cs.imageUrl ? (
										<div>
											<img
												src={ cs.imageUrl }
												alt=""
												style={ { width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '4px' } }
											/>
											<br />
											<Button onClick={ open } variant="secondary" size="small">
												{ __( 'Replace Image', 'kw-package' ) }
											</Button>
											<Button
												onClick={ () => updateCaseStudyMulti( index, { imageUrl: '', imageId: 0 } ) }
												variant="secondary"
												isDestructive
												size="small"
												style={ { marginLeft: '4px' } }
											>
												{ __( 'Remove', 'kw-package' ) }
											</Button>
										</div>
									) : (
										<Button onClick={ open } variant="secondary">
											{ __( 'Select Image', 'kw-package' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					{ caseStudies.length > 1 && (
						<Button onClick={ () => removeCaseStudy( index ) } variant="secondary" isDestructive style={ { marginTop: '8px' } }>
							{ __( 'Remove Case Study', 'kw-package' ) }
						</Button>
					) }
				</PanelBody>
			) ) }
			<Button onClick={ addCaseStudy } variant="primary" style={ { width: '100%', marginTop: '8px' } }>
				{ __( '+ Add Case Study', 'kw-package' ) }
			</Button>
		</PanelBody>
	);

	/* ---- Editor Preview ---- */
	const renderLogoTicker = () => (
		<div className="max-w-[80rem] mx-auto flex flex-col items-center gap-[1.25rem]">
			<p className={ `text-[0.6875rem] font-semibold tracking-[0.125rem] ${ c.badgeText } font-[family-name:var(--wp--preset--font-family--inter)] uppercase` }>
				{ badgeText }
			</p>
			<div className="w-full overflow-hidden" aria-hidden="true">
				<div className="flex items-center justify-center gap-[3.5rem] whitespace-nowrap flex-wrap">
					{ logos.map( ( logo ) => (
						<span
							key={ logo.id }
							className={ `text-[1.25rem] font-bold tracking-[0.125rem] ${ c.logoText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }
						>
							{ logo.name }
						</span>
					) ) }
				</div>
			</div>
		</div>
	);

	const renderTestimonials = () => (
		<div className="max-w-[80rem] mx-auto flex flex-col gap-[2.5rem]">
			<header className="flex flex-col items-center text-center gap-[0.75rem]">
				<RichText
					tagName="h2"
					value={ heading }
					onChange={ ( val ) => setAttributes( { heading: val } ) }
					className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.headingText } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
				/>
				{ showDescription && (
					<RichText
						tagName="p"
						value={ description }
						onChange={ ( val ) => setAttributes( { description: val } ) }
						className={ `text-[0.9375rem] md:text-[1rem] ${ c.mutedText } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[35rem] leading-relaxed` }
					/>
				) }
			</header>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.25rem]">
				{ testimonials.map( ( item ) => (
					<div
						key={ item.id }
						className={ `flex flex-col justify-between h-full rounded-[1rem] ${ c.cardBg } border ${ c.cardBorder } p-[1.75rem] gap-[1.25rem]` }
					>
						<p className={ `text-[0.9375rem] leading-[1.65] ${ c.quoteText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ `\u201C${ item.quote }\u201D` }
						</p>
						<div className="flex items-center gap-[0.75rem]">
							{ item.avatarUrl && (
								<img
									src={ item.avatarUrl }
									alt=""
									style={ { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' } }
								/>
							) }
							<div className="flex flex-col gap-[0.125rem]">
								<span className={ `not-italic text-[0.8125rem] font-semibold ${ c.authorName } font-[family-name:var(--wp--preset--font-family--inter)]` }>
									{ item.authorName }
								</span>
								<span className={ `text-[0.75rem] ${ c.authorRole } font-[family-name:var(--wp--preset--font-family--inter)]` }>
									{ item.authorRole }
								</span>
							</div>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);

	const renderStats = () => (
		<div className="max-w-[80rem] mx-auto">
			<div className="flex flex-col md:flex-row items-center justify-between gap-[2rem] md:gap-0">
				{ stats.map( ( stat, index ) => (
					<Fragment key={ stat.id }>
						{ index > 0 && (
							<div
								className={ `hidden md:block w-[0.0625rem] h-[3.5rem] ${ c.divider }` }
							/>
						) }
						<div className="flex flex-col items-center gap-[0.25rem]">
							<span className={ `text-[2.75rem] font-bold tracking-[-0.094rem] ${ c.valueText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
								{ stat.value }
							</span>
							<span className={ `text-[0.875rem] ${ c.labelText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ stat.label }
							</span>
						</div>
					</Fragment>
				) ) }
			</div>
		</div>
	);

	const renderReviews = () => (
		<div className="max-w-[80rem] mx-auto flex flex-col gap-[2.25rem]">
			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[1rem]">
				<header className="flex flex-col gap-[0.5rem]">
					<RichText
						tagName="h2"
						value={ heading }
						onChange={ ( val ) => setAttributes( { heading: val } ) }
						className={ `text-[1.75rem] md:text-[2rem] font-bold tracking-[-0.05rem] ${ c.headingText } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
					/>
					{ showDescription && (
						<RichText
							tagName="p"
							value={ description }
							onChange={ ( val ) => setAttributes( { description: val } ) }
							className={ `text-[0.9375rem] ${ c.mutedText } font-[family-name:var(--wp--preset--font-family--inter)]` }
						/>
					) }
				</header>
				<div className="flex items-center gap-[0.75rem]">
					<div className={ `flex items-center gap-[0.25rem] ${ c.starColor }` }>
						{ [ 1, 2, 3, 4, 5 ].map( ( n ) => <StarIcon key={ n } size="1.25rem" /> ) }
					</div>
					<span className={ `text-[0.875rem] font-semibold ${ c.ratingText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
						{ ratingValue }
					</span>
					<span className={ `text-[0.875rem] ${ c.subtleText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
						{ `\u00B7 ${ reviewCount }` }
					</span>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.25rem]">
				{ reviews.map( ( review ) => (
					<div
						key={ review.id }
						className={ `flex flex-col justify-between h-full rounded-[0.75rem] ${ c.cardBg } border ${ c.cardBorder } p-[1.5rem] gap-[1rem]` }
					>
						<div className={ `flex items-center gap-[0.1875rem] ${ c.starColor }` }>
							{ [ 1, 2, 3, 4, 5 ].map( ( n ) => <StarIcon key={ n } size="0.875rem" /> ) }
						</div>
						<p className={ `text-[0.875rem] leading-[1.6] ${ c.quoteText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
							{ `\u201C${ review.quote }\u201D` }
						</p>
						<div className="flex items-center gap-[0.5rem]">
							<span className={ `text-[0.75rem] font-semibold ${ c.authorName } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ review.authorName }
							</span>
							<span className={ `text-[0.75rem] ${ c.subtleText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ review.source }
							</span>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);

	const renderCaseStudies = () => (
		<div className="max-w-[80rem] mx-auto flex flex-col gap-[2.5rem]">
			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[1rem]">
				<header className="flex flex-col gap-[0.5rem]">
					<span className={ `text-[0.6875rem] font-bold tracking-[0.156rem] ${ c.overline } font-[family-name:var(--wp--preset--font-family--inter)] uppercase` }>
						{ overlineText }
					</span>
					<RichText
						tagName="h2"
						value={ heading }
						onChange={ ( val ) => setAttributes( { heading: val } ) }
						className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-normal tracking-[-0.045rem] ${ c.headingText } font-[family-name:var(--wp--preset--font-family--playfair)] leading-tight` }
					/>
				</header>
				<span className={ `flex items-center gap-[0.375rem] text-[0.875rem] font-semibold ${ c.linkText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
					{ ctaText }
					<ArrowRight className="w-[1rem] h-[1rem]" />
				</span>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem]">
				{ caseStudies.map( ( cs ) => (
					<div
						key={ cs.id }
						className={ `flex flex-col md:flex-row h-full rounded-[1rem] ${ c.cardBg } border ${ c.cardBorder } overflow-hidden` }
					>
						{ cs.imageUrl && (
							<div className="md:w-[17.5rem] shrink-0 h-[12rem] md:h-auto">
								<img
									src={ cs.imageUrl }
									alt=""
									style={ { width: '100%', height: '100%', objectFit: 'cover' } }
								/>
							</div>
						) }
						<div className="flex flex-col justify-center gap-[1rem] p-[1.75rem]">
							<span className={ `text-[0.6875rem] font-bold tracking-[0.125rem] ${ c.companyText } font-[family-name:var(--wp--preset--font-family--inter)] uppercase` }>
								{ cs.company }
							</span>
							<span className={ `text-[1.25rem] font-bold tracking-[-0.025rem] leading-[1.3] ${ c.titleText } font-[family-name:var(--wp--preset--font-family--dm-sans)]` }>
								{ cs.title }
							</span>
							<span className={ `text-[0.875rem] italic ${ c.quoteText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ `\u201C${ cs.pullQuote }\u201D` }
							</span>
							<span className={ `flex items-center gap-[0.375rem] text-[0.8125rem] font-semibold ${ c.linkText } font-[family-name:var(--wp--preset--font-family--inter)]` }>
								{ cs.linkText }
								<ArrowRight className="w-[0.875rem] h-[0.875rem]" />
							</span>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);

	const renderContent = () => {
		switch ( style ) {
			case 'logo-ticker':
				return renderLogoTicker();
			case 'testimonials':
				return renderTestimonials();
			case 'stats':
				return renderStats();
			case 'reviews':
				return renderReviews();
			case 'case-studies':
				return renderCaseStudies();
			default:
				return renderTestimonials();
		}
	};

	return (
		<>
			<InspectorControls>
				{ stylePanel }
				{ logoTickerPanel }
				{ testimonialsPanel }
				{ statsPanel }
				{ reviewsPanel }
				{ caseStudiesPanel }
			</InspectorControls>
			<section { ...blockProps }>
				{ renderContent() }
			</section>
		</>
	);
}
