import { Component, OnInit } from "@angular/core";
import { Item } from "../item";
import { ITEMS } from "../mock-items";
import { ItemService } from "../item.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"],
})
export class ItemsComponent implements OnInit {
  items: Item[];
  selectedItem: Item;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.items = this.itemService.getItems();
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }
}
