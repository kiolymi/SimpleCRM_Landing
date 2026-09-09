import { iconSvg } from './icons.js?v=20260824-28';
import { createProductDeviceMockup } from './product-device-mockup.js?v=20260906-1';

const appointment = new URL('../../assets/editorial/private-practice-appointments.png', import.meta.url).href;
const payments = new URL('../../assets/editorial/private-practice-payments.png', import.meta.url).href;

// These are illustrations of practitioner actions, not a live app or automation.
export const practiceScenarios = [
  {
    id: 'agreements', label: 'Договорённости', icon: 'task-list',
    title: 'О чём договорились?',
    problem: 'Разговор помните. Следующий шаг — уже нет.',
    action: 'Запишите задачу с датой прямо у клиента.',
    href: '/learn/follow-up-after-meeting/', link: 'Как сохранить договорённости',
    artwork: appointment, variant: 'appointments',
    image: new URL('../../simple-crm-landing-screens/23-task-detail.png', import.meta.url).href,
    alt: 'Задача в Simple CRM: что сделать, для какого клиента и когда напомнить',
  },
  {
    id: 'reschedule', label: 'Перенос встречи', icon: 'calendar',
    title: 'В чате перенесли. А в календаре?',
    problem: 'Новое время теряется среди сообщений.',
    action: 'Обновите встречу: дата, место и клиент будут рядом.',
    href: '/how-to/prepare-meeting/', link: 'Как оформить встречу',
    artwork: appointment, variant: 'appointments',
    image: new URL('../../simple-crm-landing-screens/12-meeting-detail.png', import.meta.url).href,
    alt: 'Детали встречи в Simple CRM: клиент, время и формат',
  },
  {
    id: 'payment', label: 'Оплата', icon: 'receipt',
    title: 'Эта встреча оплачена?',
    problem: 'Не вспоминайте, за что пришёл перевод.',
    action: 'Проверьте счёт и последнюю оплату в карточке клиента.',
    href: '/learn/client-context/', link: 'Что хранить у клиента',
    artwork: payments, variant: 'payments',
    image: new URL('../../simple-crm-landing-screens/25-payments.png', import.meta.url).href,
    alt: 'Платежи в Simple CRM: неоплаченный счёт и история оплат',
  },
  {
    id: 'reconnect', label: 'Связаться снова', icon: 'message-square',
    title: '«Я запишусь позже»',
    problem: 'Разговор затих. Вы хотели вернуться к нему.',
    action: 'Поставьте себе задачу — кому и когда написать.',
    href: '/how-to/create-follow-up-task/', link: 'Как запланировать контакт',
    artwork: payments, variant: 'payments',
    image: new URL('../../simple-crm-landing-screens/24-create-task.png', import.meta.url).href,
    alt: 'Создание задачи в Simple CRM: действие, дата и клиент',
  },
];

function createPracticeScene({ artwork, image, alt, variant }) {
  const scene = document.createElement('div');
  scene.className = `practice-scene practice-scene--${variant}`;
  scene.innerHTML = `<img class="practice-scene__background" src="${artwork}" alt="" width="1536" height="1024" loading="lazy" decoding="async">
    <div class="practice-scene__device"></div>
    <span class="practice-scene__glint" aria-hidden="true"></span>`;
  scene.querySelector('.practice-scene__device').append(createProductDeviceMockup({
    mode: 'image', device: 'phone', image: { src: image }, alt,
  }));
  return scene;
}

// One selected scenario at a time. Native buttons also work on touch screens.
export function wirePracticeTabs(section) {
  const tabs = [...section.querySelectorAll('[role="tab"]')];
  const panels = [...section.querySelectorAll('[role="tabpanel"]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let transition;
  const select = index => {
    if (index === selected) return;
    transition?.cancel();
    tabs.forEach((tab, position) => {
      tab.setAttribute('aria-selected', String(position === index));
      tab.tabIndex = position === index ? 0 : -1;
      panels[position].hidden = position !== index;
    });
    selected = index;
    if (!reduceMotion.matches && typeof panels[index].animate === 'function') {
      transition = panels[index].animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 450, easing: 'ease-out',
      });
    }
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus({ preventScroll: true });
      select(next);
    });
  });
}

export function createPracticeStories() {
  const section = document.createElement('section');
  section.id = 'practice';
  section.className = 'practice-stories';
  section.setAttribute('aria-labelledby', 'practice-title');
  section.innerHTML = `<div class="container">
    <header class="practice-stories__intro" data-reveal>
      <h2 id="practice-title">«Где мы это записали?»</h2>
      <p>Выберите знакомую ситуацию.</p>
    </header>
    <div class="practice-explorer">
      <div class="practice-explorer__tabs" role="tablist" aria-label="Ситуации в работе с клиентами">
        ${practiceScenarios.map((scenario, index) => `<button class="practice-explorer__tab" type="button" role="tab" id="practice-tab-${scenario.id}" aria-controls="practice-panel-${scenario.id}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">${iconSvg(scenario.icon)}<span>${scenario.label}</span></button>`).join('')}
      </div>
      <div class="practice-explorer__panels">
        ${practiceScenarios.map((scenario, index) => `<div class="practice-story" role="tabpanel" id="practice-panel-${scenario.id}" aria-labelledby="practice-tab-${scenario.id}" tabindex="0"${index === 0 ? '' : ' hidden'}>
          <div class="practice-story__art"></div>
          <div class="practice-story__copy">
            <article class="practice-situation">
              <h3>${scenario.title}</h3>
              <p>${scenario.problem}</p>
              <div class="practice-situation__solution">${iconSvg('check')}<p>${scenario.action}</p></div>
            </article>
            <a class="text-link" href="${scenario.href}">${scenario.link} ${iconSvg('arrow-right')}</a>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
  practiceScenarios.forEach(scenario => {
    section.querySelector(`#practice-panel-${scenario.id} .practice-story__art`).append(createPracticeScene(scenario));
  });
  wirePracticeTabs(section);
  return section;
}
