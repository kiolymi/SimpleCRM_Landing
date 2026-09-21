# Runtime zoom — проверка доступности среды

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

## Вывод

Точный runtime-тест при browser zoom 200% остаётся `NOT_VERIFIED`. Проверки узких viewport 360/390/768/1024/1440 подтверждают responsive и отсутствие horizontal overflow, но не подменяют требование фактического масштабирования. Для закрытия нужен управляемый Chrome/Edge/Firefox/Safari, где можно установить page zoom 200% и зафиксировать CSS viewport, screenshot, keyboard flow и отсутствие двухмерного scroll.

