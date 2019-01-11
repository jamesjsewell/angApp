import { Action } from '@ngrx/store'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, of } from "rxjs"
import { catchError, map, tap } from "rxjs/operators"
import { Store } from '@ngrx/store'
import { Item } from '../../Item'
import * as fromStore from '../reducers'

export enum ItemActionTypes {
  AddItem = 'Item Add Item',
  AddItemSuccess = 'Item Add Item Success',
  LoadItems = '[Item] Load Items',
  LoadItemsSuccess = '[Item] Load Items Success',
  NoItems = '[Item] No Items',
  UpdateItem = 'Item Update Item',
  UpdateItemSuccess = 'Item Update Item Success',
  DeleteItem = 'Item Delete Item',
  DeleteItemSuccess = 'Delete Item Success'
}

export class AddItem implements Action {
  readonly type = ItemActionTypes.AddItem
  constructor(public payload: Item) {

  }
}

export class AddItemSuccess implements Action {
  readonly type = ItemActionTypes.AddItemSuccess
  constructor(private payload: Item) {

  }
}

export class LoadItems implements Action {
  readonly type = ItemActionTypes.LoadItems
}

export class LoadItemsSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemsSuccess
  constructor(private payload: Item[]) {

  }
}

export class NoItems implements Action {
  readonly type = ItemActionTypes.NoItems
}

export class UpdateItem implements Action {
  readonly type = ItemActionTypes.UpdateItem
  constructor(public payload: Item) {

  }
}

export class UpdateItemSuccess implements Action {
  readonly type = ItemActionTypes.UpdateItemSuccess
  constructor(public payload: Item) {

  }
}

export class DeleteItem implements Action {
  readonly type = ItemActionTypes.DeleteItem
  constructor(public payload: Item) {

  }
}

export class DeleteItemSuccess implements Action {
  readonly type = ItemActionTypes.DeleteItemSuccess
  constructor(public payload: Item) {

  }
}

export type ItemActions = { AddItem, AddItemSuccess, LoadItems, LoadItemsSuccess, NoItems, UpdateItem, UpdateItemSuccess, DeleteItem, DeleteItemSuccess }
