//import { MockBackend } from '@angular/http/testing';
//import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import {tick, fakeAsync} from '@angular/core/testing/fake_async';
import {inject, TestBed} from '@angular/core/testing/test_bed';
import {listReducer} from "../app/listStore";

describe('ListStore Tests', () => {
    var state = [];

    beforeEach(() => {

    });

    it('should add first item', (_done) => {
        const actual = listReducer(state, {type: 'ADD_LIST_ITEM', payload: "first list"});
        expect(actual[0].itemName).toBe("first list");
        state = actual;
        _done();
    });

    it('should add second item', (_done) => {
        const actual = listReducer(state, {type: 'ADD_LIST_ITEM', payload: "second list"});
        expect(actual[1].itemName).toBe("second list");
        state = actual;
        _done();
    });
    it('should remove second item', (_done) => {
        const actual = listReducer(state, {type: 'REMOVE_LIST_ITEM', payload: state[1]});
        expect(actual.length).toBe(1);
        state = actual;
        console.log(state)
        _done();
    });
    it('should add item to first list item', (_done) => {
        const actual = listReducer(state, {
            type: 'ADD_ITEM_TO_LIST',
            payload: {
                id: state[0].id,
                data: "aaron saunders"
            }
        });
        expect(actual[0].items.length).toBe(1);
        expect(actual[0].items[0].data).toBe("aaron saunders");
        state = actual;
        console.log(JSON.stringify(state,null,2))
        _done();
    });
    it('should add another item to first list item', (_done) => {
        const actual = listReducer(state, {
            type: 'ADD_ITEM_TO_LIST',
            payload: {
                id: state[0].id,
                data: "andrea saunders"
            }
        });
        expect(actual[0].items.length).toBe(2);
        expect(actual[0].items[1].data).toBe("andrea saunders");
        state = actual;
        console.log(JSON.stringify(state,null,2))
        _done();
    });
    it('should update first list item', (_done) => {
        const actual = listReducer(state, {
            type: 'UPDATE_LIST_ITEM',
            payload: Object.assign({}, state[0], {itemName: "updated item name"})
        });
        expect(actual[0].itemName).toBe("updated item name");
        state = actual;
        console.log(JSON.stringify(state,null,2))
        _done();
    });
});