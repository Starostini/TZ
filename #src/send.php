<?php
// несколько получателей
$to  = 'starostini@hotmail.com';// . ', ';  // обратите внимание на запятую
// $to .= 'wrkplcst@hotmail.com';

// тема письма
$subject = 'Письмо с моего сайта';

// текст письма
$message = 'Пользователь ' . $_POST['name'] . ' отправил вам письмо:<br />' . $_POST['product'] . '<br />
Связяться с ним можно по email <a href="mailto:' . $_POST['email'] . '">' . $_POST['email'] . '</a><br />
<br />
Или по телефону <p>' . $_POST['phone'] . '</p>'
;

// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

// Дополнительные заголовки
$headers .= 'To: Ilya <starostini@hotmail.com>' . "\r\n"; // Свое имя и email
$headers .= 'From: '  . $name . '<' . $email . '>' . "\r\n";


// Отправляем

if (mail($to, $subject, $message, $headers))
 {
    echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}
?>