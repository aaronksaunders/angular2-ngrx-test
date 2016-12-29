import { ActionReducer, Action } from "@ngrx/store";
import { UUID } from 'angular2-uuid';
/**
 * Created by aaronksaunders on 12/25/16.
 */


export interface ListItem {
    itemName: String,
    items: Array<DataItem>,
    id: String,
}

export interface DataItem {
    data: String,
    id: String,
}

export function selectedItem(state: ListItem = null, {type, payload}) {
  switch (type) {
    case 'SELECT_ITEM':
      return payload;
    default:
      return state;
  }
};

/**
 *
 * @param state
 * @param action
 * @returns {any}
 */

export function listReducer(state = [], action: Action): Array<ListItem> {
    console.log('ACTION:', action.type, action.payload);
    var idx;

    switch (action.type) {
        case 'ADD_LIST_ITEM':
            let uuid = UUID.UUID();
            return [
                ...state,
                Object.assign({ id: uuid }, { itemName: action.payload })
            ];
        case 'REMOVE_LIST_ITEM':
            idx = state.findIndex((_item) => {
                return action.payload.id === _item.id;
            });

            if (idx === -1) {
                return state;
            } else {
                return [
                    ...state.slice(0, idx),
                    ...state.slice(idx + 1)
                ];
            }
        case 'UPDATE_LIST_ITEM':
            return state.map((_item) => {
                return action.payload.id !== _item.id ? _item : Object.assign({}, state[idx], action.payload)
            });
        case 'ADD_ITEM_TO_LIST':
            idx = state.findIndex((_item) => {
                return action.payload.id === _item.id;
            });

            if (idx === -1) {
                return state;
            } else {
                return [
                    ...state.slice(0, idx),
                    Object.assign({}, state[idx], {
                        items: [...(state[idx].items || []), {
                            id: UUID.UUID(),
                            data: action.payload.data
                        }]
                    }),
                    ...state.slice(idx + 1)
                ];
            }

        default:
            return state;
    }
}
