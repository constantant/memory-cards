import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const devtoolsModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
];
