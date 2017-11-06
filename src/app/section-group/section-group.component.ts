import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-section-group',
  templateUrl: './section-group.component.html',
  styleUrls: [ './section-group.component.css' ]
})
export class SectionGroupComponent implements OnInit, OnDestroy {

  id: number;

  name: string;

  cards: ICardInfo[] = [];

  constructor(private _activatedRoute: ActivatedRoute,
              private _storeService: StoreService) {
  }

  ngOnInit() {
    const load = () => {
      this._storeService.getGroup(this.id).then((group: IFormGroupData)=>{
        this._storeService.currentGroupData = group;
      });
      this._storeService.getCards(this.id)
        .then((cards: ICardInfo[]) => this.cards = cards);
    };

    this._activatedRoute.params
      .subscribe(({ groupId }) => {
        this.id = +groupId;
        this._storeService.onCardChange.subscribe(load);
        load();
      });
  }

  ngOnDestroy() {
    this._storeService.currentGroupData = null;
  }
}
