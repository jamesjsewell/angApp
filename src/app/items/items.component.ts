import { Component, OnInit } from "@angular/core";
import { Item } from "../Item";
import { ItemService } from "../item.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.getItems();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.itemService.addItem({ name } as Item).subscribe(item => {
      this.items.push(item);
    });
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => (this.items = items));
  }

  delete(item: Item): void {
    this.items = this.items.filter(theItem => theItem !== item);
    this.itemService.deleteItem(item).subscribe();
  }
}
