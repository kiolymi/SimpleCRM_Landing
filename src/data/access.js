// Fail-closed until the owner confirms an actual installation/contact channel.
// This is navigation to examples, not registration or request delivery.
export const accessConfig = Object.freeze({
  status: 'unconfigured',
  primary: { label: 'Посмотреть сценарии', href: '/#practice' },
  secondary: { label: 'Как начать', href: '/#start' },
  deliveryVerified: false,
});
