import { Action } from '@ngrx/store';
import { HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Favorite } from '../../Favorite'
import { Item } from '../../Item'

export enum FavoriteActionTypes {
  LoadFavorites = '[Favorite] Load Favorites',
  LoadFavoritesSuccess = '[Favorite] Load Favorites Success',
  NoFavorites = '[Favorite] No Favorites',
  AddToFavorites = '[Favorite] Add To Favorites',
  AddToFavoritesSuccess = '[Favorite] Add To Favorites Success',
  RemoveFromFavorites = '[Favorite] Remove From Favorites',
  RemoveFromFavoritesSuccess = '[Favorite] Remove From Favorites Success'
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

export class AddToFavorites implements Action {
  readonly type = FavoriteActionTypes.AddToFavorites;
  constructor(public payload: Item) {

  }
}

export class AddToFavoritesSuccess implements Action {
  readonly type = FavoriteActionTypes.AddToFavoritesSuccess;
}

export class RemoveFromFavorites implements Action {
  readonly type = FavoriteActionTypes.RemoveFromFavorites;
  constructor(public payload: Item) {

  }
}

export class RemoveFromFavoritesSuccess implements Action {
  readonly type = FavoriteActionTypes.RemoveFromFavoritesSuccess;
}

export type FavoriteActions = { LoadFavorites, LoadFavoritesSuccess, NoFavorites, AddToFavorites, AddToFavoritesSuccess, RemoveFromFavorites, RemoveFromFavoritesSuccess };


