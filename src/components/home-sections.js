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
    label: 'После встречи',
    title: 'Сохранить договорённость сразу',
    text: 'Контекст встречи, следующий шаг и дата нового контакта остаются в карточке клиента.',
    image: assetUrl('product-screens/tasks-list.jpg'),
    alt: 'Экран задач Simple CRM со следующими действиями после встречи',
  },
  {
    label: 'В нужный день',
    title: 'Проверить расписание на нужную дату',
    text: 'Встречи собраны в календаре списком: сразу видно время, клиента и план на выбранный день.',
    image: assetUrl('product-screens/calendar-list.jpg'),
    alt: 'Календарь Simple CRM со списком встреч на выбранный день',
  },
  {
    label: 'Перед встречей',
    title: 'Увидеть план на сегодня',
    text: 'Ближайшие встречи и свободные интервалы видны на одном экране — к следующему разговору легко подготовиться заранее.',
    image: assetUrl('product-screens/today-schedule.jpg'),
    alt: 'Экран Сегодня в Simple CRM с расписанием ближайших встреч',
  },
  {
    label: 'В конце периода',
    title: 'Закрыть встречу с понятным итогом',
    text: 'В деталях встречи остаются формат, клиент и результат работы — всё необходимое для завершения периода.',
    image: assetUrl('product-screens/meeting-details.jpg'),
    alt: 'Детали встречи в Simple CRM с данными клиента и итоговыми действиями',
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
    createVideoHero(),
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

function createVideoHero() {
  const section = document.createElement('section');
  section.className = 'story-hero';
  section.setAttribute('aria-labelledby', 'page-title');
  section.innerHTML = `
    <div class="story-hero__media" aria-hidden="true">
      <video class="story-hero__video" muted loop autoplay playsinline preload="none" data-promo-placeholder></video>
    </div>
    <div class="story-hero__prototype" role="note">ЭТО ВСЕ ПРОТОТИП!</div>
    <h1 id="page-title" class="visually-hidden">Simple CRM — всё для работы с клиентами</h1>`;

  const video = section.querySelector('video');
  video.poster = new URL('../../video-background/home-prototype-poster.png', import.meta.url).href;
  video.defaultMuted = true;
  video.muted = true;
  video.volume = 0;
  const reducedMotionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const syncPlayback = () => {
    if (document.hidden || reducedMotionQuery.matches) video.pause();
    else video.play().catch(() => {});
  };
  const loadVideo = () => {
    if (reducedMotionQuery.matches || video.dataset.loaded === 'true') return;
    video.dataset.loaded = 'true';
    video.src = new URL('../../video-background/home-prototype.mp4', import.meta.url).href;
    syncPlayback();
  };
  const handleMotionPreference = () => {
    if (!reducedMotionQuery.matches) loadVideo();
    syncPlayback();
  };
  reducedMotionQuery.addEventListener('change', handleMotionPreference);
  document.addEventListener('visibilitychange', syncPlayback);
  loadVideo();
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
    <div class="container">
      <header class="client-story__intro" data-story-reveal>
        <h2 id="client-story-title">Вся работа с клиентом в одной истории</h2>
        <p>Договорённости, задачи, встречи и оплаты связаны между собой и доступны из карточки клиента.</p>
      </header>
      <div class="client-story__stage" data-story-reveal="stage">
        <figure class="client-story__device" data-story-reveal="phone">
          <div class="client-story__overscan">
            <div class="client-story__phone">
              <img src="${storySteps[0].image}" alt="${storySteps[0].alt}" width="591" height="1280" loading="lazy" data-story-image>
            </div>
          </div>
        </figure>
        <div class="client-story__content">
          <div class="client-story__choices" role="tablist" aria-label="Этапы работы с клиентом">
            ${storySteps.map((step, index) => `<button type="button" role="tab" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}" class="${index === 0 ? 'is-active' : ''}" data-story-step="${index}">${escapeHtml(step.label)}</button>`).join('')}
          </div>
          <div class="client-story__explanation" role="tabpanel" aria-live="polite">
            <h3 data-story-title>${escapeHtml(storySteps[0].title)}</h3>
            <p data-story-copy>${escapeHtml(storySteps[0].text)}</p>
          </div>
          <p class="client-story__principle">Следующая задача связана с клиентом, встречей и предыдущей договорённостью.</p>
        </div>
      </div>
      <p class="client-story__note">Отправка сообщений, запись по ссылке и приём оплаты подключаются отдельно.</p>
    </div>`;

  const image = section.querySelector('[data-story-image]');
  const title = section.querySelector('[data-story-title]');
  const copy = section.querySelector('[data-story-copy]');
  const steps = [...section.querySelectorAll('[data-story-step]')];
  let current = 0;
  const activate = index => {
    if (index === current && image.getAttribute('src') === storySteps[index].image) return;
    const step = storySteps[index];
    image.classList.add('is-changing');
    window.setTimeout(() => {
      image.src = step.image;
      image.alt = step.alt;
      title.textContent = step.title;
      copy.textContent = step.text;
      image.classList.remove('is-changing');
    }, reducedMotion() ? 0 : 180);
    steps.forEach((element, position) => {
      const active = position === index;
      element.classList.toggle('is-active', active);
      element.setAttribute('aria-selected', String(active));
      element.tabIndex = active ? 0 : -1;
    });
    current = index;
  };
  steps.forEach((step, index) => {
    step.addEventListener('click', () => activate(index));
    step.addEventListener('focus', () => activate(index));
    step.addEventListener('keydown', event => {
      let next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % steps.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + steps.length) % steps.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = steps.length - 1;
      if (next === null) return;
      event.preventDefault();
      steps[next].focus();
    });
  });
  return section;
}

function createProductProof() {
  const section = document.createElement('section');
  section.className = 'product-proof';
  section.setAttribute('aria-labelledby', 'product-proof-title');
  section.innerHTML = `
    <div class="container product-proof__layout">
      <div class="product-proof__copy" data-story-reveal>
        <h2 id="product-proof-title">Открыли клиента. Контекст уже рядом.</h2>
        <p>Вместо поиска по календарю, переписке и таблице вы возвращаетесь к одной истории. На экране видно, что было, что запланировано и что требует внимания.</p>
        <div class="product-proof__rhythm" role="group" aria-label="Что видно в карточке клиента">
          <p><strong>Видно</strong><span>следующую встречу и открытые задачи</span></p>
          <p><strong>Связано</strong><span>история, договорённости и оплаты</span></p>
          <p><strong>Запланировано</strong><span>следующий контакт и новая встреча</span></p>
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
