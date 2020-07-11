import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { StoreService } from './services/store.service';
import { PopupComponent } from './popup/popup.component';
import { PopupGroupComponent } from './popup-group/popup-group.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  get groups(): IGroupItem[] {
    if (!this.storeService) {
      return [];
    }
    return this.storeService.groups;
  }

  get show(): boolean {
    if (!this.storeService) {
      return false;
    }
    return !this.storeService.cardHasShown;
  }

  get showEditButton(): boolean {
    if (!this.storeService) {
      return false;
    }
    return !!this.storeService.currentGroupData;
  }

  constructor(private readonly storeService: StoreService,
              private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly viewContainerRef: ViewContainerRef) {
  }

  addCard(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    componentRef.instance.componentRef = componentRef;
  }

  editGroup(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupGroupComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    if (this.storeService.currentGroupData) {
      componentRef.instance.data = this.storeService.currentGroupData;
      componentRef.instance.componentRef = componentRef;
    }
  }
}
