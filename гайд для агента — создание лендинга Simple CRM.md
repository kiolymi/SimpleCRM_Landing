# Гайд для ИИ-агента: как спроектировать и создать лендинг Simple CRM

> Цель: собрать для **Simple CRM** светлый лендинг с такой же информационной архитектурой, плотностью контента, сетками и ритмом, как у референса Dextr, но без копирования его бренда, текстов, изображений, отзывов, цен или юридических данных.  
> Обязательный контекст: перед началом агент должен прочитать файл [прототип лендинга Simple CRM.md](./прототип%20лендинга%20Simple%20CRM.md).

---

## Как пользоваться этим гайдом

Работа состоит из **пяти этапов**. Их надо выполнять строго по порядку в одном и том же рабочем проекте. Не переходить к следующему этапу, пока не выполнены критерии готовности предыдущего.

В начале каждого этапа ниже есть блок **«Промпт агенту»**. Его можно отправить ИИ-агенту целиком. После этого агент обязан выполнить перечисленные шаги, сохранить результат в проекте, проверить его и коротко отчитаться.

### Неподвижные правила для всех пяти этапов

1. Основной canvas сайта — белый: `#FFFFFF`; допустимый чередующийся фон секций — `#F8FAFC`. Нельзя возвращать тёмный full-page фон референса.
2. Тёмными остаются только самостоятельные акцентные поверхности: footer, глубокие CTA-контейнеры, некоторые testimonial/article cards. На белом фоне весь текст должен быть тёмным и контрастным.
3. Нельзя копировать Dextr: имя, логотип, trademark, тексты, отзывы, фотографии, скриншоты, цены, email, ссылки, условия и App Store badge.
4. Дизайн нужно строить из компонентов и токенов, а не из дублированного markup на каждой странице.
5. До утверждения основного лендинга не использовать реальные продуктовые скриншоты вообще. Вместо них ставить единообразные серые mockup-плашки в device frame: телефон для portrait-экранов, iPad/desktop для широких интерфейсов. Нельзя подменять отсутствующие скриншоты чужими изображениями или случайными стоками.
6. Перед любым изменением агент сначала изучает существующий стек, структуру проекта, компоненты и дизайн-токены. Не переписывает чужую архитектуру, если можно расширить её локально.
7. Агент не должен публиковать сайт, отправлять формы, менять внешние сервисы или добавлять ключи без отдельного прямого разрешения.

8. Тексты должны быть живыми, человеческими и маркетинговыми, но без «ИИ-стиля»: без пустых суперлативов, канцелярита, повторов и неподтверждённых обещаний. Сначала назвать узнаваемую проблему пользователя, затем показать конкретную выгоду и понятный следующий шаг.

## Временные серые mockup-экраны и их будущая замена

Первый проход разработки делается в два шага:

```text
Шаг A. Сначала готовая структура, ритм, responsive layout и тексты
        с нейтральными серыми mockup-экранами.
Шаг B. После утверждения основного лендинга заказчик передаёт реальные
        скриншоты Simple CRM; агент заменяет только содержимое mockup-компонентов,
        не меняя grid, отступы, пропорции, заголовки и порядок секций.
```

Агент обязан сделать единый компонент, например `ProductDeviceMockup`:

```text
mode: "placeholder" | "image"
device: "phone" | "tablet" | "desktop"
label: строка на временном экране
image / alt: появляются только в режиме "image"
```

В режиме `placeholder` компонент показывает не просто серый прямоугольник, а аккуратный нейтральный device frame:

- `phone`: серый корпус с мягким radius, статус-бар, 2–4 приглушённые серые полосы/карточки; подпись «Экран Simple CRM» или название функции.
- `tablet`: широкий серый iPad frame с нейтральной сеткой блоков; без выдуманных чисел, аватаров или мелкого псевдо-UI.
- `desktop`: светло-серый dashboard/browser canvas с sidebar и несколькими skeleton-панелями.

Нельзя выдавать placeholder за готовую функцию и нельзя писать на нём «реальный скриншот». У каждого device frame сохраняется aspect ratio, чтобы после вставки скриншота не потребовалась перевёрстка. Для реального изображения агент заменяет только `mode`, `image` и `alt`.

## Как писать тексты: человеческий маркетинг вместо шаблонного ИИ-копирайта

| Делать | Не делать |
| --- | --- |
| Описывать конкретный рабочий момент: «После звонка клиент не теряется в заметках и чатах». | «Революционная платформа нового поколения». |
| Называть наблюдаемую пользу: «Вся история сделки — в одной карточке». | «Мощное решение для максимальной эффективности». |
| Писать короткими фразами, как продакт говорит с пользователем. | «Оптимизируйте синергию процессов». |
| Использовать только подтверждённые возможности Simple CRM. | Придумывать ИИ, интеграции, безопасность, проценты экономии или сроки. |
| Давать CTA с понятным действием: «Посмотреть, как устроена воронка». | «Начать трансформацию прямо сейчас». |

Формула каждого смыслового блока:

```text
Узнаваемая ситуация → что Simple CRM меняет → результат для человека → один CTA.
```

Стоп-слова, которые агент не использует без редкого оправданного контекста: «революционный», «мощный», «инновационный», «всё-в-одном», «нового поколения», «трансформация», «раскройте потенциал», «бесшовный».

---

# Этап 1 из 5. Разведка, продуктовая рамка и план реализации

## Результат этапа

У агента есть точная карта текущего проекта, зафиксированные допущения о Simple CRM, контентная модель, структура страниц и план файлов. На этом этапе **не нужно писать финальную вёрстку**.

## Промпт агенту

```text
Ты создаёшь лендинг Simple CRM. Сначала прочитай целиком файл
«прототип лендинга Simple CRM.md» в текущем workspace.

Выполни только Этап 1: разведка и проектирование. Не меняй визуальную
вёрстку и не создавай финальные страницы, пока не завершишь аудит.

1. Изучи репозиторий: стек, package manager, существующие маршруты,
   UI-компоненты, стили, assets, конфигурации, команды запуска и проверки.
2. Проверь, есть ли готовые design tokens, layout-компоненты, формы,
   image pipeline и router. Используй существующие решения, если они есть.
3. Составь краткий файл `docs/simple-crm-build-plan.md` со следующими разделами:
   - текущий стек и точки входа;
   - страницы и маршруты, которые будут созданы/обновлены;
   - дерево компонентов;
   - контентная модель для статей и карточек;
   - список нужных реальных изображений Simple CRM и карту временных серых device mockup-плашек;
   - черновой copy-outline: hero, шесть функций, trust section, showcase и финальный CTA;
   - допущения, которые ты сделал;
   - риски и вопросы, которые реально блокируют реализацию.
4. Зафиксируй визуальные правила: белый основной фон, тёмный текст на белом,
   локальные тёмные CTA/cards/footer, responsive 390/768/1024/1280.
5. Подготовь черновые тексты живым маркетинговым языком: без ИИ-штампов,
   пустых суперлативов и неподтверждённых обещаний. Для каждого тезиса укажи,
   на какой факт о Simple CRM он опирается, либо пометь `требует подтверждения`.
6. Проверь, что план не содержит Dextr-брендинг, чужие тексты, цены или assets.

В финальном сообщении назови прочитанные ключевые файлы, созданный план,
планируемые маршруты и только те вопросы, без ответов на которые нельзя
безопасно начать разработку. Если блокирующих вопросов нет — начинай Этап 2
только после отдельной команды пользователя.
```

## Подробный чек-лист действий

### 1.1. Изучить проект до любых изменений

Агент должен:

- Найти `package.json`, lockfile, `src/`, `app/`, `pages/`, `components/`, `public/`, файлы стилей и конфиг сборщика.
- Определить framework: например, Next.js, React/Vite, Astro, Nuxt, SvelteKit или статичный HTML/CSS.
- Найти действующий способ запуска и production build. Не придумывать команду — брать из scripts/readme.
- Проверить, есть ли `AGENTS.md`, `README.md`, token files, tailwind config, storybook, lint/test config.
- Сделать `git status` и не трогать не относящиеся к задаче пользовательские изменения.

### 1.2. Зафиксировать реальный scope

Минимальный маршрутный набор:

```text
/                         главная
/pricing                  тарифы
/about                    о продукте / команде
/faq                      FAQ
/support                  контакты и поддержка
/learn                    образовательные материалы
/how-to                   how-to материалы
/announcements            новости продукта
/search?q=                поиск по материалам
/{category}/{slug}        шаблон статьи
```

Если проекту пока нужен только landing MVP, агент всё равно строит компоненты так, чтобы индексные и article страницы можно было добавить без переделки. В таком случае можно временно не включать `/privacy`, `/releases`, `/affiliates` в menu, но нельзя закладывать код так, будто их никогда не будет.

### 1.3. Определить content model

Агент должен предусмотреть единую сущность `Article` или её аналог в выбранном стеке:

```ts
type Article = {
  slug: string
  category: 'learn' | 'how-to' | 'announcements'
  title: string
  excerpt: string
  publishedAt: string
  author?: string
  cover: ImageAsset
  content: Block[] | MDX
  tags?: string[]
  relatedSlugs?: string[]
  featured?: boolean
}
```

Обязательные поля карточки: `title`, `excerpt`, `cover`, `href`. Не копировать URL/названия материалов референса — использовать русские или английские Simple CRM темы, в зависимости от продукта.

### 1.4. Создать inventory нужных материалов

В плане перечислить не «картинки вообще», а точные placeholder-слоты:

| Slot | Формат | Где используется | Что должен показать |
| --- | --- | --- | --- |
| `hero-product` | серый phone/tablet mockup → затем screenshot | первый экран | основной сценарий Simple CRM |
| `feature-01…06` | 6 серых phone mockup → затем screenshot | feature grid | лиды, карточка клиента, pipeline, задачи, сегменты, аналитика |
| `trust/security` | серый tablet mockup → затем visual | privacy split | безопасность, доступы, контроль данных |
| `workspace-showcase` | широкий серый desktop/iPad mockup → затем screenshot | большой product showcase | CRM на широком экране |
| `article-cover-*` | нейтральная квадратная placeholder-обложка → затем image | карточки статей | визуальная тема материала |
| `team-*` | portrait, если есть | about | реальные люди, не AI-персонажи без подписи |

### 1.5. Сначала продумать copy-outline

В build plan для главной агент записывает таблицу сообщений, а не набор абстрактных рекламных фраз:

| Блок | Ситуация пользователя | Главный тезис | Доказательство/деталь | CTA |
| --- | --- | --- | --- | --- |
| Hero | менеджер ведёт клиентов в таблицах и чатах | Simple CRM собирает работу с клиентом в одном понятном месте | карточка, история касаний, задачи — только если это подтверждено | Посмотреть, как это работает |
| Feature grid | пользователь решает одну ежедневную задачу | каждая карточка отвечает на одну боль | понятный label серого mockup-экрана | Узнать больше |
| Trust | покупатель думает о данных | простой и честный контроль над доступами/данными | только подтверждённое правило продукта | Подробнее о безопасности |
| Final CTA | пользователь уже понял ценность | следующий шаг не требует лишнего риска | trial/demo/preview только если существует | Запросить демо / Начать |

Если продуктовая возможность не подтверждена, агент не придумывает copy, а оставляет явную пометку `требует подтверждения`.

### 1.6. Критерии окончания этапа

- [ ] Агент создал `docs/simple-crm-build-plan.md`.
- [ ] План содержит файл/маршрут/компонентную карту, а не общие слова.
- [ ] План фиксирует белый theme и правила контраста.
- [ ] План содержит copy-outline и карту серых device mockup-плашек.
- [ ] Все спорные product/content решения записаны как допущения.
- [ ] Ни один существующий код не сломан и не переписан.

---

# Этап 2 из 5. Фундамент дизайна, site shell и адаптивная навигация

## Результат этапа

Создан единый светлый дизайн-каркас: global styles, дизайн-токены, container, desktop/mobile header, footer, базовые кнопки/карточки, а также безопасная мобильная навигация. Страницы могут быть временно пустыми, но уже должны жить внутри готовой оболочки.

## Промпт агенту

```text
Продолжай проект Simple CRM. Выполни только Этап 2 из build guide:
создай дизайн-фундамент и общий shell, не переходя к финальному наполнению
главной страницы.

Опирайся на существующий стек и план из `docs/simple-crm-build-plan.md`.

Нужно:
1. Ввести или расширить design tokens без дублирования цветов и отступов.
2. Сделать основной canvas белым (#FFFFFF), альтернативный фон секций #F8FAFC,
   тёмный текст #111827, вторичный текст #4B5563, тонкие линии #E5E7EB.
3. Оставить тёмными только акцентные CTA/cases/cards/footer; обеспечить в них
   белый текст и доступный контраст.
4. Реализовать Layout, Header, desktop navigation, Learn/Resources dropdown,
   AnnouncementBar, доступный MobileMenuDialog и Footer.
5. Реализовать базовые Button, TextLink, SurfaceCard, Container и Section.
6. Добавить responsive поведения для 390, 768, 1024 и 1280 px.
7. Не использовать тексты/логотипы/CTA Dextr; применить человеческие Simple CRM
   черновики из copy-outline, без ИИ-штампов и непроверенных обещаний.
8. Реализовать единый `ProductDeviceMockup` для серых phone/tablet/desktop
   экранов. Реальные скриншоты на этом этапе не вставлять.
8. Запустить доступные lint/typecheck/build проверки и исправить ошибки.

Перед завершением проверь вручную или скриншотами: header/footer, desktop nav,
mobile dialog, отсутствие horizontal scroll и контраст. В финальном сообщении
перечисли созданные компоненты и результаты проверок. Не начинай Этап 3 без
следующей команды.
```

## Подробный чек-лист действий

### 2.1. Ввести минимальные tokens

Имена подстраиваются под текущий проект. Смысловой набор должен быть таким:

```text
--color-page: #FFFFFF
--color-page-subtle: #F8FAFC
--color-ink: #111827
--color-ink-muted: #4B5563
--color-line: #E5E7EB
--color-brand: [реальный акцент Simple CRM]
--color-panel-dark: #0F172D
--color-panel-dark-2: #1E293B
--radius-card: 16px
--radius-panel: 24px
--container-max: 1280px
--page-gutter-mobile: 24px
--page-gutter-desktop: 32px
```

Если существует ready-made token system, добавить семантические aliases, а не менять десятки старых raw hex значений.

### 2.2. Типографика

- Использовать существующий основной sans-serif; если в проекте нет утверждённого шрифта — Inter.
- H1 hero: 48 px/40 px mobile, 72 px/72 px desktop.
- H1 inner page: 36/40 px mobile, 48/48 px desktop.
- Section H2: 36–40 px mobile, 48 px desktop.
- H3/cards: 18/28 px или 24 px для feature title.
- Body large: 20/32 px; normal: 16/24 или 16/28 px для статьи.
- Не использовать больше трёх font weights в одном экране: regular 400, semibold 600, strong 700/800 только для feature headings.

### 2.3. Container и вертикальный ритм

- `Container`: max 1280 px, width 100 %, auto margins; horizontal padding 24 px mobile, 32 px desktop.
- Стандартный section spacing: 96 px mobile / 128 px desktop.
- Gap в обычной grid: 32 px; row gap feature grid: 64 px.
- Не задавать произвольные разные отступы без визуальной причины.

### 2.4. Header

Desktop:

- Logo слева; nav по центру; primary CTA справа.
- Высота около 88–96 px.
- Текст nav 14 px, semibold.
- Ресурсный dropdown — открытие по hover **и** по keyboard focus; закрытие по Escape и focus-out.
- Announcement bar может быть включаемым prop/feature flag, чтобы не занимать место без актуальной кампании.

Mobile:

- В header показывать logo + hamburger.
- Dialog обязан иметь видимую кнопку закрытия, Escape, trap focus и восстановление фокуса на trigger.
- Links должны быть реальными маршрутами; не использовать `href="#"`.
- Search внутри dialog можно реализовать после Этапа 4, но место/ссылка должны быть запланированы.

### 2.5. Footer

- Футер тёмный, чтобы подчеркнуть конец длинной белой страницы.
- Сначала внутренние links (на mobile grid 2 columns; от `sm` гибкий центрированный ряд), затем social links, затем legal line.
- Не вставлять непроверенные социальные ссылки. Если их нет — не выводить пустые icon buttons.

### 2.6. Проверки этапа

Обязательная матрица:

| Viewport | Проверить |
| --- | --- |
| 390×844 | header не переполняется, dialog читаем, footer 2-column links, нет горизонтального скролла |
| 768×1024 | spacing не выглядит как растянутый mobile, nav/CTA не конфликтуют |
| 1024×900 | раскрывается desktop nav, layout не прыгает |
| 1280×720 | container ограничивает ширину, белый canvas не выглядит пустым |

### 2.7. Критерии окончания этапа

- [ ] Все основные страницы можно обернуть в `Layout`.
- [ ] White background и text contrast определены токенами.
- [ ] Mobile menu доступно keyboard-only.
- [ ] Нельзя увидеть небрендовый/чужой текст из Dextr.
- [ ] Lint/typecheck/build проходят или в отчёте указана реальная внешняя причина.

---

# Этап 3 из 5. Главная Simple CRM: секции, контент и продуктовые экраны

## Результат этапа

Главная страница готова визуально и функционально. Она сохраняет композицию референса, но выглядит как светлый, собственный Simple CRM landing.

## Промпт агенту

```text
Продолжай Simple CRM. Выполни только Этап 3: собери готовую главную `/`.

Используй Layout и tokens из Этапа 2, а также раздел 5 аудита прототипа.
Не копируй ни один текст/скриншот/отзыв Dextr.

Создай главную строго в следующем порядке:
1. Light hero: announcement badge, собственный H1/lead/one primary CTA,
   серый phone/tablet device mockup; белый фон, тёмный текст, опциональный очень лёгкий
   background pattern/particles.
2. Six-feature product grid: 6 серых phone device mockups + icon + title + short description.
3. Trust/security split section на белом или very-light фоне, без dark full-page
   background; используй настоящий Simple CRM security message.
4. Testimonial masonry: 6–10 настоящих либо явно marked demo testimonials.
5. Large dark product showcase panel с широким серым desktop/iPad mockup.
6. Recent articles grid из данных коллекции.
7. Final dark newsletter/demo CTA panel с email/form только если endpoint уже
   разрешён; иначе визуальная CTA без реальной отправки.

Требования:
- на 390 px все блоки в одну колонку, поля 24 px;
- на 1024+ hero, feature grid и showcase переключаются в desktop layout;
- white page background сохраняется; текст на white всегда dark;
- dark panels/cards/footer остаются локальными акцентами;
- `prefers-reduced-motion` не оставляет элементы скрытыми;
- не использовать fixed heights для текстовых блоков или article cards.
- писать текст о конкретных рабочих ситуациях и результатах; не использовать
  «революционный», «мощный», «всё-в-одном», «нового поколения», «трансформация»
  и аналогичные пустые формулы.

После реализации выполни build и проверь `/` на 390, 768, 1024, 1280 px.
В финальном сообщении укажи файлы, компоненты, placeholders, которые ждут
настоящих изображений/копирайта, и результаты проверок. Не начинай Этап 4.
```

## Подробный чек-лист действий

### 3.1. Сначала подготовить данные, потом markup

Создать локальный data layer или props для:

```text
features[6]     icon, title, description, mockupDevice, mockupLabel, image?, alt?
testimonials[]  quote, name, role/company?, source?
recentPosts[3]  title, excerpt, cover, href
hero            eyebrow, title, lead, CTA, mockupDevice, mockupLabel, product image?
security        label, title, copy, link, mockupDevice, visual?
showcase        title, copy, bullets[3], mockupDevice, dashboard image?
```

На первом проходе `image` может отсутствовать: layout показывает `ProductDeviceMockup`.
После утверждения лендинга замена на настоящий screenshot происходит в данных/props,
а не через переписывание layout.

Перед JSX агент должен завести copy object: `heroTitle`, `heroLead`, `heroCta`,
6 пар `featureTitle/featureDescription`, `trustTitle/trustCopy`,
`showcaseTitle/showcaseCopy/showcaseBullets`, `finalCtaTitle/finalCtaCopy`.
Каждая фраза должна отвечать на вопрос: «Что пользователь сможет сделать или
перестанет терять?» Если не отвечает — удалить или заменить конкретикой.

### 3.2. Hero

**Desktop 1024+:**

- `Container` с верхним/нижним padding около 160 px.
- Flex row: text column примерно 55–60 %, product visual 40–45 %.
- Text column не шире ~672 px.
- Eyebrow/release badge — маленькая интерактивная ссылка или plain label; не создавать декоративную ссылку без адреса.
- Только одна primary CTA. Если нужна secondary CTA, она должна быть текстовой и менее заметной.
- Phone/tablet mockup не должен быть обрезан справа. Если нужен выход за край — только на desktop и с запасом от scrollbar.

**Mobile:**

- Все элементы center/stack.
- H1 не больше 48 px.
- CTA не уже 44 px по высоте; product screenshot после текста.
- Не выводить particle canvas, если он ухудшает производительность или контраст.

### 3.3. Six-feature grid

Сделать не набор одинаковых «иконка+текст», а шесть UI-story cards:

| № | Предлагаемая функция Simple CRM | Что показать на первом сером mockup |
| ---: | --- | --- |
| 1 | Единая карточка клиента | label «Карточка клиента» и нейтральные skeleton-блоки |
| 2 | Воронка сделок | label «Воронка» и три серые стадии |
| 3 | Задачи и напоминания | label «Следующие шаги» и список линий |
| 4 | Сегменты и теги | label «Сегменты» и 3–4 серых tag-pills |
| 5 | История коммуникаций | label «История клиента» и нейтральная timeline |
| 6 | Аналитика | label «Отчёты» и простые серые chart skeletons |

Требования:

- Grid 1 column до `lg`, 3 columns от `lg`.
- `gap-x: 32px`, `gap-y: 64px`.
- Mockup сохраняет пропорции; feature title центрирован, 24 px, strong.
- Для белого фона screenshot может иметь тонкую серую рамку/мягкую тень, но не тяжёлый drop shadow.

### 3.4. Trust/security split

Секция остаётся светлой. Нужно создать визуальное отделение от соседних секций:

- `#F8FAFC` либо white + верхний border.
- Desktop 2 columns, mobile stack.
- Слева нейтральный tablet mockup: permission settings, locked data или audit-log skeleton без реальных данных.
- Справа label, H2, one clear security promise, supporting paragraph, text link.
- Не заявлять «соответствие GDPR/ISO/SOC 2», если этого нет в предоставленных данных.

### 3.5. Testimonial masonry

- Делать masonry через CSS grid columns или контролируемую раскладку, не через абсолютное позиционирование.
- Один featured quote можно увеличить на desktop.
- Карточки dark `#0F172D`/slate; на white background они создают контрастный остров.
- Quote 14/24 px; author/source ниже.
- На mobile cards идут одной колонкой. Не пытаться сохранить 4-col mosaic на маленьком экране.

### 3.6. Большой showcase panel

- Local dark panel, radius 24 px, white inner border 10–15 % opacity.
- Desktop: text left, large wide desktop/iPad mockup right; он имеет право выходить вправо, но не разрушать grid.
- Benefits отделены тонкой top border и представлены тремя короткими строками.
- Mobile: текст → benefits → image в одной колонке.

### 3.7. Article cards и финальная CTA

- Сначала создать универсальный `ArticleCard` — он потребуется Этапу 4.
- Recent section использует 3 элемента из content collection, не статичный duplicate JSX.
- Final panel: dark, center-aligned, H2 + copy + form/CTA. Если нет подтверждённого backend endpoint — button должен открывать маршрут/диалог, а не молча отправлять данные.

### 3.8. Критерии окончания этапа

- [ ] Все семь секций находятся на `/` в указанном порядке.
- [ ] Основной фон везде белый или very-light, без тёмной full-page секции.
- [ ] Dark применяется только к акцентным panels/cards/footer.
- [ ] Hero и feature grid выглядят правильно на 390/1024/1280 px.
- [ ] Все картинки имеют `alt`; decorative assets — пустой `alt`.
- [ ] Нет layout shift из-за неописанных image dimensions.
- [ ] На странице нет текстов/скриншотов Dextr.

---

# Этап 4 из 5. Контентные маршруты, статьи, тарифы, FAQ и поиск

## Результат этапа

Создана масштабируемая система внутренних страниц, которая позволяет добавлять материалы Simple CRM без копирования шаблонов. Главное правило — content не вшит в layout-компоненты.

## Промпт агенту

```text
Продолжай Simple CRM. Выполни только Этап 4: создай внутренние страницы,
content collections и общий article template.

Сначала реализуй data-driven ArticleCard и ArticleLayout, затем:
- `/learn`, `/how-to`, `/announcements` как один шаблон ContentHub;
- `/{category}/{slug}` как единый article template;
- `/search?q=` с successful, empty и blank-query states;
- `/pricing`, `/faq`, `/about`, `/support`.

Опциональные `/privacy`, `/releases`, `/affiliates` сделай только если они
уже входят в подтверждённый scope из Этапа 1; архитектуру для них не ломай.

Точные требования:
1. Основной фон всех этих страниц белый; heading/text на белом — тёмные.
2. Article desktop: article около 768px + sidebar около 320px + gap 48px.
   До `lg`: один столбец, sidebar после статьи.
3. TOC строится из реальных H2, ids стабильны, mobile TOC можно скрыть.
4. H1 статьи: 36/40 mobile, 48/48 desktop. Body: 16/28.
5. Content hubs: search, две cross-promo зоны, section title, article grid 1/2/3.
6. FAQ доступен с клавиатуры. Forms не отправляют пользовательские данные
   на непроверенный endpoint.
7. Используй собственные Simple CRM тексты/neutral placeholders, не Dextr.

После работы проверь все маршруты, ссылки, 404/empty states, 390/1280 layouts,
lint/typecheck/build. В финальном сообщении перечисли каждый готовый маршрут,
источник контента и незаполненные placeholders. Не начинай Этап 5.
```

## Подробный чек-лист действий

### 4.1. ArticleCard и ContentHub

`ArticleCard` нужен на home, category pages, sidebar и search. Он должен принимать данные, а не знать категорию сам.

Структура:

```text
article.card
├── link.image-wrap (aspect-ratio 1/1)
│   └── image
└── content (padding 24px)
    ├── title link
    ├── excerpt
    └── text link «Читать →»
```

Не делать в карточке ссылку вокруг всего article и вложенные link вокруг title/image: выбрать доступный паттерн, например один `stretched-link` или отдельные, но не вложенные anchors.

`ContentHub` должен получать:

```text
title, category, posts, crossPromos[2], searchAction
```

Порядок страницы: page heading → search → two cross-promos → «Материалы» heading → cards.

### 4.2. ArticleLayout

Desktop:

```text
Container (white canvas; vertical padding 128px)
└── flex / grid content area
    ├── article (≈768px)
    │   ├── H1
    │   ├── date + author
    │   ├── rich content
    │   ├── prev/next
    │   └── category/tags
    └── aside (≈320px)
        ├── TOC
        ├── search
        ├── related posts if any
        └── recent posts
```

Mobile:

```text
article (327px content width at 390px viewport)
then sidebar
```

Ключевые CSS-правила article content:

- `h2`: 32/40, `margin-top: 48px`, `margin-bottom: 16px`.
- `p`, `li`: 16/28, max readable line length; не растягивать full viewport.
- `img`: `width: 100%`, `height: auto`, known aspect ratio.
- `table`: horizontal overflow wrapper на mobile, header row, доступная подпись при необходимости.
- `blockquote`: отдельная тонкая line/светлая surface, не copy dark Dextr background на всю страницу.

### 4.3. Search

Нужны три состояния:

1. Query есть и results есть — `Результаты поиска: «…»` + cards.
2. Query есть, results нет — короткое корректное zero-result message + ссылки на категории.
3. Query отсутствует — input в фокусируемой форме, без фальшивого результата.

Search должен использовать URL query param и экранировать query в заголовке, чтобы не получить XSS. У пустого index файла без backend допустим client-side search по локальной content collection.

### 4.4. `/pricing`

- H1 + краткий lead.
- 2 или 3 pricing card, не более.
- Один featured plan с label «Популярный».
- Прозрачные price period и feature list.
- Две локальные тёмные surfaces допустимы на white canvas, но не превращать страницу в тёмную.
- Отдельный security/trust paragraph после pricing.
- Нельзя придумывать цену, SLA, refund или claim о security. Если цена неизвестна — обозначить `Свяжитесь с нами` или окружить placeholder заметкой для контент-редактора.

### 4.5. `/faq`

- 8–12 приоритетных вопросов Simple CRM, сгруппированных по темам: начало работы, данные, импорт, команда/права, тарифы, support.
- Семантичные `<details>`/`<summary>` или button accordion с ARIA.
- При открытии не должно происходить layout jump с потерей scroll position.
- Ответы не должны содержать юридических или security обещаний, не подтверждённых владельцем продукта.

### 4.6. `/about` и `/support`

`About`:

```text
H1 + mission lead → «Зачем Simple CRM» → team/founders if real → latest updates
```

`Support`:

```text
H1 + friendly lead → real support channels → operating hours/SLA only if confirmed → FAQ link
```

Не использовать выдуманные телефоны, email или соцсети.

### 4.7. Optional service pages

- `Privacy`: только из одобренного юридического текста. Если текста нет — не писать policy от лица компании без согласования.
- `Releases`: data-driven version/date/sections list, newest first; сохранить article/TOC readability.
- `Affiliates`: hero → 3 KPI → 3 steps → audience → final CTA; только если партнёрская программа действительно существует.

### 4.8. Критерии окончания этапа

- [ ] Есть один переиспользуемый article template, а не отдельная вёрстка для каждой статьи.
- [ ] `/learn`, `/how-to`, `/announcements` используют общий hub component.
- [ ] `/search` имеет success, empty и blank states.
- [ ] Все internal links ведут на существующие route или осознанно скрыты.
- [ ] 390 px: article/sidebar/таблицы не создают horizontal scroll.
- [ ] 1280 px: article+sidebar держит соотношение примерно 768/320/48.
- [ ] FAQ keyboard accessible; формы безопасны.

---

# Этап 5 из 5. Визуальная QA, accessibility, производительность и сдача

## Результат этапа

Сайт проверен как продукт: маршруты не сломаны, композиция совпадает с утверждённым прототипом, белая версия остаётся цельной, интерфейс доступен и готов к передаче пользователю. Этот этап не добавляет новые крупные функции — он исправляет отклонения.

## Промпт агенту

```text
Заверши проект Simple CRM, выполнив только Этап 5: QA и полировку.
Не меняй утверждённую информационную архитектуру и не добавляй новые страницы,
если они не нужны для исправления ошибки.

1. Запусти все доступные lint, typecheck, unit/integration tests и production build.
2. Проверь `/`, `/pricing`, `/about`, `/faq`, `/support`, все content hubs,
   article route и `/search` на 390, 768, 1024, 1280 px.
3. Сверь реализацию с `прототип лендинга Simple CRM.md`:
   порядок блоков, ширины, vertical rhythm, 1/2/3 grid breakpoints,
   article+sidebar, cards, CTA and footer.
4. Проверь, что основной фон белый и что на white sections нет белого текста,
   а на dark cards/panels/footer нет тёмного текста с плохим контрастом.
5. Пройди keyboard-only: header dropdown, mobile dialog, all links, FAQ,
   search, newsletter/demo CTA. Проверь Escape и visible focus.
6. Проверь device mockups и images: стабильный aspect ratio, alt text для
   реальных изображений, отсутствие layout shift и повреждённых URLs. Серые
   mockup-компоненты пока не удаляй: они будут заменены screenshot-ами после
   утверждения основного лендинга.
7. Уважай prefers-reduced-motion; проверь empty, error и no-result states.
8. Не удаляй временные серые mockup-компоненты: зафиксируй в отчёте карту
   их будущей замены реальными screenshot-ами. Не удаляй пользовательские
   файлы и не применяй destructive git команды.
9. Создай `docs/simple-crm-qa-report.md`: команды и результаты, маршруты,
   viewport matrix, известные ограничения, список контента/изображений,
   которые ещё нужно заменить.

В финальном сообщении дай короткую сводку: что готово, результаты проверок,
ссылки на ключевые файлы и только реальные remaining issues.
```

## Подробный чек-лист действий

### 5.1. Functional QA

Проверить по маршрутам:

| Маршрут | Обязательная проверка |
| --- | --- |
| `/` | 7 секций в правильном порядке, все CTA имеют назначение, recent posts видны |
| `/pricing` | featured plan, CTA, text не выходит за card |
| `/about` | нет placeholder people/неподтверждённых историй |
| `/faq` | accordion раскрывается/закрывается keyboard-only |
| `/support` | только реальные support contacts |
| Hubs | правильная категория, card grid, cross-promo, search field |
| Article | H2 TOC links, content images, prev/next, sidebar mobile order |
| `/search` | query, results, no results, no query |

### 5.2. Visual QA matrix

**390 px**

- Body не шире viewport.
- Page gutter 24 px.
- Header: logo + hamburger без overlap.
- Hero device mockup не обрезается; feature/article cards 1 column.
- Article content таблицы/код/длинные слова не создают overflow.
- Mobile dialog можно закрыть и Esc, и button.

**768 px**

- Article cards переходят в 2 колонки.
- Не появляется внезапная 3-column сетка.
- CTA form корректно выстраивается horizontal/vertical в зависимости от available width.

**1024 px**

- Desktop nav появляется без наложения на CTA.
- Hero становится two-column.
- Feature grid — 3 columns.
- Article layout — main+sidebar.

**1280 px**

- Container не больше ~1280 px.
- Hero text не шире ~672 px.
- Article/text line length не становится слишком длинной.
- Большая showcase image может выходить визуально вправо, но не вызывает page overflow.

### 5.3. Accessibility QA

- У каждого interactive элемента есть различимое focus state.
- `button` используется для действий, `a` — для переходов.
- У icon-only button есть aria-label.
- Dropdown и dialog поддерживают Escape.
- Headings не перескакивают: на странице один H1, далее H2/H3 логично.
- Изображения с данными получают содержательный alt; декоративные — `alt=""`.
- Не кодировать цвет как единственный носитель смысла (например, этапы сделки должны иметь текстовые labels).
- Контраст минимум AA: normal text ориентир 4.5:1, large text 3:1.

### 5.4. Performance QA

- Width/height или aspect ratio заданы всем реальным изображениям и всем device mockups.
- До замены mockup-компоненты не тянут тяжёлые raster assets. После замены реальный hero screenshot имеет приоритетную загрузку; ниже первого экрана — lazy loading.
- Не подключать тяжёлые animation/canvas библиотеки ради одного декоративного эффекта. Если particles есть, они не должны блокировать rendering и должны отключаться при reduced motion.
- Не тащить отдельный image asset на каждую breakpoint-версию, если responsive image component умеет `srcset`.
- Не включать external trackers без явного согласования.

### 5.5. Финальный QA report

`docs/simple-crm-qa-report.md` должен содержать:

```text
Дата проверки
Команды: lint / typecheck / test / build
Статус и текст реальных ошибок, если есть
Проверенные маршруты
Проверенные viewport
Accessibility checklist
Список временных серых device mockups и copy, которые должен заменить заказчик после утверждения основного лендинга
Известные ограничения и следующий безопасный шаг
```

### 5.6. Критерии полной готовности

- [ ] Production build проходит.
- [ ] Все целевые маршруты открываются без runtime error.
- [ ] Сайт действительно светлый: белый page canvas, тёмный текст на white sections.
- [ ] Тёмные цвета локальны и работают как акценты, а не как случайно оставшийся старый theme.
- [ ] Нет внешних ссылок, фейковых данных, Dextr assets/texts или опасных form endpoints.
- [ ] Для каждого mockup-слота есть понятная карта будущей замены реальным screenshot-ом без изменения layout.
- [ ] Все требования responsive/accessibility пройдены.
- [ ] Создан QA report, а не только устное утверждение о готовности.

---

## Финальная команда для агента после всех этапов

```text
Проверь проект Simple CRM против build guide и audit ещё раз. Не добавляй
новый функционал. Подтверди, что: (1) основной фон белый, (2) структура
главной соответствует 7-section prototype, (3) внутренние страницы
data-driven, (4) mobile/desktop layouts проверены, (5) нет чужих Dextr
материалов, (6) QA report создан. Затем дай краткий handoff с абсолютными
ссылками на build plan, QA report и ключевые entry files.
```
