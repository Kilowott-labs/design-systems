<?php
/**
 * Server-side render for kw-package/site-header.
 *
 * Renders a dynamic header using wp_nav_menu() for navigation.
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

$style_variant    = $attributes['style'] ?? 'standard';
$color_mode       = $attributes['colorMode'] ?? 'light';
$menu_location    = $attributes['menuLocation'] ?? 'primary';
$logo_text        = $attributes['logoText'] ?? 'Acme';
$logo_show_icon   = $attributes['logoShowIcon'] ?? true;
$show_cta         = $attributes['showCta'] ?? true;
$cta_text         = $attributes['ctaText'] ?? 'Get Started';
$cta_url          = $attributes['ctaUrl'] ?? '#';
$show_login_link  = $attributes['showLoginLink'] ?? true;
$login_text       = $attributes['loginText'] ?? 'Log in';
$login_url        = $attributes['loginUrl'] ?? '#';
$show_search      = $attributes['showSearch'] ?? false;
$search_placeholder = $attributes['searchPlaceholder'] ?? 'Search products, brands, categories...';
$show_promo_bar   = $attributes['showPromoBar'] ?? false;
$promo_text       = $attributes['promoText'] ?? 'FREE SHIPPING ON ORDERS OVER $75';
$mega_promo_title = $attributes['megaPromoTitle'] ?? 'ESG Reporting Suite';
$mega_promo_desc  = $attributes['megaPromoDescription'] ?? 'Automated sustainability reports aligned to global frameworks.';
$mega_promo_url   = $attributes['megaPromoUrl'] ?? '#';
$is_sticky        = $attributes['isSticky'] ?? true;

/* ── Structure config per variant ──────────────────────────────────── */

$structures = [
	'standard' => [
		'height'       => 'h-[4.5rem]',
		'padding'      => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem]',
		'hasBorder'    => true,
		'hasPromoBar'  => false,
		'hasSearchBar' => false,
		'hasMegaPanel' => false,
		'hasIconActions' => false,
		'ctaStyle'     => 'filled',
		'logoFont'     => 'font-[family-name:var(--wp--preset--font-family--dm-sans)]',
	],
	'transparent' => [
		'height'       => 'h-[4.5rem]',
		'padding'      => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem]',
		'hasBorder'    => false,
		'hasPromoBar'  => false,
		'hasSearchBar' => false,
		'hasMegaPanel' => false,
		'hasIconActions' => false,
		'ctaStyle'     => 'outline',
		'logoFont'     => 'font-[family-name:var(--wp--preset--font-family--dm-sans)]',
	],
	'search' => [
		'height'       => 'h-[4rem]',
		'padding'      => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem]',
		'hasBorder'    => false,
		'hasPromoBar'  => false,
		'hasSearchBar' => true,
		'hasMegaPanel' => false,
		'hasIconActions' => true,
		'ctaStyle'     => 'none',
		'logoFont'     => 'font-[family-name:var(--wp--preset--font-family--dm-sans)]',
	],
	'mega' => [
		'height'       => 'h-[4.5rem]',
		'padding'      => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem]',
		'hasBorder'    => true,
		'hasPromoBar'  => false,
		'hasSearchBar' => false,
		'hasMegaPanel' => true,
		'hasIconActions' => false,
		'ctaStyle'     => 'filled',
		'logoFont'     => 'font-[family-name:var(--wp--preset--font-family--libre-baskerville)]',
	],
	'ecommerce' => [
		'height'       => 'h-[4.625rem]',
		'padding'      => 'px-[1.5rem] md:px-[2.5rem] lg:px-[5.625rem]',
		'hasBorder'    => true,
		'hasPromoBar'  => true,
		'hasSearchBar' => false,
		'hasMegaPanel' => false,
		'hasIconActions' => true,
		'ctaStyle'     => 'none',
		'logoFont'     => 'font-[family-name:var(--wp--preset--font-family--dm-sans)]',
	],
];

/* ── Color maps per variant x colorMode ────────────────────────────── */

$colors = [
	'standard' => [
		'light' => [
			'headerBg'     => 'bg-[var(--wp--preset--color--white)]',
			'logoText'     => 'text-[var(--wp--preset--color--foreground)]',
			'linkText'     => 'text-[var(--wp--preset--color--foreground-muted)]',
			'linkHover'    => 'hover:text-[var(--wp--preset--color--foreground)]',
			'loginText'    => 'text-[var(--wp--preset--color--foreground-muted)]',
			'ctaBg'        => 'bg-[var(--wp--preset--color--accent)]',
			'ctaText'      => 'text-[var(--wp--preset--color--white)]',
			'ctaBorder'    => '',
			'borderColor'  => 'border-[var(--wp--preset--color--border)]',
			'iconColor'    => 'text-[var(--wp--preset--color--foreground)]',
			'logoIconBg'   => 'bg-gradient-to-b from-[var(--wp--preset--color--accent)] to-[var(--wp--preset--color--accent)]',
			'mobileMenuBg' => 'bg-[var(--wp--preset--color--white)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--foreground)]',
		],
		'dark' => [
			'headerBg'     => 'bg-[var(--wp--preset--color--background-dark)]',
			'logoText'     => 'text-[var(--wp--preset--color--white)]',
			'linkText'     => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'linkHover'    => 'hover:text-[var(--wp--preset--color--white)]',
			'loginText'    => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'ctaBg'        => 'bg-[var(--wp--preset--color--accent)]',
			'ctaText'      => 'text-[var(--wp--preset--color--white)]',
			'ctaBorder'    => '',
			'borderColor'  => 'border-[var(--wp--preset--color--border-dark)]',
			'iconColor'    => 'text-[var(--wp--preset--color--white)]',
			'logoIconBg'   => 'bg-gradient-to-b from-[var(--wp--preset--color--accent)] to-[var(--wp--preset--color--accent)]',
			'mobileMenuBg' => 'bg-[var(--wp--preset--color--background-dark)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--white)]',
		],
	],
	'transparent' => [
		'light' => [
			'headerBg'     => 'bg-transparent',
			'logoText'     => 'text-[var(--wp--preset--color--foreground)]',
			'linkText'     => 'text-[var(--wp--preset--color--foreground-muted)]',
			'linkHover'    => 'hover:text-[var(--wp--preset--color--foreground)]',
			'loginText'    => 'text-[var(--wp--preset--color--foreground-muted)]',
			'ctaBg'        => 'bg-transparent',
			'ctaText'      => 'text-[var(--wp--preset--color--foreground)]',
			'ctaBorder'    => 'border border-[var(--wp--preset--color--border)]',
			'borderColor'  => '',
			'iconColor'    => 'text-[var(--wp--preset--color--foreground)]',
			'logoIconBg'   => '',
			'mobileMenuBg' => 'bg-[var(--wp--preset--color--white)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--foreground)]',
		],
		'dark' => [
			'headerBg'     => 'bg-transparent',
			'logoText'     => 'text-[var(--wp--preset--color--white)]',
			'linkText'     => 'text-[var(--wp--preset--color--white)]/80',
			'linkHover'    => 'hover:text-[var(--wp--preset--color--white)]',
			'loginText'    => 'text-[var(--wp--preset--color--white)]/80',
			'ctaBg'        => 'bg-transparent',
			'ctaText'      => 'text-[var(--wp--preset--color--white)]',
			'ctaBorder'    => 'border border-[var(--wp--preset--color--white)]/40',
			'borderColor'  => '',
			'iconColor'    => 'text-[var(--wp--preset--color--white)]',
			'logoIconBg'   => '',
			'mobileMenuBg' => 'bg-[var(--wp--preset--color--background-dark)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--white)]',
		],
	],
	'search' => [
		'light' => [
			'headerBg'      => 'bg-[var(--wp--preset--color--white)]',
			'logoText'      => 'text-[var(--wp--preset--color--foreground)]',
			'linkText'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'linkHover'     => 'hover:text-[var(--wp--preset--color--foreground)]',
			'loginText'     => 'text-[var(--wp--preset--color--foreground-muted)]',
			'ctaBg'         => '',
			'ctaText'       => '',
			'ctaBorder'     => '',
			'borderColor'   => '',
			'iconColor'     => 'text-[var(--wp--preset--color--foreground)]',
			'logoIconBg'    => '',
			'searchBg'      => 'bg-[var(--wp--preset--color--surface)]',
			'searchBorder'  => 'border-[var(--wp--preset--color--border)]',
			'searchText'    => 'text-[var(--wp--preset--color--foreground-subtle)]',
			'shortcutBorder' => 'border-[var(--wp--preset--color--border)]',
			'shortcutText'  => 'text-[var(--wp--preset--color--foreground-subtle)]',
			'mobileMenuBg'  => 'bg-[var(--wp--preset--color--white)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--foreground)]',
		],
		'dark' => [
			'headerBg'      => 'bg-[var(--wp--preset--color--background-dark)]',
			'logoText'      => 'text-[var(--wp--preset--color--white)]',
			'linkText'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'linkHover'     => 'hover:text-[var(--wp--preset--color--white)]',
			'loginText'     => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'ctaBg'         => '',
			'ctaText'       => '',
			'ctaBorder'     => '',
			'borderColor'   => '',
			'iconColor'     => 'text-[var(--wp--preset--color--white)]',
			'logoIconBg'    => '',
			'searchBg'      => 'bg-[var(--wp--preset--color--surface-dark)]',
			'searchBorder'  => 'border-[var(--wp--preset--color--border-dark)]',
			'searchText'    => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'shortcutBorder' => 'border-[var(--wp--preset--color--border-dark)]',
			'shortcutText'  => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'mobileMenuBg'  => 'bg-[var(--wp--preset--color--background-dark)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--white)]',
		],
	],
	'mega' => [
		'light' => [
			'headerBg'      => 'bg-[var(--wp--preset--color--white)]',
			'logoText'      => 'text-[var(--wp--preset--color--foreground)]',
			'linkText'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'linkHover'     => 'hover:text-[var(--wp--preset--color--foreground)]',
			'linkActive'    => 'text-[var(--wp--preset--color--foreground)]',
			'loginText'     => 'text-[var(--wp--preset--color--foreground-muted)]',
			'ctaBg'         => 'bg-[var(--wp--preset--color--forest-green)]',
			'ctaText'       => 'text-[var(--wp--preset--color--white)]',
			'ctaBorder'     => '',
			'borderColor'   => 'border-[var(--wp--preset--color--border)]',
			'iconColor'     => 'text-[var(--wp--preset--color--forest-green)]',
			'logoIconBg'    => 'bg-[var(--wp--preset--color--forest-green)]',
			'megaPanelBg'   => 'bg-[var(--wp--preset--color--white)]',
			'megaColTitle'  => 'text-[var(--wp--preset--color--foreground-subtle)]',
			'megaItemTitle' => 'text-[var(--wp--preset--color--foreground)]',
			'megaItemDesc'  => 'text-[var(--wp--preset--color--foreground-subtle)]',
			'megaPromoBg'   => 'bg-[var(--wp--preset--color--surface)]',
			'megaPromoTitle' => 'text-[var(--wp--preset--color--foreground)]',
			'megaPromoDesc' => 'text-[var(--wp--preset--color--foreground-muted)]',
			'megaPromoLink' => 'text-[var(--wp--preset--color--forest-green)]',
			'megaPromoBadge' => 'text-[var(--wp--preset--color--forest-green)]',
			'mobileMenuBg'  => 'bg-[var(--wp--preset--color--white)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--foreground)]',
		],
		'dark' => [
			'headerBg'      => 'bg-[var(--wp--preset--color--background-dark)]',
			'logoText'      => 'text-[var(--wp--preset--color--white)]',
			'linkText'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'linkHover'     => 'hover:text-[var(--wp--preset--color--white)]',
			'linkActive'    => 'text-[var(--wp--preset--color--white)]',
			'loginText'     => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'ctaBg'         => 'bg-[var(--wp--preset--color--forest-green)]',
			'ctaText'       => 'text-[var(--wp--preset--color--white)]',
			'ctaBorder'     => '',
			'borderColor'   => 'border-[var(--wp--preset--color--border-dark)]',
			'iconColor'     => 'text-[var(--wp--preset--color--forest-green)]',
			'logoIconBg'    => 'bg-[var(--wp--preset--color--forest-green)]',
			'megaPanelBg'   => 'bg-[var(--wp--preset--color--surface-dark)]',
			'megaColTitle'  => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'megaItemTitle' => 'text-[var(--wp--preset--color--white)]',
			'megaItemDesc'  => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'megaPromoBg'   => 'bg-[var(--wp--preset--color--background-dark)]',
			'megaPromoTitle' => 'text-[var(--wp--preset--color--white)]',
			'megaPromoDesc' => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'megaPromoLink' => 'text-[var(--wp--preset--color--forest-green)]',
			'megaPromoBadge' => 'text-[var(--wp--preset--color--forest-green)]',
			'mobileMenuBg'  => 'bg-[var(--wp--preset--color--background-dark)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--white)]',
		],
	],
	'ecommerce' => [
		'light' => [
			'headerBg'      => 'bg-[var(--wp--preset--color--white)]',
			'logoText'      => 'text-[var(--wp--preset--color--foreground)]',
			'linkText'      => 'text-[var(--wp--preset--color--foreground-muted)]',
			'linkHover'     => 'hover:text-[var(--wp--preset--color--foreground)]',
			'linkActive'    => 'text-[var(--wp--preset--color--foreground)]',
			'loginText'     => '',
			'ctaBg'         => '',
			'ctaText'       => '',
			'ctaBorder'     => '',
			'borderColor'   => 'border-[var(--wp--preset--color--border)]',
			'iconColor'     => 'text-[var(--wp--preset--color--foreground)]',
			'logoIconBg'    => '',
			'promoBg'       => 'bg-[var(--wp--preset--color--foreground)]',
			'promoText'     => 'text-[var(--wp--preset--color--white)]/60',
			'saleText'      => 'text-[var(--wp--preset--color--terracotta)]',
			'cartBadgeBg'   => 'bg-[var(--wp--preset--color--terracotta)]',
			'cartBadgeText' => 'text-[var(--wp--preset--color--white)]',
			'mobileMenuBg'  => 'bg-[var(--wp--preset--color--white)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--foreground)]',
		],
		'dark' => [
			'headerBg'      => 'bg-[var(--wp--preset--color--background-dark)]',
			'logoText'      => 'text-[var(--wp--preset--color--white)]',
			'linkText'      => 'text-[var(--wp--preset--color--muted-on-dark)]',
			'linkHover'     => 'hover:text-[var(--wp--preset--color--white)]',
			'linkActive'    => 'text-[var(--wp--preset--color--white)]',
			'loginText'     => '',
			'ctaBg'         => '',
			'ctaText'       => '',
			'ctaBorder'     => '',
			'borderColor'   => 'border-[var(--wp--preset--color--border-dark)]',
			'iconColor'     => 'text-[var(--wp--preset--color--white)]',
			'logoIconBg'    => '',
			'promoBg'       => 'bg-[var(--wp--preset--color--white)]',
			'promoText'     => 'text-[var(--wp--preset--color--foreground)]/60',
			'saleText'      => 'text-[var(--wp--preset--color--terracotta)]',
			'cartBadgeBg'   => 'bg-[var(--wp--preset--color--terracotta)]',
			'cartBadgeText' => 'text-[var(--wp--preset--color--white)]',
			'mobileMenuBg'  => 'bg-[var(--wp--preset--color--background-dark)]',
			'mobileMenuText' => 'text-[var(--wp--preset--color--white)]',
		],
	],
];

$struct = $structures[ $style_variant ] ?? $structures['standard'];
$c      = $colors[ $style_variant ][ $color_mode ] ?? $colors['standard']['light'];

/* ── Helper: get color value safely ────────────────────────────────── */

function kw_header_color( $colors_arr, $key ) {
	return isset( $colors_arr[ $key ] ) ? $colors_arr[ $key ] : '';
}

/* ── SVG Icons (inline, accessible) ────────────────────────────────── */

function kw_header_svg_search( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
}

function kw_header_svg_menu( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>';
}

function kw_header_svg_close( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
}

function kw_header_svg_chevron_down( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
}

function kw_header_svg_arrow_right( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
}

function kw_header_svg_bell( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
}

function kw_header_svg_heart( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
}

function kw_header_svg_user( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
}

function kw_header_svg_shopping_bag( $class = '' ) {
	return '<svg class="' . esc_attr( $class ) . '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';
}

function kw_header_svg_logo_icon( $class = '' ) {
	return '<span class="inline-flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-[0.375rem] ' . esc_attr( $class ) . '"><svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--wp--preset--color--white)]"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg></span>';
}

/* ── Block wrapper attributes ──────────────────────────────────────── */

$wrapper_attributes = get_block_wrapper_attributes( [
	'class'           => $is_sticky ? 'sticky top-0 z-50' : 'relative z-50',
	'data-site-header' => '',
	'data-style'      => esc_attr( $style_variant ),
	'data-color-mode' => esc_attr( $color_mode ),
] );

/* ── Promo Bar (ecommerce only) ────────────────────────────────────── */

$promo_bar_html = '';
if ( $struct['hasPromoBar'] && $show_promo_bar ) {
	$promo_bar_html = sprintf(
		'<div class="flex items-center justify-center h-[2.25rem] %s %s" data-site-header-promo>
			<p class="text-[0.6875rem] font-medium tracking-[0.0625rem] font-[family-name:var(--wp--preset--font-family--inter)] %s">%s</p>
		</div>',
		esc_attr( kw_header_color( $c, 'promoBg' ) ),
		esc_attr( $struct['padding'] ),
		esc_attr( kw_header_color( $c, 'promoText' ) ),
		esc_html( $promo_text )
	);
}

/* ── Search Bar (search variant) ───────────────────────────────────── */

$search_bar_html = '';
if ( $struct['hasSearchBar'] && $show_search ) {
	$search_bar_html = sprintf(
		'<div class="hidden md:flex items-center gap-[0.625rem] rounded-[0.625rem] %s border %s h-[2.5rem] w-full max-w-[30rem] px-[0.875rem]" data-site-header-search>
			%s
			<span class="text-[0.8125rem] font-normal font-[family-name:var(--wp--preset--font-family--inter)] %s">%s</span>
			<span class="ml-auto shrink-0 rounded-[0.25rem] border %s px-[0.5rem] py-[0.125rem]">
				<span class="text-[0.6875rem] font-medium font-[family-name:var(--wp--preset--font-family--inter)] %s">&#8984;K</span>
			</span>
		</div>',
		esc_attr( kw_header_color( $c, 'searchBg' ) ),
		esc_attr( kw_header_color( $c, 'searchBorder' ) ),
		kw_header_svg_search( 'w-[1rem] h-[1rem] shrink-0 ' . kw_header_color( $c, 'searchText' ) ),
		esc_attr( kw_header_color( $c, 'searchText' ) ),
		esc_html( $search_placeholder ),
		esc_attr( kw_header_color( $c, 'shortcutBorder' ) ),
		esc_attr( kw_header_color( $c, 'shortcutText' ) )
	);
}

/* ── Logo ──────────────────────────────────────────────────────────── */

$logo_icon_html = '';
if ( $logo_show_icon && $struct['ctaStyle'] !== 'none' && $style_variant !== 'search' ) {
	$icon_bg = kw_header_color( $c, 'logoIconBg' );
	if ( empty( $icon_bg ) ) {
		$icon_bg = 'bg-[var(--wp--preset--color--accent)]';
	}
	$logo_icon_html = kw_header_svg_logo_icon( $icon_bg );
}

$logo_html = sprintf(
	'<div class="flex items-center gap-[0.5rem]">%s<span class="text-[1.25rem] font-bold tracking-[-0.025rem] %s %s">%s</span></div>',
	$logo_icon_html,
	esc_attr( $struct['logoFont'] ),
	esc_attr( kw_header_color( $c, 'logoText' ) ),
	esc_html( $logo_text )
);

/* ── Navigation via wp_nav_menu() ──────────────────────────────────── */

$nav_menu_html = '';

if ( $style_variant !== 'ecommerce' && $style_variant !== 'search' ) {
	// Standard / Transparent / Mega: Desktop nav
	$nav_menu_args = [
		'theme_location' => $menu_location,
		'container'      => 'nav',
		'container_class' => 'hidden lg:block',
		'container_aria_label' => esc_attr__( 'Main navigation', 'kw-package' ),
		'menu_class'     => 'site-header-nav-list list-none p-0 m-0 flex items-center gap-[2rem]',
		'fallback_cb'    => false,
		'depth'          => $style_variant === 'mega' ? 2 : 1,
		'echo'           => false,
	];
	$nav_menu_html = wp_nav_menu( $nav_menu_args );
	if ( ! $nav_menu_html ) {
		$nav_menu_html = '';
	}
}

/* ── Ecommerce Left Links (hamburger + menu items) ─────────────────── */

$ecommerce_left_html = '';
if ( $style_variant === 'ecommerce' ) {
	$ecom_nav = wp_nav_menu( [
		'theme_location' => $menu_location,
		'container'      => false,
		'menu_class'     => 'site-header-ecom-nav list-none p-0 m-0 flex items-center gap-[1.75rem]',
		'fallback_cb'    => false,
		'depth'          => 1,
		'echo'           => false,
	] );

	$ecommerce_left_html = sprintf(
		'<div class="hidden lg:flex items-center gap-[1.75rem]">
			<button type="button" class="p-[0.25rem] %s" aria-label="%s" data-site-header-hamburger>
				%s
			</button>
			%s
		</div>',
		esc_attr( kw_header_color( $c, 'iconColor' ) ),
		esc_attr__( 'Menu', 'kw-package' ),
		kw_header_svg_menu( 'w-[1.375rem] h-[1.375rem]' ),
		$ecom_nav ? $ecom_nav : ''
	);
}

/* ── Ecommerce Right Icons ─────────────────────────────────────────── */

$ecommerce_right_html = '';
if ( $style_variant === 'ecommerce' ) {
	$ecommerce_right_html = sprintf(
		'<div class="flex items-center gap-[1.25rem]">
			<button type="button" class="p-[0.75rem] %1$s" aria-label="%2$s" data-site-header-search-toggle>
				%3$s
			</button>
			<a href="#" class="p-[0.75rem] %1$s" aria-label="%4$s">
				%5$s
			</a>
			<a href="#" class="p-[0.75rem] %1$s" aria-label="%6$s">
				%7$s
			</a>
			<a href="#" class="relative p-[0.75rem] %1$s" aria-label="%8$s">
				%9$s
				<span class="absolute top-[0.25rem] right-[0.25rem] w-[1rem] h-[1rem] flex items-center justify-center rounded-full text-[0.625rem] font-semibold %10$s %11$s">0</span>
			</a>
		</div>',
		esc_attr( kw_header_color( $c, 'iconColor' ) ),
		esc_attr__( 'Search', 'kw-package' ),
		kw_header_svg_search( 'w-[1.25rem] h-[1.25rem]' ),
		esc_attr__( 'Account', 'kw-package' ),
		kw_header_svg_user( 'w-[1.25rem] h-[1.25rem]' ),
		esc_attr__( 'Wishlist', 'kw-package' ),
		kw_header_svg_heart( 'w-[1.25rem] h-[1.25rem]' ),
		esc_attr__( 'Shopping bag', 'kw-package' ),
		kw_header_svg_shopping_bag( 'w-[1.25rem] h-[1.25rem]' ),
		esc_attr( kw_header_color( $c, 'cartBadgeBg' ) ),
		esc_attr( kw_header_color( $c, 'cartBadgeText' ) )
	);
}

/* ── Search Variant Right Icons ────────────────────────────────────── */

$search_right_html = '';
if ( $style_variant === 'search' ) {
	// Get secondary nav links for search variant
	$search_nav = wp_nav_menu( [
		'theme_location' => 'header-secondary',
		'container'      => false,
		'menu_class'     => 'site-header-search-nav list-none p-0 m-0 hidden md:flex items-center gap-[1.25rem]',
		'fallback_cb'    => false,
		'depth'          => 1,
		'echo'           => false,
	] );

	$search_right_html = sprintf(
		'<div class="flex items-center gap-[1.25rem]">
			%s
			<button type="button" class="p-[0.75rem] %s" aria-label="%s">
				%s
			</button>
			<a href="#" class="p-[0.75rem] %s" aria-label="%s">
				%s
			</a>
			<span class="w-[2rem] h-[2rem] rounded-full bg-[var(--wp--preset--color--foreground-subtle)] shrink-0" aria-hidden="true"></span>
		</div>',
		$search_nav ? $search_nav : '',
		esc_attr( kw_header_color( $c, 'iconColor' ) ),
		esc_attr__( 'Notifications', 'kw-package' ),
		kw_header_svg_bell( 'w-[1.25rem] h-[1.25rem]' ),
		esc_attr( kw_header_color( $c, 'iconColor' ) ),
		esc_attr__( 'Wishlist', 'kw-package' ),
		kw_header_svg_heart( 'w-[1.25rem] h-[1.25rem]' )
	);
}

/* ── Right-side actions (standard/transparent/mega) ────────────────── */

$right_actions_html = '';
if ( $style_variant !== 'ecommerce' && $style_variant !== 'search' ) {
	$login_html = '';
	if ( $show_login_link ) {
		$login_html = sprintf(
			'<a href="%s" class="text-[0.875rem] font-medium font-[family-name:var(--wp--preset--font-family--inter)] %s %s transition-colors duration-200 px-[0.5rem] py-[0.625rem]">%s</a>',
			esc_url( $login_url ),
			esc_attr( kw_header_color( $c, 'loginText' ) ),
			esc_attr( kw_header_color( $c, 'linkHover' ) ),
			esc_html( $login_text )
		);
	}

	$cta_html = '';
	if ( $show_cta && $struct['ctaStyle'] !== 'none' ) {
		$outline_class = $struct['ctaStyle'] === 'outline' ? 'rounded-full' : '';
		$cta_html = sprintf(
			'<a href="%s" class="inline-flex items-center rounded-[0.5rem] px-[1.25rem] py-[0.625rem] text-[0.875rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] transition-opacity duration-200 hover:opacity-90 %s %s %s %s">%s</a>',
			esc_url( $cta_url ),
			esc_attr( kw_header_color( $c, 'ctaBg' ) ),
			esc_attr( kw_header_color( $c, 'ctaText' ) ),
			esc_attr( kw_header_color( $c, 'ctaBorder' ) ),
			esc_attr( $outline_class ),
			esc_html( $cta_text )
		);
	}

	$right_actions_html = sprintf(
		'<div class="hidden lg:flex items-center gap-[0.75rem]">%s%s</div>',
		$login_html,
		$cta_html
	);
}

/* ── Mega Menu Panel (mega variant) ────────────────────────────────── */

$mega_panel_html = '';
if ( $struct['hasMegaPanel'] ) {
	// Use mega-menu-1 and mega-menu-2 locations for the two columns
	$mega_col1 = wp_nav_menu( [
		'theme_location' => 'mega-menu-1',
		'container'      => false,
		'menu_class'     => 'site-header-mega-col list-none p-0 m-0 flex flex-col gap-[1rem]',
		'fallback_cb'    => false,
		'depth'          => 1,
		'echo'           => false,
	] );

	$mega_col2 = wp_nav_menu( [
		'theme_location' => 'mega-menu-2',
		'container'      => false,
		'menu_class'     => 'site-header-mega-col list-none p-0 m-0 flex flex-col gap-[1rem]',
		'fallback_cb'    => false,
		'depth'          => 1,
		'echo'           => false,
	] );

	$mega_panel_html = sprintf(
		'<div class="site-header-mega-panel hidden w-full border-t %s %s" data-site-header-mega aria-hidden="true">
			<div class="flex gap-[3rem] %s py-[2rem]">
				<div class="flex-1 flex flex-col gap-[1.25rem]">
					<span class="text-[0.6875rem] font-bold tracking-[0.125rem] font-[family-name:var(--wp--preset--font-family--inter)] %s">%s</span>
					%s
				</div>
				<div class="flex-1 flex flex-col gap-[1.25rem]">
					<span class="text-[0.6875rem] font-bold tracking-[0.125rem] font-[family-name:var(--wp--preset--font-family--inter)] %s">%s</span>
					%s
				</div>
				<div class="w-[17.5rem] shrink-0 flex flex-col justify-center gap-[1rem] rounded-[0.75rem] %s p-[1.5rem]">
					<span class="text-[0.625rem] font-bold tracking-[0.09375rem] font-[family-name:var(--wp--preset--font-family--inter)] %s">%s</span>
					<span class="text-[1.125rem] font-bold tracking-[-0.0225rem] font-[family-name:var(--wp--preset--font-family--dm-sans)] %s">%s</span>
					<span class="text-[0.8125rem] font-normal leading-[1.5] font-[family-name:var(--wp--preset--font-family--inter)] %s">%s</span>
					<a href="%s" class="inline-flex items-center gap-[0.375rem] text-[0.8125rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] %s">
						%s %s
					</a>
				</div>
			</div>
		</div>',
		esc_attr( kw_header_color( $c, 'borderColor' ) ),
		esc_attr( kw_header_color( $c, 'megaPanelBg' ) ),
		esc_attr( $struct['padding'] ),
		esc_attr( kw_header_color( $c, 'megaColTitle' ) ),
		esc_html__( 'BY INDUSTRY', 'kw-package' ),
		$mega_col1 ? $mega_col1 : '',
		esc_attr( kw_header_color( $c, 'megaColTitle' ) ),
		esc_html__( 'BY USE CASE', 'kw-package' ),
		$mega_col2 ? $mega_col2 : '',
		esc_attr( kw_header_color( $c, 'megaPromoBg' ) ),
		esc_attr( kw_header_color( $c, 'megaPromoBadge' ) ),
		esc_html__( 'NEW', 'kw-package' ),
		esc_attr( kw_header_color( $c, 'megaPromoTitle' ) ),
		esc_html( $mega_promo_title ),
		esc_attr( kw_header_color( $c, 'megaPromoDesc' ) ),
		esc_html( $mega_promo_desc ),
		esc_url( $mega_promo_url ),
		esc_attr( kw_header_color( $c, 'megaPromoLink' ) ),
		esc_html__( 'Learn more', 'kw-package' ),
		kw_header_svg_arrow_right( 'w-[0.875rem] h-[0.875rem]' )
	);
}

/* ── Mobile Hamburger Button ───────────────────────────────────────── */

$mobile_hamburger_html = sprintf(
	'<button type="button" class="lg:hidden p-[0.75rem] %s" aria-label="%s" aria-expanded="false" data-site-header-hamburger>
		%s
	</button>',
	esc_attr( kw_header_color( $c, 'iconColor' ) ),
	esc_attr__( 'Open menu', 'kw-package' ),
	kw_header_svg_menu( 'w-[1.5rem] h-[1.5rem]' )
);

/* ── Mobile Menu Overlay ───────────────────────────────────────────── */

$mobile_nav = wp_nav_menu( [
	'theme_location' => $menu_location,
	'container'      => false,
	'menu_class'     => 'site-header-mobile-nav list-none p-0 m-0 flex flex-col gap-[0.5rem]',
	'fallback_cb'    => false,
	'depth'          => 1,
	'echo'           => false,
] );

$mobile_cta_html = '';
if ( $show_cta && $struct['ctaStyle'] !== 'none' ) {
	$mobile_cta_html = sprintf(
		'<a href="%s" class="mt-[1.5rem] flex items-center justify-center rounded-[0.5rem] px-[1.25rem] py-[0.75rem] text-[1rem] font-semibold font-[family-name:var(--wp--preset--font-family--inter)] %s %s %s">%s</a>',
		esc_url( $cta_url ),
		esc_attr( kw_header_color( $c, 'ctaBg' ) ),
		esc_attr( kw_header_color( $c, 'ctaText' ) ),
		esc_attr( kw_header_color( $c, 'ctaBorder' ) ),
		esc_html( $cta_text )
	);
}

$mobile_menu_html = sprintf(
	'<div class="site-header-mobile-menu fixed inset-0 z-[100] hidden %s" data-site-header-mobile aria-hidden="true">
		<div class="flex items-center justify-between %s %s">
			<span class="text-[1.25rem] font-bold %s %s">%s</span>
			<button type="button" class="p-[0.75rem] %s" aria-label="%s" data-site-header-close>
				%s
			</button>
		</div>
		<nav aria-label="%s" class="%s pt-[1rem]">
			%s
			%s
		</nav>
	</div>',
	esc_attr( kw_header_color( $c, 'mobileMenuBg' ) ),
	esc_attr( $struct['height'] ),
	esc_attr( $struct['padding'] ),
	esc_attr( $struct['logoFont'] ),
	esc_attr( kw_header_color( $c, 'mobileMenuText' ) ),
	esc_html( $logo_text ),
	esc_attr( kw_header_color( $c, 'mobileMenuText' ) ),
	esc_attr__( 'Close menu', 'kw-package' ),
	kw_header_svg_close( 'w-[1.5rem] h-[1.5rem]' ),
	esc_attr__( 'Mobile navigation', 'kw-package' ),
	esc_attr( $struct['padding'] ),
	$mobile_nav ? $mobile_nav : '',
	$mobile_cta_html
);

/* ── Main Navbar Content ───────────────────────────────────────────── */

$border_class = $struct['hasBorder'] ? 'border-b ' . kw_header_color( $c, 'borderColor' ) : '';

if ( 'ecommerce' === $style_variant ) {
	$main_nav_html = sprintf(
		'<div class="flex items-center justify-between %s %s %s %s">
			%s
			<div class="lg:hidden">%s</div>
			<a href="%s" class="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">%s</a>
			%s
		</div>',
		esc_attr( $struct['height'] ),
		esc_attr( $struct['padding'] ),
		esc_attr( kw_header_color( $c, 'headerBg' ) ),
		esc_attr( $border_class ),
		$ecommerce_left_html,
		$mobile_hamburger_html,
		esc_url( home_url( '/' ) ),
		$logo_html,
		$ecommerce_right_html
	);
} elseif ( 'search' === $style_variant ) {
	$main_nav_html = sprintf(
		'<div class="flex items-center justify-between %s %s %s %s">
			<div class="flex items-center gap-[1.5rem] shrink-0">%s</div>
			%s
			<div class="flex items-center md:hidden">%s</div>
			%s
		</div>',
		esc_attr( $struct['height'] ),
		esc_attr( $struct['padding'] ),
		esc_attr( kw_header_color( $c, 'headerBg' ) ),
		esc_attr( $border_class ),
		$logo_html,
		$search_bar_html,
		$mobile_hamburger_html,
		$search_right_html
	);
} else {
	// standard, transparent, mega
	$main_nav_html = sprintf(
		'<div class="flex items-center justify-between %s %s %s %s">
			%s
			%s
			<div class="flex items-center gap-[0.5rem]">
				%s
				%s
			</div>
		</div>',
		esc_attr( $struct['height'] ),
		esc_attr( $struct['padding'] ),
		esc_attr( kw_header_color( $c, 'headerBg' ) ),
		esc_attr( $border_class ),
		$logo_html,
		$nav_menu_html,
		$right_actions_html,
		$mobile_hamburger_html
	);
}

/* ── Final Output ──────────────────────────────────────────────────── */

printf(
	'<header %s>%s%s%s%s</header>',
	$wrapper_attributes,
	$promo_bar_html,
	$main_nav_html,
	$mega_panel_html,
	$mobile_menu_html
);
