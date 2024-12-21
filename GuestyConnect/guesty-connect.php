<?php

/**
 * Plugin Name: Guesty Connect
 * Plugin URI: https://prodevx.me/
 * Description: GuestyConnect is a powerful WordPress plugin designed to seamlessly integrate with the Guesty Booking API. It enables website owners to fetch and display property listings, view detailed information about individual properties, implement advanced search functionality, integrate calendars for availability, and handle booking reservations with secure payment processing. Perfect for property managers and rental businesses, this plugin simplifies the management of online bookings directly from your WordPress site.
 * Version: 3.8.0
 * Author: ProDevX Solutions
 * Author URI: https://prodevx.me/
 * Text Domain: guesty-connect
 **/

if (!defined('ABSPATH')) {
    exit;
}

// Include the refresh token function
require_once plugin_dir_path(__FILE__) . 'refresh_token.php';

// Schedule the cron job
function schedule_access_token_refresh()
{
    if (!wp_next_scheduled('refresh_access_token_event')) {
        wp_schedule_event(time(), 'daily', 'refresh_access_token_event');
    }
}
add_action('wp', 'schedule_access_token_refresh');
add_action('refresh_access_token_event', 'refresh_access_token');

// Function to get the access token
function get_access_token()
{
    $access_token = get_option('guesty_access_token');
    $expires = get_option('guesty_access_token_expires');

    if (!$access_token || time() >= $expires) {
        refresh_access_token();
        $access_token = get_option('guesty_access_token');
    }

    return $access_token;
}

// Function to get API options
function get_guesty_options()
{
    $access_token = get_access_token();
    return array(
        'method' => 'GET',
        'headers' => array(
            'accept' => 'application/json; charset=utf8',
            'authorization' => 'Bearer ' . $access_token
        )
    );
}

// Main Plugin Class
class GuestyConnect
{
    public function __construct()
    {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('wp_footer', array($this, 'enqueue_gc_styles'));
        add_filter('script_loader_tag', array($this, 'add_type_attribute'), 10, 3);

        // Register shortcodes
        add_shortcode('all-listings', array($this, 'load_all_listings_shortcode'));
        add_shortcode('featured-listings', array($this, 'load_featured_listings_shortcode'));
        add_shortcode('properties', array($this, 'load_properties_shortcode'));
        add_shortcode('property-details', array($this, 'load_property_details_shortcode'));
        add_shortcode('checkout', array($this, 'load_checkout_shortcode'));
        add_shortcode('search-form', array($this, 'load_search_form_shortcode'));
        add_shortcode('search-results', array($this, 'load_search_results_shortcode'));
        add_shortcode('reservation', array($this, 'load_reservation_shortcode'));
    }

    public function init()
    {
        // Admin menu setup
        add_action('admin_menu', array($this, 'admin_menu'));
    }

    public function admin_menu()
    {
        add_menu_page(
            __('Guesty Connect', 'guesty-connect'),
            __('Guesty Connect', 'guesty-connect'),
            'manage_options',
            'guesty-connect',
            array($this, 'admin_page')
        );
    }

    public function admin_page()
    {
        echo '<h1>' . __('Guesty Connect', 'guesty-connect') . '</h1>';
    }

    public function enqueue_gc_styles()
    {
        $plugin_url = plugin_dir_url(__FILE__);

        // Global styles

        wp_enqueue_style('guesty-connect-styles', $plugin_url . 'dist/styles.css', array(), '3.8', 'all');
        wp_enqueue_style('guesty-connect-swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', array(), '3.8', 'all');
        wp_enqueue_style('guesty-connect-flatpickr', 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css', array(), '3.8', 'all');
        wp_enqueue_style('guesty-connect-preloader', 'https://cdn.jsdelivr.net/npm/preloader-js@1.0.1/assets/css/preloader.min.css', array(), '3.8', 'all');
        wp_enqueue_style('guesty-connect-fonts', $plugin_url . 'src/fonts/fonts.css', array(), '3.8', 'all');
    }

    public function enqueue_assets()
    {
        $plugin_url = plugin_dir_url(__FILE__);
        // Global script (required on all pages)
        wp_enqueue_script('guesty-connect-config', $plugin_url . 'js/config.js', array(), '3.8', true);


        // Pass the plugin URL to your JavaScript file
        wp_localize_script('guesty-connect-script', 'guestyData', array(
            'pluginUrl' => $plugin_url,
        ));

        wp_localize_script('guesty-connect-config', 'guestyData', array(
            'pluginUrl' => $plugin_url,
        ));

        wp_localize_script('guesty-connect-checkout', 'guestyData', array(
            'pluginUrl' => $plugin_url,
        ));

        wp_localize_script('guesty-connect-properties', 'guestyData', array(
            'pluginUrl' => $plugin_url,
        ));


        // Localized data for all scripts
        // $localized_data = array(
        //     'pluginUrl' => $plugin_url,
        //     'ajaxUrl'   => admin_url('admin-ajax.php'), // Example for AJAX requests
        //     'apiBaseUrl' => 'https://api.guesty.com', // Replace with actual API base URL
        // );
        // wp_localize_script('guesty-connect-config', 'guestyData', $localized_data);

        // Conditionally enqueue scripts based on the page
        if (is_page('property')) {
            wp_enqueue_script('guesty-connect-property-details', $plugin_url . 'js/property_details.js', array('guesty-connect-config'), '3.8', true);
            wp_enqueue_script('guesty-connect-booking', $plugin_url . 'js/booking.js', array('guesty-connect-config'), '3.8', true);
        }

        if (is_page('checkout')) {
            wp_enqueue_script('guesty-connect-tokenization', 'https://pay.guesty.com/tokenization/v2/init.js', array(), '3.8', true);
            wp_enqueue_script('guesty-connect-checkout', $plugin_url . 'js/checkout.js', array('guesty-connect-config'), '3.8', true);
        }

        if (is_page('vacation-rentals')) {
            wp_enqueue_script('guesty-connect-script', $plugin_url . 'js/script.js', array('guesty-connect-config'), '3.8', true);
        }

        if (is_page('properties')) {
            wp_enqueue_script('guesty-connect-properties', $plugin_url . 'js/properties.js', array('guesty-connect-config'), '3.8', true);
        }

        if (!is_page('property')) {
            wp_enqueue_script('guesty-connect-search', $plugin_url . 'js/search.js', array('guesty-connect-config'), '3.8', true);
        }

        //featured listings page
        if (is_page('home')) {
            wp_enqueue_script('guesty-connect-featured-listings', $plugin_url . 'js/featured_listings.js', array('guesty-connect-config'), '3.8', true);
        }

        if (is_page('reservation')) {
            wp_enqueue_script('guesty-connect-reservation', $plugin_url . 'js/reservation.js', array('guesty-connect-config'), '3.8', true);
        }

        // Globally required third-party libraries

        wp_enqueue_script('guesty-connect-preloader', 'https://cdn.jsdelivr.net/npm/preloader-js@1.0.1/preloader.min.js', array(), '3.8', true);
        wp_enqueue_script('guesty-connect-swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', array(), '3.8', true);
        wp_enqueue_script('guesty-connect-flatpickr', 'https://cdn.jsdelivr.net/npm/flatpickr', array(), '3.8', true);
    }



    public function add_type_attribute($tag, $handle, $src)
    {
        $module_handles = array(
            'guesty-connect-script',
            'guesty-connect-config',
            'guesty-connect-booking',
            'guesty-connect-checkout',
            'guesty-connect-tokenization',
            'guesty-connect-property-details',
            'guesty-connect-properties',
            'guesty-connect-search',
            'guesty-connect-featured-listings',
            'guesty-connect-reservation',
        );
        if (in_array($handle, $module_handles)) {
            $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }

    public function load_all_listings_shortcode()
    {
        include plugin_dir_path(__FILE__) . 'templates/all-listings.php';
    }

    public function load_featured_listings_shortcode()
    {
        include plugin_dir_path(__FILE__) . 'templates/featured-listings.php';
    }

    public function load_property_details_shortcode()
    {
        include plugin_dir_path(__FILE__) . 'templates/property-details.php';
    }

    public function load_properties_shortcode()
    {
        include plugin_dir_path(__FILE__) . 'templates/properties.php';
    }

    public function load_checkout_shortcode()
    {
        include plugin_dir_path(__FILE__) . 'templates/checkout.php';
    }

    public function load_search_form_shortcode()
    {
        include plugin_dir_path(__FILE__) . 'templates/search-form.php';
    }

    public function load_search_results_shortcode()
    {
        include plugin_dir_path(__FILE__) . 'templates/search-results.php';
    }

    public function load_reservation_shortcode()
    {
        include plugin_dir_path(__FILE__) . 'templates/reservation.php';
    }
}

new GuestyConnect();
