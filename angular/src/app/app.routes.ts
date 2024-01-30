import { Routes } from '@angular/router';
import { ShowSubscriberComponent } from './subscriber/show-subscriber/show-subscriber.component';
import { EditSubscriberComponent } from './subscriber/edit-subscriber/edit-subscriber.component';
import { AddSubscriberComponent } from './subscriber/add-subscriber/add-subscriber.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'subscriber', pathMatch: 'full',
  }, {
    path: 'subscriber', component: ShowSubscriberComponent
  }, {
    path: 'subscriber/add', component: AddSubscriberComponent
  }, {
    path: 'subscriber/:id', component: EditSubscriberComponent
  }
];
