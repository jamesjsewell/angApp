import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { HttpClient } from "@angular/common/http";
import * as UID from 'uuid/v1'
import { Observable, of} from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import * as fromStore from '../reducers';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Favorite } from '../../Favorite'
import { Item } from '../../Item'
import * as favoriteActions from '../actions/favorite.actions';
import * as itemActions from '../actions/favorite.actions';

@Injectable()
export class FavoritesEffects {
  favoritesUrl = 'api/favorites'
  itemsUrl = 'api/items'
  items$: Observable<object[]>;
  itemIds: Number[]
  constructor(private store: Store<fromStore.State>, private actions$: Actions,
    private http: HttpClient) { }

  @Effect()
  public loadFavorites$ = this.actions$.pipe(
    ofType(favoriteActions.FavoriteActionTypes.LoadFavorites),
    switchMap(() =>
      this.http.get<Favorite[]>(this.favoritesUrl)
        .pipe(
          switchMap( (response: Favorite[] )=> {

            this.itemIds = response.map((fav)=>{
              return fav.itemId
            })

            return this.items$ = this.store.select(fromStore.getItems)

          }),
          map((items: Item[]) => {

            if(items.length){

              let filteredItems = []
              items.forEach((item)=>{
                if(this.itemIds.includes(item.id)){
                  item.favorited = true
                  filteredItems.push(item)
                }
              })

              return new favoriteActions.LoadFavoritesSuccess(filteredItems)

            }
            else{
              return new favoriteActions.NoFavorites()
            }

          }),
          catchError((error) => {
            return of({
              type: "",
              payload: { error }
            });
          })
          )
      )
    )

  @Effect()
  public addToFavorites$ = this.actions$.pipe(
    ofType(favoriteActions.FavoriteActionTypes.AddToFavorites),
    switchMap((action: favoriteActions.AddToFavorites ) => {
      action.payload.loading = true
      return this.http.post<Favorite>(this.favoritesUrl, { id: UID(), itemId: action.payload.id } )
        .pipe(
          map((response: Favorite) => {
            action.payload.favorited = true
            action.payload.loading = false
            return new favoriteActions.AddToFavoritesSuccess()
          }),
          catchError((error) => {
            return of({
              type: "",
              payload: { error }
            });
          })
        )

        }
      )

  )

  @Effect()
  public addToFavoritesSuccess$ = this.actions$.pipe(
    ofType(favoriteActions.FavoriteActionTypes.AddToFavoritesSuccess),
    map((_) => {
      return new favoriteActions.LoadFavorites()
    })
  )
}
