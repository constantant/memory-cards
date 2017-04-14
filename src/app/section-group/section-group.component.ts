import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreService } from "../services/store.service";

@Component({
  selector: 'app-section-group',
  templateUrl: './section-group.component.html',
  styleUrls: [ './section-group.component.css' ]
})
export class SectionGroupComponent implements OnInit {

  cards: ICardInfo[] = [];

  constructor(private _activatedRoute: ActivatedRoute,
              private _storeService: StoreService) {

    let load = (groupId: number) => {
      _storeService.getCards(+groupId)
        .then((cards: ICardInfo[]) => this.cards = cards);
    };

    _activatedRoute.params
      .subscribe(({ groupId }) => {
        _storeService.onCardChange.subscribe(() => load(groupId));
        load(groupId);
      });
  }

  ngOnInit() {
  }

}
