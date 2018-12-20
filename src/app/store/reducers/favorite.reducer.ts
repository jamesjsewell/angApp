import { Action } from '@ngrx/store';
import * as favoritesActions from '../actions/favorite.actions';
import { Favorite } from '../../Favorite'

export interface State {
  shouldLoadFavorites?: boolean
  favorites: Favorite[]
}

export const initialState: State = {
  shouldLoadFavorites: true,
  favorites: []
}

export function reducer(state = initialState, action): State {
  switch (action.type) {

    case favoritesActions.FavoriteActionTypes.LoadFavorites:
      return {
        ...state,
        shouldLoadFavorites: false
      }

    case favoritesActions.FavoriteActionTypes.ShouldLoadFavorites:
      return {
        ...state,
        shouldLoadFavorites: true
      }

    case favoritesActions.FavoriteActionTypes.ShouldNotLoadFavorites:
      return {
        ...state,
        shouldLoadFavorites: false
      }

    case favoritesActions.FavoriteActionTypes.StoreFavorites:
      return {
        ...state,
        favorites: action.payload
      }



    default:
      return state;
  }
}

export const getShouldLoadFavorites = (state: State) => state.shouldLoadFavorites;


