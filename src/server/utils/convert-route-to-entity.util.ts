const mapping: Record<string, string> = {
  appointments: 'appointment',
  businesses: 'business',
  'cash-boxes': 'cash_box',
  commissions: 'commission',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
