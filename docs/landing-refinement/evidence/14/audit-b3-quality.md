# Audit B3 — визуальный и функциональный проход после исправления App Store CTA

Дата: 2026-09-21 (MSK)  
Итоговый code/assets fingerprint: `a963adb826ece4cb29223c647413ea909dad35f9738703f246c7956a8a9d2410`

## Browser QA

- На `/`, `/about/`, `/pricing/`, `/faq/`, `/learn/`, `/support/`, `/privacy/` при 390×844 и 1440×900: horizontal overflow = false, broken loaded images = 0.
- На каждой из 14 проверенных комбинаций присутствует ровно одна `button.header-app-store[data-download-placeholder]`; внешних `a[href*=apps.apple.com]` = 0.
- Семантика кнопки: `BUTTON`, `type=button`, `aria-haspopup=dialog`, `href=null`.
- Диалог открывается с фокусом на «Понятно»; закрытие кнопкой и Escape работает; фокус возвращается к App Store.
- Console warnings/errors после проверки = 0.
- 17/17 прямых локальных маршрутов вернули HTTP 200.

## Code QA и регрессия

- `node --check` PASS для `main.js`, `site-shell.js`, `content-pages.js`, `practice-flows.js`.
- `git diff --check` PASS.
- Hero/video, practice stories, Figma assets и motion-файлы не менялись; их прежние подтверждённые проверки остаются применимы.
- Exact runtime 200% zoom остаётся NOT_VERIFIED по `zoom-runtime-attempts.md`.

I007 исправлен и повторно проверен. Новых локальных P0/P1/P2 не обнаружено.

