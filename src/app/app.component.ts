import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListItem } from './listStore';


export interface AppState {
  items: Array<ListItem>
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  listItems;

  constructor(private _store: Store<AppState>) {
    this.listItems = _store.select('listItems');
    console.log(this.listItems);
  }


  deleteListItem(_item) {
    console.log("clicked")
    try {
      this._store.dispatch({ type: 'REMOVE_LIST_ITEM', payload: _item });
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
