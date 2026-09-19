# Этап 10 — browser audit

Дата: 2026-09-19, локальный preview `http://127.0.0.1:4173/`, ветка `codex/landing-practice-refinement`.
Проверялась текущая рабочая версия после второго среза этапа 10, без публикации и без внешних отправок.

## Hero и видео

Desktop-проверка через in-app browser/Playwright:

- До hover: `.home-hero` 1264.67×872.27, video 1264.67×872.27, контейнер телефона 336×716.27, frame 336×716.27.
- Во время hover: `.home-hero` и video остались 1264.67×872.27 с `transform:none`; контейнер телефона остался 336×716.27; изменилась только внутренняя `.device-mockup__frame` до 357.26×748.28 с `--screen-scale: 1.0395` и лёгким roll.
- После ухода курсора: через 3.6 секунды frame вернулся к 336×716.27, `--screen-scale: 1`, `--screen-roll: 0deg`; hero/video не менялись.
- На главной найдено 0 ссылок `https://apps.apple.com/`.

Итог: фон и видео не масштабируются; мягкое увеличение/покачивание применяется только к переднему экрану.

## Responsive

Контрольные ширины через viewport capability:

| Width | Client width | Stories | Scroll width | Hero/video | Step min-height | Images after scroll |
|---|---:|---:|---:|---|---:|---|
| 360 | 345 | 3 | 345 | 344.67×1456.34 / 344.67×1456.34 | 44 | PASS |
| 390 | 375 | 3 | 375 | 374.67×1429.95 / 374.67×1429.95 | 44 | PASS |
| 768 | 753 | 3 | 753 | 752.67×1494.63 / 752.67×1494.63 | 44 | PASS |
| 1024 | 1009 | 3 | 1009 | 1008.67×833.35 / 1008.67×833.35 | 44 | PASS |
| 1440 | 1425 | 3 | 1425 | 1424.67×880.27 / 1424.67×880.27 | 44 | PASS |

На 360px после cache-buster и фикса `hero-video.css`: `.home-hero__visual` `opacity:1`, `transform:none`, frame left/right 29.33/315.33, clipped=false.
Lazy images initially may be incomplete above the fold; after прокрутки к историям все practice images loaded, `naturalWidth: 780`, missing images: `[]`.

## Сценарии и состояния

Проверены 10 кнопок шагов в трёх историях. После каждого клика:

- `pressedCount` равен 1.
- Заголовок детали меняется.
- Картинка complete=true, `naturalWidth: 780`.
- Источники: `r02-client`, `r01-today`, `r03-message`, `p02-invoice`, `p04-client-prepayment`, `p05b-prepayment-received`, `b01-availability`, `b02-client-time`, `b03-client-review`, `b04-client-confirmed`.

В текстах шагов сохранены ограничения: проектный сценарий, вымышленные данные, нет реальной отправки, оплаты или записи.

## Дополнительные интерактивы

- `.practice-history` раскрывается, `open=true`.
- 4 FAQ items раскрываются и закрываются, текст появляется без ошибок.
- Browser console errors: `[]`.
- Mobile 390: menu toggle 44×44, desktop nav hidden. CTA mobile menu открывает `#practice`, dialog закрывается, `scrollWidth === clientWidth`.

## Fallback

Локальная страница `evidence/10/media-fallback.html` проверяет:

- missing WebP при существующем PNG fallback: загружается PNG, `naturalWidth: 780`;
- missing WebP и PNG: выводится текстовая fallback-замена, без битого изображения.

## Ограничения

Это frontend-аудит локальной версии. Реальный App Store, заявка, регистрация, платежи, уведомления и самозапись не подтверждены и остаются зависимостями Q002/Q004/Q005/Q006/Q007.
