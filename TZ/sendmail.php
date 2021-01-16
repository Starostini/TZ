<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //from Who?
    $mail->setFrom('starostini@hotmail.com', 'Hi there');
    // for Who?
    $mail->addAddress('starostini@hotmail.com');
    //Theme
    $mail->Subject = 'Hi there!';
    $body = '<h1>Hi there!</h1>';
    if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
    }

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Error!';
} else {
    $message = 'Everything send! Well done!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
