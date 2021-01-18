import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { AddComponent } from './components/add/add.component';
import { CommonComponent } from './components/common/common.component';
import { LinkupComponent } from './components/linkup/linkup.component';
import { ListingComponent } from './components/listing/listing.component';
import { PostingComponent } from './components/posting/posting.component';
import { UpdatesComponent } from './components/updates/updates.component';

const routes: Routes = [
  { path: '', redirectTo: '/add', pathMatch: 'full' },
  { path: 'add', component: AddComponent },
  { path: 'common', component: CommonComponent },
  { path: 'linkup', component: LinkupComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'posting', component: PostingComponent },
  { path: 'updates', component: UpdatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
