# Audit B2 — повторный визуальный и функциональный аудит

Дата: 2026-09-21 (MSK)  
Итоговый code/assets fingerprint: `7a9a8437720e6d1f8165bf16e8722283b71b0e67bb491c21f04b4976df8fd652`

## Повторные проверки после правок

- 17/17 прямых локальных маршрутов — HTTP 200.
- На 390×844 повторно открыты `/`, `/about/`, `/pricing/`, `/faq/`, `/learn/`, `/support/`, `/privacy/`: у всех `scrollWidth == clientWidth`, broken loaded images = 0, console error/warning = 0.
- Те же 7 страниц повторно проверены на 1440×900: без horizontal overflow, по 7 desktop navigation links, broken loaded images = 0, console error/warning = 0.
- Privacy визуально просмотрена на desktop и mobile. На mobile TOC закрыт, H1 и предупреждение читаются, после reveal opacity=1.
- FAQ раскрывает обновлённый ответ о приватности и ссылку «Что проверить о данных».
- Learn H1 в accessibility text: `Меньше искать. Проще работать.`; терминология «Инструкции и обновления» согласована.
- `node --check` PASS для main/content-pages/materials-catalog/practice-flows; `git diff --check` и package validator PASS.
- Изменения не затрагивали hero/video CSS, phone motion или practice assets; сохранены подтверждённые измерения HERO из evidence/12.

Exact runtime 200% zoom всё ещё NOT_VERIFIED: Ctrl+plus и deviceScaleFactor не меняют dpr/layout во встроенной browser surface. Ограничение не заменено симуляцией.

