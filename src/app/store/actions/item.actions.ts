import { Action } from '@ngrx/store';
import { Item } from '../../Item'

export enum ItemActionTypes {
  LoadItems = '[Item] Load Items',
  LoadItemsSuccess = '[Item] Load Items Success'
}

export class LoadItems implements Action {
  readonly type = ItemActionTypes.LoadItems;
}

export class LoadItemsSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemsSuccess;
  constructor(private payload: Item[]) {

  }
}

export type ItemActions = { LoadItems, LoadItemsSuccess };
