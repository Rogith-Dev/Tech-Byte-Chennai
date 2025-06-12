import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PreBuildPCListComponent } from './pages/pre-build-pc/prebuilt-pc-list/prebuilt-pc-list.component';
import { PreBuildPCDetailComponent } from './pages/pre-build-pc/prebuilt-pc-detail/prebuilt-pc-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { PCBuildComponent } from './pages/pc-build/pc-build.component';
import { PCHardwareAddComponent } from './admin-page/pc-hardware-add/pc-hardware-add.component';
import { PCHardwareViewComponent } from './admin-page/pc-hardware-view/pc-hardware-view.component';
import { PCHardwareListComponent } from './admin-page/pc-hardware-list/pc-hardware-list.component';
import { PCHardwareEditComponent } from './admin-page/pc-hardware-edit/pc-hardware-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PreBuildPCListComponent,
    PreBuildPCDetailComponent,
    ProductCardComponent,
    PCBuildComponent,
    PCHardwareAddComponent,
    PCHardwareViewComponent,
    PCHardwareEditComponent,
    PCHardwareListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
