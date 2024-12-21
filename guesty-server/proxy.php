<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

// Set your API's base URL
$apiBaseUrl = 'https://booking.guesty.com/api/';

// Get the target endpoint and method from the request
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';
$method = $_SERVER['REQUEST_METHOD'];

// Decode URL parameters
foreach ($_GET as $key => $value) {
    $_GET[$key] = urldecode($value);
}


// Dynamically locate wp-load.php
$wpLoadPath = $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
if (!file_exists($wpLoadPath)) {
    $wpLoadPath = dirname(__FILE__, 5) . '/wp-load.php'; // Adjust depth if needed
}

if (!file_exists($wpLoadPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'wp-load.php not found.']);
    exit;
}

// Include WordPress
require_once($wpLoadPath);

// Retrieve the access token from the WordPress options table
$accessToken = get_option('guesty_access_token');


// Build the target URL
$targetUrl = $apiBaseUrl . $endpoint;

// Initialize cURL
$ch = curl_init($targetUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken",
    "Accept: application/json",
    "Content-Type: application/json"
]);

// Pass any JSON body data
if ($method === 'POST' || $method === 'PUT') {
    $input = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
}

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close cURL
curl_close($ch);

// Forward the response back to the client
http_response_code($httpCode);
header("Content-Type: application/json");
echo $response;
