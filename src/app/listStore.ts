import {ActionReducer, Action} from "@ngrx/store";
import {UUID} from 'angular2-uuid';
/**
 * Created by aaronksaunders on 12/25/16.
 */


export interface ListItem {
    itemName: String,
    items: [any]
    id: String,
}


/**
 *
 * @param state
 * @param action
 * @returns {any}
 */
export const listReducer: ActionReducer<Array<ListItem>> = (state = [], action: Action) => {
    console.log('ACTION:', action.type, action.payload);
    var idx;

    /**
     *
     * @param _data
     * @returns {{id: string, data: any}}
     */
    function createItemData(_data) {
        return {
            id: UUID.UUID(),
            data: _data
        }
    }

    switch (action.type) {
        case 'ADD_LIST_ITEM':
            let uuid = UUID.UUID();
            return [
                ...state,
                Object.assign({id: uuid}, {itemName: action.payload})
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
                    Object.assign({}, state[idx], {items: [...(state[idx].items || []), createItemData(action.payload.data)]}),
                    ...state.slice(idx + 1)
                ];
            }

        default :
            return state;
    }
}