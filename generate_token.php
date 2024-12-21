<?php
// Include WordPress functions
require_once('../../../wp-load.php');

// Include the refresh token function
require_once plugin_dir_path(__FILE__) . 'refresh_token.php';

// Call the refresh_access_token function
refresh_access_token();

// Get the new access token
$access_token = get_option('guesty_access_token');
$expires = get_option('guesty_access_token_expires');

if ($access_token) {
    echo 'New access token: ' . $access_token . '<br>';
    echo 'Expires at: ' . date('Y-m-d H:i:s', $expires);
} else {
    echo 'Failed to generate a new access token.';
}
