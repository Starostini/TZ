
let btns = document.querySelectorAll('.btn'),
    modal = document.querySelector('.modal'),
    body = document.querySelector('body'),
    productText = document.querySelector('.product__text'),
    productLabel = document.querySelector('.product__label'),
    itemsList = document.querySelector('.items'),
    form = document.querySelector('.request');

//Apllying the script sfter loading content
document.addEventListener('DOMContentLoaded', function () {

//Requesting json file and iterating over it
    fetch('js/product.json')
        .then(response => response.json())
        .then(json => {
            const arr = json.product;
            arr.forEach(el => takeInfo(el));
        });

// Adding product from json file
    function takeInfo(element) {
        let name = element.name;
        let img = element.img;
        let price = element.price;
        let inner = `<a href="#" class="list__item-link" id="item1"><img src="${img}" alt="chair" class="list__item-img">
                        <p class="list__item-title">${name}</p>
                        <p class="list__item-price price" data-price="${price}">${price} ₽</p>
                        <a href="#" class="list__item-btn btn">Купить</a>
                    </a>`;
        let div = document.createElement('div');
        div.classList.add('list__item', 'item');
        div.innerHTML = inner;
        itemsList.insertAdjacentElement('beforeend', div);
        // Request new list of buttons after adding
        btns = document.querySelectorAll('.btn');
        //Add event listener to button in cart
        addIvent(btns);
    }
    //Add event listener to button in cart
    function addIvent(btns) {
        for (const btn of btns) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                let nameOfProduct = btn.parentNode.querySelector('.list__item-title');
                modal.classList.add('dblock');
                productText.value = nameOfProduct.innerText;
                productLabel.innerText = `Вы хотите приобрести: ${nameOfProduct.innerText}`;
            })
        }
    }
    //Add event listener to button in cart and Open modal window
    for (const btn of btns) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            let nameOfProduct = btn.parentNode.querySelector('.list__item-title');
            modal.classList.add('dblock');
            productText.value = nameOfProduct.innerText;
            productLabel.innerText = `Вы хотите приобрести: ${nameOfProduct.innerText}`;
        })
    }
    //Close modal window
    body.addEventListener('click', function (e) {
        e.stopPropagation();
        modal.classList.remove('dblock');
    });
    form.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});


