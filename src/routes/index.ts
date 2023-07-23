export enum APP_ROUTES {
  LOGIN = 'LOGIN',
  DASHBOARD = 'Dashboard',
  MANAGE_CATEGORIES = 'Manage Categories',
}

export type MainStackParams = {
  List: undefined;
  [APP_ROUTES.MANAGE_CATEGORIES]: {Id: string | number};
};
