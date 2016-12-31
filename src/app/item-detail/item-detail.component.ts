import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  /**
   * @memberOf ListItemComponent
   */
  @Input() item;
  @Output() onAddItemData = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }
  handleAddDataItem(_selectedItem, _title) {
    this.onAddItemData.emit({ item: _selectedItem, title: _title.value })
  }

}
