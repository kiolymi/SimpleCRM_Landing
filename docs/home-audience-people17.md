# Главная: узнаваемая частная практика

## Что меняется

В этой итерации добавлен один блок после первого экрана: кому подходит Simple CRM. В нём прямо названы психологи, коучи, тренеры, репетиторы, наставники и консультанты. Три рабочие сцены — примеры, а не закрытый список профессий.

Дальше сохранён порядок: знакомые ситуации → экраны приложения → конфиденциальность → материалы. Разделы не удалены. В первом экране сохранены текст, компоновка, видео и плавная анимация телефона. Другие страницы в этой итерации не переписывались.

Главная мысль: **помнить человека — не значит помнить все даты, оплаты и обещания**. Поэтому речь не об абстрактном «управлении отношениями», а о конкретных моментах: где записан следующий шаг, на какую дату перенесли встречу, какой счёт ещё не оплачен, когда договорились связаться снова.

## Почему такая подача

Названия профессий дают человеку возможность быстро понять, относится ли приложение к его работе. Следом показываем общую задачу этих профессий — организацию повторяющихся личных встреч. Это наша гипотеза для этого лендинга, а не результат интервью с его посетителями.

В формулировках соединены знакомая ситуация и конкретное действие в продукте. Это применение рекомендаций NN/g: говорить понятными пользователю словами и объяснять пользу функций, не ограничиваясь их внутренними названиями. [User-centric vs. Maker-centric Language](https://www.nngroup.com/articles/user-centric-language/).

Люди на изображениях заняты понятной работой: слушают, обсуждают занятие, разбирают материал. Сцены помогают объяснять, для кого приложение, а не просто украшать страницу. Исследования NN/g различают информационно полезные изображения и декоративные фотографии, которые посетители нередко пропускают. [Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/).

AI-фотографии не выдаются за пользователей приложения: нет имён, цитат и вымышленных результатов. По просьбе пользователя в версии clean18 убрана подпись о происхождении сцен, а также четыре повторяющихся надзаголовка в блоках аудитории и рабочих ситуаций. Сведения о генерации сохранены в этом документе. Исследование NN/g допускает использование качественных AI-изображений вместо стоковых в изученном контексте, но не доказывает рост конверсии для нашей аудитории. [AI-Generated Images Can Perform as Well as Stock Photography](https://www.nngroup.com/articles/ai-generated-images/).

Никаких обещаний, что приложение само вернёт клиента, предотвратит неявку или взыщет оплату. Напоминание себе — задача, а не заявленная автоматическая рассылка. Работа с психологами не подменяется обещаниями хранения клинических записей или медицинской сертификации.

## Что проверить перед форумом

Узнавание и понятность можно проверить на представителях разных профессий: после короткого просмотра попросить своими словами объяснить, кому подходит приложение, какую ситуацию оно помогает решить и что делать дальше. Это проверка гипотезы, не «психологический трюк».

Ещё остаётся отдельное препятствие: кнопка App Store сообщает, что скачивание недоступно, а форма поддержки не отправляет сообщения. В этой итерации их поведение не менялось. До форума нужен настоящий следующий шаг — рабочая ссылка на приложение или согласованный канал связи. Демонстрация для этого не обязательна.

## Изображения и промпты

Использован встроенный генератор изображений, не CLI/API. Все персонажи вымышленные, взрослые. Формат 1536 × 1024, JPEG для сайта; композиция и размеры сохранены при экспорте.

Сохранённые изображения:

- [Психолог и клиент](../assets/editorial/practice-psychologist.jpg).
- [Тренер и клиентка](../assets/editorial/practice-trainer.jpg).
- [Наставница и взрослая ученица](../assets/editorial/practice-mentor.jpg).

Для каждого изображения использован общий промпт ниже и соответствующее продолжение.

### Общий промпт

```text
Use case: photorealistic-natural.
Asset type: standalone editorial photograph for a blue, navy (#0E253D), and white CRM landing page for diverse private practitioners.
Output: one landscape image, 1536x1024 pixels, 3:2 aspect ratio. No collage, no panels.
Style/medium: photorealistic natural editorial photography; an authentic quiet candid work moment. Natural skin texture, subtle pores and age details, realistic fabric, restrained everyday detail. Coordinated editorial series: soft neutral daylight, pale blue and deep navy accents, airy off-white surroundings, calm human warmth, eye-level medium-wide camera framing with natural perspective.
Composition/framing: both adults' faces and hands fully within the central 80% of the frame, useful at card size, comfortable margins, realistic human anatomy and relaxed posture, attention on one another or shared work, no one posing for or looking at the camera.
Constraints: all subjects are adults. No corporate stock-photo posing, no glamorized retouching, no glass sculptures, no artificial 3D look, no text, no logos, no watermarks, no readable writing or documents, no readable screens.
```

### Психолог

```text
Scene/backdrop: a light private consultation office with two blue upholstered chairs, understated comfortable furnishings, soft daylight.
Subject/action: a woman psychologist approximately 40 years old with shoulder-length dark brown hair listens attentively to an adult male client approximately 35, with short brown hair, seated opposite her. Both are fully dressed in understated ordinary clothes with subtle blue tones. They are having a respectful normal conversation, attentive and at ease, natural small hand gestures.
Avoid: couch stereotype, hospital or clinical treatment imagery, exaggerated distress, theatrical expressions.
```

### Тренер

```text
Scene/backdrop: a small airy personal training studio with a simple bench and a modest amount of fitness equipment softly visible in the background.
Subject/action: a male trainer approximately 35 years old with medium-brown skin and close-cropped dark hair, and an adult female client approximately 45 with light skin and tied-back auburn hair, review their next training session together beside the bench. They have ordinary healthy varied body types, wear fully dressed athletic clothing in navy and light blue, and have practical relaxed postures. Calm conversational exchange about planning the session; no exercise performance necessary.
Avoid: body transformation advertising, bodybuilder physiques, weight-loss before/after framing, body scrutiny, exaggerated energetic posing, exposed midriffs.
```

### Наставница

```text
Scene/backdrop: a bright personal office with a light table, an open notebook without legible writing, and subtle blue stationery.
Subject/action: a woman tutor, mentor, or independent consultant approximately 50 years old with a short silver-brown bob and light skin, and an adult woman client or student approximately 25 with warm brown skin and dark curly hair, sit side by side at the table studying a notebook and planning together. They are fully dressed in ordinary professional casual clothing with restrained navy and pale-blue accents. Focused friendly exchange, natural small hand gestures toward the notebook.
Avoid: formal classroom rows, schoolchild styling, corporate boardroom, unreadable generated letter-like clutter on the notebook.
```
