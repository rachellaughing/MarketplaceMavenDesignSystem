<?php
/**
 * Revenue Health Matrix Zoom Explorer — shortcode
 * Add this to your child theme's functions.php, or a small custom plugin.
 *
 * Usage: place [revenue_matrix_explorer] on any page or post.
 *
 * SETUP:
 * 1. Upload rhv-framework-data.json to your WordPress Media Library
 *    (Media > Add New). Copy its URL.
 * 2. Paste that URL into revenue-matrix-zoom-explorer.html, replacing
 *    "REPLACE_WITH_JSON_URL/rhv-framework-data.json" with the real URL.
 * 3. Upload the edited revenue-matrix-zoom-explorer.html to your theme,
 *    e.g. wp-content/themes/YOUR-CHILD-THEME/revenue-matrix-zoom-explorer.html
 *    (adjust the path in get_stylesheet_directory() below if you place it elsewhere).
 */

function rhv_matrix_explorer_shortcode() {
    $file_path = get_stylesheet_directory() . '/revenue-matrix-zoom-explorer.html';

    if ( ! file_exists( $file_path ) ) {
        return '<p><em>Revenue Health Matrix explorer file not found.</em></p>';
    }

    return file_get_contents( $file_path );
}
add_shortcode( 'revenue_matrix_explorer', 'rhv_matrix_explorer_shortcode' );
