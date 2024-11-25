'use strict';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded!");
    let quizButtonPrev = document.getElementById("quiz-button-prev");
    let quizButtonNext = document.getElementById("quiz-button-next");
    let quizItems = document.querySelectorAll('.quiz-item');
    let quizBottom = document.querySelector('.quiz-bottom');
    let quizDescription = document.querySelector(".quiz-description");
    let quizSemifinal = document.querySelector(".quiz-semifinal-bg");

    let num = 0;

    quizButtonPrev.addEventListener("click", function () {
        num--;
        actions(num);
    })
    quizButtonNext.addEventListener("click", function () {
        num++;
        actions(num);
    })
    function actions (num) {
        progress(num);
        buttonVisibility(num);
        quizItems.forEach(item => {
            item.style.display = "none";
        });
        quizItems[num].style.display = "block";
        checkRadio(num);
    }
    function buttonVisibility(num) {
        quizButtonPrev.style.display = num > 0 ? "flex" : "none";
        quizButtonPrev.style.disabled = num > 0 ? "true" : "false";
        quizBottom.style.display = num > 5 ? "none" : "flex";
        quizDescription.style.display = num > 5 ? "none" : "block";
        quizSemifinal.style.display = num > 5 ? "flex" : "none";
        document.querySelector(".quiz-click__text").innerHTML = num === 5 ?
            "Напишите свои пожелания тут" :
            "Выберите вариант ответа <br> и <span>нажмите кнопку “Далее”</span>";
        if(num === 6){
            document.querySelector(".quiz-progress__text").innerHTML = "Вы ответили на все вопросы";
            document.querySelector(".quiz-progress").classList.add("quiz-progress-last");
        }
    }



    //progress bar
    function progress(num) {
        let percent ;
        let qLeft;

        switch (num) {
            case 0:
                qLeft = '1'
                percent = 17;
                break;
            case 1:
                qLeft = '2'
                percent = 34;
                break;
            case 2:
                qLeft = '3'
                percent = 50;
                break;
            case 3:
                qLeft = '4'
                percent = 67;
                break;
            case 4:
                qLeft = '5'
                percent = 83;
                break;
            case 5:
                qLeft = '6'
                percent = 100;
                break;
            case 6:
                qLeft = '6'
                percent = 100;
                break;
            default:
                break;
        }

        document.querySelector('.js-quiz-progress').innerHTML = qLeft;
        document.querySelector('.quiz-progress__inner').style.width = percent + '%';
    }



    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
    document.querySelector(".js-quiz-today").innerHTML = formattedDate;

    // const heightRange = document.getElementById('heightRange');
    // const heightValue = document.getElementById('heightValue');


    const widthRange = document.getElementById('widthRange');
    const widthInput = document.getElementById('widthInput');

// Обновление значения при изменении ползунка
    widthRange.addEventListener('input', () => {
        const value = widthRange.value;
        widthInput.value = value;
    });

// Обновление значения при изменении поля ввода
    widthInput.addEventListener('input', () => {
        const value = widthInput.value;
        widthRange.value = value;
    });


    const heightRange = document.getElementById('heightRange');
    const heightInput = document.getElementById('heightInput');

// Обновление значения при изменении ползунка
    heightRange.addEventListener('input', () => {
        const value2 = heightRange.value;
        heightInput.value = value2;
    });

// Обновление значения при изменении поля ввода
    heightInput.addEventListener('input', () => {
        const value2 = heightInput.value;
        heightRange.value = value2;
    });


    $("#quiz-form").on("submit", function (e) {
        e.preventDefault(); // Предотвращаем отправку формы стандартным способом

        $.ajax({
            type: "POST",
            url: "./mail.php", // Файл, который обрабатывает отправку email
            data: $(this).serialize(), // Собираем данные формы
            success: function (response) {
                alert("Форма успешно отправлена!");
                $("#form")[0].reset(); // Очищаем форму
            },
            error: function () {
                alert("Произошла ошибка при отправке. Попробуйте еще раз.");
            }
        });
    });

    // 1245
    function checkRadio(num) {
        num = num + 1;
        console.log(num);
        if (num === 1 || num === 2 || num === 4 || num === 5){
            function checkRadioSelection() {
                // Проверяем, есть ли хотя бы один выбранный radio
                if (Array.from(document.querySelectorAll(`input[name="quiz${num}"]`)).some(radio => radio.checked)) {
                    quizButtonNext.disabled = false;
                } else {
                    quizButtonNext.disabled = true;
                }
            }

            // Добавляем обработчик события для всех radio кнопок
            document.querySelectorAll(`input[name="quiz${num}"]`).forEach(radio => {
                radio.addEventListener('change', checkRadioSelection);
            });

            checkRadioSelection();
        }
    }
    checkRadio(0);

});
