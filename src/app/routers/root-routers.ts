import { Routes } from "@angular/router";
import { SectionIndexComponent } from "../section-index/section-index.component";
import { SectionGroupComponent } from "../section-group/section-group.component";
import { SectionCardComponent } from "../section-card/section-card.component";

export const rootRoutes: Routes = [
  {
    path: '',
    component: SectionIndexComponent,
    children: [
      {
        path: ':groupId',
        component: SectionGroupComponent,
        children: [
          {
            path: ':cardId',
            component: SectionCardComponent
          }
        ]
      }
    ]
  }
];
