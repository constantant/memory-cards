import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGroups, AppState } from './app.reducer';
import { loadGroups } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  readonly groups$ = this.store.select(selectGroups);

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadGroups());
  }
}
