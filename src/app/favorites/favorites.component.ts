import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import * as fromStore from '../store/reducers';
import * as favoritesActions from '../store/actions/favorite.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {



  constructor(private store: Store<fromStore.State>) {

  }

  ngOnInit() {

  }

}



