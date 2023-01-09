import { createReducer, on } from '@ngrx/store';
import { HouseAction } from './house.actions';

export const initialState = {
  isLoggedIn: false,
};

export const HouseReducer = createReducer(
  initialState,
  on(HouseAction.getHouse, (state, { data }) => data),
  on(HouseAction.getHouses, (state, {data}) => data)
);
