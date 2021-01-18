import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddComponent } from './components/add/add.component';
import { CommonComponent } from './components/common/common.component';
import { LinkupComponent } from './components/linkup/linkup.component';
import { ListingComponent } from './components/listing/listing.component';
import { PostingComponent } from './components/posting/posting.component';
import { UpdatesComponent } from './components/updates/updates.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    CommonComponent,
    LinkupComponent,
    ListingComponent,
    PostingComponent,
    UpdatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
