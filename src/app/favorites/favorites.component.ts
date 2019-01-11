import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fromStore from '../store/reducers';
import * as favoritesActions from '../store/actions/favorite.actions';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<object[]>;
  items$: Observable<object[]>;

  constructor(private store: Store<fromStore.State>, private http: HttpClient) {

  }

  ngOnInit() {
    this.store.dispatch(new favoritesActions.LoadFavorites());
    this.favorites$ = this.store.select(fromStore.getFavorites);
    this.items$ = this.store.select(fromStore.getItems)

  }

}



