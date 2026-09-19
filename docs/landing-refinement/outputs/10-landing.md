# Отчёт этапа 10

## Результат

Статус: passed.

Главная страница локально перестроена под структуру этапов 05–09: сохранён первый экран с видео, добавлены аудитория частной практики, три видимые истории, демонстрационные шаги на вымышленных данных, блок клиентского контекста, честный старт и короткий FAQ. Реальный доступ не имитируется: CTA ведёт к сценариям и блоку «Как начать», пока владелец не подтвердит канал установки или обращения.

## Основание

Входные материалы: `outputs/02-product-truth.md`, `outputs/04-conversion.md`, `outputs/05-structure.md`, `outputs/06-copy.md`, `outputs/07-flows.md`, `outputs/08-figma.md`, `outputs/09-visuals.md`.

Кодовая база: ветка `codex/landing-practice-refinement`, исходная точка main `ae375a73e4eec2349167d191a773a76811cda97e`. Этап продолжен после checkpoint `02a63b9`.

## Изменения

- `src/components/home-sections.js` — главная теперь состоит из hero, аудитории, трёх историй и overview; старые неиспользуемые блоки главной удалены из модуля.
- `src/components/practice-flows.js` — три истории и 10 шагов были добавлены первым срезом этапа.
- `src/components/practice-audience.js` — карточки аудиторий ведут к локальным историям и используют responsive picture.
- `src/components/practice-media.js` — helpers для UI screen picture, photo picture и fallback.
- `src/components/practice-overview.js` — клиентский контекст, блок старта, FAQ и финальный CTA.
- `src/components/site-shell.js` — на главной сокращён desktop nav, CTA шапки подключён к локальному `accessConfig`, исправлено закрытие mobile menu при переходе по anchor.
- `src/data/home.js` — сохранён только актуальный hero content.
- `src/data/access.js` — fail-closed конфигурация доступа: сценарии и старт, без доставки.
- `styles/practice-flows.css` и `styles/hero-video.css` — layout, адаптив, состояния, hover только внутренней рамки телефона и запрет reveal-сдвига hero visual.
- `index.html`, `src/main.js` — мета-описание и cache-buster версии.

## Проверки

| Критерий | Статус | Доказательство | Ограничение |
|---|---|---|---|
| Hero/video сохранены, фон не scale | PASS | `evidence/10/browser-audit.md`: hero/video размеры стабильны до/во время/после hover | Проверено локально |
| Hover только на переднем экране | PASS | frame scale до 1.0395, контейнер hero/video unchanged | Desktop pointer test |
| 3 истории видимы без вкладок | PASS | responsive audit: Stories=3 на 360/390/768/1024/1440 | Lazy images догружаются при прокрутке |
| 10 шагов интерактивны | PASS | `pressedCount=1`, картинки 780px, console errors `[]` | Без внешних действий |
| CTA честный | PASS | App Store links on home = 0; CTA → `#practice`/`#start` | Реальный канал доступа не подтверждён |
| Mobile menu | PASS | 390px: toggle 44×44, CTA закрывает dialog и ставит `#practice` | Плавный скролл проверен по hash/scroll |
| Fallback изображений | PASS | `evidence/10/media-fallback.html`, PNG fallback и text fallback | Локальный fixture |
| Сохранность оригиналов | PASS | main/gh-pages/Figma оригиналы не менялись | Публикации нет |

## Дефекты и исправления

- I003 закрыт: три главных сценария теперь видимы на desktop и mobile без скрывающих вкладок.
- I001/I002 остаются внешними зависимостями: честный локальный CTA внедрён, но реальный путь доступа/доставки владелец не подтвердил.
- I004 остаётся для этапа 11: вторичные страницы ещё содержат неподтверждённые коммерческие обещания.

## Сохранность оригиналов

Работа велась в `codex/landing-practice-refinement`. Исходный main `ae375a73e4eec2349167d191a773a76811cda97e`, gh-pages и оригинальные Figma-экраны не изменялись. Новая Figma-страница этапа 08 не трогалась на этом этапе. Публикации и push не выполнялись.

## Что дальше

Следующий этап: `stages/11-secondary-pages.md` — согласовать pricing, FAQ, support, materials, releases и навигацию с новой честной главной; убрать неподтверждённые 1490/14 дней/бесплатность или перевести их в статус уточнения.
