<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

// Honeypot: bots fill hidden fields, real users don't
$honeypot = $_POST['hp_field'] ?? $_POST['website'] ?? '';
if (!empty($honeypot)) {
    http_response_code(200);
    die('OK');
}

$nume    = trim((string)($_POST['nume'] ?? ''));
$prenume = trim((string)($_POST['prenume'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$telefon = trim((string)($_POST['telefon'] ?? ''));
$subiect = trim((string)($_POST['subiect'] ?? ''));
$mesaj   = trim((string)($_POST['mesaj'] ?? ''));

// Basic rate limiting via session+ip (in-memory)
session_start();
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$key  = "rl_{$ip}";
$now  = time();
$hits = $_SESSION[$key] ?? [];
$hits = array_filter($hits, fn($t) => $t > $now - 60);
if (count($hits) >= 5) {
    http_response_code(429);
    die('Prea multe cereri. Încearcă din nou peste un minut.');
}
$hits[] = $now;
$_SESSION[$key] = $hits;

// Validation
if (mb_strlen($nume) < 2 || mb_strlen($nume) > 100) {
    http_response_code(400);
    die('Nume invalid');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) {
    http_response_code(400);
    die('Email invalid');
}
if (mb_strlen($mesaj) < 10 || mb_strlen($mesaj) > 5000) {
    http_response_code(400);
    die('Mesaj invalid (10-5000 caractere)');
}
if ($telefon !== '' && !preg_match('/^\+?[0-9\s\-()]{6,20}$/', $telefon)) {
    http_response_code(400);
    die('Telefon invalid');
}

$subiecte = [
    'rezervare-camera'     => 'Rezervare cameră',
    'rezervare-restaurant' => 'Rezervare restaurant',
    'eveniment'            => 'Eveniment',
    'pool-park'            => 'Pool Park',
    'altele'               => 'Altele',
];
$subiect_label = $subiecte[$subiect] ?? 'Altele';

$nume_complet = trim($nume . ' ' . $prenume);

// Header injection protection: strip \r\n from any user-supplied header
$safe_nume = str_replace(["\r", "\n"], '', $nume_complet);
$safe_email = str_replace(["\r", "\n"], '', $email);

$to      = 'office@astoriahotels.ro';
$subject = "Formular Contact - {$subiect_label} - {$safe_nume}";

$headers  = "From: {$safe_email}\r\n";
$headers .= "Reply-To: {$safe_email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$mesaj_esc   = htmlspecialchars($mesaj, ENT_QUOTES | ENT_HTML5, 'UTF-8');
$telefon_esc = $telefon !== '' ? htmlspecialchars($telefon, ENT_QUOTES | ENT_HTML5, 'UTF-8') : 'Nespecificat';
$nume_esc    = htmlspecialchars($safe_nume, ENT_QUOTES | ENT_HTML5, 'UTF-8');
$email_esc   = htmlspecialchars($safe_email, ENT_QUOTES | ENT_HTML5, 'UTF-8');
$sub_esc     = htmlspecialchars($subiect_label, ENT_QUOTES | ENT_HTML5, 'UTF-8');

$html = <<<HTML
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Mesaj nou de pe astoriahotels.ro</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; font-weight: bold;">Nume:</td><td style="padding: 8px;">{$nume_esc}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">{$email_esc}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Telefon:</td><td style="padding: 8px;">{$telefon_esc}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Subiect:</td><td style="padding: 8px;">{$sub_esc}</td></tr>
    </table>
    <h3>Mesaj:</h3>
    <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">{$mesaj_esc}</p>
    <hr>
    <p style="color: #888; font-size: 12px;">Acest mesaj a fost trimis prin formularul de contact de pe astoriahotels.ro</p>
</body>
</html>
HTML;

if (mail($to, $subject, $html, $headers)) {
    http_response_code(200);
    echo 'OK';
} else {
    http_response_code(500);
    echo 'Eroare la trimiterea emailului';
}
