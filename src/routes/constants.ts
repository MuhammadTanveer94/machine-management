const RouteContants = (() => {
  enum PATH {
    MAIN_ROUTE = 'MAIN_ROUTE',
    DASHBOARD = 'DASHBOARD',
    MANAGE_CATEGORIES = 'MANAGE_CATEGORIES',
    CATEGORY = 'CATEGORY',
  }
  const DRAWER_ITEMS = [
    {
      drawerLabel: 'Dashboard',
      route: PATH.DASHBOARD,
      available: true,
      params: {
        own: true,
      },
    },
    {
      route: PATH.CATEGORY,
      available: true,
      hasMultiple: true,
      params: {
        own: true,
      },
    },
    {
      drawerLabel: 'Manage Categories',
      route: PATH.MANAGE_CATEGORIES,
      available: true,
      params: {
        own: true,
      },
    },
  ];
  return {
    PATH,
    DRAWER_ITEMS,
  };
})();

export default RouteContants;
