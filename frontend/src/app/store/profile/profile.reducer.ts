import { createReducer, on } from '@ngrx/store';
import { ProfileAction } from './profile.action';

export const initialState: any = undefined;

export const profileReducer = createReducer(
    initialState,
    on(ProfileAction.getProfile, (state, { data }) =>  data),
);
