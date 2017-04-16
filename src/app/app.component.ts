import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { StoreService } from "./services/store.service";
import { PopupComponent } from "./popup/popup.component";
import { PopupGroupComponent } from "./popup-group/popup-group.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  get groups(): IGroupItem[] {
    if (!this._storeService) {
      return [];
    }
    return this._storeService.groups;
  }

  get show(): boolean {
    if (!this._storeService) {
      return false;
    }
    return !this._storeService.cardHasShown;
  }

  get showEditButton(): boolean {
    if (!this._storeService) {
      return false;
    }
    return !!this._storeService.currentGroupData;
  }

  constructor(private _storeService: StoreService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _viewContainerRef: ViewContainerRef) {
  }

  addCard() {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(PopupComponent);
    let componentRef = this._viewContainerRef.createComponent(componentFactory);

    (<PopupComponent>componentRef.instance).componentRef = componentRef;
  }

  editGroup() {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(PopupGroupComponent);
    let componentRef = this._viewContainerRef.createComponent(componentFactory);

    (<PopupGroupComponent>componentRef.instance).data = this._storeService.currentGroupData;
    (<PopupGroupComponent>componentRef.instance).componentRef = componentRef;
  }
}
