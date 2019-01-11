import { Action } from '@ngrx/store';
import * as favoritesActions from '../actions/favorite.actions';
import { Favorite } from '../../Favorite'

export interface State {
  favorites: Favorite[]
}

export const initialState: State = {
  favorites: []
}

export function reducer(state = initialState, action): State {
  switch (action.type) {

    case favoritesActions.FavoriteActionTypes.LoadFavorites:
      return {
        ...state
      }

    case favoritesActions.FavoriteActionTypes.LoadFavoritesSuccess:
      return {
        ...state,
        favorites: action.payload
      }

    default:
      return state;
  }
}

export const getFavorites = (state: State) => state.favorites;

