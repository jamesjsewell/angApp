import { ActivatedRoute } from "@angular/router"
import { Location } from "@angular/common"
import { Component, OnInit, Input } from "@angular/core"
import { Store } from '@ngrx/store'
import { ItemService } from "../item.service"
import { Item } from "../Item"
import * as fromStore from '../store/reducers'
import * as itemActions from '../store/actions/item.actions'

@Component({
  selector: "app-item-detail",
  templateUrl: "./item-detail.component.html",
  styleUrls: ["./item-detail.component.scss"],
})
export class ItemDetailComponent implements OnInit {
  @Input() item: Item
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    this.getItem()
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get("id")
    this.itemService.getItem(id).subscribe(item => (this.item = item))
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    // to-do, run goBack from when the effect completes
    this.store.dispatch(new itemActions.UpdateItem(this.item as Item))
  }
}
