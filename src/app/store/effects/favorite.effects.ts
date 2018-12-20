import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import * as favoriteActions from '../actions/favorite.actions';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Favorite } from '../../Favorite'
import * as fromStore from '../reducers';


@Injectable()
export class FavoritesEffects {
  favoritesUrl = "api/favorites"
  constructor(private store: Store<fromStore.State>, private actions$: Actions,
    private http: HttpClient) { }

  @Effect()
  storeFavorites$: Observable<Action> = this.actions$.pipe(
    ofType(favoriteActions.FavoriteActionTypes.LoadFavorites),
  )
}
