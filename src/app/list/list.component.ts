import { ListItem, AppState } from './../listStore';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() items: ListItem[];
  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }
  showItemDetail(_item) {
    debugger;
    this._store.dispatch({ type: 'SELECT_ITEM', payload: _item });
  }
  deleteListItem(_item) {
    debugger;
    try {
      this._store.dispatch({ type: 'REMOVE_LIST_ITEM', payload: _item });
      this._store.dispatch({ type: 'SELECT_ITEM' });
    } catch (e) {
      console.log(e)
    }
  }
}

@Component({
  selector: 'app-list-item',
  template: `
    {{ item | json }}
    <div>
        <button  (click)="onDeleteItem.emit(item)">DELETE</button>
        <button  (click)="onShowDetailItem.emit(item)">SHOW</button>
    </div>  
  `,
  styleUrls: ['./list.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() item;
  @Output() onDeleteItem = new EventEmitter()
  @Output() onShowDetailItem = new EventEmitter()
  constructor() { }

  ngOnInit() {
    console.log("wrote item", this.item)
  }

}
