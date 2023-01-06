import { createActionGroup, props } from '@ngrx/store';

export const RegisTokenAction = createActionGroup({
  source: '',
  events: {
    'Get RegistrationToken': props<{ data: any }>(),
  },
});
