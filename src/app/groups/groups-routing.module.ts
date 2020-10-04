import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsResolver } from './services/groups.resolver';
import { CardsResolver } from './services/cards.resolver';
import { CardResolver } from './services/card.resolver';
import { InitComponent } from './init/init.component';
import { GroupsComponent } from './groups.component';
import { GroupComponent } from './group/group.component';
import { CardComponent } from './card/card.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { CardEditComponent } from './card-edit/card-edit.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    resolve: {
      loaded: GroupsResolver
    },
    children: [
      { path: '', component: InitComponent },
      { path: 'add-card', component: CardEditComponent },
      { path: ':groupId', component: GroupComponent, resolve: { loaded: CardsResolver } },
      { path: ':groupId/edit', component: GroupEditComponent },
      { path: ':groupId/add-card', component: CardEditComponent },
      { path: ':groupId/:cardId', component: CardComponent, resolve: { loaded: CardResolver } },
      { path: ':groupId/:cardId/edit', component: CardEditComponent, resolve: { loaded: CardResolver } }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GroupsRoutingModule {
}
