import { createReducer, on } from '@ngrx/store';
import { RegisTokenAction } from './regisToken.action';

export const initialState: any = undefined;

export const regisTokenReducer = createReducer(
  initialState,
  on(RegisTokenAction.getRegistrationtoken, (state, { data }) =>  data),

);
