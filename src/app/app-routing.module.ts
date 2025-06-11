import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreBuildPCListComponent } from './pages/pre-build-pc/prebuilt-pc-list/prebuilt-pc-list.component';
import { PreBuildPCDetailComponent } from './pages/pre-build-pc/prebuilt-pc-detail/prebuilt-pc-detail.component';
import { PCBuildComponent } from './pages/pc-build/pc-build.component';
import { AddProductComponent } from './admin-page/add-product-components/add-product-components.component';

const routes: Routes = [
  { path: 'prebuild-pc-list', component: PreBuildPCListComponent },
  { path: 'prebuild-pc-detail', component: PreBuildPCDetailComponent },
  { path: 'pc-build', component: PCBuildComponent },
  { path: 'add-product-components', component: AddProductComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'  // 👈 THIS
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
