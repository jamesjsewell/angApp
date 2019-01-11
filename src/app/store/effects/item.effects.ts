import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "@angular/common"
import { Observable, of} from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import * as fromStore from '../reducers';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Item } from '../../Item'
import * as itemActions from '../actions/item.actions';
import * as favoriteActions from '../actions/favorite.actions'

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable()
export class ItemsEffects {
  itemsUrl = 'api/items'
  favoritesUrl = 'api/favorites'
  items$: Observable<object[]>
  itemIds: Number[]
  constructor(
    private store: Store<fromStore.State>,
    private actions$: Actions,
    private http: HttpClient,
    private location: Location
  ) { }

  @Effect()
  public addItem$ = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.AddItem),
    switchMap(( action: itemActions.AddItem) =>
      this.http.post<Item>(this.itemsUrl, action.payload, httpOptions)
        .pipe(
          map(( createdItem ) => {
            if(createdItem && createdItem.id) return new itemActions.AddItemSuccess(createdItem)
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
  public loadItems$ = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.LoadItems),
    switchMap(() =>
      this.http.get<Item[]>(this.itemsUrl)
        .pipe(
          map(( items ) => {
            if(items.length){
              return new itemActions.LoadItemsSuccess(items)
            }
            else{
              return new itemActions.NoItems()
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
  public loadItemsSuccess$ = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.LoadItemsSuccess),
    map(() => new favoriteActions.LoadFavorites())
  )

  @Effect()
  public updateItem$ = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.UpdateItem),
    switchMap(( action: itemActions.UpdateItem) =>
      this.http.put<Item>(this.itemsUrl, action.payload, httpOptions)
        .pipe(
          map(( _ ) => {
            return new itemActions.UpdateItemSuccess(action.payload)
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
  public updateItemSuccess$ = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.UpdateItemSuccess),
    switchMap(( action: itemActions.UpdateItemSuccess) => {
      this.location.back()
      return []
    })
  )
}

