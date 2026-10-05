const appStoreBadgeUrl = new URL('../../assets/brand/download-on-app-store-ru.svg', import.meta.url).href;

export function appStoreBadgeMarkup(additionalClass = '') {
  const className = ['app-store-badge', additionalClass].filter(Boolean).join(' ');
  return `
    <button class="${className}" type="button" data-download-placeholder aria-haspopup="dialog" aria-label="Скачать Simple CRM в App Store">
      <img src="${appStoreBadgeUrl}" alt="" width="120" height="40" loading="eager" decoding="async">
    </button>
  `;
}
