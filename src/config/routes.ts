export const ROUTES = {
  HOME: '/',
  SPACES: '/spaces',
  SPACE_DETAILS: '/spaces/:id',
  RESERVATIONS: '/reservations',
  SUCCESS_CASES: '/success-cases',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
} as const;

export type AppRoutes = typeof ROUTES;
export type RoutePath = AppRoutes[keyof AppRoutes]; 