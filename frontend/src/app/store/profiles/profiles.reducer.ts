import { createReducer, on } from '@ngrx/store';
import { ProfilesAction } from './profiles.action';

export const initialState: any = undefined;

export const profilesReducer = createReducer(
    initialState,
    on(ProfilesAction.getProfiles, (state, { data }) =>  data),
);
