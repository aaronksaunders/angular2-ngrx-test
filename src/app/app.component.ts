import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {ListItem, AppState} from './listStore';

import {Observable} from "rxjs/Observable";


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

  /**
   * when updating the specific object, we also need to update the selectedItem store
   * since the state has changed, we cannot mutate the object so we need to reset it
   *
   * @param _params
   */
  addDataToItem(_params) {

    console.log(`the item is ${_params.item} and the title is ${_params.title}`)

    // add new data to specific list item
    this._store.dispatch({
      type: 'ADD_ITEM_TO_LIST',
      payload: {
        id: _params.item.id,
        data: _params.title
      }
    });

    // get the List from the listReducer and then find the updated
    // object..
    this.listItems = this._store.select('listReducer');
    this.listItems.subscribe((_i) => {
      console.log(_i)
      let idx = _i.findIndex((_item) => {
        return _params.item.id === _item.id;
      });


      // now that we have the object, dispatch the event to updated
      // the selected item
      if (idx !== -1) {
        this._store.dispatch({type: 'SELECT_ITEM', payload: _i[idx]});
      }
    });

  }

  addListItem(_itemTitle) {
    console.log("clicked")
    try {
      this._store.dispatch({type: 'ADD_LIST_ITEM', payload: _itemTitle.value});
      _itemTitle.value = ""
    } catch (e) {
      console.log(e)
    }
  }
}
