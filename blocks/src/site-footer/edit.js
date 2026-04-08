import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/* ── Available social icon options ──────────────────────────────────── */

const SOCIAL_ICON_OPTIONS = [
	{ label: 'Twitter', value: 'twitter' },
	{ label: 'GitHub', value: 'github' },
	{ label: 'LinkedIn', value: 'linkedin' },
	{ label: 'YouTube', value: 'youtube' },
	{ label: 'Instagram', value: 'instagram' },
	{ label: 'Facebook', value: 'facebook' },
	{ label: 'Dribbble', value: 'dribbble' },
];

/* ── Edit Component ──────────────────────────────────────────────────── */

export default function Edit( { attributes, setAttributes } ) {
	const {
		style,
		colorMode,
		logoText,
		logoShowIcon,
		tagline,
		copyrightText,
		copyrightExtra,
		showSocials,
		socialLinks,
		showNewsletter,
		newsletterHeading,
		newsletterButtonText,
		showAppDownload,
		appHeading,
		appDescription,
		appStoreUrl,
		playStoreUrl,
		showBottomLinks,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'relative',
	} );

	/* ── Social link helpers ─────────────────────────────────────── */

	const updateSocialLink = ( index, field, value ) => {
		const updated = [ ...socialLinks ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { socialLinks: updated } );
	};

	const addSocialLink = () => {
		setAttributes( {
			socialLinks: [ ...socialLinks, { icon: 'twitter', url: '#', label: 'Twitter' } ],
		} );
	};

	const removeSocialLink = ( index ) => {
		const updated = socialLinks.filter( ( _, i ) => i !== index );
		setAttributes( { socialLinks: updated } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Style & Layout', 'kw-package' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Style Variant', 'kw-package' ) }
						value={ style }
						options={ [
							{ label: 'Multi-Column Links', value: 'multi-column' },
							{ label: 'Minimal Centered', value: 'minimal' },
							{ label: 'Dark Full', value: 'dark' },
							{ label: 'Newsletter + Links', value: 'newsletter' },
							{ label: 'App Download', value: 'app-download' },
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

				<PanelBody title={ __( 'Brand', 'kw-package' ) } initialOpen={ false }>
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
					<TextareaControl
						label={ __( 'Tagline', 'kw-package' ) }
						value={ tagline }
						onChange={ ( val ) => setAttributes( { tagline: val } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Copyright', 'kw-package' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Copyright Text', 'kw-package' ) }
						value={ copyrightText }
						onChange={ ( val ) => setAttributes( { copyrightText: val } ) }
					/>
					<TextControl
						label={ __( 'Copyright Extra', 'kw-package' ) }
						value={ copyrightExtra }
						onChange={ ( val ) => setAttributes( { copyrightExtra: val } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Social Links', 'kw-package' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Social Icons', 'kw-package' ) }
						checked={ showSocials }
						onChange={ ( val ) => setAttributes( { showSocials: val } ) }
					/>
					{ showSocials && socialLinks.map( ( link, index ) => (
						<div key={ index } style={ { marginBottom: '16px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' } }>
							<SelectControl
								label={ __( 'Icon', 'kw-package' ) }
								value={ link.icon }
								options={ SOCIAL_ICON_OPTIONS }
								onChange={ ( val ) => updateSocialLink( index, 'icon', val ) }
							/>
							<TextControl
								label={ __( 'URL', 'kw-package' ) }
								value={ link.url }
								onChange={ ( val ) => updateSocialLink( index, 'url', val ) }
							/>
							<TextControl
								label={ __( 'Label', 'kw-package' ) }
								value={ link.label }
								onChange={ ( val ) => updateSocialLink( index, 'label', val ) }
							/>
							<Button
								isDestructive
								variant="secondary"
								onClick={ () => removeSocialLink( index ) }
							>
								{ __( 'Remove', 'kw-package' ) }
							</Button>
						</div>
					) ) }
					{ showSocials && (
						<Button
							variant="secondary"
							onClick={ addSocialLink }
						>
							{ __( 'Add Social Link', 'kw-package' ) }
						</Button>
					) }
				</PanelBody>

				{ ( style === 'newsletter' ) && (
					<PanelBody title={ __( 'Newsletter', 'kw-package' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Show Newsletter Form', 'kw-package' ) }
							checked={ showNewsletter }
							onChange={ ( val ) => setAttributes( { showNewsletter: val } ) }
						/>
						{ showNewsletter && (
							<>
								<TextareaControl
									label={ __( 'Newsletter Description', 'kw-package' ) }
									value={ newsletterHeading }
									onChange={ ( val ) => setAttributes( { newsletterHeading: val } ) }
								/>
								<TextControl
									label={ __( 'Button Text', 'kw-package' ) }
									value={ newsletterButtonText }
									onChange={ ( val ) => setAttributes( { newsletterButtonText: val } ) }
								/>
							</>
						) }
					</PanelBody>
				) }

				{ ( style === 'app-download' ) && (
					<PanelBody title={ __( 'App Download', 'kw-package' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Show App Download', 'kw-package' ) }
							checked={ showAppDownload }
							onChange={ ( val ) => setAttributes( { showAppDownload: val } ) }
						/>
						{ showAppDownload && (
							<>
								<TextControl
									label={ __( 'Heading', 'kw-package' ) }
									value={ appHeading }
									onChange={ ( val ) => setAttributes( { appHeading: val } ) }
								/>
								<TextareaControl
									label={ __( 'Description', 'kw-package' ) }
									value={ appDescription }
									onChange={ ( val ) => setAttributes( { appDescription: val } ) }
								/>
								<TextControl
									label={ __( 'App Store URL', 'kw-package' ) }
									value={ appStoreUrl }
									onChange={ ( val ) => setAttributes( { appStoreUrl: val } ) }
								/>
								<TextControl
									label={ __( 'Play Store URL', 'kw-package' ) }
									value={ playStoreUrl }
									onChange={ ( val ) => setAttributes( { playStoreUrl: val } ) }
								/>
							</>
						) }
					</PanelBody>
				) }

				<PanelBody title={ __( 'Bottom Row', 'kw-package' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Bottom Legal Links', 'kw-package' ) }
						help={ __( 'Displays Privacy Policy, Terms, etc. in the footer bottom bar (dark/app-download variants).', 'kw-package' ) }
						checked={ showBottomLinks }
						onChange={ ( val ) => setAttributes( { showBottomLinks: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="kw-package/site-footer"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
