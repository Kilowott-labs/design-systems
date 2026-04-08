import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	Placeholder,
	Notice,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/* ── Structure config (mirrors render.php for conditional panels) ──── */

const STYLE_STRUCTURE = {
	standard: { hasBorder: true, hasPromoBar: false, hasSearchBar: false, hasMegaPanel: false, ctaStyle: 'filled' },
	transparent: { hasBorder: false, hasPromoBar: false, hasSearchBar: false, hasMegaPanel: false, ctaStyle: 'outline' },
	search: { hasBorder: false, hasPromoBar: false, hasSearchBar: true, hasMegaPanel: false, ctaStyle: 'none' },
	mega: { hasBorder: true, hasPromoBar: false, hasSearchBar: false, hasMegaPanel: true, ctaStyle: 'filled' },
	ecommerce: { hasBorder: true, hasPromoBar: true, hasSearchBar: false, hasMegaPanel: false, ctaStyle: 'none' },
};

/* ── Available menu locations (registered in theme_setup.php) ──────── */

const MENU_LOCATIONS = [
	{ label: 'Primary Navigation', value: 'primary' },
	{ label: 'Header Secondary', value: 'header-secondary' },
	{ label: 'Mega Menu 1', value: 'mega-menu-1' },
	{ label: 'Mega Menu 2', value: 'mega-menu-2' },
	{ label: 'Mega Menu 3', value: 'mega-menu-3' },
];

/* ── Edit Component ──────────────────────────────────────────────────── */

export default function Edit( { attributes, setAttributes } ) {
	const {
		style,
		colorMode,
		menuLocation,
		logoText,
		logoShowIcon,
		showCta,
		ctaText,
		ctaUrl,
		showLoginLink,
		loginText,
		loginUrl,
		showSearch,
		searchPlaceholder,
		showPromoBar,
		promoText,
		megaPromoTitle,
		megaPromoDescription,
		megaPromoUrl,
		isSticky,
	} = attributes;

	const struct = STYLE_STRUCTURE[ style ] || STYLE_STRUCTURE.standard;

	const blockProps = useBlockProps( {
		className: 'relative z-50',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Style & Layout', 'kw-package' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Style Variant', 'kw-package' ) }
						value={ style }
						options={ [
							{ label: 'Standard / SaaS', value: 'standard' },
							{ label: 'Transparent Overlay', value: 'transparent' },
							{ label: 'Search / Marketplace', value: 'search' },
							{ label: 'Mega Menu / Enterprise', value: 'mega' },
							{ label: 'E-commerce / Retail', value: 'ecommerce' },
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
					<ToggleControl
						label={ __( 'Sticky Header', 'kw-package' ) }
						checked={ isSticky }
						onChange={ ( val ) => setAttributes( { isSticky: val } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Navigation Menu', 'kw-package' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Menu Location', 'kw-package' ) }
						value={ menuLocation }
						options={ MENU_LOCATIONS }
						onChange={ ( val ) => setAttributes( { menuLocation: val } ) }
						help={ __( 'Select which registered menu location to display. Assign menus via Appearance > Menus in wp-admin.', 'kw-package' ) }
					/>
					<Notice status="info" isDismissible={ false }>
						{ __( 'Navigation menu items are managed via Appearance > Menus in the WordPress admin. The mega menu variant uses "Mega Menu 1" and "Mega Menu 2" locations for dropdown columns.', 'kw-package' ) }
					</Notice>
				</PanelBody>

				<PanelBody title={ __( 'Logo', 'kw-package' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Logo Text', 'kw-package' ) }
						value={ logoText }
						onChange={ ( val ) => setAttributes( { logoText: val } ) }
					/>
					<ToggleControl
						label={ __( 'Show Logo Icon', 'kw-package' ) }
						checked={ logoShowIcon }
						onChange={ ( val ) => setAttributes( { logoShowIcon: val } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'CTA & Actions', 'kw-package' ) } initialOpen={ false }>
					{ struct.ctaStyle !== 'none' && (
						<>
							<ToggleControl
								label={ __( 'Show CTA Button', 'kw-package' ) }
								checked={ showCta }
								onChange={ ( val ) => setAttributes( { showCta: val } ) }
							/>
							{ showCta && (
								<>
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
								</>
							) }
						</>
					) }
					<ToggleControl
						label={ __( 'Show Login Link', 'kw-package' ) }
						checked={ showLoginLink }
						onChange={ ( val ) => setAttributes( { showLoginLink: val } ) }
					/>
					{ showLoginLink && (
						<>
							<TextControl
								label={ __( 'Login Text', 'kw-package' ) }
								value={ loginText }
								onChange={ ( val ) => setAttributes( { loginText: val } ) }
							/>
							<TextControl
								label={ __( 'Login URL', 'kw-package' ) }
								value={ loginUrl }
								onChange={ ( val ) => setAttributes( { loginUrl: val } ) }
							/>
						</>
					) }
				</PanelBody>

				{ struct.hasSearchBar && (
					<PanelBody title={ __( 'Search', 'kw-package' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Show Search Bar', 'kw-package' ) }
							checked={ showSearch }
							onChange={ ( val ) => setAttributes( { showSearch: val } ) }
						/>
						{ showSearch && (
							<TextControl
								label={ __( 'Placeholder', 'kw-package' ) }
								value={ searchPlaceholder }
								onChange={ ( val ) => setAttributes( { searchPlaceholder: val } ) }
							/>
						) }
					</PanelBody>
				) }

				{ struct.hasPromoBar && (
					<PanelBody title={ __( 'Promo Bar', 'kw-package' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Show Promo Bar', 'kw-package' ) }
							checked={ showPromoBar }
							onChange={ ( val ) => setAttributes( { showPromoBar: val } ) }
						/>
						{ showPromoBar && (
							<TextControl
								label={ __( 'Promo Text', 'kw-package' ) }
								value={ promoText }
								onChange={ ( val ) => setAttributes( { promoText: val } ) }
							/>
						) }
					</PanelBody>
				) }

				{ struct.hasMegaPanel && (
					<PanelBody title={ __( 'Mega Menu Promo', 'kw-package' ) } initialOpen={ false }>
						<Notice status="info" isDismissible={ false }>
							{ __( 'Mega menu columns use "Mega Menu 1" and "Mega Menu 2" registered menu locations. Assign menus via Appearance > Menus.', 'kw-package' ) }
						</Notice>
						<TextControl
							label={ __( 'Promo Title', 'kw-package' ) }
							value={ megaPromoTitle }
							onChange={ ( val ) => setAttributes( { megaPromoTitle: val } ) }
						/>
						<TextControl
							label={ __( 'Promo Description', 'kw-package' ) }
							value={ megaPromoDescription }
							onChange={ ( val ) => setAttributes( { megaPromoDescription: val } ) }
						/>
						<TextControl
							label={ __( 'Promo URL', 'kw-package' ) }
							value={ megaPromoUrl }
							onChange={ ( val ) => setAttributes( { megaPromoUrl: val } ) }
						/>
					</PanelBody>
				) }
			</InspectorControls>

			{ /* ── Editor Canvas — Server-Side Render ──────────────── */ }
			<div { ...blockProps }>
				<ServerSideRender
					block="kw-package/site-header"
					attributes={ attributes }
					EmptyResponsePlaceholder={ () => (
						<Placeholder
							icon="menu"
							label={ __( 'Site Header', 'kw-package' ) }
							instructions={ __( 'No menu assigned to this location yet. Go to Appearance > Menus to create and assign a menu.', 'kw-package' ) }
						/>
					) }
				/>
			</div>
		</>
	);
}
