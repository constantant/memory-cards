import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { NgxIndexedDBModule } from 'ngx-indexed-db';

import { environment } from '../environments/environment';
import { devtoolsModules } from '../store-devtools/modules';
import { rootRoutes } from './routers';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { StoreService } from './services/store.service';
import { SectionIndexComponent } from './section-index/section-index.component';
import { SectionGroupComponent } from './section-group/section-group.component';
import { SectionCardComponent } from './section-card/section-card.component';
import { PopupGroupComponent } from './popup-group/popup-group.component';
import { AppEffects } from './app.effects';
import { appFeatureKey, appReducer } from './app.reducer';

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
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgxIndexedDBModule.forRoot({
      ...environment.db,
      objectStoresMeta: [
        {
          store: 'groups',
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'name', keypath: 'name', options: { unique: false } }
          ]
        },
        {
          store: 'cards',
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'groupId', keypath: 'groupId', options: { unique: false } },
            { name: 'word', keypath: 'word', options: { unique: false } },
            { name: 'translated', keypath: 'translated', options: { unique: false } }
          ]
        }
      ]
    }),
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreModule.forFeature(appFeatureKey, appReducer),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([ AppEffects ]),
    ...devtoolsModules,
  ],
  providers: [ StoreService ],
  entryComponents: [ PopupComponent, PopupGroupComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
