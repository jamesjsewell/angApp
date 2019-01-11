import { Action } from '@ngrx/store';
import * as itemActions from '../actions/item.actions';
import { Item } from '../../Item'

export interface State {
  items: Item[]
}

export const initialState: State = {
  items: []
}

export function reducer(state = initialState, action): State {
  switch (action.type) {

    case itemActions.ItemActionTypes.AddItemSuccess:
      return {
        ...state,
        items: [...state.items, ...[action.payload]]
      }

    case itemActions.ItemActionTypes.LoadItems:
      return {
        ...state
      }

    case itemActions.ItemActionTypes.LoadItemsSuccess:
      return {
        ...state,
        items: action.payload
      }

    case itemActions.ItemActionTypes.UpdateItem:
      return {
        ...state,
        items: [...state.items, ...[action.payload]]
      }

    case itemActions.ItemActionTypes.DeleteItemSuccess:
      const itemsArray = [...state.items]
      const itemIndex = itemsArray.indexOf(action.payload)
      itemsArray.splice(itemIndex, 1)
      return {
        ...state,
        items: itemsArray
      }

    default:
      return state;
  }
}

export const getItems = (state: State) => state.items;

