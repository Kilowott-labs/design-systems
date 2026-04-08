<?php
/**
 * Server-side render for kw-package/site-footer.
 *
 * Renders a dynamic footer using wp_nav_menu() for navigation columns.
 * Menu items are managed via Appearance > Menus in wp-admin.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content (empty for dynamic blocks).
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ── Extract attributes with defaults ──────────────────────────────── */

$style_variant      = $attributes['style'] ?? 'multi-column';
$color_mode         = $attributes['colorMode'] ?? 'light';
$logo_text          = $attributes['logoText'] ?? 'FlowStack';
$logo_show_icon     = $attributes['logoShowIcon'] ?? true;
$tagline            = $attributes['tagline'] ?? '';
$copyright_text     = $attributes['copyrightText'] ?? '';
$copyright_extra    = $attributes['copyrightExtra'] ?? '';
$show_socials       = $attributes['showSocials'] ?? true;
$social_links       = $attributes['socialLinks'] ?? [];
$show_newsletter    = $attributes['showNewsletter'] ?? false;
$newsletter_heading = $attributes['newsletterHeading'] ?? '';
$newsletter_btn     = $attributes['newsletterButtonText'] ?? 'Subscribe';
$show_app_download  = $attributes['showAppDownload'] ?? false;
$app_heading        = $attributes['appHeading'] ?? '';
$app_description    = $attributes['appDescription'] ?? '';
$app_store_url      = $attributes['appStoreUrl'] ?? '#';
$play_store_url     = $attributes['playStoreUrl'] ?? '#';
$show_bottom_links  = $attributes['showBottomLinks'] ?? false;

/* ── Structure config per variant ──────────────────────────────────── */

$structures = [
	'multi-column' => [
		'padding'       => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem] pt-[3.5rem] pb-[2rem]',
		'gap'           => 'gap-[2.5rem]',
		'hasBrandCol'   => true,
		'hasNavCols'    => true,
		'navColCount'   => 4,
		'hasNewsletter' => false,
		'hasAppDl'      => false,
		'bottomBorder'  => true,
		'logoFont'      => 'font-[family-name:var(--wp--preset--font-family--dm-sans)]',
	],
	'minimal' => [
		'padding'       => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem] py-[2.5rem]',
		'gap'           => 'gap-[1.5rem]',
		'hasBrandCol'   => false,
		'hasNavCols'    => false,
		'navColCount'   => 0,
		'hasNewsletter' => false,
		'hasAppDl'      => false,
		'bottomBorder'  => false,
		'logoFont'      => 'font-[family-name:var(--wp--preset--font-family--dm-sans)]',
	],
	'dark' => [
		'padding'       => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem] pt-[3.5rem] pb-[2rem]',
		'gap'           => 'gap-[2.5rem]',
		'hasBrandCol'   => true,
		'hasNavCols'    => true,
		'navColCount'   => 4,
		'hasNewsletter' => false,
		'hasAppDl'      => false,
		'bottomBorder'  => true,
		'logoFont'      => 'font-[family-name:var(--wp--preset--font-family--dm-sans)]',
	],
	'newsletter' => [
		'padding'       => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem] pt-[3.5rem] pb-[2rem]',
		'gap'           => 'gap-[2.5rem]',
		'hasBrandCol'   => false,
		'hasNavCols'    => true,
		'navColCount'   => 2,
		'hasNewsletter' => true,
		'hasAppDl'      => false,
		'bottomBorder'  => true,
		'logoFont'      => 'font-[family-name:var(--wp--preset--font-family--inter)]',
	],
	'app-download' => [
		'padding'       => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem] pt-[3rem] pb-[2rem]',
		'gap'           => 'gap-[2rem]',
		'hasBrandCol'   => false,
		'hasNavCols'    => false,
		'navColCount'   => 0,
		'hasNewsletter' => false,
		'hasAppDl'      => true,
		'bottomBorder'  => true,
		'logoFont'      => 'font-[family-name:var(--wp--preset--font-family--dm-sans)]',
	],
];

/* ── Color maps per variant x colorMode ────────────────────────────── */

$colors = [
	'multi-column' => [
		'light' => [
			'footerBg'     => 'bg-[var(--wp--preset--color--white)]',
			'logoText'     => 'text-[var(--wp--preset--color--foreground)]',
			'tagline'      => 'text-[var(--wp--preset--color--foreground-subtle)]',
			'colTitle'     => 'text-[var(--wp--preset--color--foreground)]',
			'colLink'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'colLinkHover' => 'hover:text-[var(--wp--preset--color--foreground)]',
			'socialIcon'   => 'text-[var(--wp--preset--color--foreground-subtle)]',
			'socialHover'  => 'hover:text-[var(--wp--preset--color--foreground)]',
			'copyright'    => 'text-[var(--wp--preset--color--foreground-subtle)]',
			'copyrightEx'  => 'text-[var(--wp--preset--color--border)]',
			'borderColor'  => 'border-[var(--wp--preset--color--surface)]',
			'iconBg'       => 'bg-gradient-to-b from-[var(--wp--preset--color--accent)] to-[var(--wp--preset--color--accent-light)]',
		],
		'dark' => [
			'footerBg'     => 'bg-[var(--wp--preset--color--background-dark)]',
			'logoText'     => 'text-[var(--wp--preset--color--white)]',
			'tagline'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colTitle'     => 'text-[var(--wp--preset--color--white)]',
			'colLink'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colLinkHover' => 'hover:text-[var(--wp--preset--color--white)]',
			'socialIcon'   => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'socialHover'  => 'hover:text-[var(--wp--preset--color--white)]',
			'copyright'    => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'copyrightEx'  => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'borderColor'  => 'border-[var(--wp--preset--color--border-dark)]',
			'iconBg'       => 'bg-gradient-to-b from-[var(--wp--preset--color--accent)] to-[var(--wp--preset--color--accent-light)]',
		],
	],
	'minimal' => [
		'light' => [
			'footerBg'     => 'bg-[var(--wp--preset--color--surface)]',
			'logoText'     => 'text-[var(--wp--preset--color--foreground)]',
			'tagline'      => '',
			'colTitle'     => '',
			'colLink'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'colLinkHover' => 'hover:text-[var(--wp--preset--color--foreground)]',
			'socialIcon'   => 'text-[var(--wp--preset--color--foreground-subtle)]',
			'socialHover'  => 'hover:text-[var(--wp--preset--color--foreground)]',
			'copyright'    => 'text-[var(--wp--preset--color--border)]',
			'copyrightEx'  => '',
			'borderColor'  => '',
			'iconBg'       => '',
		],
		'dark' => [
			'footerBg'     => 'bg-[var(--wp--preset--color--background-dark)]',
			'logoText'     => 'text-[var(--wp--preset--color--white)]',
			'tagline'      => '',
			'colTitle'     => '',
			'colLink'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colLinkHover' => 'hover:text-[var(--wp--preset--color--white)]',
			'socialIcon'   => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'socialHover'  => 'hover:text-[var(--wp--preset--color--white)]',
			'copyright'    => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'copyrightEx'  => '',
			'borderColor'  => '',
			'iconBg'       => '',
		],
	],
	'dark' => [
		'light' => [
			'footerBg'     => 'bg-[var(--wp--preset--color--foreground)]',
			'logoText'     => 'text-[var(--wp--preset--color--white)]',
			'tagline'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'colTitle'     => 'text-[var(--wp--preset--color--white)]',
			'colLink'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'colLinkHover' => 'hover:text-[var(--wp--preset--color--white)]',
			'socialIcon'   => 'text-[var(--wp--preset--color--foreground-muted)]',
			'socialHover'  => 'hover:text-[var(--wp--preset--color--white)]',
			'copyright'    => 'text-[var(--wp--preset--color--foreground-muted)]',
			'copyrightEx'  => '',
			'borderColor'  => 'border-[var(--wp--preset--color--surface-dark)]',
			'iconBg'       => '',
			'iconAccent'   => 'text-[var(--wp--preset--color--accent-light)]',
			'bottomLink'   => 'text-[var(--wp--preset--color--foreground-muted)]',
			'bottomHover'  => 'hover:text-[var(--wp--preset--color--white)]',
		],
		'dark' => [
			'footerBg'     => 'bg-[var(--wp--preset--color--black)]',
			'logoText'     => 'text-[var(--wp--preset--color--surface)]',
			'tagline'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'colTitle'     => 'text-[var(--wp--preset--color--surface)]',
			'colLink'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'colLinkHover' => 'hover:text-[var(--wp--preset--color--surface)]',
			'socialIcon'   => 'text-[var(--wp--preset--color--foreground-muted)]',
			'socialHover'  => 'hover:text-[var(--wp--preset--color--surface)]',
			'copyright'    => 'text-[var(--wp--preset--color--foreground-muted)]',
			'copyrightEx'  => '',
			'borderColor'  => 'border-[var(--wp--preset--color--surface-dark)]',
			'iconBg'       => '',
			'iconAccent'   => 'text-[var(--wp--preset--color--accent-light)]',
			'bottomLink'   => 'text-[var(--wp--preset--color--foreground-muted)]',
			'bottomHover'  => 'hover:text-[var(--wp--preset--color--surface)]',
		],
	],
	'newsletter' => [
		'light' => [
			'footerBg'      => 'bg-[var(--wp--preset--color--surface-warm)]',
			'logoText'      => 'text-[var(--wp--preset--color--foreground)]',
			'tagline'       => 'text-[var(--wp--preset--color--foreground-muted)]',
			'colTitle'      => 'text-[var(--wp--preset--color--foreground)]',
			'colLink'       => 'text-[var(--wp--preset--color--foreground-muted)]',
			'colLinkHover'  => 'hover:text-[var(--wp--preset--color--foreground)]',
			'socialIcon'    => 'text-[var(--wp--preset--color--foreground-muted)]',
			'socialHover'   => 'hover:text-[var(--wp--preset--color--foreground)]',
			'copyright'     => 'text-[var(--wp--preset--color--foreground-muted)]',
			'copyrightEx'   => '',
			'borderColor'   => 'border-[var(--wp--preset--color--border-warm)]',
			'iconBg'        => '',
			'nlInputBorder' => 'border-[var(--wp--preset--color--border-warm)]',
			'nlInputText'   => 'text-[var(--wp--preset--color--foreground-muted)]',
			'nlBtnBg'       => 'bg-[var(--wp--preset--color--terracotta)]',
			'nlBtnText'     => 'text-[var(--wp--preset--color--white)]',
		],
		'dark' => [
			'footerBg'      => 'bg-[var(--wp--preset--color--background-dark)]',
			'logoText'      => 'text-[var(--wp--preset--color--white)]',
			'tagline'       => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colTitle'      => 'text-[var(--wp--preset--color--white)]',
			'colLink'       => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colLinkHover'  => 'hover:text-[var(--wp--preset--color--white)]',
			'socialIcon'    => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'socialHover'   => 'hover:text-[var(--wp--preset--color--white)]',
			'copyright'     => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'copyrightEx'   => '',
			'borderColor'   => 'border-[var(--wp--preset--color--border-dark)]',
			'iconBg'        => '',
			'nlInputBorder' => 'border-[var(--wp--preset--color--border-dark)]',
			'nlInputText'   => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'nlBtnBg'       => 'bg-[var(--wp--preset--color--terracotta)]',
			'nlBtnText'     => 'text-[var(--wp--preset--color--white)]',
		],
	],
	'app-download' => [
		'light' => [
			'footerBg'     => 'bg-[var(--wp--preset--color--foreground)]',
			'logoText'     => 'text-[var(--wp--preset--color--white)]',
			'tagline'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colTitle'     => '',
			'colLink'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colLinkHover' => 'hover:text-[var(--wp--preset--color--white)]',
			'socialIcon'   => '',
			'socialHover'  => '',
			'copyright'    => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'copyrightEx'  => '',
			'borderColor'  => 'border-[var(--wp--preset--color--surface-dark)]',
			'iconBg'       => '',
			'appBtnBg'     => 'bg-[var(--wp--preset--color--surface-dark)]',
			'appBtnBorder' => 'border-[var(--wp--preset--color--surface-dark)]',
			'appBtnText'   => 'text-[var(--wp--preset--color--white)]',
			'appBtnMuted'  => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'navLink'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'navHover'     => 'hover:text-[var(--wp--preset--color--white)]',
		],
		'dark' => [
			'footerBg'     => 'bg-[var(--wp--preset--color--background-dark)]',
			'logoText'     => 'text-[var(--wp--preset--color--white)]',
			'tagline'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colTitle'     => '',
			'colLink'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'colLinkHover' => 'hover:text-[var(--wp--preset--color--white)]',
			'socialIcon'   => '',
			'socialHover'  => '',
			'copyright'    => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'copyrightEx'  => '',
			'borderColor'  => 'border-[var(--wp--preset--color--border-dark)]',
			'iconBg'       => '',
			'appBtnBg'     => 'bg-[var(--wp--preset--color--surface-dark)]',
			'appBtnBorder' => 'border-[var(--wp--preset--color--border-dark)]',
			'appBtnText'   => 'text-[var(--wp--preset--color--white)]',
			'appBtnMuted'  => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'navLink'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'navHover'     => 'hover:text-[var(--wp--preset--color--white)]',
		],
	],
];

/* ── Resolve current structure + colors ────────────────────────────── */

$struct = $structures[ $style_variant ] ?? $structures['multi-column'];
$c      = $colors[ $style_variant ][ $color_mode ] ?? $colors['multi-column']['light'];

/* ── Social icon SVGs ──────────────────────────────────────────────── */

$social_svgs = [
	'twitter'   => '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
	'github'    => '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
	'linkedin'  => '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
	'youtube'   => '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>',
	'instagram' => '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
	'facebook'  => '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
	'dribbble'  => '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>',
];

/* ── Helper: render social icons ───────────────────────────────────── */

function kw_footer_social_icons( $links, $svgs, $icon_class, $hover_class ) {
	if ( empty( $links ) ) {
		return;
	}
	?>
	<div class="flex items-center gap-[1rem]">
		<?php foreach ( $links as $link ) :
			$icon_key = $link['icon'] ?? '';
			$url      = $link['url'] ?? '#';
			$label    = $link['label'] ?? ucfirst( $icon_key );
			if ( empty( $icon_key ) || ! isset( $svgs[ $icon_key ] ) ) {
				continue;
			}
		?>
			<a
				href="<?php echo esc_url( $url ); ?>"
				class="<?php echo esc_attr( "$icon_class $hover_class transition-colors duration-200" ); ?>"
				aria-label="<?php echo esc_attr( $label ); ?>"
				target="_blank"
				rel="noopener noreferrer"
			>
				<?php echo $svgs[ $icon_key ]; // phpcs:ignore -- SVGs are hardcoded, not user input ?>
			</a>
		<?php endforeach; ?>
	</div>
	<?php
}

/* ── Helper: render wp_nav_menu for a footer column ────────────────── */

function kw_footer_nav_col( $location, $c, $font_family = "font-[family-name:var(--wp--preset--font-family--inter)]" ) {
	if ( ! has_nav_menu( $location ) ) {
		return;
	}

	$title_class = esc_attr( "{$c['colTitle']} text-[0.8125rem] font-bold $font_family" );
	$link_class  = esc_attr( "{$c['colLink']} {$c['colLinkHover']} text-[0.8125rem] font-normal $font_family transition-colors duration-200" );

	wp_nav_menu( [
		'theme_location' => $location,
		'container'      => 'nav',
		'container_class' => 'flex flex-col gap-[0.875rem]',
		'container_aria_label' => ucfirst( str_replace( [ 'footer-menu-', '-' ], [ '', ' ' ], $location ) ) . ' navigation',
		'menu_class'     => 'flex flex-col gap-[0.875rem] list-none p-0 m-0',
		'depth'          => 1,
		'items_wrap'     => '<h3 class="' . $title_class . '">%2$s</h3><ul class="flex flex-col gap-[0.875rem] list-none p-0 m-0">%3$s</ul>',
		'walker'         => null,
		'link_before'    => '',
		'link_after'     => '',
		'before'         => '',
		'after'          => '',
		'fallback_cb'    => false,
	] );
}

/* ── Helper: render bottom bar ─────────────────────────────────────── */

function kw_footer_bottom_bar( $copyright, $copyright_extra, $c, $struct, $extra_content = '' ) {
	$border_class = ! empty( $struct['bottomBorder'] ) && ! empty( $c['borderColor'] )
		? "border-t {$c['borderColor']}"
		: '';
	?>
	<div class="flex flex-col md:flex-row items-center justify-between <?php echo esc_attr( "$border_class pt-[1.25rem]" ); ?> w-full">
		<p class="<?php echo esc_attr( "{$c['copyright']} text-[0.75rem] font-[family-name:var(--wp--preset--font-family--inter)]" ); ?> m-0">
			<?php echo esc_html( $copyright ); ?>
		</p>
		<?php if ( ! empty( $extra_content ) ) : ?>
			<?php echo $extra_content; // phpcs:ignore -- Escaped at call site ?>
		<?php elseif ( ! empty( $copyright_extra ) ) : ?>
			<p class="<?php echo esc_attr( "{$c['copyrightEx']} text-[0.75rem] font-[family-name:var(--wp--preset--font-family--inter)]" ); ?> m-0">
				<?php echo esc_html( $copyright_extra ); ?>
			</p>
		<?php endif; ?>
	</div>
	<?php
}

/* ── Wrapper props ─────────────────────────────────────────────────── */

$wrapper_attributes = get_block_wrapper_attributes( [
	'class'           => "{$c['footerBg']} {$struct['padding']}",
	'data-style'      => $style_variant,
	'data-color-mode' => $color_mode,
] );

/* ── Render: Multi-Column (Footer 1) ──────────────────────────────── */

if ( 'multi-column' === $style_variant ) : ?>
<footer <?php echo $wrapper_attributes; // phpcs:ignore ?>>
	<div class="max-w-[80rem] mx-auto flex flex-col <?php echo esc_attr( $struct['gap'] ); ?>">
		<!-- Top: Brand + Nav Columns -->
		<div class="flex flex-col lg:flex-row justify-between gap-[3rem]">
			<!-- Brand Column -->
			<div class="flex flex-col gap-[1rem] w-full lg:w-[17.5rem] shrink-0">
				<div class="flex items-center gap-[0.5rem]">
					<?php if ( $logo_show_icon ) : ?>
						<div class="<?php echo esc_attr( "{$c['iconBg']} w-[1.5rem] h-[1.5rem] rounded-[0.375rem]" ); ?>"></div>
					<?php endif; ?>
					<span class="<?php echo esc_attr( "{$c['logoText']} text-[1.125rem] font-bold tracking-[-0.02em] {$struct['logoFont']}" ); ?>">
						<?php echo esc_html( $logo_text ); ?>
					</span>
				</div>
				<?php if ( ! empty( $tagline ) ) : ?>
					<p class="<?php echo esc_attr( "{$c['tagline']} text-[0.8125rem] leading-[1.6] font-[family-name:var(--wp--preset--font-family--inter)]" ); ?> m-0 max-w-[16.25rem]">
						<?php echo esc_html( $tagline ); ?>
					</p>
				<?php endif; ?>
				<?php if ( $show_socials ) : ?>
					<?php kw_footer_social_icons( $social_links, $social_svgs, $c['socialIcon'], $c['socialHover'] ); ?>
				<?php endif; ?>
			</div>

			<!-- Navigation Columns -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-[2rem] md:gap-[4rem]">
				<?php
				for ( $i = 1; $i <= 4; $i++ ) {
					echo '<div>';
					kw_footer_nav_col( "footer-menu-$i", $c );
					echo '</div>';
				}
				?>
			</div>
		</div>

		<!-- Bottom Bar -->
		<?php kw_footer_bottom_bar( $copyright_text, $copyright_extra, $c, $struct ); ?>
	</div>
</footer>

<?php
/* ── Render: Minimal Centered (Footer 2) ──────────────────────────── */

elseif ( 'minimal' === $style_variant ) : ?>
<footer <?php echo $wrapper_attributes; // phpcs:ignore ?>>
	<div class="max-w-[80rem] mx-auto flex flex-col items-center justify-center <?php echo esc_attr( $struct['gap'] ); ?>">
		<!-- Logo -->
		<span class="<?php echo esc_attr( "{$c['logoText']} text-[1.125rem] font-bold tracking-[-0.02em] {$struct['logoFont']}" ); ?>">
			<?php echo esc_html( $logo_text ); ?>
		</span>

		<!-- Centered Nav Links -->
		<?php if ( has_nav_menu( 'footer-menu-1' ) ) : ?>
			<?php
			wp_nav_menu( [
				'theme_location'  => 'footer-menu-1',
				'container'       => 'nav',
				'container_class' => '',
				'container_aria_label' => __( 'Footer navigation', 'kw-package' ),
				'menu_class'      => 'flex flex-wrap items-center justify-center gap-[2rem] list-none p-0 m-0',
				'depth'           => 1,
				'fallback_cb'     => false,
			] );
			?>
		<?php endif; ?>

		<!-- Social Icons -->
		<?php if ( $show_socials ) : ?>
			<?php kw_footer_social_icons( $social_links, $social_svgs, $c['socialIcon'], $c['socialHover'] ); ?>
		<?php endif; ?>

		<!-- Copyright -->
		<p class="<?php echo esc_attr( "{$c['copyright']} text-[0.75rem] font-[family-name:var(--wp--preset--font-family--inter)]" ); ?> m-0">
			<?php echo esc_html( $copyright_text ); ?>
		</p>
	</div>
</footer>

<?php
/* ── Render: Dark Full (Footer 3) ─────────────────────────────────── */

elseif ( 'dark' === $style_variant ) : ?>
<footer <?php echo $wrapper_attributes; // phpcs:ignore ?>>
	<div class="max-w-[80rem] mx-auto flex flex-col <?php echo esc_attr( $struct['gap'] ); ?>">
		<!-- Top: Brand + Nav Columns -->
		<div class="flex flex-col lg:flex-row justify-between gap-[3rem]">
			<!-- Brand Column -->
			<div class="flex flex-col gap-[1rem] w-full lg:w-[18.75rem] shrink-0">
				<div class="flex items-center gap-[0.5rem]">
					<?php if ( $logo_show_icon ) : ?>
						<svg aria-hidden="true" focusable="false" class="<?php echo esc_attr( $c['iconAccent'] ?? 'text-[var(--wp--preset--color--accent-light)]' ); ?>" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
					<?php endif; ?>
					<span class="<?php echo esc_attr( "{$c['logoText']} text-[1.25rem] font-bold tracking-[-0.025em] {$struct['logoFont']}" ); ?>">
						<?php echo esc_html( $logo_text ); ?>
					</span>
				</div>
				<?php if ( ! empty( $tagline ) ) : ?>
					<p class="<?php echo esc_attr( "{$c['tagline']} text-[0.8125rem] leading-[1.6] font-[family-name:var(--wp--preset--font-family--inter)]" ); ?> m-0 max-w-[17.5rem]">
						<?php echo esc_html( $tagline ); ?>
					</p>
				<?php endif; ?>
				<?php if ( $show_socials ) : ?>
					<?php kw_footer_social_icons( $social_links, $social_svgs, $c['socialIcon'], $c['socialHover'] ); ?>
				<?php endif; ?>
			</div>

			<!-- Navigation Columns -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-[2rem] md:gap-[4rem]">
				<?php
				for ( $i = 1; $i <= 4; $i++ ) {
					echo '<div>';
					kw_footer_nav_col( "footer-menu-$i", $c );
					echo '</div>';
				}
				?>
			</div>
		</div>

		<!-- Bottom Bar -->
		<?php
		$bottom_links_html = '';
		if ( $show_bottom_links ) {
			$link_class = esc_attr( ( $c['bottomLink'] ?? $c['copyright'] ) . ' ' . ( $c['bottomHover'] ?? '' ) . ' text-[0.75rem] font-[family-name:var(--wp--preset--font-family--inter)] transition-colors duration-200' );
			$bottom_links_html = '<nav aria-label="' . esc_attr__( 'Legal links', 'kw-package' ) . '" class="flex items-center gap-[1.5rem]">';
			$bottom_links_html .= '<a href="#" class="' . $link_class . '">' . esc_html__( 'Privacy Policy', 'kw-package' ) . '</a>';
			$bottom_links_html .= '<a href="#" class="' . $link_class . '">' . esc_html__( 'Terms of Service', 'kw-package' ) . '</a>';
			$bottom_links_html .= '<a href="#" class="' . $link_class . '">' . esc_html__( 'Cookie Preferences', 'kw-package' ) . '</a>';
			$bottom_links_html .= '</nav>';
		}
		kw_footer_bottom_bar( $copyright_text, '', $c, $struct, $bottom_links_html );
		?>
	</div>
</footer>

<?php
/* ── Render: Newsletter + Links (Footer 4) ─────────────────────────── */

elseif ( 'newsletter' === $style_variant ) : ?>
<footer <?php echo $wrapper_attributes; // phpcs:ignore ?>>
	<div class="max-w-[80rem] mx-auto flex flex-col <?php echo esc_attr( $struct['gap'] ); ?>">
		<!-- Top: Newsletter + Nav Columns -->
		<div class="flex flex-col lg:flex-row justify-between gap-[3rem]">
			<!-- Newsletter Left -->
			<div class="flex flex-col gap-[1.25rem] w-full lg:w-[25rem] shrink-0">
				<span class="<?php echo esc_attr( "{$c['logoText']} text-[0.875rem] font-bold tracking-[0.1875rem] {$struct['logoFont']}" ); ?>">
					<?php echo esc_html( strtoupper( $logo_text ) ); ?>
				</span>
				<?php if ( $show_newsletter && ! empty( $newsletter_heading ) ) : ?>
					<p class="<?php echo esc_attr( "{$c['tagline']} text-[0.875rem] leading-[1.6] font-[family-name:var(--wp--preset--font-family--inter)]" ); ?> m-0 max-w-[22.5rem]">
						<?php echo esc_html( $newsletter_heading ); ?>
					</p>
				<?php endif; ?>
				<?php if ( $show_newsletter ) : ?>
					<form class="flex rounded-[0.5rem] border <?php echo esc_attr( $c['nlInputBorder'] ?? '' ); ?> overflow-hidden max-w-[22.5rem]" data-site-footer-newsletter="">
						<label class="sr-only" for="footer-newsletter-email">
							<?php esc_html_e( 'Email address', 'kw-package' ); ?>
						</label>
						<input
							type="email"
							id="footer-newsletter-email"
							placeholder="<?php esc_attr_e( 'Your email address', 'kw-package' ); ?>"
							class="flex-1 px-[0.875rem] py-[0.75rem] bg-transparent <?php echo esc_attr( $c['nlInputText'] ?? '' ); ?> text-[0.8125rem] font-[family-name:var(--wp--preset--font-family--inter)] outline-none border-none min-w-0"
							required
						/>
						<button
							type="submit"
							class="<?php echo esc_attr( ( $c['nlBtnBg'] ?? '' ) . ' ' . ( $c['nlBtnText'] ?? '' ) ); ?> px-[1.25rem] py-[0.75rem] text-[0.8125rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-80 shrink-0"
						>
							<?php echo esc_html( $newsletter_btn ); ?>
						</button>
					</form>
				<?php endif; ?>
			</div>

			<!-- Navigation Columns -->
			<div class="grid grid-cols-2 gap-[2rem] md:gap-[4rem]">
				<?php
				for ( $i = 1; $i <= 2; $i++ ) {
					echo '<div>';
					kw_footer_nav_col( "footer-menu-$i", $c );
					echo '</div>';
				}
				?>
			</div>
		</div>

		<!-- Bottom Bar -->
		<?php
		$social_html = '';
		if ( $show_socials ) {
			ob_start();
			kw_footer_social_icons( $social_links, $social_svgs, $c['socialIcon'], $c['socialHover'] );
			$social_html = ob_get_clean();
		}
		kw_footer_bottom_bar( $copyright_text, '', $c, $struct, $social_html );
		?>
	</div>
</footer>

<?php
/* ── Render: App Download (Footer 5) ──────────────────────────────── */

elseif ( 'app-download' === $style_variant ) : ?>
<footer <?php echo $wrapper_attributes; // phpcs:ignore ?>>
	<div class="max-w-[80rem] mx-auto flex flex-col <?php echo esc_attr( $struct['gap'] ); ?>">
		<!-- Top: Headline + App Buttons -->
		<div class="flex flex-col md:flex-row items-center justify-between gap-[2rem]">
			<!-- Left: Heading + Description -->
			<div class="flex flex-col gap-[1rem] max-w-[30rem]">
				<h2 class="<?php echo esc_attr( "{$c['logoText']} text-[1.75rem] font-bold tracking-[-0.035em] font-[family-name:var(--wp--preset--font-family--dm-sans)]" ); ?> m-0">
					<?php echo esc_html( $app_heading ); ?>
				</h2>
				<?php if ( ! empty( $app_description ) ) : ?>
					<p class="<?php echo esc_attr( "{$c['tagline']} text-[0.875rem] leading-[1.6] font-[family-name:var(--wp--preset--font-family--inter)]" ); ?> m-0 max-w-[26.25rem]">
						<?php echo esc_html( $app_description ); ?>
					</p>
				<?php endif; ?>
			</div>

			<!-- Right: App Buttons -->
			<div class="flex items-center gap-[0.75rem]">
				<!-- App Store -->
				<a
					href="<?php echo esc_url( $app_store_url ); ?>"
					class="flex items-center gap-[0.625rem] <?php echo esc_attr( ( $c['appBtnBg'] ?? '' ) . ' border ' . ( $c['appBtnBorder'] ?? '' ) ); ?> rounded-[0.625rem] px-[1.5rem] py-[0.75rem] transition-opacity duration-200 hover:opacity-80"
					aria-label="<?php esc_attr_e( 'Download on the App Store', 'kw-package' ); ?>"
				>
					<svg aria-hidden="true" focusable="false" class="<?php echo esc_attr( $c['appBtnText'] ?? '' ); ?>" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
					<div class="flex flex-col gap-[0.0625rem]">
						<span class="<?php echo esc_attr( ( $c['appBtnMuted'] ?? '' ) . ' text-[0.625rem] font-[family-name:var(--wp--preset--font-family--inter)]' ); ?>">
							<?php esc_html_e( 'Download on the', 'kw-package' ); ?>
						</span>
						<span class="<?php echo esc_attr( ( $c['appBtnText'] ?? '' ) . ' text-[1rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)]' ); ?>">
							<?php esc_html_e( 'App Store', 'kw-package' ); ?>
						</span>
					</div>
				</a>
				<!-- Google Play -->
				<a
					href="<?php echo esc_url( $play_store_url ); ?>"
					class="flex items-center gap-[0.625rem] <?php echo esc_attr( ( $c['appBtnBg'] ?? '' ) . ' border ' . ( $c['appBtnBorder'] ?? '' ) ); ?> rounded-[0.625rem] px-[1.5rem] py-[0.75rem] transition-opacity duration-200 hover:opacity-80"
					aria-label="<?php esc_attr_e( 'Get it on Google Play', 'kw-package' ); ?>"
				>
					<svg aria-hidden="true" focusable="false" class="<?php echo esc_attr( $c['appBtnText'] ?? '' ); ?>" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
					<div class="flex flex-col gap-[0.0625rem]">
						<span class="<?php echo esc_attr( ( $c['appBtnMuted'] ?? '' ) . ' text-[0.625rem] font-[family-name:var(--wp--preset--font-family--inter)]' ); ?>">
							<?php esc_html_e( 'GET IT ON', 'kw-package' ); ?>
						</span>
						<span class="<?php echo esc_attr( ( $c['appBtnText'] ?? '' ) . ' text-[1rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)]' ); ?>">
							<?php esc_html_e( 'Google Play', 'kw-package' ); ?>
						</span>
					</div>
				</a>
			</div>
		</div>

		<!-- Centered Nav Links -->
		<?php if ( has_nav_menu( 'footer-menu-1' ) ) : ?>
			<?php
			wp_nav_menu( [
				'theme_location'  => 'footer-menu-1',
				'container'       => 'nav',
				'container_class' => 'w-full',
				'container_aria_label' => __( 'Footer navigation', 'kw-package' ),
				'menu_class'      => 'flex flex-wrap items-center justify-center gap-[2rem] list-none p-0 m-0',
				'depth'           => 1,
				'fallback_cb'     => false,
			] );
			?>
		<?php endif; ?>

		<!-- Bottom Bar -->
		<?php kw_footer_bottom_bar( $copyright_text, '', $c, $struct, '' ); ?>
	</div>
</footer>

<?php endif; ?>
