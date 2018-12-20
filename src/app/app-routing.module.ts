import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { ItemsComponent } from "./items/items.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { FavoritesComponent } from "./favorites/favorites.component"

const routes: Routes = [
  { path: "items", component: ItemsComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "detail/:id", component: ItemDetailComponent },
  { path: "favorites", component: FavoritesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
