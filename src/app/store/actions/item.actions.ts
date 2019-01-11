import { Action } from '@ngrx/store';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { Item } from '../../Item'
import * as fromStore from '../reducers';

const itemsUrl = '/items'

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

export enum ItemActionTypes {
  LoadItems = '[Item] Load Items',
  LoadItemsSuccess = '[Item] Load Items Success',
  AddItem = '[Item] Add Item',
  AddItemSuccess = '[Item] Add Item Success',
  NoItems = '[Item] No Items'
}

export class LoadItems implements Action {
  readonly type = ItemActionTypes.LoadItems;
}

export class LoadItemsSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemsSuccess;
  constructor(private payload: Item[]) {

  }
}

export class NoItems implements Action {
  readonly type = ItemActionTypes.NoItems;
}

export class AddItem implements Action {
  readonly type = ItemActionTypes.AddItem;
  constructor(public payload: Item) {

  }
}

export class AddItemSuccess implements Action {
  readonly type = ItemActionTypes.AddItemSuccess;
  constructor(private payload: Item) {

  }
}

export type ItemActions = { AddItem, AddItemSuccess, LoadItems, LoadItemsSuccess, NoItems };
