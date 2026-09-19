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
  const source = document.createElement('source');
  source.type = 'image/webp';
  source.srcset = new URL(`../../assets/practice-refinement/${id}-780.webp`, import.meta.url).href;
  const image = document.createElement('img');
  image.src = new URL(`../../assets/practice-refinement/${id}.png`, import.meta.url).href;
  image.alt = alt;
  image.width = 780;
  image.height = 1688;
  image.loading = loading;
  image.decoding = 'async';
  image.addEventListener('error', () => {
    if (source.isConnected) {
      source.remove();
      image.src = image.src;
    } else {
      const fallback = document.createElement('p');
      fallback.className = 'practice-screen__fallback';
      fallback.textContent = 'Изображение не загрузилось. Содержание шага описано рядом.';
      picture.replaceChildren(fallback);
    }
  });
  picture.append(source, image);
  return picture;
}
