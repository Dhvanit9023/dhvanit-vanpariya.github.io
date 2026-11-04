<?php
/**
 * Dhvanit Vanpariya - Self-Hosted Contact Form Email Handler
 * PHP Native Mail Script (Privacy-First, Zero Third-Parties)
 */

// Enable CORS (Optional, helpful if testing across virtual hosts)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
    exit();
}

// Get JSON post data
$raw_json = file_get_contents("php://input");
$data = json_decode($raw_json, true);

// Extract and sanitize fields
$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$project_type = isset($data['project_type']) ? strip_tags(trim($data['project_type'])) : '';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message'])) : '';

// Validation
if (empty($name) || empty($email) || empty($project_type) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please fill out all required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address structure."]);
    exit();
}

// Target email address configuration
$to_email = "vanpariyadhvanit9@gmail.com";
$subject = "New Portfolio Inquiry: " . $project_type;

// Build Beautiful HTML Email Template
$email_content = '
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f7; color: #51545e; margin: 0; padding: 0; }
        .email-wrapper { width: 100%; background-color: #f4f4f7; padding: 20px; box-sizing: border-box; }
        .email-content { max-width: 570px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e8e8f1; border-radius: 8px; padding: 30px; }
        .email-header { border-bottom: 1px solid #f4f4f7; padding-bottom: 20px; margin-bottom: 20px; }
        .email-header h2 { color: #333333; margin: 0; font-size: 20px; }
        .field-row { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #FF2D20; font-size: 13px; text-transform: uppercase; margin-bottom: 5px; }
        .field-value { font-size: 15px; color: #333333; line-height: 1.5; }
        .email-footer { margin-top: 30px; border-top: 1px solid #f4f4f7; padding-top: 20px; font-size: 12px; color: #a8aaaf; text-align: center; }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <h2>New Portfolio Inquiry</h2>
            </div>
            
            <div class="field-row">
                <div class="field-label">Sender Name</div>
                <div class="field-value">' . $name . '</div>
            </div>
            
            <div class="field-row">
                <div class="field-label">Sender Email</div>
                <div class="field-value"><a href="mailto:' . $email . '">' . $email . '</a></div>
            </div>
            
            <div class="field-row">
                <div class="field-label">Project Interest</div>
                <div class="field-value">' . $project_type . '</div>
            </div>
            
            <div class="field-row">
                <div class="field-label">Project Details</div>
                <div class="field-value">' . nl2br($message) . '</div>
            </div>
            
            <div class="email-footer">
                This inquiry was submitted directly from your Portfolio Contact Form.<br>
                Host Server IP: ' . $_SERVER['SERVER_ADDR'] . '
            </div>
        </div>
    </div>
</body>
</html>
';

// Setup Email Headers for HTML format
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = 'From: Dhvanit Portfolio <noreply@' . ($_SERVER['SERVER_NAME'] ?? 'dhvanit.dev') . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send Mail
$mail_sent = mail($to_email, $subject, $email_content, implode("\r\n", $headers));

if ($mail_sent) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Message sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Internal Server Error: Mail delivery failed."]);
}
