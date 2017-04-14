import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../services/store.service";
import { PopupComponent } from "../popup/popup.component";

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
    let load = (cardId: number) => {
      _storeService.getCard(+cardId)
        .then((card: ICardInfo) => {
          if (!card) {
            return;
          }

          let { id, groupId, word, translated, examples } = card;

          this.id = id;
          this.groupId = groupId;
          this.word = word;
          this.translated = translated;
          this.examples = examples;
        });
    };

    _activatedRoute.params
      .subscribe(({ cardId }) => {
        _storeService.onCardChange.subscribe(() => load(cardId));
        load(cardId)
      });
  }

  next() {
    this._storeService.getCards(this.groupId)
      .then((cards: ICardInfo[]) => {
        let currentIndex = cards.findIndex(({ id }) => id === this.id);
        if (cards.length - 1 === currentIndex) {
          this._route.navigate([ this.groupId, cards[ 0 ].id ]);
          return;
        }

        this._route.navigate([ this.groupId, cards[ currentIndex + 1 ].id ]);
      });
  }

  close() {
    this._route.navigate([ this.groupId ]);
  }

  edit() {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(PopupComponent);
    let componentRef = this._viewContainerRef.createComponent(componentFactory);

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
    this._storeService.cardHasShown = true;
  }

  ngOnDestroy() {
    this._storeService.cardHasShown = false;
  }

}
