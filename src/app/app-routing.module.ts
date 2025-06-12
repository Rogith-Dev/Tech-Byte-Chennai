import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreBuildPCListComponent } from './pages/pre-build-pc/prebuilt-pc-list/prebuilt-pc-list.component';
import { PreBuildPCDetailComponent } from './pages/pre-build-pc/prebuilt-pc-detail/prebuilt-pc-detail.component';
import { PCBuildComponent } from './pages/pc-build/pc-build.component';
import { AddPCHardwareComponent } from './admin-page/add-pc-hardware/add-pc-hardware.component';
import { ViewPCHardwareComponent } from './admin-page/view-pc-hardware/view-pc-hardware.component';

const routes: Routes = [
  { path: 'prebuild-pc-list', component: PreBuildPCListComponent },
  { path: 'prebuild-pc-detail', component: PreBuildPCDetailComponent },
  { path: 'pc-build', component: PCBuildComponent },
  { path: 'add-pc-hardware', component: AddPCHardwareComponent },
  { path: 'view-pc-hardware', component: ViewPCHardwareComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'  // 👈 THIS
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
