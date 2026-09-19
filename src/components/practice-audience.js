import { iconSvg } from './icons.js?v=20260824-28';
import { createPracticePhoto } from './practice-media.js?v=refinement2';

// Illustrative scenes, not portraits or testimonials of actual customers.
const practicePeople = [
  {
    image: 'practice-psychologist',
    alt: 'Психолог внимательно слушает взрослого клиента в кабинете',
    title: 'Психологам и коучам',
    href: '#story-return',
    linkLabel: 'Узнать про следующий контакт',
    copy: 'Договорились связаться через неделю? Важно вернуться к разговору в нужный момент, а не случайно вспомнить о нём через месяц.',
  },
  {
    image: 'practice-trainer',
    alt: 'Тренер и клиентка обсуждают следующее занятие в небольшой студии',
    title: 'Тренерам и инструкторам',
    href: '#story-payment',
    linkLabel: 'Узнать про предоплату',
    copy: 'Клиент перенёс тренировку. Теперь нужно проверить новое время и разобраться, за какое занятие уже внесена оплата.',
  },
  {
    image: 'practice-mentor',
    alt: 'Наставница и взрослая ученица вместе работают за столом',
    title: 'Репетиторам и консультантам',
    href: '#story-booking',
    linkLabel: 'Узнать про запись по ссылке',
    copy: 'Одному удобно утром, другому — после работы. Хочется согласовать время без длинной переписки.',
  },
];

export function createPracticeAudience() {
  const section = document.createElement('section');
  section.id = 'for-whom';
  section.className = 'practice-audience';
  section.setAttribute('aria-labelledby', 'practice-audience-title');
  section.innerHTML = `<div class="container">
    <header class="practice-audience__intro" data-reveal>
      <h2 id="practice-audience-title">Когда за каждой записью — человек</h2>
      <p>Консультации, тренировки, занятия и личные встречи. Организационные вопросы похожи, даже если ваша работа разная.</p>
    </header>
    <div class="practice-audience__grid">
      ${practicePeople.map((person, index) => `<a class="practice-person" href="${person.href}" aria-labelledby="practice-person-title-${index} practice-person-link-${index}" data-reveal="slide-up" data-delay="${index * 100}">
        <figure class="practice-person__figure">
          <div class="practice-person__image"></div>
          <figcaption>
            <h3 id="practice-person-title-${index}">${person.title}</h3><p>${person.copy}</p>
            <span class="practice-person__cta" id="practice-person-link-${index}"><span>${person.linkLabel}</span>${iconSvg('arrow-right')}</span>
          </figcaption>
        </figure>
      </a>`).join('')}
    </div>
    <div class="practice-audience__footnote">
      <p>И другим специалистам, к которым возвращаются на встречи: очно или онлайн.</p>
    </div>
  </div>`;
  section.querySelectorAll('.practice-person__image').forEach((host, index) => {
    const person = practicePeople[index];
    host.append(createPracticePhoto(person.image, person.alt));
  });
  return section;
}
