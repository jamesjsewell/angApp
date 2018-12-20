import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromFavorites from './favorite.reducer';

export interface State {

  favorites: fromFavorites.State;
}

export const reducers: ActionReducerMap<State> = {

  favorites: fromFavorites.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectFavoritesState = createFeatureSelector<fromFavorites.State>('favorites');
export const getShouldLoadFavorites = createSelector(selectFavoritesState, fromFavorites.getShouldLoadFavorites);
export const getFavorites = createSelector(selectFavoritesState, fromFavorites.getFavorites)


