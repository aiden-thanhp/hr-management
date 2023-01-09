import { createActionGroup, props } from '@ngrx/store';

export const HouseAction = createActionGroup({
  source: '',
  events: {
    'Get House': props<{ data: any }>(),
    'Get Houses': props<{ data: any }>(),
  },
});
