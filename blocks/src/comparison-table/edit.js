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
	Button,
} from '@wordpress/components';

/**
 * Colors — light and dark mode fully resolved.
 */
const STYLE_COLORS = {
	light: {
		sectionBg: 'bg-[var(--wp--preset--color--white)]',
		text: 'text-[var(--wp--preset--color--foreground)]',
		muted: 'text-[var(--wp--preset--color--foreground-muted)]',
		subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
		accent: 'text-[var(--wp--preset--color--accent)]',
		border: 'border-[var(--wp--preset--color--border)]',
		theadBg: 'bg-[var(--wp--preset--color--surface)]',
		rowBorder: 'border-[var(--wp--preset--color--surface)]',
		tableBg: 'bg-[var(--wp--preset--color--white)]',
		tableBorder: 'border-[var(--wp--preset--color--border)]',
		checkColor: 'text-[var(--wp--preset--color--forest-green)]',
		crossColor: 'text-[var(--wp--preset--color--grey-light)]',
		highlightedText: 'text-[var(--wp--preset--color--foreground)] font-semibold',
		normalText: 'text-[var(--wp--preset--color--foreground-subtle)]',
		badgeClasses: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]',
	},
	dark: {
		sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
		text: 'text-[var(--wp--preset--color--white)]',
		muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
		subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
		accent: 'text-[var(--wp--preset--color--accent-light)]',
		border: 'border-[var(--wp--preset--color--border-dark)]',
		theadBg: 'bg-[var(--wp--preset--color--surface-dark)]',
		rowBorder: 'border-[var(--wp--preset--color--border-dark)]',
		tableBg: 'bg-[var(--wp--preset--color--surface-dark)]',
		tableBorder: 'border-[var(--wp--preset--color--border-dark)]',
		checkColor: 'text-[var(--wp--preset--color--forest-green)]',
		crossColor: 'text-[var(--wp--preset--color--grey-light)]',
		highlightedText: 'text-[var(--wp--preset--color--white)] font-semibold',
		normalText: 'text-[var(--wp--preset--color--muted-on-dark)]',
		badgeClasses: 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]',
	},
};

/**
 * Renders a cell value icon or text in the editor preview.
 */
const CellPreview = ( { value, isHighlighted, c } ) => {
	if ( value === 'check' ) {
		return (
			<svg
				aria-hidden="true"
				focusable="false"
				className={ `inline-block w-[1.25rem] h-[1.25rem] ${ c.checkColor }` }
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="20 6 9 17 4 12" />
			</svg>
		);
	}
	if ( value === 'cross' ) {
		return (
			<svg
				aria-hidden="true"
				focusable="false"
				className={ `inline-block w-[1.25rem] h-[1.25rem] ${ c.crossColor }` }
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		);
	}
	if ( value === 'partial' ) {
		return (
			<svg
				aria-hidden="true"
				focusable="false"
				className={ `inline-block w-[1.25rem] h-[1.25rem] ${ c.crossColor }` }
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
		);
	}
	return (
		<span className={ `text-[0.875rem] ${ isHighlighted ? c.highlightedText : c.normalText }` }>
			{ value }
		</span>
	);
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		description,
		showDescription,
		showBadge,
		badgeText,
		colorMode,
		plans,
		features,
	} = attributes;

	const c = STYLE_COLORS[ colorMode ] || STYLE_COLORS.light;

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem]`,
	} );

	/* Plan CRUD helpers */
	const updatePlan = ( index, field, value ) => {
		const updated = [ ...plans ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { plans: updated } );
	};

	const addPlan = () => {
		const newId = plans.length > 0
			? Math.max( ...plans.map( ( p ) => p.id ) ) + 1
			: 1;
		setAttributes( {
			plans: [ ...plans, { id: newId, name: 'New Plan', highlighted: false } ],
		} );
		/* Add empty value to each feature for the new plan */
		const updatedFeatures = features.map( ( f ) => ( {
			...f,
			values: [ ...f.values, '' ],
		} ) );
		setAttributes( { features: updatedFeatures } );
	};

	const removePlan = ( index ) => {
		if ( plans.length <= 1 ) {
			return;
		}
		setAttributes( {
			plans: plans.filter( ( _, i ) => i !== index ),
		} );
		/* Remove the corresponding value from each feature */
		const updatedFeatures = features.map( ( f ) => ( {
			...f,
			values: f.values.filter( ( _, i ) => i !== index ),
		} ) );
		setAttributes( { features: updatedFeatures } );
	};

	/* Feature CRUD helpers */
	const updateFeature = ( index, field, value ) => {
		const updated = [ ...features ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { features: updated } );
	};

	const updateFeatureValue = ( featureIndex, planIndex, value ) => {
		const updated = [ ...features ];
		const vals = [ ...updated[ featureIndex ].values ];
		vals[ planIndex ] = value;
		updated[ featureIndex ] = { ...updated[ featureIndex ], values: vals };
		setAttributes( { features: updated } );
	};

	const addFeature = () => {
		const newId = features.length > 0
			? Math.max( ...features.map( ( f ) => f.id ) ) + 1
			: 1;
		setAttributes( {
			features: [
				...features,
				{
					id: newId,
					name: 'New feature',
					values: plans.map( () => '' ),
				},
			],
		} );
	};

	const removeFeature = ( index ) => {
		if ( features.length <= 1 ) {
			return;
		}
		setAttributes( { features: features.filter( ( _, i ) => i !== index ) } );
	};

	/* Badge */
	const badgeClasses = c.badgeClasses;

	return (
		<>
			<InspectorControls>
				{ /* Appearance */ }
				<PanelBody
					title={ __( 'Appearance', 'kw-package' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Color Mode', 'kw-package' ) }
						value={ colorMode }
						options={ [
							{ label: 'Light', value: 'light' },
							{ label: 'Dark', value: 'dark' },
						] }
						onChange={ ( val ) => setAttributes( { colorMode: val } ) }
					/>
					<ToggleControl
						label={ __( 'Show Description', 'kw-package' ) }
						checked={ showDescription }
						onChange={ ( val ) => setAttributes( { showDescription: val } ) }
					/>
					<ToggleControl
						label={ __( 'Show Badge', 'kw-package' ) }
						checked={ showBadge }
						onChange={ ( val ) => setAttributes( { showBadge: val } ) }
					/>
					{ showBadge && (
						<TextControl
							label={ __( 'Badge Text', 'kw-package' ) }
							value={ badgeText }
							onChange={ ( val ) => setAttributes( { badgeText: val } ) }
						/>
					) }
				</PanelBody>

				{ /* Plans / Columns */ }
				<PanelBody
					title={ __( 'Plans (Columns)', 'kw-package' ) }
					initialOpen={ false }
				>
					{ plans.map( ( plan, index ) => (
						<PanelBody
							key={ plan.id }
							title={ plan.name || `${ __( 'Plan', 'kw-package' ) } ${ index + 1 }` }
							initialOpen={ index === 0 }
						>
							<TextControl
								label={ __( 'Plan Name', 'kw-package' ) }
								value={ plan.name }
								onChange={ ( val ) => updatePlan( index, 'name', val ) }
							/>
							<ToggleControl
								label={ __( 'Highlighted (accent color)', 'kw-package' ) }
								checked={ plan.highlighted }
								onChange={ ( val ) => updatePlan( index, 'highlighted', val ) }
							/>
							{ plans.length > 1 && (
								<Button
									onClick={ () => removePlan( index ) }
									variant="secondary"
									isDestructive
									style={ { marginTop: '8px' } }
								>
									{ __( 'Remove Plan', 'kw-package' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button
						onClick={ addPlan }
						variant="primary"
						style={ { width: '100%', marginTop: '8px' } }
					>
						{ __( '+ Add Plan', 'kw-package' ) }
					</Button>
				</PanelBody>

				{ /* Features / Rows */ }
				<PanelBody
					title={ __( 'Features (Rows)', 'kw-package' ) }
					initialOpen={ false }
				>
					{ features.map( ( feature, fIdx ) => (
						<PanelBody
							key={ feature.id }
							title={ feature.name || `${ __( 'Feature', 'kw-package' ) } ${ fIdx + 1 }` }
							initialOpen={ fIdx === 0 }
						>
							<TextControl
								label={ __( 'Feature Name', 'kw-package' ) }
								value={ feature.name }
								onChange={ ( val ) => updateFeature( fIdx, 'name', val ) }
							/>
							{ plans.map( ( plan, pIdx ) => (
								<SelectControl
									key={ plan.id }
									label={ `${ plan.name } value` }
									value={
										[ 'check', 'cross', 'partial' ].includes( feature.values[ pIdx ] )
											? feature.values[ pIdx ]
											: 'custom'
									}
									options={ [
										{ label: 'Check (included)', value: 'check' },
										{ label: 'Cross (not included)', value: 'cross' },
										{ label: 'Partial (dash)', value: 'partial' },
										{ label: 'Custom text', value: 'custom' },
									] }
									onChange={ ( val ) => {
										if ( val === 'custom' ) {
											updateFeatureValue( fIdx, pIdx, '' );
										} else {
											updateFeatureValue( fIdx, pIdx, val );
										}
									} }
								/>
							) ) }
							{ plans.map( ( plan, pIdx ) => {
								const val = feature.values[ pIdx ];
								if ( [ 'check', 'cross', 'partial' ].includes( val ) ) {
									return null;
								}
								return (
									<TextControl
										key={ `text-${ plan.id }` }
										label={ `${ plan.name } text` }
										value={ val || '' }
										onChange={ ( v ) => updateFeatureValue( fIdx, pIdx, v ) }
									/>
								);
							} ) }
							{ features.length > 1 && (
								<Button
									onClick={ () => removeFeature( fIdx ) }
									variant="secondary"
									isDestructive
									style={ { marginTop: '8px' } }
								>
									{ __( 'Remove Feature', 'kw-package' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button
						onClick={ addFeature }
						variant="primary"
						style={ { width: '100%', marginTop: '8px' } }
					>
						{ __( '+ Add Feature', 'kw-package' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			{ /* Editor canvas */ }
			<section { ...blockProps } aria-labelledby="comparison-heading">
				<div className="max-w-[75rem] mx-auto">

					{ /* Header */ }
					<header className="flex flex-col items-center text-center gap-[0.75rem] mb-[2.5rem]">
						{ showBadge && (
							<span
								className={ `inline-flex items-center rounded-full px-[1rem] py-[0.375rem] text-[0.75rem] font-semibold tracking-wider font-[family-name:var(--wp--preset--font-family--inter)] ${ badgeClasses }` }
							>
								{ badgeText }
							</span>
						) }
						<RichText
							tagName="h2"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
							id="comparison-heading"
						/>
						{ showDescription && (
							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) => setAttributes( { description: val } ) }
								className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[35rem] leading-relaxed` }
							/>
						) }
					</header>

					{ /* Table preview */ }
					<div className="overflow-x-auto">
						<table
							className={ `w-full border-collapse rounded-[0.75rem] border ${ c.tableBorder } overflow-hidden font-[family-name:var(--wp--preset--font-family--inter)]` }
							style={ { minWidth: '37.5rem' } }
						>
							<thead>
								<tr className={ c.theadBg }>
									<th
										scope="col"
										className={ `text-left px-[1.5rem] py-[0.875rem] text-[0.8125rem] font-semibold ${ c.text } border-b ${ c.border }` }
									>
										{ __( 'Feature', 'kw-package' ) }
									</th>
									{ plans.map( ( plan ) => (
										<th
											key={ plan.id }
											scope="col"
											className={ `text-center px-[1.5rem] py-[0.875rem] text-[0.8125rem] border-b ${ c.border } ${ plan.highlighted ? `font-bold ${ c.accent }` : `font-semibold ${ c.muted }` }` }
											style={ { width: '11.25rem' } }
										>
											{ plan.name }
										</th>
									) ) }
								</tr>
							</thead>
							<tbody className={ c.tableBg }>
								{ features.map( ( feature, fIdx ) => (
									<tr
										key={ feature.id }
										className={ fIdx < features.length - 1 ? `border-b ${ c.rowBorder }` : '' }
									>
										<td className={ `px-[1.5rem] py-[0.875rem] text-[0.875rem] ${ c.text }` }>
											{ feature.name }
										</td>
										{ plans.map( ( plan, pIdx ) => (
											<td
												key={ plan.id }
												className="text-center px-[1.5rem] py-[0.875rem] text-[0.875rem]"
											>
												<CellPreview
													value={ feature.values[ pIdx ] || '' }
													isHighlighted={ plan.highlighted }
													c={ c }
												/>
											</td>
										) ) }
									</tr>
								) ) }
							</tbody>
						</table>
					</div>

				</div>
			</section>
		</>
	);
}
