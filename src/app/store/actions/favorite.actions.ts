import { Action } from '@ngrx/store';
import { Favorite } from '../../Favorite'
import { Item } from '../../Item'

export enum FavoriteActionTypes {
  LoadFavorites = '[Favorite] Load Favorites',
  LoadFavoritesSuccess = '[Favorite] Load Favorites Success'
}

export class LoadFavorites implements Action {
  readonly type = FavoriteActionTypes.LoadFavorites;
}

export class LoadFavoritesSuccess implements Action {
  readonly type = FavoriteActionTypes.LoadFavoritesSuccess;
  constructor(private payload: Item[]) {

  }
}

export type FavoriteActions = { LoadFavorites, LoadFavoritesSuccess };
