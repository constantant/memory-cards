import { Component } from '@angular/core';

import { Group } from './models/group.model';
import { GroupEntityService } from './services/group-entity.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: [ './groups.component.scss' ]
})
export class GroupsComponent {
  groups$ = this.groupEntityService.entities$;

  constructor(private groupEntityService: GroupEntityService) {}

  trackBy(index: number, { id }: Group): number {
    return id;
  }
}
