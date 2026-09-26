// Module-relative URLs work under both localhost and the GitHub Pages prefix.
export function createPracticePhoto(id, alt) {
  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.type = 'image/webp';
  source.srcset = [640, 960].map(width => `${new URL(`../../assets/practice-refinement/${id}-${width}.webp`, import.meta.url).href} ${width}w`).join(', ');
  source.sizes = '(max-width: 800px) calc(100vw - 48px), (max-width: 1240px) 33vw, 380px';
  const image = document.createElement('img');
  image.src = new URL(`../../assets/editorial/${id}.jpg`, import.meta.url).href;
  image.alt = alt;
  image.width = 1536;
  image.height = 1024;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    if (source.isConnected) source.remove();
  }, { once: true });
  picture.append(source, image);
  return picture;
}

export function createPracticeScreen(id, alt, { loading = 'lazy' } = {}) {
  const picture = document.createElement('picture');
  picture.className = 'practice-screen';
  const screens = {
    'r01-today': 'tasks-list.jpg',
    'r02-client': 'client-activity.jpg',
    'r03-message': 'new-task-details.jpg',
    'r04a-sent': 'tasks-compact.jpg',
    'p01-meeting': 'meeting-details.jpg',
    'p02-invoice': 'reports.jpg',
    'p04-client-prepayment': 'reports.jpg',
    'p05b-prepayment-received': 'reports.jpg',
    'b01-availability': 'calendar-week.jpg',
    'b02-client-time': 'calendar-list.jpg',
    'b03-client-review': 'new-meeting.jpg',
    'b04-client-confirmed': 'meeting-details.jpg',
  };
  const image = document.createElement('img');
  image.src = new URL(`../../assets/product-screens/${screens[id] || 'client-overview.jpg'}`, import.meta.url).href;
  image.alt = alt;
  image.width = 591;
  image.height = 1280;
  image.loading = loading;
  image.decoding = 'async';
  image.addEventListener('error', () => {
    const fallback = document.createElement('p');
    fallback.className = 'practice-screen__fallback';
    fallback.textContent = 'Изображение не загрузилось. Содержание шага описано рядом.';
    picture.replaceChildren(fallback);
  }, { once: true });
  picture.append(image);
  return picture;
}
