function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

// firebase.initializeApp();
// const messaging = firebase.messaging();
// // Add the public key generated from the console here.
// messaging.getToken({vapidKey: "BGH_X7CEzOj4l2RUEItMtvrdQ6wMI6wIBVpZJnL_643imzrjBX4dRQ1afSfmvr9NWs1l6djJpLJdjkBdgcRXGxU"}).then((currentToken) => {
//     if (currentToken) {
//         // Send the token to your server and update the UI if necessary
//         // ...
//     } else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//         // ...
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
// });

let btns = document.querySelectorAll('.btn'),
    modal = document.querySelector('.modal'),
    body = document.querySelector('body'),
    nameText = document.querySelector('.name__text'),
    phoneText = document.querySelector('.phone__text'),
    productText = document.querySelector('.product__text'),
    form = document.querySelector('.request');

document.addEventListener('DOMContentLoaded', function () {
    for (const btn of btns) {
        console.log(btn);
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            let nameOfProduct = btn.parentNode.querySelector('.list__item-title');
            modal.classList.add('dblock');
            productText.innerText = nameOfProduct.innerText;
        })
    }
    body.addEventListener('click', function (e) {
        e.stopPropagation();
        modal.classList.remove('dblock');
    })

    form.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Error Error!');
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните все поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});


