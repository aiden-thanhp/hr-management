import { createActionGroup, props } from '@ngrx/store';

export const ProfilesAction = createActionGroup({
    source: '',
    events: {
        'Get Profiles': props<{ data: any }>(),
    },
});
