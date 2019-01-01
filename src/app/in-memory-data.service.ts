import { InMemoryDbService } from "angular-in-memory-web-api";
import { Item } from "./Item";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      { id: 11, name: "phone" },
      { id: 12, name: "tablet" },
      { id: 13, name: "laptop" },
      { id: 14, name: "tv" },
      { id: 15, name: "speakers" },
      { id: 16, name: "pc" },
      { id: 17, name: "keyboard" },
      { id: 18, name: "mouse" },
      { id: 19, name: "router" },
      { id: 20, name: "desk" },
    ];

    const favorites = [
      { id: 1, itemId: 15 },
      { id: 2, itemId: 16 },
      { id: 3, itemId: 17 }
    ]
    return { items, favorites };
  }

  // Overrides the genId method to ensure that an item always has an id.
  // If the items array is empty,
  // the method below returns the initial number (11).
  // if the items array is not empty, the method below returns the highest
  // item id + 1.
  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 11;
  }
}
