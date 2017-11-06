import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: [ './section-card.component.css' ]
})
export class SectionCardComponent implements OnInit, OnDestroy {

  id: number;
  groupId: number;
  word: string;
  translated: string;
  examples: string;

  constructor(private _route: Router,
              private _activatedRoute: ActivatedRoute,
              private _storeService: StoreService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _viewContainerRef: ViewContainerRef) {
  }

  next() {
    this._storeService.getNextCard(this.groupId, this.id).then((card: ICardInfo) => {
      this._route.navigate([ this.groupId, card.id ]);
    });
  }

  close() {
    this._route.navigate([ this.groupId ]);
  }

  edit() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const componentRef = this._viewContainerRef.createComponent(componentFactory);

    (<PopupComponent>componentRef.instance).data = {
      group: {
        id: +this.groupId
      },
      word: this.word,
      translated: this.translated,
      examples: this.examples
    };

    (<PopupComponent>componentRef.instance).isEdit = true;
    (<PopupComponent>componentRef.instance).cardId = this.id;
    (<PopupComponent>componentRef.instance).componentRef = componentRef;
  }

  ngOnInit() {
    const load = (cardId: number) => {
      this._storeService.getCard(+cardId)
        .then((card: ICardInfo) => {
          if (!card) {
            return;
          }

          const { id, groupId, word, translated, examples } = card;

          this.id = id;
          this.groupId = groupId;
          this.word = word;
          this.translated = translated;
          this.examples = examples;

          this._storeService.cardHasShown = true;
        });
    };

    this._activatedRoute.params
      .subscribe(({ cardId }) => {
        this._storeService.onCardChange.subscribe(() => load(cardId));
        load(cardId)
      });
  }

  ngOnDestroy() {
    this._storeService.cardHasShown = false;
  }

}
