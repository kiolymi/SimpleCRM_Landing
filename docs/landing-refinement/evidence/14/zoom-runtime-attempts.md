# Runtime zoom — проверка и закрытие

Дата: 2026-09-21 (MSK)  
Проверенная версия приложения: commit `3b091d4`, code/assets fingerprint `7a9a8437720e6d1f8165bf16e8722283b71b0e67bb491c21f04b4976df8fd652`  
URL: `http://127.0.0.1:4173/?review=stage14-2`

## Что проверено

Во встроенном браузере перед попыткой масштабирования получены фактические runtime-метрики:

- `devicePixelRatio = 1.5`;
- `innerWidth = 1049`;
- `documentElement.clientWidth = 1034`;
- `documentElement.scrollWidth = 1034`;
- `visualViewport.scale = 1`.

Последовательно отправлены три поддерживаемых варианта browser shortcut: `ctrl+plus`, `ctrl+equal`, `ctrl+KP_Add`. После каждого варианта все метрики остались неизменными. Значит, browser surface не передал команду масштаба странице; объявлять это проверкой 200% нельзя.

## Проверка альтернативных браузеров

- CUA-подключение к установленным `chrome` и `edge` вернуло `Browser is not available`.
- Установленный Chrome запускался в изолированных временных профилях headless, но завершался до рендера из-за недоступного GPU process.
- Установленный Edge в изолированных временных профилях headless не создал запрошенный screenshot/DOM, поэтому визуальное состояние и reflow не были получены.
- Созданные тестом временные профили удалены. Пользовательские browser profiles, настройки и данные не изменялись.

## Первоначальный вывод

Точный runtime-тест при browser zoom 200% остаётся `NOT_VERIFIED`. Проверки узких viewport 360/390/768/1024/1440 подтверждают responsive и отсутствие horizontal overflow, но не подменяют требование фактического масштабирования. Для закрытия нужен управляемый Chrome/Edge/Firefox/Safari, где можно установить page zoom 200% и зафиксировать CSS viewport, screenshot, keyboard flow и отсутствие двухмерного scroll.

## Успешная повторная проверка

Позднее в том же этапе удалось запустить установленный Google Chrome 153.0.8010.50 headless с DevTools Protocol и отдельными временными профилями. Пользовательский профиль и настройки браузера не использовались и не менялись.

Chromium хранит default page zoom по ключу storage partition. Для стандартного раздела использован ключ `x`; zoom level рассчитан как `log(2) / log(1.2) = 3.8017840169239308`. Структура preference и формула проверены по исходникам Chromium:

- `chrome/browser/ui/zoom/chrome_zoom_level_prefs.cc` — `partition.default_zoom_level` является словарём по partition key;
- `content/common/page_zoom.cc` — `ZoomLevelToZoomFactor(level) = pow(1.2, level)`.

Одинаковая главная страница открыта в физическом окне 1440×900 при 100% и 200%:

| Метрика | 100% | 200% |
|---|---:|---:|
| devicePixelRatio | 1 | 2 |
| innerWidth, CSS px | 1418 | 709 |
| innerHeight, CSS px | 746 | 373 |
| visualViewport.scale | 1 | 1 |
| document scrollWidth/clientWidth | 1418/1418 | 709/709 |
| `(max-width: 768px)` | false | true |
| broken loaded images | 0 | 0 |
| video readyState | 4 | 4 |

CSS-ширина уменьшилась ровно вдвое, DPR вырос ровно вдвое, а `visualViewport.scale` остался 1. Это подтверждает реальный page zoom 200%, а не pinch scale или имитацию узким viewport. При 200% произошёл responsive reflow, horizontal overflow отсутствует.

Клавиатурная последовательность при 200%: skip link → логотип/главная → кнопка «Открыть меню» → CTA «Посмотреть сценарии». Все четыре элемента получили реальный DOM focus.

Доказательства: `zoom-200-results.json` и `zoom-200-home.png` (SHA-256 `7cf5225b302438cb63bbdfc089e2967201eede316eee571034b81afe7ae62269`). Временные профили после проверки удалены.

Итог: ACCESS zoom/reflow — **PASS**. Предыдущая запись `NOT_VERIFIED` сохранена выше как история первоначально недоступной стратегии.
