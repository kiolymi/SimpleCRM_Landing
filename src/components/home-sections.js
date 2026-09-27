import { iconSvg } from './icons.js?v=20260824-28';
import { accessConfig } from '../data/access.js?v=refinement3';

const assetUrl = path => new URL(`../../assets/${path}`, import.meta.url).href;

const recognitionSlides = [
  {
    src: assetUrl('practice-refinement/practice-psychologist-960.webp'),
    srcSmall: assetUrl('practice-refinement/practice-psychologist-640.webp'),
    alt: 'Специалист обсуждает с клиентом итоги встречи',
    title: 'История работы с клиентом сохраняется от встречи к встрече',
  },
  {
    src: assetUrl('practice-refinement/practice-mentor-960.webp'),
    srcSmall: assetUrl('practice-refinement/practice-mentor-640.webp'),
    alt: 'Специалист обсуждает с клиентом записи и дальнейший план',
    title: 'Договорённости находятся без долгих поисков',
  },
  {
    src: assetUrl('practice-refinement/practice-trainer-960.webp'),
    srcSmall: assetUrl('practice-refinement/practice-trainer-640.webp'),
    alt: 'Специалист обсуждает с клиентом план следующей встречи',
    title: 'Расписание и важные детали клиента всегда рядом',
  },
  {
    src: assetUrl('practice-slideshow/manicure-960.webp'),
    srcSmall: assetUrl('practice-slideshow/manicure-640.webp'),
    alt: 'Мастер маникюра работает с клиенткой за рабочим столом',
    title: 'Мастер маникюра видит пожелания клиента и следующий визит',
  },
  {
    src: assetUrl('practice-slideshow/massage-960.webp'),
    srcSmall: assetUrl('practice-slideshow/massage-640.webp'),
    alt: 'Массажист проводит профессиональный сеанс для клиента',
    title: 'Массажист сохраняет особенности сеанса и план следующих встреч',
  },
  {
    src: assetUrl('practice-slideshow/tutor-960.webp'),
    srcSmall: assetUrl('practice-slideshow/tutor-640.webp'),
    alt: 'Репетитор объясняет ученице задачу по геометрии',
    title: 'Репетитор связывает программу, задания и расписание ученика',
  },
  {
    src: assetUrl('practice-slideshow/hairstylist-960.webp'),
    srcSmall: assetUrl('practice-slideshow/hairstylist-640.webp'),
    alt: 'Парикмахер делает укладку клиентке перед зеркалом',
    title: 'Парикмахер помнит пожелания клиента и дату следующего визита',
  },
  {
    src: assetUrl('practice-slideshow/nutritionist-960.webp'),
    srcSmall: assetUrl('practice-slideshow/nutritionist-640.webp'),
    alt: 'Диетолог с яблоком объясняет клиенту выбор продуктов',
    title: 'Диетолог фиксирует рекомендации и следующий шаг клиента',
  },
  {
    src: assetUrl('practice-slideshow/physiotherapist-960.webp'),
    srcSmall: assetUrl('practice-slideshow/physiotherapist-640.webp'),
    alt: 'Физиотерапевт помогает клиенту выполнить упражнение с лентой',
    title: 'Физиотерапевт видит прогресс клиента и план ближайших занятий',
  },
  {
    src: assetUrl('practice-slideshow/language-teacher-960.webp'),
    srcSmall: assetUrl('practice-slideshow/language-teacher-640.webp'),
    alt: 'Преподаватель объясняет материал ученику у доски',
    title: 'Преподаватель связывает уроки, задания и следующую встречу',
  },
  {
    src: assetUrl('practice-slideshow/photographer-960.webp'),
    srcSmall: assetUrl('practice-slideshow/photographer-640.webp'),
    alt: 'Фотограф снимает клиентку в профессиональной студии',
    title: 'Фотограф хранит задачи, детали съёмки и контакты клиента вместе',
  },
];

const storySteps = [
  {
    label: 'Сегодня',
    title: 'День начинается с ясного плана',
    text: 'Ближайшие встречи и свободные интервалы собраны в одном расписании. Перед началом работы сразу видно, кто следующий.',
    hoverText: 'Проверьте расписание, время и клиента перед первой встречей дня.',
    image: assetUrl('product-screens/today-schedule.jpg'),
    alt: 'Экран Сегодня в Simple CRM с расписанием ближайших встреч',
    href: '/how-to/prepare-meeting/',
  },
  {
    label: 'Календарь',
    title: 'Неделя складывается в понятный ритм',
    text: 'Календарь помогает оценить загрузку, увидеть свободное время и распределить встречи без пересечений.',
    hoverText: 'Смотрите неделю целиком и выбирайте подходящее время для новой записи.',
    image: assetUrl('product-screens/calendar-week.jpg'),
    alt: 'Недельный календарь Simple CRM со встречами и свободными интервалами',
    href: '/how-to/prepare-meeting/',
  },
  {
    label: 'Список встреч',
    title: 'Нужный день читается с первого взгляда',
    text: 'Встречи показаны списком с клиентом, временем и форматом. К нужной записи можно перейти без поиска по перепискам.',
    hoverText: 'Откройте выбранный день и быстро перейдите к деталям каждой встречи.',
    image: assetUrl('product-screens/calendar-list.jpg'),
    alt: 'Календарь Simple CRM со списком встреч на выбранный день',
    href: '/how-to/prepare-meeting/',
  },
  {
    label: 'Карточка клиента',
    title: 'Главное о клиенте находится рядом',
    text: 'Контакты, ближайшая встреча и рабочие действия доступны из одной карточки. Продолжить работу можно с нужного места.',
    hoverText: 'Откройте обзор клиента, чтобы увидеть ближайшую встречу и актуальные данные.',
    image: assetUrl('product-screens/client-overview.jpg'),
    alt: 'Обзор карточки клиента в Simple CRM',
    href: '/learn/client-context/',
  },
  {
    label: 'История',
    title: 'Контекст сохраняется от встречи к встрече',
    text: 'Активность клиента выстроена по времени: встречи, задачи и изменения остаются в последовательной рабочей истории.',
    hoverText: 'Просматривайте события по порядку и возвращайтесь к важным договорённостям.',
    image: assetUrl('product-screens/client-activity.jpg'),
    alt: 'История активности клиента в Simple CRM',
    href: '/learn/client-context/',
  },
  {
    label: 'Задачи',
    title: 'Следующие действия не теряются',
    text: 'Новые, текущие и завершённые задачи собраны в одном списке. Срок и клиент видны без дополнительных переходов.',
    hoverText: 'Следите за открытыми действиями и завершайте их в понятном порядке.',
    image: assetUrl('product-screens/tasks-list.jpg'),
    alt: 'Список задач Simple CRM со статусами и сроками',
    href: '/how-to/create-follow-up-task/',
  },
  {
    label: 'Новая задача',
    title: 'Договорённость превращается в конкретный шаг',
    text: 'Название, срок, приоритет и клиент сохраняются вместе. Задача сразу объясняет, что нужно сделать дальше.',
    hoverText: 'Зафиксируйте действие, срок и приоритет сразу после разговора с клиентом.',
    image: assetUrl('product-screens/new-task-details.jpg'),
    alt: 'Форма новой задачи в Simple CRM со сроком и приоритетом',
    href: '/how-to/create-follow-up-task/',
  },
  {
    label: 'Итоги встречи',
    title: 'Каждая встреча завершается понятным итогом',
    text: 'Формат, клиент, заметки и итоговые действия остаются в деталях встречи и помогают подготовиться к следующему контакту.',
    hoverText: 'Сохраните результат встречи и оставьте следующий шаг рядом с клиентом.',
    image: assetUrl('product-screens/meeting-details.jpg'),
    alt: 'Детали встречи в Simple CRM с данными клиента и итоговыми действиями',
    href: '/learn/follow-up-after-meeting/',
  },
];

const draftReviews = [
  {
    role: 'Психолог, частная практика',
    quote: 'После консультации сразу фиксирую договорённость и дату следующего контакта. К началу новой встречи весь контекст уже перед глазами.',
    tone: 'blue',
  },
  {
    role: 'Репетитор',
    quote: 'Расписание, переносы и оплаты больше не приходится сверять в трёх местах.',
    tone: 'white',
  },
  {
    role: 'Бизнес-консультант',
    quote: 'Вижу историю работы с клиентом и следующий шаг. Подготовка к созвону занимает заметно меньше внимания.',
    tone: 'ice',
  },
  {
    role: 'Фитнес-тренер',
    quote: 'У каждого клиента есть понятная история: встречи, задачи и важные детали. Ничего не теряется между занятиями.',
    tone: 'ink',
  },
  {
    role: 'Логопед',
    quote: 'Можно начать с нескольких клиентов и выстроить порядок без сложной настройки.',
    tone: 'white',
  },
  {
    role: 'Карьерный консультант',
    quote: 'Нравится, что приложение не перегружает работу. Оно помогает помнить главное и не забирает внимание у клиента.',
    tone: 'soft',
  },
];

export function createHomePage() {
  const fragment = document.createDocumentFragment();
  fragment.append(
    createObjectHero(),
    createRecognitionSection(),
    createClientStory(),
    createProductProof(),
    createTrustSection(),
    createReviewsSection(),
    createStartSection(),
  );
  wireHomeMotion(fragment);
  return fragment;
}

function createObjectHero() {
  const section = document.createElement('section');
  section.className = 'story-hero';
  section.setAttribute('aria-labelledby', 'page-title');
  section.innerHTML = `
    <div class="container story-hero__layout">
      <div class="story-hero__visual" data-story-reveal="hero-visual">
        <div class="story-hero__halo" aria-hidden="true"></div>
        <img class="story-hero__object story-hero__object--board" src="${assetUrl('hero-objects/planning-whiteboard.png')}" alt="" width="1536" height="1024" loading="eager" aria-hidden="true">
        <img class="story-hero__object story-hero__object--calendar" src="${assetUrl('hero-objects/desk-calendar.png')}" alt="" width="1312" height="1199" loading="eager" aria-hidden="true">
        <img class="story-hero__object story-hero__object--clock" src="${assetUrl('hero-objects/blue-clock.png')}" alt="" width="1321" height="1191" loading="eager" aria-hidden="true">
        <img class="story-hero__object story-hero__object--planner" src="${assetUrl('hero-objects/planner-pen.png')}" alt="" width="1536" height="1024" loading="eager" aria-hidden="true">
        <img class="story-hero__object story-hero__object--notes" src="${assetUrl('hero-objects/sticky-notes-clips.png')}" alt="" width="1312" height="1199" loading="eager" aria-hidden="true">
        <img class="story-hero__object story-hero__object--cup" src="${assetUrl('hero-objects/pencil-cup.png')}" alt="" width="1024" height="1536" loading="eager" aria-hidden="true">
        <img class="story-hero__object story-hero__object--cards" src="${assetUrl('hero-objects/appointment-cards.png')}" alt="" width="1536" height="1024" loading="eager" aria-hidden="true">
        <figure class="story-hero__phone">
          <img src="${assetUrl('product-screens/today-schedule.jpg')}" alt="Экран Сегодня в Simple CRM с расписанием встреч" width="591" height="1280" fetchpriority="high">
        </figure>
      </div>
      <div class="story-hero__copy" data-story-reveal="hero-copy">
        <h1 id="page-title"><span class="story-hero__lead">Всё для работы</span><br><span class="story-hero__highlight">с клиентами</span></h1>
        <p>Расписание, задачи и договорённости собраны в одном приложении</p>
        <button class="header-app-store story-hero__app-store" type="button" data-download-placeholder aria-haspopup="dialog">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 3.2c-.9.1-2 .7-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.2.6-.8 1-1.8.9-3Zm3.4 9.1c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.6 1.3-.1 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3.1-1.2-3.1-4.7Z" /></svg>
          <span><small>Скачайте с</small><strong>App Store</strong></span>
        </button>
      </div>
    </div>
  `;
  return section;
}

function createRecognitionSection() {
  const section = document.createElement('section');
  section.id = 'recognition';
  section.className = 'recognition';
  section.setAttribute('aria-labelledby', 'recognition-title');
  section.innerHTML = `
    <div class="container recognition__layout">
      <header class="recognition__intro" data-story-reveal>
        <h2 id="recognition-title">Важное не должно теряться <span>между встречами</span></h2>
        <p>Simple CRM подходит для консультаций, занятий, услуг и сопровождения. Договорённости, следующий контакт и важные детали по каждому клиенту остаются рядом.</p>
      </header>
      <figure class="recognition__showcase" data-story-reveal="media" data-recognition-slider aria-roledescription="слайд-шоу" aria-label="Специалисты работают с клиентами">
        <div class="recognition__slides">
          ${recognitionSlides.map((slide, index) => `
            <div class="recognition__slide${index === 0 ? ' is-active' : ''}" data-recognition-slide aria-hidden="${index === 0 ? 'false' : 'true'}">
              <picture>
                <source media="(max-width: 720px)" srcset="${escapeAttribute(slide.srcSmall)}">
                <img src="${escapeAttribute(slide.src)}" alt="${escapeAttribute(slide.alt)}" width="960" height="640" loading="lazy">
              </picture>
              <div class="recognition__photo-scrim" aria-hidden="true"></div>
              <figcaption>
                <strong>${escapeHtml(slide.title)}</strong>
              </figcaption>
            </div>`).join('')}
          <div class="recognition__progress" aria-hidden="true"><span data-recognition-progress></span></div>
        </div>
      </figure>
      <div class="recognition__continuity" data-story-reveal="cluster">
        <h3><span class="recognition__headline-lead">Всё о клиенте&nbsp;—</span> <span>под рукой</span></h3>
        <div class="recognition__moments" role="list" aria-label="Как сохраняется контекст клиента">
          <article class="recognition__moment recognition__moment--first" role="listitem">
            <strong>Зафиксировать итог</strong>
            <span>Краткая запись после встречи сохраняет договорённость и следующий шаг.</span>
          </article>
          <article class="recognition__moment recognition__moment--second" role="listitem">
            <strong>Обновить план</strong>
            <span>Перенос или новая задача сразу отражаются в работе с клиентом.</span>
          </article>
          <article class="recognition__moment recognition__moment--third" role="listitem">
            <strong>Продолжить с контекста</strong>
            <span>Перед контактом доступны предыдущая встреча, заметки и актуальные задачи.</span>
          </article>
        </div>
      </div>
    </div>`;
  wireRecognitionSlideshow(section);
  return section;
}

function wireRecognitionSlideshow(section) {
  const slider = section.querySelector('[data-recognition-slider]');
  const slides = [...section.querySelectorAll('[data-recognition-slide]')];
  const progress = section.querySelector('[data-recognition-progress]');
  if (!slider || slides.length < 2 || !progress) return;

  const duration = 4800;
  const pauseReasons = new Set();
  let current = 0;
  let timer = null;
  let inView = !('IntersectionObserver' in window);

  const stop = () => {
    window.clearTimeout(timer);
    timer = null;
    slider.classList.add('is-paused');
  };
  const activate = index => {
    current = index;
    slides.forEach((slide, position) => {
      const active = position === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
  };
  const restartProgress = () => {
    slider.classList.remove('is-running', 'is-paused');
    void progress.offsetWidth;
    slider.classList.add('is-running');
  };
  const start = () => {
    stop();
    if (reducedMotion() || document.hidden || !inView || pauseReasons.size) return;
    restartProgress();
    timer = window.setTimeout(() => {
      activate((current + 1) % slides.length);
      start();
    }, duration);
  };
  const sync = () => {
    if (reducedMotion() || document.hidden || !inView || pauseReasons.size) stop();
    else start();
  };
  const setReason = (reason, active) => {
    if (active) pauseReasons.add(reason);
    else pauseReasons.delete(reason);
    sync();
  };

  slider.addEventListener('mouseenter', () => setReason('hover', true));
  slider.addEventListener('mouseleave', () => setReason('hover', false));
  slider.addEventListener('focusin', () => setReason('focus', true));
  slider.addEventListener('focusout', event => {
    if (!slider.contains(event.relatedTarget)) setReason('focus', false);
  });
  document.addEventListener('visibilitychange', sync);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      sync();
    }, { threshold: .35 });
    observer.observe(slider);
  }
  sync();
}

function createClientStory() {
  const section = document.createElement('section');
  section.id = 'practice';
  section.className = 'client-story';
  section.setAttribute('aria-labelledby', 'client-story-title');
  section.innerHTML = `
    <div class="container client-story__layout">
      <header class="client-story__intro" data-story-reveal>
        <h2 id="client-story-title"><span>Вся работа с клиентом</span><br><em>в одной истории</em></h2>
      </header>
      <div class="client-story__carousel" data-client-story data-story-reveal="stage" role="region" aria-roledescription="карусель" aria-label="Возможности Simple CRM">
        <button class="client-story__arrow client-story__arrow--previous" type="button" aria-label="Предыдущий экран" data-story-previous>${iconSvg('arrow-right')}</button>
        <div class="client-story__viewport" data-story-viewport role="group" tabindex="0" aria-label="Карусель экранов приложения. Используйте стрелки влево и вправо для переключения">
          ${storySteps.map((step, index) => `
            <article class="client-story__slide${index === 0 ? ' is-active' : ''}" data-story-slide="${index}" data-slot="${index <= 2 ? index : index >= storySteps.length - 2 ? index - storySteps.length : 3}" aria-hidden="${index > 2 && index < storySteps.length - 2 ? 'true' : 'false'}">
              <a class="client-story__screen-card" href="${escapeAttribute(step.href)}" aria-label="${escapeAttribute(`${step.title}. Узнать подробнее`)}">
                <div class="client-story__phone">
                  <img src="${escapeAttribute(step.image)}" alt="${escapeAttribute(step.alt)}" width="591" height="1280" loading="lazy" data-story-image>
                  <div class="client-story__screen-detail">
                    <p>${escapeHtml(step.hoverText)}</p>
                    <span class="client-story__screen-link">Узнать подробнее ${iconSvg('arrow-right')}</span>
                  </div>
                </div>
              </a>
            </article>`).join('')}
        </div>
        <button class="client-story__arrow client-story__arrow--next" type="button" aria-label="Следующий экран" data-story-next>${iconSvg('arrow-right')}</button>
      </div>
      <div class="client-story__details" aria-live="polite" aria-atomic="true" data-story-content>
        <div class="client-story__explanation">
          <h3 data-story-title>${escapeHtml(storySteps[0].title)}</h3>
          <p data-story-copy>${escapeHtml(storySteps[0].text)}</p>
          <a class="client-story__more" href="${escapeAttribute(storySteps[0].href)}" data-story-link>Узнать подробнее ${iconSvg('arrow-right')}</a>
        </div>
        <div class="client-story__progress" aria-hidden="true"><span data-story-progress></span></div>
      </div>
    </div>`;

  const carousel = section.querySelector('[data-client-story]');
  const viewport = section.querySelector('[data-story-viewport]');
  const slides = [...section.querySelectorAll('[data-story-slide]')];
  const title = section.querySelector('[data-story-title]');
  const copy = section.querySelector('[data-story-copy]');
  const link = section.querySelector('[data-story-link]');
  const content = section.querySelector('[data-story-content]');
  const progress = section.querySelector('[data-story-progress]');
  const previous = section.querySelector('[data-story-previous]');
  const next = section.querySelector('[data-story-next]');
  const duration = 4000;
  const compactViewport = window.matchMedia('(max-width: 700px)');
  const pauseReasons = new Set();
  let current = 0;
  let timer = null;
  let inView = !('IntersectionObserver' in window);

  const slotFor = index => {
    let distance = (index - current + storySteps.length) % storySteps.length;
    if (distance > storySteps.length / 2) distance -= storySteps.length;
    return distance;
  };
  const stop = () => {
    window.clearTimeout(timer);
    timer = null;
    carousel.classList.add('is-paused');
  };
  const restartProgress = () => {
    carousel.classList.remove('is-running', 'is-paused');
    void progress.offsetWidth;
    carousel.classList.add('is-running');
  };
  const start = () => {
    stop();
    if (reducedMotion() || document.hidden || !inView || pauseReasons.size) return;
    restartProgress();
    timer = window.setTimeout(() => activate(current + 1, false), duration);
  };
  const sync = () => {
    if (reducedMotion() || document.hidden || !inView || pauseReasons.size) stop();
    else start();
  };
  const setReason = (reason, active) => {
    if (active) pauseReasons.add(reason);
    else pauseReasons.delete(reason);
    sync();
  };
  const updateDetails = step => {
    title.textContent = step.title;
    copy.textContent = step.text;
    link.href = step.href;
    content.classList.remove('is-entering');
    void content.offsetWidth;
    content.classList.add('is-entering');
  };
  const activate = (index, userInitiated = true) => {
    current = (index + storySteps.length) % storySteps.length;
    slides.forEach((slide, position) => {
      const slot = slotFor(position);
      const visible = Math.abs(slot) <= (compactViewport.matches ? 1 : 2);
      const active = slot === 0;
      slide.dataset.slot = String(slot);
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!visible));
      slide.querySelector('a').tabIndex = visible ? 0 : -1;
    });
    const step = storySteps[current];
    updateDetails(step);
    start();
  };

  previous.addEventListener('click', () => activate(current - 1));
  next.addEventListener('click', () => activate(current + 1));
  slides.forEach((slide, index) => {
    slide.addEventListener('click', event => {
      if (index === current) return;
      event.preventDefault();
      activate(index);
    });
    slide.addEventListener('focusin', () => {
      if (index !== current) activate(index, false);
    });
  });
  viewport.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    activate(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  carousel.addEventListener('mouseenter', () => setReason('hover', true));
  carousel.addEventListener('mouseleave', () => setReason('hover', false));
  carousel.addEventListener('focusin', () => setReason('focus', true));
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) setReason('focus', false);
  });
  document.addEventListener('visibilitychange', sync);
  compactViewport.addEventListener?.('change', () => activate(current, false));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      sync();
    }, { threshold: .25 });
    observer.observe(carousel);
  }
  activate(0, false);
  return section;
}

function createProductProof() {
  const section = document.createElement('section');
  section.className = 'product-proof';
  section.setAttribute('aria-labelledby', 'product-proof-title');
  section.innerHTML = `
    <div class="product-proof__backdrop" aria-hidden="true" data-story-reveal="proof-photo">
      <img src="${assetUrl('editorial/client-planning-background.webp')}" alt="" width="1680" height="945" loading="lazy">
    </div>
    <div class="container product-proof__layout" data-story-reveal="proof-group">
      <div class="product-proof__copy">
        <h2 id="product-proof-title">Открыли клиента<br><span>всё уже рядом</span></h2>
        <p>Ближайшая встреча, актуальные задачи и договорённости собраны в карточке клиента. Откройте её и продолжайте с нужного места.</p>
        <div class="product-proof__signals" role="group" aria-label="Что собрано в карточке клиента">
          <p class="product-proof__signal product-proof__signal--now"><strong>Сейчас</strong><span>Ближайшая встреча и открытые задачи</span></p>
          <p class="product-proof__signal product-proof__signal--context"><strong>История</strong><span>Контакты и важные договорённости</span></p>
          <p class="product-proof__signal product-proof__signal--next"><strong>Дальше</strong><span>Следующая встреча и новый шаг</span></p>
        </div>
      </div>
      <figure class="product-proof__visual" data-story-reveal="fan">
        <div class="product-proof__overscan">
          <div class="product-proof__fan">
            <div class="product-proof__screen product-proof__screen--back"><img src="${assetUrl('product-screens/today-schedule.jpg')}" alt="Актуальное расписание на сегодня в Simple CRM" width="591" height="1280" loading="lazy"></div>
            <div class="product-proof__screen product-proof__screen--front"><img src="${assetUrl('product-screens/client-overview.jpg')}" alt="Актуальная карточка клиента в Simple CRM с ближайшей встречей, задачами и данными" width="591" height="1280" loading="lazy"></div>
          </div>
        </div>
      </figure>
    </div>`;
  return section;
}

function createTrustSection() {
  const section = document.createElement('section');
  section.className = 'story-trust';
  section.setAttribute('aria-labelledby', 'story-trust-title');
  section.innerHTML = `
    <div class="container story-trust__layout">
      <header data-story-reveal>
        <h2 id="story-trust-title">Порядок без лишнего контроля</h2>
        <p>Simple CRM остаётся рабочим инструментом. Решения, тон общения и отношения с клиентом остаются за вами.</p>
      </header>
      <div class="story-trust__canvas" data-story-reveal="cluster">
        <article class="story-trust__point story-trust__point--lead"><h3>Начать с малого</h3><p>Добавьте одного клиента, встречу и следующий шаг. Базу можно переносить постепенно.</p></article>
        <article class="story-trust__point story-trust__point--plain"><h3>Понятно с первого дня</h3><p>Основные действия находятся рядом с клиентом. Долгая настройка не требуется.</p></article>
        <article class="story-trust__point story-trust__point--privacy"><h3>Данные под контролем</h3><p>Доступ и правила хранения чувствительной информации всегда должны быть прозрачными.</p></article>
      </div>
    </div>`;
  return section;
}

function createReviewsSection() {
  const section = document.createElement('section');
  section.className = 'story-reviews';
  section.setAttribute('aria-labelledby', 'story-reviews-title');
  section.innerHTML = `
    <div class="container">
      <header class="story-reviews__intro" data-story-reveal>
        <h2 id="story-reviews-title">Что ценят специалисты</h2>
        <p>Расписание, договорённости и следующий шаг остаются рядом в ежедневной работе с клиентами.</p>
      </header>
      <div class="story-reviews__wall" role="group" aria-label="Отзывы специалистов" data-story-reveal="cluster">
        ${draftReviews.map((review, index) => `
          <article class="story-review story-review--${review.tone}" style="--review-index:${index}">
            <div class="story-review__stars" role="img" aria-label="5 из 5">
              ${Array.from({ length: 5 }, () => iconSvg('star')).join('')}
            </div>
            <blockquote>${escapeHtml(review.quote)}</blockquote>
            <p>${escapeHtml(review.role)}</p>
          </article>`).join('')}
      </div>
    </div>`;
  return section;
}

function createStartSection() {
  const section = document.createElement('section');
  section.id = 'start';
  section.className = 'story-start';
  section.setAttribute('aria-labelledby', 'story-start-title');
  section.innerHTML = `
    <div class="container story-start__panel" data-story-reveal="panel">
      <div>
        <h2 id="story-start-title">Начните с одного клиента</h2>
      </div>
      <div class="story-start__action">
        <p>Откройте рабочие сценарии и посмотрите, как Simple CRM связывает клиента, встречу и следующий шаг.</p>
        <a class="button story-button story-button--dark" href="${escapeAttribute(accessConfig.primary.href)}">${escapeHtml(accessConfig.primary.label)} ${iconSvg('arrow-right')}</a>
        <small>Способ получения приложения и условия доступа будут опубликованы отдельно.</small>
      </div>
    </div>`;
  return section;
}

function reducedMotion() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function wireHomeMotion(root) {
  const elements = [...root.querySelectorAll('[data-story-reveal]')];
  if (!elements.length || reducedMotion() || !('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('is-visible'));
    return;
  }
  document.documentElement.classList.add('story-motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .16, rootMargin: '0px 0px -8% 0px' });
  elements.forEach(element => observer.observe(element));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]);
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
