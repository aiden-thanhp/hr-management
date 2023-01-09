import { createActionGroup, props } from '@ngrx/store';

export const ReportAction = createActionGroup({
  source: '',
  events: {
    'Get Report': props<{ data: any }>(),
  },
});
