<?php
$to = "mysite@ck91931-wordpress-uv3ur.tw1.ru"; // емайл получателя данных из формы
$theme = "Рассчёт стоимости"; // тема полученного емайла

$blinds = isset($_POST['quiz1']) ? $_POST['quiz1'] : 'Не выбрано'; // выбранный тип жалюзи
$black = isset($_POST['quiz2']) ? $_POST['quiz2'] : 'Не выбрано'; // Степень затемнения
                                                                    // тут будет ширина и длина
$manage = isset($_POST['quiz4']) ? $_POST['quiz4'] : 'Не выбрано'; // Управление
$montazh = isset($_POST['quiz5']) ? $_POST['quiz5'] : 'Не выбрано'; // Нужен монтаж
$social = isset($_POST['social']) ? $_POST['social'] : 'Не выбрано'; // Мессенджер

$width = isset($_POST['width']) ? htmlspecialchars($_POST['width']) : 'Не указано';
$height = isset($_POST['height']) ? htmlspecialchars($_POST['height']) : 'Не указано';

$message = "Тип жалюзи: " . $blinds . "<br>";
$message .= "Степень затемнения: " . $black . "<br>";
$message .= "Выбрана ширина: $width см";
$message .= "Выбрана высота: $height см";
$message .= "Управление: " . $manage . "<br>";
$message .= "Монтаж: " . $montazh . "<br>";
$message .= "Пожелания от клиента: ".$_POST['quiz-message']."<br>";

$message .= "Выбранный мессенджер:" . $social . "<br>";
$message .= "Номер телефона: ".$_POST['phone']."<br>";

$headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
mail($to, $theme, $message, $headers); //отправляет получателю на емайл значения переменных
?>




