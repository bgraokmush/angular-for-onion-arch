import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent as AdminLayoutComponent } from './admin/layout/layout.component';
import { LayoutComponent as ClientLayoutComponent } from './client/layout/layout.component';

import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './client/components/home/home.component';

const routes: Routes = [
  {
    path: `admin`,
    component: AdminLayoutComponent,
    children: [
      {
        path: ``,
        component: DashboardComponent,
      },
      {
        path: `customers`,
        loadChildren: () =>
          import('./admin/components/customer/customer.module').then(
            (module) => module.CustomerModule
          ),
      },
      {
        path: `orders`,
        loadChildren: () =>
          import('./admin/components/order/order.module').then(
            (module) => module.OrderModule
          ),
      },
      {
        path: `products`,
        loadChildren: () =>
          import('./admin/components/products/products.module').then(
            (module) => module.ProductsModule
          ),
      },
    ],
  },
  {
    path: ``,
    component: ClientLayoutComponent,
    children: [
      {
        path: ``,
        loadChildren: () =>
          import('./client/components/home/home.module').then(
            (module) => module.HomeModule
          ),
      },
      {
        path: `products`,
        loadChildren: () =>
          import('./client/components/products/products.module').then(
            (module) => module.ProductsModule
          ),
      },
      {
        path: `baskets`,
        loadChildren: () =>
          import('./client/components/baskets/baskets.module').then(
            (module) => module.BasketsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
