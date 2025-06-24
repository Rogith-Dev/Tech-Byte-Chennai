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
import { AuthGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'prebuild-pc-list', component: PreBuildPCListComponent },
  // { path: 'prebuild-pc-list', component: PreBuildPCListComponent, canActivate: [AuthGuard] },
  { path: 'prebuild-pc-detail', component: PreBuildPCDetailComponent },
  { path: 'pc-build', component: PCBuildComponent },
  { path: 'pc-hardware-add', component: PCHardwareAddComponent, canActivate: [adminGuard] },
  { path: 'pc-hardware-view/:id', component: PCHardwareViewComponent, canActivate: [adminGuard] },
  { path: 'pc-hardware-edit/:id', component: PCHardwareEditComponent, canActivate: [adminGuard] },
  { path: 'pc-hardware-list', component: PCHardwareListComponent, canActivate: [adminGuard] },
  { path: 'login', component: LoginComponent, data: { hideHeader: true } },
  { path: 'signup', component: SignupComponent, data: { hideHeader: true } },
  { path: 'forgotpassword', component: ForgotPasswordComponent, data: { hideHeader: true } },
  { path: 'resetpassword/:token', component: ResetPasswordComponent, data: { hideHeader: true } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'  // 👈 THIS
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
