<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

$nume    = trim($_POST['nume'] ?? '');
$email   = trim($_POST['email'] ?? '');
$telefon = trim($_POST['telefon'] ?? '');
$subiect = trim($_POST['subiect'] ?? '');
$mesaj   = trim($_POST['mesaj'] ?? '');

if (empty($nume) || empty($email) || empty($mesaj)) {
    http_response_code(400);
    die('Campuri obligatorii lipsesc');
}

$subiecte = [
    'rezervare-camera'    => 'Rezervare cameră',
    'rezervare-restaurant' => 'Rezervare restaurant',
    'eveniment'           => 'Eveniment',
    'pool-park'           => 'Pool Park',
    'altele'              => 'Altele',
];
$subiect_label = $subiecte[$subiect] ?? 'Altele';

$to      = 'office@astoriahotels.ro';
$subject = "Formular Contact - {$subiect_label} - {$nume}";

$headers  = "From: {$email}\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$html = "
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family: Arial, sans-serif; padding: 20px;'>
    <h2>Mesaj nou de pe astoriahotels.ro</h2>
    <table style='border-collapse: collapse; width: 100%; max-width: 600px;'>
        <tr><td style='padding: 8px; font-weight: bold;'>Nume:</td><td style='padding: 8px;'>{$nume}</td></tr>
        <tr><td style='padding: 8px; font-weight: bold;'>Email:</td><td style='padding: 8px;'>{$email}</td></tr>
        <tr><td style='padding: 8px; font-weight: bold;'>Telefon:</td><td style='padding: 8px;'>" . (!empty($telefon) ? $telefon : 'Nespecificat') . "</td></tr>
        <tr><td style='padding: 8px; font-weight: bold;'>Subiect:</td><td style='padding: 8px;'>{$subiect_label}</td></tr>
    </table>
    <h3>Mesaj:</h3>
    <p style='background: #f5f5f5; padding: 15px; border-radius: 5px;'>{$mesaj}</p>
    <hr>
    <p style='color: #888; font-size: 12px;'>Acest mesaj a fost trimis prin formularul de contact de pe astoriahotels.ro</p>
</body>
</html>";

if (mail($to, $subject, $html, $headers)) {
    http_response_code(200);
    echo 'OK';
} else {
    http_response_code(500);
    echo 'Eroare la trimiterea emailului';
}
