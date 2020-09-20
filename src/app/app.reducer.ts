import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { loadedGroups } from './app.actions';


export const appFeatureKey = 'app';

export interface AppState {
  app: {
    groups: IGroupItem[];
    currentGroup: ICardInfo[] | null;
    cardsInCurrentGroup: ICardInfo[] | null;
    currentCard: ICardInfo | null;
  };
}


export const initialState: AppState = {
  app: {
    groups: [],
    currentGroup: null,
    cardsInCurrentGroup: null,
    currentCard: null
  }
};

export const appReducer = createReducer(
  initialState,
  on(loadedGroups, (state, { groups }) => ({ ...state, groups })),
);

export const selectApp = ({ app }: AppState) => app;

export const selectGroups = createSelector(selectApp, ({ groups }) => groups);
export const selectCurrentGroup = createSelector(selectApp, ({ currentGroup }) => currentGroup);
export const selectCardsInCurrentGroup = createSelector(selectApp, ({ cardsInCurrentGroup }) => cardsInCurrentGroup);
export const selectCurrentCard = createSelector(selectApp, ({ currentCard }) => currentCard);

