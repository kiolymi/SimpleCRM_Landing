import { iconSvg } from './icons.js?v=20260824-28';

// Illustrative scenes, not portraits or testimonials of actual customers.
const practicePeople = [
  {
    image: new URL('../../assets/editorial/practice-psychologist.jpg', import.meta.url).href,
    alt: 'Психолог внимательно слушает взрослого клиента в кабинете',
    title: 'Психологам и коучам',
    href: '/learn/client-context/',
    linkLabel: 'Узнать об истории клиента',
    copy: 'Время консультации, договорённости о следующей встрече, сообщение, на которое нужно ответить. Пусть эти детали будут рядом с клиентом, а не в разных переписках.',
  },
  {
    image: new URL('../../assets/editorial/practice-trainer.jpg', import.meta.url).href,
    alt: 'Тренер и клиентка обсуждают следующее занятие в небольшой студии',
    title: 'Тренерам и инструкторам',
    href: '/how-to/prepare-meeting/',
    linkLabel: 'Узнать о планировании встреч',
    copy: 'Согласовать перенос, проверить время тренировки и оплату. Организационные вопросы тоже требуют внимания — и не должны теряться между занятиями.',
  },
  {
    image: new URL('../../assets/editorial/practice-mentor.jpg', import.meta.url).href,
    alt: 'Наставница и взрослая ученица вместе работают за столом',
    title: 'Репетиторам и консультантам',
    href: '/how-to/create-follow-up-task/',
    linkLabel: 'Узнать о следующем шаге',
    copy: 'Вспомнить, на чём остановились, что договорились сделать и когда созвониться снова. Сохраните переписку и следующий шаг, чтобы не начинать каждый разговор с поиска.',
  },
];

export function createPracticeAudience() {
  const section = document.createElement('section');
  section.id = 'for-whom';
  section.className = 'practice-audience';
  section.setAttribute('aria-labelledby', 'practice-audience-title');
  section.innerHTML = `<div class="container">
    <header class="practice-audience__intro" data-reveal>
      <h2 id="practice-audience-title">Для тех, кто работает с людьми лично</h2>
      <p>Simple CRM помогает психологам, коучам, тренерам, репетиторам, наставникам и консультантам вести клиентскую базу, встречи и оплаты.</p>
    </header>
    <div class="practice-audience__grid">
      ${practicePeople.map((person, index) => `<a class="practice-person" href="${person.href}" aria-labelledby="practice-person-title-${index} practice-person-link-${index}" data-reveal="slide-up" data-delay="${index * 100}">
        <figure class="practice-person__figure">
          <div class="practice-person__image"><img src="${person.image}" alt="${person.alt}" width="1536" height="1024" loading="lazy" decoding="async"></div>
          <figcaption>
            <h3 id="practice-person-title-${index}">${person.title}</h3><p>${person.copy}</p>
            <span class="practice-person__cta" id="practice-person-link-${index}"><span>${person.linkLabel}</span>${iconSvg('arrow-right')}</span>
          </figcaption>
        </figure>
      </a>`).join('')}
    </div>
    <div class="practice-audience__footnote">
      <p>И другим специалистам с постоянными клиентами и индивидуальными встречами — очно или онлайн.</p>
    </div>
  </div>`;
  return section;
}
