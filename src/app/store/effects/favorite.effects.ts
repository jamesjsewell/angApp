import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import * as fromStore from '../reducers';
import { catchError, map, mergeMap, switchMap, flatMap } from 'rxjs/operators';
import { Favorite } from '../../Favorite'
import { Item } from '../../Item'
import * as favoriteActions from '../actions/favorite.actions';
import * as itemActions from '../actions/favorite.actions';


@Injectable()
export class FavoritesEffects {
  favoritesUrl = 'api/favorites'
  itemsUrl = 'api/items'
  constructor(private store: Store<fromStore.State>, private actions$: Actions,
    private http: HttpClient) { }

  @Effect()
  loadFavorites$: Observable<Action> = this.actions$.pipe(
    ofType(favoriteActions.FavoriteActionTypes.LoadFavorites),
    switchMap(() => {
      return this.http.get<Favorite[]>(this.favoritesUrl)
        .pipe(
          map( response => {
            var itemIds = response.map((fav)=>{
              return fav.itemId
            })
            return itemIds
          })
        )
    }),
    switchMap((itemIds: Number[]) => {
      return this.http.get<Item[]>(this.itemsUrl)
        .pipe(
          map( (items: Item[] ) => {
            var filteredItems = items.filter(item => itemIds.includes(item.id)? item : null)
            return new favoriteActions.LoadFavoritesSuccess(filteredItems)
          })
        )
    })
  )

}


