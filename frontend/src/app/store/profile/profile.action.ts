import { createActionGroup, props } from '@ngrx/store';

export const ProfileAction = createActionGroup({
    source: '',
    events: {
        'Get Profile': props<{ data: any }>(),
    },
});
