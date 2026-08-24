# Прототип лендинга Simple CRM — подробный аудит референса Dextr

> Референс: https://dextr.app/  
> Аудит выполнен: 23 августа 2026  
> Назначение: передать этот документ ИИ-агенту или разработчику, чтобы он смог построить для **Simple CRM** сайт с той же информационной архитектурой, ритмом, типами блоков и поведением, но с **новыми текстами, собственными скриншотами и брендингом**.

## 1. Что именно было проверено

Пройдены все публичные маршруты, обнаруживаемые из хедера, футера, трёх индексных страниц и карточек материалов: **32 URL**.

- Главная: 1.
- Контентные хабы: 3 (`Learn`, `How-To`, `Announcements`).
- Маркетинговые/служебные страницы: 7 (`About`, `Pricing`, `FAQ`, `Privacy`, `Releases`, `Support`, `Affiliates`).
- Отдельные публикации: 20.
- Динамический шаблон поиска: 1.

Не являются частью сайта и не подлежат копированию: App Store/deep-link, Discord, Instagram, YouTube, Bluesky и другие внешние ссылки. XML-карта сайта блокируется клиентом браузера, поэтому реестр сформирован по видимой навигации и всем карточкам опубликованных разделов. Для доступной публичной структуры это полный набор маршрутов.

## 2. Главный вывод для Simple CRM

Это не «один длинный лендинг», а компактный маркетинговый сайт с четырьмя слоями:

1. Главная продающая страница — эмоциональный манифест продукта, продуктовые скриншоты, доказательства, статьи и подписка.
2. Конверсионные страницы — цена, безопасность данных, поддержка, партнёрская программа.
3. База контента — три раздела и единый шаблон статьи с оглавлением/сайдбаром.
4. Служебные страницы — FAQ, privacy policy, changelog и поиск.

Для Simple CRM стоит сохранить именно этот каркас. Не переносить Dextr буквально: заменить название, логотип, формулировки, изображения интерфейса, цены, отзывы, юридические данные и внешние каналы.

**Визуальная адаптация по запросу:** основной фон Simple CRM — светлый белый. Все пропорции, сетки, порядок блоков, скругления, карточки, изображения и поведение остаются как в референсе. Тёмными сохраняются только локальные акцентные поверхности: product-showcase, newsletter CTA, тёмные карточки и футер. Текст на белом фоне обязательно переводится в тёмный, чтобы сохранить контраст.

## 3. Технический характер референса

### 3.1. Наблюдаемая реализация

- Сайт отдается как статичный Astro-сайт: ассеты имеют пути вида `/_astro/...`.
- Вёрстка построена на Tailwind-подобных utility-классах. В DOM видны классы `max-w-7xl`, `sm:*`, `lg:*`, `grid`, `rounded-2xl`, `bg-gray-800/75` и т. п.
- Базовый шрифт: `InterVariable, sans-serif`.
- Для контентных публикаций сохранены WordPress-подобные семантические классы: `entry-header`, `entry-content`, `wp-block-heading`, `widget-area`.
- На первом экране подключен canvas/particles. Он не должен мешать контенту: абсолютный слой, `pointer-events: none`, позади текста.
- На главной есть лёгкие scroll-in переходы: `.fade-in` — opacity/transform с длительностью 0.6 s и последовательной задержкой; `.slide-in-left/right` — 1 s. Если сайт Simple CRM будет реализован без анимации, структура не должна ломаться.

### 3.2. Токены, которые стоит взять как ориентир

| Сущность | Наблюдаемое значение в референсе | Рекомендация для Simple CRM |
| --- | --- | --- |
| Базовый фон | `#0A1324` / rgb(10,19,36) | **Для Simple CRM заменить на `#FFFFFF`**; допустим очень светлый нейтральный `#F8FAFC` только для чередования секций. |
| Фон карточек | тёмный translucent slate, примерно `bg-gray-800/75` | Полупрозрачная карточка поверх фона, не чистый чёрный. |
| Футер/большие CTA-контейнеры | `#0F172D` / rgb(15,23,45) | На 1 тон светлее/контрастнее фона страницы. |
| Основной текст | на тёмном — белый; вторичный — светло-серый `rgb(218,220,221)` | На белом фоне Simple CRM: основной `#111827`, пояснения `#4B5563`; внутри тёмных CTA/карточек оставить белый и muted-light. |
| Акцентные ссылки | светлый голубой (примерно `#A2C4E0`) | Использовать единый фирменный accent для ссылок/CTA. |
| Скругление карточки | 16 px (`rounded-2xl`) | 16 px для карточек; 24 px для крупных секций/CTA. |
| Ширина общего контейнера | `max-w-7xl`; при 1280 px внутренняя область 1201 px | `max-width: 1280px`, поля 24 px mobile, 32 px desktop. |
| Межколоночный gap | 32 px в обычных сетках, 48 px в article+sidebar | Не смешивать произвольные расстояния. |

### 3.3. Брэйкпоинты и адаптивная логика

Видимые классы референса соответствуют Tailwind-порогам:

- `sm` — от 640 px.
- `md` — от 768 px.
- `lg` — от 1024 px.
- `xl` — от 1280 px.

Проверено на 390 px и 1280 px:

- На 390 px рабочая ширина контентной колонки — 327 px: 24 px внешних полей с каждой стороны.
- Любая многоколоночная сетка становится одной колонкой; вертикальные gaps остаются крупными: 32 или 64 px.
- На `lg` хедер переходит в полноценную горизонтальную навигацию, hero — в текст слева + устройство справа, фичи — в 3 колонки, статья — в основной столбец + sidebar.
- На `md` карточки статей переходят из одной в две колонки; на `lg` — в три.
- Мобильный хедер раскрывается отдельным `<dialog>`; в нём есть поиск, ссылки разделов и внешние иконки.

## 4. Сквозной каркас страниц

### 4.1. Body и порядок DOM

```text
body (min-height: 100vh; flex-column; Inter; white background)
├── header
│   ├── desktop navigation / mobile trigger
│   └── dismissible announcement banner
├── main (flex-grow)
│   └── page-specific content
└── footer
```

Главная отличается тем, что хедер размещён поверх hero (`absolute`, высокий `z-index`). На внутренних страницах он воспринимается как обычный верхний слой перед основным контентом. Не надо делать sticky-хедер: референс этого явно не использует. В версии Simple CRM сам hero остаётся белым; поэтому desktop navigation и основной hero-текст получают тёмный цвет.

### 4.2. Хедер

**Desktop, от `lg`:**

- Высота навигационного ряда около 95 px, горизонтальные внутренние отступы 32 px.
- Слева — логотип/wordmark как ссылка на `/`.
- В центре — компактные текстовые ссылки 14 px, `font-weight: 600`, line-height 24 px.
- В меню `Learn` есть dropdown: `How-To`, `Learn`, `Announcements`. Подпункты — блоки 160 px шириной, 8 px radius, padding 8×12 px, hover с белой полупрозрачной подложкой.
- Справа — изображение-badge/магазинная CTA (в Simple CRM это должна быть ваша CTA: «Попробовать бесплатно», «Запросить демо», App Store/Google Play и т. п.).
- Линки хедера: `About`, `Pricing`, `FAQ`, `Privacy`, `Releases`, `Support`.

**Announcement bar:**

- Под/в составе хедера есть узкая промо-плашка с одной короткой новостью и ссылкой `Learn more →`.
- Справа — кнопка закрытия с aria-label.
- Для Simple CRM: использовать под реальные обновления, промокод, запуск или убрать целиком. Скрытие должно быть только UI-состоянием; не требовать регистрации.

**Mobile, до `lg`:**

- Лого слева, кнопка hamburger справа (на 390 px кнопка около 88×40 px).
- По клику открывается `<dialog>` на светлой подложке. Внутри: закрытие, строка поиска, ссылки разделов, затем социальные/магазинные ссылки.
- В мобильном меню контентные подразделы могут быть иконками/ссылками без повторения их desktop dropdown-структуры.

### 4.3. Футер

Фон `#0F172D`. В desktop высота на главной около 322 px; в mobile — около 423 px. Контейнер: `max-w-7xl`, padding 64 px по вертикали и 32 px по бокам.

Структура:

1. Навигация по внутренним разделам. На mobile — 2 колонки, на `sm+` — flex с переносом и центрированием. Шрифт 14/24.
2. Через 64 px — ряд внешних иконок/ссылок, gap 40 px, центрирование.
3. Внизу мелкий copyright и trademark-текст.

Для Simple CRM заменить список ссылок, юридические строки и социальные каналы. Футер должен оставаться одинаковым на всех страницах.

### 4.4. Общие повторяющиеся элементы

- **Тёмная карточка:** `background: slate 75%`, ring 1 px белый/светлый с малой opacity, radius 16 px. Сильная тень фактически отключена/почти незаметна. На белом canvas она остаётся тёмной акцентной карточкой.
- **Карточка статьи:** обложка 1:1 сверху; ниже padding 24 px; заголовок 18/28, semibold; короткий excerpt; ссылка `Read more →` 14/20 semibold. Высота карточки может быть разной по тексту.
- **Поисковое поле:** полный width, высота 48 px, radius 24 px, прозрачный белый фон 5 %, обводка 10 %, search-icon справа.
- **Большой CTA-контейнер:** background `#0F172D`, radius 24 px от `sm`, внутренняя обводка 1 px белой прозрачностью; горизонтальные paddings 24 px mobile / до 96 px desktop.
- **Newsletter:** email + submit. На desktop один ряд max-width 448 px; на mobile один столбец. В референсе форма POST на `/api/newsletter`, с honeypot hidden field. В проекте Simple CRM подключать только разрешённый сервис и обязательно добавить privacy note/согласие, если это необходимо юрисдикцией.

## 5. Главная страница `/` — точная последовательность

Ниже описан порядок секций, который стоит повторить для Simple CRM. Используйте собственные тексты и изображения CRM, но не переставляйте смысловые этапы без причины: здесь хорошо выстроен путь «обещание → возможности → доверие → социальное доказательство → расширенный сценарий → контент → захват лида».

### 5.1. Hero: обещание продукта

**Контейнер:** `section.relative.isolate.pt-14` с canvas-фоном. Внутри `max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40`. Для Simple CRM canvas и фон секции белые; particles при сохранении должны быть очень светло-серыми/голубыми и ненавязчивыми.

**Desktop, 1280 px:**

- Высота hero примерно 1108 px, включая композицию.
- Левая текстовая часть около 672 px шириной; справа — вертикальный скрин iPhone/продуктового устройства около 350×716 px.
- H1: 72/72 px, `font-weight: 600`, ширина ~672 px, выравнивание left. На mobile H1 — 48 px, центрируется. В Simple CRM цвет H1 — тёмный navy/graphite, не белый.
- Над H1 — небольшая pill-плашка latest release: полупрозрачный белый фон, radius full, 14/24 px, с двумя текстами («Updates» и название релиза) и стрелкой.
- Под H1 два абзаца 20/32 px. Между ними и кнопкой есть крупные отступы 32 px. На светлом фоне текст абзацев — тёмный muted-gray.
- CTA — графический store badge 216×72 px. Для Simple CRM можно поставить крупную primary button 48–56 px высотой, но лучше сохранить один сильный CTA, а не набор из 3 кнопок.
- Фоновая particle-сетка — декоративный слой, не обязательное смысловое изображение.

**Mobile:**

- Hero растягивается приблизительно до 1712 px высоты: текст, CTA и телефон идут последовательно.
- Внешняя композиция не должна обрезать устройство: скриншот под текстом, полностью видимый, по центру.

### 5.2. «Возможности» / six-card product grid

Контейнер: `max-w-7xl`, поля 24 px mobile / 32 px desktop. Над сеткой H2 и поясняющий абзац.

**Сетка:** `grid-cols-1`, на `lg` — 3 колонки; column gap 32 px, row gap 64 px. На desktop каждая колонка около 379 px; высота карточки с phone screenshot около 810 px.

**Состав одной карточки:**

1. Крупный вертикальный скрин экрана продукта (подбирается как визуальная история функции).
2. Ниже/рядом маленькая 24 px SVG-иконка.
3. H3 24 px, extra-bold, центрированный.
4. Короткий центрированный текст функции.

У Dextr шесть смыслов: relationships, tagging, places, stats, first met, local events. Для Simple CRM предложенная замена: карточка клиента, теги/сегменты, сделки/статусы, заметки и история касаний, задачи/напоминания, аналитика/отчёты.

На 390 px сетка имеет ширину 327 px, карточки идут последовательно; высота секции около 1968 px.

### 5.3. Privacy/value split section

Полноширинная секция с тем же white canvas, `py-24 sm:py-32` (96/128 px). На desktop grid 2 колонки: 584 px + 584 px, gap 32 px. На mobile — одна колонка, gap 64 px. Чтобы не потерять визуальное деление между секциями, допустима очень светлая подложка `#F8FAFC` или тонкая верхняя граница `#E5E7EB`.

Левая часть:

- Большое атмосферное изображение (в референсе lock/data), частично выходит за левую границу контейнера.
- В нём поверх/рядом quote: небольшой ярлык, заголовок ~30 px, цитата основателя, автор.

Правая часть:

- Маленький eyebrow «Company values».
- H2 48 px desktop / 36 px mobile.
- Абзац на 20/32 px.
- Текстовая ссылка со стрелкой.

Для Simple CRM это блок «Ваши данные под контролем», «Безопасность и доступы» или «Никаких скрытых продаж данных». Не использовать чужую цитату/изображение.

### 5.4. Testimonials masonry

Секция начинается после 64–80 px паузы. Есть тонкая техническая сетка/свечение на фоне.

- Заголовочная зона: маленький label `Testimonials` и H2.
- Desktop `xl`: CSS grid с 4 колонками, gap 32 px, masonry-подобное заполнение. Один центральный отзыв выделен большой карточкой ~584×465 px; другие карточки 276 px шириной и естественной разной высоты.
- Карточки: 16 px radius, 24 px padding, тёмный translucent фон + тонкое кольцо; текст 14/24 px; ниже имя и источник через 16–24 px.
- В референсе 11 отзывов.
- Mobile: один столбец из блоков/групп, секция около 3625 px высотой.

Для Simple CRM подготовить 6–10 настоящих или явно обозначенных demo-отзывов. Лучше не имитировать App Store, если отзывы из другого источника.

### 5.5. Большой product showcase (iPad / рабочее место)

Оболочка: большая тёмная карточка `rounded-3xl`, padding 24 px mobile / 96 px desktop, внутренняя полупрозрачная обводка.

- Desktop: внутренняя grid 2 колонки, примерно 488+488 px, gap 32 px. Текст слева, широкий screenshot справа, который преднамеренно выходит за правый край (эффект большого рабочего пространства).
- В тексте H2 36–48 px, абзац, затем тонкая верхняя линия и список из 3 выгод.
- Mobile: текст, benefits и иллюстрация идут одной колонкой; сетка 327 px шириной, gap 64 px.

Для Simple CRM показать desktop-dashboard: канбан/клиенты/аналитику/коммуникации. Не показывать изображение, если у продукта пока нет такого экрана — используйте честный mockup или реальный screenshot.

### 5.6. Recent articles

- H2 центрированный, 48 px desktop.
- Сетка `1 → 2 (md) → 3 (lg)`; desktop max-width около 896 px, карточка 277 px, gap 32 px.
- Референс выводит три карточки: image-square, title, excerpt, `Read more →`.
- Отступ до сетки — 64 px; до следующей секции — 80–128 px.

Для Simple CRM можно выводить «Блог», «Гайды по продажам», «Шаблоны CRM» или «Истории клиентов». Данные должны приходить из одной коллекции, чтобы карточка работала и в главной, и в хабах.

### 5.7. Newsletter CTA

Карточка шириной почти весь `max-w-7xl`, на desktop около 1201 px. Внутреннее наполнение центрировано.

- H2 48 px, max-width 768 px, центр.
- P под заголовком, 20/32 px, muted.
- Через 32 px — max-width 448 px form: поле email + subscribe button.
- В desktop карточка высотой ~488 px, в mobile — ~568 px.

Для Simple CRM применить как «Получайте новые шаблоны, релизы и советы»; если email-маркетинга нет, заменить на финальную CTA с короткой формой demo-request.

## 6. Индексные контентные страницы

Маршруты:

- `/learn/`
- `/how-to/`
- `/announcements/`

Это **один шаблон с разным контентом**, а не три независимые верстки.

### 6.1. Компоновка хаба

1. Внешний `main.flex-grow`.
2. Внутренний блок `py-24 sm:py-32` — 96 px mobile / 128 px desktop.
3. В верхней части: H1 раздела, затем поиск 48 px с кнопкой-лупой.
4. Ниже — две компактные cross-promo карточки/колонки: два других раздела, по 2 свежих материала и `More →`.
5. H2 `… Articles`, центр, 24 px semibold, с margin 48 px до/после.
6. Сетка карточек публикаций: 1 колонка mobile, 2 на `md`, 3 на `lg`; gap 32 px.
7. Одинаковый footer.

На mobile: внешний content container 327 px, верхняя cross-promo grid превращается в столбец и занимает примерно 500 px.

### 6.2. Содержимое по разделам

| Раздел | H1 | Количество карточек | Роль |
| --- | --- | ---: | --- |
| `/learn/` | Learn | 3 | Объясняющие материалы: зачем нужна personal CRM, что такое CRM, переход от обычных контактов. |
| `/how-to/` | How-To | 11 | Практические инструкции по функциям. Самый длинный хаб. |
| `/announcements/` | Announcements | 4 | Новости продукта, кампании, релизы/ивенты. |

### 6.3. Точные размеры карточек

- Рамка: `rounded-2xl`, radius 16 px, dark translucent fill, тонкий light ring.
- Обложка: `aspect-square`; ссылочная область занимает всю квадратную верхнюю часть.
- Нижняя часть: `padding: 24px`.
- H2 карточки: `18/28`, semibold.
- Описание: обычный 16/24, обрезать разумно, но не насильно в референсе.
- Read-more: 14/20, semibold.

На мобильном Learn ширина карточки 327 px, высота в референсе от 467 до 535 px: не фиксировать высоту, иначе адаптация текста будет хрупкой.

## 7. Шаблон отдельной публикации

Одинаков для всех 20 статей: `/how-to/*`, `/learn/*`, `/announcements/*`, `/articles/*`.

### 7.1. Desktop

Фон основного контента Simple CRM — белый, внешние vertical paddings 128 px. Внутри статьи: основной текст — `#374151`, H1/H2/H3 — `#111827`; тёмный фон референса не переносить.

Внутренний контейнер шириной 1201 px на 1280 px экране использует **flex**:

```text
content wrapper (max-width около 1200px; gap 48px)
├── article: 768px
└── aside: 320px
```

Классовая логика: `flex flex-col gap-8 lg:flex-row lg:gap-12`. До `lg` — колонки одна под другой; от `lg` — горизонтально.

**Article:**

1. `entry-header`.
2. H1: 48/48 px desktop (`sm:text-5xl`), weight 600, white, margin-top 8 px, margin-bottom 32 px.
3. Метаданные: дата, опционально `· Dextr Staff`, 14/20, muted gray; margin-bottom 32 px.
4. `entry-content`: 16/28 px, muted pale text.
5. Внутри контента H2 — 32/40 px, weight regular, white, margin `48px 0 16px`; H3/H4 меньше, логическая иерархия.
6. Скриншоты и иллюстрации размещаются в теле материала рядом с шагами, иногда несколько подряд; поддержать full-width image и правильные `alt`.
7. После текста — previous/next nav 20 px высотой, `justify-between`.
8. Border-top metadata section (category/tags). `Post Information` доступно screen reader как скрытый H2.

**Aside, 320 px:**

1. На desktop видимое `ON THIS PAGE` с anchor-ссылками на H2.
2. Search (48 px).
3. При наличии — related posts.
4. Recent posts: компактные обычные article cards/список с теми же image/title/excerpt.

Не делать sidebar sticky: в проверенном DOM его позиция `static`.

### 7.2. Mobile

- External page width 390 px, content body 327 px с полями 24 px.
- Article H1 36/40 px; длинный заголовок может занять 3 строки (пример: 120 px).
- Сначала article полностью, после его metadata — aside. Оглавление, которое видно на desktop, на mobile скрыто (`hidden lg:block`), затем идут search/recent posts.
- H2 32/40 px; между смысловыми блоками 48 px.
- У изображений нельзя фиксировать высоту: все должны расширяться до ширины колонки с сохранением ratio.

### 7.3. Требования к контенту Simple CRM

Для каждого материала нужны поля:

```text
slug, category, title, description, date, author?, cover,
body blocks (p/h2/h3/list/quote/image/video/table),
relatedPosts?, previous?, next?, tags?
```

Автоматически генерировать TOC только из `h2` (и при желании вложить h3), с id в kebab-case. Не выводить пустой related-block. Использовать один React/Astro/Vue компонент `ArticleLayout`, а не 20 HTML-страниц вручную.

## 8. Реестр всех проверенных публикаций

Ниже не нужно повторять оригинальные тексты. Таблица фиксирует архитектуру и смысловые шаги — этого достаточно, чтобы подготовить равнозначные материалы Simple CRM.

### 8.1. How-To — 11 страниц

| URL | Заголовок референса | Дата | Структура материала для повторения |
| --- | --- | --- | --- |
| `/how-to/getting-started-with-dextr/` | How to Get Started With Dextr | 20 Jan 2026 | Определение продукта → обзор → home screen → settings/support/map → assistant → quick actions → organization → card stack → places → closing. 9 изображений. |
| `/how-to/how-to-remove-duplicate-iphone-contacts/` | How to Merge Duplicate iPhone Contacts in a Snap | 28 May 2026 | Problem framing → почему появляются дубли → Step 1/2/3 с screenshot на каждом этапе → короткий итог/CTA. 9 image nodes. |
| `/how-to/mass-texting/` | How to Send an iPhone Text Blast with Dextr | 10 Mar 2026 | Что такое функция → video overview → пошаговая инструкция → установка shortcut → запуск. 3 изображения. |
| `/how-to/events-in-dextr/` | How to Use Events in Dextr | 3 Mar 2026 | Сценарий/выгода → создание → экран Add Event → текущие/прошлые/будущие события → support. |
| `/how-to/how-to-connect-relationships/` | How to Connect Relationships in Dextr CRM | 28 Feb 2026 | Тезис про контекст → зачем связи → как продукт решает → связи пользователя и контактов → network map → способы задания: profile/bulk select. |
| `/how-to/how-to-tag-a-contact-in-dextr/` | How to Tag a Contact in Dextr | 27 Feb 2026 | Вводная → 4 пронумерованные выгоды → tagging в профиле → bulk tag → message segment → final CTA. |
| `/how-to/how-to-contact-dextr-support/` | How to Contact Dextr Support | 20 Jan 2026 | Overview → availability → отдельные каналы: phone/email/Discord/Reddit/Instagram. |
| `/how-to/enabling-bidirectional-sync-with-ios-contacts/` | Enabling Bidirectional Sync with iOS Contacts | 20 Jan 2026 | Включение → import rules → export rules → таблица полей/признаков. Единственный проверенный пост с таблицей. |
| `/how-to/multiple-devices/` | How to Use Dextr With Multiple Devices | 20 Jan 2026 | Принцип sync → выбор primary device → setup primary → add other devices → switch primary. |
| `/how-to/disable-icloud/` | How to Use Dextr Without iCloud | 20 Jan 2026 | Один раздел с двумя нумерованными процедурами: отключение sync и удаление cloud backup. |
| `/how-to/delete-all-data/` | How to Permanently Delete All Dextr Data | 20 Jan 2026 | Короткое предупреждение о данных → один раздел с 4 нумерованными шагами. |

### 8.2. Learn — 3 страницы

| URL | Заголовок | Дата | Структура |
| --- | --- | --- | --- |
| `/learn/how-dextr-crm-helps-you-remember-people/` | How Dextr CRM Helps You Remember People | 26 Feb 2026 | Большой pillar article: проблема contacts app → onboarding/sync → relationships/tags → коммуникации/events/places → search/reminders → AI/bulk editing → privacy/support. 18 image nodes. |
| `/learn/from-iphone-contacts-to-a-personal-crm/` | From iPhone Contacts to a Personal CRM | 7 Feb 2026 | Проблема → сравнение contacts/CRM → что открывает обновление → реальные выгоды → everyday use → criteria выбора → product conclusion. |
| `/learn/what-is-a-crm/` | What is a CRM? Here's a Breakdown | 6 Feb 2026 | Простая дефиниция → плюсы/ограничения contacts → что добавляет CRM → когда обычных контактов недостаточно → как продукт объединяет оба подхода. |

### 8.3. Announcements — 4 страницы

| URL | Заголовок | Дата | Структура |
| --- | --- | --- | --- |
| `/announcements/unofficial-sxsw-2026-events/` | Find & RSVP to Unofficial SXSW 2026 Events | 9 Mar 2026 | Проблема событий → product solution → 3 feature-callout с emoji → target audience → availability. 10 image nodes. |
| `/announcements/find-free-sxsw-events-2026/` | How to Find Free SXSW Events in 2026 | 9 Mar 2026 | Что нового → почему важно → social use case → Out now. |
| `/announcements/complete-official-sxsw-2026-schedule/` | Complete Official SXSW 2026 Schedule on Dextr Unplug | 9 Mar 2026 | Unified view → audience ROI → filters → timeline → availability; много разделительных иллюстраций (13 image nodes). |
| `/announcements/dextr-pricing-update-february-2026/` | Dextr Pricing Update for February, 2026 | 23 Feb 2026 | Announcement → новые цены → прежние цены. |

### 8.4. Articles — 2 SEO-материала

| URL | Заголовок | Дата | Структура |
| --- | --- | --- | --- |
| `/articles/effective-contact-management/` | Effective Contact Management & Organization | 13 Apr 2026 | Почему важно → анатомия списка → 7 пошаговых этапов → professional/personal contexts → manual vs app → mistakes → product conclusion. |
| `/articles/how-to-clean-up-your-contacts-list/` | How to Clean Up Your Contacts List | 13 Apr 2026 | Почему чистить → backup → 6 этапов cleanup → product conclusion. |

## 9. Остальные самостоятельные страницы

### 9.1. `/about/`

**Роль:** миссия и доверие к команде.

Порядок:

1. H1: «изменяем способ управления отношениями».
2. Короткий lead про современные отношения и недостаточность стандартной книги контактов.
3. H2 `Our mission`: один целевой абзац о remembered context (when/where/how met).
4. H2 `Who we are`: длинная команда/биографический блок с портретами и подробными bio founders.
5. H2 `Company Announcements`: карточки последних новостей.
6. Общий newsletter/footer.

Для Simple CRM: не вставлять фейковые большие биографии. Лучше 1–3 честных блока: mission, founders/team, product principles, latest updates.

### 9.2. `/pricing/`

**Роль:** короткая conversion page, не таблица сравнения на 30 строк.

1. H1 `Get Started…`, lead про 14-day trial.
2. Две ценовые карточки/колонки:
   - Free: `$0`, list of available-now / later / stay connected value statements.
   - Pro: выделено `MOST POPULAR`, содержит social proof, annual price, CTA и список дополнительных возможностей.
3. H2 про security pledge с коротким текстом.
4. Newsletter/footer.

Для Simple CRM: минимум Free/Pro или Trial/Business; primary CTA в каждой карточке. Выделить один план как рекомендованный. Цены и обещания не копировать.

### 9.3. `/faq/`

**Роль:** ответить на 8–10 ключевых вопросов до обращения в support.

- H1 48–72 px, lead с описанием групп вопросов.
- FAQ построен как интерактивные раскрывающиеся пары question/answer. В проверенном контенте вопросы про privacy, onboarding, organization, iCloud, sync, data deletion, iOS identifiers и release notes.
- В первом/релевантном ответе есть текстовая `Learn more →` ссылка.
- Не перегружать дизайн карточками: вопрос должен быть лёгким строковым контролом, доступным с клавиатуры (`<details>/<summary>` или правильный accordion button).

### 9.4. `/privacy/`

**Роль:** длинный юридический документ в article layout.

- H1, дата `Last Updated`.
- Нумерованные H2: collected/not collected, use, sharing, consent и т. п.
- Desktop содержит `ON THIS PAGE`/anchor sidebar, как статья.
- Контент длинный, поэтому обязательно корректная иерархия заголовков, читаемая ширина строки и ссылки внутри текста.

### 9.5. `/releases/`

**Роль:** changelog.

- H1 `… Release Notes`.
- Крупный long-form article с версиями как H2 (`3.0`, `2.6.0`, …), датой, затем H3 `New Features`, `Improvements`, `Changes`, маркированными списками.
- Для desktop использовать article+sidebar layout; в sidebar anchor TOC. На mobile одна длинная колонка.
- В референсе очень длинная страница: при 375 px около 49 000 px. Для Simple CRM не выводить всё на одной странице, если история станет большой: допустимы годовые группы или lazy/collapsible entries, но latest releases должны оставаться первыми.

### 9.6. `/support/`

**Роль:** простой контактный экран.

- H1 `Get in touch`.
- Lead: вопросы/комментарии/feedback/support; отдельная ремарка про нерелевантные sales solicitations.
- Контактный email и ссылка на Discord.
- Desktop layout уже подготовлен как grid `1 → 2` на `lg`, но контента мало. Общая высота mobile ~1063 px: можно использовать вторую колонку под FAQ/illustration/form.

Для Simple CRM добавить только реальные контакты: email, help center, SLA, WhatsApp/Telegram/чат при наличии.

### 9.7. `/affiliates/`

**Роль:** самостоятельный sales landing внутри бренда.

Порядок:

1. Hero: H1, одно предложение о комиссии, CTA `Apply Now`.
2. Сетка из 3 KPI: commission / cookie duration / geography. Mobile — 1 колонка; `sm` — 3.
3. H2 `How it works`, lead и 3 карточки-шагa: Apply → Share → Earn.
4. H2 `Who it’s for`, список сегментов аудитории.
5. Финальный CTA-блок `Ready to get started?` + Apply.

На 390 px страница около 3016 px. В Simple CRM этот шаблон можно переиспользовать для referrals, партнеров, resellers или integrations.

### 9.8. `/search/?q=…`

**Роль:** динамическая выдача, использует те же article cards.

- H1 `Search Results for: {query}`.
- Search form с сохранённым query value.
- Ниже 1/2/3-column card grid; пример запроса `contacts` вернул 12 карточек.
- Должны быть состояния: blank query, no results, search error. В референсе видна только успешная выдача.

## 10. Интерактивность и состояния

| Элемент | Поведение в референсе | Что требуется воспроизвести |
| --- | --- | --- |
| Learn menu | desktop dropdown с тремя разделами | hover/focus/keyboard-safe dropdown; не делать навигацию недоступной на touch. |
| Mobile menu | кнопка открывает `<dialog>` | focus trap, ESC/close, семантика `aria`. |
| Announcement | отдельная кнопка dismiss | локально скрывается; для Simple CRM можно хранить в cookie/local state. |
| Article TOC | anchor links к H2 | плавный scroll опционально, корректные id обязательны. |
| Search | GET `/search?q=` | сохранять query в поле; подсветка не обязательна. |
| Newsletter | POST, email required, honeypot | validation, error/success states, GDPR/consent при необходимости. |
| Card links | кликабельны image/title/read-more | одно назначение ссылки; избегать вложенных `<a>`. |
| Анимации | fade/slide при появлении | учитывать `prefers-reduced-motion`; не скрывать content до JS. |

## 11. Медиаплан для нового лендинга Simple CRM

Чтобы получить тот же эффект, подготовьте не отдельные случайные картинки, а целостный набор:

1. Hero screenshot: вертикальное мобильное приложение или веб-интерфейс в device frame.
2. Шесть portrait screenshots ключевых функций — в едином масштабе/рамке.
3. Один value/security image для split section.
4. Один широкий desktop dashboard screenshot для большого showcase.
5. Три квадратные обложки статей.
6. Для каждой how-to статьи: hero cover + screenshot на каждый шаг. У сложных гайдовых материалов 3–9 изображений.
7. Портреты команды — только если есть реальные и разрешённые фото.

**Обязательные правила изображений:**

- Все product screenshots должны быть одного визуального языка: один theme, единый device mockup, предсказуемые тени.
- Не вшивать мелкий текст в картинки, который невозможно прочесть mobile-пользователю.
- У каждого изображения meaningful `alt`; декоративным дать пустой `alt`.
- Не копировать Dextr screen captures, App Store badge или брендовые обозначения.

## 12. Инструкция ИИ-агенту по реализации

### 12.1. Приоритеты

1. Сначала создать site shell: цвета, типографика, container, header, footer, desktop/mobile nav.
2. Затем реализовать карточку статьи и `ArticleLayout`, потому что они используются в 20+ местах.
3. Создать data collection для материалов и вывести `/learn`, `/how-to`, `/announcements`, `/search` из данных.
4. Сделать home из секций в порядке пункта 5 этого аудита.
5. Реализовать static pages и заполнить уникальными текстами.
6. Добавить states/forms/accessibility, анимации — последними.

### 12.2. Рекомендуемая компонентная схема

```text
Layout
├── Header
│   ├── DesktopNav
│   ├── LearnDropdown
│   ├── MobileMenuDialog
│   └── AnnouncementBar
├── Footer
├── HeroProduct
├── FeaturePhoneGrid
├── PrivacySplit
├── TestimonialMasonry
├── ProductShowcase
├── ArticleCard
├── ArticleGrid
├── SearchForm
├── NewsletterCTA
├── ContentHubPage
├── ArticleLayout
│   ├── ArticleBody
│   ├── ArticleMeta
│   ├── TableOfContents
│   └── ArticleSidebar
└── FAQAccordion / PricingCards / ReleaseNotes / ContactPage / AffiliateLanding
```

### 12.3. Definition of done

- [ ] Нет упоминаний, assets, текстов, логотипов и бренда Dextr.
- [ ] 390 px: ни один элемент не имеет horizontal overflow; все grids — 1 column.
- [ ] 768 px: article cards переключаются на 2 columns.
- [ ] 1024 px: header, hero, feature cards, article sidebar и product showcase переходят в desktop layout.
- [ ] 1280 px: контент не растягивается шире общего container; sidebar статьи около 320 px.
- [ ] Все CTA ведут на реальные Simple CRM routes/actions.
- [ ] Ссылки, dropdown, dialog, accordions и формы доступны keyboard-only.
- [ ] У форм есть loading/success/error states и не отправляются данные на непонятный endpoint.
- [ ] `prefers-reduced-motion` отключает entrance animation.
- [ ] Article TOC синхронизирован с реальными H2 и не содержит пустых ссылок.

## 13. Что сохранять, а что менять

**Сохранять как прототип:**

- Тёмную спокойную product-эстетику, крупный воздух, ограниченную палитру.
- Последовательность главной и баланс текст/интерфейс.
- Крупные радиусы, тонкие полупрозрачные обводки, вертикальные product screenshots.
- Content-first систему: хабы → карточки → глубокие гайды → sidebar.
- Простую навигацию и один главный CTA на каждом смысловом участке.

**Менять для Simple CRM:**

- Все тексты, цены, даты, имена, отзывы, юридические сведения.
- Информационную модель функций: Dextr ориентирован на личные контакты; Simple CRM должен говорить о лидах, клиентах, воронке, сегментации, задачах, коммуникациях и отчётности — если это действительно функции продукта.
- Скриншоты и иллюстрации.
- Набор пунктов меню: например, «Возможности», «Тарифы», «Интеграции», «Блог», «Помощь» могут быть релевантнее `Privacy/Releases` в верхней навигации.
- Store badge — заменить на CTA для вашего способа продаж.

## 14. Краткая карта URL для проектирования маршрутов Simple CRM

```text
/                         главная
/learn/                   образовательный хаб
/how-to/                  база инструкций
/announcements/           новости/релизы
/about/                   о компании
/pricing/                 тарифы
/faq/                     вопросы
/privacy/                 политика
/releases/                журнал изменений
/support/                 поддержка
/affiliates/              партнёрская программа
/search/?q=               поиск
/{category}/{slug}/       единый шаблон статьи
```

Для Simple CRM не обязательно создавать все 20 статей до запуска. Но нельзя оставлять пустые разделы: лучше начать с главной, pricing, about, support, 3–6 качественных статей и search, затем расширять коллекции из одного шаблона.
