import { Action } from '@ngrx/store';
import { Favorite } from '../../Favorite'

export enum FavoriteActionTypes {
  LoadFavorites = '[Favorite] Load Favorites',
  ShouldLoadFavorites = '[Favorite] Should Load Favorites',
  ShouldNotLoadFavorites = '[Favorite] Should Not Load Favorites',
  StoreFavorites = '[Favorite] Store Favorites'
}

export class LoadFavorites implements Action {
  readonly type = FavoriteActionTypes.LoadFavorites;
}

export class ShouldLoadFavorites implements Action {
  readonly type = FavoriteActionTypes.ShouldLoadFavorites;
}

export class ShouldNotLoadFavorites implements Action {
  readonly type = FavoriteActionTypes.ShouldNotLoadFavorites;
}

export class StoreFavorites implements Action {
  readonly type = FavoriteActionTypes.StoreFavorites;
  constructor(private payload: Favorite[]) {

  }
}

export type FavoriteActions = { LoadFavorites, ShouldLoadFavorites, ShouldNotLoadFavorites, StoreFavorites };
