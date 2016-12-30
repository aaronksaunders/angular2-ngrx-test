import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListItem, AppState } from './listStore';


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
