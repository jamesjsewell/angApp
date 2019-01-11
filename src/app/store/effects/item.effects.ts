import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { HttpClient } from "@angular/common/http";
import { Observable, of} from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import * as fromStore from '../reducers';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Item } from '../../Item'
import * as itemActions from '../actions/item.actions';
import * as favoriteActions from '../actions/favorite.actions'

@Injectable()
export class ItemsEffects {
  itemsUrl = 'api/items'
  favoritesUrl = 'api/favorites'
  items$: Observable<object[]>
  itemIds: Number[]
  constructor(private store: Store<fromStore.State>, private actions$: Actions,
    private http: HttpClient) { }

  @Effect()
  public addItem$ = this.actions$.pipe(
    ofType(itemActions.ItemActionTypes.AddItem),
    switchMap(( action: itemActions.AddItem) =>
      this.http.post<Item>(this.itemsUrl, action.payload)
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

}
