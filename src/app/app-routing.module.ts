import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreBuildPCListComponent } from './pages/pre-build-pc/prebuilt-pc-list/prebuilt-pc-list.component';
import { PreBuildPCDetailComponent } from './pages/pre-build-pc/prebuilt-pc-detail/prebuilt-pc-detail.component';
import { PCBuildComponent } from './pages/pc-build/pc-build.component';
import { PCHardwareAddComponent } from './admin-page/pc-hardware-add/pc-hardware-add.component';
import { PCHardwareViewComponent } from './admin-page/pc-hardware-view/pc-hardware-view.component';
import { PCHardwareEditComponent } from './admin-page/pc-hardware-edit/pc-hardware-edit.component';
import { PCHardwareListComponent } from './admin-page/pc-hardware-list/pc-hardware-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: 'prebuild-pc-list', component: PreBuildPCListComponent },
  { path: 'prebuild-pc-detail', component: PreBuildPCDetailComponent },
  { path: 'pc-build', component: PCBuildComponent },
  { path: 'pc-hardware-add', component: PCHardwareAddComponent },
  { path: 'pc-hardware-view/:id', component: PCHardwareViewComponent },
  { path: 'pc-hardware-edit/:id', component: PCHardwareEditComponent },
  { path: 'pc-hardware-list', component: PCHardwareListComponent },
  { path: 'login', component: LoginComponent, data: { hideHeader: true } },
  { path: 'signup', component: SignupComponent, data: { hideHeader: true } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'  // 👈 THIS
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
