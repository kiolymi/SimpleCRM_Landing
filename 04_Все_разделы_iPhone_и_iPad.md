# Этап 4 из 5 — Остальные экраны iPhone и полная адаптация iPad

## Роль и цель

Продолжай в том же Figma-файле. Заверши весь функциональный охват универсальной CRM: сообщения, заметки/документы/файлы, платежи, задачи, уведомления, профиль, настройки, помощь и ошибки. Затем создай точные iPad-версии приложения, сохранив отличия навигации и преимущества большого экрана.

Результат должен быть детализированным и production-ready: разработчик может реализовать все состояния из Figma, а пользователь видит профессиональный интерфейс, функционально и визуально близкий к эталону. Каждый экран редактируемый, русифицированный, выверенный по Auto Layout и готовый к прототипированию.

## Канонические источники

1. Скриншоты внутри текущего Figma-файла — главный визуальный референс.
2. Текущий файл: [Simple CRM](https://www.figma.com/design/CHi07sT4Waf6uIkl14hYjN/Simple-CRM?node-id=25-13&t=9RAUidalNxHfdYwn-1); работай на том же canvas, не создавай новый файл.
3. [Using the mobile app for iPhone/iPad](https://support.simplepractice.com/hc/en-us/articles/37999214579213-Using-the-mobile-app-for-iPhone-iPad) — в особенности перечень доступных на iOS функций и отличие iPad sidebar.
4. Полный раздел [iPhone & iPad (iOS)](https://support.simplepractice.com/hc/en-us/sections/42152212994957-iPhone-iPad-iOS).
5. [Сообщения](https://support.simplepractice.com/hc/en-us/articles/41872221466381-Communicating-with-clients-on-iPhone-iPad), [клиенты](https://support.simplepractice.com/hc/en-us/articles/42049612459021-Adding-and-managing-clients-on-iPhone-iPad), [записи](https://support.simplepractice.com/hc/en-us/articles/42046348259469-Managing-appointments-and-events-on-iPhone-iPad), [troubleshooting](https://support.simplepractice.com/hc/en-us/articles/42053495091597-Troubleshooting-the-mobile-app-on-iPhone-iPad).
6. Карта покрытия, словарь локализации, foundations и component library, подготовленные на этапах 1–3.

## Непереговорные правила

- Сохраняй исходные reference screenshots и не меняй уже готовые экраны/компоненты без точечной причины и повторной проверки.
- Все новые экраны создавай экземплярами библиотеки; если нужен недостающий общий компонент, сперва добавь его в `03 — Components`, а потом используй.
- Не используй изображения интерфейса вместо настоящих слоёв. Тексты и UI должны быть редактируемыми.
- Русский текст должен оставаться видимым и удобочитаемым при реальной длине строк. Используй Auto Layout, HUG/FILL, переносы/ellipsis по паттерну эталона; не сжимай шрифты и не допускай пересечений.
- Сохраняй конкретные iOS-фичи: safe areas, keyboard, scroll, action sheet, system alert, bottom sheet, fixed actions, native-like focus/validation. Делай только то, что видно в референсах или следует из документированного потока.
- Не добавляй функции, доступные только в browser-version, в mobile-макеты: помечай их вне scope, если документация прямо ограничивает их.
- Все тестовые пользователи, сообщения, файлы, суммы и номера — вымышленные, русские и согласованные между потоками.
- После завершения обнови карту покрытия и остановись. Финальный QA, прототип, handoff и landing assets — только на этапе 5.

## 1. Сообщения — iPhone

В `04 — iPhone screens` создай группу `iPhone / 03 Messages`.

Собери все подтверждённые состояния:

- inbox/список диалогов: обычный, непрочитанные, пустой, loading, error/retry;
- поиск по сообщениям, если он показан;
- открытый диалог: входящие/исходящие сообщения, даты, time labels, длинные русские сообщения, статус, прокрутка;
- новое защищённое сообщение: composer, выбор клиента/контакта/сотрудника, поиск получателя, empty/no results;
- сообщение с вложением, если подтверждено;
- keyboard-open composer, disabled send, sending, sent, failed и retry;
- действия из Client Overview должны вести к корректно предзаполненному сценарию сообщения.

Обеспечь, чтобы поле ввода, send action и последний message не были закрыты клавиатурой или home indicator.

## 2. Заметки, документы и файлы — iPhone

Создай `iPhone / 04 Notes, documents & files`.

Воссоздай доступный в мобильном приложении функционал из источников:

- список заметок/документов с empty, loading, error и completed/signed состояниями;
- administrative note;
- progress note для индивидуальной записи;
- psychotherapy note, если присутствует в референсе/документации;
- Note Taker;
- просмотр previous progress notes;
- редактирование текста: keyboard open, scroll, autosave/saving/unsaved changes, error и confirm-on-exit по эталону;
- подписание progress note: ready, confirmation, signed, error;
- diagnosis/treatment plan read view, если это доступно в мобильной версии;
- appointment files: список, пусто, добавление, file picker/loading, status, ошибка;
- client files: загрузка, название, статус, отправка/share, удаление/confirm, error;
- ограничения просмотра полного файла отрази явно и честно, если они указаны в документации.

Не показывай на мобильных экранах создание функций, которые официально browser-only. Создание карточки, недоступной на мобильном, не является «полнотой».

## 3. Платежи — iPhone

Создай `iPhone / 05 Payments`.

Собери подтверждённые потоки:

- billing overview клиента, история платежей, empty/loading/error;
- добавление client payment: сумма, метод, review/confirm, success, declined/error;
- добавление billing type и card information;
- самостоятельная оплата и оплата компанией;
- добавление реквизитов компании и идентификатора плательщика;
- Tap to Pay: entry/setup, готовность, processing, successful payment, declined/cancelled/error — если визуал в референсах отсутствует, используй ясные iOS-паттерны и пометь связанный reference gap;
- destructive/refund/delete действия не добавляй как доступные, если документация говорит, что они browser-only.

Финансовые формы должны быть особенно аккуратны: читаемые форматы ₽/сумм и дат, маскирование карты, validation, disabled/enabled CTA, подтверждение необратимых действий.

## 4. Задачи, уведомления, профиль и настройки — iPhone

Создай группы `iPhone / 06 Tasks & notifications` и `iPhone / 07 Profile, settings & help`.

### Задачи и уведомления

- список задач: default, empty, loading, error;
- добавление, редактирование, completion/reopen, удаление и confirm;
- фильтры/сортировка, если показаны;
- список уведомлений: read/unread, действие, удаление, empty/loading/error;
- настройки времени push-уведомления о начале встречи;
- системный экран разрешения push — только если он является частью сценария.

### Профиль, настройки, помощь

- entry/profile menu;
- mobile-available settings и отдельные states;
- app/device version information;
- help/chatbot/help request, composer/send/loading/error/sent;
- troubleshooting/network error/retry;
- sign out entry → confirmation → signed-out state;
- не проектируй «full account settings», если источник отмечает их как browser-only.

## 5. iPad — полные адаптации

В `05 — iPad screens` создай читаемые группы с тем же порядком функций. iPad-версия использует ту же мобильную функциональность, но главное отличие — навигация слева, которую можно разворачивать и сворачивать; профиль расположен в нижней части sidebar. Это требование документации.

### Обязательные iPad shells

- `iPad / Shell / Expanded sidebar`;
- `iPad / Shell / Collapsed sidebar`;
- переход expanded ↔ collapsed через управляющие стрелки сверху слева;
- профиль снизу слева;
- selected/hover/pressed items там, где применимо;
- корректное распределение контента между sidebar и main pane;
- safe areas и landscape/portrait ровно в размерах, выявленных на этапе 1.

### Обязательное функциональное покрытие iPad

Сделай iPad-версии всех уникальных функций, в которых layout или удобство отличаются от iPhone:

- calendar (минимум основной вид, фильтры, создание/редактирование, detail);
- client list и Client Overview;
- messages list + conversation, если эталон показывает master-detail или иной двухпанельный layout;
- notes/documents/files;
- billing;
- tasks/notifications;
- profile/settings/help;
- loading/empty/error/confirmation там, где layout меняется.

Не растягивай iPhone-экран на ширину iPad. На большом пространстве сохрани эталонную иерархию: корректные max-width формы, читаемые строки, логичные панели, равномерные отступы и отсутствие «пустыни» в центре. Если документированный iPad UI совпадает с iPhone кроме sidebar, используй тот же контентный компонент в iPad shell.

## 6. Детализация и локализация

Для каждого готового iPhone/iPad потока проверь реальные стресс-кейсы:

- длинное русское имя клиента;
- два/три предложения в note/message;
- длинное название файла;
- длинная ошибка;
- сумма, дата, время, временная зона;
- много пунктов в action sheet;
- клавиатура;
- пустой/несохранённый/ошибочный сценарий.

Ни один текст не должен выйти за пределы, попасть под кнопку/иконку или исчезнуть за fixed UI. Пользовательские действия должны иметь ясную обратную связь.

## Контроль качества и завершение этапа

До отчёта сделай визуальный и структурный QA каждого раздела:

- screen vs reference side-by-side;
- Auto Layout и Instances корректны;
- точные стили и spacing едины;
- mobile-only/browser-only границы соблюдены;
- русификация консистентна со словарём;
- flows связаны логически и используют согласованные тестовые данные;
- coverage map содержит ссылку на каждый реализованный frame, `Done` или `Needs reference` статус и не скрывает пробелы.

Верни: созданные фреймы/ID по каждому разделу, перечень новых/дополненных компонентов, прогресс coverage map, список не подтверждённых референсом предположений и найденные визуальные расхождения. Затем **остановись**. Не делай финальный prototype, developer handoff, landing assets или финальный QA до этапа 5.
