import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListItem, AppState } from './listStore';

import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  listItems: Observable<Array<ListItem>>;
  selectedItem: Observable<ListItem>;

  constructor(private _store: Store<AppState>) {
    this.listItems = _store.select('listReducer')
    this.selectedItem = _store.select('selectedItem')

    console.log(this.listItems);
  }

  addDataToItem(_params) {


    console.log(`the item is ${_params.item} and the title is ${_params.title}`)
    this._store.dispatch({
      type: 'ADD_ITEM_TO_LIST',
      payload: {
        id: _params.item.id,
        data: _params.title
      }
    });

    const attendees = () => {
      let what = state => state
        .map(s => s.listItems)
        .distinctUntilChanged();
    }

    console.log("attendees",attendees())
  }
  addListItem(_itemTitle) {
    console.log("clicked")
    try {
      this._store.dispatch({ type: 'ADD_LIST_ITEM', payload: _itemTitle.value });
      _itemTitle.value = ""
    } catch (e) {
      console.log(e)
    }
  }
}
