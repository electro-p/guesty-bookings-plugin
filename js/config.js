// config.js

export const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.accessToken}`
  }
};

export const accessToken = "<?php echo get_option('guesty_access_token'); ?>";

export const pluginUrl = window.location.origin + '/wp-content/plugins/guestyconnect/';