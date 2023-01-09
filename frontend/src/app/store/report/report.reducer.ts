import { createReducer, on } from '@ngrx/store';
import { ReportAction } from './report.actions';

export const initialState = {
  isLoggedIn: false,
};

export const ReportReducer = createReducer(
  initialState,
  on(ReportAction.getReport, (state, { data }) => data),
);
