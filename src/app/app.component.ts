import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListItem } from './listStore';


export interface AppState {
  items: Array<ListItem>,
  selectedItem: ListItem;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  listItems;
  selectedItem;

  constructor(private _store: Store<AppState>) {
    this.listItems = _store.select('listReducer');
    this.selectedItem = _store.select('selectedItem');
    console.log(this.listItems);
  }

  showItemDetail(_item) {
    this._store.dispatch({ type: 'SELECT_ITEM', payload: _item });
  }
  deleteListItem(_item) {
    console.log("clicked")
    try {
      this._store.dispatch({ type: 'REMOVE_LIST_ITEM', payload: _item });

          this._store.dispatch({ type: 'SELECT_ITEM' });
    } catch (e) {
      console.log(e)
    }
  }

  addListItem() {
    console.log("clicked")
    try {
      this._store.dispatch({ type: 'ADD_LIST_ITEM', payload: "first list" });
    } catch (e) {
      console.log(e)
    }
  }
}
