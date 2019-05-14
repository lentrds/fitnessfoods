<?php
error_reporting(0);
$mail = "olenaskuzmina@gmail.com";
/*var_dump($_POST);
var_dump($_REQUEST);
var_dump($_POST['callback_name']);*/
$secret = '6LcvmCYUAAAAAPm3n0JZK8zOFOzv4xfp-QRe1YN1';
$gcapt = $_POST['g-recaptcha-response'];
$verify=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$gcapt}");
if(isset($_POST['callback_name'])&&($_POST['callback_name']!=='')) {
    $messagetype = 'Заявка';
    $messagecontent = "<p><strong>Ім'я:</strong> ".$_POST['callback_name']."</p>
    <p><strong>Телефон:</strong> ".$_POST['callback_phone']."</p>";
} else {
    $messagetype = 'Замовлення';
    $messagecontent = "<p><strong>Ім'я:</strong> ".$_POST['name']."</p>
    <p><strong>Прізвище:</strong> ".$_POST['surname']."</p>
    <p><strong>Телефон:</strong> ".$_POST['phone']."</p>
    <p><strong>Пошта:</strong> ".$_POST['email']."</p>
    <p><strong>Адреса доставки:</strong> ".$_POST['address']."</p>
    <p><strong>Тип оплати:</strong> ".$_POST['payment']."</p>";
}
$message = "<h2>".$messagetype." з сайта \"Fitnessfood.cafe\":</h2><hr>.$messagecontent.";
$subject="Повідомлення з сайта \"Fitnessfood.cafe\"";
$verify = json_decode($verify);
if ( $verify->success) {
    mail($mail, $subject, $message, "Content-type: text/html; charset=utf-8 \r\n"); echo json_encode("Done");
} else {echo json_encode("Recaptcha problems");}

