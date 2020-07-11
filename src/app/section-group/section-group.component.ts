import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-section-group',
  templateUrl: './section-group.component.html',
  styleUrls: [ './section-group.component.css' ]
})
export class SectionGroupComponent implements OnInit, OnDestroy {

  id = 0;

  name = '';

  cards: ICardInfo[] = [];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly storeService: StoreService) {
  }

  ngOnInit(): void {
    const load = () => {
      this.storeService.getGroup(this.id).then((group: IFormGroupData) => {
        this.storeService.currentGroupData = group;
      });
      this.storeService.getCards(this.id)
        .then((cards: ICardInfo[]) => this.cards = cards);
    };

    this.activatedRoute.params
      .subscribe(({ groupId }) => {
        this.id = +groupId;
        this.storeService.onCardChange.subscribe(load);
        load();
      });
  }

  ngOnDestroy(): void {
    this.storeService.currentGroupData = null;
  }
}
