import { iconSvg } from './icons.js?v=20260824-28';
import { accessConfig } from '../data/access.js?v=refinement3';
import { appStoreBadgeMarkup } from './app-store-badge.js?v=official1';

const assetUrl = path => new URL(`../../assets/${path}`, import.meta.url).href;
const pageUrl = path => new URL(`../../${path.replace(/^\/+/, '')}`, import.meta.url).href;

const recognitionSlides = [
  {
    src: assetUrl('practice-refinement/practice-psychologist-960.webp'),
    srcSmall: assetUrl('practice-refinement/practice-psychologist-640.webp'),
    alt: 'Специалист обсуждает с клиентом итоги встречи',
    title: 'Провели консультацию, а оплата не пришла? CRM напомнит клиенту',
  },
  {
    src: assetUrl('practice-refinement/practice-mentor-960.webp'),
    srcSmall: assetUrl('practice-refinement/practice-mentor-640.webp'),
    alt: 'Специалист обсуждает с клиентом записи и дальнейший план',
    title: 'Клиент попросил вернуться к вопросу позже? Сохраните следующий контакт',
  },
  {
    src: assetUrl('practice-refinement/practice-trainer-960.webp'),
    srcSmall: assetUrl('practice-refinement/practice-trainer-640.webp'),
    alt: 'Специалист обсуждает с клиентом план следующей встречи',
    title: 'Клиент забыл о занятии? Напоминание придёт заранее',
  },
  {
    src: assetUrl('practice-slideshow/manicure-960.webp'),
    srcSmall: assetUrl('practice-slideshow/manicure-640.webp'),
    alt: 'Мастер маникюра работает с клиенткой за рабочим столом',
    title: 'Клиент давно не записывался? CRM напомнит о следующем визите',
  },
  {
    src: assetUrl('practice-slideshow/massage-960.webp'),
    srcSmall: assetUrl('practice-slideshow/massage-640.webp'),
    alt: 'Массажист проводит профессиональный сеанс для клиента',
    title: 'Сеанс завершён. Напоминание об оплате отправит Simple CRM',
  },
  {
    src: assetUrl('practice-slideshow/tutor-960.webp'),
    srcSmall: assetUrl('practice-slideshow/tutor-640.webp'),
    alt: 'Репетитор объясняет ученице задачу по геометрии',
    title: 'Уроки, переносы и оплаты — больше не нужно сверять всё по чатам',
  },
  {
    src: assetUrl('practice-slideshow/hairstylist-960.webp'),
    srcSmall: assetUrl('practice-slideshow/hairstylist-640.webp'),
    alt: 'Парикмахер делает укладку клиентке перед зеркалом',
    title: 'Пожелания клиента сохранены, напоминание о визите придёт вовремя',
  },
  {
    src: assetUrl('practice-slideshow/nutritionist-960.webp'),
    srcSmall: assetUrl('practice-slideshow/nutritionist-640.webp'),
    alt: 'Диетолог с яблоком объясняет клиенту выбор продуктов',
    title: 'Рекомендации и следующий контакт не потеряются после консультации',
  },
  {
    src: assetUrl('practice-slideshow/physiotherapist-960.webp'),
    srcSmall: assetUrl('practice-slideshow/physiotherapist-640.webp'),
    alt: 'Физиотерапевт помогает клиенту выполнить упражнение с лентой',
    title: 'Договорились продолжить занятия? CRM напомнит о новой записи',
  },
  {
    src: assetUrl('practice-slideshow/language-teacher-960.webp'),
    srcSmall: assetUrl('practice-slideshow/language-teacher-640.webp'),
    alt: 'Преподаватель объясняет материал ученику у доски',
    title: 'Напоминания об уроках и оплате — без ежедневной переписки',
  },
  {
    src: assetUrl('practice-slideshow/photographer-960.webp'),
    srcSmall: assetUrl('practice-slideshow/photographer-640.webp'),
    alt: 'Фотограф снимает клиентку в профессиональной студии',
    title: 'Предоплата, детали съёмки и остаток к оплате — в одной истории',
  },
];

const storySteps = [
  {
    label: 'Сегодня',
    title: 'Кто следующий — видно сразу',
    text: 'Приём, урок или созвон: откройте день и увидьте ближайшего клиента. Simple CRM заранее напомнит ему о встрече.',
    hoverText: 'Проверьте расписание, время и клиента перед первой встречей дня.',
    image: assetUrl('product-screens/today-schedule.jpg'),
    alt: 'Экран Сегодня в Simple CRM с расписанием ближайших встреч',
    href: pageUrl('how-to/prepare-meeting/'),
  },
  {
    label: 'Календарь',
    title: 'Найдите время без долгой переписки',
    text: 'Свободные интервалы видны на неделю вперёд. Подберите время для нового клиента или повторной встречи.',
    hoverText: 'Смотрите неделю целиком и выбирайте подходящее время для новой записи.',
    image: assetUrl('product-screens/calendar-week.jpg'),
    alt: 'Недельный календарь Simple CRM со встречами и свободными интервалами',
    href: pageUrl('how-to/prepare-meeting/'),
  },
  {
    label: 'Список встреч',
    title: 'Переносы не теряются в чатах',
    text: 'Клиент перенёс запись? Сохраните новую дату в расписании. Время, формат и участники встречи останутся под рукой.',
    hoverText: 'Откройте выбранный день и быстро перейдите к деталям каждой встречи.',
    image: assetUrl('product-screens/calendar-list.jpg'),
    alt: 'Календарь Simple CRM со списком встреч на выбранный день',
    href: pageUrl('how-to/prepare-meeting/'),
  },
  {
    label: 'Карточка клиента',
    title: 'Не просите клиента повторять всё заново',
    text: 'Перед звонком или встречей откройте карточку: контакты, договорённости и ближайшие действия уже собраны вместе.',
    hoverText: 'Откройте обзор клиента, чтобы увидеть ближайшую встречу и актуальные данные.',
    image: assetUrl('product-screens/client-overview.jpg'),
    alt: 'Обзор карточки клиента в Simple CRM',
    href: pageUrl('learn/client-context/'),
  },
  {
    label: 'История',
    title: 'Вспомните договорённость за один взгляд',
    text: 'Что обсуждали, когда встречались и что обещали сделать — история помогает продолжить работу даже после долгой паузы.',
    hoverText: 'Просматривайте события по порядку и возвращайтесь к важным договорённостям.',
    image: assetUrl('product-screens/client-activity.jpg'),
    alt: 'История активности клиента в Simple CRM',
    href: pageUrl('learn/client-context/'),
  },
  {
    label: 'Задачи',
    title: 'Клиент ждёт предложение? Не забудьте ответить',
    text: 'Отправить расчёт, уточнить решение, подготовить документы: личные задачи собраны со сроками и привязаны к клиентам.',
    hoverText: 'Следите за открытыми действиями и завершайте их в понятном порядке.',
    image: assetUrl('product-screens/tasks-list.jpg'),
    alt: 'Список задач Simple CRM со статусами и сроками',
    href: pageUrl('how-to/create-follow-up-task/'),
  },
  {
    label: 'Новая задача',
    title: '«Свяжитесь через неделю» — уже в плане',
    text: 'Назначьте следующий контакт сразу после разговора. Когда придёт время, рядом будут клиент, срок и детали договорённости.',
    hoverText: 'Зафиксируйте действие, срок и приоритет сразу после разговора с клиентом.',
    image: assetUrl('product-screens/new-task-details.jpg'),
    alt: 'Форма новой задачи в Simple CRM со сроком и приоритетом',
    href: pageUrl('how-to/create-follow-up-task/'),
  },
  {
    label: 'Итоги встречи',
    title: 'После встречи не начинайте с чистого листа',
    text: 'Сохраните результат консультации или переговоров. На следующей встрече не придётся собирать договорённости по памяти.',
    hoverText: 'Сохраните результат встречи и оставьте следующий шаг рядом с клиентом.',
    image: assetUrl('product-screens/meeting-details.jpg'),
    alt: 'Детали встречи в Simple CRM с данными клиента и итоговыми действиями',
    href: pageUrl('learn/follow-up-after-meeting/'),
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
    tone: 'white',
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
    tone: 'blue',
  },
];

export function createHomePage() {
  const fragment = document.createDocumentFragment();
  fragment.append(
    createObjectHero(),
    createRecognitionSection(),
    createClientStory(),
    createProductProof(),
    createPaymentGrowthSection(),
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
        <div class="story-hero__scene" role="img" aria-label="Рабочее пространство Simple CRM: экран Сегодня, канбан задач, список клиентов и рабочие инструменты">
          <img class="story-hero__piece story-hero__piece--clients" src="${assetUrl('hero-objects/object-client-contact-list.png')}" alt="" width="1214" height="1295" loading="eager" aria-hidden="true">
          <img class="story-hero__piece story-hero__piece--kanban" src="${assetUrl('hero-objects/object-filled-kanban-board.png')}" alt="" width="1536" height="1024" loading="eager" aria-hidden="true">
          <img class="story-hero__piece story-hero__piece--clock" src="${assetUrl('hero-objects/blue-clock.png')}" alt="" width="1321" height="1191" loading="eager" aria-hidden="true">
          <img class="story-hero__piece story-hero__piece--laptop" src="${assetUrl('hero-objects/object-crm-laptop.png')}" alt="" width="1536" height="1024" loading="eager" aria-hidden="true">
          <img class="story-hero__piece story-hero__piece--notes" src="${assetUrl('hero-objects/sticky-notes-clips.png')}" alt="" width="1312" height="1199" loading="eager" aria-hidden="true">
          <img class="story-hero__piece story-hero__piece--phone" src="${assetUrl('hero-objects/iphone-today-monday.png')}" alt="" width="1002" height="1569" loading="eager" fetchpriority="high" aria-hidden="true">
        </div>
      </div>
      <div class="story-hero__copy" data-story-reveal="hero-copy">
        <div class="story-hero__brand">
          <img src="${assetUrl('brand-simplecrm-s.png')}" alt="" width="1024" height="1024" aria-hidden="true">
          <span>Simple<strong>CRM</strong></span>
        </div>
        <h1 id="page-title"><span class="story-hero__lead">Клиенты и оплаты</span><span class="story-hero__highlight">под контролем</span></h1>
        <p>Встречи, договорённости и оплаты — в одном приложении. Simple CRM сама напоминает клиентам через Telegram, MAX и SMS.</p>
        ${appStoreBadgeMarkup('story-hero__app-store')}
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
        <h2 id="recognition-title">Знакомые ситуации. <span>Меньше ручной работы.</span></h2>
        <p>Сеанс не оплачен, клиент давно не записывался, после предложения нет ответа. Для услуг, консультаций и продаж — напоминания и история работы в Simple CRM.</p>
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
        <h3><span class="recognition__headline-lead">Рутина&nbsp;— CRM.</span> <span>Внимание — клиенту.</span></h3>
        <div class="recognition__moments" role="list" aria-label="Как сохраняется контекст клиента">
          <article class="recognition__moment recognition__moment--first" role="listitem">
            <strong>Оплата не пришла?</strong>
            <span>CRM сама напомнит клиенту и узнает о поступлении оплаты.</span>
          </article>
          <article class="recognition__moment recognition__moment--second" role="listitem">
            <strong>Клиент не вернулся?</strong>
            <span>Автоматическое напоминание предложит записаться после перерыва.</span>
          </article>
          <article class="recognition__moment recognition__moment--third" role="listitem">
            <strong>Обещали написать позже?</strong>
            <span>Сохраните задачу: контакты и договорённости будут рядом в нужный момент.</span>
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

  const duration = 2500;
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
    <div class="client-story__layout">
      <header class="client-story__intro" data-story-reveal>
        <h2 id="client-story-title"><span>От первого контакта</span><br><em>до следующей встречи</em></h2>
      </header>
      <div class="client-story__carousel" data-client-story role="region" aria-roledescription="карусель" aria-label="Возможности Simple CRM">
        <button class="client-story__arrow client-story__arrow--previous" type="button" aria-label="Предыдущий экран" data-story-previous>${iconSvg('arrow-right')}</button>
        <div class="client-story__viewport" data-story-viewport role="group" tabindex="0" aria-label="Карусель экранов приложения. Проведите влево или вправо либо используйте клавиши со стрелками">
          ${storySteps.map((step, index) => `
            <article class="client-story__slide${index === 0 ? ' is-active' : ''}" data-story-slide="${index}" data-slot="${index <= 2 ? index : index >= storySteps.length - 2 ? index - storySteps.length : 3}" aria-hidden="${index > 2 && index < storySteps.length - 2 ? 'true' : 'false'}">
              <a class="client-story__screen-card" href="${escapeAttribute(step.href)}" aria-label="${escapeAttribute(`${step.title}. Узнать подробнее`)}">
                <div class="client-story__phone">
                  <img src="${escapeAttribute(step.image)}" alt="${escapeAttribute(step.alt)}" width="591" height="1280" loading="eager" decoding="async" data-story-image>
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
  const compactViewport = window.matchMedia('(max-width: 700px), (pointer: coarse)');
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
    if (reducedMotion() || document.hidden || !inView) return;
    restartProgress();
    timer = window.setTimeout(() => activate(current + 1, false), duration);
  };
  const sync = () => {
    if (reducedMotion() || document.hidden || !inView) stop();
    else start();
  };
  const updateDetails = step => {
    title.textContent = step.title;
    copy.textContent = step.text;
    link.href = step.href;
    content.classList.remove('is-entering');
    void content.offsetWidth;
    content.classList.add('is-entering');
  };
  const animateFlow = (slide, fromSlot, toSlot, direction) => {
    const phone = slide?.querySelector('.client-story__phone');
    if (!phone || reducedMotion() || typeof phone.animate !== 'function' || (Math.abs(fromSlot) > 2 && Math.abs(toSlot) > 2)) return;
    phone.getAnimations().forEach(animation => {
      if (animation.id === 'client-story-flow') animation.cancel();
    });
    const prominence = toSlot === 0 ? 1 : .52;
    const drift = direction * (toSlot <= 0 ? -1 : 1);
    const animation = phone.animate([
      { transform: `translate3d(${drift * 10}px, ${12 * prominence}px, 0) rotate(${drift * .8}deg) scale(${1 - .025 * prominence})`, offset: 0 },
      { transform: `translate3d(${drift * -3}px, ${-5 * prominence}px, 0) rotate(${drift * -.22}deg) scale(${1 + .009 * prominence})`, offset: .7 },
      { transform: 'translateY(0) scale(1)', offset: 1 },
    ], {
      duration: 1260,
      easing: 'cubic-bezier(.22, .61, .36, 1)',
    });
    animation.id = 'client-story-flow';
  };
  const activate = (index, userInitiated = true) => {
    const previousIndex = current;
    current = (index + storySteps.length) % storySteps.length;
    let direction = current - previousIndex;
    if (direction > storySteps.length / 2) direction -= storySteps.length;
    if (direction < -storySteps.length / 2) direction += storySteps.length;
    direction = Math.sign(direction) || 1;
    carousel.dataset.direction = direction > 0 ? 'next' : 'previous';
    slides.forEach((slide, position) => {
      const previousSlot = Number(slide.dataset.slot);
      const slot = slotFor(position);
      const visible = Math.abs(slot) <= (compactViewport.matches ? 1 : 2);
      const active = slot === 0;
      slide.dataset.slot = String(slot);
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!visible));
      slide.querySelector('a').tabIndex = visible ? 0 : -1;
      if (current !== previousIndex || userInitiated) animateFlow(slide, previousSlot, slot, direction);
    });
    const step = storySteps[current];
    updateDetails(step);
    start();
  };

  previous.addEventListener('click', event => {
    activate(current - 1);
    event.currentTarget.blur();
  });
  next.addEventListener('click', event => {
    activate(current + 1);
    event.currentTarget.blur();
  });
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

  let pointerGesture = null;
  let suppressClick = false;
  const resetPointerGesture = () => { pointerGesture = null; };
  viewport.addEventListener('pointerdown', event => {
    if (!compactViewport.matches || event.isPrimary === false) return;
    pointerGesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  viewport.addEventListener('pointerup', event => {
    if (!pointerGesture || pointerGesture.id !== event.pointerId) return;
    const deltaX = event.clientX - pointerGesture.x;
    const deltaY = event.clientY - pointerGesture.y;
    const swipeThreshold = Math.max(42, viewport.clientWidth * .12);
    resetPointerGesture();
    if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
    event.preventDefault();
    suppressClick = true;
    activate(current + (deltaX < 0 ? 1 : -1));
    window.setTimeout(() => { suppressClick = false; }, 0);
  }, { passive: false });
  viewport.addEventListener('pointercancel', resetPointerGesture);
  viewport.addEventListener('click', event => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }, true);
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
  section.id = 'client-workspace';
  section.className = 'product-proof';
  section.setAttribute('aria-labelledby', 'product-proof-title');
  section.innerHTML = `
    <div class="container product-proof__layout">
      <div class="product-proof__copy">
        <h2 id="product-proof-title">Продолжайте разговор<br><span>с нужного места</span></h2>
        <p>Клиент возвращается через месяц или ждёт ответ по предложению? В карточке сохранены встречи, задачи и заметки — не придётся перечитывать всю переписку.</p>
      </div>
      <figure class="product-proof__visual" aria-label="Расписание и карточка клиента в приложении Simple CRM">
        <div class="product-proof__fan">
          <div class="product-proof__screen product-proof__screen--back"><img src="${assetUrl('product-screens/today-schedule.jpg')}" alt="Актуальное расписание на сегодня в Simple CRM" width="591" height="1280" loading="eager" decoding="async"></div>
          <div class="product-proof__screen product-proof__screen--front"><img src="${assetUrl('product-screens/client-overview.jpg')}" alt="Карточка клиента в Simple CRM с ближайшей встречей, задачами и данными" width="591" height="1280" loading="eager" decoding="async"></div>
        </div>
        <div class="product-proof__badge product-proof__badge--meeting">
          <span class="product-proof__badge-icon">${iconSvg('calendar')}</span>
          <span><small>Ближайшая встреча</small><strong>Сегодня, 14:30</strong></span>
        </div>
        <div class="product-proof__badge product-proof__badge--client">
          <small>В карточке клиента</small>
          <strong>Встречи · задачи · заметки</strong>
        </div>
        <div class="product-proof__badge product-proof__badge--chart">
          <span class="product-proof__chart-copy"><small>Следующий контакт</small><strong>Уточнить решение</strong></span>
          <span class="product-proof__bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
          <span class="product-proof__chart-labels" aria-hidden="true"><small>звонок</small><small>встреча</small><small>оплата</small></span>
        </div>
        <div class="product-proof__status">${iconSvg('check')}<span>Договорённости сохранены</span></div>
      </figure>
    </div>`;
  return section;
}

function createPaymentGrowthSection() {
  const section = document.createElement('section');
  section.id = 'payments-and-growth';
  section.className = 'payment-growth';
  section.setAttribute('aria-labelledby', 'payment-growth-title');
  section.innerHTML = `
    <div class="container payment-growth__layout" data-story-reveal="payment-group">
      <div class="payment-growth__metric" aria-label="Плюс 30 процентов к продуктивности">
        <strong>+30%</strong>
        <span>к продуктивности</span>
      </div>

      <div class="payment-growth__copy">
        <h2 id="payment-growth-title">Об оплате напомнит CRM</h2>
        <p>Сеанс закончился, а деньги не пришли? Simple CRM сама отправит напоминание в Telegram, MAX или по SMS. Клиент оплачивает по ссылке, приложение узнаёт об оплате и обновляет статус.</p>
      </div>

      <figure class="payment-growth__visual">
        <img src="${assetUrl('editorial/payment-hub-platform-transparent.png')}" alt="Платёжный центр Simple CRM: SMS, счёт, подтверждение и рост поступлений" width="1536" height="1024" loading="lazy" decoding="async">
      </figure>
    </div>`;
  return section;
}


function createReviewsSection() {
  const section = document.createElement('section');
  section.id = 'reviews';
  section.className = 'story-reviews';
  section.setAttribute('aria-labelledby', 'story-reviews-title');
  section.innerHTML = `
    <div class="container">
      <header class="story-reviews__intro" data-story-reveal>
        <h2 id="story-reviews-title">Отзывы</h2>
      </header>
      <div class="story-reviews__wall" role="region" aria-label="Отзывы специалистов. Проведите влево, чтобы посмотреть следующие отзывы" tabindex="0">
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
      <div class="story-start__copy">
        <h2 id="story-start-title">Начните с клиента, которому нужно напомнить</h2>
        <p>Встреча завтра, неоплаченный сеанс или пауза между визитами — выберите свою ситуацию и настройте напоминание.</p>
        <div class="story-start__action">
          <strong>Меньше ручных сообщений. Больше времени на клиентов.</strong>
          <a class="button story-button story-button--light" href="how-to/client-reminders/">Настроить напоминания ${iconSvg('arrow-right')}</a>
        </div>
      </div>
      <div class="story-start__visual">
        <figure class="story-start__photo">
          <img src="${assetUrl('editorial/client-journey-consultation.png')}" alt="Специалист обсуждает с клиентом план дальнейшей работы" width="1536" height="1024" loading="lazy" decoding="async">
        </figure>
        <div class="story-start__context">
          <span class="story-start__context-icon">${iconSvg('contact')}</span>
          <div>
            <strong>Для услуг и продаж</strong>
            <p>Консультация, занятие или обсуждение предложения: история клиента помогает вовремя продолжить работу.</p>
          </div>
        </div>
      </div>
      <nav class="story-start__paths" aria-label="Популярные материалы Simple CRM">
        <a href="how-to/prepare-meeting/">
          <span class="story-start__path-number">01</span>
          <span class="story-start__path-copy"><strong>Подготовить встречу</strong><span>Клиент, время и детали</span></span>
          ${iconSvg('arrow-right')}
        </a>
        <a href="learn/follow-up-after-meeting/">
          <span class="story-start__path-number">02</span>
          <span class="story-start__path-copy"><strong>Сохранить договорённость</strong><span>Итог и важные заметки</span></span>
          ${iconSvg('arrow-right')}
        </a>
        <a href="how-to/create-follow-up-task/">
          <span class="story-start__path-number">03</span>
          <span class="story-start__path-copy"><strong>Назначить следующий шаг</strong><span>Задача, срок и приоритет</span></span>
          ${iconSvg('arrow-right')}
        </a>
        <a class="story-start__path--payment" href="how-to/payment-reminders/">
          <span class="story-start__path-number">04</span>
          <span class="story-start__path-copy"><strong>Напомнить об оплате</strong><span>Сообщение клиенту и статус платежа</span></span>
          ${iconSvg('arrow-right')}
        </a>
      </nav>
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
