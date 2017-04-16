import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataService } from "./services/data.service";
import { DbService } from "./services/db.service";
import { PopupComponent } from './popup/popup.component';
import { StoreService } from "./services/store.service";
import { SectionIndexComponent } from './section-index/section-index.component';
import { SectionGroupComponent } from './section-group/section-group.component';
import { SectionCardComponent } from './section-card/section-card.component';
import { RouterModule } from "@angular/router";
import { rootRoutes } from "./routers/root-routers";
import { PopupGroupComponent } from './popup-group/popup-group.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    SectionIndexComponent,
    SectionGroupComponent,
    SectionCardComponent,
    PopupGroupComponent
  ],
  imports: [
    RouterModule.forRoot(rootRoutes, { useHash: true }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ DbService, DataService, StoreService ],
  entryComponents: [ PopupComponent, PopupGroupComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
