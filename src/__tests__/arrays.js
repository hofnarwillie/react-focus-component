
import { assert } from 'chai';
import { isEmptyArray } from '../arrays';


describe('arrays.js', () => {

    describe('returns false', () => {
        it('on null', () => {
            assert.isFalse(isEmptyArray(null));
        });

        it('on undefined', () => {
            assert.isFalse(isEmptyArray());
        });

        it('on string', () => {
            assert.isFalse(isEmptyArray('test'));
        });

        it('on number', () => {
            assert.isFalse(isEmptyArray(100));
        });

        it('on a negative number', () => {
            assert.isFalse(isEmptyArray(-100));
        });

        it('on a bool', () => {
            assert.isFalse(isEmptyArray(true));
        });

        it('on a full array', () => {
            assert.isFalse(isEmptyArray(['test', 2, false]));
        });

        it('on an array of a falsy', () => {
            assert.isFalse(isEmptyArray([false]));
        });
    });

    describe('returns true', () => {
        it('on empty array', () => {
            assert.isTrue(isEmptyArray([]));
        });
    });

});