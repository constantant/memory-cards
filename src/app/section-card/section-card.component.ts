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

  id = 0;
  groupId = 0;
  word = '';
  translated = '';
  examples = '';

  constructor(private readonly route: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly storeService: StoreService,
              private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly viewContainerRef: ViewContainerRef) {
  }

  next(): void {
    this.storeService.getNextCard(this.groupId, this.id).then((card: ICardInfo) => {
      this.route.navigate([ this.groupId, card.id ]);
    });
  }

  close(): void {
    this.route.navigate([ this.groupId ]);
  }

  edit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    componentRef.instance.data = {
      group: {
        id: +this.groupId,
        name: ''
      },
      word: this.word,
      translated: this.translated,
      examples: this.examples
    };

    componentRef.instance.isEdit = true;
    componentRef.instance.cardId = this.id;
    componentRef.instance.componentRef = componentRef;
  }

  ngOnInit(): void {
    const load = (cardId: number) => {
      this.storeService.getCard(+cardId)
        .then((card: ICardInfo) => {
          if (!card) {
            return;
          }

          const { id, groupId, word, translated, examples } = card;

          if (id) {
            this.id = id;
            this.groupId = groupId;
            this.word = word;
            this.translated = translated;
            this.examples = examples;
          }

          this.storeService.cardHasShown = true;
        });
    };

    this.activatedRoute.params
      .subscribe(({ cardId }) => {
        this.storeService.onCardChange.subscribe(() => load(cardId));
        load(cardId);
      });
  }

  ngOnDestroy(): void {
    this.storeService.cardHasShown = false;
  }

}
