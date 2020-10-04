import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

import { GroupsResolver } from './services/groups.resolver';
import { CardsResolver } from './services/cards.resolver';
import { CardResolver } from './services/card.resolver';
import { GroupsRoutingModule } from './groups-routing.module';
import { groupEntityName, groupSortComparer } from './models/group.model';
import { GroupsComponent } from './groups.component';
import { GroupEntityService } from './services/group-entity.service';
import { GroupsDataService } from './services/groups-data.service';
import { GroupComponent } from './group/group.component';
import { CardComponent } from './card/card.component';
import { CardEntityService } from './services/card-entity.service';
import { cardEntityName, cardSortComparer } from './models/card.model';
import { CardsDataService } from './services/cards-data.service';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { InitComponent } from './init/init.component';
import { GroupDeleteConfirmationComponent } from './group/group-delete-confirmation/group-delete-confirmation.component';
import { CardDeleteConfirmationComponent } from './card/card-delete-confirmation/card-delete-confirmation.component';


const entityMetadata: EntityMetadataMap = {
  [ groupEntityName ]: { sortComparer: groupSortComparer },
  [ cardEntityName ]: { sortComparer: cardSortComparer },
};

@NgModule({
  declarations: [
    InitComponent,
    GroupsComponent,
    GroupComponent,
    CardComponent,
    GroupEditComponent,
    CardEditComponent,
    GroupDeleteConfirmationComponent,
    CardDeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatRippleModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    GroupsResolver,
    CardsResolver,
    CardResolver,
    GroupEntityService,
    GroupsDataService,
    CardEntityService,
    CardsDataService,
  ]
})
export class GroupsModule {
  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private groupsDataService: GroupsDataService,
    private cardDataService: CardsDataService,
  ) {
    this.entityDefinitionService.registerMetadataMap(entityMetadata);
    this.entityDataService.registerService(groupEntityName, this.groupsDataService);
    this.entityDataService.registerService(cardEntityName, this.cardDataService);
  }
}
