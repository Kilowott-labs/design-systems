import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
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
 * Structure — controls shape, spacing, layout per style variant.
 * No color values here.
 */
const STYLE_STRUCTURE = {
	minimal: {
		itemRadius: '',
		itemPadding: '',
		listSpacing: '',
		isCards: false,
	},
	cards: {
		itemRadius: 'rounded-[0.75rem]',
		itemPadding: 'p-[1.25rem_1.5rem]',
		listSpacing: 'space-y-[0.75rem]',
		isCards: true,
	},
	warm: {
		itemRadius: '',
		itemPadding: '',
		listSpacing: '',
		isCards: false,
	},
};

/**
 * Colors — every style × colorMode combination fully resolved.
 * Access: STYLE_COLORS[ style ][ colorMode ]
 */
const STYLE_COLORS = {
	minimal: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--white)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			border: 'border-[var(--wp--preset--color--border)]',
			itemBg: '',
			itemBorder: '',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			border: 'border-[var(--wp--preset--color--border-dark)]',
			itemBg: '',
			itemBorder: '',
		},
	},
	cards: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent)]',
			border: '',
			itemBg: 'bg-[var(--wp--preset--color--white)]',
			itemBorder: 'border border-[var(--wp--preset--color--border)]',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			border: '',
			itemBg: 'bg-[var(--wp--preset--color--surface-dark)]',
			itemBorder: 'border border-[var(--wp--preset--color--border-dark)]',
		},
	},
	warm: {
		light: {
			sectionBg: 'bg-[var(--wp--preset--color--surface-warm)]',
			text: 'text-[var(--wp--preset--color--foreground)]',
			muted: 'text-[var(--wp--preset--color--foreground-muted)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--foreground)]',
			border: 'border-[var(--wp--preset--color--border-warm)]',
			itemBg: '',
			itemBorder: '',
		},
		dark: {
			sectionBg: 'bg-[var(--wp--preset--color--background-dark)]',
			text: 'text-[var(--wp--preset--color--white)]',
			muted: 'text-[var(--wp--preset--color--muted-on-dark)]',
			subtle: 'text-[var(--wp--preset--color--foreground-subtle)]',
			accent: 'text-[var(--wp--preset--color--accent-light)]',
			border: 'border-[var(--wp--preset--color--border-dark)]',
			itemBg: '',
			itemBorder: '',
		},
	},
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		description,
		showDescription,
		style,
		colorMode,
		layout,
		iconStyle,
		showBadge,
		badgeText,
		showTabs,
		showCta,
		ctaText,
		ctaUrl,
		firstItemOpen,
		allowMultipleOpen,
		items,
		categories,
	} = attributes;

	const struct = STYLE_STRUCTURE[ style ] || STYLE_STRUCTURE.minimal;
	const c = ( STYLE_COLORS[ style ] && STYLE_COLORS[ style ][ colorMode ] ) || STYLE_COLORS.minimal.light;
	const isDark = colorMode === 'dark';
	const isCards = struct.isCards;
	const isSplit = layout === 'split';

	const blockProps = useBlockProps( {
		className: `${ c.sectionBg } px-[1.25rem] md:px-[2.5rem] lg:px-[5.625rem] py-[3rem] md:py-[4rem]`,
	} );

	/* Item CRUD helpers */
	const updateItem = ( index, field, value ) => {
		const updated = [ ...items ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { items: updated } );
	};

	const addItem = () => {
		const newId =
			items.length > 0
				? Math.max( ...items.map( ( it ) => it.id ) ) + 1
				: 1;
		setAttributes( {
			items: [
				...items,
				{
					id: newId,
					question: 'New question?',
					answer: 'Add your answer here.',
					category: categories.length > 0 ? categories[ 0 ].label.toLowerCase().replace( /\s+/g, '-' ) : 'general',
				},
			],
		} );
	};

	const removeItem = ( index ) => {
		if ( items.length <= 1 ) return;
		setAttributes( { items: items.filter( ( _, i ) => i !== index ) } );
	};

	/* Category CRUD */
	const updateCategory = ( index, value ) => {
		const updated = [ ...categories ];
		updated[ index ] = { ...updated[ index ], label: value };
		setAttributes( { categories: updated } );
	};

	const addCategory = () => {
		const newId =
			categories.length > 0
				? Math.max( ...categories.map( ( cat ) => cat.id ) ) + 1
				: 1;
		setAttributes( {
			categories: [ ...categories, { id: newId, label: 'New Category' } ],
		} );
	};

	const removeCategory = ( index ) => {
		if ( categories.length <= 1 ) return;
		setAttributes( {
			categories: categories.filter( ( _, i ) => i !== index ),
		} );
	};

	/* Render editor item */
	const renderEditorItem = ( item, index ) => {
		const isOpen = firstItemOpen && index === 0;
		const itemClasses = isCards
			? `${ c.itemBg } ${ c.itemBorder } ${ struct.itemRadius } ${ struct.itemPadding }`
			: `border-b ${ c.border }`;

		const editorIcon = iconStyle === 'plus-minus' ? (
			<span
				className={ `flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-full shrink-0 ${
					isOpen
						? `bg-[var(--wp--preset--color--accent-surface)] ${ c.accent }`
						: `bg-[var(--wp--preset--color--surface)] ${ c.subtle }`
				}` }
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="w-[1rem] h-[1rem]"
				>
					{ isOpen ? (
						<line x1="5" y1="12" x2="19" y2="12" />
					) : (
						<>
							<line x1="12" y1="5" x2="12" y2="19" />
							<line x1="5" y1="12" x2="19" y2="12" />
						</>
					) }
				</svg>
			</span>
		) : (
			<svg
				className={ `w-[1.25rem] h-[1.25rem] shrink-0 ${ isOpen ? c.accent : c.subtle } ${ isOpen ? 'rotate-180' : '' } transition-transform` }
				aria-hidden="true"
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
				<polyline points="6 9 12 15 18 9" />
			</svg>
		);

		return (
			<div key={ item.id } className={ itemClasses }>
				<div className={ `flex w-full items-center justify-between py-[1.25rem] ${ isCards ? 'py-0' : '' }` }>
					<span
						className={ `text-[1.0625rem] font-semibold tracking-[-0.02em] ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] pr-[1rem]` }
					>
						{ item.question }
					</span>
					{ editorIcon }
				</div>
				{ isOpen && (
					<p
						className={ `${ isCards ? 'pt-[0.5rem]' : '' } pb-[1.25rem] text-[0.9375rem] leading-[1.7] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)]` }
					>
						{ item.answer }
					</p>
				) }
			</div>
		);
	};

	/* Computed color classes for editor preview elements */
	const badgeClasses = isDark
		? 'bg-[var(--wp--preset--color--surface-dark)] border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)]'
		: 'bg-[var(--wp--preset--color--accent-surface)] text-[var(--wp--preset--color--accent)]';

	const tabActiveClasses = isDark
		? 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)] font-semibold'
		: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)] font-semibold';

	const tabInactiveClasses = isDark
		? 'border border-[var(--wp--preset--color--border-dark)] text-[var(--wp--preset--color--muted-on-dark)] font-medium'
		: `border border-[var(--wp--preset--color--border)] text-[var(--wp--preset--color--foreground-muted)] font-medium`;

	const ctaClasses = isDark
		? 'bg-[var(--wp--preset--color--white)] text-[var(--wp--preset--color--foreground)]'
		: 'bg-[var(--wp--preset--color--foreground)] text-[var(--wp--preset--color--white)]';

	/* Editor tabs preview */
	const editorTabs = showTabs ? (
		<div className="flex flex-wrap items-center justify-center gap-[0.5rem] mb-[2.5rem]">
			{ categories.map( ( cat, i ) => (
				<span
					key={ cat.id }
					className={ `rounded-full px-[1.25rem] py-[0.625rem] text-[0.875rem] font-[family-name:var(--wp--preset--font-family--inter)] ${ i === 0 ? tabActiveClasses : tabInactiveClasses }` }
				>
					{ cat.label }
				</span>
			) ) }
		</div>
	) : null;

	/* Editor CTA preview (split layout only) */
	const editorCta = showCta && isSplit ? (
		<span
			className={ `inline-flex items-center gap-[0.5rem] rounded-[0.625rem] px-[1.75rem] py-[0.875rem] text-[0.875rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] ${ ctaClasses }` }
		>
			{ ctaText }
			<svg
				className="w-[1rem] h-[1rem]"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
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
		</span>
	) : null;

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
							{ label: 'Clean Minimal', value: 'minimal' },
							{ label: 'Bordered Cards', value: 'cards' },
							{ label: 'Warm', value: 'warm' },
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
						onChange={ ( val ) =>
							setAttributes( { colorMode: val } )
						}
					/>
					<SelectControl
						label={ __( 'Layout', 'kw-package' ) }
						value={ layout }
						options={ [
							{ label: 'Centered', value: 'centered' },
							{ label: 'Two-Column Split', value: 'split' },
						] }
						onChange={ ( val ) =>
							setAttributes( { layout: val } )
						}
					/>
					<SelectControl
						label={ __( 'Icon Style', 'kw-package' ) }
						value={ iconStyle }
						options={ [
							{ label: 'Chevron', value: 'chevron' },
							{ label: 'Plus / Minus', value: 'plus-minus' },
						] }
						onChange={ ( val ) =>
							setAttributes( { iconStyle: val } )
						}
					/>
				</PanelBody>

				{ /* Options */ }
				<PanelBody
					title={ __( 'Options', 'kw-package' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Description', 'kw-package' ) }
						checked={ showDescription }
						onChange={ ( val ) =>
							setAttributes( { showDescription: val } )
						}
					/>
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
					<ToggleControl
						label={ __( 'Show Category Tabs', 'kw-package' ) }
						checked={ showTabs }
						onChange={ ( val ) =>
							setAttributes( { showTabs: val } )
						}
					/>
					{ isSplit && (
						<ToggleControl
							label={ __( 'Show CTA Button', 'kw-package' ) }
							checked={ showCta }
							onChange={ ( val ) =>
								setAttributes( { showCta: val } )
							}
						/>
					) }
					{ showCta && isSplit && (
						<>
							<TextControl
								label={ __( 'CTA Text', 'kw-package' ) }
								value={ ctaText }
								onChange={ ( val ) =>
									setAttributes( { ctaText: val } )
								}
							/>
							<TextControl
								label={ __( 'CTA URL', 'kw-package' ) }
								value={ ctaUrl }
								onChange={ ( val ) =>
									setAttributes( { ctaUrl: val } )
								}
							/>
						</>
					) }
				</PanelBody>

				{ /* Behaviour */ }
				<PanelBody
					title={ __( 'Behaviour', 'kw-package' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'First Item Open by Default', 'kw-package' ) }
						checked={ firstItemOpen }
						onChange={ ( val ) =>
							setAttributes( { firstItemOpen: val } )
						}
					/>
					<ToggleControl
						label={ __(
							'Allow Multiple Items Open',
							'kw-package'
						) }
						checked={ allowMultipleOpen }
						onChange={ ( val ) =>
							setAttributes( { allowMultipleOpen: val } )
						}
					/>
				</PanelBody>

				{ /* Categories */ }
				{ showTabs && (
					<PanelBody
						title={ __( 'Categories', 'kw-package' ) }
						initialOpen={ false }
					>
						{ categories.map( ( cat, index ) => (
							<div
								key={ cat.id }
								style={ {
									display: 'flex',
									gap: '8px',
									marginBottom: '8px',
									alignItems: 'center',
								} }
							>
								<TextControl
									value={ cat.label }
									onChange={ ( val ) =>
										updateCategory( index, val )
									}
									style={ { flex: 1, marginBottom: 0 } }
								/>
								{ categories.length > 1 && (
									<Button
										icon="no-alt"
										isDestructive
										onClick={ () =>
											removeCategory( index )
										}
										label={ __(
											'Remove category',
											'kw-package'
										) }
									/>
								) }
							</div>
						) ) }
						<Button
							onClick={ addCategory }
							variant="secondary"
							style={ { width: '100%' } }
						>
							{ __( '+ Add Category', 'kw-package' ) }
						</Button>
					</PanelBody>
				) }

				{ /* FAQ Items */ }
				<PanelBody
					title={ __( 'FAQ Items', 'kw-package' ) }
					initialOpen={ true }
				>
					{ items.map( ( item, index ) => (
						<PanelBody
							key={ item.id }
							title={
								item.question ||
								`${ __( 'Item', 'kw-package' ) } ${ index + 1 }`
							}
							initialOpen={ index === 0 }
						>
							<TextControl
								label={ __( 'Question', 'kw-package' ) }
								value={ item.question }
								onChange={ ( val ) =>
									updateItem( index, 'question', val )
								}
							/>
							<TextareaControl
								label={ __( 'Answer', 'kw-package' ) }
								value={ item.answer }
								onChange={ ( val ) =>
									updateItem( index, 'answer', val )
								}
								rows={ 3 }
							/>
							{ showTabs && (
								<SelectControl
									label={ __( 'Category', 'kw-package' ) }
									value={ item.category }
									options={ categories.map( ( cat ) => ( {
										label: cat.label,
										value: cat.label
											.toLowerCase()
											.replace( /\s+/g, '-' ),
									} ) ) }
									onChange={ ( val ) =>
										updateItem( index, 'category', val )
									}
								/>
							) }
							{ items.length > 1 && (
								<Button
									onClick={ () => removeItem( index ) }
									variant="secondary"
									isDestructive
									style={ { marginTop: '8px' } }
								>
									{ __( 'Remove Item', 'kw-package' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button
						onClick={ addItem }
						variant="primary"
						style={ { width: '100%', marginTop: '8px' } }
					>
						{ __( '+ Add FAQ Item', 'kw-package' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			{ /* Editor canvas */ }
			<section { ...blockProps } aria-labelledby="faq-heading">
				<div
					className={ `max-w-[80rem] mx-auto ${
						isSplit
							? 'flex flex-col lg:flex-row gap-[3rem] lg:gap-[5rem]'
							: ''
					}` }
				>
					{ isSplit && (
						<div className="lg:w-[24rem] shrink-0 flex flex-col gap-[1.25rem]">
							<header className="flex flex-col items-start text-left gap-[0.75rem]">
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
									onChange={ ( val ) =>
										setAttributes( { heading: val } )
									}
									className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
									id="faq-heading"
								/>
								{ showDescription && (
									<RichText
										tagName="p"
										value={ description }
										onChange={ ( val ) =>
											setAttributes( {
												description: val,
											} )
										}
										className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[22rem] leading-relaxed` }
									/>
								) }
								{ editorCta }
							</header>
						</div>
					) }

					<div className={ isSplit ? 'flex-1' : '' }>
						{ ! isSplit && (
							<header className="flex flex-col items-center text-center mb-[3rem] gap-[0.75rem]">
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
									onChange={ ( val ) =>
										setAttributes( { heading: val } )
									}
									className={ `text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold tracking-tight ${ c.text } font-[family-name:var(--wp--preset--font-family--dm-sans)] leading-tight` }
									id="faq-heading"
								/>
								{ showDescription && (
									<RichText
										tagName="p"
										value={ description }
										onChange={ ( val ) =>
											setAttributes( {
												description: val,
											} )
										}
										className={ `text-[0.9375rem] md:text-[1rem] ${ c.muted } font-[family-name:var(--wp--preset--font-family--inter)] max-w-[35rem] leading-relaxed` }
									/>
								) }
							</header>
						) }

						{ editorTabs }

						<dl
							className={ `w-full ${ isSplit ? '' : 'max-w-[50rem] mx-auto' } ${ struct.listSpacing }` }
						>
							{ items.map( ( item, index ) =>
								renderEditorItem( item, index )
							) }
						</dl>
					</div>
				</div>
			</section>
		</>
	);
}
