export const Routes = {
  home: '/',
  checkout: '/checkout',
  checkoutDigital: '/checkout/digital',
  checkoutGuest: '/checkout/guest',
  profile: '/profile',
  verifyEmail: '/verify-email',
  changePassword: '/change-password',
  orders: '/orders',
  order: (tracking_number: string) =>
    `/orders/${encodeURIComponent(tracking_number)}`,
  refunds: '/refunds',
  help: '/help',
  logout: '/logout',
  coupons: '/offers',
  orderReceived: '/order-received',
  products: '/products',
  product: (slug: string) => {
    // if (asPath) {
    //   return `/products/${encodeURIComponent(slug)}?type=${asPath}`;
    // }
    return `/products/${encodeURIComponent(slug)}`;
  },
  category: (type: string ,slug: string) => {
    return `/${type}/search/?category=${slug}`;
  },
  privacy: '/privacy',
  terms: '/terms',
  refund: '/refunds-and-return',
  shippingPolicy: '/shipping-policy',
  sellerTermsAndConditions: '/seller-terms-and-conditions',
  refundPolicies: '/refund-policies',
  customerRefundPolicies: '/customer-refund-policies',
  vendorRefundPolicies: '/vendor-refund-policies',
  contactUs: '/contact',
  shops: '/shops',
  cards: '/cards',
  shop: (slug: string) => `/shops/${encodeURIComponent(slug)}`,
  downloads: '/downloads',
  authors: '/authors',
  author: (slug: string) => `/authors/${encodeURIComponent(slug)}`,
  manufacturers: '/manufacturers',
  manufacturer: (slug: string) => `/manufacturers/${encodeURIComponent(slug)}`,
  nearByShop: ({ lat, lng }: { lat: string; lng: string }) =>
    `/shops/search?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(
      lng
    )}`,
  search: '/search',
  wishlists: '/wishlists',
  questions: '/questions',
  reports: '/reports',
  flashSaleSingle: (slug: string) => `/flash-sales/${encodeURIComponent(slug)}`,
  flashSale: '/flash-sales',
};
