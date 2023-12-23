export enum BASE_ROUTES {
  Home = "/",
  Events = "/events",
  Locations = "/clubs",
  Cart = "/cart",
}

export const appRoutes = {
  home: BASE_ROUTES.Home,
  searchEvents: BASE_ROUTES.Events,
  event: `${BASE_ROUTES.Events}/:id`,
  searchLocation: `${BASE_ROUTES.Locations}`,
  location: `${BASE_ROUTES.Locations}/:id`,
  cart: BASE_ROUTES.Cart,
};
