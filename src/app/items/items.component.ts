import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import { Item } from "../Item";
import * as fromStore from '../store/reducers';
import * as itemActions from '../store/actions/item.actions';


@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {

  items$: Observable<object[]>;

  constructor(private store: Store<fromStore.State>) {

  }

  ngOnInit() {

    this.items$ = this.store.select(fromStore.getItems);

  }

  add(name: string): void {

    name = name.trim();
    if (!name) {
      return;
    }

    this.store.dispatch(new itemActions.AddItem({ name } as Item))

  }

  delete(item: Item): void {

  }
}
