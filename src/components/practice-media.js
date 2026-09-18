// Module-relative URLs work under both localhost and the GitHub Pages prefix.
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
