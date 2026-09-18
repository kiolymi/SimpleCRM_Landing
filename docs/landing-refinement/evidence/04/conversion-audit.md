# Проверка пути посетителя

18.09.2026, неизменённый исходный код сайта ae375a7. Browser evidence: ../01/browser-baseline.md, localhost 4173, desktop 1440×900. Проверено нажатие App Store и Pro. «Начать» сверено с шаблоном pricing: обе cta.href=/support/; отдельный live click «Начать» не выполнялся.

src/main.js wireDownloadPlaceholder заменяет generic apps.apple.com link на кнопку и dialog. src/main.js wireDemoForms preventDefault и текст «Заявка не отправлена»; support содержит data-demo-form. Ни публичного URL конкретного приложения, ни регистрации, ни рабочего адресата из этих переходов не получено.

Спецификация проверена по четырём условиям: label=action; новый посетитель не направляется на техническое описание ошибки; unconfigured не может породить success; локальный test adapter не признаётся доказательством доставки. Все четыре выполнены в документе, внедрение и end-to-end остаются будущими проверками. Внешних отправок нет.
