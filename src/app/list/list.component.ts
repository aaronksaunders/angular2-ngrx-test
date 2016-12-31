//
// @see https://gist.github.com/btroncone/a6e4347326749f938510#taking-advantage-of-changedetectiononpush
// for information on ChangeDetectionStrategy

import {ListItem, AppState} from './../listStore';
import {Store} from '@ngrx/store';
import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

/**
 *
 *
 * @export
 * @class ListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  /**
   *
   * @type {ListItem[]}
   * @memberOf ListComponent
   */
  @Input() items: ListItem[];

  /**
   * Creates an instance of ListComponent.
   *
   * @param {Store<AppState>} _store
   *
   * @memberOf ListComponent
   */
  constructor(private _store: Store<AppState>) {
  }

  /**
   *
   * @memberOf ListComponent
   */
  ngOnInit() {
  }

  /**
   *
   * @param {any} _item
   *
   * @memberOf ListComponent
   */
  showItemDetail(_item) {
    debugger;
    this._store.dispatch({type: 'SELECT_ITEM', payload: _item});
  }

  /**
   *
   * @param {any} _item
   *
   * @memberOf ListComponent
   */
  deleteListItem(_item) {
    debugger;
    try {
      this._store.dispatch({type: 'REMOVE_LIST_ITEM', payload: _item});
      this._store.dispatch({type: 'SELECT_ITEM'});
    } catch (e) {
      console.log(e)
    }
  }
}

/**
 *
 * @export
 * @class ListItemComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-list-item',
  template: `
    <p>{{ item.id}}</p>
    <p>{{ item.itemName}}</p>
    <p>{{ item.items && item.items.length }}</p>
    <div>
        <button  (click)="onDeleteItem.emit(item)">DELETE</button>
        <button  (click)="onShowDetailItem.emit(item)">SHOW</button>
    </div>  
  `,
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  /**
   * @memberOf ListItemComponent
   */
  @Input() item;
  /**
   * @memberOf ListItemComponent
   */
  @Output() onDeleteItem = new EventEmitter()
  /**
   * @memberOf ListItemComponent
   */
  @Output() onShowDetailItem = new EventEmitter()

  /**
   * Creates an instance of ListItemComponent.
   *
   * @memberOf ListItemComponent
   */
  constructor() {
  }

  /**
   *
   * @memberOf ListItemComponent
   */
  ngOnInit() {
    console.log("wrote item", this.item)
  }

}
