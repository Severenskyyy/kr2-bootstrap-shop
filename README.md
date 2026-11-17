# SVR — магазин на Bootstrap

## Контрольная работа №2

Тема: «CSS-фреймворки: разработка интерфейса на Bootstrap или альтернативном CSS-фреймворке».

Отдельная реализация интернет-магазина SVR (та же предметная область, что в КР №1) на Bootstrap 5.3:
каталог, карточки, страница товара, форма заказа, навигация, модальное окно.

**Студент:** Кирбитов Артём Евгеньевич, группа ЭФБО-04-25

## Используемый фреймворк

Bootstrap 5.3.8 и Bootstrap Icons 1.13.1.

## Подключение Bootstrap

Bootstrap подключён **локально** (дополнительное задание), без CDN. Файлы фреймворка лежат в папке `vendor/`:

- `vendor/bootstrap/css/bootstrap.min.css` — стили;
- `vendor/bootstrap/js/bootstrap.bundle.min.js` — JS Bundle (включает Popper), нужен для collapse, modal, carousel, tabs, offcanvas, accordion;
- `vendor/bootstrap-icons/` — иконки.

Порядок подключения: сначала `bootstrap.min.css`, затем `css/custom.css` — так свои стили переопределяют стили Bootstrap.
Скрипт подключается в конце `body`.

К подключениям CSS и JS добавлено `?v=2` — номер версии файлов. При обновлении сайта номер меняется, и браузер скачивает их заново, а не берёт старые копии из кэша.

## Ссылка на опубликованный проект

- GitHub Pages: https://severenskyyy.github.io/kr2-bootstrap-shop/
- Репозиторий: https://github.com/Severenskyyy/kr2-bootstrap-shop

## Структура проекта

```
kr2-bootstrap-shop/
├── index.html        главная: navbar, alert, hero, категории, преимущества, популярное, контакты
├── catalog.html      каталог: фильтры (offcanvas), категории на вкладках nav-pills, карточки, пагинация
├── product.html      товар: карусель-галерея, характеристики, FPS в играх, вкладки, модальное окно
├── order.html        форма заказа, сводка, accordion с частыми вопросами
├── css/
│   └── custom.css    собственные стили поверх Bootstrap
├── fonts/            шрифты Unbounded и Onest
├── images/           фото товаров и favicon.svg
├── vendor/
│   ├── bootstrap/
│   │   ├── css/bootstrap.min.css
│   │   └── js/bootstrap.bundle.min.js
│   └── bootstrap-icons/
├── README.md
└── .gitignore
```

## Bootstrap-сетка

`container`, `row`, `col-12`, `col-md-*`, `col-lg-*`, `row-cols-1 row-cols-sm-2 row-cols-lg-4`, отступы между колонками `g-3`, `g-4`, `g-lg-5` (одновременно задают `gx` и `gy`).
Карточки перестраиваются: 1 колонка на телефоне → 2 на планшете → 3–4 на десктопе.

## Реализованные компоненты

- `navbar` — на всех страницах, на экранах меньше `lg` меню сворачивается в кнопку (collapse);
- `card` — карточки товаров, категории, панели;
- `btn` — `btn-primary`, `btn-outline-primary`, `btn-light`, `btn-outline-secondary`, размеры `btn-sm`, `btn-lg`;
- `badge` — «Хит», «Новинка», «−17 %», счётчики в категориях;
- `alert` — промо-сообщение с кнопкой закрытия, подсказка на странице товара, «Заявка отправлена»;
- `modal` — «Купить в 1 клик» на странице товара;
- `form-control`, `form-select`, `input-group`, `form-check`, `form-switch` — форма заказа, фильтры;
- `accordion` — частые вопросы на странице заказа;
- `nav-pills` + `tab-content` — переключение категорий в каталоге;
- `nav-tabs` — описание, характеристики, сравнение на странице товара;
- `carousel` — галерея товара с миниатюрами;
- `offcanvas` — фильтры каталога на телефоне;
- `progress`, `list-group`, `breadcrumb`, `pagination`, `table`.

## custom.css

Не дублирует Bootstrap: меняет его CSS-переменные (цвет `--bs-primary`, шрифт, фон, скругления, переменные кнопок `--bs-btn-*`)
и добавляет то, чего в Bootstrap нет: фирменная ARGB-полоска, hero-блок, миниатюры карусели, градиент прогресс-баров,
подсветка ошибок формы через `:user-invalid` и сообщение об отправке через `:target`.

## Самостоятельные доработки

1. **Bootstrap подключён локально** из `vendor/` (дополнительное задание).
2. **Каталог:** категории переключаются вкладками `nav-pills` (Bootstrap JS, без своего кода), фильтры на телефоне открываются в `offcanvas-lg`,
   на десктопе это обычная боковая колонка.
3. **Страница товара:** галерея на `carousel`, где индикаторы превращены в миниатюры; блок «FPS в играх» на `progress`.
4. **Сценарий заказа без JavaScript:** ошибки полей подсвечиваются после ввода (`:user-invalid`), после отправки на `order.html#order-sent`
   показывается `alert` «Заявка отправлена» (`:target`).

## Как проверить

1. Открыть сайт и уменьшить окно до 375 px (или режим устройства в DevTools): меню сворачивается в кнопку, карточки встают в одну колонку.
2. На `catalog.html` переключить категории и открыть «Фильтры» на узком экране.
3. На `product.html` нажать на миниатюры, вкладки и «Купить в 1 клик».
4. На `order.html` нажать «Отправить заявку» с пустыми полями — появятся подсказки.

HTML проверен валидатором W3C — ошибок нет.

## Источники изображений

Все фото взяты из открытых источников, названия товаров соответствуют моделям на снимках.
У собственных сборок SVR название придумано, а в характеристиках указаны комплектующие, которые видны на фото
(ASUS ROG, Thermaltake, G.Skill Trident Z RGB, MSI; ASUS PRIME Z390-A, Cooler Master, Corsair; AMD Ryzen Threadripper, XFX Radeon RX 6700 XT, Lian Li).

| Файлы | Что на фото | Автор / источник | Лицензия | Ссылка |
| --- | --- | --- | --- | --- |
| `p-svr-gamer, hero, g-gamer-red` | ПК с красной подсветкой | Unsplash | Unsplash License | https://images.unsplash.com/photo-1587202372583-49330a15584d |
| `g-gamer-blue, c-pc` | ПК с синей подсветкой | Unsplash | Unsplash License | https://images.unsplash.com/photo-1587202372775-e229f172b9d7 |
| `g-gamer-inside, g-gamer-detail` | Внутри ПК: ASUS ROG, Thermaltake, G.Skill | Unsplash | Unsplash License | https://images.unsplash.com/photo-1587202372634-32705e3bf49c |
| `p-svr-start` | ASUS PRIME Z390-A, Cooler Master, Corsair | Unsplash | Unsplash License | https://images.unsplash.com/photo-1660855552442-1bae49431379 |
| `p-svr-studio` | Threadripper, XFX RX 6700 XT, Lian Li | Unsplash | Unsplash License | https://images.unsplash.com/photo-1624705002806-5d72df19c3ad |
| `p-rog-strix-g15` | ASUS ROG Strix G15 G513QY | D-Kuru, Wikimedia Commons | CC BY-SA 4.0 | https://commons.wikimedia.org/w/index.php?curid=112212246 |
| `c-laptops` | ASUS ROG Strix G15 G513QY, крышка | D-Kuru, Wikimedia Commons | CC BY-SA 4.0 | https://commons.wikimedia.org/w/index.php?curid=112212272 |
| `p-macbook-air-m2` | Apple MacBook Air M2 | KKPCW (Kyu3), Wikimedia Commons | CC BY-SA 4.0 | https://commons.wikimedia.org/w/index.php?curid=121262188 |
| `p-dell-xps-13` | Dell XPS 13 | Unsplash | Unsplash License | https://images.unsplash.com/photo-1593642702821-c8da6771f0c6 |
| `p-hyperx-cloud` | HyperX Cloud | GEEK KAZU, Flickr | CC BY 2.0 | https://www.flickr.com/photos/152342724@N04/40218660592 |
| `p-sony-wh-1000xm4, c-audio` | Sony WH-1000XM4 | Unsplash | Unsplash License | https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb |
| `p-airpods-pro` | Apple AirPods Pro | Unsplash | Unsplash License | https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb |
| `p-logitech-g502, c-gear` | Logitech G502 | Unsplash | Unsplash License | https://images.unsplash.com/photo-1563297007-0686b7003af7 |
| `p-keychron-k2` | Keychron K2 | Unsplash | Unsplash License | https://images.unsplash.com/photo-1618384887929-16ec33fab9ef |
| `p-dualshock-4` | Sony DualShock 4 | Unsplash | Unsplash License | https://images.unsplash.com/photo-1592840496694-26d035b52b48 |

Шрифты Unbounded и Onest — SIL Open Font License, подключены локально из пакетов Fontsource.
