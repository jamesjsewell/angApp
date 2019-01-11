import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromFavorites from './favorite.reducer';
import * as fromItems from './item.reducer';

export interface State {

  favorites: fromFavorites.State;
  items: fromItems.State;
}

export const reducers: ActionReducerMap<State> = {

  favorites: fromFavorites.reducer,
  items: fromItems.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectFavoritesState = createFeatureSelector<fromFavorites.State>('favorites');
export const getFavorites = createSelector(selectFavoritesState, fromFavorites.getFavorites);
export const selectItemsState = createFeatureSelector<fromItems.State>('items');
export const getItems = createSelector(selectItemsState, fromItems.getItems);


