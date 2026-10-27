// =========================================
// Зерно — скрипт для всех страниц
// Каждая часть проверяет, есть ли нужные элементы на странице
// =========================================


// ---------- 1. Появление блоков при прокрутке ----------
// Блоки с классом reveal появляются, когда доходят до экрана
const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // показали один раз — больше не следим
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(function (item) {
    observer.observe(item);
});


// ---------- 2. Фильтр товаров в каталоге ----------
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');
const productCount = document.getElementById('productCount');

filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // подсвечиваем нажатую кнопку
        filterButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // показываем только товары нужной категории (d-none — класс Bootstrap)
        const category = button.dataset.filter;
        let count = 0;

        productItems.forEach(function (item) {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('d-none');
                count++;
            } else {
                item.classList.add('d-none');
            }
        });

        productCount.textContent = count;
    });
});

// включаем фильтр по ссылке вида catalog.html#beans (из выпадающего меню «Каталог»)
function filterFromHash() {
    const hashButton = document.querySelector('.filter-btn[data-filter="' + window.location.hash.slice(1) + '"]');
    if (hashButton) {
        hashButton.click();
    }
}

if (filterButtons.length > 0) {
    filterFromHash();                                       // когда страница только открылась
    window.addEventListener('hashchange', filterFromHash);  // когда пункт меню выбрали, уже находясь в каталоге
}


// ---------- 3. Кнопки «В корзину» и уведомление (toast) ----------
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cartCount');
const cartToast = document.getElementById('cartToast');

cartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // увеличиваем число на значке корзины в навбаре
        cartCount.textContent = Number(cartCount.textContent) + 1;
        cartCount.classList.remove('d-none');

        // показываем уведомление Bootstrap
        if (cartToast) {
            document.getElementById('toastText').textContent = 'Добавлено в корзину: «' + button.dataset.name + '»';
            document.getElementById('toastLink').href = 'order.html?product=' + button.dataset.id;
            bootstrap.Toast.getOrCreateInstance(cartToast).show();
        }
    });
});


// ---------- 4. Итог заказа на странице order.html ----------
const productSelect = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const deliveryRadios = document.querySelectorAll('input[name="delivery"]');

function formatPrice(number) {
    return number.toLocaleString('ru-RU') + ' ₽';
}

function updateSummary() {
    if (!productSelect) {
        return; // мы не на странице заказа
    }

    const option = productSelect.options[productSelect.selectedIndex];
    const price = Number(option.dataset.price) || 0;
    let quantity = Number(quantityInput.value);
    if (quantity < 1) {
        quantity = 1;
    }

    const sum = price * quantity;

    // курьер стоит 300 ₽, но от 3 000 ₽ доставка бесплатная
    let delivery = 0;
    if (document.getElementById('deliveryCourier').checked && sum < 3000) {
        delivery = 300;
    }

    if (price === 0) {
        document.getElementById('summaryName').textContent = 'Товар не выбран';
        document.getElementById('summaryQty').textContent = 'Выберите товар в форме';
        document.getElementById('summaryImg').src = 'images/ethiopia-beans.jpg';
        document.getElementById('summarySum').textContent = '0 ₽';
        document.getElementById('summaryDelivery').textContent = '—';
        document.getElementById('summaryTotal').textContent = '0 ₽';
        return;
    }

    document.getElementById('summaryName').textContent = option.dataset.name;
    document.getElementById('summaryQty').textContent = quantity + ' шт. × ' + formatPrice(price);
    document.getElementById('summaryImg').src = option.dataset.img;
    document.getElementById('summarySum').textContent = formatPrice(sum);
    document.getElementById('summaryDelivery').textContent = delivery === 0 ? 'бесплатно' : formatPrice(delivery);
    document.getElementById('summaryTotal').textContent = formatPrice(sum + delivery);
}

if (productSelect) {
    // если пришли по ссылке order.html?product=..., сразу выбираем этот товар
    const params = new URLSearchParams(window.location.search);
    if (params.get('product')) {
        productSelect.value = params.get('product');
    }

    productSelect.addEventListener('change', updateSummary);
    quantityInput.addEventListener('input', updateSummary);
    deliveryRadios.forEach(function (radio) {
        radio.addEventListener('change', updateSummary);
    });

    updateSummary();
}


// ---------- 5. Проверка форм (заказ, подписка, покупка в один клик) ----------
// Пример проверки взят из документации Bootstrap (раздел Validation)
const forms = document.querySelectorAll('.needs-validation');

forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // сервера пока нет, поэтому страницу не перезагружаем

        if (!form.checkValidity()) {
            form.classList.add('was-validated'); // Bootstrap подсветит пустые и неверные поля
            return;
        }

        // всё заполнено — показываем зелёное сообщение и очищаем форму
        const message = form.querySelector('.form-success');
        message.classList.remove('d-none');
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });

        form.classList.remove('was-validated');
        form.reset();
        updateSummary();
    });
});
