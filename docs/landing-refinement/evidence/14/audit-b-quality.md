# Audit B — визуальное и функциональное качество

Дата: 2026-09-21 (MSK)  
Commit: `6fccff449153e47127e237938084eb9565d02700`  
Code/assets fingerprint: `42a76de0bc10966ae4d49e92ad8ebe57db0d1e4d5cf8564bdb8649f1ca013c0c`

## Повторный проход

- 17 прямых локальных маршрутов вернули HTTP 200.
- Главная, about, pricing, FAQ, learn и support повторно открыты на узком browser surface: `scrollWidth == clientWidth`, broken loaded images = 0, console warnings/errors = 0.
- H1 всех ключевых страниц присутствует; единая шапка, ordinary Materials link и mobile menu сохранены.
- Hero/video geometry и 360/390/768/1024/1440 matrix подтверждены в evidence/12; после этого код/assets не менялись, fingerprint тот же.
- Автопродолжение историй, pause на hover/focus/hidden/reduced-motion, ручные шаги и min 44 px targets проверены в evidence/12.
- FAQ regression `оплата` → 3 ответа; accordion и сброс фильтра работают.
- Hero MP4 загружается, loop=true, error=null. Practice assets локальны и лениво загружаются.
- `node --check` для main/site-shell/content-pages/practice-flows/support/data проходит. `git diff --check` проходит.

## Ограничения

- Отдельные Safari/Firefox и фактический 200% zoom не управляются текущей средой и не объявлены проверенными.
- Публичный base-path новой ветки не тестировался: публикация запрещена. Локальные прямые маршруты проверены.
- Реальная внешняя отправка/платёж/запись отсутствуют и не имитируются.

После audit A значимых правок кода/assets не было, поэтому оба прохода относятся к одному fingerprint.

