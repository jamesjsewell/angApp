import { Action } from '@ngrx/store';
import { HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Favorite } from '../../Favorite'
import { Item } from '../../Item'

export enum FavoriteActionTypes {
  LoadFavorites = '[Favorite] Load Favorites',
  LoadFavoritesSuccess = '[Favorite] Load Favorites Success',
  NoFavorites = '[Favorite] No Favorites'
}

export class LoadFavorites implements Action {
  readonly type = FavoriteActionTypes.LoadFavorites;
}

export class LoadFavoritesSuccess implements Action {
  readonly type = FavoriteActionTypes.LoadFavoritesSuccess;
  constructor(private payload: Item[]) {

  }
}

export class NoFavorites implements Action {
  readonly type = FavoriteActionTypes.NoFavorites;
}

export type FavoriteActions = { LoadFavorites, LoadFavoritesSuccess, NoFavorites };


