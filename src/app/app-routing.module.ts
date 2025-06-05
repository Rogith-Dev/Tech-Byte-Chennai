import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PCBuildComponent } from './pages/pc-build/pc-build.component';
import { AddProductComponent } from './admin-page/add-product-components/add-product-components.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pc-build', component: PCBuildComponent },
  { path: 'add-product-components', component: AddProductComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
