import { createActionGroup, props } from '@ngrx/store';

export const UserAction = createActionGroup({
  source: '',
  events: {
    'Get User': props<{ data: any }>(),
    'Log In User': props<{ data: any }>(),
    'Log Out User': props<{ user: any }>(),
    'Update User': props<{ user: any }>(),
  },
});
