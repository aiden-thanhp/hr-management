import { createReducer, on } from '@ngrx/store';
import { UserAction } from './user.actions';

export const initialState = {
  isLoggedIn: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserAction.getUser, (state, { data }) => {
    return { ...data.user, isLoggedIn: true };
  }),
  on(UserAction.logInUser, (state, { data }) => {
    return { ...data.user, isLoggedIn: true };
  }),
  on(UserAction.logOutUser, (state, { user }) => {
    return { ...user, isLoggedIn: false };
  })
);
