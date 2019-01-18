import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as UID from 'uuid/v1'
import { Observable, of} from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import * as fromStore from '../reducers';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Favorite } from '../../Favorite'
import { Item } from '../../Item'
import * as favoriteActions from '../actions/favorite.actions';
import * as itemActions from '../actions/favorite.actions';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

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
            console.log(this.itemIds)
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
      const favoriteId = UID()
      return this.http.post<Favorite>(this.favoritesUrl, { id: favoriteId, itemId: action.payload.id } )
        .pipe(
          map((response: Favorite) => {
            action.payload.favorited = true
            action.payload.favoriteId = favoriteId
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

  @Effect()
  public removeFromFavorites$ = this.actions$.pipe(
    ofType(favoriteActions.FavoriteActionTypes.RemoveFromFavorites),
    switchMap((action: favoriteActions.RemoveFromFavorites ) => {
      action.payload.loading = true
      return this.http.delete<Favorite>(`${this.favoritesUrl}/${action.payload.favoriteId}` )
        .pipe(
          map((response: Favorite) => {
            action.payload.favoriteId = ""
            action.payload.favorited = false
            action.payload.loading = false
            return new favoriteActions.RemoveFromFavoritesSuccess()
          }),
          catchError((error) => {
            return of({
              type: "",
              payload: { error }
            });
          })
        )

    })

  )

  @Effect()
  public removeFromFavoritesSuccess$ = this.actions$.pipe(
    ofType(favoriteActions.FavoriteActionTypes.RemoveFromFavoritesSuccess),
    map((_) => {
      return new favoriteActions.LoadFavorites()
    })
  )


}
